import React, {useContext} from 'react';
import { StyleSheet, TextInput, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { httpPostRequest } from '../../utils/http.js';
import {UserContext} from '../../UserContext.js'

export const CreateAppointmentScreen = () => {
    const {user} = useContext(UserContext)

    const navigation = useNavigation()
    const [patientName, setPatientName] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [doctorID, setDoctorID] = React.useState("")
    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [emailAddress, setEmailAddress] = React.useState("")
    const [appointmentTime, setAppointmentTime] = React.useState("")
    const [patientSymptom, setPatientSymptom] = React.useState("")
    const [imageUri, setImageUri] = React.useState("")

    const navigateToAppointmentPage = () => {
        navigation.navigate('NavigationBar', {
            screen: 'Appointment'
        })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageUri(result.uri);
        }

    };

    const submitButton_Pressed = () => {
        if (imageUri == null) { alert('Please upload image photo!'); return; }

        const data = JSON.stringify(
            {
                patientName: patientName,
                address:address,
                doctorID: user._id,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress,
                appointmentTime: appointmentTime,
                patientSymptom: patientSymptom,
                imageUri:imageUri,
            }
        )

        httpPostRequest('createAppointment', 'POST', data).then(response => {
            //console.log(response)
        }).catch(err => {
            //console.log(err)
        })
    }

    const returnText = "< Return";

    return (
        <View style={styles.view_container}>
            <View>
                <Text onPress={navigateToAppointmentPage} style={styles.text_returnLink}>{returnText}</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 25, color: '#000000' }}>Create New Appointment</Text>
            </View>

            <View style={styles.view_AppointmentInfoList}>
                <ScrollView>

                    <View style={styles.view_content_container}>
                        <View style={styles.view_fieldStyle}>
                            <Text style={styles.text_style}>Patient Name:</Text>
                            <TextInput style={styles.text_inputStyle} onChangeText={text => setPatientName(text)}></TextInput>
                        </View>
                    </View>

                    <View style={styles.view_content_container}>
                        <View style={styles.view_fieldStyle}>
                            <Text style={styles.text_style}>Appointment Address:</Text>
                            <TextInput style={styles.text_inputStyle} onChangeText={text => setAddress(text)}></TextInput>
                        </View>
                    </View>

                    <View style={styles.view_content_container}>
                        <View style={styles.view_fieldStyle}>
                            <Text style={styles.text_style}>Phone Number:</Text>
                            <TextInput style={styles.text_inputStyle} onChangeText={text => setPhoneNumber(text)}></TextInput>
                        </View>
                        <View style={styles.view_content_container}>
                            <View style={styles.view_fieldStyle}>
                                <Text style={styles.text_style}>Email Address:</Text>
                                <TextInput style={styles.text_inputStyle} onChangeText={text => setEmailAddress(text)}></TextInput>
                            </View>
                        </View>
                        <View style={styles.view_content_container}>
                            <View style={styles.view_fieldStyle}>
                                <Text style={styles.text_style}>Appointment Time:</Text>
                                <TextInput style={styles.text_inputStyle} onChangeText={text => setAppointmentTime(text)}></TextInput>
                            </View>
                        </View>
                        <View style={styles.view_content_container}>
                            <View style={styles.view_fieldStyle}>
                                <Text style={styles.text_style}>Patient Symptom:</Text>
                                <TextInput style={styles.text_inputStyle} onChangeText={text => setPatientSymptom(text)}></TextInput>
                            </View>
                        </View>
                        <View style={styles.view_content_container}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={styles.touchableOpacity_UploadAvatar}
                                    onPress={pickImage}
                                >
                                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>Upload Avatar</Text>
                                </TouchableOpacity>
                            </View>
                            {imageUri && <Text style={{ marginLeft: 5, fontSize: 15 }}>Image has been uploaded!</Text>}
                        </View>
                    </View>
                    <View style={styles.view_content_container}>
                        <TouchableOpacity
                            style={styles.touchableOpacity_Submit}
                            onPress={submitButton_Pressed}
                        >
                            <Text style={{ justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view_container: {
        flex: 1,
    },
    text_returnLink: {
        color: '#000000',
        marginTop: 60,
        marginLeft: 20,
        fontSize: 20
    },
    view_AppointmentInfoList: {
        width: '90%',
        justifyContent: 'center',
        marginLeft: '10%',
        height: '70%',
    },
    view_content_container: {
        marginTop: 10,
    },
    text_style: {
        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold'
    },
    view_fieldStyle: {
        marginTop: 10
    },
    text_inputStyle: {
        width: '90%',
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 1,
        borderColor: '#B6B6B4'
    },
    touchableOpacity_UploadAvatar: {
        width: '30%',
        height: 30,
        backgroundColor: '#FFA500',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    touchableOpacity_Submit: {
        width: '90%',
        height: 30,
        backgroundColor: '#EFAD09',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
})
