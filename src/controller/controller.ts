import {Express, Request, Response} from "express";
import {RequestEC} from "../model/entity/network/requestEC";
import {ToolsService} from '../model/service/tools.service';


export abstract class Controller {


    constructor(private app: Express) {
    }

    attach() {

        let methods = Object.getPrototypeOf(this);
        const name = this.constructor.name.replace('Controller', '');
        Object.getOwnPropertyNames(methods).forEach((methodName: string) => {
            if(methodName == 'constructor') {
                return;
            }
            this.app.post(
                '/' + name + '/' + ToolsService.toKebabCase(methodName), (request: Request, response: Response) => this.executeMethod(methodName, request, response)
            );
        });

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


}
