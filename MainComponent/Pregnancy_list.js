import React, { useRef, useEffect, useState } from 'react'
import { Animated, StyleSheet, View, Text, FlatList, Alert, Image, ActivityIndicator, TouchableHighlight, Touchable, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import QuestionContainer from '../components/QuestionContainer';
import RadioButton from '../components/RadioButton';
import moment from 'moment';
import Date_field from '../components/Date_field';
import DatePicker from 'react-native-date-picker';
import { styles } from 'react-native-gifted-charts/src/LineChart/styles';
import Camera_open from '../components/Camera_open';
import Notification from '../components/Notification';
import ButtonBottom from '../components/ButtonBottom';
import Inside_khana_mwra_child_list from '../components/Inside_khana_mwra_child_list';
import { check_mwra_existance } from '../components/check_mwra_existance';
import { check_mwra_survey_visit } from '../components/check_mwra_survey_visit';
import Inside_khana_mwra_visit_list from '../components/Inside_khana_mwra_visit_list';
import Inside_khana_mwra_preg_outcome from '../components/Inside_khana_mwra_preg_outcome';
import Pregnancy_list_data from '../components/Pregnancy_list_data';
import { passValueToSidebar } from '../components/SideBar_values';

const Pregnancy_list = (props) => {


    const props_array=[
        props.name,//0
        props.userID,//1
        props.password,//2
        props.cluster,//3
        props.roundNo,//4
        "",// props.block,//5
        "",//props.villageCode,//6
        "",//props.villageName,//7
        "",//props.bari, //8
        "",//props.bariName,//9
        "",//props.hh,//10
        "",//props.hhName,//11
        props.componentId,//12
        "",//props.MemberAddTracker,//13
        "",//props.MemberUpdateTracker,//14
        props.mwraVisit//15
        
        ];


        useEffect(()=>{
          passValueToSidebar(props.userID, true, props.componentId);
        },[]);

  return (
<View style={{width:"100%", flex:100, flexDirection:"column", alignItems:"center"}}>

            <View style={{marginTop:"1%",height:"auto", width:"98%", padding:10, backgroundColor:"#fff", borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>                
                বর্তমানে গর্ভবতী মহিলাদের লিস্ট
              </Text>              
              <Text style={{fontSize:12, color:"#404040"}}>
                  বিঃদ্রঃ এই লিস্ট থেকে, সরাসরি MWRA প্রোফাইলএ যেতে পারবেন এবং নির্দিষ্ট কোন প্রোফাইল এ গিয়ে MWRA সার্ভে ভিজিটের মাধ্যমে গর্ভের ফলাফল এন্ট্রি করতে পারবেন। উল্লেখ্য, এই লিস্ট থেকে গর্ভের ফলাফল ব্যতীত অন্য কোন ধরনের সার্ভে এন্ট্রি দেয়া যাবেনা।
              </Text>
            </View>


                <View style={{width:"100%"}}>
                <Pregnancy_list_data passedValues = {props_array} cluster={props.cluster}/>
                </View>


            </View>
  )
}

export default Pregnancy_list
