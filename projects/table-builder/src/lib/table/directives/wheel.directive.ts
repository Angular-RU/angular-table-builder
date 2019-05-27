import { Directive, ElementRef, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { WHEEL_MAX_DELTA } from '../../table-builder.tokens';

@Directive({ selector: '[wheelThrottling]' })
export class WheelThrottlingDirective implements OnInit, OnDestroy {
    @Output() public scrollOverload: EventEmitter<boolean> = new EventEmitter();
    private overloadStatus: boolean = false;

    constructor(
        @Inject(WHEEL_MAX_DELTA) private readonly maxDelta: number,
        private elementRef: ElementRef,
        private ngZone: NgZone
    ) {}

    private get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.element.addEventListener('wheel', this.onElementScroll.bind(this), true);
        });
    }

    public ngOnDestroy(): void {
        this.element.removeEventListener('wheel', this.onElementScroll.bind(this), true);
    }

    public onElementScroll($event: WheelEvent): void {
        const deltaX: number = Math.abs($event.deltaY as number);
        const deltaY: number = Math.abs($event.deltaX as number);
        const isLimitExceeded: boolean = deltaX > this.maxDelta || deltaY > this.maxDelta;

        if (isLimitExceeded) {
            this.overloadStatus = true;
            this.scrollOverload.emit(this.overloadStatus);
            $event.preventDefault();
        } else if (this.overloadStatus) {
            this.overloadStatus = false;
            this.scrollOverload.emit(this.overloadStatus);
        }
    }
}
