import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../Models/student';
import { StudentService } from '../../Services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{
  @ViewChild('myModal') Modal : ElementRef | undefined;
  studentList : Student[] = [];
  stuService = inject(StudentService);
  studentForm : FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.setFormState();
    this.getStudents();
  }
  openModal()
  {
    const stuModal = document.getElementById('myModal');
    if(stuModal != null)
    {
      stuModal.style.display = 'block';
    }
  }
  closeModal()
  {
    this.setFormState();
    if(this.Modal != null) {
      this.Modal.nativeElement.style.display = 'none';
    }
  }
  getStudents()
  {
    this.stuService.getAllStudent().subscribe((res) => {
      this.studentList = res;
    })
  }
  setFormState()
  {
    this.studentForm = this.fb.group({
      id: [0],
      studentName: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]]
    })
  }
  formValues :any;
  onSubmit()
  {
    console.log(this.studentForm.value);
    if(this.studentForm.invalid)
    {
      alert('Please Fill All Field');
      return;
    }
    if(this.studentForm.value.id == 0) 
    {
      this.formValues = this.studentForm.value;
    this.stuService.addStudent(this.formValues).subscribe((res) => {
      alert('Student Added Successfully');
      this.getStudents();
      this.studentForm.reset();
      this.closeModal();
    });
    } else {
      this.formValues = this.studentForm.value;
    this.stuService.updateStudent(this.formValues).subscribe((res) => {
      alert('Student Updated Successfully');
      this.getStudents();
      this.studentForm.reset();
      this.closeModal();
    });
    }
    
  }
  onEdit(Student : Student)
  {
    this.openModal();
    this.studentForm.patchValue(Student);
  }
  onDelete(student : Student)
  {
    const isConfirm = confirm("Are you sure you want to delete this Student " + student.studentName);
    if(isConfirm)
    {
      this.stuService.deleteStudent(student.id).subscribe((res) => {
        alert("Student Deleted Successfully");
        this.getStudents();
      });
    }
  }
}
