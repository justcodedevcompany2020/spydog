import Navigation from "./Navigation";
import 'react-native-gesture-handler';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/store/configStore';
import en from "./src/components/lang/en.json";
import ru from "./src/components/lang/ru.json";

// import { Vpn } from "./src/components/Vpn";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChnageLanguage } from "./src/store/action/action";



export default Main = () => {


    return <>
        <Navigation />
    </>
} 