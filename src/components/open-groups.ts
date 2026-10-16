import { Hymn, Service } from '../data/hymns';

// The groups opened inside a service (e.g. Midnight Praises > General > Doxologies), outermost first,
// from the comma-separated ids in the page's address
export function openGroupsFrom(service: Service, groups: string | undefined): Hymn[] {
  const out: Hymn[] = [];
  let items = service.hymns;
  for (const id of (groups ?? '').split(',').filter(Boolean)) {
    const group = items.find((h) => h.id === id && h.children);
    if (!group) break;
    out.push(group);
    items = group.children ?? [];
  }
  return out;
}
