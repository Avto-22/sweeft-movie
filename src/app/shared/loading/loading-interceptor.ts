import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, finalize, Observable } from "rxjs";
import { LoadingService } from "src/app/services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{

    constructor(private loading: LoadingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loading.start();
        return next.handle(req).pipe(
            delay(500),
            finalize(()=>{
              this.loading.end();
            })
        );
    }
}
