import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"
import { Colors } from "../../ui/color"
import { Gstyles } from "../../../gStyles"

export const VipUser = ({ marginLeft = 0, disabled, paddingHorizontal = 10, menu = false, onPress = () => { }, text = 'Go premium' }) => {
    const mainData = useSelector((st) => st.mainData)
    return <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.block, { paddingHorizontal: paddingHorizontal }, menu ? { backgroundColor: Colors(mainData.mood).premiumMenu } : { backgroundColor: Colors(mainData.mood).premium }]}>
        {mainData.mood !== '#101B36' ?
            <Image style={styles.img} source={require('../../../assets/images/g1.png')} /> :
            <Image style={styles.img} source={require('../../../assets/images/g2.png')} />
        }
        <View style={!menu && { marginLeft: -30 }}>
            <Text style={[Gstyles.text, { color: '#FFFFFF', fontSize: 14, marginLeft: 40 }]}>You have vip</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        alignItems: 'center',
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