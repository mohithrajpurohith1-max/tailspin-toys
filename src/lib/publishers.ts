/**
 * Publisher data access helpers for build-time data queries.
 *
 * This module keeps the database-facing publisher lookups isolated in a small,
 * testable helper so Astro pages can fetch publisher metadata without embedding
 * SQL details directly in page frontmatter.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

const publisherSelection = {
    id: publishers.id,
    name: publishers.name,
};

/**
 * Retrieves every publisher ordered alphabetically by name.
 *
 * @param db - The Drizzle database instance used to execute the query.
 * @returns A list of publisher records sorted by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db.select(publisherSelection).from(publishers).orderBy(asc(publishers.name));
    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
