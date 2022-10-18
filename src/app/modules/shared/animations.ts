import { animate, state, style, transition, trigger } from "@angular/animations";

export function hideTransparentAnimation(durationMs = 300) {
  return trigger('hideTransparent', [
      state(
          'false',
          style({
              opacity: '*',
              display: '*',
          }),
      ),
      state(
          'true',
          style({
              display: 'none',
              opacity: 0,
          }),
      ),
      transition('false <=> true', animate(`${durationMs}ms ease-in-out`)),
  ]);
}
