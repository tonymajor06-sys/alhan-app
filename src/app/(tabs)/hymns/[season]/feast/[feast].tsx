import { seasons } from '@/data/hymns';
import { seasonSections } from '@/data/season-feasts';

import SeasonScreen from '../index';

// One of the Minor Feasts of the Lord on its own page: its services (the season's screen, opened on the feast)
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return seasons.flatMap((season) =>
    seasonSections(season)
      .filter((section) => section.slug)
      .map((section) => ({ season: season.id, feast: section.slug! }))
  );
}

export default SeasonScreen;
