import { Component } from '@angular/core';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';


const themeAndroidStudio: string = 'node_modules/highlight.js/styles/androidstudio.css';
const themeGithub: string = 'node_modules/highlight.js/styles/github.css';


@Component({
  selector: 'app-conception-miahoot',
  templateUrl: './conception-miahoot.component.html',
  styleUrls: ['./conception-miahoot.component.scss']
})
export class ConceptionMiahootComponent {
  response!: HighlightAutoResult;

  code = `{
  "name": "ngx-highlightjs",
  "version": "1.0.0",
}`;

  currentTheme: string = themeGithub;

  constructor(private hljsLoader: HighlightLoader) {}

  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: e.secondBest,
      value: e.value,
    };
  }

  changeTheme() {
    this.currentTheme = this.currentTheme === themeGithub ? themeAndroidStudio : themeGithub;
    this.hljsLoader.setTheme(this.currentTheme);
  }
}
