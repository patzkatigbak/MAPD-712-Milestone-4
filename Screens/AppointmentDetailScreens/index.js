import { StyleSheet, Text, View, ImageBackground, Image, TextInput } from 'react-native';
import { SpliteLine } from '../../Components/SpliteLine/index.js'

export const AppointmentDetail = ({ route }) => {
    const { patientName, address, appointmentTime, phoneNumber, emailAddress, patientSymptom, imageUri } = route.params.appointment
    return (
        <View style={styles.view_Container}>
            <View style={styles.view_Container}>
                {/* <ImageBackground source={require('../../assets/background.jpg')} resizeMode="cover" style={{ flex: 1 }}> */}
                <View style={styles.view_AppointmentInfo_Container}>
                    <View style={styles.view_appointmentIdAndNameInfo}>
                        <View>
                            <Image source={{ uri: imageUri }} style={{ height: 55, width: 55, borderRadius: 100 }} />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{patientName}</Text>
                        </View>
                    </View>
                    <SpliteLine />
                    <View style={styles.view_appointmentRestInfo}>
                        <Text style={styles.text_appointmentInfoTitle}>address</Text>
                        <Text style={styles.text_appointmentInfo}>{address}</Text>
                        <SpliteLine />
                        <Text style={styles.text_appointmentInfoTitle}>Appointment Time</Text>
                        <Text style={styles.text_appointmentInfo}>{appointmentTime}</Text>
                        <SpliteLine />
                        <Text style={styles.text_appointmentInfoTitle}>Phone Number</Text>
                        <Text style={styles.text_appointmentInfo}>{phoneNumber}</Text>
                        <SpliteLine />
                        <Text style={styles.text_appointmentInfoTitle}>Email Address</Text>
                        <Text style={styles.text_appointmentInfo}>{emailAddress}</Text>
                        <SpliteLine />
                        <Text style={styles.text_appointmentInfoTitle}>Patient Symptom</Text>
                        <Text style={styles.text_appointmentInfo}>{patientSymptom}</Text>
                        <SpliteLine />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view_Container: {
        flex: 1,
    },
    view_AppointmentInfo_Container:{
        width:'90%',
        height:'80%',
        backgroundColor:'#FFFFFF',
        borderRadius:20,
        marginLeft:'5%',
        marginTop:20
    },
    view_appointmentIdAndNameInfo:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    text_appointmentInfoTitle:{
        marginLeft:7,
        fontSize:14,
        opacity:0.5
    },
    text_appointmentInfo:{
        marginTop:5,
        marginLeft:7,
        color:'#4C4646',
        fontSize:16,
    },
    view_appointmentRestInfo:{
        flexDirection:'column',
        justifyContent:'space-evenly',
    },
    view_TextInput:{
        marginLeft:'7%',
        
    }
})