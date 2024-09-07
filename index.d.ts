import {GoogleSpreadsheetWorksheet} from "google-spreadsheet";

declare interface TagConnection {
    source_name: string;
    source_slug: string;
    source_category: string;
    target_name: string;
    target_slug: string;
    target_category: string;
}

interface ReportBuilder {
    build(sheet: GoogleSpreadsheetWorksheet): Promise<void>;
}