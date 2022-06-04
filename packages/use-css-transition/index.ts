import * as React from 'react';

export const useCSSTransition = () => {
  const ref = React.useCallback(() => {}, []);
  const classNames = {} as const;
  return [ref, classNames];
};
