import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, last, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private readonly fireStorage: AngularFireStorage) {}

  public uploadImage(path: string, image: File): Observable<string> {
    const storageRef = this.fireStorage.ref(path);
    let uploadTask = this.fireStorage.upload(path, image);

    return uploadTask.snapshotChanges().pipe(
      last(),
      switchMap(() => storageRef.getDownloadURL())
    );
  }
}
