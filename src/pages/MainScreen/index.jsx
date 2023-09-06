import { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Gstyles } from "../../../gStyles"
import { ArrowRight, DarkActiveSvgButton, DarkRefreshSvg, DarkSvgButton, DogAdSvg, DownloadSvg, LightActiveSvgButton, LightRefreshSvg, PingSvg, SvgButton, UploadSvg } from "../../../svg"
import { GoPremium } from '../../components/GoPremium'
import { Menu } from '../../components/Menu'
import { NetworkInfoCard } from '../../components/NetworkInfo'
import { Colors } from "../../ui/color"
import { GetCountry, GetMyTarife } from '../../store/action/action'
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import RNSimpleOpenvpn, { addVpnStateListener, removeVpnStateListener } from 'react-native-simple-openvpn';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NetworkInfo } from 'react-native-network-info';
import { VipUser } from '../../components/VipUser'
import { t } from '../../ui/lang';


const isIPhone = Platform.OS === 'ios';

export const Main = ({ navigation }) => {
    const dispatch = useDispatch()
    const mainData = useSelector((st) => st.mainData)
    const [deviceId, setDeviceId] = useState('');
    const [activeVpn, setActiveVpm] = useState('')
    const getCountry = useSelector((st) => st.getCountry)
    const [myIpAddress, setMyIpAddress] = useState('')
    const [downloadSpeed, setDownloadSpeed] = useState(null);
    const [uploadSpeed, setUploadSpeed] = useState(null);
    const [freeCountri, setFreeCountr] = useState([])

    const [pingTime, setPingTime] = useState(null);
    const [ipLoading, setIpLoading] = useState(false)
    const [id, setID] = useState('')
    const getdeviceId = async () => {
        var uniqueId = await DeviceInfo.getUniqueId();
        dispatch(GetMyTarife(uniqueId))
        setDeviceId(uniqueId);
    };
    const getMyTarife = useSelector((st) => st.getMyTarife)

    const [acitve, setActive] = useState(false)
    const fetchDownloadSpeed = async () => {
        const startTime = Date.now();
        const response = await fetch('https://file-examples.com/wp-content/storage/2018/04/file_example_AVI_480_750kB.avi'); // Replace with an actual file URL
        const endTime = Date.now();
        const downloadTime = endTime - startTime;
        const fileSizeInBytes = response.headers.get('content-length');
        const fileSizeInBits = 750 * 8;
        const downloadSpeedMbps = (fileSizeInBits / downloadTime).toFixed(1) * 1024; // Convert to Mbps
        setDownloadSpeed(downloadSpeedMbps)
    };
    const fetchUploadSpeed = async () => {
        const uploadUrl = 'https://javascript.plainenglish.io/different-ways-to-upload-a-file-to-the-server-810cc82eb8e4';
        const dataSizeMB = 1; // Size of data to upload in megabytes
        const data = new Uint8Array(dataSizeMB * 1024 * 1024); // Convert megabytes to bytes

        const startTime = Date.now();

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: data.buffer,
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            });

            const endTime = Date.now();
            const uploadTime = endTime - startTime; // in milliseconds
            const uploadSpeedMbps = (dataSizeMB * 8) / (uploadTime / 100000); // Convert to Mbps

            setUploadSpeed(uploadSpeedMbps.toFixed(2));
        } catch (error) {
            console.error('Error measuring upload speed:', error);
        }
    }

    const fetchPingTime = async () => {
        const startTime = Date.now();
        try {
            await fetch('https://www.google.com', { method: 'HEAD' });
            const endTime = Date.now();
            const timeTaken = endTime - startTime;
            setPingTime(timeTaken);
        } catch (error) {
            console.error('Error fetching ping:', error);
        }
    };

    const getId = async () => {
        const id = await AsyncStorage.getItem('id')
        getActiveVpn(id)
        setID(id)
    }

    const getActiveVpn = async (id) => {
        let vpn = {}
        if (id) {
            vpn = getCountry.data[id]
        }
        else {
            const min = 0;
            const max = getCountry.data.length - 1;
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!Object.keys(getMyTarife.data).length) {
                let free = []
                getCountry.data.map((elm, i) => {
                    if (elm.premium == 0) {
                        free.push(i)
                    }
                })
                const max = free.length - 1
                const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                const id = free[randomNum]
                vpn = getCountry.data[id]
            }
            else {
                vpn = getCountry.data[randomNum]
            }
        }
        setActiveVpm(vpn)
    }
    useEffect(() => {
        // getActiveVpn(id)
        getId()
    }, [id, getMyTarife])


    const GetMyIpAddress = () => {
        setIpLoading(true)
        NetworkInfo.getIPV4Address().then(ipAddress => {
            setIpLoading(false)
            setMyIpAddress(ipAddress)
        });

    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            getId()
            getdeviceId()
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        GetMyIpAddress()
        fetchDownloadSpeed()
        fetchUploadSpeed()
        fetchPingTime()
        stopOvpn()
    }, [])



    useEffect(() => {
        const interval = setInterval(() => {
            fetchDownloadSpeed()
            fetchUploadSpeed()
            fetchPingTime()
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (deviceId) {
            dispatch(GetCountry(deviceId))
        }
    }, [deviceId])




    useEffect(() => {
        getActiveVpn()
    }, [getCountry])




    useEffect(() => {
        async function observeVpn() {
            if (isIPhone) {
                await RNSimpleOpenvpn.observeState();
            }

            addVpnStateListener((e) => {
            });
        }

        observeVpn();

        return async () => {
            if (isIPhone) {
                await RNSimpleOpenvpn.stopObserveState();
            }
            removeVpnStateListener();
        };
    });



    async function startOvpn() {
        try {
            await RNSimpleOpenvpn.connect({
                remoteAddress: '',
                ovpnFileName: '',
                assetsPath: '',
                notificationTitle: 'RNSimpleOpenVPN',
                compatMode: RNSimpleOpenvpn.CompatMode?.OVPN_TWO_THREE_PEER,
                providerBundleIdentifier: 'com.your.network.extension.bundle.id',
                localizedDescription: 'RNSimpleOvpn',
                ovpnString: activeVpn?.code
            });
            GetMyIpAddress()
            setActive(true)
        }
        catch (error) {
            stopOvpn()
            // ...
        }
    }

    async function stopOvpn() {
        setActive(false)
        try {
            await RNSimpleOpenvpn.disconnect();
        } catch (error) {
            console.log(error)
        }
    }

    return <ScrollView showsVerticalScrollIndicator={false} style={[Gstyles.main, { marginBottom: 0 }]}>
        {!getMyTarife.data?.tariff?.id ?
            <View style={[styles.block, { backgroundColor: Colors(mainData.mood).blockBackground }]}></View> :
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <DogAdSvg />
            </View>
        }
        {!acitve ?
            <TouchableOpacity style={styles.button} onPress={() => {
                setActive(true)
                startOvpn()
            }}
            >
                {mainData.mood === '#ECF3FB' ? <SvgButton /> : <DarkSvgButton />}
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => {
                stopOvpn()
            }} style={styles.button}>
                {mainData.mood === '#ECF3FB' ? <LightActiveSvgButton /> : <DarkActiveSvgButton />}
            </TouchableOpacity>
        }
        {!acitve ?
            <Text style={[Gstyles.text, { color: '#5F719F', textAlign: 'center' }]}>{t(mainData.lang).Disconect}</Text> :
            <Text style={[Gstyles.text, { color: Colors(mainData.mood).color, textAlign: 'center' }]}>{t(mainData.lang).Connected}</Text>
        }
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 5 }}>
            <NetworkInfoCard icon={<DownloadSvg />} color={mainData.mood} text={downloadSpeed + ' KB/s'} type={'Download'} />
            <NetworkInfoCard icon={<UploadSvg />} color={mainData.mood} text={uploadSpeed + 'KB/s'} type={'Upload'} />
            <NetworkInfoCard icon={<PingSvg />} color={mainData.mood} text={pingTime + 'MS'} type={'Ping'} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Location')} style={[styles.lang, { backgroundColor: Colors(mainData.mood).blockBackground }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <Image style={{ width: 25, height: 25, borderRadius: 25 }}
                    source={{ uri: `https://spydog.justcode.am/uploads/${activeVpn?.photo}` }} />
                <Text style={[Gstyles.smallText, { fontSize: 14, color: Colors(mainData.mood).color }]}>{activeVpn?.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[Gstyles.smallText, { marginHorizontal: 10, marginBottom: 2 }]}>change</Text>
                <View style={{ marginRight: 10 }}>
                    <ArrowRight />
                </View>
            </View>
        </TouchableOpacity>
        <View style={[styles.lang, { backgroundColor: Colors(mainData.mood).blockBackground, paddingVertical: 16, marginBottom: 10 }]}>
            {ipLoading ?
                <ActivityIndicator size="small" color="#0000ff" /> :
                <Text style={[Gstyles.smallText, { fontSize: 14, color: Colors(mainData.mood).color }]}>Your IP: {myIpAddress}</Text>
            }
            <TouchableOpacity onPress={() => GetMyIpAddress()}>
                {mainData.mood === '#ECF3FB' ? <LightRefreshSvg /> : <DarkRefreshSvg />}
            </TouchableOpacity>
        </View>
        {!getMyTarife.data?.tariff?.id ?
            <GoPremium onPress={() => navigation.navigate('Ad')} /> :
            <VipUser />
        }

        <Menu navigation={navigation} color={mainData.mood} />
    </ScrollView>
}

const styles = StyleSheet.create({
    block: {
        height: 240,
        borderRadius: 16,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    lang: {
        padding: 13,
        borderRadius: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5
    }
})