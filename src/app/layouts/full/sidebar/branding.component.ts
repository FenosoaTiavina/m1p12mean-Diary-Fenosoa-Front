import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-branding',
  imports: [RouterModule],
  template: `
    <a [routerLink]="['/']" style="display: flex ; flex-direction: row; align-items: end;">
      <img
        src="./assets/images/logos/ReviveAuto-logotype.svg"
        class="align-middle m-2"
        style="height: 60px;"
        alt="logo"
      />
    </a>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();
  constructor(private settings: CoreService) {}
}
