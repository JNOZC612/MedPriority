--CREATE DATABASE IF NOT EXISTS hospitaldb;

USE hospitaldb;

-- Tabla de Especialidad
CREATE TABLE
    especialidad (
        id_especialidad INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
        nombre_especialidad VARCHAR(100) NOT NULL UNIQUE -- Nombre único de la especialidad
    );

-- Tabla de Doctor
CREATE TABLE
    doctor (
        id_doctor INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        id_especialidad INT, -- Llave foránea hacia la tabla Especialidad
        telefono VARCHAR(15),
        email VARCHAR(100) UNIQUE, -- Correo único para cada doctor
        contrasena VARCHAR(15),
        FOREIGN KEY (id_especialidad) REFERENCES especialidad (id_especialidad)
    );

-- Tabla de Paciente
CREATE TABLE
    paciente (
        id_paciente INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
        nombre VARCHAR(100) NOT NULL,
        fecha_nacimiento DATE NOT NULL,
        sexo ENUM ('M', 'F') NOT NULL,
        direccion VARCHAR(255),
        telefono VARCHAR(15),
        email VARCHAR(100) UNIQUE, -- Correo único para cada paciente
        seguro VARCHAR(100)
    );

-- Tabla de Historial
CREATE TABLE
    historial (
        id_historial INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
        id_paciente INT, -- Llave foránea hacia la tabla Paciente
        id_doctor INT, -- Llave foránea hacia la tabla Doctor
        fecha DATE NOT NULL,
        descripcion TEXT,
        tratamiento TEXT,
        FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente),
        FOREIGN KEY (id_doctor) REFERENCES doctor (id_doctor)
    );

-- Tabla de Area
CREATE TABLE
    area (
        id_area INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
        nombre_area VARCHAR(100) NOT NULL UNIQUE -- Nombre único del área
    );

-- Tabla de Camilla
CREATE TABLE
    camilla (
        id_camilla INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
        numero INT NOT NULL,
        id_area INT, -- Llave foránea hacia la tabla Area
        estado ENUM ('disponible', 'ocupada') NOT NULL,
        FOREIGN KEY (id_area) REFERENCES area (id_area),
        UNIQUE (numero, id_area) -- El número de camilla debe ser único por área
    );

-- Tabla de Cita Médica
CREATE TABLE
    cita_medica (
        id_cita INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
        id_paciente INT, -- Llave foránea hacia la tabla Paciente
        id_doctor INT, -- Llave foránea hacia la tabla Doctor
        fecha_hora DATETIME NOT NULL,
        razon TEXT,
        estado ENUM ('pendiente', 'completada', 'cancelada') NOT NULL,
        FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente),
        FOREIGN KEY (id_doctor) REFERENCES doctor (id_doctor)
    );

-- Tabla de Ingreso
CREATE TABLE
    ingreso (
        id_ingreso INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
        id_paciente INT, -- Llave foránea hacia la tabla Paciente
        id_camilla INT, -- Llave foránea hacia la tabla Camilla
        id_doctor INT, -- Llave foránea hacia la tabla Doctor
        FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente),
        FOREIGN KEY (id_camilla) REFERENCES camilla (id_camilla),
        FOREIGN KEY (id_doctor) REFERENCES doctor (id_doctor)
    );

CREATE TABLE
    movimiento_paciente (
        id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
        id_paciente INT NOT NULL,
        id_area INT NOT NULL,
        id_camilla INT NULL, -- Puede ser NULL si el paciente no usa camilla
        hora_entrada DATETIME NOT NULL,
        hora_salida DATETIME,
        FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente),
        FOREIGN KEY (id_area) REFERENCES area (id_area),
        FOREIGN KEY (id_camilla) REFERENCES camilla (id_camilla)
    );