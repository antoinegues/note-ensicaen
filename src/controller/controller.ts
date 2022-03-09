import {Express, Request, Response} from "express";

export abstract class Controller {


    constructor(private app: Express) {
    }

    attach() {
        let methods = Object.getPrototypeOf(this);
        Object.getOwnPropertyNames(methods).forEach((methodName: string) => {
            this.app.post('/' + methodName, (request: Request, response: Response) => {
                this.executeMethod(methodName, request, response);
            });
        });

    }


    executeMethod(methodName: string, request: Request, response: Response) {
        let data = null;
        try {
            // @ts-ignore
            this[methodName](request).then(data => {
                response.status(200).json(data);
            }).catch((e: any) => {
                console.log(e);
                response.status(500).json(e);
            });

        } catch (e) {
            console.log(e);
            response.status(500).send(e);
        }
    }


}
