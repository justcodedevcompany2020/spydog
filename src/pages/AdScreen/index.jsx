import { StyleSheet,ScrollView,View,Image,TouchableOpacity,Text, ActivityIndicator} from "react-native"
import {  useDispatch, useSelector } from "react-redux"
import { Gstyles } from "../../../gStyles"
import { Anonymous, Fast, Premium, RemoveAd, Secure, X } from "../../../svg"
import { Button } from "../../ui/Button"
import { Colors } from "../../ui/color"
import { useEffect, useState } from "react"
import { ActivateTarifs, GetMyTarife, GetTarifs } from "../../store/action/action"
import DeviceInfo from 'react-native-device-info';
import { ClearActivateTarifStatus } from "../../store/action/clear"
import { GooglePay } from 'react-native-google-pay';

const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
export const Ad = ({navigation}) =>{
    const dispatch = useDispatch()
    const getTarifs = useSelector((st)=>st.getTarifs)
    const getMyTarife = useSelector((st)=>st.getMyTarife)

    const activateTarif  = useSelector((st)=>st.activateTarif)
    const [deviceId, setDeviceId] = useState('');

    const data = [
        {name:'Anonymous',text:'Hide your IP. Anonymous surfing',svg:<Anonymous />},
        {name:'Fast',text:'Up to 1000Mb/s bandwidth to explore',svg:<Fast />},
        {name:'Remove Ads',text:'Have fun surfing without annoying ads',svg:<RemoveAd />},
        {name:'Secure',text:'Transfer traffic via encrypted tunnel',svg:<Secure />},
    ]
    const getdeviceId = async() => {
        var uniqueId = await DeviceInfo.getUniqueId();
        setDeviceId(uniqueId);
    };
  useEffect(()=>{
    dispatch(GetTarifs())
    getdeviceId()
  },[])

  useEffect(()=>{
    if(activateTarif.status){
        dispatch(ClearActivateTarifStatus())
        navigation.navigate('Main')
    }
  },[activateTarif.status])

  useEffect(()=>{
    if(deviceId){
        dispatch(GetMyTarife(deviceId))
    }
  },[deviceId])
    const mainData = useSelector((st)=>st.mainData)


    const requestData = {
        cardPaymentMethod: {
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            // stripe (see Example):
            // gateway: 'stripe',
            gatewayMerchantId: '',
            stripe: {
              publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
              version: '2018-11-08',
            },
            // other:
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
          allowedCardNetworks,
          allowedCardAuthMethods,
        },
        transaction: {
          totalPrice: '10',
          totalPriceStatus: 'FINAL',
          currencyCode: 'USD',
        },
        merchantName: 'Example Merchant',
      };
      

    const Pay = async() =>{
        GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
        GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
  .then((ready) => {
    if (ready) {
      // Request payment token
      GooglePay.requestPayment(requestData)
        .then((token) => {
            console.log(token)
          // Send a token to your payment gateway
        })
        .catch((error) => console.log(error.code, error.message));
    }
  })

    }


    if(activateTarif.loading){
        return <View style = {{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" />
        </View>
    }
    return ( 
        <View style = {{flex:1,backgroundColor:Colors(mainData.mood).blockBackground}}>
        <ScrollView style = {{width:'100%'}} showsVerticalScrollIndicator = {false}>
            <View style = {Gstyles.main}>
                <TouchableOpacity onPress={()=>navigation.navigate('Main')} style = {{alignItems:'flex-end',width:'100%',marginVertical:10}}>
                    <X/>
                </TouchableOpacity>
                <View style = {{alignItems:'center'}}>
                    <Image style = {{width:155,height:155}} source={require('../../../assets/images/Dog.png')} />
                </View>
                <Text style = {[styles.title,{color:Colors(mainData.mood).color}]}>SpyDog VPN</Text>
                    {data.map((elm,i)=>{
                        return <View style = {[styles.block,{ borderColor:Colors(mainData.mood).borderColor}]} key={i}>
                            <View style = {{justifyContent:'center',marginRight:15}}>
                            {elm.svg}
                            </View>
                            <View style = {{height:37,justifyContent:'space-between'}}>
                                <Text style = {[styles.text,{color:Colors(mainData.mood).color}]}>{elm.name}</Text>
                                <Text style = {Gstyles.smallText}>{elm.text}</Text>
                            </View>
                        </View>
                    })}
                <Text style = {[styles.info,{marginBottom:15,paddingHorizontal:2,width:'100%',color:Colors(mainData.mood).adText}]}>3-day free trial. No payment required.{'\n'}Cancel anytime.{'\n'}Afterwards, 599 RUB / month</Text>
                <Button onPress={()=>navigation.navigate('Main')} arrow svg={
                    <Image style = {styles.img} source={require('../../../assets/images/g1.png')} />}  
                    backGround="#3DD5F3" title2={'Try for free'} />
                {getTarifs?.data.map((elm,i)=>{
                    if(getMyTarife.data?.tariff?.id !== elm.id){
                        return <Button 
                            onPress={()=>dispatch(ActivateTarifs({
                                phone_code:deviceId,
                                tariff_id:elm.id
                            }))}
                            key={i} 
                            title={`${elm.title}`} 
                        />
                    }
                })}
                
                <TouchableOpacity onPress = {()=>navigation.navigate('Main')} style = {[styles.button,{backgroundColor:Colors(mainData.mood).borderColor,}]}>
                    <Text style = {[styles.info,{color:Colors(mainData.mood).color}]}>Continue without subscription</Text>
                </TouchableOpacity>
                <View style = {{alignItems:'center'}}>
                    <Text style = {[styles.info,{color:'#3DD5F3',borderBottomWidth:1,borderBottomColor:'#3DD5F3',marginBottom:5,marginTop:-7}]}>Restore purchase</Text>
                </View>
                <View style = {{marginVertical:10}}> 
                    <Text onPress={()=>Pay()} style = {[{marginBottom:10,fontFamily:'Montserrat-SemiBold'},styles.text2]}>Why subscribe?</Text>
                    <Text style = {[{fontFamily:'Montserrat-Medium'},styles.text2]}>Creating a VPN service involves purchasing numerous servers worldwide. By subscribing, you are helping our project buy more VPN servers. You can close this window and continue.</Text>
                </View>
                <View style = {{flexDirection:'row',alignItems:"center",justifyContent:'center',marginVertical:5}}>
                    <Text style = {[styles.text2,{marginRight:20}]}>Privacy policy</Text>
                    <Text style = {styles.text2}>Terms of use</Text>
                </View>
            </View>
        </ScrollView>
        </View>
)}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontFamily:'Montserrat-SemiBold',
        textAlign:'center',
        marginVertical:20,
    },
    text:{
        fontSize:14,
        fontFamily:'Montserrat-SemiBold',
    },
    block:{
        width:'100%',
        flexDirection:'row',
        height:47,
        marginBottom:15,
        paddingBottom:10,
        borderBottomWidth:1,
    },
    info:{
        fontSize:14,
        fontFamily:'Montserrat-Medium',
        lineHeight:16,
    },
    button:{
        borderRadius:9,
        marginVertical:20,
        paddingHorizontal:20,
        paddingVertical:15,
        borderRadius:9,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
    },
    text2:{
        color:'#5F719F',
        fontSize:14,
        lineHeight:16,
    },
    img:{
        width:40,
        height:39,
        resizeMode:'contain',
    },
})