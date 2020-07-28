import { Component, OnInit } from '@angular/core';
import {LeaderService} from '../services/leader.service'
import { Leader } from '../Shared/leader';
import { controlInOutWithFlyingAnimation, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations:[
    controlInOutWithFlyingAnimation(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders : Array<Leader>
  constructor(private leaderService : LeaderService) { }

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe((l) => this.leaders= l);
  }

}
