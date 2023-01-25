import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConnectHttp } from 'src/Http/connect-http.service';
import { IHttpResponse } from 'src/Http/http.interface';
import {
  ISaveLinkReq,
  IUpdateVisitorGetLinkReq,
} from './linkdata.api.interface';

@Injectable({
  providedIn: 'root',
})
export class LinkDataApiService {
  url = environment.api + '/shortlink/';
  constructor(private _connectHttp: ConnectHttp) {}
  saveLink(reqData: ISaveLinkReq): Observable<IHttpResponse> {
    return this._connectHttp.post(this.url + 'saveLink', reqData);
  }
  updateVisitor(reqData: IUpdateVisitorGetLinkReq): Observable<IHttpResponse> {
    return this._connectHttp.post(this.url + 'updateVisitor', reqData);
  }
}
