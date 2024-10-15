export class Paciente {
    id_paciente?: number; // Opcional, se asignará al insertar en la base de datos
    nombre: string;
    fecha_nacimiento: Date; // Usamos Date para representar fechas
    sexo: 'M' | 'F'; // Tipo de dato específico para el campo ENUM
    direccion?: string; // Opcional
    telefono?: string; // Opcional
    email: string; // Correo único
    seguro?: string; // Opcional

    constructor(
        nombre: string,
        fecha_nacimiento: Date,
        sexo: 'M' | 'F',
        email: string,
        direccion?: string,
        telefono?: string,
        seguro?: string,
        id_paciente?: number // Opcional
    ) {
        this.nombre = nombre;
        this.fecha_nacimiento = fecha_nacimiento;
        this.sexo = sexo;
        this.email = email;
        this.direccion = direccion;
        this.telefono = telefono;
        this.seguro = seguro;
        if (id_paciente) {
            this.id_paciente = id_paciente; // Asignar el ID si se proporciona
        }
    }
}