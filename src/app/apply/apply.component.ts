import { Component, Inject, inject, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-apply',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.scss',
})
export class ApplyComponent implements OnInit {
  constructor(
    private firestore: Firestore,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ApplyComponent>
  ) {}

  job!: String;
  company!: String;
  applications!: CollectionReference<DocumentData, DocumentData>;

  ngOnInit() {
    this.job = this.data.job;
    this.company = this.data.company;
    this.applications = collection(this.firestore, 'applications');
  }

  private fb = inject(FormBuilder);
  applyForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    age: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, Validators.required],
    address: [null, Validators.required],
    hours: [null, Validators.required],
    jobExp: [null, Validators.required],
    reason: [null, Validators.required],
    other: [null],
  });

  onSubmit() {
    const values: { [key: string]: any } = {
      ...this.applyForm.value,
      job: this.job,
      company: this.company,
    };
    addDoc(this.applications, values);
    this.dialogRef.close();
  }
}
