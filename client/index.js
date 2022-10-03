import { registerRootComponent } from 'expo';
import { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <App/>
//   </StrictMode>
// );


registerRootComponent(App);
