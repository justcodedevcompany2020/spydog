import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { StyleSheet,TouchableOpacity,View,Image,Text, Modal, SafeAreaView} from "react-native"
import { Colors } from "../../ui/color"
import { CloseLightSvg, CloseSvg, ContactUsSvg, LanguageSvg, PremiumSvg, SetUpAProxy, ShareSvg } from '../../../svg'
import { Gstyles } from '../../../gStyles'
import { GoPremium } from '../GoPremium'
import { OpenMenu } from '../../store/action/action'

export const Menu = ({color,navigation}) =>{
    const mainData = useSelector((st)=>st.mainData)
    const [data,setData] = useState([
        // {svg:<SetUpAProxy />,title:'Set up a proxy',nav:'SetUpAproxy'},
        // {svg:<ContactUsSvg />,title:'Contact Us',nav:''},
        {svg:<PremiumSvg />,title:'Premium features',nav:'Ad'},
        // {svg:<ShareSvg />,title:'Share VPN',nav:''},
        {svg:<LanguageSvg />,title:'Language',nav:'Language'},

    ])
    const dispatch = useDispatch()
    const getMyTarife = useSelector((st)=>st.getMyTarife)

    const [openMenu,setOpenMenu] = useState()
    return <SafeAreaView >
        <Modal 
            animationType="slide"
            visible={mainData.menu}
            >
            <SafeAreaView>
            <View style = {{backgroundColor:Colors(color).menu}}>
                <View style = {[styles.menu,{backgroundColor:Colors(color).blockBackground}]}>
                    <View style = {{flexDirection:'row',alignItems:'center',paddingHorizontal:16,paddingTop:18}}>
                        <TouchableOpacity onPress={()=>dispatch(OpenMenu(false))}>
                        {color === '#ECF3FB' ?<CloseLightSvg />: <CloseSvg />}
                        </TouchableOpacity>
                        <View style = {{flexDirection:'row',alignItems:'center'}}>
                            <Image style = {{width:20,height:20,marginHorizontal:10}} source={require('../../../assets/images/Dog.png')} />
                            <Text style = {[Gstyles.text,{color:Colors(color).color}]}>SpyDog VPN</Text>
                        </View>
                    </View>
                    <View style = {{position:'relative',height:'100%',paddingHorizontal:25}}>
                    <View style = {{marginVertical:20}}>
                        <Text style = {[{fontSize:20,fontFamily:'Montserrat-SemiBold',color:Colors(color).color}]}>Main Menu</Text>
                    </View>
                    <View style = {{marginTop:10}}>
                        {data.map((elm,i)=>(
                            <TouchableOpacity key={i} onPress={()=>{
                                if(elm.nav){
                                    navigation.navigate(elm.nav)
                                    dispatch(OpenMenu(false))
                                }
                            }} style = {{flexDirection:"row",alignItems:'center',marginBottom:20}}>
                                {elm.svg}
                                <Text key={i} style ={[Gstyles.text,{color:Colors(color).color,marginHorizontal:15}]}>{elm.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {!getMyTarife.data?.tariff?.id && <View style = {styles.goPremium}>
                        <GoPremium onPress={()=>{
                            navigation.navigate('Ad')
                            dispatch(OpenMenu(false))
                        }} menu marginLeft = {10} paddingHorizontal ={5} />
                    </View>}
                </View>
                </View>
            </View>
            </SafeAreaView>
        </Modal>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    menu:{
        height:'100%',
        width:'90%',
        borderTopEndRadius:30,
        borderBottomEndRadius:30,
    },
    goPremium:{
        position:'absolute',
        bottom:110,
        justifyContent:'center',
        alignItems:'center',
        left: 0,
        right: 0,
    }
})