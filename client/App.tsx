import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ThemeProvider from "./src/contexts/theme";
import SearchProvider from "./src/contexts/search";
import { Provider } from "react-redux";
import {  MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { store } from "./src/redux/store";
import RootStackScreen from "./src/screens";

export interface IAppProps {}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App: React.FC<IAppProps> = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <ThemeProvider>
          <SearchProvider>
            <NavigationContainer>
              <RootStackScreen />
            </NavigationContainer>
          </SearchProvider>
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
