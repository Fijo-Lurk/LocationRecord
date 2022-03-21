import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  menuItems = [
    { lang: 'EN', icon: '/ui/assets/img/us.svg', i18n: 'en' },
    { lang: 'SE', icon: '/ui/assets/img/se.svg', i18n: 'se' },
  ];
  selectedValue = { lang: 'EN', icon: '/ui/assets/img/us.svg', i18n: 'en' };

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    if (localStorage.getItem('i18n') === 'se') {
      this.selectedValue = this.menuItems[1];
    }
  }

  changelang(lang: string, icon: string, i18n: string) {
    this.selectedValue = { lang: lang, icon: icon, i18n: i18n };
    this.translateService.use(i18n);
    localStorage.setItem('i18n', i18n);
  }
}
