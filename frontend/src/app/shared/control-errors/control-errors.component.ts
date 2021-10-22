import { Component, Host, Input, OnInit, Optional } from "@angular/core";
import { AbstractControl, ControlContainer } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { marker } from "@biesbjerg/ngx-translate-extract-marker";

const defaultErrorMessages: { [key: string]: string } = {
  required: marker("VALIDATE.REQUIRED"),
  email: marker("VALIDATE.EMAIL"),
  maxlength: marker("VALIDATE.MAX_LENGTH"),
  minlength: marker("VALIDATE.MIN_LENGTH"),
  min: marker("VALIDATE.MIN"),
  max: marker("VALIDATE.MAX"),
  notSame: marker("VALIDATE.CONFIRM_PASSWORD"),
};

@Component({
  selector: "app-control-errors",
  templateUrl: "./control-errors.component.html",
  styleUrls: ["./control-errors.component.scss"],
})
export class ControlErrorsComponent implements OnInit {
  /**
   * The name of the FormControl for which the errors should be displayed
   */
  @Input() controlName!: string;
  /**
   * Map of custom messages (same structure of defaultErrorMessages)
   */
  @Input() customMessages: { [key: string]: string } = {};

  control!: AbstractControl;
  errorMessage?: string = undefined;
  constructor(
    private translateService: TranslateService,
    @Host()
    @Optional()
    private container: ControlContainer
  ) {}

  ngOnInit(): void {
    if (!this.container) {
      throw new Error(
        "Cannot find parent form group for controlName: " + this.controlName
      );
    }

    const control = (this.container.control as AbstractControl).get(
      this.controlName
    );

    if (!control) {
      throw new Error(
        "Cannot find control with name ${this.controlName} in the parent formGroup/formArray"
      );
    }

    this.control = control;
    control.statusChanges.subscribe((status) => {
      this.setErrorMessage();
    });

    this.setErrorMessage();
  }

  setErrorMessage() {
    if (this.control.errors == null) {
      this.errorMessage = undefined;
      return;
    }

    Object.keys(this.control.errors).forEach((key) => {
      this.errorMessage = this.getValidatorMessage(
        key,
        this.control.errors![key]
      );
    });
  }

  getValidatorMessage(validatorName: string, validatorValue?: any) {
    return this.translateService.instant(
      this.getValidatorMessageKey(validatorName),
      { value: validatorValue }
    );
  }

  private getValidatorMessageKey(validatorName: string): string {
    if (this.customMessages.hasOwnProperty(validatorName)) {
      return this.customMessages[validatorName];
    }

    if (defaultErrorMessages.hasOwnProperty(validatorName)) {
      return defaultErrorMessages[validatorName];
    }

    return marker("VALIDATE.GENERIC_ERROR");
  }
}
