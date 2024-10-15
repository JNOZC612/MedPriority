package com.example.movil.models

data class Paciente(
    val id: Number?,
    val nombre: String,
    val fecha_nacimiento: String,
    val sexo: String,
    val email: String,
    val direccion: String?,
    val telefono: String?,
    val seguro: String?
)