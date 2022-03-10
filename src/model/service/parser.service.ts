import puppeteer, {ElementHandle} from "puppeteer";
import {UE} from "../entity/ue";
import {Matiere} from "../entity/matiere";
import {Note} from "../entity/note";


export class ParserService {


    static LOGIN_COOKIE_NAME = '.AspNet.ApplicationCookie';


    static async getAuthCookie(login: string, password: string): Promise<any> {
        console.log('CONNECTION ATTEMPT');
        const browser = await puppeteer.launch({args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.goto('https://scolarite.ensicaen.fr/login', {waitUntil: 'networkidle0'});

        // @ts-ignore
        await (await page.$('input[name="login"]')).type(login);
        // @ts-ignore
        await (await page.$('input[name="password"]')).type(password);

        await Promise.all([page.click('#Validation'), page.waitForNavigation({waitUntil: 'networkidle0'})]);
        if (page.url().includes('Err=True')) {
            throw new Error('Erreur Login');
        }

        const cookies = (await page.cookies()).filter((cookie: any) => cookie.name === this.LOGIN_COOKIE_NAME);
        if (cookies.length === 0) {
            throw new Error('Erreur Login');
        }
        browser.close();
        console.log('CONNECTION SUCCESSFUL');
        return cookies[0].value;
    }

    static async getNotes(token: string): Promise<UE[]> {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setCookie({
            name: ParserService.LOGIN_COOKIE_NAME,
            value: token,
            domain: 'scolarite.ensicaen.fr',
            path: '/',
            expires: -1,
            httpOnly: true,
            secure: true,
            sameParty: false,
            sourceScheme: 'Secure',
            sourcePort: 443
        });
        await page.goto('https://scolarite.ensicaen.fr/note', {waitUntil: 'networkidle0'});
        const uesDOM = await page.$$('.panel-group > .panel:not(.tile)');

        let ues : UE[] = [];

        for(let ueDOM of uesDOM) {

            let ue = new UE(await this.getTextContent(await ueDOM.$('.panel-title > a')));

            const matieresDOM = await ueDOM.$$('.panel.tile');
            for (let matiereDOM of matieresDOM) {
                const nom = await matiereDOM.$('.panel-heading > strong');
                if (nom != null) {

                    const matiere = new Matiere(await this.getTextContent(nom));

                    const notesName = await matiereDOM.$$('dd');
                    const notesValue = await matiereDOM.$$('dt > span');

                    for (let i = 0; i < notesName.length; i++) {
                        matiere.notes.push(new Note(await this.getTextContent(notesName[i]), await this.getTextContent(notesValue[i])));
                    }

                    ue.matieres.push(matiere);
                }

            }
            ues.push(ue);
        }

        await browser.close();
        return ues;
    }

    private static async getTextContent(element: ElementHandle | null): Promise<string> {
        if(element == null) {
            return '';
        }
        const value = await element.evaluate(element => element.textContent);
        if(value == null) {
            return '';
        }
        return value;
    }



}
