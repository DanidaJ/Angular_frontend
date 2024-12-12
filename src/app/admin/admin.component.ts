import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule, HttpClientModule, NgForOf, NgIf, FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  users:any[]=[];
  userForm: FormGroup;
  logData: string='';

  constructor(private fb:FormBuilder,private http:HttpClient) {
    this.userForm=this.fb.group({
      id:[0],
      username:['',Validators.required],
      password:['',Validators.required],
      fName:['',Validators.required],
      sName:['',Validators.required],
      email:['',Validators.required],
      userType:['',[Validators.required]]
    })
  }



  getAllUsers(){
    this.http.get<any[]>('http://localhost:8080/api/v1/user/getAllUsers').subscribe(
      (response)=>{
        this.users=response;
        console.log(this.users)
      },
      (error)=>{
        console.error('Error fetching users',error)
      }
    )
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllLogs();
  }

  deleteUser(userId:any) {
    this.http.delete('http://localhost:8080/api/v1/user/deleteUser/'+userId).subscribe(
      (response)=>{
        console.log(response)
        this.getAllUsers();
      },
      (error)=>{
        console.error('Error fetching users',error)
      }
    )
  }


  onEdit(u: any) {
    this.userForm.patchValue({
      id:u.id,
      username:u.username,
      password:u.password,
      fName:u.fName,
      sName:u.sName,
      email:u.email
    })
  }

  updateUser() {

    if (this.userForm.valid){
      //request send >> backend
      console.log(this.userForm.value)

      const formData=this.userForm.value
      //send a post http request to the backend server
      this.http.put('http://localhost:8080/api/v1/user/updateUser',formData).subscribe(
        (response)=>{
          console.log("User Saved!",response);
          this.getAllUsers();
        },
        (error)=>{
          console.error('Error Saving User',error)
        }
      )
    }else {
      console.error('Form is invalid')
    }
  }
  getAllLogs() {
    this.http.get<any[]>('http://localhost:8080/api/v1/log/showlog').subscribe(
      (response) => {
        // Check if the response is an array
        if (Array.isArray(response)) {
          console.log('Logs fetched successfully:', response);
          this.logData=response.join('\n')
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching logs', error);
      }
    );
  }
}
