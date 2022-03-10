import {Controller} from "./controller";
import {RequestEC} from "../model/entity/network/requestEC";
import {ParserService} from "../model/service/parser.service";

export class AuthController extends Controller {


    async getLoginToken(request: RequestEC): Promise<string> {
        const username = request.getParam('username');
        const password = request.getParam('password');
        return await ParserService.getAuthCookie(username, password);
    }

}
