import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IStudent } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './Students.component.html',
  styleUrls: ['./Students.component.css']
})
export class StudentsComponent implements OnInit {

  students: IStudent[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  dataSource: MatTableDataSource<IStudent> = new MatTableDataSource<IStudent>();

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  constructor(private studentService: StudentService) {

   }

  ngOnInit(): void {
    // fetch student
    this.studentService.getStudent()
    .subscribe(
      (successResponse) => {
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<IStudent>(this.students);

        if(this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

}
