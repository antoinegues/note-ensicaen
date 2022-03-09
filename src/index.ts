import {NoteController} from "./controller/note-controller";
import express,{Express} from "express";
import config from './config.json'
import {AuthController} from "./controller/auth-controller";
class App {


    app!: Express;

    init() {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }))

        this.app.listen(config.SERVER_PORT, () => {
            console.log(`LISTENING PORT : ${config.SERVER_PORT}`);
            this.initController();
        });
    }

    initController() {
        console.log('CONTROLLER INIT');
        new AuthController(this.app).attach();
        new NoteController(this.app).attach();

    }



}


const app = new App();
app.init();
