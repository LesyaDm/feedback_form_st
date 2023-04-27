import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<any[]>{
    return this.http.get<any[]>(this.baseApiUrl + '/api/messages');
  }

  addMessage(addMessage: any){
    return this.http.post(this.baseApiUrl + '/api/messages', addMessage);
  }

  getMessage(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.baseApiUrl + '/api/messages/' + id);
  }

  getAllContacts(): Observable<any[]>{
    return this.http.get<any[]>(this.baseApiUrl + '/api/contacts');
  }

  addContact(addContact: any){
    return this.http.post(this.baseApiUrl + '/api/contacts', addContact);
  }

  getContact(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.baseApiUrl + '/api/contacts/' + id);
  }

  getAllTopics(): Observable<any[]>{
    return this.http.get<any[]>(this.baseApiUrl + '/api/topics');
  }

  getTopic(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.baseApiUrl + '/api/topics/' + id);
  }

}


