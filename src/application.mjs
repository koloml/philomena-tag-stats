import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { AliasesReport } from "./reports/aliases.mjs";
import { ImplicationsReport } from "./reports/implications.mjs";

export class Application {
    #implications = new ImplicationsReport();
    #aliases = new AliasesReport();
    /** @type {JWT} */
    #credentials;
    /** @type {GoogleSpreadsheet} */
    #spreadsheet;

    constructor() {
        this.#credentials = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY,
            scopes: [ 'https://www.googleapis.com/auth/spreadsheets' ]
        });

        this.#spreadsheet = new GoogleSpreadsheet(
            process.env.SPREADSHEET_ID,
            this.#credentials
        );
    }

    async run() {
        console.info('Loading info...');

        await this.#spreadsheet.loadInfo();

        console.info('Fetching sheets...');

        const implicationsSheet = this.#spreadsheet.sheetsById[process.env.SPREADSHEET_IMPLICATIONS_SHEET_ID];
        const aliasesSheet = this.#spreadsheet.sheetsById[process.env.SPREADSHEET_ALIASES_SHEET_ID];

        if (!implicationsSheet || !aliasesSheet) {
            console.error('One or more sheets missing!');
            process.exit(1);
            return;
        }

        console.log('Building implications...');
        await this.#implications.build(implicationsSheet);

        console.log('Building aliases...');
        await this.#aliases.build(aliasesSheet);

        console.info('Document updated!');
    }
}