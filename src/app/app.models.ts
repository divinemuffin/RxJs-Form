import { Observable } from "../../node_modules/rxjs";

export interface Validators {
    /**
     * @param minLen minimum characters to enter
     * @param staticValue string that must correspond
     * @param identicityTo field must be identical to oter with provided id
     */ 

    minLen?: number;
    mask?: RegExp;
    staticValue?: string; 
    identicityTo?: number;
}

export interface Input {
    id: number;
    name?: string;
    node?: HTMLElement;
    isValid: boolean;
    event?: Observable<any>;
    validators?: Validators;
    value?: string;
    hint?: string;
  }[]