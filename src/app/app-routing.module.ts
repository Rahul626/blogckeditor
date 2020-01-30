import { PostDashboardComponent } from './posts/post-dashboard/post-dashboard.component';

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { AboutComponent } from "./about/about.component";
import { FaqComponent } from './faq/faq.component';
import { CkComponent } from './new/ck/ck.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'dashboard', component: PostDashboardComponent},
  { path: 'ckeditor', component: CkComponent },

  { path: 'edit/:postId', component: PostCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
