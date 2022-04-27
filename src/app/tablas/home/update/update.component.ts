import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Evento } from 'src/app/shared/models/evento.model';
import { EventoService } from 'src/app/shared/services/evento.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Foto } from 'src/app/shared/models/foto.model';
import { FotoService } from 'src/app/shared/services/foto.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  form: FormGroup;
  evento: Evento
  id: number;

  permisosAuth: any[] = this.authSrv.getPermisos();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private eventoSrv: EventoService,
    private fotoSrv: FotoService,
    private authSrv: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['id']);
    this.eventoSrv.getOne(this.id).subscribe(e => {
      if (e) {
        this.evento = e;
        console.log(this.evento);
      };

      this.form.patchValue({
        id: this.evento.id,
        nombreEvento: this.evento.nombreEvento,
        descripcion: this.evento.descripcion,
        enlaceWeb: this.evento.enlaceWeb,
        fecha: this.evento.fecha,
        fotos: this.evento.fotos
      })
    });

    if (!this.haveAuth('WRITE_ADMIN')) {
      this.router.navigate(['/']);
    }

    this.form = this.formBuilder.group({
      id: '',
      nombreEvento: ['', Validators.required],
      descripcion: ['', Validators.required],
      enlaceWeb: [''],
      fecha: [''],
      fotos: ''
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

  getFotos(evento) {
    console.log(evento);

    // return evento.fotos[0].archivo
  }

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

  delete(foto) {
    // this.fotoSrv.delete(foto.id).subscribe();
  }

  download(foto) {
    this.fotoSrv.getOne(foto.id).subscribe(e => {
      if (e) {
        console.log(e);

        let link = document.createElement("a");

        link.setAttribute('href', 'data:image/png;base64,' + e.archivo);

        link.setAttribute('visibility', 'hidden');
        link.download = e.id + ".png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    })
  }

  send(f) {
    console.log(f.value);

    const formfoto: FormControl = this.form.get('fotos') as FormControl;
    let nfotos: Foto[] = formfoto.value;

    for (let i = 0; i < this.evento.fotos.length; i++) {
      nfotos.push(this.evento.fotos[i])
    }

    formfoto.setValue(nfotos)
    console.log(formfoto.value);

    this.eventoSrv.update(f.value).subscribe(() => { this.router.navigate(['/']); })
  }
}
