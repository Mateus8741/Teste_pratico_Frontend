import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { Home } from "../screens/home";

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;

  theme.colors.background = colors.white;

  return (
    <Box flex={1} bg="gray.100">
      <NavigationContainer theme={theme}>
        <Home />
      </NavigationContainer>
    </Box>
  );
}
