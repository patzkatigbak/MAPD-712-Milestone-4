import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SpliteLine } from '../../Components/SpliteLine/index.js'

export const PatientDetailScreen = ({ route }) => {
    const { firstName, lastName, imageUri, sex, address, phoneNumber, emailAddress, emergencyContact,
        emergencyContactPhoneNumber, bedNumber, bloodPressure, respiratoryRate, bloodOxygenLevel, heartbeatRate } = route.params.patient

    const [flag, setFlag] = React.useState(1)

    const button_basicInfo = () => {
        setFlag(0)
    }

    const button_clinicalInfo = () => {
        setFlag(1)
    }


    const patientBasicInfo = () => {
        return (
            <View style={styles.view_patientRestInfo}>
                <Text style={styles.text_patientInfoTitle}>Sex</Text>
                <Text style={styles.text_patientInfo}>{sex}</Text>
                <SpliteLine />
                <Text style={styles.text_patientInfoTitle}>Address</Text>
                <Text style={styles.text_patientInfo}>{address}</Text>
                <SpliteLine />
                <Text style={styles.text_patientInfoTitle}>Phone Number</Text>
                <Text style={styles.text_patientInfo}>{phoneNumber}</Text>
                <SpliteLine />
                <Text style={styles.text_patientInfoTitle}>Email Address</Text>
                <Text style={styles.text_patientInfo}>{emailAddress}</Text>
                <SpliteLine />
                <Text style={styles.text_patientInfoTitle}>Emergency Contact</Text>
                <Text style={styles.text_patientInfo}>{emergencyContact}</Text>
                <SpliteLine />
                <Text style={styles.text_patientInfoTitle}>Emergency Contact Phone Number</Text>
                <Text style={styles.text_patientInfo}>{emergencyContactPhoneNumber}</Text>
            </View>
        )
    }

    const patientClinicalInfo = () => {
        return (
            <View>
                <View style={styles.view_patientClinicalData}>
                    <View>
                        <Image source={require('../../assets/bloodPressure.png')} style={styles.image} />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={styles.text_clinicalData}>{bloodPressure}</Text>
                    </View>
                </View>
                <SpliteLine />
                <View style={styles.view_patientClinicalData}>
                    <View>
                        <Image source={require('../../assets/respiratoryRate.png')} style={styles.image} />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={styles.text_clinicalData}>{respiratoryRate}</Text>
                    </View>
                </View>
                <SpliteLine />
                <View style={styles.view_patientClinicalData}>
                    <View>
                        <Image source={require('../../assets/bloodOxygenLevel.jpg')} style={styles.image} />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={styles.text_clinicalData}>{bloodOxygenLevel}</Text>
                    </View>
                </View>
                <SpliteLine />
                <View style={styles.view_patientClinicalData}>
                    <View>
                        <Image source={require('../../assets/heartbeatRate.jpeg')} style={styles.image} />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={styles.text_clinicalData}>{heartbeatRate}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.view_Container}>
            <View style={styles.view_PatientInfo_Container}>
                <View style={styles.view_patientIdAndNameInfo}>
                    <View>
                        <Image source={{ uri: imageUri }} style={{ height: 55, width: 55, borderRadius: 100 }} />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{firstName} {lastName}</Text>
                    </View>
                </View>
                <View style={styles.view_button}>
                    <TouchableOpacity
                        onPress={button_clinicalInfo}
                        style={styles.rightbutton}
                    >
                        <Text style={styles.buttonText}>Clinical Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={button_basicInfo}
                        style={styles.leftbutton}
                    >
                        <Text style={styles.buttonText}>Basic Information</Text>
                    </TouchableOpacity>
                   
                </View>
                <SpliteLine />
                <View style={{marginTop:10}}>
                    {flag == 1?patientClinicalInfo():patientBasicInfo()}
                </View>
                <SpliteLine />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view_Container: {
        flex: 1,
    },
    view_PatientInfo_Container: {
        width: '90%',
        height: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginLeft: '5%',
        marginTop: 20
    },
    view_patientIdAndNameInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    view_patientClinicalData: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    text_patientInfoTitle: {
        marginLeft: 7,
        fontSize: 14,
        opacity: 0.5
    },
    text_patientInfo: {
        marginTop: 5,
        marginLeft: 7,
        color: '#4C4646',
        fontSize: 16,
    },
    view_patientRestInfo: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    view_TextInput: {
        marginLeft: '7%',

    },
    text_clinicalData: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30
    },
    view_button: {
        flexDirection: "row",
    },
    leftbutton:{
        width: '50%',
        height: 30,
        backgroundColor: '#4169E1',
        marginTop: 20,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    rightbutton:{
        width: '50%',
        height: 30,
        backgroundColor: '#4169E1',
        marginTop: 20,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        justifyContent:'center',
        alignItems:'center',
        color:'#FFFFFF',
        fontSize: 15,
        fontWeight:'bold'
    },
    image:{
        height: 80, 
        width: 80 
    }
})