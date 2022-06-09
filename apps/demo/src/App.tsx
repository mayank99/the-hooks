import * as React from 'react';
import { useCSSTransition } from 'use-css-transition';
import './App.css';

export const App = () => {
  const duration = 500;
  const [isVisible, toggle] = React.useReducer((s) => !s, false);
  const [state, ref] = useCSSTransition({ isVisible, duration });

  return (
    <main>
      <button onClick={toggle}>Show</button>
      {state != null && (
        <div
          ref={ref}
          style={{ '--duration': `${duration}ms` }}
          data-state={state}
        />
      )}
    </main>
  );
};

export default App;
