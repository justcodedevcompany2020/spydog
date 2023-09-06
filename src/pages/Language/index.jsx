import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { View } from "react-native"
import { Gstyles } from "../../../gStyles"
import { LanguageBlock } from '../../components/LanguageBlock'
import { ChnageLanguage } from '../../store/action/action'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Language = () => {
    const mainData = useSelector((st) => st.mainData)
    const [data, setData] = useState([
        { title: 'English', checked: true },
        { title: 'Russian', checked: false }
    ])
    const dispatch = useDispatch()
    const handelChange = async (i) => {
        if (i == 0) {
            dispatch(ChnageLanguage('en'))
            await AsyncStorage.setItem('l', 'en')
        }
        else {
            dispatch(ChnageLanguage('ru'))
            await AsyncStorage.setItem('l', 'ru')
        }
        let item = [...data]
        item.map((elm, i) => {
            item[i].checked = false
        })
        item[i].checked = !item[i].checked
        setData(item)
    }

    useEffect(() => {
        if (mainData.lang == 'ru') {
            setData([
                { title: 'English', checked: false },
                { title: 'Russian', checked: true }
            ])
        }
        else {
            setData([
                { title: 'English', checked: true },
                { title: 'Russian', checked: false }
            ])
        }
    }, [mainData.lang])

    return <View style={Gstyles.main}>
        {data.map((elm, i) => (
            <LanguageBlock onPress={() => handelChange(i)} key={i} title={elm.title} checked={elm.checked} color={mainData.mood} />
        ))}
    </View>
}