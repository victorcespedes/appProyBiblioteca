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
      return this.fs.collection("monumento").snapshotChanges()
              .pipe(
                map(arrDocumentos => {
                  return arrDocumentos.map(doc => {
                    // console.log(doc.payload.doc.data());
                    // ...doc.payload.doc.data() que haceee??
                    return {
                             id: doc.payload.doc.id, ...doc.payload.doc.data()
                           }
                  })
                })
              );
    }

    insertar(monumento : Monumento){
      const archivo: File = monumento.imagenes
      const ruta = `imagenes/${Date.now()}_${archivo.name}`
      const ref = this.fstorage.ref(ruta)
      const tarea: AngularFireUploadTask = this.fstorage.upload(ruta, archivo)

      tarea.percentageChanges()
        .subscribe(
          porcentaje => console.log(porcentaje)
        )

      tarea.snapshotChanges()
        .pipe(
          finalize(() => {
            monumento.imagenes = ruta
            this.fs.collection("monumento").add(monumento)
          })
        )
        .subscribe()
    }

    detallar(id:number): Observable<any> {
      return of(this.lista[id])
    }

    actualizar(monumento:Monumento,id:string){
      if (monumento.imagenes) {
        const archivo: File = monumento.imagenes
        const ruta = `imagenes/${Date.now()}_${archivo.name}`
        const ref = this.fstorage.ref(ruta)
        const tarea: AngularFireUploadTask = this.fstorage.upload(ruta, archivo)

        tarea.percentageChanges()
          .subscribe(
            porcentaje => console.log(porcentaje)
          )

        tarea.snapshotChanges()
          .pipe(
            finalize(() => {
              monumento.imagenes = ruta
              this.fs.collection("monumento").doc(id).update(monumento)
                .then(
                  () => this.snackBar.open("Registro modificado", null, { duration: 2000 })
                )
            })
          )
          .subscribe()
      } else {
        const ref = this.fs.collection("monumento").doc(id)
        ref.update(monumento)
          .then(
            () => this.snackBar.open("Registro modificado", null, { duration: 2000 })
          )
      }
      

    }

    eliminar(id:string){
      this.fs.doc(`monumento/${id}`).delete()
    }

}
