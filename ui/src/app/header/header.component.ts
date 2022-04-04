import { Component } from '@angular/core';
import packageJson from 'package.json';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public version: string = packageJson.version;
}
