import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AppointmentDetail} from '../../Screens/AppointmentDetailScreens/index.js'

export const AppointmentInfoCard = (props) => {
    const navigation = useNavigation();
    const [appointment, setAppointment] = React.useState({})
    const { patientName, appointmentTime, phoneNumber, emailAddress, patientSymptom, imageUri } = props.appointment

    React.useEffect(() => {
        setAppointment(props.appointment)
    }, [])

    const navigateToAppointmentDetailPage = () => {
        navigation.navigate('AppointmentDetail',{appointment:props.appointment})
    }

    return (
        <View style={styles.view_container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image  source={{ uri: imageUri }} style={{ height: 55, width: 55, borderRadius: 100 }} />
                    <View>
                        <Text style={{ fontSize: 17, marginLeft: 10, fontWeight: 'bold' }}>{patientName}</Text>
                        <Text style={styles.text_style}>{appointmentTime}</Text>
                        <Text style={styles.text_style}>Mobile:{phoneNumber}</Text>
                        <Text style={styles.text_style}>Email Address:{emailAddress}</Text>
                        <TouchableOpacity style={styles.touchableOpacity_viewDetail} onPress={navigateToAppointmentDetailPage}>
                            <Text style={{ fontSize: 12, marginTop: 5, fontWeight: 'bold', color:'#FFFFFF' }}>View Detail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view_container: {
        backgroundColor: '#EBEBEB',
        padding: 10,
        borderRadius: 20,
        flexDirection: 'column',
        marginTop:10
    },
    view_patientAvatar: {
        paddingBottom: 10,
        marginBottom: 10,
    },
    touchableOpacity: {
        marginLeft: 8,
        marginTop: 20
    },
    text_style: {
        fontSize: 15,
        marginTop: 5,
        marginLeft: 10,
        color: '#454545'
    },
    touchableOpacity_viewDetail:{
        width:90,
        height:30,
        borderRadius:20,
        backgroundColor:'#1589FF',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: 10,
        marginTop:5
    }
})