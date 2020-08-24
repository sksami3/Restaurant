import { Component, OnInit } from '@angular/core';
import{AuthenticationService} from '../../services/authentication.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.auth.userValue);
  }

}
