import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHistoryComponent } from './game-history.component';

describe('GameHistoryComponent', () => {
  let component: GameHistoryComponent;
  let fixture: ComponentFixture<GameHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameHistoryComponent]
    });
    fixture = TestBed.createComponent(GameHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
