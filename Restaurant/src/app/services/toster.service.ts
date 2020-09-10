import { Injectable } from '@angular/core';

import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';


@Injectable({
  providedIn: 'root'
})
export class TosterService {
//tosters
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 3000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;
status: NbComponentStatus = 'primary';

title = 'HI there!';
content = `I'm cool toaster!`;

types: NbComponentStatus[] = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
];

positions: string[] = [
  NbGlobalPhysicalPosition.TOP_RIGHT,
  NbGlobalPhysicalPosition.TOP_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  NbGlobalLogicalPosition.TOP_END,
  NbGlobalLogicalPosition.TOP_START,
  NbGlobalLogicalPosition.BOTTOM_END,
  NbGlobalLogicalPosition.BOTTOM_START,
];

quotes = [
  { title: null, body: 'We rock at Angular' },
  { title: null, body: 'Titles are not always needed' },
  { title: null, body: 'Toastr rock!' },
];

constructor(private toastrService: NbToastrService) { }

public showToast(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? `${title}` : '';

  this.index += 1;
  this.toastrService.show(
    body,
    `${titleContent}`,
    config);
}
//toster ends
  
}
