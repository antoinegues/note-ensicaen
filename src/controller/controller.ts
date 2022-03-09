import {Express, Request, Response} from "express";
import {RequestEC} from "../model/entity/network/requestEC";
import {ToolsService} from '../model/service/tools.service';

enum Type {
    UNKNOWN,
    GET,
    POST,
    PUT,
    DELETE,
}


export abstract class Controller {


    constructor(private app: Express) {
    }

    attach() {

        let methods = Object.getPrototypeOf(this);
        Object.getOwnPropertyNames(methods).forEach((methodName: string) => {
            if(methodName == 'constructor') {
                return;
            }
            this.createEvent(methodName);
        });

    }

    private createEvent(methodName: string) {
        const name = this.constructor.name.replace('Controller', '');
        switch (Controller.detectKeyWord(methodName)) {
            case Type.GET:
                this.app.get(
                    '/' + name + '/' + ToolsService.toKebabCase(methodName), (request: Request, response: Response) => this.executeMethod(methodName, request, response)
                );
                break;
            case Type.POST:
                this.app.post(
                    '/' + name + '/' + ToolsService.toKebabCase(methodName), (request: Request, response: Response) => this.executeMethod(methodName, request, response)
                );
                break;
            case Type.PUT:
                this.app.put(
                    '/' + name + '/' + ToolsService.toKebabCase(methodName), (request: Request, response: Response) => this.executeMethod(methodName, request, response)
                );
                break;
            case Type.DELETE:
                this.app.delete(
                    '/' + name + '/' + ToolsService.toKebabCase(methodName), (request: Request, response: Response) => this.executeMethod(methodName, request, response)
                );
                break;
            case Type.UNKNOWN:
                console.log('Aucun type de requete trouver pour la méthode ' + methodName);
                break;
        }
    }

    private executeMethod(methodName: string, request: Request, response: Response) {
        try {
            // @ts-ignore
            this[methodName](new RequestEC(request)).then(data => {
                response.status(200).json(data);
            }).catch((e: any) => {
                Controller.error(e, response);
            });

        } catch (e: any) {
            Controller.error(e, response);
        }
    }

    private static error(e: Error, response: Response) {
        const errorMessage = "Erreur : \n" + e.message;
        console.log(errorMessage);
        response.status(500).send(errorMessage);
    }

    private static detectKeyWord(methodeName: string): Type {
        if(methodeName.startsWith('get')) {
            return Type.GET;
        }
        if(methodeName.startsWith('create')) {
            return Type.POST;
        }
        if(methodeName.startsWith('update')) {
            return Type.PUT;
        }
        if(methodeName.startsWith('delete')) {
            return Type.DELETE;
        }

        return Type.UNKNOWN;
    }


}
