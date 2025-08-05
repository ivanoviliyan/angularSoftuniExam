import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-error-message',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-error-message.html',
  styleUrls: ['./input-error-message.css'],  // поправено от styleUrl
})
export class InputErrorMessage {
  @Input() field!: NgModel;
  @Input() fieldName = 'Field';

  getErrorMessage(): string {
    const errors = this.field?.errors;
    if (!errors) return '';

    if (errors['required']) return `${this.fieldName} is required.`;
    if (errors['minlength']) {
      return `${this.fieldName} must be at least ${errors['minlength'].requiredLength} characters.`;
    }
    if (errors['maxlength']) {
      return `${this.fieldName} must be at most ${errors['maxlength'].requiredLength} characters.`;
    }
    if (errors['pattern']) return `${this.fieldName} format is invalid.`;
    if (errors['min'])
      return `${this.fieldName} must be at least ${errors['min'].min}.`;
    if (errors['max'])
      return `${this.fieldName} must be at most ${errors['max'].max}.`;

    return 'Invalid input.';
  }
}
