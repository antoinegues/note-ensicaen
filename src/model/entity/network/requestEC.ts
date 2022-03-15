import {Request} from "express";

export class RequestEC {


    constructor(private request: Request) {
    }

    /**
     * Verifie si les paramètres sont bien passée dans la requête, si oui renvoie la valeur
     * @param name
     */
    getParam(name: string): any {
        if(this.request.body == null || this.request.body[name] == null) {
            throw new Error('Paramètre \'' + name + '\' manquant');
        }

        return this.request.body[name];
    }


}
