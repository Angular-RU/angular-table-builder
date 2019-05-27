import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const fadeAnimation: AnimationTriggerMetadata = trigger('fadeAnimation', [
    // the "in" style determines the "resting" state of the element when it is visible.
    state('in', style({ opacity: 1 })),

    // fade in when created. this could also be written as transition('void => *')
    transition(':enter', [style({ opacity: 0 }), animate(200)]),

    // fade out when destroyed. this could also be written as transition('void => *')
    transition(':leave', animate(200, style({ opacity: 0 })))
]);
