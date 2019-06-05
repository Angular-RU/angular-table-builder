import { ElementRef, NgZone } from '@angular/core';

import { WheelThrottlingDirective } from '../../table/directives/wheel.directive';
import { Any, Fn } from '../../table/interfaces/table-builder.internal';

describe('[TEST]: Wheel throttling', () => {
    let directive: WheelThrottlingDirective;
    let scrollDispatcher: Fn;
    let preventDefaulted: number = 0;
    let addedEvent: boolean = false;
    let removeEvent: boolean = false;
    const maxDeltaWheel: number = 100;

    const mockNgZone: Partial<NgZone> = {
        runOutsideAngular<T = Any>(fn: Fn): T {
            return fn() as Any;
        }
    };

    const mockElementRef: ElementRef = {
        nativeElement: {
            scrollTop: 0,
            addEventListener: (_: string, fn: Fn): void => {
                scrollDispatcher = fn;
                addedEvent = true;
            },
            removeEventListener: (): void => {
                scrollDispatcher = null;
                removeEvent = true;
            }
        }
    };

    beforeEach(() => {
        directive = new WheelThrottlingDirective(maxDeltaWheel, mockElementRef, mockNgZone as NgZone);
        preventDefaulted = 0;
    });

    it('should be correct invoke ngOnInit', () => {
        directive.ngOnInit();
        expect(addedEvent).toEqual(true);
    });

    it(`should be didn't call preventDefault`, () => {
        const deltaY: number = 10;
        mockElementRef.nativeElement.scrollTop = deltaY;
        const event: Partial<WheelEvent> = createEvent(0, deltaY);
        directive.onElementScroll(event as WheelEvent);
        expect(preventDefaulted).toEqual(0);
        expect(directive.scrollTopOffset).toEqual(true);
    });

    it('should be call preventDefault', () => {
        const deltaY: number = -150;
        mockElementRef.nativeElement.scrollTop = Math.abs(Number(deltaY));
        let event: Partial<WheelEvent> = createEvent(0, deltaY, () => (mockElementRef.nativeElement.scrollTop = 0));

        directive.onElementScroll(event as WheelEvent);
        expect(preventDefaulted).toEqual(1);
        expect(directive.scrollTopOffset).toEqual(false);

        event = createEvent(150, deltaY, () => {
            mockElementRef.nativeElement.scrollTop = 0;
            directive.scrollTopOffset = true;
        });

        directive.onElementScroll(event as WheelEvent);
        expect(preventDefaulted).toEqual(2);
        expect(directive.scrollTopOffset).toEqual(false);
    });

    it('should be correct invoke ngOnDestroy', () => {
        directive.ngOnDestroy();
        expect(removeEvent).toEqual(true);
    });

    it('check handler options', () => {
        expect(WheelThrottlingDirective.handlerOptions()).toEqual({ passive: false });
        expect(
            WheelThrottlingDirective.handlerOptions(
                'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
            )
        ).toEqual(true);
    });

    function createEvent(deltaX: number, deltaY: number, callback: Fn = (): void => {}): Partial<WheelEvent> {
        return {
            deltaX,
            deltaY,
            preventDefault(): void {
                preventDefaulted++;
                callback();
            }
        };
    }
});
