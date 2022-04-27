import { Foto } from "./foto.model";

export interface Evento {
    id?: number;
    descripcion: string;
    enlaceWeb?: string;
    fecha?: string;
    nombreEvento: string;
    fotos?: Foto[];
}