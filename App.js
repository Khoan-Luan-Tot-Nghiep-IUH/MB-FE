import { Provider } from 'react-redux';
import store from './src/Redux/store'; // Đảm bảo bạn đã nhập đúng đường dẫn đến store
import Navigator from "./src/Navigate/Navigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Navigator />
    </Provider>
  );
}
