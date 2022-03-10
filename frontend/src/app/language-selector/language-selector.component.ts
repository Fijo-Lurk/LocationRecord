import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  menuItems = [
    { lang: 'English', icon: '../../assets/img/us.svg' },
    { lang: 'Swedish', icon: '../../assets/img/se.svg' },
  ];
  selectedValue = { lang: 'English', icon: '../../assets/img/us.svg' };

  constructor() {}

  ngOnInit(): void {}

  changelang(lang: string, icon: string) {
    this.selectedValue = { lang: lang, icon: icon };
  }
}
