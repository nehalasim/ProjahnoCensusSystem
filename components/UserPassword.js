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
import { AlterTableQuery } from './AlterTableQuery';

const db = openDatabase(
    {
      name: 'prf.db',
      location: 'default',
      //createFromLocation:"/storage/emulated/0/103_prf.db"   
    },
    ()=>{console.log("Database OK.....")},
    error=>{Alert.alert("Database ERROR!!!!!!")}
    );

const UserPassword = (props) => {

    const[userID, setUserID] = useState("");
    const[userPassword, setUserPassword] = useState("");
    const[userNewPassword, setUserNewPassword] = useState("");
    const[userNewPassword_2nd, setUserNewPassword_2nd] = useState("");
    



    const check_user_id_password=()=>{

  
        if(userID==props.userID && userID.length>="3" && userPassword!=""){
        db.transaction(
          function(tx){
          tx.executeSql(
          "select count(*) 'totaluser' from user WHERE userID = '"+userID+"' and password = '"+userPassword+"'",
          [],
          function(tx, result){
          
          let lengt = result.rows.length;
          var round_no = "";        
          for (i=0; i<lengt; i++){        
           if(result.rows.item(i).totaluser>0){
            
            if(userNewPassword=="" || userNewPassword.length<"4"){
                Alert.alert("ব্যাবহারকারীর পাসওয়ার্ড","একটি পাসওয়ার্ড লিখুন। যেটি আপনার সহজে মনে থাকবে। পাসওয়ার্ড কমপক্ষে ৪ ডিজিটের হবে। যেমনঃ ০৮১৮ বা ১৮৬২",[{text:"ঠিক আছে", onPress:()=>{""}}])
                // Alert.alert("ব্যাবহারকারীর পাসওয়ার্ড","আপনার বর্তমান পাসওয়ার্ড লিখুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
            }
            else if(userNewPassword!==userNewPassword_2nd || userNewPassword_2nd.length<"4"){
                Alert.alert("ব্যাবহারকারীর পাসওয়ার্ড","উপরেরে বক্সে দেয়া পাসওয়ার্ড এবং নিচের বক্সের পাসওয়ার্ড সাথে মিল নেই, অনুগ্রহ করে আবার লিখুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
            }
            else{
                Alert.alert("ব্যাবহারকারীর পাসওয়ার্ড","আপনার দেয়া সব তথ্য সঠিক থাকলে, পাসওয়ার্ড পরিবর্তন বাটনে ক্লিক করুন।",[{text:"সঠিক নয়", onPress:()=>{""}}, {text:"পাসওয়ার্ড পরিবর্তন", onPress:()=>{confirmChangePassword()}}]); 
            }
           }else{

            Alert.alert("ব্যাবহারকারীর আইডি/কর্মী কোড/পাসওয়ার্ড","আপনার দেয়া কর্মী কোড/আইডি অথবা পাসওয়ার্ড সঠিক নয়।",[{text:"ঠিক আছে", onPress:()=>{""}}])
           }
            
          }
          
      },
          function(tx, error){
          console.log("add data error: "+ error.message);
          });
          })
        }
        else{

                Alert.alert("ব্যাবহারকারীর আইডি/কর্মী কোড/পাসওয়ার্ড","আপনার সঠিক কর্মী কোড/আইডি এবং পাসওয়ার্ড লিখুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])

        }
      
      }

    const confirmChangePassword=()=>{

        db.transaction(
            function(tx){
              console.log("clusger running query");
            tx.executeSql(
            "update user set password = '"+userNewPassword+"' where userID = '"+userID+"' ",
            [],
            function(tx, result){
                console.log("running query");
           if(result.rowsAffected>0){            
            Alert.alert("পাসওয়ার্ড পরিবর্তন হয়েছে", "আপনার এন্ট্রি করা নতুন পাসওয়ার্ড সেট হয়েছে।",[{text:"ঠিক আছে", onPress:props.passwordChanged_closeapp}]);
            // adminPassword();
              }else{
                Alert.alert("দুঃখিত!!!", "আপনার এন্ট্রি করা নতুন পাসওয়ার্ড পরিবর্তন হয়নি, অনুগ্রহ করে আবার চেষ্টা করুন। ",[{text:"ঠিক আছে", onPress:()=>{""}}]);
              }
            
        },
            function(tx, error){
            console.log("add data error: "+ error.message);
            });
            })

    }


  return (
    <Modal visible={true} transparent={true} animationType="fade">

<View style={{backgroundColor:'rgba(0, 0, 0, 0.7)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
    <View style={{ backgroundColor:"#f0f0f0", width:"70%", minHeight:200, padding:10, borderRadius:10, alignItems:"center"}}>

    <View style={{marginTop:"1%",height:"auto", width:"100%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                বর্তমান পাসওয়ার্ড পরিবর্তন                
              </Text>
              
              <Text style={{fontSize:12, color:"#404040"}}>              
                  বিঃদ্রঃ পাসওয়ার্ড পরিবর্তনের ক্ষেত্রে, যে নাম্বারগুল আপনার সহজে মনে থাকবে, সেই নাম্বার গুল ব্যাবহার করার চেষ্টা করুন। 
              </Text>
            </View>


            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"আপনার ইউজার আইডি/কর্মী কোড নাম্বার লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField keyboardType="numeric" getValue={(text)=> setUserID(text)}  value={userID} maxLength={4} placeholder={"আইডি/কর্মী কোড নাম্বার"} imgLeft={"id"}/></View>} 
            />
            </View>

            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"আপনার বর্তমান পাসওয়ার্ড লিখুন। "}
            inputField_1={<View style={{width:"100%"}}><InputField secureText={true} keyboardType="numeric" getValue={(text)=> setUserPassword(text)}  value={userPassword} maxLength={6} placeholder={"পাসওয়ার্ড"} imgLeft={"lock"}/></View>} 
            />
            </View>
            
            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"অতুন পাসওয়ার্ড নিচের বক্সে লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField secureText={true} keyboardType="numeric" getValue={(text)=> setUserNewPassword(text)}  value={userNewPassword} maxLength={6} placeholder={"পাসওয়ার্ড"} imgLeft={"lock"}/></View>} 
            />
            </View>

            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"পুনরায় নতুন পাসওয়ার্ডটি লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField secureText={true} keyboardType="numeric" getValue={(text)=> setUserNewPassword_2nd(text)}  value={userNewPassword_2nd} maxLength={6} placeholder={"পাসওয়ার্ড"} imgLeft={"lock"}/></View>} 
            />
            </View>

                <View style={{width:"95%", marginTop:20, paddingBottom:15, flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>

                 <TouchableOpacity onPress={props.closePasswordContainer}>
                <Text style={{color:"#3a598c", fontWeight:"bold", fontSize:12}}>পরিবর্তন করব না</Text>
                </TouchableOpacity>   
                <Text style={{color:"#3a598c", fontWeight:"bold", fontSize:12}}>|</Text>

                        
                    <View style={{width:"40%"}}>
                    <CRUD_button callFunction={check_user_id_password} title={"পাসওয়ার্ড পরিবর্তন"} radious={50}/>        
                    </View>
                
                </View>



    </View>
    </View>
    
    </Modal>
  )
}

export default UserPassword
