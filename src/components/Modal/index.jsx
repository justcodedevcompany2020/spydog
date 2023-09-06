import { Modal, SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Linking, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Colors } from '../../ui/color'
import { Gstyles } from '../../../gStyles';
// import { openURL } from 'react-native-linking';

export const MainModal = ({ visible, color, onPress }) => {
    // const openTelegram = () => {
    //     const telegramUrl = 'https://t.me/YourTelegramUsername'; // Replace with the actual Telegram username or the URL you want to open
    //     openURL(telegramUrl)
    //         .then((supported) => {
    //             if (!supported) {
    //                 Alert.alert('Telegram is not installed on your device.');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };
    const mainData = useSelector(st => st.mainData);
    return <SafeAreaView >
        <Modal
            animationType="slide"
            visible={visible}
            transparent
        >
            <TouchableOpacity onPress={onPress} style={styles.block}>
                <View style={styles.menu}>
                    <TouchableOpacity
                        onPress={async () => {
                            await Linking.openURL('https://wa.me/qr/ICIYC6QHVBXXG1')
                        }}
                        style={[styles.button, { backgroundColor: Colors(mainData.mood).blockBackground, flexDirection: 'row', alignItems: 'center' }]}>
                        <View>
                            <Image style={{ width: 30, height: 30 }} source={require('../../../assets/images/5.png')} />
                        </View>
                        <Text style={[Gstyles.smallText, { fontSize: 16, color: Colors(mainData.mood).color, marginLeft: 20 }]}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            await Linking.openURL('https://t.me/+nuZJERo2LllkZjYy')
                        }}
                        style={[styles.button, { backgroundColor: Colors(mainData.mood).blockBackground, flexDirection: 'row', alignItems: 'center' }]}>
                        <View>
                            <Image style={{ width: 30, height: 30 }} source={require('../../../assets/images/6.png')} />
                        </View>
                        <Text style={[Gstyles.smallText, { fontSize: 16, color: Colors(mainData.mood).color, marginLeft: 20 }]}>Telegram</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    </SafeAreaView>
}
const styles = StyleSheet.create({
    menu: {
        // height: ,
        width: '80%',
        borderRadius: 30,
        backgroundColor: "white",
        padding: 10,
    },

    block: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    button: {
        margin: 10,
        padding: 20,
        borderRadius: 20
    }
})