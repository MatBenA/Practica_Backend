requires("rootpath")();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const personaDB = require("model/config.json");

