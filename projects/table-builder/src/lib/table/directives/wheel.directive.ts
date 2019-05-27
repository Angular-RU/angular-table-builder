import { Directive, ElementRef, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { WHEEL_MAX_DELTA } from '../../table-builder.tokens';

@Directive({ selector: '[wheelThrottling]' })
export class WheelThrottlingDirective implements OnInit, OnDestroy {
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
            $event.preventDefault();
        }
    }
}
