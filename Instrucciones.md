# LUEGO DE LEVANTAR LOS CONTENEDORES EJECUTAR EL SIGUIENTE COMANDO PARA CREAR LA BASE DE DATOS
1. ### docker compose exec db mysql -uroot -proot
    Este comando ingresa a la imagen de MYSQL para luego ejecutar el script
    ## Dependiendo de la versión y la instalación de docker, el comando puede iniciar con `docker compose` o `docker-compose`
2. ### SOURCE /scripts/createDB.sql;
    Este comando ejecuta la script de creación de la base de datos
3. ### SHOW DATABASES;
    Usar ese comando para comprobar que la base de datos se creó correctamente