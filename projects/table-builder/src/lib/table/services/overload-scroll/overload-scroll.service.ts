import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class OverloadScrollService {
    public static readonly MIN_DELTA: number = 100;
    public scrollEnd: Subject<void> = new Subject();
    public scrollDelta: Subject<number> = new Subject();
}
