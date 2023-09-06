import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, TouchableOpacity, View, Image, Text, Modal, SafeAreaView, Linking, Alert, Share } from "react-native"
import { Colors } from "../../ui/color"
import { AboutUsSvg, CloseLightSvg, CloseSvg, ContactUsSvg, LanguageSvg, PremiumSvg, SetUpAProxy, ShareSvg } from '../../../svg'
import { Gstyles } from '../../../gStyles'
import { GoPremium } from '../GoPremium'
import { OpenMenu } from '../../store/action/action'
import { t } from '../../ui/lang';


export const Menu = ({ color, navigation }) => {
    const mainData = useSelector((st) => st.mainData)


    const [data, setData] = useState([
        // {svg:<SetUpAProxy />,title:'Set up a proxy',nav:'SetUpAproxy'},
        // {svg:<ContactUsSvg />,title:'Contact Us',nav:''},
        { svg: <PremiumSvg />, title: t(mainData.lang).Premium, nav: 'Ad' },
        { svg: <ShareSvg />, title: `${t(mainData.lang).share} VPN`, share: 's' },
        { svg: <LanguageSvg />, title: t(mainData.lang).Language, nav: 'Language' },
        { svg: <AboutUsSvg />, title: t(mainData.lang).AboutUs, link: 'https://spydogvpn.com/about-us' },


    ])
    useEffect(() => {
        if (mainData.lang == 'en') {

            setData([
                { svg: <PremiumSvg />, title: t(mainData.lang).Premium, nav: 'Ad' },
                { svg: <LanguageSvg />, title: t(mainData.lang).Language, nav: 'Language' },
                { svg: <ShareSvg />, title: `${t(mainData.lang).share} VPN`, share: 's' },
                { svg: <AboutUsSvg />, title: t(mainData.lang).AboutUs, link: 'https://spydogvpn.com/about-us' },
            ])
        }
        else {
            setData([
                { svg: <PremiumSvg />, title: t(mainData.lang).Premium, nav: 'Ad' },
                { svg: <ShareSvg />, title: `${t(mainData.lang).share} VPN`, share: 's' },
                { svg: <LanguageSvg />, title: t(mainData.lang).Language, nav: 'Language' },
                { svg: <AboutUsSvg />, title: t(mainData.lang).AboutUs, link: 'https://spydogvpn.com/ru/o-nas' },
            ])
        }
    }, [mainData.lang])
    const dispatch = useDispatch()
    const getMyTarife = useSelector((st) => st.getMyTarife)
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: mainData.lang == 'ru' ? 'Нравится VPN Spy Dog? Поделитесь с друзьями' : "Like vpn spydog? Share with friends"

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const [openMenu, setOpenMenu] = useState()
    return <SafeAreaView >
        <Modal
            animationType="slide"
            visible={mainData.menu}
        >
            <SafeAreaView>
                <View style={{ backgroundColor: Colors(color).menu }}>
                    <View style={[styles.menu, { backgroundColor: Colors(color).blockBackground }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 18 }}>
                            <TouchableOpacity onPress={() => dispatch(OpenMenu(false))}>
                                {color === '#ECF3FB' ? <CloseLightSvg /> : <CloseSvg />}
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ width: 20, height: 20, marginHorizontal: 10 }} source={require('../../../assets/images/Dog.png')} />
                                <Text style={[Gstyles.text, { color: Colors(color).color }]}>SpyDog VPN</Text>
                            </View>
                        </View>
                        <View style={{ position: 'relative', height: '100%', paddingHorizontal: 25 }}>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={[{ fontSize: 20, fontFamily: 'Montserrat-SemiBold', color: Colors(color).color }]}>{t(mainData.lang).MainMenu}</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                {data.map((elm, i) => (
                                    <TouchableOpacity key={i} onPress={async () => {
                                        if (elm.nav) {
                                            navigation.navigate(elm.nav)
                                            dispatch(OpenMenu(false))
                                        }
                                        else if (elm.link) {
                                            dispatch(OpenMenu(false))
                                            await Linking.openURL(elm.link)

                                        }
                                        else if (elm.share) {
                                            dispatch(OpenMenu(false))
                                            onShare()
                                        }
                                    }} style={{ flexDirection: "row", alignItems: 'center', marginBottom: 20 }}>
                                        {elm.svg}
                                        <Text key={i} style={[Gstyles.text, { color: Colors(color).color, marginHorizontal: 15 }]}>{elm.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            {!getMyTarife.data?.tariff?.id && <View style={styles.goPremium}>
                                <GoPremium onPress={() => {
                                    navigation.navigate('Ad')
                                    dispatch(OpenMenu(false))
                                }} menu marginLeft={10} paddingHorizontal={5} />
                            </View>}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    menu: {
        height: '100%',
        width: '90%',
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
    },
    goPremium: {
        position: 'absolute',
        bottom: 110,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
    }
})