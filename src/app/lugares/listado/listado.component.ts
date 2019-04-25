import { Component, OnInit } from '@angular/core';
import { Monumento } from 'src/app/interfaces/monumento';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject, merge, Subscription } from 'rxjs';
import { MonumentosService } from 'src/app/servicios/monumentos.service';
import { FormularioComponent } from '../formulario/formulario.component';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  monumentos : Monumento[] = [];

  columnasAMostrar: string[] = ["titulo", "anio","lugar","acciones"];

  suscripcion : Subscription

  constructor(private monumentoServ : MonumentosService, private dialog: MatDialog, private fs: AngularFirestore) { }

  ngOnInit() {
      this.suscripcion = this.monumentoServ.listar()
        .subscribe(
          (resultado : Monumento[]) =>{
              this.monumentos = resultado;
          }
        )
  }

  nuevo(){
    this.formulario();
  }

  editar(monumento:Monumento){
    this.formulario({monumento,id:monumento.id});
  }

  formulario(data = null){
    const ref = this.dialog.open(FormularioComponent,{
      panelClass:"miClase",data
    })

    ref.afterClosed()
      .subscribe(
        (respuesta: any) => {
          if (!respuesta) return false

          if (respuesta.id != "") {
            this.monumentoServ.actualizar(respuesta.monumento, respuesta.id)
          } else {
            this.monumentoServ.insertar(respuesta.monumento)
          }
        }
      ) 

  }


  eliminar(id: string) {
   
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe()
  }

}
