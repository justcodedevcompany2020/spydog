import {useState} from 'react'
import { useSelector } from "react-redux"
import { View } from "react-native"
import { Gstyles } from "../../../gStyles"
import { LanguageBlock } from '../../components/LanguageBlock'

export const Language = () =>{
    const mainData = useSelector((st)=>st.mainData)
    const [data,setData] = useState([
        {title:'English',checked:false},
        {title:'Russian',checked:true}
    ])
    const handelChange = (i) =>{
        let item = [...data]
        item.map((elm,i)=>{
            item[i].checked = false
        })
        item[i].checked = !item[i].checked
        setData(item)
    }
    return <View style = {Gstyles.main}>
        {data.map((elm,i)=>(
            <LanguageBlock onPress={()=>handelChange(i)} key={i} title={elm.title} checked = {elm.checked} color = {mainData.mood} />
        ))}
    </View>
}