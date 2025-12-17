-- Library Database Queries
-- Author: Assignment Solution
-- Date: December 2025

-- Query 1: Count of media items by type
SELECT 
    type as media_type,
    COUNT(*) as item_count
FROM media_items 
GROUP BY type
ORDER BY item_count DESC;

-- Query 2: Sum of total pages checked out by guests
SELECT 
    SUM(mi.pages) as total_pages_checked_out
FROM checked_out_items coi
INNER JOIN media_items mi ON coi.media_item_id = mi.id
WHERE mi.pages IS NOT NULL;

-- Query 3: All guests with their checked out items (including guests with no checkouts)
SELECT 
    g.id as guest_id,
    g.name as guest_name,
    coi.id as checkout_id,
    mi.id as media_item_id,
    mi.title as item_title,
    mi.type as media_type
FROM guests g
LEFT JOIN checked_out_items coi ON g.id = coi.guest_id
LEFT JOIN media_items mi ON coi.media_item_id = mi.id
ORDER BY g.name, mi.title;