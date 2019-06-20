import { Directive, ElementRef, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { NGX_TABLE_OPTIONS } from '../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';

@Directive({ selector: '[wheelThrottling]' })
export class WheelThrottlingDirective implements OnInit, OnDestroy {
    @Output() public scrollOffset: EventEmitter<boolean> = new EventEmitter();
    public scrollTopOffset: boolean = false;

    constructor(
        @Inject(NGX_TABLE_OPTIONS) private readonly options: TableBuilderOptionsImpl,
        private readonly elementRef: ElementRef,
        private readonly ngZone: NgZone
    ) {}

    /**
     * Firefox can't correct rendering when mouse wheel delta X, Y more then 200-500px
     */
    public static handlerOptions(userAgent: string = null): boolean | AddEventListenerOptions {
        const isFirefox: boolean = (userAgent || navigator.userAgent).toLowerCase().indexOf('firefox') > -1;
        return isFirefox ? true : { passive: false };
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
        const isLimitExceeded: boolean = deltaX > this.options.wheelMaxDelta || deltaY > this.options.wheelMaxDelta;

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
