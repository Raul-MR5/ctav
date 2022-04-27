import { Permiso } from './permiso.model';

export interface Rol {
    id?: number;
    rolNombre: string;
    permisos?: Permiso[];
}