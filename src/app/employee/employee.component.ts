import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  formValue !: FormGroup;
  EmployeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formBuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      fistname: [''],
      lastname: [''],
      phone: [''],
      salary: [''],
  });
  this.getAllEmployees();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  postEmployeeDetails(){
    this.EmployeeModelObj.fistname = this.formValue.value.fistname;
    this.EmployeeModelObj.lastname = this.formValue.value.lastname;
    this.EmployeeModelObj.phone = this.formValue.value.phone;
    this.EmployeeModelObj.salary = this.formValue.value.salary;
    this.api.postEmployee(this.EmployeeModelObj).subscribe(
      data => {
        console.log(data);
        alert('Employee Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployees();
      },
      error => {
        console.log(error);
        alert('Employee Added Error');
      }
    );
  }

  getAllEmployees(){
    this.api.getEmployee().subscribe(
      data => {
        this.employeeData = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteEmployee(data: any) {
    this.api.deleteEmployee(data.id).subscribe(
      data => {
        console.log(data);
        alert('Employee Deleted Successfully');
        this.getAllEmployees();
      },
      error => {
        console.log(error);
        alert('Employee Deleted Error');
      }
    );
  }

  onEdit(data : any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.EmployeeModelObj.id = data.id;
    this.formValue.patchValue({
      fistname: data.fistname,
      lastname: data.lastname,
      phone: data.phone,
      salary: data.salary
    });
  }

  updateEmployee() {
    this.EmployeeModelObj.fistname = this.formValue.value.fistname;
    this.EmployeeModelObj.lastname = this.formValue.value.lastname;
    this.EmployeeModelObj.phone = this.formValue.value.phone;
    this.EmployeeModelObj.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.EmployeeModelObj.id , this.EmployeeModelObj).subscribe(
      data => {
        console.log(data);
        alert('Employee Updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        window.location.reload();
        this.formValue.reset();
        this.getAllEmployees();
      }
    );
  }

}
