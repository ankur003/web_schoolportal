import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newHeaders = req.headers;
    debugger
    //if (req.url.indexOf('/login') === -1) {
      newHeaders = newHeaders.append('Authorizationn', 'temp bearer token');
      const authReq = req.clone({ headers: newHeaders });
      return next.handle(authReq);
  //  }
   // return next.handle(req);

  }
}
