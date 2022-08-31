import { Component, Input } from "@angular/core";

@Component({
  selector: "app-form-input",
  templateUrl: "./form-input.component.html",
})
export class FormInputComponent {
  @Input() id?: string = null;
  @Input() type?: string = "text";
  @Input() name?: string = null;
  @Input() label?: string = null;
  @Input() value?: any = null;
  @Input() readonly?: boolean = false;
  @Input() required?: boolean = false;

  constructor() {}
}
