import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentification.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public fg : FormGroup<{
    email : FormControl<string>,
    password : FormControl<string>,
    passwordCheck: FormControl<string>
  }>


  constructor(private afService : AuthenticationService,
              private fb : FormBuilder) { 

    this.fg = this.fb.nonNullable.group({
      email : [""],
      password : [""],
      passwordCheck : [""]
    })
  }
}
