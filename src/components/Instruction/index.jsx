import { useRef, useState } from "react"
import { StyleSheet,View,Image,Text, Dimensions} from "react-native"
import { Colors } from "../../ui/color"

const windowWidth = Dimensions.get('window').width;
export const Instruction = ({color,text1,text2,title,svg}) =>{
    return  <View style = {[styles.block]}>
        <View style = {{height:200,justifyContent:'flex-end'}}>
            {svg}
        </View>
        <Text style = {[styles.title,{color:Colors(color).color}]}>{title}</Text>
        <Text style = {[styles.text,{color:Colors(color).color}]}>{text1}{'\n'}{text2}</Text>
    </View>
}

const styles = StyleSheet.create({
    block:{
        justifyContent:'center',
        alignItems:'center',
        height:'95%',
        width:windowWidth,
    },
    title:{
        fontSize:20,
        fontFamily:"Montserrat-SemiBold",
        lineHeight: 24.38,
        textAlign:'center',
        marginVertical:10,
    },
    text:{
        fontSize:16,
        fontFamily:"Montserrat-Medium",
        lineHeight: 19.5,
        textAlign:'center',
    }
})