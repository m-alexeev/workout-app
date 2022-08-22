import { DefaultTheme, DarkTheme } from "@react-navigation/native";

interface IThemeInterface {
  mode: 'dark' | 'light'
  primary: string
  primary_var: string
  secondary: string
  secondary_var?: string
  background: string 
  surface: string 
  error: string
  text_primary:string
  text_secondary: string,
  
}

const CustomDarkTheme: IThemeInterface = {
    mode: 'dark',
    primary: '#BB86FC',
    primary_var: '#3700B3',
    secondary: "#03DAC6",
    background: '#121212',
    surface: "#121212",
    error: "#CF6679",
    text_primary: "#FFF",
    text_secondary: "#AAA",
}


const CustomLightTheme: IThemeInterface = {
    mode: 'light',
    primary: '#BB86FC',
    primary_var: '#3700B3',
    secondary: "#03DAC6",
    secondary_var: "#018786",
    background: '#121212',
    surface: "#121212",
    error: "#CF6679",
    text_primary: "#000",
    text_secondary: "#333",
  }

export {IThemeInterface, CustomDarkTheme, CustomLightTheme};