import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private mediaSub: Subscription;
  isDarkTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver){}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change.mqAlias);
        console.log(change.mediaQuery);
      }
    );
  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
  }

  title = 'YouDo';
}
