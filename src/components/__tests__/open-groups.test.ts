import { flattenHymns, seasons } from '../../data/hymns';
import { openGroupsFrom } from '../open-groups';

describe('openGroupsFrom', () => {
  const service = seasons.flatMap((s) => s.services).find((s) => s.hymns.some((h) => h.children?.some((c) => c.children)))!;
  const outer = service.hymns.find((h) => h.children?.some((c) => c.children))!;
  const inner = outer.children!.find((c) => c.children)!;

  it('opens nothing without groups', () => {
    expect(openGroupsFrom(service, undefined)).toEqual([]);
  });

  it('follows the groups in order, outermost first', () => {
    expect(openGroupsFrom(service, `${outer.id},${inner.id}`).map((g) => g.id)).toEqual([outer.id, inner.id]);
  });

  it('stops at an id that is not a group inside the last one', () => {
    const notAGroup = flattenHymns(service.hymns).find((h) => !h.children)!;
    expect(openGroupsFrom(service, `${outer.id},${notAGroup.id},${inner.id}`).map((g) => g.id)).toEqual([outer.id]);
  });
});
