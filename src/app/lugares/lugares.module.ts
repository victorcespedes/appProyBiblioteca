import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LugaresRoutingModule } from './lugares-routing.module';

import { FormularioComponent } from './formulario/formulario.component';
import { ListadoComponent } from './listado/listado.component';
import { CompartidoModule } from '../compartido/compartido.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormularioComponent, ListadoComponent],
  imports: [
    CommonModule,
    LugaresRoutingModule,
    CompartidoModule,
    ReactiveFormsModule
  ],
  entryComponents:[FormularioComponent]
})
export class LugaresModule { }
