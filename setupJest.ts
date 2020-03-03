import 'jest-preset-angular';
import 'intersection-observer';

import { Any } from './projects/table-builder/src/lib/table/interfaces/table-builder.internal';

const jsdom: Any = require('jsdom');
const { JSDOM }: Any = jsdom;

const dom: Any = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global['window'] = dom.window;
global['document'] = dom.window.document;

// Simulate window resize events
const resizeEvent: Any = document.createEvent('Event');
resizeEvent.initEvent('resize', true, true);

global['window'].resizeTo = (width: number): void => {
    global['window'].innerWidth = width || global['window'].innerWidth;
    global['window'].innerHeight = width || global['window'].innerHeight;
    global['window'].dispatchEvent(resizeEvent);
};
