import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({ template: '' })
export abstract class DestroyableComponent implements OnDestroy {
    private onDestroySubj$: Subject<void> = new Subject();
    protected onDestroy$: Observable<void> = this.onDestroySubj$.asObservable();

    public constructor() {
        const prototype = Object.getPrototypeOf(this);
        if (!prototype.isNgOnDestroyCorrected) {
            prototype.ngOnDestroyChild = this.ngOnDestroy;
            prototype.ngOnDestroy = this.onDestroyInternal;
            prototype.isNgOnDestroyCorrected = true;
        }
    }

    public ngOnDestroy() {}

    private ngOnDestroyChild() {}

    private onDestroyInternal() {
        this.ngOnDestroyChild();
        this.onDestroySubj$.next();
        this.onDestroySubj$.complete();
    }
}
