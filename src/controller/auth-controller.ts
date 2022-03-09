import {Controller} from "./controller";
import {RequestEC} from "../model/entity/network/requestEC";
import {UE} from "../model/entity/ue";
import {ParserService} from "../model/service/parser.service";

export class AuthController extends Controller {


    async getLogin(request: RequestEC): Promise<UE[]> {
        const username = request.getParam('username');
        const password = request.getParam('password');
        return await ParserService.getAuthCookie(username, password);
    }

}
