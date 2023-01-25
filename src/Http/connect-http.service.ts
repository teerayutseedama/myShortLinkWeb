import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { IHttpResponse } from './http.interface';

@Injectable({
  providedIn: 'root',
})
export class ConnectHttp {
  onProgresses = new BehaviorSubject<number>(0);

  constructor(private _http: HttpClient) {}

  post(url: string, requestData: any, params?: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),

      params: null,
    };
    httpOptions.params = params;
    const httpRequest = this._http.post<any>(url, requestData);
    return this.handleResponse(httpRequest);
  }

  private pushProgress() {
    this.onProgresses.next(this.onProgresses.getValue() + 1);
  }
  private shiftProgress() {
    this.onProgresses.next(
      this.onProgresses.getValue() === 0 ? 0 : this.onProgresses.getValue() - 1
    );
  }
  private handleResponse(httpRequest: Observable<any>): Observable<any> {
    this.pushProgress();

    return httpRequest.pipe(
      map(
        (next: IHttpResponse) => {
          this.shiftProgress();
          // console.log(next);
          if (next.message.type === 'danger') {
            return throwError(null);
          } else if (next.message.type === 'warn') {
            return throwError(null);
          }
          //return next.data;
          return next;
        },
        (error: IHttpResponse) => {
          // console.log(error);
          this.shiftProgress();
          if (
            error.message.type === 'danger' ||
            error.message.type === 'warn'
          ) {
          }
          return error;
        }
      ),
      catchError((httpError) => {
        this.shiftProgress();
        if (httpError.error) {
          const error = httpError.error as IHttpResponse;
          if (error.message.type === 'danger') {
          } else if (error.message.type === 'warn') {
          }
          return error;
        }
        {
          const error = httpError as DOMException;
          return httpError;
        }
      })
    );
  }
}
