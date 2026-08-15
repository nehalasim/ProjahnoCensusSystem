import React, { useEffect, useState } from 'react'
import { View, Text, Alert, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import QuestionContainer from '../components/QuestionContainer'
import RadioButton from '../components/RadioButton'
import CRUD_button from '../components/CRUD_button'
import InputField from '../components/InputField'
import Date_field from '../components/Date_field'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { Dropdown } from 'react-native-element-dropdown'
import DropDown from '../components/DropDown'
import { openDatabase } from 'react-native-sqlite-storage';
import CustomAlert from '../components/CustomAlert'
import { Navigation } from 'react-native-navigation'
import Headder from '../components/Headder'
import Inside_khana_member_list from '../components/Inside_khana_member_list'
import { passValueToSidebar } from '../components/SideBar_values'

const db = openDatabase(
  {
    name: 'prf.db',
    location: 'default',
    //createFromLocation:"/storage/emulated/0/103_prf.db"
  },
  ()=>{console.log("Database OK.....")},
  error=>{Alert.alert("Database ERROR!!!!!!")}
  );



  // name:props.items[0],
  // userID:props.items[1],
  // password:props.items[2],
  // cluster:props.items[3],
  // roundNo:props.items[4],
  // block:props.items[5],
  // villageCode:props.items[6],
  // villageName:props.items[7],  
  // bari:props.items[8],
  // bariName:props.items[9],
  // hh:props.items[10],
  // hhName:props.items[11]
const Member_update = (props) => {



  useEffect(()=>{
    passValueToSidebar(props.userID, false, props.componentId);
  },[]);



const[back_manually, Set_back_manually]=useState("");

const back_to_survey_question_manually=(totalUpdated)=>{  

  Set_back_manually(totalUpdated);
}


  const back_to_survey_question=(totalAdd)=>{
    var member_updated = parseInt(totalAdd) > 0 || parseInt(back_manually) > 0 ? "1" : "2"; 


 if(parseInt(member_updated)===2 && parseInt(props.MemberAddTracker)!==1){
    Navigation.push(props.componentId,{
      component:{
        name:"Inside_khana_page",
        passProps:{
          userID:props.userID,                
          name:props.name,
          password:props.password,
          cluster:props.cluster,
          block:props.block,
          roundNo:props.roundNo,
          villageCode:props.villageCode,
          villageName:props.villageName,
          bari:props.bari,
          bariName:props.bariName,
          hh:props.hh,
          hhName:props.hhName,
          MemberAddTracker:props.MemberAddTracker,
          MemberUpdateTracker:member_updated
          
  
          
        },
        options:{        
          topBar:{
            visible:true,
            title:{
              text:"খানা ভিজিট"
            },
            rightButtons:[{                    
              component:{              
                name:"BackButton",              
                passProps:{
                  originComponentId: props.componentId,
                  position:"Inside_khana_page",
                  backButtonText:"খানা লিস্ট",
                  userID:props.userID,
                  password:props.password, 
                  name:props.name,
                  cluster:props.cluster,
                  roundNo:props.roundNo,
                  block:props.block,
                  villageCode:props.villageCode,
                  villageName:props.villageName,
                  bari:props.bari,
                  bariName:props.bariName,
                  hh:props.hh,
                  hhName:props.hhName,
                  MemberAddTracker:props.MemberAddTracker,
                  MemberUpdateTracker:member_updated
                  
                  
  
                }
              }
    
              
            }]
            
  
          }
        }
      }
    })
  }
  else{
    Navigation.push(props.componentId,{
      component:{
        name:"Inside_khana_page",
        passProps:{
          userID:props.userID,                
          name:props.name,
          password:props.password,
          cluster:props.cluster,
          block:props.block,
          roundNo:props.roundNo,
          villageCode:props.villageCode,
          villageName:props.villageName,
          bari:props.bari,
          bariName:props.bariName,
          hh:props.hh,
          hhName:props.hhName,
          MemberAddTracker:props.MemberAddTracker,
          MemberUpdateTracker:member_updated
          
  
          
        },
        options:{        
          topBar:{
            visible:true,
            title:{
              text:"খানা ভিজিট"
            },
            rightButtons:[]         
          }
        }
      }
    })
  
  }
  }





  return (
    
    <View style={{flex:100, alignItems:"center", backgroundColor:"#f0f0f0"}}>
    <Headder function={back_to_survey_question.bind("0")} pageName={"সদস্যের তথ্য পরিবর্তন"} backPage={""}/>


             <View style={{flex:5, marginTop:"1%", width:"95%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                সদস্যের বর্তমান অবস্তার পরিবর্তন 
              </Text>              
              
              <Text style={{fontSize:12, color:"#404040"}}>              
                  বিঃদ্রঃ সদস্যে বর্তমান অবস্তার পরিবর্তনের ক্ষত্রে, প্রথমে সব তথ্য যাচাই করুন, তারপর ডাটা আপডেট/পরিবর্তন করুন।                  
              </Text>
            </View>

            <View style={{flex:85, width:"100%", marginTop:1, paddingBottom:40}}>
              
            <Inside_khana_member_list cStatus={"1"} onManualBack_to_Survey_Question = {back_to_survey_question_manually} onDataReceived={back_to_survey_question} toUpdate={props.toUpdate} villageCode={props.villageCode} bari={props.bari} hh={props.hh}/>
            </View>






            </View>

  )
}

export default Member_update;
