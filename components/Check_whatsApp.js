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

const Check_whatsApp = (props) => {

    const[whatsAppNo, setWhatsAppNo] = useState("");
    const[whatsAppNo_2, setWhatsAppNo_2] = useState("");





    const saveNumber=()=>{


if(whatsAppNo.length!="11"){
        Alert.alert("হোয়াটসঅ্যাপ নাম্বার","আপনার সুপারভাইজারের বর্তমান  সঠিক হোয়াটসঅ্যাপ নাম্বারটি লিখুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
       else if(whatsAppNo!==whatsAppNo_2){
        Alert.alert("হোয়াটসঅ্যাপ নাম্বার","প্রথম হোয়াটসঅ্যাপ এবং দ্বিতীয় হোয়াটসঅ্যাপ নাম্বারের মধ্যে পার্থক্য আছে। ",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
       else{

        db.transaction(
          function(tx){
          tx.executeSql(
          "update user set s_whatsApp = '"+whatsAppNo+"' where userID = '"+props.userID+"' ",
          [],  (tx, result)=>{
            if(result.rowsAffected>0){                
                Alert.alert("নাম্বার সেভ হয়েছে","আপনার সুপারভাইসারের হোয়াটসঅ্যাপ নাম্বার সেভ হয়েছে। এখন হোয়াটসঅ্যাপ বাটনে ক্লিক করে, ডেইলি রিপোর্ট প্রেরন করতে পারবেন।",[{text:"ঠিক আছে", onPress:props.close_WhatsApp}]);
            }
            },
          function(tx, error){
          console.log("add data error: "+ error.message);
          Alert.alert("দুঃখিত!!!", "আপনার দেয়া তথ্য তথ্য সেভ হচ্ছেনা। অনুগ্রহ করে (ঠিক আছে) বাটনে ক্লিক করে, আবার নতুন করে চেষ্টা করুন।",[{text:"ঠিক আছে", onPress:props.closeNewUser}]);
          });
          });
}     
 }
      



  return (
    <Modal visible={true} transparent={true} animationType="fade">

<View style={{backgroundColor:'rgba(0, 0, 0, 0.7)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
<View style={{ backgroundColor:"#f0f0f0", width:"70%", minHeight:100, padding:10, borderRadius:10, alignItems:"center"}}>
    <Text style={{fontSize:12, color:"#545454"}}>
        বিঃদ্রঃ আপনার সুপারভাইসারের হোয়াটসঅ্যাপ নাম্বার নিচের বক্সে লিখে, সেভ নাম্বারএ ক্লিক করুন।
    </Text>
            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"আপনার সুপারভাইজারের সঠিক হোয়াটসঅ্যাপ নাম্বার লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField keyboardType="numeric" getValue={(text)=> setWhatsAppNo(text)}  value={whatsAppNo} maxLength={11} placeholder={"হোয়াটসঅ্যাপ নাম্বার"} imgLeft={"whatsapp"}/></View>} 
            />
            </View>

            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"পুনরায় উপরের হোয়াটসঅ্যাপ নাম্বারটি লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField keyboardType="numeric" getValue={(text)=> setWhatsAppNo_2(text)}  value={whatsAppNo_2} maxLength={11} placeholder={"হোয়াটসঅ্যাপ নাম্বার"} imgLeft={"whatsapp"}/></View>} 
            />
            </View>





            <View style={{ alignSelf:"flex-end", width:"55%", justifyContent:"space-evenly", flexDirection:"row", marginTop:"5%", paddingBottom:10}}>
                  
            <TouchableOpacity onPress={props.close_WhatsApp}>
                    <Text style={{color:"#f50f72", fontWeight:"bold", fontSize:12}}>
                     এখন কোন নাম্বার সেট করব না
                    </Text> 
                  </TouchableOpacity>

                  <Text style={{color:"blue", fontWeight:"bold"}}>
                     | 
                  </Text>
                  

                  
                  <TouchableOpacity onPress={saveNumber}>
                  <Text style={{color:"#3a598c", fontWeight:"bold", fontSize:12}}>
                     সেভ নাম্বার
                    </Text> 
                  </TouchableOpacity>
                  

            </View>



</View>
</View>


    </Modal>
    
  )
}

export default Check_whatsApp
