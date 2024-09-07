import { sql } from "../database.mjs";
import { TagConnectionsReport } from "./base/tag-connections.mjs";

/**
 * @implements {ReportBuilder}
 */
export class AliasesReport extends TagConnectionsReport {
    /**
     * @return {Promise<TagConnection[]>}
     */
    async query() {
        return sql`
            SELECT DISTINCT source_tag.name     source_name,
                            source_tag.slug     source_slug,
                            source_tag.category source_category,
                            target_tag.name     target_name,
                            target_tag.slug     target_slug,
                            target_tag.category target_category
            FROM tag_aliases alias
                     INNER JOIN tags source_tag ON alias.tag_id = source_tag.id
                     INNER JOIN tags target_tag ON alias.target_tag_id = target_tag.id`
    }
}