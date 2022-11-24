import React, {useContext} from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AppointmentList } from '../../Components/AppointmentList/index.js'
import { useNavigation } from '@react-navigation/native';
import {UserContext} from '../../UserContext.js'

export const AppointmentScreen = () => {
    const {user} = useContext(UserContext)
    const navigation = useNavigation();

    const createAppointmentButton_Pressed = () => {
        navigation.navigate('CreateAppointment',{id:user._id})
    }

    return (
        <View style={styles.view_container}>
            {/* <ImageBackground source={require('../../assets/background.jpg')} resizeMode="cover" style={{ flex: 1 }}> */}
                <View>
                    <View style={styles.view_Header}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000000' }}>Patient {'\n'}Appointment</Text>
                    </View>
                    <View style={styles.container_view_CreateAppointment}>
                        <View style={styles.view_CreateAppointment}>
                            <TouchableOpacity
                                style={styles.touchableOpacity_CreateAppointment}
                                onPress={createAppointmentButton_Pressed}
                            >
                                <Text style={{ color: '#FFFFFF' }}>+</Text>
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10, fontSize:16 }}>Create new Appointment</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.view_AppointmentList}>
                    <ScrollView>
                        <AppointmentList id={user._id}/>
                    </ScrollView>
                </View>
            {/* </ImageBackground> */}
        </View>
    )
}

const styles = StyleSheet.create({
    view_container: {
        flex: 1,
        backgroundColor:'#FFFFFF'
    },
    view_Header: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 70,
        marginLeft: '5%'
    },
    container_view_CreateAppointment: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    touchableOpacity_CreateAppointment: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: '#1589FF',
        color: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    view_CreateAppointment: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EBEBEB',
        width: '90%',
        height: 60,
        alignItems: 'center',
        borderRadius: 20,
    },
    view_AppointmentList: {
        width: '90%',
        justifyContent: 'center',
        marginLeft: '5%',
        height: '70%',
        marginTop: 10
    }
})