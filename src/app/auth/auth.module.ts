import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordSettingComponent } from './password-setting/password-setting.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, PasswordSettingComponent],
})
export class AuthModule {}
