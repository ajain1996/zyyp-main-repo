/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import App from './src/Setup';
import {name as appName} from './app.json';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();//Disable Warning Message
AppRegistry.registerComponent(appName, () => App);
