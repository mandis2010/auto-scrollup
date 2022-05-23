import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from "rxjs";
import {Constants} from "../const/const.enum";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  data: any = new BehaviorSubject<any[]>([]);
  dataServiceTimer: any;

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.data.asObservable();
  }

  callDataService() {
    this.cancelDataServiceTimer();
    this.callNodeServer();
  }

  callNodeServer() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(Constants.DATA_URL, {
      headers: headers,
      params: new HttpParams()
    }).pipe(map(res => res ? res : [])).subscribe(resData => {
      this.data.next(resData);
      this.startDataServiceTimer();
    }, errorData => {
      console.log("ErrorData:" + errorData);
    });
  }


  startDataServiceTimer() {
    this.cancelDataServiceTimer();
    this.dataServiceTimer = setTimeout(() => {
      this.callDataService();
    }, 5000);
  }

  cancelDataServiceTimer() {
    if (this.dataServiceTimer) {
      clearTimeout(this.dataServiceTimer);
    }
  }

}
