import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../../../environment';

export const commonInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({
    setHeaders: {
      'x-api-key': environment.apiKey,
      'Accept': 'application/json'
    }
  })
  return next(clonedReq);
};
