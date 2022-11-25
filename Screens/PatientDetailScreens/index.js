import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import { SpliteLine } from '../../Components/SpliteLine/index.js'
import { httpPostRequest } from '../../utils/http.js'
import { httpGetRequest } from '../../utils/http.js'
import { useNavigation } from '@react-navigation/native';

export const PatientDetailScreen = ({ route }) => {
    const { _id, firstName, lastName, imageUri, sex, address, phoneNumber, emailAddress, emergencyContact,
        emergencyContactPhoneNumber } = route.params.patient
        console.log(route.params.patient)
    // bloodPressure, respiratoryRate, bloodOxygenLevel, heartbeatRate 
    const navigation = useNavigation();
    const [flag, setFlag] = React.useState(1)
    const [data,setData] = React.useState([])
    const [bloodPressure, setBloodPressure] = React.useState("")
    const [respiratoryRate, setRespiratoryRate] = React.useState("")
    const [bloodOxygenLevel, setBloodOxygenLevel] = React.useState("")
    const [heartbeatRate, setHeartbeatRate] = React.useState("")
    const [symptom, setSymptom] = React.useState("")
    const [hasLoaded, setHasLoaded] = React.useState(false)

    const button_basicInfo = () => {
        setFlag(0)
    }

    const button_clinicalInfo = () => {
        setFlag(1)
    }

    const button_historyInfo = () => {
        setFlag(2)
    }

    React.useEffect(
        () => {
            httpGetRequest(`clinicalData?patientId=${String(_id)}`, 'GET').then(async res=>{
                if(res.ok){
                    return await res.json()
                }else{
                    return Promise.reject(await res.json())
                }
            })
            .then(data=>{
                setData(data)
                if(data.length!=0){
                    setBloodPressure(data[data.length-1].bloodPressure)
                    setRespiratoryRate(data[data.length-1].respiratoryRate)
                    setBloodOxygenLevel(data[data.length-1].bloodOxygenLevel)
                    setHeartbeatRate(data[data.length-1].heartbeatRate)
                    setSymptom(data[data.length-1].symptom)
                }
                setHasLoaded(true);  
            })
        }
    ,[])

    
    const button_update_pressed = () => {
        const data = JSON.stringify(
            {
                patientId: String(_id),
                bloodPressure: bloodPressure,
                respiratoryRate: respiratoryRate,
                bloodOxygenLevel: bloodOxygenLevel,
                heartbeatRate: heartbeatRate,
                symptom:symptom,
                isSevere:"true"
            }
        )

        httpPostRequest('createClinicalData', 'POST', data).then(res => {
        }).catch(err => {
            console.log(err)
        })
    }

    const historyInfo = () => {
        return hasLoaded ? 
            <ScrollView>
                {data.map((item,key)=>{
                    return <View key={key} style={{}}>
                        <Text style={{fontSize:15}}>{key+1}.{item.symptom}</Text>
                    </View>
                })}
            </ScrollView> 
        : <View></View>
    }

    const patientClinicalInfo = () => {
        return hasLoaded ? 
        <View>
            <View style={styles.view_patientClinicalData}>
                <View>
                    <Image source={require('../../assets/bloodPressure.png')} style={styles.image} />
                </View>
                <View style={styles.textInput_clinicalData}>
                    <TextInput placeholder="N/A" style={styles.text_clinicalData} onChangeText={(text) => setBloodPressure(text)} >{data.length!=0?data[data.length-1].bloodPressure:""}</TextInput>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}> mmHG</Text>
                </View>
            </View>
            <SpliteLine />
            <View style={styles.view_patientClinicalData}>
                <View>
                    <Image source={require('../../assets/respiratoryRate.png')} style={styles.image} />
                </View>
                <View style={styles.textInput_clinicalData}>
                    <TextInput placeholder="N/A" style={styles.text_clinicalData} onChangeText={(text) => setRespiratoryRate(text)}>{data.length!=0?data[data.length-1].respiratoryRate:""}</TextInput>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}> /min</Text>
                </View>
            </View>
            <SpliteLine />
            <View style={styles.view_patientClinicalData}>
                <View>
                    <Image source={require('../../assets/bloodOxygenLevel.jpg')} style={styles.image} />
                </View>
                <View style={styles.textInput_clinicalData}>
                    <TextInput placeholder="N/A" style={styles.text_clinicalData} onChangeText={(text) => setBloodOxygenLevel(text)}>{data.length!=0?data[data.length-1].bloodOxygenLevel:""}</TextInput>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}> %</Text>
                </View>
            </View>
            <SpliteLine />
            <View style={styles.view_patientClinicalData}>
                <View>
                    <Image source={require('../../assets/heartbeatRate.jpeg')} style={styles.image} />
                </View>
                <View style={styles.textInput_clinicalData}>
                    <TextInput placeholder="N/A" style={styles.text_clinicalData} onChangeText={(text) => setHeartbeatRate(text)}>{data.length!=0?data[data.length-1].heartbeatRate:""}</TextInput>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}> /min</Text>
                </View>
            </View>
            <SpliteLine />
            <View style={{ backgroundColor: '#FCCFB2', marginTop: 20, borderRadius: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 5 }}>Symptom:</Text>
                <TextInput multiline={true} style={{ fontSize: 15, marginTop: 7, marginLeft: 5, height: 140 }}
                onChangeText={(text) => setSymptom(text)}
                placeholder="No data">          
                {data.length!=0?data[data.length-1].symptom:""}</TextInput>
            </View>
            <View>
                <TouchableOpacity
                    onPress={button_update_pressed}
                    style={{
                        width: '100%', height: 40, backgroundColor: '#D35400',
                        justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 10
                    }}
                >
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </View> : <Text>Now loading</Text>
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
                        style={styles.leftbutton}
                    >
                        <Text style={styles.buttonText}>Clinical Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={button_basicInfo}
                        style={styles.middlebutton}
                    >
                        <Text style={styles.buttonText}>Basic Info</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={button_historyInfo}
                        style={styles.rightbutton}
                    >
                        <Text style={styles.buttonText}>history</Text>
                    </TouchableOpacity> */}
                </View>
                {/* <SpliteLine /> */}
                <View style={{ marginTop: 10 }}>
                    {flag == 0?patientBasicInfo():patientClinicalInfo()}
                    {/* {flag == 0 ? patientBasicInfo():(flag == 1 ? patientClinicalInfo(): historyInfo())} */}
                </View>
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
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f5f5',
        width: 70,
        height: 40,
        borderRadius: 10,
        padding: 5,
    },
    view_button: {
        flexDirection: "row",
        justifyContent:'space-around'
    },
    leftbutton: {
        width: '50%',
        // width: 110,
        height: 30,
        backgroundColor: '#D35400',
        marginTop: 20,
        // borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    middlebutton: {
        width: '50%',
        // width: 110,
        height: 30,
        backgroundColor: '#D35400',
        marginTop: 20,
        // borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightbutton:{
        // width: '33.4%',
        width: 110,
        height: 30,
        backgroundColor: '#D35400',
        marginTop: 20,
        // borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    image: {
        height: 50,
        width: 50
    },
    textInput_clinicalData: {
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
})