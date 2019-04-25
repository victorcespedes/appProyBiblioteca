import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  grupo : FormGroup;

  constructor(private autentificacionServ : AutenticacionService) { }

  ngOnInit() {
    this.grupo = new FormGroup({
      correo: new  FormControl(null,[Validators.required,Validators.email]),
      contrasena : new FormControl(null,[Validators.required])
    })
  }

  login(){
    const usuario : Usuario = this.grupo.getRawValue();
    this.autentificacionServ.login(usuario);
  }

  loginGoogle(){
    this.autentificacionServ.loginGoogle();
  }

}
