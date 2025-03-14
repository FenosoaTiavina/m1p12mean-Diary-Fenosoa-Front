import { CoreService } from 'src/app/services/core.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Component ,inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators ,ValidatorFn ,AbstractControl,ValidationErrors } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { Observable, of  } from 'rxjs';
 // Date Picker
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const CUSTOM_DATE_FORMAT = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};

 // Date Picker
import { AuthService } from '../../../../app/services/auth.service';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf ],
  templateUrl: './side-register.component.html',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
  ],
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  login_field = 'mail';

  private validateSamePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('password_confirm');
    return password?.value == confirmPassword?.value ? null : { 'notSame': true };
  }

  form = this.fb.nonNullable.group({
    login_field : ['mail', Validators.required],
    name : ['' , Validators.required],
    firstname : ['' , Validators.required],
    birth_date : ['' , Validators.required],
    CIN : ['' , Validators.required],
    gender : ['masculin' , Validators.required],
    mail: ['', Validators.email],
    phone: [''],
    password: ['', Validators.required],
    password_confirm: ['',[  Validators.required , this.validateSamePassword]],
  });

  constructor(private settings: CoreService) {
    this.onFieldSelect();
  }

  test(){
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (control?.errors) {
        console.log('Control name with error: ', controlName);
        console.log('Error details: ', control.errors);
      }
    });
  }
  submit() {
    const { mail, phone , name , firstname , password} = this.form.getRawValue();
    console.log(this.form.getRawValue());

    this.authService.register({role: 'role_002',  mail: mail , phone: phone , name: name , firstname : firstname}).subscribe((response) => {
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
