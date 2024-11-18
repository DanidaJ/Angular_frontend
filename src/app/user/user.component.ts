import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule, HttpClientModule, NgForOf,NgIf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  users:any[]=[];
  userForm: FormGroup;

  constructor(private fb:FormBuilder,private http:HttpClient) {
    this.userForm=this.fb.group({
      id:[0],
      username:['',Validators.required],
      password:['',Validators.required],
      fName:['',Validators.required],
      sName:['',Validators.required],
      email:['',[Validators.required]]
    })
  }

  onSubmit() {

    if (this.userForm.valid){
      //request send >> backend
      console.log(this.userForm.value)

      const formData=this.userForm.value
      //send a post http request to the backend server
      this.http.post('http://localhost:8080/api/v1/user/createUser',formData).subscribe(
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
}
