import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminSettleComponent } from './admin-settle/admin-settle.component';
import { AdminSettlesComponent } from './admin-settles/admin-settles.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';

const routes: Routes = [{
  path: '',
//  canActivate: [OnlyAdminUsersGuard],
  children: [
	  {
		path: '',
		component: AdminComponent,
	  },
	  {
		path: 'admin-settle/:id',
		component: AdminSettleComponent,
	  },
	  {
		path: 'admin-settles',
		component: AdminSettlesComponent,
	  },
  ]
}];
/*
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}
*/
export const AdminRoutingModule = RouterModule.forChild(routes);
