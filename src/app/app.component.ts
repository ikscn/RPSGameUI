import { Component, Input, Output } from '@angular/core';
import { Game } from './game';
import { GameplayService } from './gameplay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RPSGame';

  constructor(private gpService: GameplayService) {
  }

  ngOnInit() {
    this.gpService.updateGameHistory();
  }

}
