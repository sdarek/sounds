import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RecordingsResponse } from "../../../core/models/recording.model";
import { RecordingService } from "../../../core/services/recording/recording.service";
import { StorageService } from "../../../core/services/storage/storage.service";
import { UserResponse } from "../../../core/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recordings',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './recordings.component.html',
  styleUrls: ['./recordings.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecordingsComponent implements OnInit, AfterViewInit {
  @ViewChild('ongoingSwiper', { static: false }) ongoingSwiper?: ElementRef;
  @ViewChild('doneSwiper', { static: false }) doneSwiper?: ElementRef;

  ongoingRecordings: RecordingsResponse[] = [];
  doneRecordings: RecordingsResponse[] = [];
  user: UserResponse | null = null;

  constructor(
    private recordingService: RecordingService,
    private storageService: StorageService,
    private router: Router) {
  }

  ngOnInit(): void {
    const userString = this.storageService.getUser();
    if (userString) {
      this.user = JSON.parse(userString) as UserResponse;
      this.loadRecordings();
    }
  }

  ngAfterViewInit(): void {
    this.updateSwipers();
  }

  private loadRecordings() {
    if (this.user) {
      this.recordingService.getOngoingRecordings(this.user.id).subscribe(recordings => {
        this.ongoingRecordings = recordings;
        this.updateOngoingSwiper();
      });

      this.recordingService.getDoneRecordings(this.user.id).subscribe(recordings => {
        this.doneRecordings = recordings;
        this.updateDoneSwiper();
      });
    }
  }

  private updateOngoingSwiper() {
    setTimeout(() => {
      if (this.ongoingSwiper && this.ongoingSwiper.nativeElement.swiper) {
        this.ongoingSwiper.nativeElement.swiper.update();
      }
    }, 0);
  }

  private updateDoneSwiper() {
    setTimeout(() => {
      if (this.doneSwiper && this.doneSwiper.nativeElement.swiper) {
        this.doneSwiper.nativeElement.swiper.update();
      }
    }, 0);
  }

  private updateSwipers() {
    this.updateOngoingSwiper();
    this.updateDoneSwiper();
  }

  editRecordingSettings(recordingId: number): void {
    this.router.navigate(['/dashboard/recordings', recordingId]);
  }
}
