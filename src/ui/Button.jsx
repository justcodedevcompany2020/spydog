import {TouchableOpacity,StyleSheet,Text,View} from 'react-native'
import {  } from 'react-native-svg'
import { useSelector } from 'react-redux'
import { Arrow } from '../../svg'
import { Colors } from './color'
import {Gstyles} from '../../gStyles'
export const Button = ({svg,title,title2,arrow,backGround,onPress = ()=>{},title3}) =>{
    const mainData = useSelector((st)=>st.mainData)
    return <TouchableOpacity onPress = {onPress} style = {[
        styles.button,backGround && {backgroundColor:'#3DD5F3'},
        !title2 && {justifyContent:'center'},
         title2 && !title3 ? {  paddingVertical:8}:{  paddingVertical:15},
         !title2 && title3 && {  paddingVertical:7}
        ]}>
        {title2 && <View style = {{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <View style = {{marginRight:10}}>{svg}</View>
            <Text style = {[styles.text,backGround ?{color:'#FFFFFF'}:{color:Colors(mainData.mood).color,}]}>{title2}</Text>
        </View>}
        {title3 && <View style = {{flexDirection:'column',alignItems:'center'}}>
            <Text style = {[styles.text,backGround ?{color:'#FFFFFF'}:{color:Colors(mainData.mood).color,}]}>{title}</Text>
            <Text style = {[Gstyles.smallText,{marginTop:3},backGround ?{color:'#FFFFFF'}:{color:Colors(mainData.mood).color,}]}>{title3}</Text>
        </View>}
        {!title3 &&<Text style = {[styles.text,backGround ?{color:'#FFFFFF'}:{color:Colors(mainData.mood).color,}]}>{title}</Text>}
        {arrow &&
            <View style = {{position:"absolute",right:25}}>
                <Arrow />
            </View>
        }
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
      
        borderWidth:1,
        borderColor:'#3DD5F3',
        width:'100%',
        borderRadius:9,
        marginVertical:5,
    },
    text:{
        color:Colors().color,
        fontSize:15,
        textAlign:'center',
        fontFamily:'Montserrat-SemiBold',
    }
})