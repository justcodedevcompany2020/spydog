import {View,StyleSheet,Text} from 'react-native'
import {  } from 'react-native-svg'
import { Gstyles } from '../../../gStyles'
import { Colors } from '../../ui/color'
export const NetworkInfoCard = ({icon,text,type,color}) =>{
    return <View style = {[styles.block,{backgroundColor:Colors(color).blockBackground}]}>
        <Text style = {[Gstyles.text,{fontSize:12,color:Colors(color).color}]}>{text}</Text>
        <View style = {{flexDirection:'row',alignItems:'center'}}>
            {icon}
            <Text style = {styles.text1}>{type}</Text>
        </View>
    </View>
}
const styles = StyleSheet.create({
    block:{
        paddingVertical:10,
        borderRadius:7,
        width:'30%',
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:10,
        fontFamily:"Montserrat-SemiBold",
        lineHeight: 16,
        marginHorizontal:5,
        color:'#5F719F',
    },
    text1:{
        fontSize:10,
        fontFamily:"Montserrat-Regular",
        lineHeight: 16,
        marginHorizontal:5,
        color:'#5F719F',
    },
    
})