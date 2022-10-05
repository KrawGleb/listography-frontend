import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private readonly fireStorage: AngularFireStorage) {}

  public uploadImage(path: string, image: File): Observable<string> {
    return this.fireStorage
      .upload(path, image)
      .snapshotChanges()
      .pipe(switchMap(() => this.fireStorage.ref(path).getDownloadURL()));
  }
}
