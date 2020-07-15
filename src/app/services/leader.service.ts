import { Leader } from '../Shared/leader';
import { LEADERS } from '../Shared/leaders';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor() { }

  getLeaders(): Array<Leader> {
    return LEADERS;
  }

  getLeader(id : string): Leader{
    return LEADERS.find((leader) => leader.id == id);
  }

  getFeatured(): Leader
  {
    return LEADERS.find((leader) => {return leader.featured});
  }
}
