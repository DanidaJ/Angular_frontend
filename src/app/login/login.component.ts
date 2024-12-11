import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http.post('http://localhost:8080/api/v1/user/login', loginData).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('fName', response.fName);
          localStorage.setItem('sName', response.sName);
          localStorage.setItem('email', response.email);


          // Check user type from response and redirect accordingly
          if (response.userType === 'Customer') {
            this.router.navigate(['book']);
          } else if (response.userType === 'Vendor') {
            this.router.navigate(['events']);
          } else {
            alert('Invalid user type. Please contact support.');
          }
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Invalid username or password');
        }
      );
    }
  }

  ngOnInit(): void {}

}
