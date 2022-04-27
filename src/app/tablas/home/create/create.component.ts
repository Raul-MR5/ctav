import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Foto } from 'src/app/shared/models/foto.model';
import { FotoService } from 'src/app/shared/services/foto.service';
import { Evento } from 'src/app/shared/models/evento.model';
import { EventoService } from 'src/app/shared/services/evento.service';
import { AuthService } from 'src/app/shared/services/auth.service';

import { MessageService } from 'primeng/api';

// import * as fromAccount from 'src/app/shared/state/account/account.reducer';
// import { Action as accountActions } from 'src/app/shared/state/account/account.actions';

// import { Store } from '@ngrx/store';
// import { Action as usuarioActions } from '../../usuarios/state/usuario.actions';
// import * as fromUsuario from '../../usuarios/state/usuario.reducer';
// import { Action as cocheActions } from '../state/coche.actions';
// import * as fromCoche from '../state/coche.reducer';

// import { Observable } from 'rxjs';
// import { RequestFilter } from 'src/app/shared/models/request-filter';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  evento: Evento

  file: Blob;

  permisosAuth: any[] = this.authSrv.getPermisos();

  entities$: Observable<Evento[]> = this.eventoSrv.getAll();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private eventoSrv: EventoService,
    private fotoSrv: FotoService,
    private authSrv: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.haveAuth('WRITE_ADMIN')) {
      this.router.navigate(['/']);
    }

    this.form = this.formBuilder.group({
      id: '',
      nombreEvento: ['', Validators.required],
      descripcion: ['', Validators.required],
      enlaceWeb: [''],
      fecha: [''],
      fotos: null
    });
  }

  ngOnDestroy(): void {
  }

  haveAuth(auth: string): boolean {
    if (this.permisosAuth.find(e => e.authority == auth)) {
      return true;
    }

    return false;
  }

  // async onUpload(event) {
  //   // var reader = new FileReader();
  //   // var fileByteArray = [];

  //   console.log(event.files);
  //   console.log(event.currentFiles);


  //   // for (let file of event.currentFiles) {
  //   // const formfoto: FormControl = this.form.get('fotos') as FormControl;
  //   // const foto: ArrayBuffer = await event.target.files.item(0).arrayBuffer()
  //   // var byteArray = new Int8Array(foto as ArrayBuffer);

  //   // const foto: ArrayBuffer = await event.files.item(0).arrayBuffer()
  //   // var byteArray = new Int8Array(foto as ArrayBuffer);

  //   // this.file.push(byteArray);

  //   var blob = new Blob(event.files)
  //   this.file = blob;

  //   // reader.readAsArrayBuffer(file);

  //   // reader.onloadend = function (evt) {
  //   //   if (evt.target.readyState == FileReader.DONE) {
  //   //     console.log(evt.target.result);

  //   //     var arrayBuffer = evt.target.result
  //   //     var array = new Uint8Array(arrayBuffer as ArrayBuffer);
  //   //     for (var i = 0; i < array.length; i++) {
  //   //       fileByteArray.push(array[i]);
  //   //     }
  //   //     console.log(fileByteArray);
  //   //   }
  //   // }

  //   // var theBytes = event.currentFiles; //.split('base64,')[1]; // use with uploadFile2
  //   // this.file.push(theBytes);
  //   // document.getElementById('file').innerText = '';
  //   // for (var i=0; i<fileByteArray.length; i++) {
  //   //     document.getElementById('file').innerText += fileByteArray[i];
  //   // }

  //   // this.file = event.files
  //   var reader = new FileReader();
  //   // reader.onload = function (evt) {
  //   //     if (evt.target.readyState == FileReader.DONE) {
  //   //       console.log(evt.target.result);

  //   //       var arrayBuffer = evt.target.result
  //   //       var array = new Uint8Array(arrayBuffer as ArrayBuffer);
  //   //       for (var i = 0; i < array.length; i++) {
  //   //         // this.file.push(array[i]);
  //   //       }
  //   //       // console.log(fileByteArray);
  //   //     }
  //   //   }
  //   reader.readAsArrayBuffer(this.file)
  //   console.log(this.file);



  //   // }

  //   this.messageService.add({ severity: 'info', summary: 'Foto cargada', detail: '' });
  // }

  async onUpload(event) {
    let fotos: Foto[] = [];
    const formfoto: FormControl = this.form.get('fotos') as FormControl;

    const files: any[] = await event.currentFiles;
    // const files: any[] = await event.target.files;
    console.log(files);

    for (let f of files) {
    const file: ArrayBuffer = await f.arrayBuffer()
    // for (let i = 0; i < files.length; i++) {
    //   const file: ArrayBuffer = await event.target.files.item(i).arrayBuffer()
      var byteArray = new Int8Array(file as ArrayBuffer);
      let foto: Foto = {
        archivo: [...byteArray]
      }
      fotos.push(foto);
    }
    formfoto.setValue(fotos);
  }

  onClear() {
    const formfoto: FormControl = this.form.get('fotos') as FormControl;
    formfoto.setValue(null)
    console.log(formfoto.value);

  }

  send(f) {
    console.log(f.value);

    // if (f.value.fotos) {
    //   console.log("hola");
    //   if (f.valid) {
    //     let foto: Foto = {
    //       id: null,
    //       archivo: f.value.fotos,
    //       url: ''
    //     }

    //     console.log(foto);

    //     this.fotoSrv.create(foto).subscribe()

    //     console.log('foto');

    //     // this.fotoSrv.getOne
    //   }
    // }

    if (f.valid) {
      console.log("envia");

      this.eventoSrv.create(f.value).subscribe(() => { this.router.navigate(['/']); })
    }
  }
}
