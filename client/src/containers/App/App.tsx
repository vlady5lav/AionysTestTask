import { observer } from 'mobx-react';
import React from 'react';
import '../../locales/config';
import { AppRoutes } from '../../routes';

const App = observer(() => {
  return (
    <>
      <AppRoutes />
    </>
  );
});

export default App;
