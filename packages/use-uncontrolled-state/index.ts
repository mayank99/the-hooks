import * as React from 'react';

export const useUncontrolledState = <S>(uncontrolledValue: S) => {
	const [controlledValue, setValue] = React.useState(uncontrolledValue);
	const value = uncontrolledValue ?? controlledValue;
	return [value, setValue] as const;
};

export default useUncontrolledState;
