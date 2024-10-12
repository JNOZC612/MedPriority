INSERT INTO
    area (nombre_area)
VALUES
    ('Urgencias'),
    ('Pediatría'),
    ('Quirófano'),
    ('Consulta Externa'),
    ('Medicina Interna'),
    ('Radiología'),
    ('UCI'),
    ('Laboratorio');

INSERT INTO
    especialidad (nombre_especialidad)
VALUES
    ('Medicina de Urgencias'),
    ('Pediatría General'),
    ('Medicina Interna'),
    ('Cirugía General'),
    ('Anestesiología'),
    ('Cardiología'),
    ('Radiología'),
    ('Medicina Intensiva');

INSERT INTO
    doctor (
        nombres,
        apellidos,
        id_especialidad,
        telefono,
        email,
        contrasena
    )
VALUES
    ( -- Urgencias
        'Juan',
        'Pérez',
        1,
        '123456789',
        'juan.perez@example.com',
        '1234'
    ),
    ( -- Pediatría
        'Ana',
        'Martínez',
        2,
        '321654987',
        'ana.martinez@example.com',
        '1234'
    ),
    ( -- Medicina Interna
        'José',
        'Torres',
        3,
        '147258369',
        'jose.torres@example.com',
        '1234'
    ),
    ( -- Cirugía General (Quirófano)
        'Gabriel',
        'Castillo',
        4,
        '963852741',
        'gabriel.castillo@example.com',
        '1234'
    ),
    ( -- Anestesiología (Quirófano)
        'Claudia',
        'Jiménez',
        5,
        '159753486',
        'claudia.jimenez@example.com',
        '1234'
    ),
    ( -- Cardiología
        'Elena',
        'Cruz',
        6,
        '258963147',
        'elena.cruz@example.com',
        '1234'
    ),
    ( -- Radiología
        'Ricardo',
        'Silva',
        7,
        '951753486',
        'ricardo.silva@example.com',
        '1234'
    ),
    ( -- UCI
        'Martín',
        'Mendoza',
        8,
        '741963852',
        'martin.mendoza@example.com',
        '1234'
    );

INSERT INTO
    camilla (numero, id_area, estado)
VALUES
    -- Camillas para Urgencias
    (1, 1, 'DISPONIBLE'),
    (2, 1, 'DISPONIBLE'),
    (3, 1, 'OCUPADA'),
    -- Camillas para Quirófano
    (4, 3, 'DISPONIBLE'),
    (5, 3, 'DISPONIBLE'),
    -- Camillas para UCI
    (6, 7, 'DISPONIBLE'),
    (7, 7, 'OCUPADA'),
    -- Camillas para Consulta Externa
    (8, 4, 'DISPONIBLE'),
    (9, 4, 'DISPONIBLE'),
    -- Camillas para Medicina Interna
    (10, 5, 'DISPONIBLE'),
    -- Camillas para Pediatría
    (11, 2, 'DISPONIBLE'),
    -- Camillas para Radiología
    (12, 6, 'DISPONIBLE'),
    -- Camillas para Laboratorio
    (13, 8, 'DISPONIBLE');