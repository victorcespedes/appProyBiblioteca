import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';


const routes: Routes = [
  { path:"",component:LoginComponent },
  { path:"bienvenido",component:BienvenidoComponent},
  { path:"monumentos",loadChildren:"../lugares/lugares.module#LugaresModule"},
  { path:"**",redirectTo:"" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NucleoRoutingModule { }
