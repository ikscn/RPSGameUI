import { animate, state, style, transition, trigger } from '@angular/animations';
import { GameplayService } from '../gameplay.service';
import { Weapon } from './../weapon';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameResultComponent } from '../game-result/game-result.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  animations: [
    trigger('appear', [
        state('void, hidden', style({ opacity: 0 })),
        state('visible', style({ opacity: 1 })),
        transition('* => void, * => hidden', animate('1000ms')),
        transition('* => visible', animate('1000ms'))
    ]),
    trigger('slideDown', [
      state('void, up', style({transform: 'translateY(0)'})),
      state('down', style({transform: 'translateY(40px)'})),
      transition('* => void, * => up', animate('1000ms')),
      transition('* => down', animate('1000ms'))
  ])
  ]
})
export class GameBoardComponent {

  constructor(private gpService: GameplayService,
              public dialog: MatDialog) {

  }

  weapons: Weapon[] = [];

  // 0:Rock, 1:Paper, 2:Scissors, -1:Random
  selectWeapon(weapon: Weapon) {
    this.setWeaponSelected(true);
    this.gpService.setPlayerWeapon(weapon);
    console.log("Weapon Selected: " + weapon.name);
  }

  play() {
    if(this.gpService.isAuto()) {
      this.gpService.playAutoGame();
    } else {
      this.gpService.playSingleGame();
      this.showSingleResult();
    }
  }

  ngOnInit() {
    this.setWeaponSelected(false);
    this.weapons = this.gpService.getWeapons();
  }

  public showSingleResult() {
    const dialogRef = this.dialog.open(GameResultComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public isPlaying(): boolean {
    return this.gpService.isPlaying();
  }

  public getPlayerWeapon() {
    return this.gpService.getPlayerWeapon();
  }

  public isWeaponSelected(): boolean {
    return this.gpService.isWeaponSelected();
  }

  private setWeaponSelected(selected: boolean) {
    this.gpService.setWeaponSelected(selected);
  }

  public isComputerDecided() {
    return this.gpService.isComputerDecided();
  }

  public getRoundResult() {
    return this.gpService.getRoundResult();
  }

  public isAuto() {
    return this.gpService.isAuto();
  }

  public getComputerWeapon() {
    if(this.isAuto()) {
      return this.weapons[3];
    }
    return this.gpService.getComputerWeapon();
  }

}
