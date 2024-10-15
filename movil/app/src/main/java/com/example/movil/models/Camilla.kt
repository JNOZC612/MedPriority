package com.example.movil.models

data class Camilla(
    val id_camilla: Int,      // Llave primaria
    val numero: Int,          // Número de la camilla
    val id_area: Int,         // Llave foránea hacia la tabla Area
    val estado: CamillaEstado  // Estado de la camilla
)

// Enum para representar el estado de la camilla
enum class CamillaEstado(val estado: String) {
    DISPONIBLE("disponible"),
    OCUPADA("ocupada");
}
