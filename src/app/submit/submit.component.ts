import { Component, inject, OnInit } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SubmittedComponent } from './submitted/submitted.component';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './submit.component.html',
  styleUrl: './submit.component.scss',
})
export class SubmitComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private firestore: Firestore,
  ) {}

  allPostings!: CollectionReference<DocumentData, DocumentData>;

  ngOnInit(): void {
    this.allPostings = collection(this.firestore, 'all-job-postings');
  }

  private fb = inject(FormBuilder);
  posting = this.fb.group({
    company: [null, Validators.required],
    companyCont: [null, Validators.required],
    companyDesc: [null, Validators.required],
    job: [null, Validators.required],
    jobResp: [null, Validators.required],
    jobQual: [null, Validators.required],
    jobLoc: [null, Validators.required],
    jobSal: [null, Validators.required],
  });

  readonly dialog = inject(MatDialog);
  onSubmit(): void {
    //addDoc(this.allPostings, this.posting.value);
    this.posting.reset();
    Object.keys(this.posting.controls).forEach((key) => {
      const control = this.posting.get(key);
      control?.setValidators(null); // Clear validators
      control?.updateValueAndValidity(); // Update validity after clearing
      control?.setValidators(Validators.required);
    });
    this.dialog.open(SubmittedComponent);

    // //addDoc(this.allPostings, this.posting.value);
    // this.posting.reset();
    // this.posting.markAsUntouched();
    // this.posting.markAsPristine();
    // this.posting.updateValueAndValidity();
    // // Object.keys(this.posting.controls).forEach((key) => {
    // //   const control = this.posting.get(key);
    // //   control?.setErrors(null); // Update validity after clearing
    // //   //control?.setValidators(Validators.required);
    // // });
    // console.log(this.posting.);
    // this.dialog.open(SubmittedComponent);

  }
}
