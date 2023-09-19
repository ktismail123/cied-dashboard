import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActiveLeads, ILeadsList, IStageGraph, IUserDetails, Iprobability } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ROOT_URL = 'https://assignment.leadtracker.cied.dev/v1';

  constructor(
    private http: HttpClient
  ) { }

  userDetails(userId: string): Observable<IUserDetails>{
    return this.http.get<IUserDetails>(`${this.ROOT_URL}/accounts/user/${userId}/`);
  }

  graphAndStageCount(stageType: string): Observable<IStageGraph>{
    return this.http.get<IStageGraph>(`${this.ROOT_URL}/leads/dashboard/graph/?stage_type=${stageType}`);
  }

  gerProbalities(stage_type: string):Observable<Iprobability>{
    return this.http.get<Iprobability>(`${this.ROOT_URL}/leads/probability/analysis/?stage_type=${stage_type}`)
  }

  activeLeadStatus(): Observable<IActiveLeads>{
    return this.http.get<IActiveLeads>(`${this.ROOT_URL}/leads/stage/`);
  }

  leadsList(stage_type: string, limit: number, offset: number, searchTearm: string): Observable<ILeadsList>{
    return this.http.get<ILeadsList>(`${this.ROOT_URL}/leads/?stage_type=${stage_type}&limit=${limit}&offset=${offset}&search=${searchTearm}&ordering=-probability`)
  }
}
