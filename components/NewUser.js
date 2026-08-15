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

const NewUser = (props) => {



  

const[totalMember, setTotalMember] = useState("");
const check_db_file_with_cluster=()=>{
  
  if(clusterNumber.length=="3"){
  db.transaction(
    function(tx){
    tx.executeSql(
    "select count(*) 'totalMember' from member WHERE cluster = '"+clusterNumber+"'",
    [],
    function(tx, result){
    
    let lengt = result.rows.length;
    var round_no = "";        
    for (i=0; i<lengt; i++){        
     var totalMember = result.rows.item(i).totalMember;
     setTotalMember(totalMember);
    }
    
},
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    })
  }
  else{
    setTotalMember("");
  }

}


const[checkUserID, setcheckUserID] = useState("");
const check_user_id=()=>{
  
  if(userID.length>="3"){
  db.transaction(
    function(tx){
    tx.executeSql(
    "select count(*) 'totaluser' from user WHERE userID = '"+userID+"'",
    [],
    function(tx, result){
    
    let lengt = result.rows.length;
    var round_no = "";        
    for (i=0; i<lengt; i++){        
     var totaluser = result.rows.item(i).totaluser;
     setcheckUserID(totaluser);
    }
    
},
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    })
  }
  else{
    setcheckUserID("");
  }

}




const[current_bd_file_size, setCurrent_bd_file_size] = useState(0)
const check_current_db_file_size=()=>{

const filePath = `${RNFS.DocumentDirectoryPath+"/../"+"databases"}/${"prf.db"}`;

  RNFS.stat(filePath)
  .then((statResult) => {
    // console.log('File Size: ' +  + ' bytes');
    setCurrent_bd_file_size((parseInt(statResult.size)/ (1024 * 1024)));
  })
  .catch((error) => {
    console.error('Error getting file stats: ', error);
  });

  }





    const[userName, setUserName] = useState("");
    const[userID, setUserID] = useState("");
    const[userPassword, setUserPassword] = useState("");
    const[userPassword_2nd, setUserPassword_2nd] = useState("");
    const[clusterNumber, setClusterNumber] = useState("");
    const[whatsAppNo, setWhatsAppNo] = useState("");


    const [selectedFile, setSelectedFile] = useState("");


    // const selectFile_confirmation=()=>{
    //   Alert.alert("ডাটাবেজ ফাইল","আপনি কি নিশ্চিত নতুন ডাটাবেজ ফাইল আপলোড করবেন। বিঃদ্রঃ নতুন ডাটাবেজ ফাইলটি আপনার পুরন ডাটাবেজ ফাইলের উপরে রিপ্লেস হবে। সেক্ষেত্রে আপনার পুরন ডাটাবেজের তথ্য নতুন ডাটাবেজের তথ্য দিয়ে রিপ্লেস হয়ে যাবে।",[{text:"না, এখন ফাইল আপলোড করব না।", onPress:()=>{""}}, {text:"হ্যাঁ, নতুন ফাইল আপলোড করব।", onPress:()=>{selectFile}}])
    // }

    const selectFile = async () => {
        try {
          const res = await DocumentPicker.pick({
            type: [types.allFiles],
          });
    
          // Destructure the first element of the array
          const file = res[0];
    
          console.log('Document Picker Response:', file);
    
          // Check the structure of the response and log each property
          console.log('file.name:', file.name);
          console.log('file.uri:', file.uri);
          console.log('file.type:', file.type);
          console.log('file.size:', file.size);
    
          // Ensure file.uri is defined before attempting to split it
          const fileName = file.name || (file.uri ? file.uri.split('/').pop() : 'Unknown');
          console.log('File name:', fileName);
    
          setSelectedFile(fileName);
          await moveFileToDocumentDirectory(file.uri, fileName);

    
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User canceled the picker
            console.log('User canceled the picker');
          } else {
            // Handle other errors
            Alert.alert('Error', err.message);
          }
        }
      };


      const[loading, setLoading] = useState(false);
      const moveFileToDocumentDirectory = async (sourceUri, fileName) => {
        setLoading(true);
        setCurrent_bd_file_size("");
        try {
          
          const destPath = `${RNFS.DocumentDirectoryPath+"/../"+"databases"}/${"prf.db"}`;
      
          // Move the file
          await RNFS.copyFile(sourceUri, destPath);
          
          // Alert.alert('File moved', 'The file was moved successfully.');
          setLoading(false);
          check_current_db_file_size();

          setTimeout(()=>{
            alter_table();
          }, 2000)
          

        } catch (err) {
          console.error('Error moving file', err);
          Alert.alert('Error', `Failed to move the file. ${err.message}`);
          setLoading(false);
        }

      };




    

const alter_table=()=>{

  AlterTableQuery()
      .then((message) => {
        console.log("message: "+message);
      })
      .catch((error) => {
        console.error("error: "+error);
      });
    }





    const check_admin_table_existance=(tableName)=>{
      return new Promise((resolve, reject)=>{

        db.transaction(
          function(tx){
          tx.executeSql(
          "select name from sqlite_master WHERE type='table' AND name='"+tableName+"' ",
          [],
          function(tx, result){
          
          let length = result.rows.length;
          if(length > 0){  
            resolve(true);
            console.log("exist");
          }else{
            resolve(false);
            console.log("not exist");
          }
          
      },
          function(tx, error){
          console.log("add data error: "+ error.message);
          reject("add data error: "+ error.message)
          });
          })
        

      });
    }
    



      const[adminPassword, setAdminPassword] = useState("");
      const check_admin_approval= async ()=>{
  



        if(adminPassword.length>3){
          try {          
          const checkAdminTAbleExist = await check_admin_table_existance("AdminUser");
          if(checkAdminTAbleExist){
        db.transaction(
          function(tx){
          tx.executeSql(
          "select * from AdminUser where password = '"+adminPassword+"' ",
          [],
          function(tx, result){
          
          let length = result.rows.length;
          if(length > 0){  
          for (i=0; i<length; i++){        
          //  var totaluser = result.rows.item(i).totaluser;
          setNew_DB_File((New_DB_File)=>({...New_DB_File, disabled:false}))
          }}else{
            
            setNew_DB_File((New_DB_File)=>({...New_DB_File, radio_1:"no"}))
            setNew_DB_File((New_DB_File)=>({...New_DB_File, radio_2:"no"}))
            setNew_DB_File((New_DB_File)=>({...New_DB_File, value:""}))
            setNew_DB_File((New_DB_File)=>({...New_DB_File, disabled:true}))

            setFileUploadContainer(false);
            setSelectedFile("");

          }
          
      },
          function(tx, error){
          console.log("add data error: "+ error.message);
          });
          })
        }else{
        
          if(adminPassword==="818456"){
            setNew_DB_File((New_DB_File)=>({...New_DB_File, disabled:false}));
            console.log("admin table not exist");
          }

        }


      } catch(notExist){
        console.log(notExist);      
      }

        }
      
      }


      useEffect(()=>{
        check_admin_approval();
      },[adminPassword])







      


      const[New_DB_File, setNew_DB_File]=useState({
        radio_1:"no",
        radio_2:"no",
        disabled:true,
        value:""
      })

      const New_DB=(file)=>{
        if(file==="yes"){
          setFileUploadContainer(true);         
          // setQuestionContainer_page_1(false);
          
          setNew_DB_File((New_DB_File)=>({...New_DB_File, radio_1:"yes"}))
          setNew_DB_File((New_DB_File)=>({...New_DB_File, radio_2:"no"}))
          setNew_DB_File((New_DB_File)=>({...New_DB_File, value:"1"}))

        }
        else{
          setFileUploadContainer(false);     
          // setQuestionContainer_page_1(true);    
          setNew_DB_File((New_DB_File)=>({...New_DB_File, radio_1:"no"}))
          setNew_DB_File((New_DB_File)=>({...New_DB_File, radio_2:"yes"}))
          setNew_DB_File((New_DB_File)=>({...New_DB_File, value:"2"}))
          setSelectedFile("");
        }
      }


      const[adminPassword_container, setAdminPassword_container] = useState(true);
      const[FileUploadContainer_question, setFileUploadContainer_question]=useState(true);
      const[FileUploadContainer, setFileUploadContainer] = useState(false);
      const[QuestionContainer_page_1, setQuestionContainer_page_1] = useState(false);
      const[QuestionContainer_page_2, setQuestionContainer_page_2] = useState(false);
      const[PreviousPage_button, setPreviousPage_button] = useState(false);


      const next=()=>{
        console.log("function access");
       if(New_DB_File.value==""){
        Alert.alert("ডাটাবেজ ফাইল","আপনি কি নতুন ডাটাবেজ ফাইল আপলোড করবেন, হ্যাঁ বা না নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
      else if(New_DB_File.value==="1" && selectedFile==""){
        Alert.alert("ডাটাবেজ ফাইল","আপনি নতুন ডাটাবেজ ফাইল আপলোড করবেন নির্বাচন করেছেন, তাই নতুন ডাটাবেজ ফাইল নির্বাচন করুন ফাইল বাটনে ক্লিক করে। নতুবা (পুরাতন ডাটাবেজ থাকবে) বাটনে ক্লিক করে আইডি তৈরী করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
      }
       else if(New_DB_File.value==="1" && selectedFile!=="" && QuestionContainer_page_1===false && parseInt(current_bd_file_size)>10){
        setFileUploadContainer_question(false)
        setAdminPassword_container(false);
        setFileUploadContainer(false);
        setQuestionContainer_page_1(true);
        setPreviousPage_button(true);        
       }
       else if(parseInt(current_bd_file_size)<10){
        Alert.alert("ডাটাবেজ ফাইল","আপনার ট্যাবএ বর্তমানে কোন ডাটাবেজ সেট/ডাটা নেই সার্ভেলেন্স শুরু করার জন্য, তাই একটি ডাটাবেজ ফাইল আপলোড করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
       else if(parseInt(current_bd_file_size)>10 && QuestionContainer_page_1===false){
        setQuestionContainer_page_1(true);
        setFileUploadContainer_question(false)
        setAdminPassword_container(false);
        setPreviousPage_button(true);        
       }
       else if(QuestionContainer_page_1===true && (userName).length<"3"){
        Alert.alert("ব্যাবহারকারীর নাম","আপনার সম্পূর্ণ নাম লিখুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
        
       }
       else if(QuestionContainer_page_1===true && (isNaN(userID) || userID.length<"3")){
        Alert.alert("ব্যাবহারকারীর আইডি/কর্মী কোড","আপনার সঠিক কর্মী কোড/আইডি লিখুন। আইডি/কর্মী কোড কমপক্ষে ৩ ডিজিটের হবে। যেমনঃ ০২১ বা ১৯০",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
       else if(QuestionContainer_page_1===true && parseInt(checkUserID)>0){
        Alert.alert("ব্যাবহারকারীর আইডি/কর্মী কোড","এই আইডি/কর্মী কোড দিয়ে একটি ইউজার তৈরী করা আছে। আপনি পাসওয়ার্ড ভুলে গেলে, (পাসওয়ার্ড মনে নেই) অপশনটি ব্যাবহার করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
       
       else if(QuestionContainer_page_1===true && (isNaN(userPassword) || userPassword.length<"4")){
        Alert.alert("ব্যাবহারকারীর পাসওয়ার্ড","একটি পাসওয়ার্ড লিখুন। যেটি আপনার সহজে মনে থাকবে। পাসওয়ার্ড কমপক্ষে ৪ ডিজিটের হবে। যেমনঃ ০৮১৮ বা ১৮৬২",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
       else if(QuestionContainer_page_1===true && userPassword.length>="4" && (userPassword!==userPassword_2nd)){
        Alert.alert("ব্যাবহারকারীর পাসওয়ার্ড","উপরেরে বক্সে দেয়া পাসওয়ার্ড এবং নিচের বক্সের পাসওয়ার্ড সাথে মিল নেই, অনুগ্রহ করে আবার লিখুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
       else if(QuestionContainer_page_1===true && (clusterNumber.length<"3" || parseInt(clusterNumber)<101 || parseInt(clusterNumber)>120) ){
        Alert.alert("ক্লাস্টার নাম্বার","আপনার বর্তমান ক্লাস্টার নাম্বারটি লিখুন। ক্লাস্টার ১০১ থেকে ১২০ পর্যন্ত দিতে পারবেন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
       else if(QuestionContainer_page_1===true && whatsAppNo.length!="11"){
        Alert.alert("হোয়াটসঅ্যাপ নাম্বার","আপনার সুপারভাইজারের হোয়াটসঅ্যাপ বর্তমান হোয়াটসঅ্যাপ নাম্বারটি লিখুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
       else if(QuestionContainer_page_1===true && parseInt(totalMember)<1000){
        Alert.alert("ক্লাস্টার নাম্বার","আপনার দেয়া ক্লাস্টার নাম্বার এবং আপলোড করা ডাটাবেজ/সিস্টেমএ থাকা ডাটাবেজের সাথে কোন তথ্য মিল নেই। অনুগ্রহ করে আপনার ক্লাস্টার নাম্বার অথবা আপলোড করা ডাটাবেজের মেম্বার তথ্য চেক করুন। ",[{text:"ঠিক আছে", onPress:()=>{""}}])
       }
       else{
        Alert.alert("নতুন ইউজার","আপনার দেয়া সব তথ্য সঠিক থাকলে (নতুন ইউজার সেভ) বাটনে ক্লিক করুন। ",[{text:"না, সঠিক নয়", onPress:()=>{""}}, {text:"নতুন ইউজার সেভ", onPress:()=>{save_new_user()}}])
        
       }
       


      }


      useEffect(()=>{
        check_db_file_with_cluster();
      },[clusterNumber])



      const previous_page=()=>{
        setQuestionContainer_page_1(false);
        setFileUploadContainer_question(true);
        setAdminPassword_container(true);
       

        if(New_DB_File.value==="1"){
          setFileUploadContainer(true);
        }else{
          setFileUploadContainer(false);
        }
      }




const save_new_user=()=>{
  console.log("function access")
  db.transaction(tx=>{
    tx.executeSql(
    "insert or ignore into user ( "+
    "name, "+
    "userID, "+
    "password, "+
    "cluster, "+
    "s_whatsApp, "+
    "study) values("+
    "'"+userName+"', "+
    "'"+userID+"', "+
    "'"+userPassword+"', "+
    "'"+clusterNumber+"', "+
    "'"+whatsAppNo+"', "+
    "'0')",
    [],
    (tx, result)=>{
      console.log("query access")
      if(result.rowsAffected>0){
      Alert.alert("নতুন ইউজার", "নতুন ইউজার সফলভাবে সেভ হয়েছে।",[{text:"ঠিক আছে", onPress:props.closeNewUser}]);
      }else{
        Alert.alert("দুঃখিত!!!", "আপনার দেয়া তথ্য সেভ হচ্ছেনা। অনুগ্রহ করে (ঠিক আছে) বাটনে ক্লিক করে, আবার নতুন করে চেষ্টা করুন।",[{text:"ঠিক আছে", onPress:props.closeNewUser}]);
      }
      
    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    Alert.alert("দুঃখিত!!!", "আপনার দেয়া তথ্য তথ্য সেভ হচ্ছেনা। অনুগ্রহ করে (ঠিক আছে) বাটনে ক্লিক করে, আবার নতুন করে চেষ্টা করুন।",[{text:"ঠিক আছে", onPress:props.closeNewUser}]);
    });
    });
}



useEffect(()=>{
  check_current_db_file_size();
},[selectedFile, New_DB_File])

useEffect(()=>{
  check_user_id()
},[userID])







  return (
<Modal visible={true} transparent={true} animationType="fade">

<View style={{backgroundColor:'rgba(0, 0, 0, 0.7)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
    <View style={{ backgroundColor:"#f0f0f0", width:"70%", minHeight:200, padding:10, borderRadius:10, alignItems:"center"}}>
        



    <View style={{marginTop:"1%",height:"auto", width:"100%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                নতুন ইউজার নিবন্ধন                
              </Text>
              
              <Text style={{fontSize:12, color:"#404040"}}>
              
                  বিঃদ্রঃ নতুন ইউজার নিবন্ধনের জন্য, ক্লাস্টার নাম্বার, ব্লক নাম্বার, ডাটাবেজ ফাইল এবং সুপারভাইজারের হোয়াটসঅ্যাপ নাম্বার আবশ্যক।
              </Text>
            </View>



            {adminPassword_container&&(
            <View style={{height:100, width:"100%", marginTop:"5%"}}>
            <QuestionContainer
            question={"এই ট্যাবের অ্যাডমিন নিচের বক্সে লিখুন। নতুন ইউজার তৈরী করতে এই অ্যাডমিন পাসওয়ার্ড আবশ্যক।"}
            inputField_1={<View style={{width:"100%"}}><InputField getValue={(text)=> setAdminPassword(text)}  value={adminPassword} maxLength={6} placeholder={"অ্যাডমিন পাসওয়ার্ড"} imgLeft={"lock"} secureText={true}/></View>} 
            direction={"row"}
            />
            </View>
            )}

            

            {FileUploadContainer_question&&(
            <View style={{height:100, width:"100%", marginTop:"1%"}}>
            <QuestionContainer
            question={"আপনি কি ডাটাবেজ ফাইল আপলোড করবেন? বিঃদ্রঃ নতুন ডাটাবেজ ফাইল আপলোড করলে, পুরাতন ডাটাবেজ ফাইলের উপরে রিপ্লেস হবে। "}
            radio_1={<View style={{width:"40%"}}><RadioButton disabled={New_DB_File.disabled} callFunction={New_DB.bind(this,"yes")} Value={New_DB_File.radio_1} title={"হ্যাঁ, আপলোড করব"}/></View>}
            radio_2={<View style={{width:"40%"}}><RadioButton disabled={New_DB_File.disabled} callFunction={New_DB.bind(this,"no")} Value={New_DB_File.radio_2} title={"না, পুরাতন ডাটাবেজ থাকবে"}/></View>}
            direction={"row"}
            />
            </View>
            )}



            {FileUploadContainer &&(
                
            <View style={{height:130, width:"100%", marginTop:"1%"}}>
              {loading &&(
              <View style={{position: 'absolute', zIndex:999999, width:"100%", backgroundColor:"rgba(255, 255, 255, 0.7)", height:"100%", borderRadius:10, justifyContent:"center", alignItems:"center"}}>
              <ActivityIndicator color={"red"} size={"large"}/>
              <Text style={{color:"red", fontSize:14, fontWeight:"bold"}}>
                অপেক্ষা করুন আপলোড হচ্ছে.....
              </Text>
              </View>
               )}

            <QuestionContainer
            question={"ফাইল বাটনে ক্লিক করে ডাটাবেজ ফাইলটি নির্বাচন করুন। বিঃদ্রঃ নতুন ডাটাবেজ ফাইলটি আপনার পুরন ডাটাবেজ ফাইলের উপরে রিপ্লেস হবে। সেক্ষেত্রে আপনার পুরন ডাটাবেজের তথ্য নতুন ডাটাবেজের তথ্য দিয়ে রিপ্লেস হয়ে যাবে।"}
            inputField_1={<View style={{height:"100%", alignItems:"center", justifyContent:"center"}}><Text style={{fontSize:12, color:"blue"}}>নির্বাচিত ফাইলের নামঃ <Text style={{color:"red", fontWeight:"bold"}}>{selectedFile}</Text></Text></View>} 
            direction={"row"}
            sideButton={<View style={{width:"20%"}}><CRUD_button callFunction={selectFile} title={"ফাইল"} radious={50}/></View>}
            />
            </View>

            )}



            



            {QuestionContainer_page_1 &&(
              <View style={{width:"100%"}}>
            <View style={{height:80, width:"100%", marginTop:"1%"}}>
            <QuestionContainer
            question={"আপনার পুরো নাম লিখুন"}
            inputField_1={<View style={{width:"100%"}}><InputField getValue={(text)=> setUserName(text)}  value={userName} maxLength={40} placeholder={"নতুন ইউজারের নাম"} imgLeft={"user"}/></View>} 
            />
            </View>

            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"আপনার ইউজার আইডি/কর্মী কোড নাম্বার লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField keyboardType="numeric" getValue={(text)=> setUserID(text)}  value={userID} maxLength={4} placeholder={"আইডি/কর্মী কোড নাম্বার"} imgLeft={"id"}/></View>} 
            />
            </View>

            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"আপনার পাসওয়ার্ড লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField secureText={true} keyboardType="numeric" getValue={(text)=> setUserPassword(text)}  value={userPassword} maxLength={6} placeholder={"পাসওয়ার্ড"} imgLeft={"lock"}/></View>} 
            />
            </View>

            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"উপরেরে পাসওয়ার্ডটি নিচের বক্সে পুনরায় লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField secureText={true} keyboardType="numeric" getValue={(text)=> setUserPassword_2nd(text)}  value={userPassword_2nd} maxLength={6} placeholder={"পাসওয়ার্ড"} imgLeft={"lock"}/></View>} 
            />
            </View>



            
            




              
            <View style={{height:80, width:"100%", marginTop:"1%"}}>
            <QuestionContainer
            question={"আপনার ক্লাস্টার নাম্বারটি নিচের বক্সে লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField keyboardType="numeric" getValue={(text)=> setClusterNumber(text)}  value={clusterNumber} maxLength={3} placeholder={"ক্লাস্টার নাম্বার"} imgLeft={"cluster"}/></View>} 
            />
            </View>

            <View style={{height:80, width:"100%", marginTop:"2%"}}>
            <QuestionContainer
            question={"আপনার সুপারভাইজারের সঠিক হোয়াটসঅ্যাপ নাম্বার লিখুন।"}
            inputField_1={<View style={{width:"100%"}}><InputField keyboardType="numeric" getValue={(text)=> setWhatsAppNo(text)}  value={whatsAppNo} maxLength={11} placeholder={"হোয়াটসঅ্যাপ নাম্বার"} imgLeft={"whatsapp"}/></View>} 
            />
            </View>
            </View>
            )}


            <View style={{width:"90%", justifyContent:"space-between", flexDirection:"row", marginTop:"5%", paddingBottom:10}}>
                  
            <TouchableOpacity onPress={props.closeNewUser}>

                    <Text style={{color:"#f50f72", fontWeight:"bold", fontSize:12}}>
                     নতুন ইউজার এখন করব না
                    </Text> 

                  </TouchableOpacity>
                  

                  <View style={{flexDirection:"row", width:"35%", justifyContent:"space-between"}}>
                  <TouchableOpacity onPress={previous_page}>                  
                    <Text style={{color:"#3a598c", fontWeight:"bold", fontSize:12}}>
                     আগের পেজ
                    </Text> 
                  </TouchableOpacity>

                  <Text style={{color:"#3a598c"}}>
                         |     
                    </Text>  

                  <TouchableOpacity onPress={next}>
                  <Text style={{color:"#3a598c", fontWeight:"bold", fontSize:12}}>
                      পরবর্তী পেজ
                    </Text> 
                  </TouchableOpacity>
                  </View>

            </View>



    </View>
</View>
</Modal>
  )
}

export default NewUser
