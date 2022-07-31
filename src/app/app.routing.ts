import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuardService } from './services/auth-guard.service';
// import { BlankComponent } from './pages/blank/blank.component';
// import { SearchComponent } from './pages/search/search.component';


export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        canActivate: [AuthGuardService],
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'Dashboard' }
      },

      { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
      { path: '**', component: NotFoundComponent },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      relativeLinkResolution: 'legacy',
      // useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }