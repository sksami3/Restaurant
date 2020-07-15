import { Component, OnInit } from '@angular/core';
import {LeaderService} from '../services/leader.service'
import { Leader } from '../Shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders : Array<Leader>
  constructor(private leaderService : LeaderService) { }

  ngOnInit(): void {
    this.leaders= this.leaderService.getLeaders();
  }

}
