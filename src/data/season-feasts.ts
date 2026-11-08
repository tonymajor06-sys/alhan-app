import type { Season, Service } from './hymn-types';

// A season's services, feast by feast: services named "<feast>: <service>" (the Minor Feasts of the Lord) are grouped
// under their feast, which opens on a page of its own (/hymns/<season>/feast/<slug>); the others stand alone
export interface SeasonSection {
  feast: string | null;
  // the feast's services' id without the service ("minorfeasts-feast-of-transfiguration")
  slug: string | null;
  services: Service[];
}

const serviceSuffix = /-(vesper-praises|vespers|morning-praises|matins|liturgy|distribution|midnight)$/;

export function seasonSections(season: Season): SeasonSection[] {
  const sections: SeasonSection[] = [];
  for (const service of season.services) {
    const feast = service.title.includes(': ') ? service.title.split(': ')[0] : null;
    const last = sections[sections.length - 1];
    if (last && last.feast === feast) last.services.push(service);
    else sections.push({ feast, slug: feast ? service.id.replace(serviceSuffix, '') : null, services: [service] });
  }
  return sections;
}
