import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Gstyles } from '../../../gStyles';
import { Instruction } from '../../components/Instruction';
import { Colors } from '../../ui/color';
import { AnonymousSvg, DogSvg, FastSvg, LargeSvg, SevureSvg } from '../../../svg';
import dark from '../../../assets/images/1.png';
import light from '../../../assets/images/2.png';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useTranslation } from 'react-i18next';
import { t } from '../../ui/lang';


export const InstructionScreen = ({ navigation }) => {
  const mainData = useSelector(st => st.mainData);
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);
  // const { t } = useTranslation();


  const [data, setData] = useState([
    {
      title: t(mainData.lang).ImVPN,
      text1: t(mainData.lang).Imake,
      text2: t(mainData.lang).limitless,
      svg: <DogSvg />,
    },
    {
      title: t(mainData.lang).anonymous,
      text1: t(mainData.lang).hideyourip,
      text2: t(mainData.lang).beanonymous,
      svg: <AnonymousSvg />,
    },
    {
      title: t(mainData.lang).fast,
      text1: t(mainData.lang).ourservershave,
      text2: t(mainData.lang).highspeed,
      svg: <FastSvg />,
    },
    {
      title: t(mainData.lang).largenumber,
      text1: t(mainData.lang).weoffer,
      text2: t(mainData.lang).differentcountries,
      svg: <LargeSvg />,
    },
    {
      title: t(mainData.lang).secure,
      text1: t(mainData.lang).Transfer,
      text2: t(mainData.lang).anencryptedtunnel,
      svg: <SevureSvg />,
    },
  ]);
  const handelChange = () => {
    if (active < data.length - 1) {
      setActive(active + 1);
      swiperRef.current.goToIndex(active + 1);
    } else {
      navigation.navigate('Ad');
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <Instruction
        key={index}
        svg={item.svg}
        text1={item.text1}
        text2={item.text2}
        title={item.title}
        color={mainData.mood}
      />
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1, justifyContent: 'center' }}
        source={mainData.mood === '#ECF3FB' ? light : dark}>
        <View style={[Gstyles.main, { marginTop: 0, paddingHorizontal: 0 }]}>
          <SwiperFlatList
            // index={active}
            ref={swiperRef}
            renderAll
            onChangeIndex={index => {
              setActive(index.index);
            }}
            index0={active > 0 ? active - 1 : 0}
            data={data}
            renderItem={renderItem}
          />
          <View style={styles.block}>
            <TouchableOpacity onPress={() => navigation.navigate('Ad')}>
              <Text
                style={[
                  Gstyles.smallText,
                  { fontSize: 16, color: Colors(mainData.mood).color },
                ]}>
                {t(mainData.lang).skip}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              {data.map((elm, i) => {
                return (
                  <View
                    key={i}
                    style={[
                      styles.item,
                      active === i
                        ? {
                          backgroundColor: Colors(mainData.mood)
                            .activeItemColor,
                        }
                        : { backgroundColor: Colors(mainData.mood).itemColor },
                    ]}></View>
                );
              })}
            </View>
            <TouchableOpacity onPress={() => handelChange()}>
              <Text
                style={[
                  Gstyles.smallText,
                  { fontSize: 16, color: Colors(mainData.mood).color },
                ]}>
                {t(mainData.lang).next}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  item: {
    borderRadius: 50,
    width: 7,
    height: 7,
    marginRight: 5,
  },
});
