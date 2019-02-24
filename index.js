/**
 * Template 
 *
 *
 * @Rakesh
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { Provider } from 'react-redux'
import React from 'react'
import Navigator from './src/Navigation/Navigator.js'
import configureStore from './src/Redux/Store.js';
import { MenuProvider, MenuContext } from 'react-native-popup-menu';
import NavigationService from './src/Libraries/NavigationService.js';

const store = configureStore()

// Pass the store into the Provider
const AppWithStore = () => (
  <MenuProvider>
  <Provider store={store}>
  <Navigator 
  ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  </Provider>
  </MenuProvider>
)

AppRegistry.registerComponent(appName, () => AppWithStore)
