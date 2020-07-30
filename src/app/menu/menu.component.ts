import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  isMenuOpen: boolean = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean){
    this.themeService.setDarkTheme(checked);
  }

  toggleSidenav(){
    this.isMenuOpen = !this.isMenuOpen;
  }
}
