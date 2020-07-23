import { Leader } from '../Shared/leader';
import { LEADERS } from '../Shared/leaders';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Array<Leader>> {
    //return Promise.resolve(LEADERS);
    return new Promise(function(resolve,reject){
       return setTimeout(() => resolve(LEADERS),5000);
    });
  }

  getLeader(id : string): Promise<Leader>{
    //return Promise.resolve(LEADERS.find((leader) => leader.id == id));
    return new Promise((resolve,reject) => setTimeout(()=>resolve(LEADERS.find((leader) => leader.id === id)),3000));
  }

  getFeatured(): Promise<Leader>
  {
    //return  Promise.resolve(LEADERS.find((leader) => {return leader.featured}));
    return new Promise((resolve) => setTimeout(()=>resolve(LEADERS.find((led) => led.featured === true)),1000));
  }
}
