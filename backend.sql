create database backend;
use backend;

create table persona (
	dni INT NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    PRIMARY KEY (dni)
);

create table usuario (
	mail VARCHAR(40) NOT NULL,
    nickname VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY (mail)
);

ALTER TABLE usuario
    ADD persona INT,
    ADD CONSTRAINT FOREIGN KEY(persona) REFERENCES persona(dni);