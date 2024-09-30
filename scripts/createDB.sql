CREATE DATABASE IF NOT EXISTS hospitaldb;
USE hospitaldb;

-- Tabla de Especialidades
CREATE TABLE Especialidades (
    ID_ESPECIALIDAD INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
    ESPECIALIDAD VARCHAR(100) NOT NULL
);

-- Tabla de Doctores
CREATE TABLE Doctores (
    ID_DOCTOR INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
    NOMBRES VARCHAR(100) NOT NULL,
    APELLIDOS VARCHAR(100) NOT NULL,
    ID_ESPECIALIDAD INT, -- Llave foránea hacia la tabla Especialidades
    TELEFONO VARCHAR(15),
    EMAIL VARCHAR(100),
    TURNO VARCHAR(50),
    FOREIGN KEY (ID_ESPECIALIDAD) REFERENCES Especialidades(ID_ESPECIALIDAD)
);

-- Tabla de Pacientes
CREATE TABLE Pacientes (
    ID_PACIENTE INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
    NOMBRE VARCHAR(100) NOT NULL,
    NACIMIENTO DATE NOT NULL,
    SEXO ENUM('M', 'F') NOT NULL,
    DIRECCION VARCHAR(255),
    TELEFONO VARCHAR(15),
    EMAIL VARCHAR(100),
    SEGURO VARCHAR(100)
);

-- Tabla de Historiales
CREATE TABLE Historiales (
    ID_HISTORIAL INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
    ID_PACIENTE INT, -- Llave foránea hacia la tabla Pacientes
    ID_DOCTOR INT, -- Llave foránea hacia la tabla Doctores
    FECHA DATE NOT NULL,
    DESCRIPCION TEXT,
    TRATAMIENTO TEXT,
    FOREIGN KEY (ID_PACIENTE) REFERENCES Pacientes(ID_PACIENTE),
    FOREIGN KEY (ID_DOCTOR) REFERENCES Doctores(ID_DOCTOR)
);

-- Tabla de Areas
CREATE TABLE Areas (
    ID_AREA INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
    AREA VARCHAR(100) NOT NULL
);

-- Tabla de Camillas
CREATE TABLE Camillas (
    ID_CAMILLA INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
    NUMERO INT NOT NULL,
    ID_AREA INT, -- Llave foránea hacia la tabla Areas
    ESTADO ENUM('DISPONIBLE', 'OCUPADA') NOT NULL,
    FOREIGN KEY (ID_AREA) REFERENCES Areas(ID_AREA)
);

-- Tabla de Citas Médicas
CREATE TABLE Citas_Medicas (
    ID_CITA INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
    ID_PACIENTE INT, -- Llave foránea hacia la tabla Pacientes
    ID_DOCTOR INT, -- Llave foránea hacia la tabla Doctores
    FECHA_HORA DATETIME NOT NULL,
    RAZON TEXT,
    ESTADO ENUM('PENDIENTE', 'COMPLETADA', 'CANCELADA') NOT NULL,
    FOREIGN KEY (ID_PACIENTE) REFERENCES Pacientes(ID_PACIENTE),
    FOREIGN KEY (ID_DOCTOR) REFERENCES Doctores(ID_DOCTOR)
);

-- Tabla de Ingresos
CREATE TABLE Ingresos (
    ID_INGRESO INT AUTO_INCREMENT PRIMARY KEY, -- Llave primaria
    ID_PACIENTE INT, -- Llave foránea hacia la tabla Pacientes
    ID_CAMILLA INT, -- Llave foránea hacia la tabla Camillas
    ID_DOCTOR INT, -- Llave foránea hacia la tabla Doctores
    FOREIGN KEY (ID_PACIENTE) REFERENCES Pacientes(ID_PACIENTE),
    FOREIGN KEY (ID_CAMILLA) REFERENCES Camillas(ID_CAMILLA),
    FOREIGN KEY (ID_DOCTOR) REFERENCES Doctores(ID_DOCTOR)
);