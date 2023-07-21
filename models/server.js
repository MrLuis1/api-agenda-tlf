const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            agenda: '/api/agenda'
        }

        // ! Conectar a DB
        this.conectarDB();

        // ! Middlewares
        this.middlewares();

        // !Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    };

    middlewares() {

        // CORS
        this.app.use(cors());

        // Parseo a JSON
        this.app.use(express.json());
        
        // Directorio publico
        this.app.use(express.static('public'));
        
    };

    routes() {
        this.app.use(this.path.agenda, require('../routes/agenda'));
    };

    startServer() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        })
    };
}

module.exports = Server 