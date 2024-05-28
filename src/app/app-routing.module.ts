import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { HomeComponent } from './Components/home/home.component';
import { SampleUserComponent } from './Components/sample-user/sample-user.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'Admin', component: HomeComponent,
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: 'SampleUser', component: SampleUserComponent,
        data: {
          title: 'SampleUser',
        },
      },


    ]

    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
