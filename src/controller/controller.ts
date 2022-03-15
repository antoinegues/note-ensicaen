import {Express, Request, Response} from "express";
import {RequestEC} from "../model/entity/network/requestEC";
import {ToolsService} from '../model/service/tools.service';


export abstract class Controller {


    constructor(private app: Express) {
    }

    /**
     * Crée les endpoints du service
     *  /[nom_du_controller]/[nom_de_la_fonction]
     */
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

    /**
     * Fonction qui est executé lors d'une requête sur un endpoint
     * @param methodName
     * @param request
     * @param response
     * @private
     */
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
