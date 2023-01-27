import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LinkDataService } from 'src/services/linkdata/linkdata.service';
import {
  ISaveLinkInput,
  ISaveLinkOutput,
  IUpdateVisitorGetLinkInput,
  IUpdateVisitorGetLinkOutput,
} from 'src/services/linkdata/linkdata.service.interface';
import Swal from 'sweetalert2';
export interface Page {
  _unsubscribeAll: Subject<any>;
  OnSubscribe(): void;
  OnFormBuilder(): void;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements Page, OnDestroy, OnInit {
  _unsubscribeAll = new Subject<any>();
  _linkData: IUpdateVisitorGetLinkOutput;
  _newLinkData: ISaveLinkOutput;
  constructor(
    private _linkDataService: LinkDataService,
    private _formBuilder: FormBuilder
  ) {
    // this.linkForm = new FormGroup({
    //   url: new FormControl(),
    // });
  }
  linkForm: FormGroup;
  title = 'short-link';
  ngOnInit(): void {
    this.redirectTo();
    this.OnSubscribe();
    this.OnFormBuilder();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  OnSubscribe(): void {
    this._linkDataService.linkData$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        this._linkData = res;
      });
    this._linkDataService.newLinkData$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        this._newLinkData = res;
      });
  }
  OnFormBuilder(): void {
    this.linkForm = this._formBuilder.group({
      url: [''],
    });
  }
  async linkFormSubmit() {
    if (this.isValidUrl(this.linkForm.value.url)) {
      const input: ISaveLinkInput = {
        url: this.linkForm.value.url,
        newUrl: location.href,
      };
      await this._linkDataService.saveLink(input);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter valid URL.',
      });
    }
  }
  isValidUrl = (urlString: string) => {
    var urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return !!urlPattern.test(urlString);
  };

  redirectTo() {
    const path = location.pathname.replace('/', '');

    if (path != '') {
      const input: IUpdateVisitorGetLinkInput = { short: path };
      this._linkDataService.updateVisitor(input).then((res) => {
        location.href = this._linkData.url;
      });
    }
  }

  copy() {
    navigator.clipboard.writeText(this._newLinkData.newUrl);
  }
  go() {
    window.open(this._newLinkData.newUrl, '_blank');
  }
}
