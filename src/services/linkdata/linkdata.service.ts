import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LinkDataApiService } from 'src/apis/linkdata/linkdata.api.service';
import { IHttpResponse } from 'src/Http/http.interface';
import {
  ISaveLinkInput,
  ISaveLinkOutput,
  IUpdateVisitorGetLinkInput,
  IUpdateVisitorGetLinkOutput,
} from './linkdata.service.interface';

@Injectable({
  providedIn: 'root',
})
export class LinkDataService {
  private _linkData = new BehaviorSubject<any>(null);
  private _newLinkData = new BehaviorSubject<any>(null);
  constructor(
    private _router: Router,
    private _linkDataApiService: LinkDataApiService
  ) {}

  get linkData$(): Observable<any> {
    return this._linkData.asObservable();
  }
  get newLinkData$(): Observable<any> {
    return this._newLinkData.asObservable();
  }
  saveLink(input: ISaveLinkInput): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._linkDataApiService.saveLink(input).subscribe(
        (res: IHttpResponse) => {
          if (res.data) {
            this._newLinkData.next(res.data);
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }
  updateVisitor(input: IUpdateVisitorGetLinkInput): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._linkDataApiService.updateVisitor(input).subscribe(
        (res: IHttpResponse) => {
          if (res.data) {
            this._linkData.next(res.data as IUpdateVisitorGetLinkOutput);
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }
}
