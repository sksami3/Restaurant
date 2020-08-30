import { Component, OnInit, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {MenuService} from '../../services/menu.service';
import { NbMenuItem } from 'src/app/Shared/menu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  menu : Array<NbMenuItem> = [];

  constructor(@Inject(DOCUMENT) private document,private _menuService: MenuService) { }

  ngOnInit(): void {
    this.document.getElementById('theme').setAttribute('href', 'adminTheme.css');
    this.document.getElementById('adminBootstrap').setAttribute('href', 'adminBootstrap.css');
    this.document.getElementById('adminIndex').setAttribute('href', 'adminIndex.css');
    this.document.getElementById('adminionIcons').setAttribute('href', 'adminionIcons.css');
    this.document.getElementById('adminionSocicon').setAttribute('href', 'adminionSocicon.css');
    this._menuService.getMenus().subscribe(res => this.menu = res, err => console.log(err));
  }

}
