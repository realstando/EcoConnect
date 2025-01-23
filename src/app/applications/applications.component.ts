import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { collection, CollectionReference, DocumentData, Firestore, getDocs, query, QuerySnapshot } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatButtonModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent {
  rowHeight = '50vh';

  constructor(
    private firestore: Firestore,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        if (result.matches) {
          this.rowHeight = '55vh'; // Adjust for smaller screens
        } else {
          this.rowHeight = '50vh'; // Default for larger screens
        }
      });
  }

  applications!: CollectionReference<DocumentData, DocumentData>;
  querySnapshot!: QuerySnapshot;
  applicationList: DocumentData[] = [];
  display: boolean = false;

  async ngOnInit() {
    this.applications = collection(this.firestore, 'applications');
    this.querySnapshot = await getDocs(query(this.applications));
    this.querySnapshot.forEach((doc) => {
      this.applicationList.push(doc.data());
    });
    this.display = true;

    this.cdr.detectChanges();
  }
}
