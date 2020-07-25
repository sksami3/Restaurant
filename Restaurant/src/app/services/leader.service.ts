import { Leader } from '../Shared/leader';
import { LEADERS } from '../Shared/leaders';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import{delay} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Array<Leader>> {
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id : string): Observable<Leader>{
    return of(LEADERS.find((leader) => leader.id == id)).pipe(delay(2000));
  }

  getFeatured(): Observable<Leader>
  {
    return of(LEADERS.find((leader) => {return leader.featured})).pipe(delay(2000));
  }
}
