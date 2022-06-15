import * as React from 'react';

export const useSafeContext = <T>(context: React.Context<T>) => {
  const value = React.useContext(context);
  if (value == undefined) {
    throw new Error(
      `${context.displayName || 'Context'} must be used inside ${
        context.displayName || 'Context'
      }.Provider`
    );
  }
  return value!; // this cannot be undefined, so we can destructure from it
};

export default useSafeContext;
