export interface TaskProps {
  id          : string;   // object ID from blockchain (UID)
  task_name   : string;   // decode vector<u8> to string
  owner       : string;   // ctx.sender()
  status      : boolean;  // status: 0 = false, 1 = true
  last_update : Date;     // time
}

export interface TodoFormProps {
  onAdd: (text: string) => void;
}

export interface LoadingPopupProps {
  message: string;
  isVisible: boolean;
}

interface Stats {
  total: number;
  active: number;
  completed: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: Stats;
  onClearCompleted: () => void;
}

export interface SponsoredTransactionOptions {
  allowedMoveCallTargets: string[];
  /**
   * allowedAddresses is OPTIONAL
   * Primary recipients if using tx.transferObjects.
   * Not strictly required for purely moveCall transactions unless policy enforces it.
   */
  allowedAddresses?: string[];
  onSuccess?: (digest: string) => void;
  onError?: (error: Error) => void;
}