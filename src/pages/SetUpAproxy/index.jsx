import {useState} from 'react'
import { StyleSheet,TouchableOpacity,View,Image,Text} from "react-native"
import { useSelector } from 'react-redux'
import { Gstyles } from "../../../gStyles"
import { Button } from '../../ui/Button'
import { Colors } from '../../ui/color'
import { Input } from "../../ui/input"
export const SetUpAproxy = () =>{
    const mainData = useSelector((st)=>st.mainData)

    const [data,setData] = useState([
        {value:'81.200.157.149',disable:true,placeholder:''},
        {value:'17100',disable:true,placeholder:''},
        {value:'',disable:false,placeholder:'Login'},
        {value:'',disable:false,placeholder:'Password'},
    ])
    return <View style = {[Gstyles.main,{marginTop:10}]}>
        <Text style = {[Gstyles.smallText,{fontSize:14,marginBottom:15}]}>Use a proxy to bypass your provider's restrictions. Learn more</Text>
        <Input value={'81.200.157.149'}  editable = {false}/>
        <Input value={'17100'} editable = {false}/>
        <View style = {{flexDirection:'row',justifyContent:"space-between"}}>
            <Input placeholder={'Login'} editable = {true}/>
            <Input placeholder={'Password'} editable = {true}/>
        </View>
        <View style = {{flexDirection:'row',justifyContent:"space-between",marginVertical:20}}>
            <Text style = {[Gstyles.smallText,{fontSize:14,color:Colors(mainData.mood).color}]}>Status</Text>
            <Text style = {[Gstyles.smallText,{fontSize:14,color:Colors(mainData.mood).color}]}>Disconnected</Text>
        </View>
        <Button title={'Update proxy'}  backGround/>
    </View>
}

const styles = StyleSheet.create({
    block:{

    }
})