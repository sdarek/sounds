import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable = this.checkLocalStorageAvailability();
  }

  private checkLocalStorageAvailability(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(key);
    }
  }
}
