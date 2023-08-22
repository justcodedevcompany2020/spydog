import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Gstyles} from '../../gStyles';
import {
  DarkMenu,
  GoBack,
  GoBackLight,
  LightMenu,
  Moon,
  Sun,
} from '../../svg';
import {
  ChangeMoodToDark,
  ChangeMoodToLight,
  OpenMenu,
} from '../store/action/action';
import {Colors} from '../ui/color';
export const Header = ({navigation, goBack = false, title = 'SpyDog VPN'}) => {
  const dispatch = useDispatch();
  const mainData = useSelector(st => st.mainData);
  return (
    <SafeAreaView >
      <View style={styles.header}>
      {goBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {mainData.mood === '#ECF3FB' ? <GoBackLight /> : <GoBack />}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => dispatch(OpenMenu(true))}>
          {mainData.mood === '#ECF3FB' ? <LightMenu /> : <DarkMenu />}
        </TouchableOpacity>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {!goBack && (
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/images/Dog.png')}
          />
        )}
        <Text
          style={[
            Gstyles.text,
            {color: Colors(mainData.mood).color, marginHorizontal: 10},
          ]}>
          {title}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Ad')}  style={styles.Roy}>
          <Image style = {{width:25,height:25}} source={require('../../assets/images/crone.png')} />
        </TouchableOpacity>
        {mainData.mood === '#ECF3FB' ? (
          <TouchableOpacity onPress={() => dispatch(ChangeMoodToDark())}>
            <Sun />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => dispatch(ChangeMoodToLight())}>
            <Moon />
          </TouchableOpacity>
        )}
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Roy: {
    marginRight: 10,
    marginBottom:3
  },

});
