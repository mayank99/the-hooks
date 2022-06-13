import * as React from 'react';
import { useCSSTransition } from 'use-css-transition';
import './App.css';

export const App = () => {
  const duration = 500;
  const [isVisible, toggleIsVisible] = React.useReducer((s) => !s, false);

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <main>
      <button
        onClick={() => {
          if (!isVisible) {
            toggleIsVisible();
            queueMicrotask(() => {
              ref.current?.animate(
                { opacity: 1, transform: 'translateX(0)' },
                { duration, fill: 'forwards' }
              );
            });
          } else {
            ref.current
              ?.animate(
                { opacity: 0, transform: 'translateX(100%)' },
                { duration, fill: 'forwards' }
              )
              .finished.then(() => toggleIsVisible());
          }
        }}
      >
        Show
      </button>
      {isVisible && <div ref={ref} />}
    </main>
  );
};

export default App;
