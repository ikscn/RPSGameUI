import { GameplayService } from '../gameplay.service';
import { Game } from './../game';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.css'],
})
export class GameHistoryComponent {

  histColumns: string[] = ['gameNumber', 'gameLength', 'playerWon', 'draw', 'computerWon'];

  constructor(private gpService: GameplayService) {
  }

  getGameHistory() {
    return this.gpService.getGameHistory();
  }



}
