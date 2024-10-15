interface Camilla {
    id_bed?: number; // ID de la camilla, opcional porque es autoincremental
    number: number; // Número de la camilla, requerido
    area_id: number; // ID del área asociada, requerido
    status: 'disponible' | 'ocupada'; // Estado de la camilla, requerido, solo puede ser 'disponible' o 'ocupada'
}
