import React, { useRef, useEffect, useState } from 'react'
import { ScrollView, Animated, StyleSheet, View, Text, FlatList, Alert, Image, ActivityIndicator, TouchableHighlight, Touchable, TouchableOpacity, Modal, ImageBackground } from 'react-native'
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
import DropDown from '../components/DropDown';
import InputField from '../components/InputField';
import CRUD_button from '../components/CRUD_button';
import { check_mwra_existance } from '../components/check_mwra_existance';
import { passValueToSidebar } from '../components/SideBar_values';



const db = openDatabase(
  {
    name: 'prf.db',
    location: 'default',
    //createFromLocation:"/storage/emulated/0/103_prf.db"
  },
  ()=>{console.log("Database OK.....")},
  error=>{Alert.alert("Database ERROR!!!!!!")}
  );




const MWRA_Survey_question = (props) => {


  useEffect(()=>{
    passValueToSidebar(props.userID, false, props.componentId);
  },[]);

    // {props.name        }
    // {props.userID}
    // {props.password}
    // {props.cluster     }
    // {props.roundNo     }
    // {props.blockprops  }
    // {props.villageCode }
    // {props.villageName }
    // {props.bari        }
    // {props.bariName    }
    // {props.hh          }
    // {props.hhName      }
    // {props.componentId }
    // {props.MemberAddTracker}
    // {props.MemberUpdateTracker}
    // {props.mwraVisit   }
    // {props.selected_Mem_SL}
    // {props.selected_Mem_PID}
    // {props.FormattedMPID}
    // {props.FormattedMCID}
    // {props.MWRA_name}
    // {props.MWRA_dobFormatted}
    // {props.MWRA_dob}
    // {props.MWRA_spouse}
    // {props.MWRA_lastVisit}
    // {props.MWRA_pregnancyStatus}
    // {props.MWRA_LMP}
    // {props.MWRA_MeritalStatus}
    //{props.MWRA_pregnancyValue}
    // MWRA_MeritalStatusValue
    // MWRA_Pregnancy_identified_by
    // MWRA_PregnancyNo_MWRA
    // selected_Mem_CID
    // Spouse_MPID


    const[surveyNo, setSurveyNo] = useState("");


    const get_survey_no = ()=>{


      db.transaction(tx=>{
        tx.executeSql(
        "select (max(cast(surveyNo as INT))+1)'SurveyNo' from MWRA_Survey "+
        "WHERE "+
        "pid = '"+props.selected_Mem_PID+"' ",
        [],
        (tx, result)=>{
          
        var length = result.rows.length;    
        if(length>0){
                for(let i= 0; i<length; i++){        
                  setSurveyNo(result.rows.item(i).SurveyNo===null || result.rows.item(i).SurveyNo==="" ? "1" : result.rows.item(i).SurveyNo);
                }
              }
              else{
                setSurveyNo("1");
                }
    
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });

        console.log(surveyNo);
      
    }




    const[visitOutcomeValue, setVisitOutcomeValue] = useState([]);

    const VisitOutcomeValue=()=>{
      if(props.byPass===true){
        setVisitOutcomeValue([
          {label: "উপস্থিত", value : "1"}
        ]);
      }
      else{
        setVisitOutcomeValue([
          {label: "উপস্থিত", value : "1"},
          {label: "অনুপস্থিত", value : "2"},
          {label: "আজকের ভিজিটের সম্মতি দেয়নি", value : "3"},
        ]);
      }
    }

    useEffect(()=>{
      VisitOutcomeValue();
    },[]);
    
    // const visitOutcomeValue = [ 
    //   {label: "উপস্থিত", value : "1"},
    //   {label: "অনুপস্থিত", value : "2"},
    //   {label: "আজকের ভিজিটের সম্মতি দেয়নি", value : "3"},
    // ];


    const [MeritalStatusValue, setMeritalStatusValue] = useState([]);




    // const MeritalStatusValue = [ 
    //   {label: "বর্তমানে বিবাহিতা", value : "1"},
    //   {label: "বিধবা", value : "3"}
    // ];



    const [PregnancyStatusValue, setPregnancyStatusValue] = useState([]);

    // const PregnancyStatusValue = [ 
    //   {label: "মাসিক চলছে", value : "1"},
    //   {label: "নিয়মিত মাসিক এখন বন্ধ আছে", value : "2"},
    //   {label: "মাসিক অনিয়মিত/ জন্ম বিরতিকরন পদ্ধতি ব্যাবহারের জন্য মাসিক বন্ধ আছে", value : "3"},
    //   {label: "গর্ভবতী হিসাবে সনাক্ত", value : "4"},
    //   {label: "গর্ভের ফলাফল জানা গিয়েছে", value : "5"},
    //   {label: "মাসিক একেবারে বন্ধ(Menopause)", value : "6"}
    // ];


    const[statusChangedOnContainer, setStatusChangedOnContainer] = useState(false);

    const[ifPregnant, setIfPregnant] = useState(false);
    const[ifMeritalStatusChnage, setIfMeritalStatusChnage] = useState(false);
    const[ifVisitSuccess, setIfVisitSuccess] = useState(false);
    const[ifMeritalStatusOK, setIfMeritalStatusOK] = useState(false);


    const[pregnancyIdentifiedByValues, setPregnancyIdentifiedByValues] = useState([]);

    const statusChange_onConfirm=(changedOn)=>{
  
      if(statusChangedOnCheck=="" && statusChangedOn==""){
        setStatusChangedOnCheck(moment(changedOn).format("MMM DD, YYYY"))    
        Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{setStatusChangedOnContainer(true)}}])
      }
      else if(statusChangedOnCheck!=="" && statusChangedOn=="" && statusChangedOnCheck!=(moment(changedOn).format("MMM DD, YYYY"))){    
        Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+statusChangedOnCheck+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(changedOn).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{setStatusChangedOnContainer(true)}}])    
        setStatusChangedOn("");
        setStatusChangedOnCheck(""); 
      }else{



        if(moment(moment(changedOn).format("YYYY-MM-DD")).isBefore(moment(moment(props.MWRA_lastVisit, "MMM DD,YYYY").format("YYYY-MM-DD")))){
          Alert.alert("এন্ট্রি ভুল","ডাটাবেজ অনুযায়ী সর্বশেষ ভিজিট "+props.MWRA_lastVisit+" তারিখ এবং আপনার এন্ট্রি করা বৈবাহিক অবস্থা পরিবর্তনের তারিখ "+moment(changedOn).format("MMM DD, YYYY")+"। তাই বর্তমান বৈবাহিক অবস্থা পরিবর্তনের তারিখ, সর্বশেষ ভিজিট থেকে কম হবে না।" ,[{text:"ঠিক আছে", onPress:()=>{setStatusChangedOnContainer(true)}}])    
          setStatusChangedOn("");
        setStatusChangedOnCheck(""); 
        }else{
          setStatusChangedOn(moment(changedOn).format("MMM DD, YYYY")) 
        }


        
        
      }
      
    }


    const statusChangedOnChecker=()=>{
      if(statusChangedOn!="" && statusChangedOnCheck!=""){
        setStatusChangedOn("");
        setStatusChangedOnCheck("");
        setStatusChangedOnContainer(true);    
       }
      else if(statusChangedOn=="" && statusChangedOnCheck==""){
        setStatusChangedOnContainer(true);    
    }
    else if(statusChangedOn!="" && statusChangedOnCheck==""){
      Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{setStatusChangedOnContainer(true)}}])
    }
    else{
      // do nothing
    }
    
    }
    


    const[LMPContainer, setLMPContainer] = useState(false);


    const LMP_onConfirm=(changedOn)=>{
  
      if(LMPDateOnCheck=="" && LMPDateOn==""){
        setLMPDateOnCheck(moment(changedOn).format("MMM DD, YYYY"))    
        Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{setLMPContainer(true)}}])
      }
      else if(LMPDateOnCheck!=="" && LMPDateOn=="" && LMPDateOnCheck!=(moment(changedOn).format("MMM DD, YYYY"))){    
        Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+LMPDateOnCheck+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(changedOn).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{setLMPContainer(true)}}])    
        setLMPDateOn("");
        setLMPDateOnCheck(""); 
      }else{
        // moment(props.MWRA_LMP, "MMM DD,YYYY").format("YYYY-MM-DD")
        if(moment(props.MWRA_LMP, "MMM DD,YYYY").isValid() && props.MWRA_LMP!=="" && props.MWRA_LMP!==null && moment(moment(changedOn).format("YYYY-MM-DD")).isBefore(moment(moment(props.MWRA_LMP, "MMM DD,YYYY").format("YYYY-MM-DD")))){
          Alert.alert("এন্ট্রি ভুল","ডাটাবেজ অনুযায়ী সর্বশেষ LMP "+props.MWRA_LMP+" তারিখ এবং আপনার এন্ট্রি করা LMP "+moment(changedOn).format("MMM DD, YYYY")+" তারিখ। তাই বর্তমান LMP তারিখ, সর্বশেষ LMP থেকে কম হবে না।" ,[{text:"ঠিক আছে", onPress:()=>{setLMPContainer(true)}}])    
          setLMPDateOn("");
          setLMPDateOnCheck(""); 
        }else{
        setLMPDateOn(moment(changedOn).format("MMM DD, YYYY")) 
        // getEdd(changedOn);
        }

        
        
      }
      
    }


    const LMPDateOnChecker=()=>{
      if(LMPDateOn!="" && LMPDateOnCheck!=""){
        setLMPDateOn("");
        setLMPDateOnCheck("");
        setLMPContainer(true);    
       }
      else if(LMPDateOn=="" && LMPDateOnCheck==""){
        setLMPContainer(true);    
    }
    else if(LMPDateOn!="" && LMPDateOnCheck==""){
      Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{setLMPContainer(true)}}])
    }
    else{
      // do nothing
    }
    
    }

    

    const[visitOutcome, setVisitOutcome] = useState("");
    const[meritalStatus, setMeritalStatus] = useState("");

    const[statusChangedOn, setStatusChangedOn] = useState("");
    const[statusChangedOnCheck, setStatusChangedOnCheck] = useState("");
    const[pregnancyStatus, sePregnancyStatus] = useState("");

    const[LMPDateOn, setLMPDateOn] = useState("");
    const[LMPDateOnCheck, setLMPDateOnCheck] = useState("");
    const[pregnancyNo, setPregnancyNo] = useState("");
    const[pregnancyWeek, setPregnancyWeek]=useState("");
    const[pregnancyNoDB, setPregnancyNoDB]=useState("");
    const[pregnancyEDD, setPregnancyEDD] = useState("");
    const[pregnancyLastOutcomeDate, setPregnancyLastOutcomeDate] = useState("");
    const[pregnancyIdentifiedBy, setPregnancyIdentifiedBy] =useState("");




    const check_visit_outcome=()=>{      
      if(visitOutcome==="1"){
        setIfVisitSuccess(true);
      }else{
        setIfVisitSuccess(false);
        setIfMeritalStatusOK(false);

                
        setMeritalStatus("");
        setStatusChangedOn("");
        setStatusChangedOnCheck("");
        sePregnancyStatus("");
        setLMPDateOn("");
        setLMPDateOnCheck("");
        setPregnancyNo("");
        setPregnancyWeek("");
        setPregnancyNoDB("");
        setPregnancyEDD("");
        setPregnancyLastOutcomeDate("");
        setPregnancyIdentifiedBy("");

      }
    }

    useEffect(()=>{
      check_visit_outcome();
    },[visitOutcome])


    const check_meritalStatus_outcome=()=>{
      if(meritalStatus==="1"){
        setIfMeritalStatusOK(true);
        setIfMeritalStatusChnage(false);
        setStatusChangedOn("");
        setStatusChangedOnCheck("");
      }      
      else if(meritalStatus==="3" && props.MWRA_pregnancyValue==="4"){
        setIfMeritalStatusOK(true);
        setIfMeritalStatusChnage(false);
        setStatusChangedOn("");
        setStatusChangedOnCheck("");

      }
      else if(meritalStatus==="3" && props.MWRA_pregnancyValue!=="4"){
        setIfMeritalStatusOK(false);
        setIfMeritalStatusChnage(true);

        sePregnancyStatus("");
        setLMPDateOn("");
        setLMPDateOnCheck("");
        setPregnancyNo("");
        setPregnancyWeek("");
        setPregnancyNoDB("");
        setPregnancyEDD("");
        setPregnancyLastOutcomeDate("");
        setPregnancyIdentifiedBy("");
      }else{
        //none
      }
    }


    

    useEffect(()=>{
      check_meritalStatus_outcome();
    },[meritalStatus])




    const check_pregnancyStatus_outcome=()=>{
      
      if(pregnancyStatus==="2" || pregnancyStatus==="3" || pregnancyStatus==="6" || pregnancyStatus==="7"){
        
        if(moment(props.MWRA_LMP, "MMM DD, YYYY").isValid()){
          setLMPDateOnCheck(props.MWRA_LMP);
          setLMPDateOn(props.MWRA_LMP);
        }else{
          setLMPDateOnCheck(props.MWRA_LMP);
          setLMPDateOn(props.MWRA_LMP);
        }
        

        setStatusChangedOn("");
        setStatusChangedOnCheck("");
        setIfPregnant(false);        
        setPregnancyNo("");
        setPregnancyWeek("");
        setPregnancyNoDB("");
        setPregnancyEDD("");
        setPregnancyLastOutcomeDate("");
        setPregnancyIdentifiedBy("");
      }
      else if(pregnancyStatus==="4" || pregnancyStatus==="5"){
        setIfPregnant(true);        
        
        if(moment(props.MWRA_LMP, "MMM DD, YYYY").isValid()){
          setLMPDateOnCheck(props.MWRA_LMP);
          setLMPDateOn(props.MWRA_LMP);
        }else{
          setLMPDateOnCheck("");
          setLMPDateOn("");
        }

        setPregnancyNo(props.MWRA_PregnancyNo_MWRA);
                
      }else{
        setStatusChangedOn("");
        setStatusChangedOnCheck("");
        setIfPregnant(false);
        setLMPDateOn("");
        setLMPDateOnCheck("");
        setPregnancyNo("");
        setPregnancyWeek("");
        setPregnancyNoDB("");
        setPregnancyEDD("");
        setPregnancyLastOutcomeDate("");
        setPregnancyIdentifiedBy("");
      }
    }

    useEffect(()=>{
      check_pregnancyStatus_outcome();
    },[pregnancyStatus])


  const getEdd=(lmp)=>{
    if((pregnancyStatus==="4" || pregnancyStatus==="5") && LMPDateOn!="" && moment(LMPDateOn, "MMM DD,YYYY").isValid()){
      // console.log(lmp);
        setPregnancyEDD(moment(moment(moment(lmp)).add(280,"days")).format("MMM DD, YYYY"));
        var finalGA = ((moment().valueOf()-moment(lmp).valueOf())/86400000).toFixed(0);
        var finalWeek = ((finalGA)/7).toString().split(".")[0];
        var finalDay = (((finalGA))%7).toString().split(".")[0];

        setPregnancyWeek(finalWeek);

    }
  }

  useEffect(()=>{
    getEdd(moment(LMPDateOn, "MMM DD, YYYY").format("YYYY-MM-DD"));
  },[LMPDateOn,pregnancyStatus])


