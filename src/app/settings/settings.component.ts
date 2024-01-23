import { Component } from '@angular/core';
import { GameplayService } from '../gameplay.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  warningStr: string[];
  gameLength: number = 100;
  isAuto: boolean = false;

  constructor(private gpService: GameplayService,
                public dialog: MatDialog,
                private sb: MatSnackBar){
  }

  startGame(): void {
    if(this.isAuto) {
      if(!this.validateSettings()) {
        return;
      }
      this.startAutoGame();
    } else {
      this.startSingleGame();
    }

    /* const dialogRef = this.dialog.open(GameBoardComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); */
  }

  startSingleGame(): void {
    this.gpService.startSingleGame();
  }

  startAutoGame(): void {
    this.gpService.startAutoGame(this.gameLength);
  }

  endGame(): void {
    this.gpService.endGame();
  }

  validateSettings(): boolean {
    if(this.gameLength == null || this.gameLength <= 0 || this.gameLength > 100) {
      this.sb.open('Game length must be between 1-100.', 'Close',
            {duration: 3000,
             horizontalPosition: 'end',
             verticalPosition: 'top'});
      return false;
    }
    return true;
  }

  isPlaying(): boolean {
    return this.gpService.isPlaying();
  }

  getGameLength() {
    this.gpService.getGameLength();
  }

}


