import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

const defaultTimeAnimation: number = 200;

export const fadeAnimation: AnimationTriggerMetadata = trigger('fadeAnimation', [
    // the "in" style determines the "resting" state of the element when it is visible.
    state('in', style({ opacity: 1 })),

    // fade in when created. this could also be written as transition('void => *')
    transition(':enter', [style({ opacity: 0 }), animate(defaultTimeAnimation)]),

    // fade out when destroyed. this could also be written as transition('void => *')
    transition(':leave', animate(defaultTimeAnimation, style({ opacity: 0 })))
]);
