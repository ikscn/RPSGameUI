import { Component } from '@angular/core';
import { GameplayService } from '../gameplay.service';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent {

  constructor(private gpService: GameplayService) {

  }

  public getRoundResult() {
    return this.gpService.getRoundResult();
  }

  public getPlayerWeapon() {
    return this.gpService.getPlayerWeapon();
  }

  public getComputerWeapon() {
    return this.gpService.getComputerWeapon();
  }

  public getWeapons() {
    return this.gpService.getWeapons();
  }

}
