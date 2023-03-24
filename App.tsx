import { NativeBaseProvider, StatusBar } from "native-base";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes/app.routes";
import { AppContextProvider } from "./src/context/AppContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="default" backgroundColor="transparent" translucent />

      <AppContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AppContextProvider>
    </NativeBaseProvider>
  );
}
