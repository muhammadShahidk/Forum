import { HttpEvent, HttpHandler, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../Services/Auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // Inject the current `AuthService` and use it to get an authentication token:
  // const authToken = inject(AuthService).getAuthToken();

  const authToken = inject(AuthService).getToken();

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

 return next(req);
}
