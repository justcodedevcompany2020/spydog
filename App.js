import Navigation from "./Navigation";
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/store/configStore';
// import { Vpn } from "./src/components/Vpn";


export default App = () =>{
  
  return <>
  <Provider store={store}>
    {/* <Vpn /> */}
    <Navigation />
  </Provider>
  </>
} 