import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Text, ActivityIndicator, Linking } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Gstyles } from "../../../gStyles"
import { Anonymous, Fast, Premium, RemoveAd, Secure, X } from "../../../svg"
import { Button } from "../../ui/Button"
import { Colors } from "../../ui/color"
import { useEffect, useState } from "react"
import { ActivateTarifs, GetMyTarife, GetTarifs } from "../../store/action/action"
import DeviceInfo from 'react-native-device-info';
import { ClearActivateTarifStatus } from "../../store/action/clear"
import { GooglePay } from 'react-native-google-pay';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { t } from '../../ui/lang';


const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
export const Ad = ({ navigation }) => {
    const dispatch = useDispatch()
    const mainData = useSelector(st => st.mainData);

    const getTarifs = useSelector((st) => st.getTarifs)
    const getMyTarife = useSelector((st) => st.getMyTarife)

    const activateTarif = useSelector((st) => st.activateTarif)
    const [deviceId, setDeviceId] = useState('');

    const data = [
        { name: t(mainData.lang).anonymous, text: t(mainData.lang).hideyouip, svg: <Anonymous /> },
        { name: t(mainData.lang).fast, text: t(mainData.lang).upto, svg: <Fast /> },
        { name: t(mainData.lang).removeads, text: t(mainData.lang).havefun, svg: <RemoveAd /> },
        { name: t(mainData.lang).secure, text: t(mainData.lang).Transfer2, svg: <Secure /> },
    ]
    const getdeviceId = async () => {
        var uniqueId = await DeviceInfo.getUniqueId();
        setDeviceId(uniqueId);
    };
    useEffect(() => {
        dispatch(GetTarifs())
        getdeviceId()
    }, [])

    useEffect(() => {
        if (activateTarif.status) {
            dispatch(ClearActivateTarifStatus())
            navigation.navigate('Main')
        }
    }, [activateTarif.status])

    useEffect(() => {
        if (deviceId) {
            dispatch(GetMyTarife(deviceId))
        }
    }, [deviceId])

    const DeleteStorage = async () => {
        await AsyncStorage.removeItem('id');
    }

    // i18n.init({
    //     compatibilityJSON: 'v3',
    //     lng: 'en',
    //     resources: {
    //         en: { translation: en },
    //         ru: { translation: ru },
    //     },
    // });

    const requestData = {
        cardPaymentMethod: {
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                // stripe (see Example):
                // gateway: 'stripe',
                gatewayMerchantId: '',
                stripe: {
                    publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
                    version: '2018-11-08',
                },
                // other:
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
            },
            allowedCardNetworks,
            allowedCardAuthMethods,
        },
        transaction: {
            totalPrice: '10',
            totalPriceStatus: 'FINAL',
            currencyCode: 'USD',
        },
        merchantName: 'Example Merchant',
    };


    // const Pay = async () => {
    //     GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    //     GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
    //         .then((ready) => {
    //             if (ready) {
    //                 // Request payment token
    //                 GooglePay.requestPayment(requestData)
    //                     .then((token) => {
    //                         // Send a token to your payment gateway
    //                     })
    //                     .catch((error) => console.log(error.code, error.message));
    //             }
    //         })

    // }


    if (activateTarif.loading) {
        return <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors(mainData.mood).blockBackground }}>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={Gstyles.main}>
                    <TouchableOpacity onPress={() => navigation.navigate('Main')} style={{ alignItems: 'flex-end', width: '100%', marginVertical: 10 }}>
                        <X />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ width: 155, height: 155 }} source={require('../../../assets/images/Dog.png')} />
                    </View>
                    <Text style={[styles.title, { color: Colors(mainData.mood).color }]}>SpyDog VPN</Text>
                    {data.map((elm, i) => {
                        return <View style={[styles.block, { borderColor: Colors(mainData.mood).borderColor }]} key={i}>
                            <View style={{ justifyContent: 'center', marginRight: 15 }}>
                                {elm.svg}
                            </View>
                            <View style={{ height: 37, justifyContent: 'space-between', }}>
                                <Text style={[styles.text, { color: Colors(mainData.mood).color, }]}>{elm.name}</Text>
                                <Text style={[[Gstyles.smallText, { fontSize: 10 }]]}>{elm.text}</Text>
                            </View>
                        </View>
                    })}
                    <Text style={[styles.info, { marginBottom: 15, paddingHorizontal: 2, width: '100%', color: Colors(mainData.mood).adText }]}>{t(mainData.lang).day3} {'\n'}{t(mainData.lang).cancelanytime} {'\n'}{t(mainData.lang).afterwards}</Text>
                    <Button onPress={() => navigation.navigate('Main')} arrow svg={
                        <Image style={styles.img} source={require('../../../assets/images/g1.png')} />}
                        backGround="#3DD5F3" title2={t(mainData.lang).tryforfree} />
                    {getTarifs?.data.map((elm, i) => {
                        if (getMyTarife.data?.tariff?.id !== elm.id) {
                            return <Button
                                onPress={() => {
                                    DeleteStorage()
                                    dispatch(ActivateTarifs({
                                        phone_code: deviceId,
                                        tariff_id: elm.id
                                    })
                                    )
                                }}
                                key={i}
                                title={`${elm.title}`}
                            />
                        }
                    })}

                    <TouchableOpacity onPress={() => navigation.navigate('Main')} style={[styles.button, { backgroundColor: Colors(mainData.mood).borderColor, }]}>
                        <Text style={[styles.info, { color: Colors(mainData.mood).color }]}>{t(mainData.lang).continuewithoutsubscription}</Text>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.info, { color: '#3DD5F3', borderBottomWidth: 1, borderBottomColor: '#3DD5F3', marginBottom: 5, marginTop: -7 }]}>{t(mainData.lang).restorepurchase}</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={[{ marginBottom: 10, fontFamily: 'Montserrat-SemiBold' }, styles.text2]}>{t(mainData.lang).Whysubscribe}?</Text>
                        <Text style={[{ fontFamily: 'Montserrat-Medium' }, styles.text2]}>Creating a VPN service involves purchasing numerous servers worldwide. By subscribing, you are helping our project buy more VPN servers. You can close this window and continue.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center', marginVertical: 5 }}>
                        <Text style={[styles.text2, { marginRight: 20 }]}
                            onPress={async () => {
                                await Linking.openURL(mainData.lang == 'en' ?
                                    'https://spydogvpn.com/privacy-policy' :
                                    'https://spydogvpn.com/ru/politika-konfidencialnosti'
                                );
                            }}
                        >{t(mainData.lang).PrivacyPolicy}</Text>
                        <Text style={styles.text2} onPress={async () => {
                            await Linking.openURL(mainData.lang == 'en' ?
                                'https://spydogvpn.com/terms-of-use' :
                                'https://spydogvpn.com/ru/ysloviya-ispolzovaniya'
                            );
                        }}>{t(mainData.lang).Termsofuse}</Text>

                    </View>
                    <Text style={[styles.text2, { textAlign: 'center' }]} onPress={async () => {
                        await Linking.openURL(mainData.lang == 'ru' ?
                            'https://spydogvpn.com/ru/o-nas' :
                            'https://spydogvpn.com/about-us'
                        );
                    }}>{t(mainData.lang).AboutUs}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        marginVertical: 20,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
    },
    block: {
        width: '100%',
        flexDirection: 'row',
        height: 47,
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        paddingRight: 20
    },
    info: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 16,
    },
    button: {
        borderRadius: 9,
        marginVertical: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    text2: {
        color: '#5F719F',
        fontSize: 12,
        lineHeight: 16,
    },
    img: {
        width: 40,
        height: 39,
        resizeMode: 'contain',
    },
})