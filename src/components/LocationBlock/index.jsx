import { StyleSheet,TouchableOpacity,View,Image,Text} from "react-native"
import { Gstyles } from "../../../gStyles"
import {  CheckedSvg, NotChecked, PingDark, PinkLight } from "../../../svg"
import { Colors } from "../../ui/color"

export const LocationBlock = ({title,text,checked,color,onPress,img}) =>{
    return <TouchableOpacity onPress={onPress} style = {[styles.block,{backgroundColor:Colors(color).blockBackground}]}>
        <View style = {{flexDirection:'row'}}>
            {title !== 'Auto'?<Image 
                style = {{width:40,height:40}} 
                source={{uri:`https://spydog.justcode.am/uploads/${img}`}}
            />:
            <Image 
                style = {{width:40,height:40}} 
                source={img}
            />
            }
            <View style ={{marginHorizontal:10,alignItems:'center',justifyContent:'center'}}>
                <Text style = {[Gstyles.text,{color:Colors(color).color,fontSize:14}]}>{title}</Text>
                {text && <Text style = {[Gstyles.text2,{marginTop:3}]}>{text}</Text>}
            </View>
        </View>
        <View style = {{flexDirection:'row',alignItems:'center'}}>
            {/* <View style = {{marginHorizontal:10}}>
                {color === '#ECF3FB' ?<PinkLight />:<PingDark />}
            </View> */}
            {checked ?
                <CheckedSvg mood = {color} />:
                <NotChecked mood = {color}/>
            }
        </View>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    block:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:9,
        alignItems:'center',
        marginBottom:10,
    }
})