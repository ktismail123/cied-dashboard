import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActiveLeads, ILeadsList, IStageGraph, IUserDetails, Iprobability } from '../../models/user.model';

/**
 * Service for managing user-related data.
 * This service handles operations like fetching user details, lead statistics, and leads list.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** The root URL for API requests. */
  ROOT_URL = 'https://assignment.leadtracker.cied.dev/v1';

  /**
   * Initializes the UserService.
   * @param http - The HttpClient for making HTTP requests.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Retrieves user details for a given user ID.
   * @param userId - The ID of the user.
   * @returns An Observable of IUserDetails.
   */
  userDetails(userId: string): Observable<IUserDetails> {
    return this.http.get<IUserDetails>(`${this.ROOT_URL}/accounts/user/${userId}/`);
  }

  /**
   * Retrieves stage and graph count data for a specified stage type.
   * @param stageType - The type of the stage (e.g., 'active', 'won').
   * @returns An Observable of IStageGraph.
   */
  graphAndStageCount(stageType: string): Observable<IStageGraph> {
    return this.http.get<IStageGraph>(`${this.ROOT_URL}/leads/dashboard/graph/?stage_type=${stageType}`);
  }

  /**
  * Retrieves probability analysis data for a specified stage type.
  * @param stage_type - The type of the stage (e.g., 'active', 'completed').
  * @returns An Observable of Iprobability.
  */
  getProbalities(stage_type: string): Observable<Iprobability> {
    return this.http.get<Iprobability>(`${this.ROOT_URL}/leads/probability/analysis/?stage_type=${stage_type}`)
  }

  /**
   * Retrieves active leads status data.
   * @returns An Observable of IActiveLeads.
   */
  activeLeadStatus(): Observable<IActiveLeads> {
    return this.http.get<IActiveLeads>(`${this.ROOT_URL}/leads/stage/`);
  }

  /**
   * Retrieves leads list based on stage type, limit, offset, and search term.
   * @param stage_type - The type of the stage (e.g., 'active', 'completed').
   * @param limit - The maximum number of leads to retrieve.
   * @param offset - The starting index for pagination.
   * @param searchTearm - The search term for filtering leads.
   * @returns An Observable of ILeadsList.
   */
  leadsList(stage_type: string, limit: number, offset: number, searchTearm: string): Observable<ILeadsList> {
    return this.http.get<ILeadsList>(`${this.ROOT_URL}/leads/?stage_type=${stage_type}&limit=${limit}&offset=${offset}&search=${searchTearm}&ordering=-probability`)
  }
}
