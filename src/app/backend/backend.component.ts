import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  query,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-backend',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatButtonModule],
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.scss',
})
export class BackendComponent implements OnInit {
  // Default row height for the grid
  rowHeight = '57vh';

  // Constructor to inject required services
  constructor(
    private firestore: Firestore, // Firestore service for database operations
    private cdr: ChangeDetectorRef, // ChangeDetectorRef to manually trigger change detection
    private breakpointObserver: BreakpointObserver // BreakpointObserver for responsive design
  ) {
    // Observe screen size changes and adjust rowHeight dynamically
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait]) // Watch for specific breakpoints
      .subscribe((result) => {
        if (result.matches) {
          this.rowHeight = '62vh'; // Adjust rowHeight for smaller screens
        } else {
          this.rowHeight = '57vh'; // Use default rowHeight for larger screens
        }
      });
  }

  @ViewChildren('btn') btn!: QueryList<HTMLButtonElement>; // Reference to button elements for disabling after approval

  // Firestore collections for job postings
  allPostings!: CollectionReference<DocumentData, DocumentData>; // Reference to the "all-job-postings" collection
  approvedPostings!: CollectionReference<DocumentData, DocumentData>; // Reference to the "approved-postings" collection

  querySnapshot!: QuerySnapshot; // Snapshot of documents from Firestore
  postingList: DocumentData[] = []; // Array to store job postings data
  documentIDs: string[] = []; // Array to store document IDs for deletion
  display: boolean = false; // Flag to control display of grid content

  // Lifecycle hook called after component initialization
  async ngOnInit() {
    // Initialize Firestore collection references
    this.allPostings = collection(this.firestore, 'all-job-postings');
    this.approvedPostings = collection(this.firestore, 'approved-postings');

    // Fetch all documents from the "all-job-postings" collection
    this.querySnapshot = await getDocs(query(this.allPostings));

    // Iterate through each document in the snapshot
    this.querySnapshot.forEach((doc) => {
      this.postingList.push(doc.data()); // Add document data to the postingList array
      this.documentIDs.push(doc.id); // Store document ID for later use
    });

    // Set the display flag to true to render the grid
    this.display = true;

    // Trigger manual change detection to ensure the view updates
    this.cdr.detectChanges();
  }

  // Method to handle job posting approval
  submit(index: number) {
    // Add the approved job posting to the "approved-postings" collection
    addDoc(this.approvedPostings, this.postingList[index]);

    // Remove the approved job posting from the "all-job-postings" collection
    deleteDoc(doc(this.firestore, 'all-job-postings', this.documentIDs[index]));

    // Disable the corresponding approval button
    this.btn.toArray()[index].disabled = true;
  }
}
