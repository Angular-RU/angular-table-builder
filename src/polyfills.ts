import 'zone.js/dist/zone';
import 'intersection-observer';

import { Any } from '../projects/table-builder/src/lib/table/interfaces/table-builder.internal';

declare const Zone: Any;
declare const __Zone_ignore_on_properties: Any;

// black list scroll event handler for addEventListener
Zone[Zone.__symbol__('BLACK_LISTED_EVENTS')] = [
    'scroll',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseover',
    'mouseout',
    'mousewheel'
];

// black list scroll event handler for onProp
const targets = [window, Document.prototype, HTMLBodyElement.prototype, HTMLElement.prototype];

window['__Zone_ignore_on_properties'] = [];

targets.forEach(function(target) {
    __Zone_ignore_on_properties.push({
        target: target,
        ignoreProperties: ['scroll', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mousewheel']
    });
});

// disable requestAnimationFrame
window['__Zone_disable_requestAnimationFrame'] = true;
