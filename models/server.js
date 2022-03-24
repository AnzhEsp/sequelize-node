const express = require("express");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Las paths para nuestras rutas
        this.path = {
            user: "/api/users",
            auth: "/api/auth",
        };
        //moddlewares
        this.middlewares();
        //rutas de la app
        this.routes();
    }

    middlewares() {
        //cors
        this.app.use(cors());
        //lectura y parse del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static("public"));
    }
    routes() {
        this.app.use(this.path.user, require("../routes/users"));
        this.app.use(this.path.auth, require("../routes/auth"));
    }

    //servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor en el puerto: ${this.port}`);
        });
    }
}

module.exports = Server;
