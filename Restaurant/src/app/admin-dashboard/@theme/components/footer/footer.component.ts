import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://github.com/sksami3" target="_blank">SAMI</a></b> 2019
    </span>
    <div class="socials">
      <a href="https://github.com/sksami3" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/sk.sami.7/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/sk_sami_7" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/in/sksami3/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
