import * as React from 'react';

export const useAnimatedToggle = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  {
    duration,
    enterKeyframes,
    exitKeyframes,
  }: {
    duration: number;
    enterKeyframes: Keyframe[] | PropertyIndexedKeyframes;
    exitKeyframes: Keyframe[] | PropertyIndexedKeyframes;
  }
) => {
  const [isMounted, setIsMounted] = React.useState(false);

  const toggle = React.useCallback(
    (force = false) => {
      if (force || !isMounted) {
        setIsMounted(true);

        // after the component is mounted, ref has been set so we can animate it
        queueMicrotask(async () => {
          const anim = ref.current?.animate(enterKeyframes, { duration });
          await anim?.finished;

          // 🤮 after the animation is done, we need to manually persist the styles
          const finalStyles = Array.isArray(enterKeyframes)
            ? enterKeyframes[enterKeyframes.length - 1]
            : enterKeyframes;
          Object.entries(finalStyles).forEach(([key, value]) => {
            ref.current?.style.setProperty(key, value?.toString() ?? null);
          });
        });
      } else {
        (async () => {
          const anim = ref.current?.animate(exitKeyframes, {
            duration,
            fill: 'forwards', // fill forwards to avoid a flash
          });
          await anim?.finished;

          // unmount the component after the animation is done
          setIsMounted(false);
        })();
      }
    },
    [ref, isMounted, duration, enterKeyframes, exitKeyframes]
  );

  return [isMounted, toggle] as const;
};

export default useAnimatedToggle;
