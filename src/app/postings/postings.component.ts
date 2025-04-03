import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  inject,
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
import { ApplyComponent } from '../apply/apply.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-postings',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatButtonModule],
  templateUrl: './postings.component.html',
  styleUrl: './postings.component.scss',
})
export class PostingsComponent {
  rowHeight = '57vh';

  constructor(
    private firestore: Firestore,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        if (result.matches) {
          this.rowHeight = '110vh'; // Adjust for smaller screens
        } else {
          this.rowHeight = '70vh'; // Default for larger screens
        }
      });
  }

  approvedPostings!: CollectionReference<DocumentData, DocumentData>;
  querySnapshot!: QuerySnapshot;
  postingList: DocumentData[] = [];
  documentIDs: string[] = [];
  display: boolean = false;

  async ngOnInit() {
    this.approvedPostings = collection(this.firestore, 'approved-postings');
    this.querySnapshot = await getDocs(query(this.approvedPostings));
    this.querySnapshot.forEach((doc) => {
      this.postingList.push(doc.data());
      this.documentIDs.push(doc.id);
    });
    this.display = true;

    this.cdr.detectChanges();
  }

  readonly dialog = inject(MatDialog);
  submit(job: String, comp: String) {
    this.dialog.open(ApplyComponent, {
      maxWidth: '70vw',
      data: {
        job: job,
        company: comp,
      },
    });
  }
}
