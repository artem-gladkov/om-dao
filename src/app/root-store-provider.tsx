import { FC, ReactElement } from 'react';
import { RootStore } from './root-store';
import { RootStoreContext } from './root-store-context';

export interface RootStoreProviderProps {
	rootStore: RootStore;
	children: ReactElement;
}

export const RootStoreProvider: FC<RootStoreProviderProps> = ({
	children,
	rootStore,
}) => {
	return (
		<RootStoreContext.Provider value={rootStore}>
			{children}
		</RootStoreContext.Provider>
	);
};
