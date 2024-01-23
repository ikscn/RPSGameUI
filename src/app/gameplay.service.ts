import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Game } from './game';
import { Weapon } from './weapon';
import { Round } from './round';

@Injectable({
  providedIn: 'root'
})
export class GameplayService {

  private serverUrl = 'http://localhost:8080/';
  private playSingleUrl = 'play/round';
  private playAutoUrl = 'play/auto';
  private getHistoryUrl = 'history';
  private getWeaponsUrl = 'weapons';
  private saveManualUrl = 'save/manual';

  private weapons: Weapon[] = [];

  private auto: boolean;
  private playing: boolean;
  private playerWeapon: Weapon;
  private computerWeapon: Weapon;
  private weaponSelected: boolean;
  private computerDecided: boolean = false;
  private gameLength: number;
  // Game results
  private autoGameResult: Game;
  private roundResult: Round;
  private manualGame: Game;
  private gameHistory: Game[];

  constructor(private httpClient: HttpClient) {
    this.setPlaying(false);
    this.initWeapons();
    this.initManualGame();
  }

  // Initialize weapon options
  private initWeapons() {
    this.getWeaponsReq().subscribe(data => {
      data.forEach(weapon => {
        this.weapons.push(weapon);
      });
      console.log('Available Weapons: ');
      console.log(this.weapons);
    });

    /* this.weapons.push({id: 0, name: 'Rock', imgSrc: 'rock.png'},
                      {id: 1, name: 'Paper', imgSrc: 'paper.png'},
                      {id: 2, name: 'Scissors', imgSrc: 'scissors.png'},
                      {id: -1, name: 'Random', imgSrc: 'question.png'}); */
  }

  public playAutoGame() {
    this.setComputerDecided(true);
    this.playAutoGameReq().subscribe(data => {
                        this.autoGameResult = data;
                        console.log('Auto game player won: ' + data.playerWon);
                        this.updateGameHistory();
                      });
  }

  public playSingleGame() {
    this.setComputerDecided(true);
    this.playSingleGameReq().subscribe(data => {
                        this.updateRoundResult(data);
                        console.log('Single game result: ' + data.result);
                        this.addSingleResult(data.result);
                        console.log('Computer Weapon: ' + data.computerWeapon.name);
                        this.updateGameHistory();
                      });
  }

  public updateGameHistory() {
    this.getGameHistoryReq().subscribe(data => {
                        this.gameHistory = data;
                        console.log('Game history received. Total games played: ' + data.length);
                      });
  }

  private getWeaponsReq(): Observable<Weapon[]> {
    return this.httpClient.get<Weapon[]>(this.serverUrl + this.getWeaponsUrl);
  }

  // Play auto game via server API
  private playAutoGameReq(): Observable<Game> {
    let qparams: HttpParams = new HttpParams();
    qparams = qparams.append('playerWeapon', this.getPlayerWeapon().id)
                     .append('gameLength', this.getGameLength());
    let gameResponse = this.httpClient.get<Game>(this.serverUrl + this.playAutoUrl, {params: qparams});
    console.log('Game result: ' + gameResponse);
    return gameResponse;
  }

  // Play single game via server API
  private playSingleGameReq(): Observable<Round> {
    let roundResult = this.httpClient.get<Round>(this.serverUrl + this.playSingleUrl
          + '?playerWeapon=' + this.getPlayerWeapon().id);
    return roundResult;
  }

  // Get game history from server API
  public getGameHistoryReq(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.serverUrl + this.getHistoryUrl);
  }

  private saveManualGameReq(game :Game) :Observable<Game> {
    console.log(game);
    return this.httpClient.post<Game>(this.serverUrl + this.saveManualUrl, game).pipe(
      catchError(this.handleError)
    );
  }

  startSingleGame(): void {
    this.setAuto(false);
    this.setPlaying(true);

  }

  startAutoGame(gameLength: number): void {
    this.setAuto(true);
    this.setPlaying(true);
    this.setGameLength(gameLength);
  }

  public endGame() {
    this.setPlaying(false);
    this.setWeaponSelected(false);
    this.setComputerDecided(false);
    if(!this.isAuto()) {
      this.manualGame.gameType = 'M';
      this.manualGame.endDate = new Date();
      this.saveManualGameReq(this.manualGame).subscribe(data => {
        console.log('Manual Game Results:');
        console.log(data);
        this.manualGame = new Game();
        this.updateGameHistory();
      });
    }
  }

  public isAuto() {
    return this.auto;
  }

  public setAuto(auto: boolean) {
    this.auto = auto;
  }

  public isPlaying() {
    return this.playing;
  }

  public setPlaying(playing: boolean) {
    this.playing = playing;
  }

  public getPlayerWeapon(): Weapon {
    return this.playerWeapon;
  }

  public setPlayerWeapon(weapon: Weapon) {
    this.playerWeapon = weapon;
  }

  public getGameLength(): number {
    return this.gameLength;
  }

  public setGameLength(gameLength: number) {
    this.gameLength = gameLength;
  }

  public isWeaponSelected() {
    return this.weaponSelected;
  }

  public setWeaponSelected(selected: boolean) {
    return this.weaponSelected = selected;
  }

  public getRoundResult() {
    return this.roundResult;
  }

  public getAutoGameResult() {
    return this.autoGameResult;
  }

  public getGameHistory(): Game[] {
    return this.gameHistory;
  }

  public isComputerDecided(): boolean {
    return this.computerDecided;
  }

  public setComputerDecided(decided: boolean) {
    this.computerDecided = decided;
  }

  public getManualGame(): Game {
    return this.manualGame;
  }

  private addSingleResult(result: number): void {
    if(this.manualGame != null){
      this.manualGame.gameLength ++;
      switch (result) {
        case 0:
          this.manualGame.draw ++;
          break;
        case 1:
          this.manualGame.playerWon ++;
          break;
        case 2:
          this.manualGame.computerWon ++;
          break;
        default:
          break;
      }
    }
  }

  private initManualGame() {
    this.manualGame = new Game();
  }

  public getComputerWeapon(): Weapon {
    return this.computerWeapon;
  }

  public getWeapons(): Weapon[] {
    return this.weapons;
  }

  public updateRoundResult(data: Round) {
    this.roundResult = data;
    this.computerWeapon = data.computerWeapon;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
