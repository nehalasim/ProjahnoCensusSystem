import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, View, Text, FlatList, Alert, Image, ActivityIndicator, TouchableHighlight, Touchable, TouchableOpacity, Modal } from 'react-native'
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


const Inside_khana_member_list = (props) => {





  // name
  // userID
  // password
  // cluster
  // roundNo
  // block
  // bari
  // hh
  // villageCode

  
  const[data_update_tracker, SetData_update_tracker]=useState("0");

    const [MemberItems, setMemberItems] = useState([]);
  
    const [loading, setLoading]=useState({
        loadingState : false
      });
      
      const[modelView,SetModelView]=useState({
        visible:false
      })
      const[modelData,SetModelData]=useState({
        ChildError:"",
        EDDError:"",
        MWRAError:"",
        EnrollTypeMWRA:""
      })
      const [show_profile, setShow_profile]=useState(false);


      const [totalRows, setTotalRows]=useState({
        totalRowsCount:""
      });





      const [selectedMemberMPID, setSelectedMemberMPID] = useState("");
      const [selectedMemberMSL, setSelectedMemberMSL] = useState("");
      const [openProfile, setOpenProfile] = useState(false);

      const open_profile = async (mpid, Mem_SL)=>{
        
        console.log(mpid);
        console.log(Mem_SL);
        
        var MPID = await mpid;
        var MemSerial = await Mem_SL;
        setSelectedMemberMPID(MPID);
        setSelectedMemberMSL(MemSerial);
        setOpenProfile(true);
        






      }


      

      const render_khana_member_items=({item})=>{

        
        

        return(
          <View style={{flex:100, flexDirection:"row", justifyContent:"flex-start"}}>

  
  
  
          {/* onPress={call.bind(this,item.hh)} */}
      
          
          <View style={{flexDirection:"column", flex:100}}>

  
          
  
      <View style={{backgroundColor:"#fff", height:90, width:"100%", borderBottomWidth:1, borderBottomColor:"#b0acac", flex:100, flexDirection:"row",  padding:10, justifyContent:"space-between"}}>
  


          <TouchableOpacity onPress={open_profile.bind(this,item.MPID, item.Member_SL)} style={{flex:90, flexDirection:"row"}}>
        <View style={{ flex:35, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        

            <ImageBackground source={require('../img/no_image.png')} style={{flex:1.7, alignItems:"center",justifyContent:"center", marginLeft:15}} resizeMode='contain'>
            <Image source={item.member_photo} style={{height:80, width:80, borderRadius:100, borderWidth:2, borderColor:"#0369a1"}}/>
            </ImageBackground>
            

  
  
          <View style={{flex:5, height:"100%", justifyContent:"center", marginLeft:10, marginLeft:20}}>
          <Text style={{color:"#be185d", fontSize:12, fontWeight:"bold"}}>
           {item.Mem_name}
           {/* {memberPhoto} */}
          </Text>
          
          <Text style={{color:"#404040", fontSize:12}} ellipsizeMode='tail' numberOfLines={1}> 
          <Image source={require('../img/calendar.png')} style={{height:20, width:20}} resizeMode='contain'/> {item.memberDOB}          
          </Text>
          
          <Text style={{color:"#404040"}}><Image source={item.avatar} style={{height:20, width:20, marginTop:10}} resizeMode='contain'/> {item.gender}</Text>
          
        
          </View> 

        </View>
  
        
  
        <View style={{flex:30, height:"100%", alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
          
          {item.If_HH_Head}
          {item.if_is_MWRA}
          {item.ifPregnent}
          {item.if_Only_member}
          {item.if_abroad}
          {item.if_Child}
          {item.if_Guest}
          {item.if_Old}
          
        </View>
        



        
        <View style={{flex:30, alignItems:"flex-start", justifyContent:"space-between", height:"100%", flexDirection:"row"}}>
        



      <View style={{width:"auto", flexDirection:"column", justifyContent:"center", height:"100%"}}>
        <Text style={{color:"#383838", fontSize:12}}>                      
        MPID <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.FormattedMPID}</Text>        
        </Text>

        <Text style={{color:"#383838", fontSize:12}}>                      
        MCID <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.FormattedMCID}</Text>
        </Text>

        <Text ellipsizeMode='tail' numberOfLines={1} style={{color:"#404040", fontSize:12}}>{item.f_Name}{item.s_Name}</Text>      
        <Text ellipsizeMode='tail' numberOfLines={1} style={{color:"#404040", fontSize:12}}>{item.m_Name}</Text>

      </View>      
      </View>
      </TouchableOpacity>  





        <View style={{flex:10, justifyContent:"space-between", alignItems:"center", height:"100%", flexDirection:"column"}}>
        {/* Child_status_data_error
        Pregnancy_status_data_error
        mwra_status_data_error */}
        {item.waring_icon}
        {item.NID_card}
        </View>
        
      </View>

          
          </View>

  


  
  
  
  
  
  
      
      </View>
        )

        
      }


      
      const SerachBar=()=>{
        return(
          <View style={{padding:7, backgroundColor:"#fff", borderBottomWidth:1, borderBottomColor:"#b0acac", borderTopColor:"#b0acac", borderTopWidth:1}}>

          <View style={{paddingLeft:5, flexDirection:"row", justifyContent:"space-between"}}>
            <View>
            <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
              {props.cStatus==='2' ? "অন্য খানা থেকে আগত সদস্য | সর্বমোট সদস্য ":"খানার সদস্য  ।  খানার সর্বমোট সদস্য"} {totalRows.totalRowsCount}
            </Text>            
            </View>

            <View>
            <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
            {/* রাউন্ড {props.roundNo} */}
            </Text>
            </View>

          </View>

          </View>
          
        )
      }


        const pass_value_for_back_to_survey_and_call_all_member=(total_updated)=>{
        props.onManualBack_to_Survey_Question(total_updated);
        get_khana_member_list_main_query();
        }
    


      const [image_updater, Set_image_updater] = useState(Math.random());
    
    const get_khana_member_list_main_query= ()=>{



      console.log(props.villageCode);
      console.log(props.bari);
      console.log(props.hh);
      console.log(props.cStatus);

      var reasonsFor_Migration = props.cStatus==='2' ? " and ReasonToMigrate = '7' and member.HH_Code !='"+props.hh+"' " : " and member.HH_Code ='"+props.hh+"' ";
      
      Set_image_updater(Math.random());
      
      // Alert.alert("from_member_list"+data_update_tracker);
      closeProfileModel();
      setLoading({loadingState:true})
      console.log("Query running");
      db.transaction(tx=>{
        tx.executeSql(
        "select "+
        "(substr(member.Mem_PID,1,3)||' '||substr(member.Mem_PID,4,2)||' '||substr(member.Mem_PID,6,3)||' '||substr(member.Mem_PID,9,3))'FormattedMPID', "+
        "(substr(member.MCID,1,4)||' '||substr(member.MCID,5,3)||' '||substr(member.MCID,8,3)||' '||substr(member.MCID,11,3))'FormattedMCID', "+
        "member.Mem_Enroll_Type, "+ 
        "member.Visit_Date 'Visit_Date', "+
        "member.Mem_PID 'MPID', "+
        "member.Mem_SL 'Member_SL', "+
        "member.MCID 'MCID', "+
        "member.Father_Name 'Father_Name', "+
        "member.Mother_Name 'Mother_Name', "+
        "member.Hus_Wife_Name 'Spouse', "+
        "member.is_MWRA 'is_MWRA', "+
        "member.Mem_Name 'Mem_Name', "+
        "member.Mem_Sex 'Mem_Sex', "+        
        "case "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+ 
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+ 
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
        "else Mem_DOB end as 'Mem_DOB', "+
        "member.Mem_Cstatus 'Mem_Cstatus', "+        
        "icon.path 'path', "+
        "MWRA_Survey.pregnancyStatus 'pregnent', "+
        "case "+
        " when date(member.Entry_Date)<date('2022-03-01') then 'NotUpdated' "+ //'2016-12-01'
        " else date(member.Entry_Date) "+
        " end as 'Entry_Date', "+


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
        "SELECT EDD, ROW_NUMBER() OVER (PARTITION BY pid ORDER BY CAST(MWRA_Survey.surveyNo AS int) DESC) 'rn' , pregnancyStatus, Entry_Date, pid, VisitOutCome from MWRA_Survey "+
        "WHERE "+
        "village = '"+props.villageCode+"' "+
        "AND "+
        "bari = '"+props.bari+"' "+
        "AND "+
        "hh = '"+props.hh+"' order by cast(MWRA_Survey.surveyNo as INT) desc )select * from a where rn = 1 "+
        ") MWRA_Survey on MWRA_Survey.pid = member.Mem_PID and VisitOutCome = '1' "+
        "left join icon on member.Mem_Icon = icon.statusCode and icon.statusCode is not null "+
        "where member.Village_Code = '"+props.villageCode+"' and member.Bari_Code = '"+props.bari+"' and member.HH_Code = '"+props.hh+"' and member.Mem_Cstatus in ('"+props.cStatus+"') "+reasonsFor_Migration+" "+
        "group by member.Mem_PID, member.Mem_SL",
        [],
        (tx, result)=>{
          
        var length = result.rows.length;


        
     
      
    
        console.log("Query success");
            setTotalRows({totalRowsCount:length})
            
    
              if(length>0){
                console.log("1");
                console.log("Query executed success");
                let results = [];
 
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);
                   console.log("2");
                   var Mem_name = ((result.rows.item(i).Mem_Name).trim()).toUpperCase();        
                   var Entry_Date = result.rows.item(i).Entry_Date;     
    

                   var IMG = result.rows.item(i).IMG;        
                   var MPID = result.rows.item(i).MPID;        
                   var Member_SL = result.rows.item(i).Member_SL;        
                   var MCID = result.rows.item(i).MCID;
                   var FormattedMPID = result.rows.item(i).FormattedMPID;
                   var FormattedMCID = result.rows.item(i).FormattedMCID;
                       
                   var enrollType = result.rows.item(i).Mem_Enroll_Type;
                   var fName = result.rows.item(i).Father_Name==null || result.rows.item(i).Father_Name=="" ? "" : ((result.rows.item(i).Father_Name).trim()).toUpperCase();
                   var mName = result.rows.item(i).Mother_Name==null || result.rows.item(i).Mother_Name=="" ? "" : ((result.rows.item(i).Mother_Name).trim()).toUpperCase();
                   var sName =  result.rows.item(i).Spouse==null || result.rows.item(i).Spouse=="" ? "" : ((result.rows.item(i).Spouse).trim()).toUpperCase();
                   var cStatus = result.rows.item(i).Mem_Cstatus;        
                   var is_MWRA = result.rows.item(i).is_MWRA;
                   var pregnent = result.rows.item(i).pregnent;
                   var Mem_DOB = result.rows.item(i).Mem_DOB;        
                   var Member_sex = result.rows.item(i).Mem_Sex;
                   var OldStatus = result.rows.item(i).OldStatus;

                   var ChildStatus = result.rows.item(i).ChildStatus;
                   var PregnancyOutcome = result.rows.item(i).PregnancyOutcome;
                   var MWRAStatus = result.rows.item(i).MWRAStatus;

                   console.log("3");

                   var If_HH_Head;
        if(enrollType=="1"){
            If_HH_Head = <Image source={require('../img/HH_head_statusIcon.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            If_HH_Head = "";
        }
  
        
        var if_is_MWRA;
        if(is_MWRA=="1"){
            if_is_MWRA = <Image source={require('../img/mwra_statusIcon.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            if_is_MWRA = "";
        }
        console.log("4");

        
        var ifPregnent;
        if(pregnent=="4"){
        ifPregnent = <Image source={require('../img/pregnent.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
        ifPregnent = "";
        }


        var if_Only_member;
        if(enrollType=="5"){
            if_Only_member = <Image source={require('../img/member_statusIcon.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            if_Only_member = "";
        }
        
        
        console.log("5");


        var if_abroad;
        if(enrollType=="8"){
            if_abroad = <Image source={require('../img/abroad.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            if_abroad = "";
        }

        var if_Child;
        if(enrollType=="3"){
            if_Child = <Image source={require('../img/child_statusIcon.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            if_Child = "";
        }




        console.log("6");




        var if_Old;
        if(OldStatus=="old"){
          if_Old = <Image source={require('../img/old.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
          if_Old = "";
        }
        

        var if_Guest;
        if(enrollType=="6"){
            if_Guest = <Image source={require('../img/guest_statusIcon.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            if_Guest = "";
        }




        console.log("7");
        

        
        
        
        
        var f_Name = "";
        var m_Name = "";
        var s_Name = "";
        
        if(enrollType!="2"){
        f_Name = "বাবা - "+ fName;
        m_Name =  "মা - "+ mName;
        }
        else if(is_MWRA=="1"){
        s_Name = "স্বামী/স্ত্রী - "+ sName;
        f_Name = "";
        m_Name =  "";
        }else{
        s_Name = "";
        f_Name = "";
        m_Name = "";
        } 

        var memberDOB = moment(Mem_DOB, "YYYY-MM-DD").isValid()? moment(Mem_DOB).format('MMM DD, YYYY') : "জন্ম তারিখ নেই" ;


        var Child_status_data_error;
        if(ChildStatus==="NotChild"){
          Child_status_data_error="নির্বাচিত শিশুর বয়স ৫ বছরের বেশি আছে জন্ম তারিখ অনুযায়ী। কিন্তু ডাটাবেজে এখনও বর্তমান স্ট্যাটাস অনুযায়ী (শিশু স্ট্যাটাস) এ আছে। তাই এই ডাটা ঠিক করার জন্য খানা ভিজিটের মাধ্যমে ঠিক করুন অথবা আপনার সুপারভাইজারের সাথে আলাপ করে ডাটাটি সঠিক করুন।";
        }else{
          Child_status_data_error= "";
        }





        console.log("8");





        var EnrollTypeMWRA_SexMale;
        if(enrollType==="2" && Member_sex==="1"){
          EnrollTypeMWRA_SexMale="নির্বাচিত সদস্য, ডাটাবেজ অনুযায়ী একজন পুরুষ। কিন্তু এই সদস্যের অ্যানরলমেণ্ট টাইপ এ MWRA হিসাবে ডাটা আছে এবং এই কারনে সদস্যের কোন স্ট্যাটাস আইকন আসেনি। তাই আপনার সুপারভাইসারের সাথে আলাপ করে ডাটাটি সঠিক করুন।";
        }else{
          EnrollTypeMWRA_SexMale= "";
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





        console.log("9");



        
        var waring_icon = "";
        if(ChildStatus==="NotChild" || PregnancyOutcome==="EddCross" || MWRAStatus==="NotMWRA" || EnrollTypeMWRA_SexMale!==""){
          waring_icon = <TouchableOpacity onPress={warning_description.bind(this,Child_status_data_error,Pregnancy_status_data_error,mwra_status_data_error,EnrollTypeMWRA_SexMale)}><Image source={require('../img/exclamation.png')} style={{height:30, width:30, borderWidth:3, borderColor:"#e11d48", borderRadius:100}}/></TouchableOpacity>
        }
        else{
          waring_icon = "";
        }
        

        // var NID_card = "";
        // if(enrollType!="3"){
          NID_card = <TouchableOpacity onPress={open_camera.bind(this,Member_SL, "IDs", Member_sex)}><Image source={require('../img/card1.png')} style={{height:30, width:35}}/></TouchableOpacity>
        // }
        // else{
        //   NID_card = "";
        // }




        var avatar;
        var gender;
        
        if(Member_sex=="1"){
        avatar = require('../img/man.png');
        gender = "পুরুষ"
        // member_photo = require('../img/man_PIC.png');
        }
        else{
        avatar = require('../img/woman.png');
        gender = "মহিলা";
        // member_photo = require('../img/woman_PIC.png');
        }



        console.log("10");




        var member_photo = "";
        if(IMG===null || IMG ===""){
          if(Member_sex=="1"){            
            member_photo = require('../img/man_PIC.png');
            }
            else{            
            member_photo = require('../img/woman_PIC.png');
            } 
        }else{
          member_photo = {uri:IMG+ "?" +image_updater};
        }




        
        console.log(Mem_name);

                  results.push({EnrollTypeMWRA_SexMale:EnrollTypeMWRA_SexMale, if_Old:if_Old, NID_card:NID_card, Child_status_data_error:Child_status_data_error, Pregnancy_status_data_error:Pregnancy_status_data_error, mwra_status_data_error:mwra_status_data_error, waring_icon:waring_icon, Member_SL:Member_SL, MPID:MPID, MCID:MCID, Mem_name:Mem_name, f_Name:f_Name, s_Name:s_Name, m_Name:m_Name, avatar:avatar, if_Guest:if_Guest, if_Child:if_Child, if_abroad:if_abroad, if_Only_member:if_Only_member, ifPregnent:ifPregnent, if_is_MWRA:if_is_MWRA, If_HH_Head:If_HH_Head, FormattedMPID:FormattedMPID, FormattedMCID:FormattedMCID, memberDOB:memberDOB, member_photo:member_photo, gender:gender}) 
                  console.log("12");
                }
                setMemberItems(results);
                setLoading({loadingState:false})
                // props.newKahan_total_member((length).toString());

              }
              else{

              if(props.cStatus==="2"){
                Alert.alert("অন্য খানা থেকে আগত সদস্য", "উপরের এই অপশন ব্যবহারের জন্য, প্রথমে অন্য খানা থেকে সদস্যদেরকে স্থানান্তরিত করে (এই বাড়ির অন্য খানায় বসবাস করছেন) দিয়ে সদস্যের স্ট্যাটাস আপডেট করুন।")
              //  props.newKahan_total_member("0");
              }else{
                Alert.alert("খানার সদস্য", "এই খানায় বর্তমানে কোন সদস্য নেই।")
              }
                

                setLoading({loadingState:false})
              }

    
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });
      }



      useEffect(()=>{
        get_khana_member_list_main_query()
      },[])

const[toUpdate_hide, set_toUpdate_hide]=useState(false);
const[toUpdate_show, set_toUpdate_show]=useState(false);




const[migrateOut, SetMigrateOut]=useState(false);
const[DiedDate_container, SetDiedDate_container]=useState(false);

const toUpdate_member=()=>{

  if(props.toUpdate==="yes"){
    set_toUpdate_hide(false);
    set_toUpdate_show(true);
  }else{
    set_toUpdate_hide(true);
    set_toUpdate_show(false);
  }
}

useEffect(()=>{
  toUpdate_member()
},[]);



      const warning_description=(ChildStatusError, PregnancyError, MWRAError, EnrollTypeMWRA_SexMale)=>{
        SetModelView({visible:true});
        // Alert.alert(" "+EnrollTypeMWRA_SexMale);
        SetModelData((modelData)=>({...modelData,ChildError:ChildStatusError }))
        SetModelData((modelData)=>({...modelData,EDDError:PregnancyError }))
        SetModelData((modelData)=>({...modelData,MWRAError:MWRAError }))
        SetModelData((modelData)=>({...modelData,EnrollTypeMWRA:EnrollTypeMWRA_SexMale }))

      }
      const closeModel=()=>{
        SetModelView({visible:false});
      }

      // const closeProfileModel=()=>{
      //   setShow_profile(false);
      // }

      const closeProfileModel=()=>{
         console.log("closed");
        setOpenProfile(false);
      }


      








const back_to_survey_question=(totalAdd)=>{
  var member_updated = parseInt(totalAdd) > 0 || parseInt(data_update_tracker)>0 ? "1" : "2"; 
  props.onDataReceived(member_updated)
}



const [camera_container_open, set_camera_container_open] = useState(false);
const [camera_document_type, set_camera_document_type] = useState("");
const [mem_sl_for_camera, setMem_sl_for_camera] = useState("");
const [mem_gender_for_camera, setMem_gender_for_camera] = useState("");

const open_camera=(mem_sl,doc_type,gender)=>{
  setMem_sl_for_camera(mem_sl);
  setMem_gender_for_camera(gender)
  set_camera_container_open(true);  
  setShow_profile(false);
  set_camera_document_type(doc_type)

}

const close_camera=(data)=>{
  var close = data="close"? false : true;
  set_camera_container_open(close);    
}


    if(loading.loadingState===true){
      return(
<ActivityIndicator color={"red"} size={"large"}/>
      )
      
    }
else{
  return (

    <View style={{paddingTop:5}}>

{openProfile && (
<Member_profile migration={props.migration} mpid = {selectedMemberMPID} mem_sl = {selectedMemberMSL} toUpdate = {props.toUpdate} closeProfileModel_fun = {closeProfileModel}  pass_value_for_back_to_survey = {pass_value_for_back_to_survey_and_call_all_member} back_to_survey = {back_to_survey_question} cluster={props.cluster} block={props.block} villageCode = {props.villageCode} bari = {props.bari} hh = {props.hh} valuesForMwraSurvey={""}/>
)}

{camera_container_open &&(
<Camera_open document_type = {camera_document_type} close_container={close_camera} mem_serial = {mem_sl_for_camera} idcard = {mem_sl_for_camera} houseno={""} member_gender = {mem_gender_for_camera}/>
)}


<Notification closeModel={closeModel} if_visible={modelView.visible} ChildError = {modelData.ChildError} EDDError = {modelData.EDDError} MWRAError = {modelData.MWRAError} EnrollTypeMWRA={modelData.EnrollTypeMWRA}/>




      

        <FlatList 
      ListHeaderComponent={SerachBar}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={5}
      data={MemberItems} 
      renderItem={render_khana_member_items}
      keyExtractor={(MemberItems)=> MemberItems.Member_SL}
      onRefresh={get_khana_member_list_main_query}
      refreshing={loading.loadingState}
      stickyHeaderIndices={[0]}
      />
    </View>
  )
}


}

const font = StyleSheet.create({
  fontStyle:{
    color:"#595959", 
    lineHeight:25
  }
})


export default Inside_khana_member_list
