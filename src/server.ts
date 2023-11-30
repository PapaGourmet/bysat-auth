import express from "express";
import { router } from "./routes/router";

const server = express();

const port = normalizePort(process.env.PORT || '8080');

server.use(router)

server.listen(port, () => {
  console.log('conectado com êxito')
});


function normalizePort(val: any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}