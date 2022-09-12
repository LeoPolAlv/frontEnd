import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RolesGuard } from '../guards/roles.guard';
import { PagesComponent } from '../pages/pages.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: 'admin', 
        canActivate: [AuthGuard, RolesGuard,],
        canLoad: [RolesGuard],
        component: PagesComponent,
        loadChildren: () => import('./childAdmin-routes.module').then(m => m.ChildRoutesModule)
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
