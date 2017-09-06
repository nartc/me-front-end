import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Activity } from '../models/activity';

@Injectable()
export class ActivityService {

  public activities: Array<Activity>;
  public activitiy: Activity;

  constructor(
    public httpService: HttpService
  ) { }

  getActivities(): Observable<any> {
    return this.httpService.get('/activities/getActivity', {});
  }

  updateRevenue(id: string, revenue: number): Observable<any> {
    let body = {revenue};
    return this.httpService.put('/activities/updateRevenue/'+id, body, {'Content-Type': 'application/json'});
  }

  updateExpense(id: string, expense: number): Observable<any> {
    let body = {expense};
    return this.httpService.put('/activities/updateExpense/'+id, body, {'Content-Type':'application/json'});
  }

}
