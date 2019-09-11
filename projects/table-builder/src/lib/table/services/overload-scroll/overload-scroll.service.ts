import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class OverloadScrollService {
    public scrollStatus: Subject<boolean> = new Subject();
}
