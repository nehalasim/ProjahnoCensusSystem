import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import RadioButton from './RadioButton'
import CRUD_button from './CRUD_button'
import QuestionContainer from './QuestionContainer'
import { Navigation } from 'react-native-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import moment from 'moment'

const Survey_question = (props) => {


  const db = openDatabase(
    {
      name: 'prf.db',
      location: 'default',
      //createFromLocation:"/storage/emulated/0/103_prf.db"
    },
    ()=>{console.log("Database OK.....")},
    error=>{Alert.alert("Database ERROR!!!!!!")}
    );

  const[question_1, setAnswer_1]=useState({
    radio_1:"no",
    radio_2:"no",
    radio_3:"no",
    value:"",
    disabled:false

})

  const[question_2, setAnswer_2]=useState({
    radio_1:"no",
    radio_2:"no",
    value:"",
    disabled:false
  })

  const[question_3, setAnswer_3]=useState({
    radio_1:"no",
    radio_2:"no",
    value:"",
    disabled:false
  })

  const[question_4, setAnswer_4]=useState({
    radio_1:"no",
    radio_2:"no",
    radio_3:"no",
    value:"",
    disabled:false
  })

  const[showQuestion_1_2, SetShowQuestion_1_2]=useState({
    showView:false
  });

  const[showQuestion_4, SetShowQuestion_4]=useState({
    showView:false
  });



  const check_survey_started=()=>{

    // Alert.alert(parseInt(props.items[13])+"----"+parseInt(props.items[14]));

    if(parseInt(props.items[13])===1 || parseInt(props.items[14])===1){
     
      setAnswer_1((question_1)=>({...question_1, radio_1:"yes"}))
      setAnswer_1((question_1)=>({...question_1, radio_2:"no"}))
      setAnswer_1((question_1)=>({...question_1, radio_3:"no"}))
      setAnswer_1((question_1)=>({...question_1, value:"1"}))
      setAnswer_1((question_1)=>({...question_1, disabled:true}))
      SetShowQuestion_1_2({showView:true});
      SetShowQuestion_4({showView:false});
      setAnswer_4({radio_1:"no"})
      setAnswer_4({radio_2:"no"})
      setAnswer_4({value:""})   
      
      // setAnswer_2((question_2)=>({...question_2, radio_1:"yes"}))
      // setAnswer_2((question_2)=>({...question_2, radio_2:"no"}))
      // setAnswer_2((question_2)=>({...question_2, value:"1"}))
      // setAnswer_2((question_2)=>({...question_2, disabled:true}))
    }
    else if((parseInt(props.items[14])===2 && (parseInt(props.items[13])===2 || parseInt(props.items[13])!==NaN)) || (parseInt(props.items[13])===2 && (parseInt(props.items[14])===2 || parseInt(props.items[14])!==NaN))){
      setAnswer_1((question_1)=>({...question_1, radio_1:"yes"}))
      setAnswer_1((question_1)=>({...question_1, radio_2:"no"}))
      setAnswer_1((question_1)=>({...question_1, radio_3:"no"}))
      setAnswer_1((question_1)=>({...question_1, value:"1"}))
      setAnswer_1((question_1)=>({...question_1, disabled:false}))
      SetShowQuestion_1_2({showView:true});
      SetShowQuestion_4({showView:false});
      setAnswer_4({radio_1:"no"})
      setAnswer_4({radio_2:"no"})
      setAnswer_4({value:""})

    }
    else{
//nothing to do
    }
  }




  const check_survey_started_member_added=()=>{
    if(parseInt(props.items[13])===1){
      SetShowQuestion_1_2({showView:true});
      // SetShowQuestion_4({showView:false});
      // setAnswer_4({radio_1:"no"})
      // setAnswer_4({radio_2:"no"})
      // setAnswer_4({value:""})
      
      setAnswer_2((question_2)=>({...question_2, radio_1:"yes"}))
      setAnswer_2((question_2)=>({...question_2, radio_2:"no"}))
      setAnswer_2((question_2)=>({...question_2, value:"1"}))
      setAnswer_2((question_2)=>({...question_2, disabled:true}))
    }
    else if(parseInt(props.items[13])===2){
      SetShowQuestion_1_2({showView:true});
      // SetShowQuestion_4({showView:false});
      // setAnswer_4({radio_1:"no"})
      // setAnswer_4({radio_2:"no"})
      // setAnswer_4({value:""})
      
      setAnswer_2((question_2)=>({...question_2, radio_1:"no"}))
      setAnswer_2((question_2)=>({...question_2, radio_2:"no"}))
      setAnswer_2((question_2)=>({...question_2, value:""}))
      setAnswer_2((question_2)=>({...question_2, disabled:false}))
    }
    else{
      //do nothing
    }
  }




  const check_survey_started_member_updated=()=>{
    if(parseInt(props.items[14])===1){
      SetShowQuestion_1_2({showView:true});
      // SetShowQuestion_4({showView:false});
      // setAnswer_4({radio_1:"no"})
      // setAnswer_4({radio_2:"no"})
      // setAnswer_4({value:""})
      
      setAnswer_3((question_3)=>({...question_3, radio_1:"yes"}))
      setAnswer_3((question_3)=>({...question_3, radio_2:"no"}))
      setAnswer_3((question_3)=>({...question_3, value:"1"}))
      setAnswer_3((question_3)=>({...question_3, disabled:true}))
    }
    else if(parseInt(props.items[14])===2){
      SetShowQuestion_1_2({showView:true});
      // SetShowQuestion_4({showView:false});
      // setAnswer_4({radio_1:"no"})
      // setAnswer_4({radio_2:"no"})
      // setAnswer_4({value:""})
      
      setAnswer_3((question_3)=>({...question_3, radio_1:"no"}))
      setAnswer_3((question_3)=>({...question_3, radio_2:"no"}))
      setAnswer_3((question_3)=>({...question_3, value:""}))
      setAnswer_3((question_3)=>({...question_3, disabled:false}))
    }
    else{
      //do nothing
    }
  }
  

  
  useEffect(()=>{check_survey_started()},[]);
  useEffect(()=>{check_survey_started_member_added()},[]);
  useEffect(()=>{check_survey_started_member_updated()},[]);


  const surveyQuerstion_1=(clicked)=>{
    if(clicked==="yes"){

      setAnswer_1((question_1)=>({...question_1, radio_1:"yes"}))
      setAnswer_1((question_1)=>({...question_1, radio_2:"no"}))
      setAnswer_1((question_1)=>({...question_1, radio_3:"no"}))
      setAnswer_1((question_1)=>({...question_1, value:"1"}))
      SetShowQuestion_1_2({showView:true});
      SetShowQuestion_4({showView:false});
      setAnswer_4({radio_1:"no"})
      setAnswer_4({radio_2:"no"})
      setAnswer_4({value:""})

    }
    else if(clicked==="no"){
      setAnswer_1((question_1)=>({...question_1, radio_1:"no"}))
      setAnswer_1((question_1)=>({...question_1, radio_2:"yes"}))
      setAnswer_1((question_1)=>({...question_1, radio_3:"no"}))
      setAnswer_1((question_1)=>({...question_1, value:"2"}))
      SetShowQuestion_1_2({showView:false});
      setAnswer_2({radio_1:"no"})
      setAnswer_2({radio_2:"no"})
      setAnswer_2({value:""})

      setAnswer_3({radio_1:"no"})
      setAnswer_3({radio_2:"no"})
      setAnswer_3({value:""})
      SetShowQuestion_4({showView:false});
      setAnswer_4({radio_1:"no"})
      setAnswer_4({radio_2:"no"})
      setAnswer_4({value:""})
    }
    else if(clicked==="dk"){
      setAnswer_1((question_1)=>({...question_1, radio_1:"no"}))
      setAnswer_1((question_1)=>({...question_1, radio_2:"no"}))
      setAnswer_1((question_1)=>({...question_1, radio_3:"yes"}))
      setAnswer_1((question_1)=>({...question_1, value:"3"}))
      SetShowQuestion_1_2({showView:false});
      setAnswer_2({radio_1:"no"})
      setAnswer_2({radio_2:"no"})
      setAnswer_2({value:""})

      setAnswer_3({radio_1:"no"})
      setAnswer_3({radio_2:"no"})
      setAnswer_3({value:""})
      SetShowQuestion_4({showView:true});
    }
    else{
      setAnswer_1((question_1)=>({...question_1, radio_1:"no"}))
      setAnswer_1((question_1)=>({...question_1, radio_2:"no"}))
      setAnswer_1((question_1)=>({...question_1, radio_3:"no"}))
      setAnswer_1((question_1)=>({...question_1, value:""}))
      SetShowQuestion_1_2({showView:false});
      setAnswer_2({radio_1:"no"})
      setAnswer_2({radio_2:"no"})
      setAnswer_2({value:""})

      setAnswer_3({radio_1:"no"})
      setAnswer_3({radio_2:"no"})
      setAnswer_3({value:""})
      SetShowQuestion_4({showView:false});
      setAnswer_4({radio_1:"no"})
      setAnswer_4({radio_2:"no"})
      setAnswer_4({value:""})
    }
    
    

  }


  const add_member_form=()=>{
    Navigation.push(props.items[12],{
      component:{
        name:"Add_member",
        passProps:{
          name:props.items[0],
          userID:props.items[1],
          password:props.items[2],
          cluster:props.items[3],
          roundNo:props.items[4],
          block:props.items[5],
          villageCode:props.items[6],
          villageName:props.items[7],  
          bari:props.items[8],
          bariName:props.items[9],
          hh:props.items[10],
          hhName:props.items[11],
          MemberUpdateTracker:props.items[14]          

        },  
        options:{
          topBar:{
            visible:false,
            title:{
              text:"সদস্য নিবন্ধন"
            },
            rightButtons:[{
              // id:"backbutton",
              component:{
                name:"BackButton",
                passProps:{
                  originComponentId: props.items[12],
                  position:"Add_member",
                  backButtonText:"",
                  name:props.items[0],
                  userID:props.items[1],
                  password:props.items[2],
                  cluster:props.items[3],
                  roundNo:props.items[4],
                  block:props.items[5],
                  villageCode:props.items[6],
                  villageName:props.items[7],  
                  bari:props.items[8],
                  bariName:props.items[9],
                  hh:props.items[10],
                  hhName:props.items[11],
                  MemberUpdateTracker:props.items[14]          
  
                  
                }
              }
    
              
            }]
            
          }
        }
  
  
      }
    })
  }



  const member_update_form=()=>{
    Navigation.push(props.items[12],{
      component:{
        name:"Member_update",
        passProps:{
          name:props.items[0],
          userID:props.items[1],
          password:props.items[2],
          cluster:props.items[3],
          roundNo:props.items[4],
          block:props.items[5],
          villageCode:props.items[6],
          villageName:props.items[7],  
          bari:props.items[8],
          bariName:props.items[9],
          hh:props.items[10],
          hhName:props.items[11],
          toUpdate:"yes",
          MemberAddTracker:props.items[13]
        },  
        options:{
          topBar:{
            visible:false,
            title:{
              text:"সদস্য নিবন্ধন"
            },
            rightButtons:[{
              // id:"backbutton",
              component:{
                name:"BackButton",
                passProps:{
                  originComponentId: props.items[12],
                  position:"Add_member",
                  backButtonText:"",
                  name:props.items[0],
                  userID:props.items[1],
                  password:props.items[2],
                  cluster:props.items[3],
                  roundNo:props.items[4],
                  block:props.items[5],
                  villageCode:props.items[6],
                  villageName:props.items[7],  
                  bari:props.items[8],
                  bariName:props.items[9],
                  hh:props.items[10],
                  hhName:props.items[11]
  
                  
                }
              }
    
              
            }]
            
          }
        }
  
  
      }
    })
  }


  const surveyQuerstion_2=(clicked)=>{
    if(clicked==="yes"){
      setAnswer_2((question_2)=>({...question_2, radio_1:"yes"}))
      setAnswer_2((question_2)=>({...question_2, radio_2:"no"}))
      setAnswer_2((question_2)=>({...question_2, value:"1"}))

      add_member_form();

    }
    else if(clicked==="no"){
      setAnswer_2((question_2)=>({...question_2, radio_1:"no"}))
      setAnswer_2((question_2)=>({...question_2, radio_2:"yes"}))
      setAnswer_2((question_2)=>({...question_2, value:"2"}))
    }
    else{
      setAnswer_2((question_2)=>({...question_2, radio_1:"no"}))
      setAnswer_2((question_2)=>({...question_2, radio_2:"no"}))
      setAnswer_2((question_2)=>({...question_2, value:""}))
    }
    
    

  }


  
  const surveyQuerstion_3=(clicked)=>{
    if(clicked==="yes"){
      setAnswer_3((question_3)=>({...question_3, radio_1:"yes"}))
      setAnswer_3((question_3)=>({...question_3, radio_2:"no"}))
      setAnswer_3((question_3)=>({...question_3, value:"1"}))
      member_update_form();
    }
    else if(clicked==="no"){
      setAnswer_3((question_3)=>({...question_3, radio_1:"no"}))
      setAnswer_3((question_3)=>({...question_3, radio_2:"yes"}))
      setAnswer_3((question_3)=>({...question_3, value:"2"}))
    }
    else{
      setAnswer_3((question_3)=>({...question_3, radio_1:"no"}))
      setAnswer_3((question_3)=>({...question_3, radio_2:"no"}))
      setAnswer_3((question_3)=>({...question_3, value:""}))
    }
    
    

  }


  const surveyQuerstion_4=(clicked)=>{
    if(clicked==="yes"){
      setAnswer_4((question_4)=>({...question_4, radio_1:"yes"}))
      setAnswer_4((question_4)=>({...question_4, radio_2:"no"}))
      setAnswer_4((question_4)=>({...question_4, radio_3:"no"}))
      setAnswer_4((question_4)=>({...question_4, value:"1"}))
    }
    else if(clicked==="no"){
      setAnswer_4((question_4)=>({...question_4, radio_1:"no"}))
      setAnswer_4((question_4)=>({...question_4, radio_2:"yes"}))
      setAnswer_4((question_4)=>({...question_4, radio_3:"no"}))
      setAnswer_4((question_4)=>({...question_4, value:"2"}))
    }
    else if(clicked==="dk"){
      setAnswer_4((question_4)=>({...question_4, radio_1:"no"}))
      setAnswer_4((question_4)=>({...question_4, radio_2:"no"}))
      setAnswer_4((question_4)=>({...question_4, radio_3:"yes"}))
      setAnswer_4((question_4)=>({...question_4, value:"3"}))
    }
    else{
      setAnswer_4((question_4)=>({...question_4, radio_1:"no"}))
      setAnswer_4((question_4)=>({...question_4, radio_2:"no"}))
      setAnswer_4((question_4)=>({...question_4, radio_3:"no"}))
      setAnswer_4((question_4)=>({...question_4, value:""}))
    }
    
    

  }




 const check_save_survey = ()=>{
    var question_1_val = question_1.value;
    var question_2_val = question_2.value;
    var question_3_val = question_3.value;
    var question_4_val = question_4.value;

    if(question_1_val===""){
      Alert.alert("উপস্থিত","এই খানায় উত্তর দেয়ার মত কোন খানা সদস্য উপস্থিত আছেন কিনা? নিচের একটি অপশন নির্বাচন করুন।")
    }
    else if(question_1_val==="1" && question_2_val===""){
      Alert.alert("নতুন সদস্য","গত সার্ভেল্যান্স ভিজিটের পর থেকে আজ পর্যন্ত এই খানাতে কি কোন নতুন সদস্য/সদস্যা যোগ হয়েছে? হ্যাঁ বা না নির্বাচন করুন।")
    }
    else if(question_1_val==="1" && question_3_val===""){
      Alert.alert("অবস্থার পরিবর্তন","গত সার্ভেল্যান্স ভিজিটের পর থেকে আজ পর্যন্ত এই খানার কোন স্থায়ী সদস্য/সদস্যা কি মারা গিয়েছেন নতুবা বর্তমানে স্থায়ী ভাবে বসবাসের জন্য অন্যত্র চলে গিয়েছেন? হ্যাঁ বা না নির্বাচন করুন।")
    }
    else if(question_1_val==="2"){
      Alert.alert("নিশ্চিত করুন", "আপনার দেয়া তথ্য সব সঠিক থাকলে, ঠিক আছে বাটনে ক্লিক করে তথ্য সেভ করুন।",[{text:"সঠিক নয়", onPress:()=>""}, {text:"ঠিক আছে", onPress:()=>save_survey()}])
    }
    else if(question_1_val==="3" && question_4_val===""){
      Alert.alert("কারন","এই খানায় ভিজিট না করার সঠিক কারন নিচের অপশন থেকে একটি নির্বাচন করুন।")
    }
    else{
      Alert.alert("নিশ্চিত করুন", "আপনার দেয়া তথ্য সব সঠিক থাকলে, ঠিক আছে বাটনে ক্লিক করে তথ্য সেভ করুন।",[{text:"সঠিক নয়", onPress:()=>""}, {text:"ঠিক আছে", onPress:()=>save_survey()}])      
    }

 }




  const save_survey=()=>{
    var question_1_val = question_1.value;
    var question_2_val = question_2.value;
    var question_3_val = question_3.value;
    var question_4_val = question_4.value;

    
    var userID = props.items[1];
    var cluster = props.items[3];
    var roundNo = props.items[4];
    var block = props.items[5];
    var villageCode = props.items[6];
    var bari = props.items[8];
    var hh = props.items[10];





    db.transaction(tx=>{
      tx.executeSql(
      "insert or ignore into survey ( "+
      "member_present, "+
      "surveyNo, "+
      "cluster, "+
      "block, "+
      "village, "+
      "bari, "+
      "hh, "+
      "surveyDate, "+
      "Q1_NewMember, "+
      "Q2_MemberUpdate, "+
      "nextSurvey_StartDate, "+
      "nextSurvey_EndDate, "+
      "lat, "+
      "lon, "+
      "survey_not_done, "+
      "Entry_Date, "+
      "UserID) values("+
      "'"+question_1_val+"',"+
      "'"+roundNo+"',"+
      "'"+cluster+"',"+
      "'"+block+"',"+
      "'"+villageCode+"',"+
      "'"+bari+"',"+
      "'"+hh+"',"+
      "'"+moment().format('YYYY-MM-DD')+"',"+
      "'"+question_2_val+"',"+
      "'"+question_3_val+"',"+
      "date('now','localtime', '53 day'),"+
      "date('now','localtime', '68 day'),"+ // its count from 67 days
      "'' ,"+
      "'' ,"+
      "'"+question_4_val+"',"+
      "'"+moment().format('YYYY-MM-DD HH:mm:ss')+"',"+
      "'"+userID+"' "+")",
      [],
      (tx, result)=>{
        if(result.rowsAffected>0){         
          if(parseInt(question_1_val)===1) {
            Alert.alert("ডাটা সেভ", "ধন্যবাদ, আপনার দেয়া তথ্য এবং খানা সার্ভের প্রথম ধাপ সফলভাবে সেভ হয়েছে। এখন এই খানায় যদি কোন MWRA থাকেন, তাহলে MWRA সার্ভে ভিজিট সম্পূর্ণ করতে হবে। এখন (ঠিক আছে) বাটনে ক্লিক করুন, যদি কোন MWRA থাকেন, তাহলে MWRA লিস্ট দেখতে পাবেন। ",[{text:"ঠিক আছে", onPress:props.checkMwraExistance}]);
            save_into_member_survey();
          }else{
            Alert.alert("ডাটা সেভ", "ধন্যবাদ, আপনার দেয়া তথ্য এবং খানা সার্ভে সেভ হয়েছে। যেহেতু এই সার্ভের ভিজিট সম্পূর্ণ হয়নি, তাই MWRA কোন ভিজিট দেয়া প্রয়োজন নেই। (ঠিক আছে) বাটনে ক্লিক করে, খানা লিস্টে চলে যান।",[{text:"ঠিক আছে", onPress:props.back_to_hh}]);
            save_into_member_survey();
          }
          
        }        
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });

  }





  const save_into_member_survey=()=>{
    console.log("function access");

    db.transaction(tx=>{
      tx.executeSql(
      "insert OR IGNORE into member_survey "+
       "(Round_No,"+
       "Mem_SL,"+
       "Visit_Date,"+
       "Visit_Time,"+
       "Cluster,"+
       "Block,"+
       "Mem_Line_No,"+
       "Mem_PID,"+
       "MCID,"+
       "Village_Code,"+
       "Bari_Code,"+
       "HH_Code,"+
       "Mem_Name,"+
       "Mem_Sex,"+
       "Mem_DOB,"+
       "Mem_Age,"+
       "Marital_Status,"+
       "Mar_Date,"+
       "Mar_Age,"+
       "High_Edu,"+
       "Main_Occupation,"+
       "Rel_HH,"+
       "Mother_Line,"+
       "Mother_Name,"+
       "Father_Line,"+
       "Father_Name,"+
       "Hus_Wife_Line,"+
       "Hus_Wife_Name,"+
       "Mobile,"+
       "Mem_Cstatus,"+
       "Mem_Icon,"+
       "statusCngOn,"+
       "is_MWRA,"+
       "Mem_Enroll_Type,"+
       "Reg_Date,"+
       "Entry_UserID) select "+props.items[4]+", "+
       "Mem_SL,"+
       "date('now','localtime'),"+
       "strftime('%H:%M','now','localtime'),"+
       "Cluster,"+
       "Block,"+
       "Mem_Line_No,"+
       "Mem_PID,"+
       "MCID,"+
       "Village_Code,"+
       "Bari_Code,"+
       "HH_Code,"+
       "Mem_Name,"+
       "Mem_Sex,"+
       "Mem_DOB,"+
       "Mem_Age,"+
       "Marital_Status,"+
       "Mar_Date,"+
       "Mar_Age,"+
       "High_Edu,"+
       "Main_Occupation,"+
       "Rel_HH,"+
       "Mother_Line,"+
       "Mother_Name,"+
       "Father_Line,"+
       "Father_Name,"+
       "Hus_Wife_Line,"+
       "Hus_Wife_Name,"+
       "Mobile,"+
       "Mem_Cstatus,"+
       "Mem_Icon,"+
       "statusCngOn,"+
       "is_MWRA,"+
       "Mem_Enroll_Type,"+
       "Reg_Date, "+props.items[1]+" from member where Village_Code = '"+props.items[6]+"' and Bari_Code = '"+props.items[8]+"' and HH_Code = '"+props.items[10]+"' ",
      [],
      (tx, result)=>{
        console.log("query access");
        if(result.rowsAffected>0){          
            console.log("saved to member survey");
        }        
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });


  }





  
  



  return (
<View style={{height:"100%", width:"100%", alignItems:"center", backgroundColor:"transparent"}}>
      
      <View style={{height:"80%", width:"98%", borderRadius:5, padding:10, marginTop:"2%", alignItems:"center"}}>

            <View style={{height:"auto", width:"100%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                খানা সার্ভে                
              </Text>
              
              <Text style={{fontSize:12, color:"#404040"}}>
                  বিঃদ্রঃ খানায় ভিজিট দেয়ার পূর্বে, উপরের তথ্য মিলিয়ে নিন। আপনি যদি নিশ্চিত হন, আপনি সঠিক খানায় আছেন, তখন প্রস্নের সঠিক উত্তর দিয়ে সার্ভে ভিজিট করুন।
              </Text>
            </View>    

          <View style={{height:"24%", width:"100%", marginTop:"1%"}}>
            <QuestionContainer 
            question = {"এই খানায় উত্তর দেয়ার মত কোন খানা সদস্য উপস্থিত আছেন কিনা?"}
            radio_1 = {<View style={{width:"80%"}}><RadioButton disabled={question_1.disabled} callFunction={surveyQuerstion_1.bind(this,"yes")} Value={question_1.radio_1} title={"হ্যাঁ, এই খানায় উত্তর দেয়ার মত সদস্য আছেন"}/></View>}
            radio_2 = {<View style={{width:"80%"}}><RadioButton disabled={question_1.disabled} callFunction={surveyQuerstion_1.bind(this,"no")} Value={question_1.radio_2} title={"না, বর্তমানে এই খানায় উত্তর দেয়ার মত কোন সদস্য উপস্থিত নেই"}/></View>}
            radio_3 = {<View style={{width:"80%"}}><RadioButton disabled={question_1.disabled} callFunction={surveyQuerstion_1.bind(this,"dk")} Value={question_1.radio_3} title={"এই খানায় আজকে কোন ভিজিট দেয়া সম্ভব হইনি"}/></View>}
            direction={"column"}
            />          
            
            
          </View>



          
          {showQuestion_1_2.showView &&(  
          <View style={{height:"12%", width:"100%", marginTop:"1%"}}>
            <QuestionContainer 
            question = {"১। গত সার্ভেল্যান্স ভিজিটের পর থেকে আজ পর্যন্ত এই খানাতে কি কোন নতুন সদস্য/সদস্যা যোগ হয়েছে?"}
            radio_1 = {<View style={{width:"20%"}}><RadioButton disabled={question_2.disabled} callFunction={surveyQuerstion_2.bind(this,"yes")} Value={question_2.radio_1} title={"হ্যাঁ"}/></View>}
            radio_2 = {<View style={{width:"20%"}}><RadioButton disabled={question_2.disabled} callFunction={surveyQuerstion_2.bind(this,"no")} Value={question_2.radio_2} title={"না"}/></View>}
            direction={"row"}
            /> 
            
            
            
          </View>)}

        {showQuestion_1_2.showView &&(
          <View style={{height:"15%", width:"100%", marginTop:"1%"}}>
            <QuestionContainer 
            question = {"২। গত সার্ভেল্যান্স ভিজিটের পর থেকে আজ পর্যন্ত এই খানার কোন স্থায়ী সদস্য/সদস্যা কি মারা গিয়েছেন নতুবা বর্তমানে স্থায়ী ভাবে বসবাসের জন্য অন্যত্র চলে গিয়েছেন?"}
            radio_1 = {<View style={{width:"20%"}}><RadioButton disabled={question_3.disabled} callFunction={surveyQuerstion_3.bind(this,"yes")} Value={question_3.radio_1} title={"হ্যাঁ"}/></View>}
            radio_2 = {<View style={{width:"20%"}}><RadioButton disabled={question_3.disabled} callFunction={surveyQuerstion_3.bind(this,"no")} Value={question_3.radio_2} title={"না"}/></View>}
            direction={"row"}
            />       
             
             
          </View>
          
          )} 


{showQuestion_4.showView &&(
          <View style={{height:"26%", width:"100%", marginTop:"1%"}}>
            <QuestionContainer 
            question = {"এই খানায় ভিজিট না করার সঠিক কারন নিচের অপশন থেকে একটি নির্বাচন করুন।"}
            radio_1 = {<View style={{width:"40%"}}><RadioButton disabled={question_4.disabled} callFunction={surveyQuerstion_4.bind(this,"yes")} Value={question_4.radio_1} title={"প্রাকৃতিক দুর্যোগ"}/></View>}
            radio_2 = {<View style={{width:"40%"}}><RadioButton disabled={question_4.disabled} callFunction={surveyQuerstion_4.bind(this,"no")} Value={question_4.radio_2} title={"রাজনৈতিক কর্মসূচি"}/></View>}
            radio_3 = {<View style={{width:"40%"}}><RadioButton disabled={question_4.disabled} callFunction={surveyQuerstion_4.bind(this,"dk")} Value={question_4.radio_3} title={"প্যানডেমিক"}/></View>}
            direction={"column"}
            />     

        <Text>
          
        </Text>
            
          </View>)}







          <View style={{width:"20%", marginTop:"3%"}}><CRUD_button callFunction={check_save_survey} title={"ডাটা সেভ"} radious={30}/></View>

      </View>    

</View>
  )
}

export default Survey_question;
