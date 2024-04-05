import jsonServer from "json-server";
import fs from "fs";

// Comprobar si disponemos de la base de datos
// en el almacenamiento modificable o crearla
const DB = "/tmp/db.json";
try {
  fs.accessSync(DB, fs.constants.F_OK);
} catch (error) {
  fs.cpSync("db.json", "/tmp/db.json");
}

// Crear y exportar el servidor JSON
const server = jsonServer.create();
const router = jsonServer.router("/tmp/db.json");

server.use(jsonServer.defaults());
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);
export default server;
