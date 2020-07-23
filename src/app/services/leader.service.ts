import { Leader } from '../Shared/leader';
import { LEADERS } from '../Shared/leaders';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Array<Leader>> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id : string): Promise<Leader>{
    return Promise.resolve(LEADERS.find((leader) => leader.id == id));
  }

  getFeatured(): Promise<Leader>
  {
    return  Promise.resolve(LEADERS.find((leader) => {return leader.featured}));
  }
}
