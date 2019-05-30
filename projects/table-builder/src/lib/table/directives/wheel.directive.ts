import { Directive, ElementRef, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { WHEEL_MAX_DELTA } from '../config/table-builder.tokens';

@Directive({ selector: '[wheelThrottling]' })
export class WheelThrottlingDirective implements OnInit, OnDestroy {
    @Output() public scrollOffset: EventEmitter<boolean> = new EventEmitter();
    public scrollTopOffset: boolean = false;

    constructor(
        @Inject(WHEEL_MAX_DELTA) private readonly maxDelta: number,
        private readonly elementRef: ElementRef,
        private readonly ngZone: NgZone
    ) {}

    /**
     * Firefox can't correct rendering when mouse wheel delta X, Y more then 200-500px
     */
    public static handlerOptions(userAgent: string = null): boolean | AddEventListenerOptions {
        const isFirefox: boolean = (userAgent || navigator.userAgent).toLowerCase().indexOf('firefox') > -1;
        return isFirefox ? true : { passive: true };
    }

    private get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.element.addEventListener(
                'wheel',
                this.onElementScroll.bind(this),
                WheelThrottlingDirective.handlerOptions()
            );
        });
    }

    public ngOnDestroy(): void {
        this.element.removeEventListener(
            'wheel',
            this.onElementScroll.bind(this),
            WheelThrottlingDirective.handlerOptions()
        );
    }

    public onElementScroll($event: WheelEvent): void {
        const deltaX: number = Math.abs(Number($event.deltaY));
        const deltaY: number = Math.abs(Number($event.deltaX));
        const isLimitExceeded: boolean = deltaX > this.maxDelta || deltaY > this.maxDelta;

        if (isLimitExceeded) {
            $event.preventDefault();
        }

        const isOffset: boolean = this.element.scrollTop > 0 && !this.scrollTopOffset;

        if (isOffset) {
            this.scrollTopOffset = true;
            this.scrollOffset.emit(this.scrollTopOffset);
        } else if (this.element.scrollTop === 0 && this.scrollTopOffset) {
            this.scrollTopOffset = false;
            this.scrollOffset.emit(this.scrollTopOffset);
        }
    }
}
