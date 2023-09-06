import 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store/configStore';
import Main from "./main";



export default App = () => {
  return <>
    <Provider store={store}>
      <Main />
    </Provider>
  </>
} 