import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

const generateClassName = createGenerateClassName({
  // Replaces default "jss" production classname prefix with "co"
  // This will avoid collisions with other apps
  productionPrefix: 'co',
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
