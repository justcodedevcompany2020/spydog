import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './src/Headers/header';
import { Ad } from './src/pages/AdScreen';
import { InstructionScreen } from './src/pages/InstructionScreen';
import { Language } from './src/pages/Language';
import { Location } from './src/pages/Loacation';
import { Main } from './src/pages/MainScreen';
import { SetUpAproxy } from './src/pages/SetUpAproxy';
import { Appearance } from 'react-native';
import { ChangeMoodToDark, ChangeMoodToLight, ChnageLanguage, GetMyTarife } from './src/store/action/action';
import { useEffect, useState } from 'react';
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import * as RNLocalize from 'react-native-localize';
import { t } from './src/ui/lang';



import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default Navigation = () => {

  const mainData = useSelector((st) => st.mainData)
  const Stack = createStackNavigator();
  const dispatch = useDispatch()
  const colorScheme = Appearance.getColorScheme();

  const getLanguage = async () => {
    const locales = RNLocalize.getLocales();
    let l = await AsyncStorage.getItem('l')
    if (l) {
      dispatch(ChnageLanguage(l))
    }
    else {
      const firstLocale = locales[0];
      if (firstLocale.languageCode)
        dispatch(ChnageLanguage(firstLocale.languageCode))
    }
  }
  // i18n.init({
  //   compatibilityJSON: 'v3',
  //   lng: 'en',
  //   resources: {
  //     en: { translation: en },
  //     ru: { translation: ru },
  //   },
  // });
  // i18n
  //   .use(initReactI18next)
  //   .init({
  //     resources: {
  //       en: {
  //         translation: en,
  //       },
  //       ru: { translation: ru },
  //     },
  //     lng: 'en', // Default language
  //     debug: true, // Enable debugging
  //   });


  let color = mainData.mood
  const MyTheme = {
    dark: false,
    colors: {
      primary: color,
      background: color === '#ECF3FB' ? "#FFFFFF" : color,
      border: color,
    },
  };


  const getdeviceId = async () => {
    var uniqueId = await DeviceInfo.getUniqueId();
    dispatch(GetMyTarife(uniqueId))
  };

  useEffect(() => {
    getdeviceId()
    if (colorScheme === 'dark') {
      dispatch(ChangeMoodToDark())
    }
    else {
      dispatch(ChangeMoodToLight())
    }
    // getLanguage()

  }, [])




  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer theme={MyTheme} >
        <Stack.Navigator initialRouteName={'InstructionScreen'} >
          <Stack.Screen
            name="Ad"
            component={Ad}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              header: ({ navigation }) => {
                return <Header navigation={navigation} />
              }
            }}
          />
          <Stack.Screen
            name={'Location'}
            component={Location}
            options={{
              header: ({ navigation }) => {
                return <Header title={'Location'} goBack navigation={navigation} />
              }
            }}
          />
          <Stack.Screen
            name="Language"
            component={Language}
            options={{
              header: ({ navigation }) => {
                return <Header title={t(mainData.lang).Language} goBack navigation={navigation} />
              }
            }}
          />
          <Stack.Screen
            name="SetUpAproxy"
            component={SetUpAproxy}
            options={{
              header: ({ navigation }) => {
                return <Header title='Set up a proxy' goBack navigation={navigation} />
              }
            }}
          />
          <Stack.Screen
            name="InstructionScreen"
            component={InstructionScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>

      </NavigationContainer>
    </I18nextProvider>

  );
};