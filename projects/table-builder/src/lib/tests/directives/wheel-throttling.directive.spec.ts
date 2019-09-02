import { ElementRef, NgZone } from '@angular/core';

import { WheelThrottlingDirective } from '../../table/directives/wheel.directive';
import { Any, Fn } from '../../table/interfaces/table-builder.internal';
import { TableBuilderOptionsImpl } from '../../table/config/table-builder-options';
import { UtilsService } from '../../table/services/utils/utils.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('[TEST]: Wheel throttling', () => {
    let directive: WheelThrottlingDirective;
    let scrollDispatcher: Fn;
    let preventDefaulted: number = 0;
    let addedEvent: boolean = false;
    let removeEvent: boolean = false;
    const maxDeltaWheel: number = 100;

    const mockNgZone: Partial<NgZone> = {
        runOutsideAngular<T = Any>(fn: Fn): T {
            return fn();
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
        const options: TableBuilderOptionsImpl = new TableBuilderOptionsImpl();
        options.wheelMaxDelta = maxDeltaWheel;
        directive = new WheelThrottlingDirective(options, mockElementRef, mockNgZone as NgZone, new UtilsService(null));
        preventDefaulted = 0;
    });

    it('should be correct invoke ngOnInit', () => {
        directive.ngOnInit();
        expect(addedEvent).toEqual(true);
    });

    it(`should be didn't call preventDefault`, fakeAsync(() => {
        const deltaY: number = 10;
        mockElementRef.nativeElement.scrollTop = deltaY;
        const event: Partial<WheelEvent> = createEvent(0, deltaY);
        directive.onElementScroll(event as WheelEvent);
        expect(preventDefaulted).toEqual(0);
        tick(100);

        expect(directive.scrollTopOffset).toEqual(true);
    }));

    it('should be call preventDefault', fakeAsync(() => {
        directive.isPassive = false;

        const deltaY: number = -150;
        mockElementRef.nativeElement.scrollTop = Math.abs(Number(deltaY));
        let event: Partial<WheelEvent> = createEvent(0, deltaY, () => (mockElementRef.nativeElement.scrollTop = 0));

        directive.onElementScroll(event as WheelEvent);
        expect(preventDefaulted).toEqual(1);

        tick(100);

        expect(directive.scrollTopOffset).toEqual(false);

        event = createEvent(150, deltaY, () => {
            mockElementRef.nativeElement.scrollTop = 0;
            directive.scrollTopOffset = true;
        });

        directive.onElementScroll(event as WheelEvent);
        expect(preventDefaulted).toEqual(2);

        tick(100);

        expect(directive.scrollTopOffset).toEqual(false);

        directive.isPassive = true; // reset

        event = createEvent(300, deltaY, () => {});
        directive.onElementScroll(event as WheelEvent);
        expect(preventDefaulted).toEqual(2);

        tick(100);
    }));

    it('should be correct invoke ngOnDestroy', () => {
        directive.ngOnDestroy();
        expect(removeEvent).toEqual(true);
    });

    it('check handler options', () => {
        expect(directive.isPassive).toEqual(true);
        expect(directive.listenerOptions).toEqual({ passive: true });

        directive.isPassive = false;
        expect(directive.listenerOptions).toEqual(true);

        directive.isPassive = true; // reset
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
