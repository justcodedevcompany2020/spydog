import { StyleSheet, TextInput, View } from "react-native"
import { useSelector } from "react-redux"
import { Colors } from "./color"

export const Input = ({value,placeholder,editable}) =>{
    const mainData = useSelector((st)=>st.mainData)

    return <TextInput 
        placeholder={placeholder} 
        value = {value} 
        editable = {editable} 
        placeholderTextColor={Colors(mainData.mood).color} 
        style = {[style.input,{backgroundColor:Colors(mainData.mood).blockBackground,color:Colors(mainData.mood).color}]}
    />

}

const style = StyleSheet.create({
    input:{
        borderRadius:9,
        paddingHorizontal:15,
        paddingVertical:10,
        marginBottom:10,
        minWidth:'48%'
    }
})