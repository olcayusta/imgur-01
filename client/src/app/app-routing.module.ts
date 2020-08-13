import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PostComponent } from './post/post.component';


const routes: Routes = [
  {
    path: '',
    component: SidenavContainerComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'feedback', component: FeedbackComponent},
      {path: 'post', component: PostComponent},
      {
        path: '**', component: PageNotFoundComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
