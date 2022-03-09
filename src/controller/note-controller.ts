import {Controller} from "./controller";
import {ParserService} from "../model/service/parser.service";
import {RequestEC} from "../model/entity/network/requestEC";
import {UE} from "../model/entity/ue";


export class NoteController extends Controller {

    async getNote(request: RequestEC): Promise<UE[]> {
        const token = request.getParam('token');
        return await ParserService.getNotes(token);
    }
}
