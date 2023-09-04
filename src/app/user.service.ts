import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api-crud-with-mongdb-backend.vercel.app'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createuser`, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateuser/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/deleteuser/${id}`).subscribe((res)=>{
    this.getUsers();
    });
  }
}
