import {NoteController} from "./controller/note-controller";
import express,{Express} from "express";
import config from './config.json'
import {AuthController} from "./controller/auth-controller";
import cors from 'cors'
import serverless from 'serverless-http'
import * as path from "path";

class App {


    app!: Express;

    /**
     * Initialise le serveur express
     */
    init() {
        this.app = express();

        this.app.use(express.json());
        this.app.use(cors({
            origin: true,
            credentials: false,
            methods: 'POST'
        }));
        this.app.listen(config.SERVER_PORT, () => {
            console.log(`LISTENING PORT : ${config.SERVER_PORT}`);
            this.initController();
        });

        this.app.use('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));


    }

    /**
     * Initialise les controlleurs
     */
    initController() {
        console.log('CONTROLLER INIT');
        const router = express.Router()
        new AuthController(router).attach();
        new NoteController(router).attach();
        this.app.use('/.netlify/functions/server', router);
        module.exports = this.app;
        module.exports.handler = serverless(this.app);
    }



}


const app = new App();
app.init();
