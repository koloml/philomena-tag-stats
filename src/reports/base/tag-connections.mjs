/**
 * @abstract
 * @implements {ReportBuilder}
 */
export class TagConnectionsReport {
    /**
     * @protected
     * @return {Promise<TagConnection[]>}
     */
    async query() {
        throw new Error('Not implemented');
    }

    async build(sheet) {
        await sheet.clearRows();

        const connections = await this.query();

        await sheet.setHeaderRow([ 'Source Category', 'Source Slug', 'Source Name', ' ', 'Target Category', 'Target Slug', 'Target Name' ]);
        await sheet.addRows(
            connections.map(connection => ([
                connection.source_category,
                connection.source_slug,
                connection.source_name,
                '',
                connection.target_category,
                connection.target_slug,
                connection.target_name,
            ]))
        );
    }
}