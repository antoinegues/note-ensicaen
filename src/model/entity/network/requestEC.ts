import {Request} from "express";

export class RequestEC {


    constructor(private request: Request) {
    }

    getParam(name: string): any {
        if(this.request.body == null || this.request.body[name] == null) {
            throw new Error('Paramètre \'' + name + '\' manquant');
        }

        return this.request.body[name];
    }


}
