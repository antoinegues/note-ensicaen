import {Controller} from "./controller";
import {Request} from "express";
import {ParserService} from "../model/service/parser.service";
import {UE} from "../model/entiity/ue";


export class NoteController extends Controller {

    async getNote(request: Request): Promise<UE[]> {
        const cookie = await ParserService.getAuthCookie(request.body.username, request.body.password);
        return await ParserService.getNotes(cookie);
    }



}
