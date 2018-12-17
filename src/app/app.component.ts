/**
 * Generated 16.12.18
 * Test assignment to practice RxJs
 * by Andrew Moskovchuk
 */
import { Input } from "./app.models";

import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { InputsService } from "./inputs.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private inputsService: InputsService ) { }

  ngOnInit() {
    const inputs = this.initInputObjects();
    this.initValidation(inputs);
  }

  initInputObjects(): Input[] {
    // converting node list to array by using call() method
    const nodes: Array<HTMLElement> = Array.prototype.slice.call(document.querySelectorAll("input:not([type='submit'])"));
    const _inputs = this.inputsService.inputs;
    nodes.map((el:any, i) => {
      // initializing events for each input field
      let _ev = this.initDomEvent(el, "change");
      // initializing objects
      _inputs[i].event = _ev;
      _inputs[i].node = el;
      _inputs[i].value = el.value;
    })
    return _inputs;
  }

  initDomEvent(domElement, type:string) {
    // listening for input event
    const _event = fromEvent(domElement, type);
    return _event;
  }
  
  initValidation(inputs: Input[]) {
    let submit = document.querySelector("input[type='submit']");
    submit['disabled'] = true;
    let submitter = this.initDomEvent(submit, "click");
    inputs.forEach(input => {
      input.event.pipe(
        tap(_ev => {
          // refreshing value
          input.value = _ev.target.value;
          let valids = inputs.map((inp) => {
            // validating
            inp.isValid = this.validate(inp)
            // toggling class for input
            inp.node.classList.toggle("valid", inp.isValid);
            // toggling hint
            this.inputsService.hintSet = this.toggleHint(inp);
            return inp.isValid;
          })
          let isFormValid = valids.reduce((all, next) => all && next, true);
          submit['disabled'] = !isFormValid;
        }),
        takeUntil(submitter),
      ).subscribe();
    })
    // end of Rx chain
    submitter.subscribe(() => alert("Done"))
  }

  validate(_input: Input):boolean {
    if (!_input.value.length) return false;
    let _isValid:boolean = true;

    let conditions = {
      mask: !!(_input.value.match(_input.validators.mask)),
      minLen: _input.value.length >= _input.validators.minLen,
      staticValue: _input.value === _input.validators.staticValue,
      identicityTo: (this.inputsService.inputs[_input.validators.identicityTo]) ? this.inputsService.inputs[_input.validators.identicityTo].value === _input.value : false
    }
    for (const validator in _input.validators) {
      if (conditions.hasOwnProperty(validator)) {
        if (conditions[validator] === false) _isValid = false;
      }
      else throw "No condition for validation!";
    }
    return _isValid;
  }

  toggleHint(_input: Input):boolean {
    if (!_input.isValid && !this.inputsService.hintSet && _input.value.length) {
      if (!(_input.node.nextElementSibling.className === "hint")) {
        let hint = document.createElement("p");
        hint.innerText = _input.hint;
        hint.className = "hint";
        hint.style.cssText = `
          font-size: 13px;
          color: rgb(155, 0, 0);
          margin: 0;
          position: absolute;
          margin-top: -12px;
        `;
        _input.node.parentNode.insertBefore(hint, _input.node.nextSibling);
      }
      return true
    }
    else {
      let hint = _input.node.nextElementSibling;
      if (hint.className === "hint" && _input.isValid) {
        _input.node.parentNode.removeChild(hint);
        return false
      }
    }
  }
}


