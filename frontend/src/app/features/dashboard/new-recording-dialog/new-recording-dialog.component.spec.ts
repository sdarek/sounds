import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecordingDialogComponent } from './new-recording-dialog.component';

describe('NewRecordingDialogComponent', () => {
  let component: NewRecordingDialogComponent;
  let fixture: ComponentFixture<NewRecordingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRecordingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewRecordingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
