import { Component ,inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

import { AuthService } from '../../../../app/services/auth.service';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  login_field = 'mail';

  form = this.fb.nonNullable.group({
    login_field : ['mail', Validators.required],
    mail: ['' , Validators.email],
    phone: [''],
    password: ['', Validators.required],
  });

  constructor(){
    this.onFieldSelect();
  }
  submit() {
    this.authService.login({mail:this.form.getRawValue().mail, phone: this.form.getRawValue().phone , password:this.form.getRawValue().password , role_id : 'role_002' }).subscribe((response) => {
        console.log('response', response);
      if (response.error !== undefined ) {
        if (response.error.password == true) {
          this.form.controls['password'].setErrors({'incorrect': true});
        }
        if (response.error.mail == true) {
          this.form.controls['mail'].setErrors({'incorrect': true});
        }
        return;
      }
        this.router.navigateByUrl('/client');
    });
  }

  onFieldSelect() {
    const selectFieldControl = this.form.get('login_field');

    // Initially disable both fields and remove required validation
    this.form.get('mail')?.clearValidators();
    this.form.get('phone')?.clearValidators();

    if (selectFieldControl?.value === 'mail') {
      this.form.get('mail')?.enable();
      this.form.get('phone')?.disable();
      this.form.get('mail')?.setValidators([Validators.required]);
      this.login_field = 'mail';
    } else if (selectFieldControl?.value === 'phone') {
      this.form.get('phone')?.enable();
      this.form.get('mail')?.disable();
      this.form.get('phone')?.setValidators([Validators.required]);
      this.login_field = 'phone';
    }

    // Revalidate the form to apply validators dynamically
    this.form.get('mail')?.updateValueAndValidity();
    this.form.get('phone')?.updateValueAndValidity();
  }
}
