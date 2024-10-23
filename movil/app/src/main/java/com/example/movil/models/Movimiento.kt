package com.example.movil.models

data class Movimiento(
    val id_movimiento: Number?,
    val id_paciente: Number?,
    val id_area: Number?,
    val id_camilla: Number?,
    val hora_entrada: String?,
    val hora_salida: String?
);
