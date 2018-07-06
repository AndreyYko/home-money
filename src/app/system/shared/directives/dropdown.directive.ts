import { Directive, HostBinding, HostListener } from '@angular/core';
// GOOD IDEA TO ADD CLASS ON CLICK ELEMENT
@Directive({
  selector: '[flackDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  constructor() { }
  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}
