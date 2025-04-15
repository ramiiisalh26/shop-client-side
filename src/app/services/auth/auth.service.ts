import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../../api/login/login';
import { map, Observable } from 'rxjs';
import { signup } from '../../api/signup/signup';
import { Role } from '../role/role';
import {jwtDecode} from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { tokenInfo } from './tokenInfo';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8090/api/v1/auth";

  // Use it insted of localStorage Or Seesion storage becase it's more than secure  
  private userSubject = new BehaviorSubject<tokenInfo | null>(null);
  public _tokenInfo = this.userSubject.asObservable();

  private username!: String; 
  private role!: String;
  private expireDate!: Date;
  private isAuthenticated: boolean = false;

  constructor(private httpClient: HttpClient) { }

  // here fetchUser from server, beacuse I depend On Cookie Http-only, it's build and accessable from server 
  // To protect Auth action from "XSS" attack and "CSRF" attack;
  public fetchUser(): any{
    return this.httpClient.get(`${this.baseUrl}/tokenInfo`,{withCredentials: true})
    .subscribe(
      (user) =>{
        this.userSubject.next(user as tokenInfo);
        this.setUsername((user as tokenInfo).username);
        this.setRole((user as tokenInfo).role);
        this.setExipreDate((user as tokenInfo).expireDate);
        this.setAuthenticatedState(true);
      },
      (error) => this.userSubject.error(error)
    )
  }

  public getTokenInfo(): Observable<tokenInfo | null>{
    return this._tokenInfo;
  }

  public getUsername(): String | null{
    return this.username;
  }

  public setUsername(username: String): void{
    this.username = username;
  }

  public getRole(): String | null {
    return this.role;
  }

  public setRole(role: String): void{
    this.role = role;
  }

  public getExpireDate(): Date | undefined{
    return this.expireDate;
  }

  public setExipreDate(expireDate: Date): void{
    this.expireDate = expireDate;
  }
  
  public getAuthenticatedState(): boolean{
    // const nowDate = new Date(); 
    // const expireDate = this.getExpireDate();
    // expireDate ? nowDate.getTime() < new Date(expireDate).getTime() : false;
    return this.isAuthenticated;
  }

  public setAuthenticatedState(state: boolean): void{
    this.isAuthenticated = state;
  }

  public signUp(signup: signup): Observable<signup>{
    return this.httpClient.post<signup>(`${this.baseUrl}/register`,signup);
  }

  public login(login: login): Observable<login>{
    const http = this.httpClient.post<login>(`${this.baseUrl}/authenticate`,login,{withCredentials: true});
    return http;
  }

  public logout(): Observable<any>{
    const http = this.httpClient.post(`${this.baseUrl}/logout`,{},{withCredentials: true});
    return http;
  }



}
