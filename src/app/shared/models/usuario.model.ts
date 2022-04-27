import { Permiso } from './permiso.model';
import { Rol } from './rol.model';

export interface Usuario {
    id?: number;
    nombreUsuario: string;
    password?: string;
    nombre: string;
    email: string;
    rol?: Rol;
    permisos?: Permiso[];
    token?: string;
}