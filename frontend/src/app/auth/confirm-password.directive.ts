import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkSamePassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.parent && control.parent!.get("password")) {
      let pass = control.parent!.get("password")!.value;
      let confirmPass = control!.value;
      return pass === confirmPass ? null : { notSame: true };
    } else {
      return { notSame: true };
    }
  };
}
