import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Alert, Image, ActivityIndicator, TouchableHighlight, Touchable, TouchableOpacity, Modal } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import QuestionContainer from './QuestionContainer';
import RadioButton from './RadioButton';
import moment from 'moment';
import Date_field from './Date_field';
import DatePicker from 'react-native-date-picker';
import { styles } from 'react-native-gifted-charts/src/LineChart/styles';
import Camera_open from './Camera_open';
import Member_profile from './Member_profile';
import Notification from './Notification';


// const db = openDatabase(
//     {
//       name: 'prf.db',
//       location: 'default',
//       //createFromLocation:"/storage/emulated/0/103_prf.db"
//     },
//     ()=>{console.log("Database OK.....")},
//     error=>{Alert.alert("Database ERROR!!!!!!")}
//     );


const Code_7_bubble = (props) => {

  return (

    <TouchableOpacity onPress={props.function} style={{borderRadius:100, top:"80%", left:"80%", flex:1, position: 'absolute', zIndex:9999, backgroundColor:"#fff", elevation:1}}>
      <Image source={props.icon}/>
    </TouchableOpacity>

   )
}

export default Code_7_bubble
