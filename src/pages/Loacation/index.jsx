import { useEffect, useState } from 'react'
import { ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { Gstyles } from "../../../gStyles"
import { LocationBlock } from "../../components/LocationBlock"
import img from '../../../assets/images/Vector.png'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Location = () => {
    const mainData = useSelector((st) => st.mainData)
    const getCountry = useSelector((st) => st.getCountry)
    const [freeCountri, setFreeCountr] = useState([])
    const [checked, setChecked] = useState(null)
    const getMyTarife = useSelector((st) => st.getMyTarife)

    const getFreeCountry = () => {
        let item = []
        getCountry.data.map((elm, i) => {
            if (elm.premium == 0) {
                item.push(i)
            }
        })
        setFreeCountr(item)
    }
    const getChecked = async () => {
        let id = await AsyncStorage.getItem('checked')
        if (id) {
            setChecked(id)
        }
        else {
            setChecked(-1)
        }
    }
    useEffect(() => {
        getChecked()
    }, [])


    useEffect(() => {
        getFreeCountry()
    }, [getCountry])


    const Checked = async (i) => {
        setChecked(i)
        if (i == -1) {
            const min = 1;
            const max = getCountry.data.length - 1;
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            if (Object.keys(getMyTarife.data).length) {
                await AsyncStorage.setItem('id', JSON.stringify(randomNum))
            }
            else {
                const max = freeCountri.length - 1;
                const randomNum = Math.floor(Math.random() * (max - 0 + 1));
                let id = freeCountri[randomNum]
                await AsyncStorage.setItem('id', JSON.stringify(id))

            }
            await AsyncStorage.setItem('checked', JSON.stringify(-1))
        }
        else {
            await AsyncStorage.setItem('id', JSON.stringify(i))
            await AsyncStorage.setItem('checked', JSON.stringify(i))

        }
    }
    return <ScrollView showsHorizontalScrollIndicator={false} style={Gstyles.main}>
        <LocationBlock
            img={img}
            onPress={() => Checked(-1)}
            title={'Auto'}
            text={''}
            checked={checked == -1}
            color={mainData.mood} />
        {getCountry?.data?.map((elm, i) => {
            return <LocationBlock
                premium={Object.keys(getMyTarife.data).length}
                img={elm.photo}
                onPress={() => Checked(i)}
                key={i}
                title={elm.name}
                text={elm.city}
                checked={checked == i}
                type={elm.premium}
                color={mainData.mood}
            />
        })}
    </ScrollView>
}
