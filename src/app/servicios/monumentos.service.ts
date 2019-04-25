import { Injectable } from '@angular/core';
import { Monumento } from '../interfaces/monumento';
import { Observable, of, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class MonumentosService {

  private lista: Monumento[] = []
  constructor(private fs: AngularFirestore, private fstorage: AngularFireStorage, private snackBar: MatSnackBar) { }

    listar(): Observable<any> {
      return null;
    }

    insertar(monumento : Monumento){

    }

    detallar(id:number): Observable<any> {

    }

    actualizar(monumento:Monumento,id:string){

    }

    eliminar(id:string){
      
    }

}
