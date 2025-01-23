import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostingsComponent } from './postings/postings.component';
import { SubmitComponent } from './submit/submit.component';
import { ApplyComponent } from './apply/apply.component';
import { BackendComponent } from './backend/backend.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ApplicationsComponent } from './applications/applications.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "postings", component: PostingsComponent },
    { path: "submit", component: SubmitComponent },
    { path: "apply", component: ApplyComponent },
    { path: "backend", component: BackendComponent},
    { path: "applications", component: ApplicationsComponent},
    { path: '**', component: NotfoundComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
