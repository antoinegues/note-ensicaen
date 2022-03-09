import {Matiere} from "./matiere";

export class UE {
    name: string | null;
    matieres: Matiere[];

    constructor(name: string | null) {
        this.name = name;
        this.matieres = [];
    }
}
