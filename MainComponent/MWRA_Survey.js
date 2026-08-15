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
import { passValueToSidebar } from '../components/SideBar_values';

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



const MWRA_Survey = (props) => {

  // name:props.valuesForMwraSurvey[0], //props.name,
  // userID:props.valuesForMwraSurvey[1],//props.userID,
  // password:props.valuesForMwraSurvey[2],//props.password,
  // cluster:props.valuesForMwraSurvey[3],//props.cluster,
  // roundNo:props.valuesForMwraSurvey[4],//props.roundNo,
  // block:valuesForMwraSurvey[5],//props.block,
  // villageCode:props.valuesForMwraSurvey[6],//props.villageCode,
  // villageName:props.valuesForMwraSurvey[7],//props.villageName,
  // bari:props.valuesForMwraSurvey[8],//props.bari, 
  // bariName:props.valuesForMwraSurvey[9],//props.bariName,
  // hh:props.valuesForMwraSurvey[10],//props.hh,
  // hhName:props.valuesForMwraSurvey[11],//props.hhName,
  // componentId:props.valuesForMwraSurvey[12],//props.componentId,
  // MemberAddTracker:props.valuesForMwraSurvey[13],//props.MemberAddTracker,//13
  // MemberUpdateTracker:props.valuesForMwraSurvey[14],//props.MemberUpdateTracker//14                  
  // mwraVisit:props.valuesForMwraSurvey[15],//mwraVisit="yes"//15
  // selected_Mem_SL:props.valuesForMwraSurvey[16],//memberProfile.selected_Mem_SL//16
  // selected_Mem_PID:memberProfile.selected_Mem_PID//17


    const [image_updater, Set_image_updater] = useState(Math.random());
    const[loading, setLoading]=useState({loadingState : false});
    const[MPID, SetMpid] = useState(props.selected_Mem_PID);
    const[MemSL, SetMemSl] = useState(props.selected_Mem_SL);




    const[memberItems, setMemberItems] = useState({
      FormattedMPID:"",
      FormattedMCID:"",
      IMG:"",
      name:"",
      mpid:"",
      mcid:"",
      memsl:"",
      spouse:"",
      dob:"",
      dob_foramtted:"",
      edd:"",
      If_HH_Head:"",
      if_is_MWRA:"",
      if_Pregnent:"",
      if_abroad:"",
      if_Guest:"",
      Child_status_data_error:"",
      Pregnancy_status_data_error:"",
      mwra_status_data_error:"",
      waring_icon:"",
      NID_card:"",
      member_photo:"",
      MwraLastVisit:"",
      pregnancyStatus:"",
      lmp:"",
      MeritalStatus:"",
      pregnancyValue:"",
      MeritalStatusValue:"",
      Pregnancy_identified_by:"",
      PregnancyNo_MWRA:"",
      Spouse_MPID:"",
      SpouseName_inDB:""
    });


    const[modelView,SetModelView]=useState({
      visible:false
    })

    const[modelData,SetModelData]=useState({
      ChildError:"",
      EDDError:"",
      MWRAError:"",
    })

    const warning_description=(ChildStatusError, PregnancyError, MWRAError)=>{
      SetModelView({visible:true});
      SetModelData((SetModelData)=>({...SetModelData,ChildError:ChildStatusError }))
      SetModelData((SetModelData)=>({...SetModelData,EDDError:PregnancyError }))
      SetModelData((SetModelData)=>({...SetModelData,MWRAError:MWRAError }))

    }
    const closeModel=()=>{
      SetModelView({visible:false});
    }


    const [camera_container_open, set_camera_container_open] = useState(false);
    const [camera_document_type, set_camera_document_type] = useState("");
    const [mem_sl_for_camera, setMem_sl_for_camera] = useState("");
    const [mem_gender_for_camera, setMem_gender_for_camera] = useState("");
    
    const open_camera=(mem_sl,doc_type,gender)=>{
      setMem_sl_for_camera(mem_sl);
      setMem_gender_for_camera(gender)
      set_camera_container_open(true);  
      // setShow_profile(false);
      set_camera_document_type(doc_type)
    
    }


    const close_camera=(data)=>{
      var close = data="close"? false : true;
      set_camera_container_open(close);    
    }



    const [Menopause, setMenopause] = useState("");

    const check_MWRA_last3_visit_with_pregnancyStatus_3= async ()=>{
     
      await db.transaction(tx=>{tx.executeSql("drop table if EXISTS MWRA_visit_Menopause",[],(tx, result)=>{})})
     
      await db.transaction(tx=>{tx.executeSql(
      "create TEMP table MWRA_visit_Menopause as "+
      "select "+
      "ROW_NUMBER() OVER (PARTITION BY PID ORDER BY date(VisitDT) DESC) as visitRank, * "+
      "from MWRA_Survey "+
      "WHERE "+
      "pid = '"+MPID+"' "+
      "AND "+
      "VisitOutCome = '1' ",[],(tx, result)=>{})})

      db.transaction(tx=>{
        tx.executeSql(
        "select * from MWRA_visit_Menopause "+
        "WHERE "+
        "visitRank <= 3 "+
        "AND "+
        "pregnancyStatus = '3' ",
        [],
        (tx, result)=>{
        var length = result.rows.length;    
        if(length>=3){
          setMenopause("yes");
              }
              else {
                setMenopause("no");
                }    
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });
}



    const get_khana_member_list_main_query=()=>{
      

      Set_image_updater(Math.random());
  
      setLoading({loadingState:true})
    
      db.transaction(tx=>{
        tx.executeSql(

        "select "+
        "(substr(member.Mem_PID,1,3)||' '||substr(member.Mem_PID,4,2)||' '||substr(member.Mem_PID,6,3)||' '||substr(member.Mem_PID,9,3))'FormattedMPID', "+
        "(substr(member.MCID,1,4)||' '||substr(member.MCID,5,3)||' '||substr(member.MCID,8,3)||' '||substr(member.MCID,11,3))'FormattedMCID', "+
        "member.Mem_Enroll_Type, "+
        "member.Mem_PID 'MPID', "+
        "member.Mem_SL 'Member_SL', "+ 
        "member.MCID 'MCID', "+ 
        "case "+ 
        "when member.Hus_Wife_Name ='xx' or member.Hus_Wife_Name ='XX' or member.Hus_Wife_Name ='' then 'সঠিক নাম ডাটাবেজএ নেই' "+
        "else member.Hus_Wife_Name end as 'Spouse', "+
        "member.Hus_Wife_Line 'Spouse_MPID', "+
        "member.Hus_Wife_Name 'SpouseName_DB', "+
		
        "member.is_MWRA 'is_MWRA', "+ 
        "member.Mem_Name 'Mem_Name', "+ 
        "member.Mem_Sex 'Mem_Sex', "+
        "MWRA_Survey.EDD  'EDD', "+
        "case "+ 
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
        "else Mem_DOB end as 'Mem_DOB', "+
        
        "MWRA_Survey.pregnancyStatus 'pregnent', "+
        "MWRA_Survey.Pregnancy_identified_by, "+
        "MWRA_Survey.PregnancyNo_MWRA, "+		

        "MWRA_Survey.VisitDT 'MwraLastVisit', "+
        "case "+
        "when MWRA_Survey.pregnancyStatus = '1' then 'মাসিক চলছে' "+
        "when MWRA_Survey.pregnancyStatus = '2' then 'নিয়মিত মাসিক বন্ধ আছে' "+
        "when MWRA_Survey.pregnancyStatus = '3' then 'মাসিক অনিয়মিত' "+
        "when MWRA_Survey.pregnancyStatus = '4' then 'গর্ভবতী হিসাবে সনাক্ত' "+ 
        "when MWRA_Survey.pregnancyStatus = '5' then 'গর্ভের ফলাফল জানা গিয়েছে' "+ 
        "when MWRA_Survey.pregnancyStatus = '6' then 'মাসিক একেবারে বন্ধ(Menopause)' "+
        "when MWRA_Survey.pregnancyStatus = '7' then 'সর্বশেষ গর্ভধারণের ফলাফলের পর এখনও মাসিক শুরু হইনি' "+
        "when MWRA_Survey.pregnancyStatus = '9' then 'ভুল সনাক্ত' "+
        "else 'সঠিক মাসিকের অবস্থা উল্লেখ নেই' end as 'pregnancyStatus', "+
        "MWRA_Survey.LMP, "+
        "MWRA_Survey.MeritalStatus 'MeritalStatusValue', "+
        "case "+
        "when MWRA_Survey.MeritalStatus = '1' then 'বিবাহিত' "+
		"when MWRA_Survey.MeritalStatus = '2' then 'তালাকপ্রাপ্ত' "+
		"when MWRA_Survey.MeritalStatus = '3' then 'বিধবা' "+
		"when MWRA_Survey.MeritalStatus = '4' then 'বিবাহ হইনি' "+
		"else 'সঠিক বৈবাহিক তথ্য নেই' end as 'MeritalStatus', "+
		 
    "CASE when (((JulianDay('now')) - JulianDay(case "+ 
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
    "else Mem_DOB end))/365.25)>=60 then 'old' else 'NotOld' end as 'OldStatus', "+
        
    "CASE when (((JulianDay('now')) - JulianDay(case "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
    "else Mem_DOB end))/365.25)> 5 and cast(member.Mem_Enroll_Type as int) = '3' then 'NotChild' else 'ok' end as 'ChildStatus', "+
      
    "case when cast(pregnancyStatus as INT)=4 and date(EDD)<date('now') then 'EddCross' else 'ok' end as 'PregnancyOutcome', "+
      
    "case when (cast(member.Marital_Status as INT)<>1 or cast(member.Mem_Sex as INT)<>2 or "+
    "(((JulianDay('now')) - JulianDay(case "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
    "else Mem_DOB end))/365.25)< 13 or (((JulianDay('now')) - JulianDay(case "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
    "else Mem_DOB end))/365.25)> 60 "+
    ") and is_MWRA = '1' then 'NotMWRA' else 'ok' end as 'MWRAStatus', "+

    "member.IMG "+
    "from member "+
    "left join "+ 
    "(WITH a as( "+ 
    "SELECT Pregnancy_identified_by, PregnancyNo_MWRA,  VisitDT ,LMP, MeritalStatus, EDD, ROW_NUMBER() OVER (PARTITION BY pid ORDER BY CAST(MWRA_Survey.surveyNo AS int) DESC) 'rn' , pregnancyStatus, Entry_Date, pid, VisitOutCome from MWRA_Survey "+
    "WHERE "+
    "pid = '"+MPID+"' and VisitOutCome = '1' "+
    "order by cast(MWRA_Survey.surveyNo as INT) desc )select * from a where rn = 1 "+
    ") MWRA_Survey on MWRA_Survey.pid = member.Mem_PID and VisitOutCome = '1' "+
    "left join icon on member.Mem_Icon = icon.statusCode and icon.statusCode is not null "+
    "where member.Mem_SL = '"+MemSL+"' ",
        [],
        (tx, result)=>{
          
        var length = result.rows.length;
        
        // setTotalRows({totalRowsCount:length})
        
        if(length>0){
    
                // let results = [];
 
                for(let i= 0; i<length; i++){

                  
                   let items=result.rows.item(i);
                   var FormattedMPID = result.rows.item(i).FormattedMPID; 
                   var FormattedMCID = result.rows.item(i).FormattedMCID; 
                   var IMG = result.rows.item(i).IMG; 
                   var Mem_name = ((result.rows.item(i).Mem_Name).trim()).toUpperCase();        
                   var MPID = result.rows.item(i).MPID;        
                   var Member_SL = result.rows.item(i).Member_SL;        
                   var MCID = result.rows.item(i).MCID;                       
                   var enrollType = result.rows.item(i).Mem_Enroll_Type;
                   var sName = ((result.rows.item(i).Spouse).trim()).toUpperCase();
                   var SpouseName_DB = ((result.rows.item(i).SpouseName_DB).trim()).toUpperCase();
                   var Spouse_MPID = result.rows.item(i).Spouse_MPID;
                   var is_MWRA = result.rows.item(i).is_MWRA;
                   var pregnent = result.rows.item(i).pregnent;
                   var EDD = result.rows.item(i).EDD;                   
                   var Mem_DOB = result.rows.item(i).Mem_DOB;        
                   var Member_sex = result.rows.item(i).Mem_Sex;
                   var OldStatus = result.rows.item(i).OldStatus;
                   var ChildStatus = result.rows.item(i).ChildStatus;
                   var PregnancyOutcome = result.rows.item(i).PregnancyOutcome;
                   var MWRAStatus = result.rows.item(i).MWRAStatus;

                   var MwraLastVisit = result.rows.item(i).MwraLastVisit !=="" && result.rows.item(i).MwraLastVisit !== null ? moment(result.rows.item(i).MwraLastVisit).format('MMM DD, YYYY') : "সর্বশেষ কোন ভিজিটের তথ্য নেই";
                   var pregnancyStatus = result.rows.item(i).pregnancyStatus;
                   var LMP = result.rows.item(i).LMP !=="" && result.rows.item(i).LMP !== null ? moment(result.rows.item(i).LMP).format('MMM DD, YYYY') : "সর্বশেষ কোন LMP তথ্য নেই";
                   var MeritalStatus = result.rows.item(i).MeritalStatus;
                   var MeritalStatusValue = result.rows.item(i).MeritalStatusValue;
                   var Pregnancy_identified_by = result.rows.item(i).Pregnancy_identified_by;
                   var PregnancyNo_MWRA = result.rows.item(i).PregnancyNo_MWRA;



                   var If_HH_Head;
        if(enrollType=="1"){
            If_HH_Head = <Image source={require('../img/HH_head_statusIcon.png')} style={{height:30, width:30, marginLeft:10}}/>        
        }
        else{
            If_HH_Head = "";
        }
  
        
        var if_is_MWRA;
        if(is_MWRA=="1"){
            if_is_MWRA = <Image source={require('../img/mwra_statusIcon.png')} style={{height:40, width:40, marginLeft:10}}/>        
        }
        else{
            if_is_MWRA = "";
        }

        
        var ifPregnent;
        var EDD_Formatted="";
        
        if(pregnent=="4"){
        ifPregnent = <Image source={require('../img/pregnent.png')} style={{height:40, width:40, marginLeft:10}}/>        
        EDD_Formatted ="EDD "+moment(EDD).format('MMM DD, YYYY');
        }
        else{
        ifPregnent = "";
        EDD_Formatted = "";
        }


        var if_abroad;
        if(enrollType=="8"){
            if_abroad = <Image source={require('../img/abroad.png')} style={{height:40, width:40, marginLeft:10}}/>        
        }
        else{
            if_abroad = "";
        }

        var if_Guest;
        if(enrollType=="6"){
            if_Guest = <Image source={require('../img/guest_statusIcon.png')} style={{height:40, width:40, marginLeft:10}}/>        
        }
        else{
            if_Guest = "";
        }


        var avatar;
        var gender;        
        if(Member_sex=="1"){
        avatar = require('../img/man.png');
        gender = "পুরুষ"
        }
        else{
        avatar = require('../img/woman.png');
        gender = "মহিলা";
        }

        
        
        
        var s_Name = "";        
        if(enrollType=="3"){
        }
        else if(is_MWRA=="1"){
        s_Name = "স্বামী - "+ sName;
        }else{
        s_Name = "";
        } 

        var memberDOB = moment(Mem_DOB, "YYYY-MM-DD").isValid() ? moment().diff(Mem_DOB,"years",false) : "" ;// moment(Mem_DOB).format('MMM DD, YYYY');
        var dob_foramtted = moment(Mem_DOB, "YYYY-MM-DD").isValid() ? moment(Mem_DOB).format('MMM DD, YYYY') : "";


        var Child_status_data_error;
        if(ChildStatus==="NotChild"){
          Child_status_data_error= "নির্বাচিত শিশুর বয়স ৫ বছরের বেশি আছে জন্ম তারিখ অনুযায়ী। কিন্তু ডাটাবেজে এখনও বর্তমান স্ট্যাটাস অনুযায়ী (শিশু স্ট্যাটাস) এ আছে। তাই এই ডাটা ঠিক করার জন্য খানা ভিজিটের মাধ্যমে ঠিক করুন অথবা আপনার সুপারভাইজারের সাথে আলাপ করে ডাটাটি সঠিক করুন।";
        }else{
          Child_status_data_error= "";
        }

        var Pregnancy_status_data_error;
        if(PregnancyOutcome==="EddCross"){
          Pregnancy_status_data_error= "নির্বাচিত মহিলার EDD পার হয়ে গেছে ডাটাবেজ অনুযায়ী। গর্ভের ফলাফল যদি ইতিমধ্যে হয়ে থাকে, তাহলে MWRA ভিজিটের মাধ্যমে গর্ভের ফলাফল এন্ট্রি করে ভিজিট সমাপ্ত করুন অথবা অন্য কোন সমস্যা হলে, আপনার সুপারভাইজারের সাথে আলাপ করুন এবং ডাটাটি সঠিক করুন। ";
        }else{
          Pregnancy_status_data_error= "";
        }


        var mwra_status_data_error;
        if(MWRAStatus==="NotMWRA"){
          mwra_status_data_error= "নির্বাচিত মহিলা বর্তমান স্ট্যাটাস অনুযায়ী MWRA, কিন্তু এই সদস্যের অন্যান্য তথ্য যেমনঃ লিঙ্গ, বয়স বা বৈবাহিক অবস্থা অনুযায়ী MWRA হবার কথা নয়। তাই এই ডাটা ঠিক করার জন্য খানা ভিজিটের মাধ্যমে ঠিক করুন অথবা আপনার সুপারভাইজারের সাথে আলাপ করে ডাটাটি সঠিক করুন।";
        }else{
          mwra_status_data_error= "";
        }

        
        var waring_icon = "";
        if(ChildStatus==="NotChild" || PregnancyOutcome==="EddCross" || MWRAStatus==="NotMWRA"){
          waring_icon = <TouchableOpacity onPress={warning_description.bind(this,Child_status_data_error,Pregnancy_status_data_error,mwra_status_data_error)}><Image source={require('../img/exclamation.png')} style={{height:40, width:40, marginLeft:10, borderWidth:3, borderColor:"#e11d48", borderRadius:100}}/></TouchableOpacity>
        }
        else{
          waring_icon = "";
        }
        

        var NID_card = "";
        // if(enrollType!="3"){
          // open_camera.bind(this,Member_SL, "IDs", Member_sex)
          NID_card = <TouchableOpacity onPress={open_camera.bind(this,Member_SL, "IDs", Member_sex)}><Image source={require('../img/card1.png')} style={{height:40, width:45, marginLeft:10}}/></TouchableOpacity>
        // }
        // else{
        //   NID_card = "";
        // }




        var member_photo;
        if(IMG===null || IMG ===""){          
            member_photo = require('../img/woman_PIC.png');            
        }else{
          member_photo = {uri:IMG + "?" + image_updater};
        }

      
        setMemberItems((memberItems)=>({...memberItems,FormattedMPID:FormattedMPID}));
        setMemberItems((memberItems)=>({...memberItems,FormattedMCID:FormattedMCID}));

        setMemberItems((memberItems)=>({...memberItems,IMG:IMG}));
        setMemberItems((memberItems)=>({...memberItems,name:Mem_name}));
        setMemberItems((memberItems)=>({...memberItems,mpid:MPID}));
        setMemberItems((memberItems)=>({...memberItems,mcid:MCID}));
        setMemberItems((memberItems)=>({...memberItems,memsl:Member_SL}));
        setMemberItems((memberItems)=>({...memberItems,spouse:sName}));
        setMemberItems((memberItems)=>({...memberItems,SpouseName_inDB:SpouseName_DB}));
        setMemberItems((memberItems)=>({...memberItems,Spouse_MPID:Spouse_MPID}));
        setMemberItems((memberItems)=>({...memberItems,dob_foramtted:dob_foramtted}));
        setMemberItems((memberItems)=>({...memberItems,dob:memberDOB}));
        setMemberItems((memberItems)=>({...memberItems,edd:EDD_Formatted}));
        setMemberItems((memberItems)=>({...memberItems,If_HH_Head:If_HH_Head}));
        setMemberItems((memberItems)=>({...memberItems,if_is_MWRA:if_is_MWRA}));
        setMemberItems((memberItems)=>({...memberItems,if_Pregnent:ifPregnent}));
        setMemberItems((memberItems)=>({...memberItems,if_abroad:if_abroad}));
        setMemberItems((memberItems)=>({...memberItems,if_Guest:if_Guest}));
        setMemberItems((memberItems)=>({...memberItems,Child_status_data_error:Child_status_data_error}));
        setMemberItems((memberItems)=>({...memberItems,Pregnancy_status_data_error:Pregnancy_status_data_error}));
        setMemberItems((memberItems)=>({...memberItems,mwra_status_data_error:mwra_status_data_error}));
        setMemberItems((memberItems)=>({...memberItems,waring_icon:waring_icon}));
        setMemberItems((memberItems)=>({...memberItems,NID_card:NID_card}));
        setMemberItems((memberItems)=>({...memberItems,member_photo:member_photo}));

        setMemberItems((memberItems)=>({...memberItems,MwraLastVisit:MwraLastVisit}));
        setMemberItems((memberItems)=>({...memberItems,pregnancyStatus:pregnancyStatus}));
        setMemberItems((memberItems)=>({...memberItems,lmp:LMP}));
        setMemberItems((memberItems)=>({...memberItems,MeritalStatus:MeritalStatus}));
        setMemberItems((memberItems)=>({...memberItems,pregnancyValue:pregnent}));
        setMemberItems((memberItems)=>({...memberItems,MeritalStatusValue:MeritalStatusValue}));
        setMemberItems((memberItems)=>({...memberItems,Pregnancy_identified_by:Pregnancy_identified_by}));
        setMemberItems((memberItems)=>({...memberItems,PregnancyNo_MWRA:PregnancyNo_MWRA}));
 



        }
                setLoading({loadingState:false})
              }
              else{
                Alert.alert("MWRA", "এই খানায় বর্তমানে কোন MWRA এ নাই।")
                setLoading({loadingState:false})
              }
    
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });

        setLoading({loadingState:false})
      }



      useEffect(()=>{
        get_khana_member_list_main_query();
      },[MPID, MemSL]);

      useEffect(()=>{
        check_MWRA_last3_visit_with_pregnancyStatus_3();
      },[MPID, MemSL]);



      const [imageAvailable, setImgAvailable] = useState("");

      const show_hh_picture=()=>{
        // console.log("image function");
        // setImage_updater(Math.random());
        const full_image_path =  (RNFS.DocumentDirectoryPath+"/PRFIMAGES/HOUSES/"+props.villageCode+""+props.bari+""+props.hh+".jpg");
        RNFS.exists(full_image_path)
        .then((exist)=>{
          if(exist){
            setImgAvailable({uri:("file://"+full_image_path + "?" + image_updater)});
              // console.log("exist");

          }else{
            setImgAvailable(require("../img/noimage.png"));
            // console.log("not exist");

          }
        }).catch((error)=>{
          // console.log(error);
        })
      }
      
      useEffect(()=>{
        show_hh_picture();
      },[image_updater])




const[member_list_border_color, set_member_list_border_color] = useState("#0e7490");
const[survey_visit_list_border_color, set_survey_visit_list_border_color] = useState("#0e7490");
const[mwra_list_border_color, set_mwra_list_border_color] = useState("#0e7490");
const[inside_hh_options_disable, Set_inside_hh_options_disable] = useState(false);





const mwra_options=(buttonPressed)=>{
 
  if(buttonPressed==="pregnancyHistory"){    
     set_member_list_border_color("#f71a0a");
    set_survey_visit_list_border_color("#0e7490")
    set_mwra_list_border_color("#0e7490")
    setVisible((visible)=>({...visible,mwra_survey_visit_list:false}));
    setVisible((visible)=>({...visible, pregnancy_history_list_visible:true}))
    setVisible((visible)=>({...visible, mwra_pregnancy_outcome_list:false}))
  }
  else if(buttonPressed==="MwraVisit"){    
    set_member_list_border_color("#0e7490")
    set_survey_visit_list_border_color("#f71a0a")
    set_mwra_list_border_color("#0e7490")
    setVisible((visible)=>({...visible,mwra_survey_visit_list:true}));
    setVisible((visible)=>({...visible, pregnancy_history_list_visible:false}))
    setVisible((visible)=>({...visible, mwra_pregnancy_outcome_list:false}))
  }
  else if(buttonPressed==="pregnancyOutcome"){    

    set_member_list_border_color("#0e7490")
    set_survey_visit_list_border_color("#0e7490")
    set_mwra_list_border_color("#f71a0a")
    setVisible((visible)=>({...visible,mwra_survey_visit_list:false}));
    setVisible((visible)=>({...visible, pregnancy_history_list_visible:false}))
    setVisible((visible)=>({...visible, mwra_pregnancy_outcome_list:true}))
    
  }
  else if(buttonPressed==="survey"){    
    // goToSurvey_Form();
    check_MWRA_survey_visit_Status();
    set_member_list_border_color("#0e7490")
    set_survey_visit_list_border_color("#0e7490")
    set_mwra_list_border_color("#0e7490")
  }
  else{

    set_member_list_border_color("#0e7490")
    set_survey_visit_list_border_color("#0e7490")
    set_mwra_list_border_color("#0e7490")
  }
  // change_color_Khana_options_button();
  
}




const goToSurvey_Form = ()=>{


  Navigation.push(props.componentId,{
    component:{
      name:"MWRA_Survey_question",
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
        selected_Mem_CID:memberItems.mcid,
        FormattedMPID:memberItems.FormattedMPID,
        FormattedMCID:memberItems.FormattedMCID,
        
        MWRA_name: memberItems.name,
        MWRA_dobFormatted:memberItems.dob_foramtted,
        MWRA_dob:memberItems.dob,
        MWRA_spouse:memberItems.spouse,
        SpouseName_inDB:memberItems.SpouseName_inDB,
        MWRA_lastVisit:memberItems.MwraLastVisit,
        MWRA_pregnancyStatus:memberItems.pregnancyStatus,
        MWRA_LMP:memberItems.lmp,
        MWRA_MeritalStatus:memberItems.MeritalStatus,
        MWRA_pregnancyValue:memberItems.pregnancyValue,
        MWRA_Menopause : Menopause,
        MWRA_MeritalStatusValue:memberItems.MeritalStatusValue,
        MWRA_Pregnancy_identified_by:memberItems.Pregnancy_identified_by,
        MWRA_PregnancyNo_MWRA:memberItems.PregnancyNo_MWRA,
        Spouse_MPID:memberItems.Spouse_MPID,
        byPass:props.byPass


      },

      options:{
        topBar:{
          visible:true,
          title:{
            text:"MWRA সার্ভে ফর্ম"
          },
          rightButtons:[{
            // id:"backbutton",
            component:{
              name:"BackButton",
              passProps:{                  
                originComponentId: props.componentId,
                position:"MWRA_Survey_question",
                backButtonText:"MWRA প্রোফাইল",                  
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
                FormattedMPID:memberItems.FormattedMPID,
                FormattedMCID:memberItems.FormattedMCID,
                byPass:props.byPass
              }
            }            
          }]          
        }
      }
    }
  })


}


const [visible, setVisible]=useState({
  pregnancy_history_list_visible:false,
  mwra_survey_visit_list:false,
  survey_visit_list:false,
  mwra_pregnancy_outcome_list:false,

  mwra_list:false,
  survey_question:false
  
});



const { check_mwra_round_visit } = check_mwra_survey_visit();
  const check_MWRA_survey_visit_Status = async () => {
    

    if(props.byPass===true){
      goToSurvey_Form();
    }
else{
    try {
      const MWRA_Survey_status = await check_mwra_round_visit(props.selected_Mem_PID, props.roundNo);
      // goToSurvey_Form();
      if(props.mwraVisit==="yes"){
        if(MWRA_Survey_status==="completed"){
          Alert.alert("ভিজিট সম্পূর্ণ","এই রাউন্ডের জন্য MWRA ভিজিট সম্পূর্ণ হয়েগেছে। পরের রাউন্ডেএ গিয়ে ভিজিট দিতে পারবেন।",[{text:"ঠিক আছে", onPress:()=>""}])
         }else{
          goToSurvey_Form();
         }
      }else{
        Alert.alert("ভিজিট সার্ভে","MWRA সার্ভে ভিজিটের জন্য, প্রথমে খানা সার্ভে সম্পূর্ণ করার পর, MWRA সার্ভে ভিজিট দিতে পারবেন।",[{text:"ঠিক আছে", onPress:()=>""}])
      }  

    } catch (error){
      Alert.alert('MWRA visit check', error);
    }
  }
  };



  const handle_no_image=()=>{
    setMemberItems((memberItems)=>({...memberItems,member_photo:require('../img/woman_PIC.png')})); 
  }




  useEffect(()=>{
    passValueToSidebar(props.userID, props.mwraVisit=="yes"? false:true, props.componentId);
  },[]);

      if(loading.loadingState===true){
        return(
            <Modal visible={true} transparent={true} animationType="fade">

      <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
      <View style={{borderRadius:10, backgroundColor:"#f0f0f0", height:"auto", width:"auto", padding:5, alignItems:"center", justifyContent:"center"}}>
      <ActivityIndicator color={"green"} size={"large"}/>
      </View>  
        </View>
        </Modal>
        )
        
      }
      else{
  return (
    <View style={{flexDirection:"column", flex:100, alignItems:"center", }}>

{camera_container_open &&(
<Camera_open document_type = {camera_document_type} close_container={close_camera} mem_serial = {mem_sl_for_camera} idcard = {mem_sl_for_camera} houseno={""} member_gender = {mem_gender_for_camera}/>
)}



<Notification closeModel={closeModel} if_visible={modelView.visible} ChildError = {modelData.ChildError} EDDError = {modelData.EDDError} MWRAError = {modelData.MWRAError}/>









<ImageBackground source={imageAvailable}  style={{flex:33, width:"100%", flexDirection:"row", justifyContent:"space-evenly"}}>

        <View style={{backgroundColor: 'rgba(255, 255, 255, 0.6)', width:"45%", padding:8, height:"100%"}}>
                      
                <View style={{borderRadius:100, alignSelf:"center", borderWidth:4, borderColor:"#FFF", elevation:7}}>
                <Image onError={handle_no_image} source={memberItems.member_photo} style={{width:90, height:90, borderRadius:100}}/>
                </View>

                    <View>
                    <Text style={font.fontColor}>নামঃ <Text style={{color:"#db2777", fontWidth:"bold"}}>{memberItems.name}</Text></Text>
                    <Text style={font.fontColor}>জন্ম তারিখঃ {memberItems.dob_foramtted} </Text>
                    <Text style={font.fontColor}>বর্তমান বয়সঃ {memberItems.dob}</Text>
                    <Text style={font.fontColor}>স্বামীঃ {memberItems.spouse}</Text>
                    
                    <Text style={[font.fontColor]}>সর্বশেষ ভিজিটঃ {memberItems.MwraLastVisit}</Text>
                    <Text style={[font.fontColor]}>গর্ভ/মাসিকের অবস্থাঃ {memberItems.pregnancyStatus}</Text>
                    <Text style={[font.fontColor]}>LMP সর্বশেষঃ {memberItems.lmp}</Text>
                    <Text style={[font.fontColor]}>বৈবাহিক অবস্থাঃ {memberItems.MeritalStatus}</Text>
                    

                    </View>

                    </View>         

                  <View style={{width:"50%", padding:8, height:"100%", alignItems:"flex-end", flexDirection:"row", justifyContent:"center"}}>
                    <View style={{flexDirection:"row", backgroundColor:"#fff", padding:10, borderRadius:10}}>
                    {memberItems.if_is_MWRA}
                    {memberItems.if_Pregnent}
                    {memberItems.if_Guest}
                    {memberItems.if_abroad}
                    {memberItems.If_HH_Head}
                    {memberItems.waring_icon}
                    {memberItems.NID_card}

                    </View>
                  </View>



                


                    </ImageBackground>





        <View style={{flex:80, backgroundColor:"#FFF", width:"100%"}}>
        <View style={{height:40, width:"100%", flexDirection:"row", justifyContent:"space-around", paddingTop:5}}>

      
<TouchableOpacity  disabled={inside_hh_options_disable} onPress={mwra_options.bind(this,"pregnancyHistory")} style={{backgroundColor:"#bae6fd", width:"30%", alignItems:"center", justifyContent:"center", borderBottomColor:member_list_border_color, borderBottomWidth:4, elevation:3, borderRadius:5}}>
  <Text style={{color:"#404040"}}>গর্ভধারণ ও সন্তান প্রসবের ইতিহাস</Text>
</TouchableOpacity>


<TouchableOpacity disabled={inside_hh_options_disable} onPress={mwra_options.bind(this,"MwraVisit")} style={{backgroundColor:"#bae6fd", width:"30%", alignItems:"center", justifyContent:"center", borderBottomColor:survey_visit_list_border_color, borderBottomWidth:4, elevation:3 , borderRadius:5}}>
  <Text style={{color:"#404040"}}>MWRA ভিজিট</Text>
</TouchableOpacity>

<TouchableOpacity disabled={inside_hh_options_disable} onPress={mwra_options.bind(this,"pregnancyOutcome")}  style={{backgroundColor:"#bae6fd", width:"30%", alignItems:"center", justifyContent:"center", borderBottomColor:mwra_list_border_color, borderBottomWidth:4, elevation:3, borderRadius:5}}>
  <Text style={{color:"#404040"}}>গর্ভের ফলাফল</Text>
</TouchableOpacity>





</View>




<View style={{flex:90, width:"100%"}}>
        
      {visible.pregnancy_history_list_visible && <Inside_khana_mwra_child_list villageCode={props.villageCode} bari={props.bari} hh={props.hh} pid = {props.selected_Mem_PID}/>}
      {visible.mwra_survey_visit_list && <Inside_khana_mwra_visit_list pid = {props.selected_Mem_PID}/>}
      {visible.mwra_pregnancy_outcome_list && <Inside_khana_mwra_preg_outcome pid = {props.selected_Mem_PID}/>}

       
      </View>


<ButtonBottom img = {require('../img/plus.png')} call_fun_for_block_list={mwra_options.bind(this, "survey")} userID={props.userID} password={props.password} name={props.name} cluster={props.cluster} componentId={props.componentId} mwra_visit = {props.mwraVisit}/>
{/* props.mwraVisit==="yes" */}
        </View>




        

    </View>
  )
}
}

const font = StyleSheet.create({   
    fontColor:{
        color:"#303030",
        lineHeight:23,
        fontWeight:"bold",
        textAlign:"center"

    }     
  })

export default MWRA_Survey;
