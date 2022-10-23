import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "firebase/compat/auth";
import ThemeProvider from "./src/contexts/theme";
import SearchProvider from "./src/contexts/search";
import "./config/firebase";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import RootStackScreen from "./src/screens";

export interface IAppProps {}


const App: React.FC<IAppProps> = (props) => {
  
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SearchProvider>
          <NavigationContainer>
            <RootStackScreen/>
          </NavigationContainer>
        </SearchProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
