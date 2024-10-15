import { DateTime } from 'luxon'; // Puedes usar 'luxon' para manejar fechas, si lo necesitas

// Definición de la interfaz para el movimiento de pacientes
/*interface IMovimientoPaciente {
    idMovimiento?: number;     // ID del movimiento (auto-incremental)
    idPaciente: number;       // ID del paciente
    idArea: number;           // ID del área donde se encuentra el paciente
    idCamilla?: number;       // ID de la camilla (opcional, puede ser null)
    horaEntrada: DateTime;    // Hora de entrada (debe ser un datetime)
    horaSalida?: DateTime;    // Hora de salida (opcional, puede ser null)
}*/

// Clase que implementa la interfaz IMovimientoPaciente
export default class MovimientoPaciente /*implements IMovimientoPaciente*/ {
    idMovimiento?: number;
    idPaciente: number;
    idArea: number;
    idCamilla?: number;       // Este campo es opcional
    horaEntrada: DateTime;
    horaSalida?: DateTime;    // Este campo es opcional

    // Constructor para inicializar una instancia de MovimientoPaciente
    constructor(
        idMovimiento: number,
        idPaciente: number,
        idArea: number,
        horaEntrada: DateTime,
        horaSalida?: DateTime,
        idCamilla?: number
    ) {
        this.idMovimiento = idMovimiento;
        this.idPaciente = idPaciente;
        this.idArea = idArea;
        this.horaEntrada = horaEntrada;
        this.horaSalida = horaSalida;
        this.idCamilla = idCamilla;
    }

    // Método para calcular la duración de la estancia del paciente
    /*calcularDuracionEstancia(): number | null {
        if (this.horaSalida) {
            return this.horaSalida.diff(this.horaEntrada).as('minutes'); // Devuelve la duración en minutos
        }
        return null; // Si no hay hora de salida, retorna null
    }*/
}