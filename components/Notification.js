import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Alert, Image, ActivityIndicator, TouchableHighlight, Touchable, TouchableOpacity, Modal } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import moment from 'moment';
import { styles } from 'react-native-gifted-charts/src/LineChart/styles';
import Member_profile from './Member_profile';
import Camera_open from './Camera_open';



const Notification = (props) => {




    const [visible, setVisible] = useState(false);





   useEffect(()=>{
    setVisible(props.if_visible);
   },[props.if_visible]); 



      



  return (
<Modal visible={visible} transparent={true} animationType="fade">
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)', height:"100%", width:"100%", alignItems:"center", justifyContent:"center"}}>
      <View style={{minHeight:"10%", width:"70%", justifyContent:"center", alignItems:"center"}}>
        <View style={{backgroundColor:"#eab308", borderRadius:8, padding:5, width:"98%",  minHeight:100, padding:10, elevation:5}}>
          <Text style={{color:"#000"}}>
          {props.ChildError} {props.EDDError} {props.MWRAError} {props.EnrollTypeMWRA}
          </Text>
          <Text></Text>
          <TouchableOpacity onPress={props.closeModel}>
          <Text style={{color:"#0e7490", textAlign:"right"}}>মেসেজ বক্স অফ</Text>
          </TouchableOpacity>

        </View>
      </View>
      </View>
      </Modal>
  )
}

export default Notification;
