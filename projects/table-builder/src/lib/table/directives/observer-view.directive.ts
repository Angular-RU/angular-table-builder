import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output } from '@angular/core';

@Directive({ selector: '[observerView]' })
export class ObserverViewDirective implements AfterViewInit, OnDestroy {
    private static readonly MIN_TIME_IDLE: number = 120;
    @Output() public observeVisible: EventEmitter<boolean> = new EventEmitter();
    @Input('rendered') public isRendered: boolean;
    private observer: IntersectionObserver = null;
    private previousRation: number = 0.0;
    private frameId: number;

    constructor(private element: ElementRef, private readonly ngZone: NgZone) {}

    public ngAfterViewInit(): void {
        this.observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]): void => {
                entries.forEach((entry: IntersectionObserverEntry) => {
                    this.ngZone.runOutsideAngular(() => {
                        const isVisible: boolean =
                            entry.intersectionRatio > this.previousRation || entry.isIntersecting;

                        if (this.isRendered) {
                            clearTimeout(this.frameId);
                            this.frameId = window.setTimeout(() => {
                                this.observeVisible.emit(isVisible);
                            }, ObserverViewDirective.MIN_TIME_IDLE);
                        } else {
                            window.requestAnimationFrame(() => this.observeVisible.emit(isVisible));
                        }
                    });

                    this.previousRation = entry.intersectionRatio;
                });
            },
            {
                root: null,
                rootMargin: '0px 0px 0px 0px',
                threshold: [0]
            }
        );

        this.observer.observe(this.element.nativeElement);
    }

    public ngOnDestroy(): void {
        this.element = { nativeElement: null };
        clearTimeout(this.frameId);
        this.observer.disconnect();
    }
}
