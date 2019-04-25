import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Usuario } from '../interfaces/usuario';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  onCambioEstado: Subject<boolean> = new Subject<boolean>();

  constructor(private afAth : AngularFireAuth  ) { }

  login(usuario: Usuario){
    this.afAth.auth.signInWithEmailAndPassword(usuario.correo,usuario.contrasena);
  } 

  loginGoogle(){
    this.afAth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  logout(){
    this.afAth.auth.signOut();
  }

  estaAutenticado(): boolean {
    if (sessionStorage.getItem("usuario")) return true
    return false
  }

}
