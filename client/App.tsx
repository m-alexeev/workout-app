import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ThemeProvider from "./src/contexts/theme";
import SearchProvider from "./src/contexts/search";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "./src/redux/store";
import RootStackScreen from "./src/screens";
import { MaterialDarkTheme } from "./src/theme/colors";

export interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={MaterialDarkTheme}>
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
