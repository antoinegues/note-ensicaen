import {Note} from "./note";

export class Matiere {
    name!: string;
    code!: string;
    notes: Note[];

    constructor(name: string | null) {
        this.notes = [];
        this.cleanName(name);
        this.parseCode(name);
    }


    /**
     * Récupère le code de la matière
     * @param name
     */
    parseCode(name: string | null){

        if(name == null) {
            this.code = 'ERR';
            return;
        }

        let matchCode = name.match(/C\d*-[0-9]/g);
        if(matchCode != null && matchCode.length == 1) {
            this.code = matchCode[0];
        } else {
            this.code = 'ERR';
        }
    }

    /**
     * Retire le code du nom de la matière
     * @param name
     * @private
     */
    private cleanName(name: string | null) {

        if(name == null) {
            this.code = 'NO NAME';
            return;
        }
        this.name = name.replace(/C\d*-[0-9] - /g, '');



    }
}
