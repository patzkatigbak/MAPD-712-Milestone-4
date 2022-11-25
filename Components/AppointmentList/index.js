import React, {useContext} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AppointmentInfoCard} from '../AppointmentInfoCard/index.js'
import {httpGetRequest} from '../../utils/http.js'
import {UserContext} from '../../UserContext.js'

export const AppointmentList = (props) => {
    const [appointments,setAppointments] = React.useState([])
    const navigation = useNavigation();

    React.useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', () => {
            httpGetRequest(`appointments?doctorID=${props.id}`, 'GET')
                .then(async res => {
                    if (res.ok) {
                        return await res.json()
                    } else {
                        return Promise.reject(await res.json());
                    }
                })
                .then(data => {
                    setAppointments(data)
                    //console.log(data)
                })
        });
        return willFocusSubscription;
    }, [])
    
    return (
        <View style={styles.view_AppointmentList}>
            {
                appointments.map((appointment, key) => {
                    return (<AppointmentInfoCard key={key} appointment={appointment} />)
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    width: '90%',
    justifyContent: 'center',
    marginLeft: '5%',
    height: '40%',
})
