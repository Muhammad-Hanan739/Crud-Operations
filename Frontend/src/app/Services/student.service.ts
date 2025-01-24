import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Student } from '../Models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7124/api/Student'; 
  
  http = inject(HttpClient);

  getAllStudent() {
    return this.http.get<Student[]>(this.apiUrl);
  }

  addStudent(data: Student) {
    return this.http.post(this.apiUrl, data);
  }

  updateStudent(student: Student) {
    return this.http.put(`${this.apiUrl}/${student.id}`, student);
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`); 
  }
}
