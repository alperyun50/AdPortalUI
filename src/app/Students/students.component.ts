import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  filterString: string = "";

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

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

        if(this.matSort) {
          this.dataSource.sort = this.matSort;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }


  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
