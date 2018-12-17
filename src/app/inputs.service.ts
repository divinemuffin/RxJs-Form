import { Injectable } from '@angular/core';
import { Input } from './app.models';

@Injectable({
  providedIn: 'root'
})

export class InputsService {
  public hintSet:boolean = false;
  constructor() { }

  inputs: Array<Input> = [
    { id: 0, name: "email", isValid: false, 
      validators: {
        mask: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        minLen: 1
      },
      hint: "Email address must correspond to this example: example@valid.com"
    },
    { id: 1, name: "password", isValid: false, 
      validators: {
        minLen: 4
      },
      hint: "Password must contain at least four symbols"
    },
    { id: 2, name: "conf", isValid: false, 
      validators: {
        identicityTo: 1
      },
      hint: "Passwords must be identical"
    },
  ]
  
}
