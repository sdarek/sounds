import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-recording-dialog',
  templateUrl: './new-recording-dialog.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent
  ]
})
export class NewRecordingDialogComponent {
  newRecordingForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewRecordingDialogComponent>) {
    this.newRecordingForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.newRecordingForm.valid) {
      this.dialogRef.close(this.newRecordingForm.value);
    }
  }
}
