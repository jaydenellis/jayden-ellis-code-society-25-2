-- SQL Queries for Library Database Assignment
-- Author: Jayden Ellis
-- Date: December 17, 2025

-- Query 1: Count of media items by type
SELECT 
    type as media_type,
    COUNT(*) as item_count
FROM media_items 
GROUP BY type
ORDER BY item_count DESC;

-- Query 2: Sum of total pages checked out by guests
SELECT 
    COALESCE(SUM(mi.pages), 0) as total_pages_checked_out
FROM checked_out_items coi
INNER JOIN media_items mi ON coi.media_item_id = mi.id
WHERE mi.pages IS NOT NULL AND mi.pages > 0;

-- Query 3: All guests with their checked out items (LEFT JOIN to include guests with no checkouts)
SELECT 
    g.email as guest_email,
    g.name as guest_name,
    g.type as guest_type,
    coi.id as checkout_id,
    mi.id as media_item_id,
    mi.title as item_title,
    mi.type as media_type
FROM guests g
LEFT JOIN checked_out_items coi ON g.email = coi.email
LEFT JOIN media_items mi ON coi.media_item_id = mi.id
ORDER BY g.name, mi.title;