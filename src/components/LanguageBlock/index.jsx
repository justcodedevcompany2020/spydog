import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native"
import { Gstyles } from "../../../gStyles"
import { CheckedSvg, NotChecked } from "../../../svg"
import { Colors } from "../../ui/color"
import { useSelector } from "react-redux"

export const LanguageBlock = ({ title, checked, color, onPress }) => {
    const maindata = useSelector((st => st.mainData))
    return <TouchableOpacity onPress={onPress} style={[styles.block, { backgroundColor: Colors(color).blockBackground }]}>
        <View style={{ flexDirection: 'row' }}>
            {title === 'English' ?
                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/Englis.png')} /> :
                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/russia.png')} />
            }
            <View style={{ marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[Gstyles.text, { color: Colors(color).color, fontSize: 14 }]}>{title}</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {checked ?
                <CheckedSvg mood={color} /> :
                <NotChecked mood={color} />
            }
        </View>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 9,
        alignItems: 'center',
        marginBottom: 10,
    }
})