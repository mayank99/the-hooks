import * as React from 'react';

export const useUncontrolledState = <S>(uncontrolledValue: S, initialValue?: S) => {
	const [controlledValue, setControlledValue] = React.useState<S>(initialValue);
	return [uncontrolledValue ?? controlledValue, setControlledValue] as const;
};

export default useUncontrolledState;
