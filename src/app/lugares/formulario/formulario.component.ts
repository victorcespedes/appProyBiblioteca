import { Component, OnInit, Inject,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Monumento } from 'src/app/interfaces/monumento';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormularioComponent implements OnInit {

  titulo: string = "Nuevo"
  grupo: FormGroup
  id: any

  archivo: any

  imagenCambiada: boolean = false

  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<FormularioComponent>, private formBuilder: FormBuilder, private storage: AngularFireStorage) { }

  ngOnInit() {  
    const datos = this.data ? this.data.monumento : {};
    this.id = this.data ? this.data.id : ""
    this.titulo = this.data ? "Edición" : "Nuevo"
    this.grupo = this.crearForm(datos)
    
      if (this.data.monumento.imagenes) {        
    //    if (this.data) {
          const ref = this.storage.ref(this.data.monumento.imagenes)
          ref.getDownloadURL()
            .subscribe(
              ruta => this.archivo = ruta
            )
      }
  }

        crearForm(data: Monumento): FormGroup {
          return this.formBuilder.group({
            titulo: [data.titulo, Validators.required],
            autores: [data.autores,Validators.required],
            anio: [data.anio,Validators.required],
            lugar: [data.lugar, Validators.required],

            imagenes: [data.imagenes]
          })
        }

        guardar() {          
              if (this.id == "") {
                this.dialogRef.close({monumento: this.grupo.getRawValue(),
                                             id: this.id
                                     }
                                    )
              } else {
                const datos = this.grupo.getRawValue()
                if (!this.imagenCambiada) {
                  delete datos.imagenes
                }

                this.dialogRef.close({
                  monumento: datos,
                  id: this.id
                })
              }

        }

        nuevaImagen(evt) {
          const file: File = evt.target.files[0]
          this.imagenCambiada = true

          this.grupo.patchValue({ imagenes: file })

          const fr = new FileReader()

          fr.onloadend = (resultado) => {
            console.log(resultado)          
            this.archivo = (<FileReader>resultado.target).result
          }

          fr.readAsDataURL(file)


          console.log(evt.target.files[0])
        }

}
