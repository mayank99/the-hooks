import * as React from 'react';
import { useAnimatedToggle } from '@smol-hooks/use-animated-toggle';
import './App.css';

export const App = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, toggle] = useAnimatedToggle(ref, {
    duration: 500,
    enterKeyframes: [
      { opacity: 0, transform: 'translateX(-100%)' },
      { opacity: 1, transform: 'translateX(0)' },
    ],
    exitKeyframes: { opacity: 0, transform: 'translateX(100%)' },
  });

  return (
    <main>
      <h1>
        <code>useAnimatedToggle</code> demo
      </h1>
      <button onClick={() => toggle()}>{!isVisible ? 'Show' : 'Hide'}</button>
      {isVisible && <div ref={ref} />}
    </main>
  );
};

export default App;
