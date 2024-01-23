export class Game {

  constructor() {
    this.id = 0;
    this.gameNumber = 0;
    this.gameLength = 0;
    this.playerWon = 0;
    this.computerWon = 0;
    this.draw = 0;
    this.startDate = new Date();
  }

  id: number;
  gameNumber: number;
  gameLength: number;
  gameType: string;
  playerWon: number;
  computerWon: number;
  draw: number;
  startDate: Date;
  endDate: Date;
}
