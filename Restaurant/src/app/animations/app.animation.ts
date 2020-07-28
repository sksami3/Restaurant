import {
    trigger,
    state,
    style,
    animate,
    transition,
    AnimationTriggerMetadata,
} from '@angular/animations';

export function visibility() : AnimationTriggerMetadata {
    return trigger('visi', [
        state('_shown', style({
          transform: 'scale(1.0)',
          opacity: 1
        })),
        state('_hidden', style({
          transform: 'scale(0.5)',
          opacity: 0
        })),
        transition('* => *', animate("1s 10ms cubic-bezier(.17,.67,.88,.1)"))
      ])
};

export function controlInOutWithFlyingAnimation(): AnimationTriggerMetadata{
    return trigger('flyInOut',[
        state('anyStage',style({
            opacity:1, transform:'translateX(0)'
        })),
        transition(':enter',[
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate('500ms ease-in')
        ]),
        transition(':leave',[
            animate('500ms ease-out',style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
    ])
};

export function expand() : AnimationTriggerMetadata{
    return trigger('expand',[
        state('*',style({
            opacity: 1
        })),
        transition(':enter',[
            style({ transform: 'translateY(-50%)' }),
            animate('200ms ease-in')
        ])
    ])
}