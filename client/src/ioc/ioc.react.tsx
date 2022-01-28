import { Container, interfaces } from 'inversify';
import React, { useContext } from 'react';
import { useMemoOne } from 'use-memo-one';

const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });

type Props = {
  container: Container;
};

export const IoCProvider: React.FC<Props> = (props) => {
  return <InversifyContext.Provider value={{ container: props.container }}>{props.children}</InversifyContext.Provider>;
};

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>): T {
  const { container } = useContext(InversifyContext);

  if (!container) {
    throw new Error();
  }

  return useMemoOne(() => container.get<T>(identifier), [container, identifier]);
}

export default IoCProvider;