const get_pregnancy_no_from_db = ()=>{

  if(pregnancyStatus==="4" || pregnancyStatus==="5"){
  db.transaction(tx=>{
    tx.executeSql(
    "select max(Preg_SL)'pregNo', max(Del_Date)'DelDate' from Preg_Outcome_Mother where Mem_PID ='"+props.selected_Mem_PID+"' ",
    [],
    (tx, result)=>{
      
    var length = result.rows.length;    
    if(length>0){
            for(let i= 0; i<length; i++){        
              if(result.rows.item(i).pregNo==null || result.rows.item(i).pregNo==""  || result.rows.item(i).pregNo=="null"){
                setPregnancyNoDB("1");
                setPregnancyLastOutcomeDate("কোন রেকর্ড নেই");    
              } else{   
              setPregnancyNoDB((parseInt(result.rows.item(i).pregNo)+1).toString());      
              setPregnancyLastOutcomeDate(moment(result.rows.item(i).DelDate).isValid() ?  moment(result.rows.item(i).DelDate).format("MMM DD, YYYY") : "কোন রেকর্ড নেই");
            }
              // console.log(length+" "+result.rows.item(i).DelDate);

            }
          }
          else{
            setPregnancyNoDB("1");
            setPregnancyLastOutcomeDate("কোন রেকর্ড নেই");    
            }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
  }
}

useEffect(()=>{
  get_pregnancy_no_from_db();
},[LMPDateOn, pregnancyStatus])



const create_options_pregnancy_identyfied_by = ()=>{  
  var results=[];
  setPregnancyIdentifiedBy("");
  console.log(pregnancyStatus+" out "+pregnancyWeek);
  if((pregnancyStatus ==="4" || pregnancyStatus==="5") && pregnancyWeek!==""){

    if(props.MWRA_Pregnancy_identified_by==="" || props.MWRA_Pregnancy_identified_by===null || props.MWRA_Pregnancy_identified_by==="null"){
    if(parseInt(pregnancyWeek)<8){      
      setPregnancyIdentifiedByValues([{item:"প্রেগন্যান্সি টেস্টের মাধ্যমে", value:"1"},{item:"আলট্রাসাউন্ড টেস্টের মাধ্যমে", value:"2"}]);            
    }else{      
      setPregnancyIdentifiedByValues([{item:"প্রেগন্যান্সি টেস্টের মাধ্যমে", value:"1"},{item:"আলট্রাসাউন্ড টেস্টের মাধ্যমে", value:"2"},{item:"LMP ম্যাথডের মাধ্যমে", value:"3"}]);      
    }
  }else{
    if(props.MWRA_Pregnancy_identified_by==="1"){
      setPregnancyIdentifiedByValues([{item:"প্রেগন্যান্সি টেস্টের মাধ্যমে", value:"1"}]);
      setPregnancyIdentifiedBy("1")
    }
    else if(props.MWRA_Pregnancy_identified_by==="2"){
      setPregnancyIdentifiedByValues([{item:"আলট্রাসাউন্ড টেস্টের মাধ্যমে", value:"2"}]);      
      setPregnancyIdentifiedBy("2")
    }
    else if(props.MWRA_Pregnancy_identified_by==="3"){
      setPregnancyIdentifiedByValues([{item:"LMP ম্যাথডের মাধ্যমে", value:"3"}]);      
      setPregnancyIdentifiedBy("3")
    }else{
      setPregnancyIdentifiedByValues([{item:"প্রেগন্যান্সি টেস্টের মাধ্যমে", value:"1"},{item:"আলট্রাসাউন্ড টেস্টের মাধ্যমে", value:"2"},{item:"LMP ম্যাথডের মাধ্যমে", value:"3"}]);      
    }

  }

    
  }else{
    setPregnancyIdentifiedByValues([]);
    setPregnancyIdentifiedBy("");
  }

  // setPregnancyIdentifiedByValues(results);
}


useEffect(()=>{
  create_options_pregnancy_identyfied_by();
},[pregnancyStatus, pregnancyWeek, LMPDateOn])




const set_pregnancy_status_options=()=>{
  // console.log("----"+props.MWRA_Menopause);
  // console.log(props.MWRA_pregnancyValue);
  if(props.byPass===true){
    setPregnancyStatusValue([{label:"গর্ভের ফলাফল জানা গিয়েছে", value:"5"}]);      
  }
  else if(props.MWRA_pregnancyValue ==='4'){
    setPregnancyStatusValue([{label:"বর্তমানে গর্ভবতী", value:"4"},{label:"গর্ভের ফলাফল জানা গিয়েছে", value:"5"}]);      
  }  
  else if(props.MWRA_pregnancyValue ==='5' || props.MWRA_pregnancyValue ==='7' ){
    setPregnancyStatusValue([
      {label: "সর্বশেষ গর্ভধারণের ফলাফলের পর এখনও মাসিক শুরু হইনি", value : "7"},
      {label: "মাসিক চলছে", value : "1"},
      {label: "নিয়মিত মাসিক এখন বন্ধ আছে", value : "2"},
      {label: "মাসিক অনিয়মিত/ জন্ম বিরতিকরন পদ্ধতি ব্যাবহারের জন্য মাসিক বন্ধ আছে", value : "3"},
      {label: "গর্ভবতী হিসাবে সনাক্ত", value : "4"}
    ]);      
  }
  else if(props.MWRA_Menopause==="yes"){
    setPregnancyStatusValue([
      {label: "মাসিক একেবারে বন্ধ(Menopause)", value : "6"},
      {label: "মাসিক চলছে", value : "1"},
      {label: "নিয়মিত মাসিক এখন বন্ধ আছে", value : "2"},
      {label: "মাসিক অনিয়মিত/ জন্ম বিরতিকরন পদ্ধতি ব্যাবহারের জন্য মাসিক বন্ধ আছে", value : "3"},
      {label: "গর্ভবতী হিসাবে সনাক্ত", value : "4"}    
    ]);      
  } 
  else{
    setPregnancyStatusValue([
      {label: "মাসিক চলছে", value : "1"},
      {label: "নিয়মিত মাসিক এখন বন্ধ আছে", value : "2"},
      {label: "মাসিক অনিয়মিত/ জন্ম বিরতিকরন পদ্ধতি ব্যাবহারের জন্য মাসিক বন্ধ আছে", value : "3"},
      {label: "গর্ভবতী হিসাবে সনাক্ত", value : "4"}
    ]);      
  }
}


useEffect(()=>{
  set_pregnancy_status_options();
},[meritalStatus])




const if_pregnant_set_meritalStatus_values=()=>{
  if(props.MWRA_MeritalStatusValue==="3" && props.MWRA_pregnancyValue==="4" && visitOutcome==="1"){
    setMeritalStatusValue([{label:"বিধবা", value:"3"}]);
    setMeritalStatus("3");
  }
  else{
    setMeritalStatusValue([{label: "বর্তমানে বিবাহিতা", value : "1"}, {label:"বিধবা", value:"3"}]);
  }
}

useEffect(()=>{
  if_pregnant_set_meritalStatus_values();
},[visitOutcome])









const check_before_save=()=>{

  var dateDiff_Between_Today_LMP = LMPDateOn!=="" && moment(LMPDateOn, "MMM DD, YYYY").isValid() ? moment().diff((moment(LMPDateOn,"MMM DD, YYYY")),"days") : "" ;

  if(visitOutcome===""){
    Alert.alert("উপস্থিতি","MWRA কি উপস্থিত আছেন, সঠিক অপশনটি নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(parseInt(visitOutcome)>1){
    Alert.alert("MWRA সার্ভে", "আপনার দেয়া সব তথ্য সঠিক থাকলে, (MWRA সার্ভে সেভ) বাটনে ক্লিক করুন।",[{text:"না, তথ্য সঠিক নয়", onPress:()=>""},{text:"MWRA সার্ভে সেভ", onPress:()=>save_MWRA_survey()}])
  }
  else if(visitOutcome === "1" && meritalStatus===""){
    Alert.alert("বৈবাহিক অবস্থা","MWRA এর সঠিক বৈবাহিক অবস্থা নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(visitOutcome === "1" && meritalStatus==="3" && props.MWRA_pregnancyValue!=="4" && statusChangedOn===""){
    Alert.alert("বৈবাহিক অবস্থা পরিবর্তন","MWRA এর বৈবাহিক অবস্থা পরিবর্তনের সঠিক তারিখ নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(visitOutcome === "1" && meritalStatus==="3" && props.MWRA_pregnancyValue!=="4" && statusChangedOn!==""){
    // Alert.alert("save and update member/member survey table");
    Alert.alert("MWRA সার্ভে", "আপনার দেয়া সব তথ্য সঠিক থাকলে, (MWRA সার্ভে সেভ) বাটনে ক্লিক করুন।",[{text:"না, তথ্য সঠিক নয়", onPress:()=>""},{text:"MWRA সার্ভে সেভ", onPress:()=>save_MWRA_survey()}])
  }  
  else if(visitOutcome === "1" && (meritalStatus==="1" || meritalStatus==="3") && props.MWRA_pregnancyValue==="4" && pregnancyStatus===""){
    Alert.alert("গর্ভ/মাসিকের অবস্থা","MWRA এর সঠিক গর্ভ/মাসিকের অবস্থা নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(visitOutcome === "1" && meritalStatus==="1" && pregnancyStatus===""){
    Alert.alert("গর্ভ/মাসিকের অবস্থা","MWRA এর সঠিক গর্ভ/মাসিকের অবস্থা নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(visitOutcome==="1" && (meritalStatus==="1" || (meritalStatus==="3" && props.MWRA_pregnancyValue==="4")) && LMPDateOn===""){
    Alert.alert("LMP","সঠিক LMP তারিখ নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(visitOutcome==="1" && props.MWRA_pregnancyValue==="4" && parseInt(pregnancyWeek)>48){
    Alert.alert("গর্ভের সপ্তাহ","LMP তথ্য অনুযায়ী, বর্তমান গর্ভের সপ্তাহ, ৪৮ সপ্তাহের বেশি আছে। তাই ডাটা অনুযায়ী এটি ভুল তথ্য। তাই সঠিক LMP অথবা সঠিক গর্ভ/মাসিকের অবস্থা নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(visitOutcome==="1" && pregnancyStatus ==="1" && parseInt(dateDiff_Between_Today_LMP)>=36){
    Alert.alert("গর্ভ/মাসিকের অবস্থা","LMP তারিখ থেকে আজকের তারিকের মধ্যে "+dateDiff_Between_Today_LMP+" দিনের পার্থক্য আছে। তাই সঠিক LMP অথবা সঠিক গর্ভ/মাসিকের অবস্থা নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(visitOutcome==="1" && pregnancyStatus ==="2" && (parseInt(dateDiff_Between_Today_LMP)<=35 || parseInt(dateDiff_Between_Today_LMP)>=60)){
    Alert.alert("গর্ভ/মাসিকের অবস্থা","LMP তারিখ থেকে আজকের তারিকের মধ্যে "+dateDiff_Between_Today_LMP+" দিনের পার্থক্য আছে। তাই সঠিক LMP অথবা সঠিক গর্ভ/মাসিকের অবস্থা নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }

  else if(visitOutcome==="1" && pregnancyStatus ==="3" && parseInt(dateDiff_Between_Today_LMP)<=35){
    Alert.alert("গর্ভ/মাসিকের অবস্থা","LMP তারিখ থেকে আজকের তারিকের মধ্যে "+dateDiff_Between_Today_LMP+" দিনের পার্থক্য আছে। তাই সঠিক LMP অথবা সঠিক গর্ভ/মাসিকের অবস্থা নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(visitOutcome==="1" && pregnancyStatus ==="4" && parseInt(dateDiff_Between_Today_LMP)<=35){
    Alert.alert("গর্ভ/মাসিকের অবস্থা","LMP তারিখ থেকে আজকের তারিকের মধ্যে "+dateDiff_Between_Today_LMP+" দিনের পার্থক্য আছে। তাই সঠিক LMP অথবা সঠিক গর্ভ/মাসিকের অবস্থা নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(visitOutcome==="1" && pregnancyStatus==="4" && pregnancyNo===""){
    Alert.alert("কত নং গর্ভ","মাকে জিজ্ঞাসা করুন এটি কত নং গর্ভ।",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else if(visitOutcome==="1" && pregnancyStatus==="4" && pregnancyIdentifiedBy===""){
    Alert.alert("সনাক্তকরন তথ্য","গর্ভ ধারনের তথ্য, কিভাবে সনাক্ত হয়েছে?",[{text:"ঠিক আছে", onPress:()=>{""}}])
  }
  else{
    Alert.alert("MWRA সার্ভে", "আপনার দেয়া সব তথ্য সঠিক থাকলে, (MWRA সার্ভে সেভ) বাটনে ক্লিক করুন।",[{text:"না, তথ্য সঠিক নয়", onPress:()=>""},{text:"MWRA সার্ভে সেভ", onPress:()=>save_MWRA_survey()}])
  }

    



}



useEffect(()=>{
  get_survey_no();
},[visitOutcome]);

const save_MWRA_survey=()=>{

var statusChangeOn = statusChangedOn !=="" ? moment(statusChangedOn, 'MMM DD, YYYY').format('YYYY-MM-DD') : "";
var LMP = LMPDateOn!=="" && moment(LMPDateOn, "MMM DD, YYYY").isValid() ?  moment(LMPDateOn, 'MMM DD, YYYY').format('YYYY-MM-DD') : "";
var EDD = pregnancyEDD!=="" && moment(pregnancyEDD, "MMM DD, YYYY").isValid() ? moment(pregnancyEDD, 'MMM DD, YYYY').format('YYYY-MM-DD') : "";

  db.transaction(tx=>{
    tx.executeSql(
    "insert or ignore into MWRA_Survey (surveyNo, "+
    "VisitDT,"+
    "PID,"+
    "CID,"+
    "village,"+
    "bari,"+
    "HH,"+
    "name,"+
    "husbandCID,"+
    "husbandName,"+
    "VisitOutCome,"+
    "MeritalStatus,"+
    "MeritalStaCngDt,"+
    "pregnancyStatus,"+
    "Pregnancy_identified_by,"+
    "ifPregnant_No,"+
    "PregnancyNo_MWRA,"+
    "LMP,"+
    "EDD,"+
    "userID,"+
    "MWRA_SurveyStartDate,"+ 
    "MWRA_SurveyEndDate,"+
    "Entry_Date) values "+
    "('"+surveyNo+"', "+
    " '"+moment().format("YYYY-MM-DD")+"', "+
    "'"+props.selected_Mem_PID+"', "+
    "'"+props.selected_Mem_CID+"', "+
    "'"+props.villageCode+"', "+
    "'"+props.bari+"', "+
    "'"+props.hh+"', "+
    "'"+props.MWRA_name+"', "+
    "'"+props.Spouse_MPID+"', "+
    "'"+props.SpouseName_inDB+"', "+
    "'"+visitOutcome+"', "+        
    "'"+meritalStatus+"', "+        
    "'"+statusChangeOn+"', "+        
    "'"+pregnancyStatus+"', "+        
    "'"+pregnancyIdentifiedBy+"', "+        
    "'"+pregnancyNoDB+"', "+        
    "'"+pregnancyNo+"', "+        
    "'"+LMP+"', "+        
    "'"+EDD+"', "+        
    "'"+props.userID+"', "+
    "date('now','localtime', '53 day'),"+
    "date('now','localtime', '68 day'),"+
    "'"+moment().format("YYYY-MM-DD HH:mm")+"' )",
    [],
    (tx, result)=>{
      console.log("query access");
      if(result.rowsAffected>0){

        if(pregnancyStatus==="5"){
          // Alert.alert("go to mother out come");
          Alert.alert("গর্ভের ফলাফল জানা গিয়েছে","আপনার দেয়া তথ্য সফলভাবে সেভ হয়েছে। যেহেতু গর্ভের ফলাফল জনা গিয়েছে, তাই (আউটকাম ফর্ম) বাটনে ক্লিক করে আউটকাম ফর্মটি পুরন করুন।",[{text:"আউটকাম ফর্ম", onPress:()=>{go_to_mother_outcome_form()}}])
        }else{
          //check is it access from MWRA by pass access list, if it is then move to list.
          // else check check_pregnancy_history_survey_completed
          //need to work
          Alert.alert("ভিজিট সম্পূর্ণ","আপনার দেয়া MWRA ভিজিট সফলভাবে সেভ হয়েছে। এখন নিচের (ঠিক আছে) বাটনে ক্লিক করুন। যদি আর কোন MWRA ভিজিট অবশিষ্ট থাকে, তাহলে বাটনে ক্লিকের পর MWRA লিস্টে যাবে অথবা সম্পূর্ণ হলে খানার লিস্টে চলে যাবে।",[{text:"ঠিক আছে", onPress:()=>{checkMWRA()}}]);
        }

        if(pregnancyStatus!=="4" && meritalStatus === "3"){
          update_member_profile_if_widow_and_not_pregnant();
          //update is_MWRA and Marital_Status in table member where pregnancy is not positive 
        }




      }      

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });

}


const update_member_profile_if_widow_and_not_pregnant=()=>{
  db.transaction(tx=>{
    tx.executeSql(
    "update member set  Marital_Status = '3', is_MWRA = '2', Edit_Date= datetime('now', 'localtime') where Mem_PID = '"+props.selected_Mem_PID+"' ",
    [],
    (tx, result)=>{
      console.log("query access");
      if(result.rowsAffected>0){
            console.log("member table Marital_Status, is_MWRA updated");
      }      

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
}



const go_to_mother_outcome_form=()=>{


  Navigation.push(props.componentId,{
    component:{
      name:"Mother_outcome_form",
      passProps:{
        name: props.name,        
        userID:props.userID,
        password:props.password,
        cluster:props.cluster,     
        roundNo:props.roundNo,     
        block:props.block,  
        villageCode:props.villageCode, 
        villageName:props.villageName, 
        bari:props.bari,        
        bariName:props.bariName,    
        hh:props.hh,          
        hhName:props.hhName,      
        componentId:props.componentId, 
        MemberAddTracker:props.MemberAddTracker,
        MemberUpdateTracker:props.MemberUpdateTracker,
        mwraVisit:props.mwraVisit,   
        selected_Mem_SL:props.selected_Mem_SL,
        selected_Mem_PID:props.selected_Mem_PID,
        selected_Mem_CID:props.selected_Mem_CID,
        FormattedMPID:props.FormattedMPID,
        FormattedMCID:props.FormattedMCID,
        
        MWRA_name: props.MWRA_name,
        MWRA_dobFormatted:props.MWRA_dobFormatted,
        MWRA_dob:props.MWRA_dob,
        MWRA_spouse:props.MWRA_spouse,
        SpouseName_inDB:props.SpouseName_inDB,
        MWRA_lastVisit:props.MWRA_lastVisit,
        MWRA_pregnancyStatus:props.MWRA_pregnancyStatus,
        MWRA_LMP:LMPDateOn,
        MWRA_MeritalStatus:props.MWRA_MeritalStatus,
        MWRA_pregnancyValue:props.MWRA_pregnancyValue,
        MWRA_Menopause : props.MWRA_Menopause,
        MWRA_MeritalStatusValue:props.MWRA_MeritalStatusValue,
        MWRA_Pregnancy_identified_by:props.MWRA_Pregnancy_identified_by,
        MWRA_PregnancyNo_MWRA:props.MWRA_PregnancyNo_MWRA,
        Spouse_MPID:props.Spouse_MPID,
        pregnancyNoDB:pregnancyNoDB,
        surveyNo:surveyNo,
        byPass:props.byPass 



      },

      options:{
        topBar:{
          visible:true,
          title:{
            text:"প্রেগ্নেন্সি আউটকাম ফর্ম"
          },
          rightButtons:[
          //   {
          //   // id:"backbutton",
          //   component:{
          //     name:"BackButton",
          //     passProps:{                  
          //       originComponentId: props.componentId,
          //       position:"MWRA_Survey_question",
          //       backButtonText:"MWRA ভিজিটের তথ্য",                  
          //       name: props.name,        
          //       userID:props.userID,
          //       password:props.password,
          //       cluster:props.cluster,     
          //       roundNo:props.roundNo,     
          //       blockprops:props.blockprops,  
          //       villageCode:props.villageCode, 
          //       villageName:props.villageName, 
          //       bari:props.bari,        
          //       bariName:props.bariName,    
          //       hh:props.hh,          
          //       hhName:props.hhName,      
          //       componentId:props.componentId, 
          //       MemberAddTracker:props.MemberAddTracker,
          //       MemberUpdateTracker:props.MemberUpdateTracker,
          //       mwraVisit:props.mwraVisit,   
          //       selected_Mem_SL:props.selected_Mem_SL,
          //       selected_Mem_PID:props.selected_Mem_PID,
          //       selected_Mem_CID:props.mcid,
          //       FormattedMPID:props.FormattedMPID,
          //       FormattedMCID:props.FormattedMCID,
                
          //       MWRA_name: props.name,
          //       MWRA_dobFormatted:props.dob_foramtted,
          //       MWRA_dob:props.dob,
          //       MWRA_spouse:props.spouse,
          //       MWRA_lastVisit:props.MwraLastVisit,
          //       MWRA_pregnancyStatus:props.pregnancyStatus,
          //       MWRA_LMP:props.lmp,
          //       MWRA_MeritalStatus:props.MeritalStatus,
          //       MWRA_pregnancyValue:props.pregnancyValue,
          //       MWRA_Menopause : props.Menopause,
          //       MWRA_MeritalStatusValue:props.MeritalStatusValue,
          //       MWRA_Pregnancy_identified_by:props.Pregnancy_identified_by,
          //       MWRA_PregnancyNo_MWRA:props.PregnancyNo_MWRA,
          //       Spouse_MPID:props.Spouse_MPID


                
          //     }
          //   }
  
            
          // }
        ]
          
        }
      }


    }
  })

}





const { check_mwra_visit } = check_mwra_existance();
  const checkMWRA = async () => {
    
    try {
      const all_mwraVisit = await check_mwra_visit(props.villageCode, props.bari, props.hh, props.roundNo);
      if(all_mwraVisit==="completed"){
        move_to_hh_list();
      }else{
        move_to_mwra_list();        
      }      

    } catch (error){
      Alert.alert('MWRA visit check', error);
    }
  };



  const move_to_pregnancy_list=()=>{
    // byPass

    Navigation.push(props.componentId,{
      component:{
        name:"Pregnancy_list",
        passProps:{
          name: props.name,//0
          userID: props.userID,//1
          password: props.password,//2
          cluster: props.cluster,//3
          roundNo: roundNo.running_round_no,
          mwraVisit:"yes",//15
          componentId:props.componentId
  
        },
  
        options:{
          topBar:{
            visible:true,
            title:{
              text:"বর্তমানে গর্ভবতী"
            },
            rightButtons:[{
              // id:"backbutton",
              component:{
                name:"BackButton",
                passProps:{
                  originComponentId: props.componentId,
                  position:"Pregnancy_list",
                  backButtonText:"ড্যাশবোর্ড",
                  userID:props.userID,
                  password:props.password, 
                  name:props.name,
                  cluster:props.cluster
                }
              }
    
              
            }]
            
          }
        }
  
  
      }
    })


  }



  const move_to_mwra_list=()=>{
    Navigation.push(props.componentId,{
      component:{
        name:"MWRA_list_page",
        passProps:{
          name: props.name,//0
          userID: props.userID,//1
          password: props.password,//2
          cluster: props.cluster,//3
          roundNo: props.roundNo,//4
          block: props.block,//5
          villageCode: props.villageCode,//6
          villageName: props.villageName,//7
          bari: props.bari, //8
          bariName: props.bariName,//9
          hh: props.hh,//10
          hhName: props.hhName,//11
          componentId: props.componentId,//12
          MemberAddTracker: props.MemberAddTracker,//13
          MemberUpdateTracker: props.MemberUpdateTracker,//14
          mwraVisit:"yes"//15
  
        },
  
        options:{
          topBar:{
            visible:true,
            title:{
              text:"MWRA লিস্ট"
            },
            rightButtons:[]
            
          }
        }
  
  
      }
    })
  }

  const move_to_hh_list=()=>{
    Navigation.push(props.componentId,{
      component:{
        name:"Khana_list_page",
        passProps:{
          name: props.name,//0
          userID: props.userID,//1
          password: props.password,//2
          cluster: props.cluster,//3
          roundNo: props.roundNo,//4
          block: props.block,//5
          bari: props.bari, //8
          bariName: props.bariName,//9
          villageCode: props.villageCode,//6
          villageName: props.villageName//7  
        },
  
        options:{
          topBar:{
            visible:true,
            title:{
              text:"খানা লিস্ট"
            },
            rightButtons:[{
              // id:"backbutton",
              component:{
                name:"BackButton",
                passProps:{
                  originComponentId: props.componentId,
                  position:"Khana_list_page",
                  backButtonText:"বাড়ি লিস্ট",
                  name: props.name,//0
                  userID: props.userID,//1
                  password: props.password,//2
                  cluster: props.cluster,//3
                  roundNo: props.roundNo,//4
                  block: props.block//5                  
                }
              }
    
              
            }]
            
          }
        }
  
  
      }
    })
  }



  return (
    <ScrollView style={{backgroundColor:"#f0f0f0"}}>
<View style={{alignItems:"center"}}>

            <View style={{marginTop:"1%",height:"auto", width:"98%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                MWRA সার্ভে ফর্ম               
              </Text>              
              <Text style={{fontSize:12, color:"#404040"}}>
                  বিঃদ্রঃ MWRA সার্ভে ফর্ম পুরনের ক্ষত্রে, প্রথমে সব তথ্য যাচাই করুন, তারপর ডাটা এন্ট্রি করুন।
              </Text>
            </View>




            <View style={{ flexDirection:"row", padding:5, marginTop:5, height:"auto", width:"98%", backgroundColor:"#fff", borderRadius:10, elevation:5}}>
 

              <View style={{width:"50%", borderRightWidth:1, borderColor:"#e6e6e6", padding:5}}>             
              <Text style={font.fontColor}>নামঃ <Text style={{color:"#db2777"}}>{props.MWRA_name} </Text></Text>
              <Text style={font.fontColor}>জন্ম তারিখঃ {props.MWRA_dobFormatted}</Text>
              <Text style={font.fontColor}>বর্তমান বয়সঃ {props.MWRA_dob}</Text>
              <Text style={font.fontColor}>স্বামীঃ {props.MWRA_spouse}</Text>
              <Text style={font.fontColor}>সর্বশেষ ভিজিটঃ <Text style={{color:"#db2777"}}>{props.MWRA_lastVisit}</Text></Text>
              <Text style={font.fontColor}>গর্ভ/মাসিকের অবস্থাঃ <Text style={{color:"#db2777"}}>{props.MWRA_pregnancyStatus}</Text></Text>
              <Text style={font.fontColor}>LMP সর্বশেষঃ <Text style={{color:"#db2777"}}>{props.MWRA_LMP}</Text></Text>
              <Text style={font.fontColor}>বৈবাহিক অবস্থাঃ <Text style={{color:"#db2777"}}>{props.MWRA_MeritalStatus}</Text></Text>
              </View>
              
              <View style={{width:"50%", padding:5}}>
              <Text style={font.fontColor}>এম পি আইডিঃ <Text style={{color:"#db2777"}}>{props.FormattedMPID} </Text></Text>
              <Text style={font.fontColor}>এম সি আইডিঃ <Text style={{color:"#db2777"}}>{props.FormattedMCID} </Text></Text>
              </View>
              
            </View>



            <View style={{height:100, width:"98%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"মহিলার উপস্থিতি"}
            inputField_1={<View style={{width:"70%"}}>
              <DropDown 
                data={visitOutcomeValue} 
                labelField={"label"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={visitOutcome}
                onChange={item => {                  
                  setVisitOutcome(item.value);                                    
                }}
             />
            </View>} 
            />
            </View>



{ifVisitSuccess &&(


            <View style={{height:100, width:"98%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"বৈবাহিক অবস্থা"}
            inputField_1={<View style={{width:"70%"}}>
              <DropDown 
                data={MeritalStatusValue} 
                labelField={"label"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={meritalStatus}
                onChange={item => {                  
                  setMeritalStatus(item.value);                                    
                }}
             />
            </View>} 
            />
            </View>
          )}



            



{ifMeritalStatusOK &&(
  <View style={{width:"98%"}}>
            <View style={{height:100, width:"100%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"গর্ভ/মাসিকের অবস্থা"}
            inputField_1={<View style={{width:"70%"}}>
              <DropDown 
                data={PregnancyStatusValue} 
                labelField={"label"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={pregnancyStatus}
                onChange={item => {                  
                  sePregnancyStatus(item.value);                                    
                }}
             />
            </View>} 
            />
            </View>





            <View style={{height:85,marginTop:"1%", width:"100%"}}>                                  
            <QuestionContainer
            question={"শেষ মাসিকের তারিখ(LMP)"}
            inputField_1={<View><TouchableOpacity onPress={LMPDateOnChecker} ><Date_field value={LMPDateOn} ph={"শেষ মাসিকের তারিখ"}/></TouchableOpacity>
            <DatePicker
            modal
            title={"শেষ মাসিকের তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            mode='date'
            maximumDate={new Date()}
            open={LMPContainer}
            date={new Date()}
            onConfirm={(statusChnageOn) => {
              setLMPContainer(false)
              LMP_onConfirm(statusChnageOn);
            }}
            onCancel={() => {
              setLMPContainer(false)
              setLMPDateOn("")
              setLMPDateOnCheck("");
              }} />
            </View>}
            
            direction={"column"}
            />
           
            </View>



            
            </View>
            )}







            {ifMeritalStatusChnage &&(
            <View style={{height:85,marginTop:"1%", width:"98%"}}>                                  
            <QuestionContainer
            question={"অবস্থা পরিবর্তনের তারিখ"}
            inputField_1={<View><TouchableOpacity onPress={statusChangedOnChecker} ><Date_field value={statusChangedOn} ph={"অবস্থা পরিবর্তনের তারিখ"}/></TouchableOpacity>
            <DatePicker
            modal
            title={"অবস্থা পরিবর্তনের তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            mode='date'
            maximumDate={new Date()}
            open={statusChangedOnContainer}
            date={new Date()}
            onConfirm={(statusChnageOn) => {
              setStatusChangedOnContainer(false)
              statusChange_onConfirm(statusChnageOn);
            }}
            onCancel={() => {
              setStatusChangedOnContainer(false)
              setStatusChangedOn("")
              setStatusChangedOnCheck("");
              }} />
            </View>}
            
            direction={"column"}
            />
            </View>
)}



          {ifPregnant && (
            <View style={{width:"98%"}}>
            <View style={{height:100, width:"100%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"মাকে জিজ্ঞাসা করুন এটি কত নং গর্ভ"}
            inputField_1={<View style={{width:"70%"}}><InputField getValue={(text)=> setPregnancyNo(text)} value={pregnancyNo} maxLength={2} placeholder={"কত নং গর্ভ"} imgLeft={""}/></View>} 
            direction={"column"}
            />
            </View>

            <View style={{height:100, width:"100%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"গর্ভ ধারনের তথ্য, কিভাবে সনাক্ত হয়েছে?"}
            inputField_1={<View style={{width:"70%"}}>
              <DropDown 
                data={pregnancyIdentifiedByValues} 
                labelField={"item"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={pregnancyIdentifiedBy}
                onChange={item => {                  
                  setPregnancyIdentifiedBy(item.value);                                    
                }}
             />
            </View>} 
            />
            </View>

            <View style={{height:100, width:"100%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"বর্তমান গর্ভের সপ্তাহ"}
            inputField_1={<View style={{width:"70%"}}><InputField readOnly={false} value={pregnancyWeek} maxLength={2} placeholder={"গর্ভের সপ্তাহ"} imgLeft={"calendar"}/></View>} 
            direction={"column"}
            />
            </View>

            <View style={{height:100, width:"100%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"বর্তমান গর্ভ নং(ডাটাবেজ থেকে)"}
            inputField_1={<View style={{width:"70%"}}><InputField readOnly={false} value={pregnancyNoDB} maxLength={2} placeholder={"গর্ভ নং(ডাটাবেজ থেকে)"} imgLeft={""}/></View>} 
            direction={"column"}
            />
            </View>

            <View style={{height:100, width:"100%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"প্রসবের সম্ভাব্য  তারিখ(EDD)"}
            inputField_1={<View style={{width:"70%"}}><InputField readOnly={false} value={pregnancyEDD} maxLength={30} placeholder={"EDD"} imgLeft={"calendar"}/></View>} 
            direction={"column"}
            />
            </View>



            <View style={{height:100, width:"100%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"পূর্ববর্তি গর্ভের ফলাফলের তারিখ"}
            inputField_1={<View style={{width:"70%"}}><InputField readOnly={false} value={pregnancyLastOutcomeDate} maxLength={20} placeholder={"পূর্ববর্তি গর্ভের তারিখ"} imgLeft={"calendar"}/></View>} 
            direction={"column"}
            />
            </View>


            


            </View>    
            )}



            <View style={{width:"30%", paddingBottom:40, marginTop:"2%"}}><CRUD_button callFunction={check_before_save} title={"সেভ MWRA সার্ভে"} radious={20}/></View> 


<View>

</View>



</View>
</ScrollView>
  )
}

const font = StyleSheet.create({   
  fontColor:{

      lineHeight:23,
      fontWeight:"bold",
      color:"#636363"

  }     
})

export default MWRA_Survey_question;
