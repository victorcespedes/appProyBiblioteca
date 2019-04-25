import { Component, OnInit } from '@angular/core';
import { Monumento } from 'src/app/interfaces/monumento';
import { Subject, merge, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MonumentosService } from 'src/app/servicios/monumentos.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  monumentos : Monumento[] = [];
  columnasAMostrar: string[] = ["titulo", "autores", "anio","lugar","acciones"];

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

  }

}
