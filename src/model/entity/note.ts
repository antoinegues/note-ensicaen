export class Note {

    note!: number;
    bareme!: number;
    name!: string;
    coef!: number;

    constructor(name: string | null, note: string | null) {
        this.parseNote(note);
        this.clearName(name);
        this.parseCoef(name);
    }

    parseNote(note: string | null) {
        if (note != null) {
            let noteSplit = note.split('/');
            this.note = parseFloat(noteSplit[0]);
            this.bareme = parseInt(noteSplit[1]);
        } else {
            this.note = 0;
            this.bareme = 0;
        }
    }


    private clearName(name: string | null) {
        if (name == null) {
            this.name = 'NO NAME';
            return;
        }
        this.name = name.replace(/ \(\d[.,]\d*%\)/g, '');
    }

    private parseCoef(name: string | null): void {
        if (name == null) {
            this.coef = 1;
            return;
        }
        let coefFind = name.match(/\(\d[.,]\d*%\)/g);
        if (coefFind != null && coefFind.length == 1) {
            let coefClean = coefFind[0].replace(/[()%]/g, '');
            this.coef = parseFloat(coefClean);
        } else {
            this.coef = 1;
            return;
        }


    }
}
