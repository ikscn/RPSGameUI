import { Component } from '@angular/core';
import { GameplayService } from '../gameplay.service';
import { Game } from '../game';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent {

  constructor(private gpService: GameplayService) {
  }

  lastGameResult(): Game {
    return this.gpService.getAutoGameResult();
  }

  isAuto() {
    return this.gpService.isAuto();
  }

  singlePlayerWon() {
    return this.gpService.getManualGame().playerWon;
  }

  singleDraw() {
    return this.gpService.getManualGame().draw;
  }

  singleComputerWon() {
    return this.gpService.getManualGame().computerWon;
  }

}
