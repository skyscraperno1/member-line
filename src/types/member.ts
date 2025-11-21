export interface Member {
  lineId: string;
  isMember: boolean;
  remainingDays?: number;
  totalData?: number;
  usedData?: number;
  esimCards?: ESIMCard[];
}

export interface ESIMCard {
  id: string;
  email: string;
  allocatedData: number;
  usedData: number;
  isAllocated: boolean;
  allocatedDate?: string;
}
