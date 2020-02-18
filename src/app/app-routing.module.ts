import { PostDashboardComponent } from './posts/post-dashboard/post-dashboard.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { SinglepostComponent } from './posts/singlepost/singlepost.component';


const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },


  { path: 'dashboard', component: PostDashboardComponent},
  // display single page for single post
  { path: 'post/:Id', component: SinglepostComponent },

  { path: 'edit/:postId', component: PostCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
