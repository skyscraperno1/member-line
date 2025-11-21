import type { Member } from '../types/member';

export const mockMembers: Record<string, Member> = {
  'line_user_123': {
    lineId: 'line_user_123',
    isMember: true,
    remainingDays: 287,
    totalData: 100,
    usedData: 25,
    esimCards: [
      {
        id: 'esim_1',
        email: 'user1@example.com',
        allocatedData: 30,
        usedData: 15,
        isAllocated: true,
        allocatedDate: '2025-01-15'
      },
      {
        id: 'esim_2',
        email: '',
        allocatedData: 0,
        usedData: 0,
        isAllocated: false
      },
      {
        id: 'esim_3',
        email: '',
        allocatedData: 0,
        usedData: 0,
        isAllocated: false
      }
    ]
  },
  'line_user_456': {
    lineId: 'line_user_456',
    isMember: false
  }
};

export function getMemberByLineId(lineId: string): Member | null {
  return mockMembers[lineId] || null;
}

export function getLineIdFromLiff(): string {
  const urlParams = new URLSearchParams(window.location.search);
  const mockLineId = urlParams.get('lineid');
  return mockLineId || 'line_user_456';
}
