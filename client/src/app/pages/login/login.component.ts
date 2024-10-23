import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    NzLayoutModule, 
    NzGridModule, 
    NzFlexModule, 
    NzFormModule, 
    NzIconModule, 
    NzInputModule, 
    NzCheckboxModule,
    NzToolTipModule,
    RouterOutlet,
    ReactiveFormsModule
   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  validateForm: FormGroup<{
    usernameOrEmail: FormControl<string>;
    password: FormControl<string>;
  }>;

  // Hàm submit
  submitForm(): void {
    if (this.validateForm.valid) {
      this.http.post('http://localhost:3000/api/login', this.validateForm.value).subscribe({
        next: (response: any) => {
          if (response.code === 200) {
            localStorage.setItem('token', response.data.token);
            this.message.success('Login successfully!');
            this.router.navigate(['/homepage']);
          }
        },
        error: (error) => {
          this.message.error(error.error.message || 'Login failed!');
        },
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  
  // Khởi tạo 
  constructor(
    private fb: NonNullableFormBuilder,
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router,
  ) {
    this.validateForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
