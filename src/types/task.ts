export interface Task {
  id          : string;   // object ID from blockchain (UID)
  task_name   : string;   // decode vector<u8> to string
  owner       : string;   // ctx.sender()
  status      : boolean;  // status: 0 = false, 1 = true
  last_update : Date;     // time
}

export type FilterType = 'all' | 'active' | 'completed';