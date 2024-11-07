import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
enableScreens();
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import Navigator from "./src/Navigate/Navigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
}
