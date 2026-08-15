import React, { useEffect, useId, useState } from 'react'
import {Button, ScrollView, StyleSheet, View, Text, FlatList, Alert, Image, ActivityIndicator, TouchableHighlight, Touchable, TouchableOpacity, Modal } from 'react-native'
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
import { stat } from 'react-native-fs';
import InputField from './InputField';
import DocumentPicker, { types } from 'react-native-document-picker';
import CRUD_button from './CRUD_button';


// var DocumentPicker = require('react-native-document-picker');

//today 18/june/2024
var RNFS = require('react-native-fs');

const db = openDatabase(
    {
      name: 'prf.db',
      location: 'default',
      //createFromLocation:"/storage/emulated/0/103_prf.db"   
    },
    ()=>{console.log("Database OK.....")},
    error=>{Alert.alert("Database ERROR!!!!!!")}
    );


const ForgetPassword = (props) => {



    const[userID, setUserID] = useState("");
    const[clusterNumber, setClusterNumber] = useState("");
    const[password, setPassword] = useState("");



    const retrive_password=()=>{
  
        if(userID.length>="3" && clusterNumber.length=="3"){
            setPassword("অপেক্ষা করুন।");
        db.transaction(
          function(tx){
          tx.executeSql(
          "select password from user where cluster = '"+clusterNumber+"' and userID = '"+userID+"' ",
          [],
          function(tx, result){
          
          let lengt = result.rows.length;
           if(lengt>0){     
          for (i=0; i<lengt; i++){        
           var password = result.rows.item(i).password;
           setPassword(password);

          }}
          else{
            setPassword("পাসওয়ার্ডের কোন তথ্য নেই। ");
          }
          
      },
          function(tx, error){
          console.log("add data error: "+ error.message);
          });
          })
        }
        else{
            setPassword("");
        }
      
      }


    useEffect(()=>{
        retrive_password();
    },[clusterNumber, userID])




  return (
<Modal visible={true} transparent={true} animationType="fade">

<View style={{backgroundColor:'rgba(0, 0, 0, 0.7)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
    <View style={{ backgroundColor:"#f0f0f0", width:"70%", minHeight:200, padding:10, borderRadius:10, alignItems:"center"}}>
        



    <View style={{marginTop:"1%",height:"auto", width:"100%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
              পাসওয়ার্ড ভুলে গেছেন                
              </Text>
              
              <Text style={{fontSize:12, color:"#404040"}}>
              
                  বিঃদ্রঃ নতুন পাসওয়ার্ড পুনরুদ্ধারের জন্য, ইউজার আইডি তৈরী করার সময় যে ক্লাস্টার এবং কর্মী কোড/আইডি দিয়েছেন, সেই ক্লাস্টার নাম্বার এবং আপনার কর্মী কোড/আইডি প্রয়োজন হবে।
              </Text>
            </View>



            






            







            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"আপনার ইউজার আইডি/কর্মী কোড নাম্বার লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField keyboardType="numeric" getValue={(text)=> setUserID(text)}  value={userID} maxLength={4} placeholder={"আইডি/কর্মী কোড নাম্বার"} imgLeft={"id"}/></View>} 
            />
            </View>

            <View style={{height:80, width:"100%", marginTop:"1%"}}>
            <QuestionContainer
            question={"আপনার ক্লাস্টার নাম্বারটি নিচের বক্সে লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField keyboardType="numeric" getValue={(text)=> setClusterNumber(text)}  value={clusterNumber} maxLength={3} placeholder={"ক্লাস্টার নাম্বার"} imgLeft={"cluster"}/></View>} 
            />
            </View>

            <View style={{height:80, width:"100%", marginTop:"1%"}}>
            <QuestionContainer
            question={"আপনার উদ্ধারকৃত পাসওয়ার্ড।"}
            inputField_1={<View style={{width:"100%"}}><InputField value={password} placeholder={"পাসওয়ার্ড"} imgLeft={"lock"} readOnly={false}/></View>} 
            />
            </View>



            


            
            




            <View style={{width:"90%", justifyContent:"center", flexDirection:"row", marginTop:"5%", paddingBottom:10}}>
                  
                  <TouchableOpacity onPress={props.closeForgetPassword}>
      
                          <Text style={{color:"#f50f72", fontWeight:"bold", fontSize:12}}>
                          পাসওয়ার্ড পুনরুদ্ধারের অপশন বন্ধ করুন
                          </Text> 
      
                        </TouchableOpacity>
                        
      
                  </View>


            </View>
            


            



    </View>

</Modal>
  )
}

export default ForgetPassword
