import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NucleoRoutingModule } from './nucleo-routing.module';
import { LoginComponent } from './login/login.component';

import { CompartidoModule } from '../compartido/compartido.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NucleoRoutingModule,
    CompartidoModule,
    ReactiveFormsModule, FormsModule
  ],exports: [LoginComponent,NucleoRoutingModule] 
})
export class NucleoModule { }
