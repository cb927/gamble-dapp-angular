import {NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {OnlyAdminUsersGuard} from './admin-user-guard';
import { AdminSettleComponent } from './admin-settle/admin-settle.component';
import { AdminSettlesComponent } from './admin-settles/admin-settles.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSettleComponent,
    AdminSettlesComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  providers: [
    OnlyAdminUsersGuard
  ]})
export class AdminModule {}
