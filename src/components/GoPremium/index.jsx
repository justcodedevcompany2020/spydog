import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { ArrowLightSvg, ArrowRight, LightRoyWhiteBg, RoyWhiteBg } from "../../../svg"
import { useSelector } from "react-redux"
import { Colors } from '../../ui/color'
import { Gstyles } from '../../../gStyles'
import { t } from '../../ui/lang';


export const GoPremium = ({ marginLeft = 0, disabled, paddingHorizontal = 10, menu = false, onPress = () => { }, text = 'Go premium' }) => {
    console.log('2222')
    const mainData = useSelector((st) => st.mainData)
    return <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.block, { paddingHorizontal: paddingHorizontal }, menu ? { backgroundColor: Colors(mainData.mood).premiumMenu } : { backgroundColor: Colors(mainData.mood).premium }]}>
        {mainData.mood !== '#101B36' ?
            <Image style={styles.img} source={require('../../../assets/images/g1.png')} /> :
            <Image style={styles.img} source={require('../../../assets/images/g2.png')} />
        }
        <View style={!menu && { marginLeft: -30 }}>
            <Text style={[Gstyles.text, { color: '#FFFFFF', fontSize: 14 }]}>{t(mainData.lang).Gopremium}</Text>
            <Text style={[Gstyles.smallText, { color: Colors(mainData.mood).itemColor, fontSize: 8 }]}>{t(mainData.lang).S3day}</Text>
        </View>
        <View style={{ marginRight: 10, marginLeft: marginLeft }}>
            {mainData.mood === '#101B36' ? <ArrowRight /> : <ArrowLightSvg />}
        </View>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderRadius: 9,
        marginVertical: 10,
    },
    img: {
        width: 40,
        height: 39,
        resizeMode: 'contain',
    },
})