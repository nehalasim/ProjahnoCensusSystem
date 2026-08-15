import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Alert, Image, ActivityIndicator, TouchableHighlight, Touchable, TouchableOpacity, Modal } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import QuestionContainer from './QuestionContainer';
import RadioButton from './RadioButton';
import moment from 'moment';
import Date_field from './Date_field';
import DatePicker from 'react-native-date-picker';
import { styles } from 'react-native-gifted-charts/src/LineChart/styles';
import Camera_open from './Camera_open';
import { GenerateIDs } from './GenerateIDs';
import DropDown from './DropDown';

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

const Member_profile = (props) => {



  // props.name,//0
  // props.userID,//1
  // props.password,//2
  // props.cluster,//3
  // props.roundNo,//4
  // props.block,//5
  // props.villageCode,//6
  // props.villageName,//7
  // props.bari, //8
  // props.bariName,//9
  // props.hh,//10
  // props.hhName,//11
  // props.componentId,//12
  // props.MemberAddTracker,//13
  // props.MemberUpdateTracker,//14
  // mwraVisit="yes"//15
  // to access props.valuesForMwraSurvey[1];





  
    


   let MPID = props.mpid;
   let MemberSL = props.mem_sl;

   const[data_update_tracker, SetData_update_tracker]=useState("0");

   const [selectedMemberMPID, setSelectedMemberMPID] = useState(MPID);
   const [selectedMemberMSL, SetSelectedMemberMSL] = useState(MemberSL);
   const [image_updater, Set_image_updater] = useState(Math.random());

    const[loading, setLoading]=useState({loadingState : false});
    const[toUpdate_hide, set_toUpdate_hide]=useState(true);
    const[toUpdate_show, set_toUpdate_show]=useState(false);
    const[migrateOut, SetMigrateOut]=useState(false);
    const[DiedDate_container, SetDiedDate_container]=useState(false);

    const[Died_on_Open, SetDied_on_Open] = useState(false);
    const[Died_on, SetDied_on] = useState("");
    const[Died_on_check, SetDied_on_check] = useState("");

    const[member_update_status, Set_member_update_status]=useState({
        radio_1:"no",
        radio_2:"no",
        radio_3:"no",
        value:""
      })

      const[member_migration, set_member_migration]=useState({
        radio_1:"no",
        value:""
      })
    
    const [show_profile, setShow_profile]=useState(true);
    const[memberProfile, setMemberProfile]=useState({
        selected_Mem_IMG:"",
        selected_Mem_FIMG:"",
        selected_Mem_MIMG:"",
        selected_Mem_SIMG:"",
        selected_Mem_Name:"",

        selected_Mem_SL:"",
        selected_Mem_PID:"",
        selected_Mem_CID:"",
        selected_Mem_Formatted_PID:"",
        selected_Mem_Formatted_CID:"",

        selected_Mem_DOB:"",
        selected_mem_age:"",
        selected_DOB_Source:"",
        selected_Village_Code:"",
        selected_Bari_Code:"",
        selected_HH_Code:"",
        selected_Mem_Sex:"",
        selected_Mem_Sex_value:"",
        selected_Marital_Status:"",
        Marital_Status_value:"",
        selected_reg_date:"",
        selected_father_name:"",
        selected_Father_MCID:"",
        selected_mother_name:"",
        selected_Mother_MCID:"",
        selected_Mem_Enroll_Type:"",
        selected_is_MWRA:"",
        selected_pregnent:"",
        selected_OldStatus:"",
        selected_Spouse:"",
        selected_Spouse_MCID:"",

        icon_MWRA:"",
        icon_HHH:"",
        icon_Guest:"",
        icon_OnlyMem:"",
        icon_Pregnant:"",
        icon_Old:"",
        icon_child:"",
        icon_abroad:"",
        selected_Mem_Enroll_Type:"",
        selected_Guest_date_from:"",
        selected_Mother_block:""

      });


      const [Migration_reason, SetMigration_reason]=useState({
        radio_1:"",
        radio_2:"",
        radio_3:"",
        radio_4:"",
        radio_5:"",
        radio_6:"",
        radio_7:"",
        radio_8:"",
        radio_9:"",
        value:""
      });


      const[aliveOption, setAliveOption] = useState(false);
      const[adjustHeight, setAdjustHeight] = useState(0);

    const open_profile=()=>{
        
        // setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_IMG:""}))

        Set_image_updater(Math.random());

        SetMigrateOut(false);
        SetDiedDate_container(false);


        SetDied_on("");
        SetDied_on_check("");


        Set_member_update_status((member_update_status)=>({...member_update_status, radio_1:"no"}))
        Set_member_update_status((member_update_status)=>({...member_update_status, radio_2:"no"}))
        Set_member_update_status((member_update_status)=>({...member_update_status, radio_3:"no"}))
        Set_member_update_status((member_update_status)=>({...member_update_status, value:""}))  
    
        SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
        SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
        SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
        SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
        SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
        SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
        SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
        SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
        SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
        SetMigration_reason((Migration_reason)=>({...Migration_reason, value:""}));

        
        setLoading({loadingState:true})
        

        // setShow_profile(true);

        db.transaction(tx=>{
          tx.executeSql(
          "select "+
          "member.Mem_Name, "+ 
          "member.Mem_SL, "+ 
          "member.Mem_PID, "+ 
          "member.MCID, "+ 
          "(substr(member.Mem_PID,1,3)||' '||substr(member.Mem_PID,4,2)||' '||substr(member.Mem_PID,6,3)||' '||substr(member.Mem_PID,9,3))'FormattedMPID', "+
          "(substr(member.MCID,1,4)||' '||substr(member.MCID,5,3)||' '||substr(member.MCID,8,3)||' '||substr(member.MCID,11,3))'FormattedMCID', "+
          "case "+ 
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+ 
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+ 
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+ 
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+ 
          "else Mem_DOB end as 'Mem_DOB', "+ 
          "case "+ 
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then  'জন্ম নিবন্ধন' "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then 'এন আই ডি (জাতীয় পরিচয়পত্র) ' "+ 
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then 'ই পি অ্যাই' "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then 'অন্যান্য ডকুমেন্টস' "+
          "else 'সদস্য নিজে/খানার অন্য সদস্য বলেছেন(ডকুমেন্টস নাই)' end as 'DOB_Source', "+ 
          "Village_Code, Bari_Code, HH_Code, "+
          "Mem_Sex, "+

          "case "+
          "when Marital_Status='1' then ' বর্তমানে বিবাহিত/বিবাহিতা' "+
          "when Marital_Status='2' then  ' তালাকপ্রাপ্ত' "+
          "when Marital_Status='3' then ' বিধবা' "+
          "when Marital_Status='4' then  ' এখনও বিবাহ হইনি' "+
          "else 'বিবাহের কোন তথ্য নেই' end as 'Marital_Status', "+
          "Marital_Status as 'Marital_Status_value', "+

          "member.Entry_Date as 'reg_date', "+ 
          "member.Father_Name 'father_name', "+
          "case when father.Mem_PID = '' or father.Mem_PID is null then 'n/a' else (substr(father.MCID,1,4)||' '||substr(father.MCID,5,3)||' '||substr(father.MCID,8,3)||' '||substr(father.MCID,11,3)) end as 'Father_MCID', "+
          "father.IMG 'F_IMG', "+
          "member.Mother_Name 'mother_name', "+
          "case when mother.Mem_PID = '' or mother.Mem_PID is null then 'n/a' else (substr(mother.MCID,1,4)||' '||substr(mother.MCID,5,3)||' '||substr(mother.MCID,8,3)||' '||substr(mother.MCID,11,3)) end as 'Mother_MCID', "+
          "mother.IMG 'M_IMG', "+
          "date(Guest_date_from) 'Guest_date_from', "+
          "Mem_Enroll_Type, "+
          "is_MWRA, "+
          "MWRA_Survey.pregnancyStatus 'pregnent', "+
          "CASE when (((JulianDay('now')) - JulianDay(case "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
          "else Mem_DOB end))/365.25)>=60 then 'old' else 'NotOld' end as 'OldStatus', "+
          
          " case when Marital_Status<> '1' then 'n/a' else spouse.Mem_Name end as 'Spouse', "+
          "case when spouse.Mem_PID = '' or spouse.Mem_PID is null then 'n/a' else (substr(spouse.MCID,1,4)||' '||substr(spouse.MCID,5,3)||' '||substr(spouse.MCID,8,3)||' '||substr(spouse.MCID,11,3)) end as 'Spouse_MCID', "+
          "spouse.IMG 'S_IMG', "+
		      "member.IMG, "+
          "member.Block "+
          "from member "+
          "left join (select Mem_Name, Mem_PID, MCID, IMG from member) father on member.Father_Line = father.Mem_PID and member.Father_Line<>'99999999999' "+
          "left join (select Mem_Name, Mem_PID, MCID, IMG from member) mother on member.Mother_Line = mother.Mem_PID and  member.Mother_Line<>'99999999999' "+
          "left join (select Mem_Name, Mem_PID, MCID, IMG from member) spouse on member.Hus_Wife_Line = spouse.Mem_PID and member.Hus_Wife_Line<>'99999999999' "+
          "left join "+
          "(WITH a as( "+
          "SELECT EDD, ROW_NUMBER() OVER (PARTITION BY pid ORDER BY CAST(MWRA_Survey.surveyNo AS int) DESC) 'rn' , pregnancyStatus, Entry_Date, pid, VisitOutCome from MWRA_Survey "+
          "WHERE "+
          "pid = '"+selectedMemberMPID+"' "+
          "order by cast(MWRA_Survey.surveyNo as INT) desc )select * from a where rn = 1 "+
          ") MWRA_Survey on MWRA_Survey.pid = member.Mem_PID and MWRA_Survey.VisitOutCome = '1' "+
          "WHERE "+
          "member.Mem_SL = '"+selectedMemberMSL+"' ",
          [],
          (tx, result)=>{
            
          var length = result.rows.length;
  
  

      
                  let results = [];
   
                  for(let i= 0; i<length; i++){
                     let items=result.rows.item(i);
                      var IMG= result.rows.item(i).IMG;
                      var FatherIMG= result.rows.item(i).F_IMG;
                      var MotherIMG= result.rows.item(i).M_IMG;
                      var SpouseIMG= result.rows.item(i).S_IMG;

                      var Mem_Name= result.rows.item(i).Mem_Name;
                      var Mem_SL= result.rows.item(i).Mem_SL;
                      var PID= result.rows.item(i).Mem_PID;
                      var CID= result.rows.item(i).MCID;
                      var FormattedMPID= result.rows.item(i).FormattedMPID;
                      var FormattedMCID= result.rows.item(i).FormattedMCID;
                      var Mem_DOB= result.rows.item(i).Mem_DOB;
                      var DOB_Source= result.rows.item(i).DOB_Source;
                      var Village_Code= result.rows.item(i).Village_Code;
                      var Bari_Code= result.rows.item(i).Bari_Code;
                      var HH_Code= result.rows.item(i).HH_Code;
                      var Mem_Sex= result.rows.item(i).Mem_Sex;
                      var Marital_Status= result.rows.item(i).Marital_Status;
                      var Marital_Status_value= result.rows.item(i).Marital_Status_value;
                      var reg_date= result.rows.item(i).reg_date;
                      var father_name= result.rows.item(i).father_name;
                      var Father_MCID= result.rows.item(i).Father_MCID;
                      var mother_name= result.rows.item(i).mother_name;
                      var Mother_MCID= result.rows.item(i).Mother_MCID;
                      var Mem_Enroll_Type= result.rows.item(i).Mem_Enroll_Type;
                      var is_MWRA= result.rows.item(i).is_MWRA;
                      var pregnent= result.rows.item(i).pregnent;
                      var OldStatus= result.rows.item(i).OldStatus;
                      var Spouse= result.rows.item(i).Spouse;
                      var Spouse_MCID= result.rows.item(i).Spouse_MCID;
                      var block= result.rows.item(i).Block;
                      var Guest_date_from= moment(result.rows.item(i).Guest_date_from).isValid() ?  moment().diff(moment(result.rows.item(i).Guest_date_from),"month",false) : "";
                        
  
  
          var If_HH_Head;
          if(Mem_Enroll_Type=="1"){
              If_HH_Head = <Image source={require('../img/HH_head_statusIcon.png')} style={{height:25, width:25}}/>        
          }
          else{
              If_HH_Head = "";
          }
    
          
          var if_is_MWRA;
          if(is_MWRA=="1"){
              if_is_MWRA = <Image source={require('../img/mwra_statusIcon.png')} style={{height:25, width:25}}/>        
          }
          else{
              if_is_MWRA = "";
          }
  
          
          var ifPregnent;
          if(pregnent=="4"){
          ifPregnent = <Image source={require('../img/pregnent.png')} style={{height:25, width:25}}/>        
          }
          else{
          ifPregnent = "";
          }
  
  
          var if_Only_member;
          if(Mem_Enroll_Type=="5"){
              if_Only_member = <Image source={require('../img/member_statusIcon.png')} style={{height:25, width:25}}/>        
          }
          else{
              if_Only_member = "";
          }
  
          var if_abroad;
          if(Mem_Enroll_Type=="8"){
              if_abroad = <Image source={require('../img/abroad.png')} style={{height:25, width:25}}/>        
          }
          else{
              if_abroad = "";
          }
  
          var if_Child;
          if(Mem_Enroll_Type=="3"){
              if_Child = <Image source={require('../img/child_statusIcon.png')} style={{height:25, width:25}}/>        
          }
          else{
              if_Child = "";
          }
  
          var if_Old;
          if(OldStatus=="old"){
            if_Old = <Image source={require('../img/old.png')} style={{height:25, width:25}}/>        
          }
          else{
            if_Old = "";
          }
          
  
          var if_Guest;
          if(Mem_Enroll_Type=="6"){
            if_Guest = <Image source={require('../img/guest_statusIcon.png')} style={{height:25, width:25}}/>        
            setAliveOption(true);
            setAdjustHeight(155);

            }
            else if(props.toUpdate==="complete_migration"){
              setAdjustHeight(155);
            }
          else{
              if_Guest = "";
              setAdjustHeight(125);
          }
  
  
          var avatar;
          var gender;
          var member_photo;
          if(Mem_Sex=="1"){
          avatar = require('../img/man.png');
          gender = "পুরুষ"
          member_photo = require('../img/man_PIC.png');
          }
          else{
          avatar = require('../img/woman.png');
          gender = "মহিলা";
          member_photo = require('../img/woman_PIC.png');
          }
  
          var memberDOB = Mem_DOB!=="" ?  moment(Mem_DOB).format('MMM DD, YYYY') : "জন্ম তারিখ নেই";
          var enroll_date = moment(reg_date).isValid() ?  moment(reg_date).format('MMM DD, YYYY') : "";

          
        var member_photo = "";
        if(IMG===null || IMG ===""){
          if(Mem_Sex=="1"){            
            member_photo = require('../img/man_PIC.png');
            }
            else{            
            member_photo = require('../img/woman_PIC.png');
            } 
        }else{
          member_photo = {uri:IMG + "?" + image_updater};
        }


        var father_photo = "";
        if(FatherIMG===null || FatherIMG ===""){          
            father_photo = require('../img/man_PIC.png');                        
        }else{
            father_photo = {uri:FatherIMG + "?" + image_updater};
        }


        var mother_photo = "";
        if(MotherIMG===null || MotherIMG ===""){          
            mother_photo = require('../img/woman_PIC.png');                        
        }else{
            mother_photo = {uri:MotherIMG + "?" + image_updater};
        }



        
        var spouse_photo = "";
        if(SpouseIMG===null || SpouseIMG ===""){    
            
            if(Mem_Sex=="1"){            
                spouse_photo = require('../img/woman_PIC.png');
                }
                else{            
                    spouse_photo = require('../img/man_PIC.png');
                }            
        }else{
            spouse_photo = {uri:SpouseIMG + "?" + image_updater};
        }


        
          
          
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_IMG:member_photo}))

          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_FIMG:father_photo}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_MIMG:mother_photo}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_SIMG:spouse_photo}))
          

          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Name:Mem_Name}))

          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_SL:Mem_SL}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_PID:PID}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_CID:CID}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Formatted_PID:FormattedMPID}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Formatted_CID:FormattedMCID}))

          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_DOB:memberDOB}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_DOB_Source:DOB_Source}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_mem_age:Mem_DOB!==""? moment().diff(Mem_DOB,"years",false)+ " বছর": "জন্ম তারিখ নেই"}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Village_Code:Village_Code}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Bari_Code:Bari_Code}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_HH_Code:HH_Code}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Sex:gender}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Sex_avatar:member_photo}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Sex_value:Mem_Sex}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Marital_Status:Marital_Status}))
          setMemberProfile((memberProfile)=>({...memberProfile,Marital_Status_value:Marital_Status_value}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_reg_date:enroll_date}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_father_name:father_name}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Father_MCID:Father_MCID}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_mother_name:mother_name}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mother_MCID:Mother_MCID}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mother_block:block}))
          
          setMemberProfile((memberProfile)=>({...memberProfile,icon_HHH:If_HH_Head}))
          setMemberProfile((memberProfile)=>({...memberProfile,icon_MWRA:if_is_MWRA}))
          setMemberProfile((memberProfile)=>({...memberProfile,icon_Pregnant:ifPregnent}))
          setMemberProfile((memberProfile)=>({...memberProfile,icon_child:if_Child}))
          setMemberProfile((memberProfile)=>({...memberProfile,icon_Old:if_Old}))
          setMemberProfile((memberProfile)=>({...memberProfile,icon_OnlyMem:if_Only_member}))
          setMemberProfile((memberProfile)=>({...memberProfile,icon_abroad:if_abroad}))
          setMemberProfile((memberProfile)=>({...memberProfile,icon_Guest:if_Guest}))

          setMemberProfile((memberProfile)=>({...memberProfile,selected_is_MWRA:is_MWRA}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_pregnent:pregnent}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_OldStatus:OldStatus}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Spouse:Spouse}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Guest_date_from:Guest_date_from}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Spouse_MCID:Spouse_MCID}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Enroll_Type:Mem_Enroll_Type}))

          
          //SetModelData((SetModelData)=>({...SetModelData,ChildError:ChildStatusError }))

            
        }                
                
        setLoading({loadingState:false})
  
      
          },
          function(tx, error){
          console.log("add data error: "+ error.message);
          });
          });


      }





const toUpdate_member=()=>{

  if(props.toUpdate==="yes"){
    set_toUpdate_hide(false);
    set_toUpdate_show(true);
  }
  else if(props.toUpdate==="complete_migration"){
    set_toUpdate_hide(false);
    set_toUpdate_show(true);
    setAliveOption(true);
    setAdjustHeight(155);
  }    
  // else{
  //   set_toUpdate_hide(true);
  //   set_toUpdate_show(false);
  // }
}

useEffect(()=>{
  toUpdate_member()
},[]);



const[toMIgrate, setToMIgrate] = useState(false);
const[HHList_container, setHHList_container] = useState(false);

const migration=()=>{
  if(props.migration==="Yes_fromHH"){
    set_toUpdate_hide(false);
    setToMIgrate(true);
    setHHList_container(false);
    // setMigrationConfirmation(true);
    setHH("");
  }
  else if(props.migration==="Yes_fromBari"){
    set_toUpdate_hide(false);
    setHHList_container(true);
    setToMIgrate(true);
    setMigrationConfirmation(false);
  }



  // Yes_fromBari
  // else{
  //   set_toUpdate_hide(true);
  //   setToMIgrate(false);
  // }
}



useEffect(()=>{
  migration();
},[])
  



const[mwraVisitShow, setMwraVisitShow]=useState(false);



const mwra_survey_visit = ()=>{

  if(props.fromMWRA_list===true){ //this props coming from Inside_khana_mwra_list.js to show buttom MWRA প্রোফাইল.
    setMwraVisitShow(true);
  }
  else{
    setMwraVisitShow(false);
  }

  // if(props.mwraVisit==="yes"){
  //   setMwraVisitShow(true);
  // }else{
  //   setMwraVisitShow(false);
  // }
}
      

useEffect(()=>{
  mwra_survey_visit()
},[])



        useEffect(()=>{
            open_profile();
        },[selectedMemberMPID, selectedMemberMSL])




        const Died_on_checker=()=>{
            if(Died_on!="" && Died_on_check!=""){
              SetDied_on("");
              SetDied_on_check(""); 
              SetDied_on_Open(true);    
             }
            else if(Died_on=="" && Died_on_check==""){
           SetDied_on_Open(true);    
          }
          else if(Died_on!="" && Died_on_check==""){
            Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetVC_DT_Open(true)}}])
          }
          else{
            // do nothing
          }      
          }



          const Died_on_onConfirm=(Died_on_confirmed)=>{
  
            if(Died_on_check=="" && Died_on==""){
              SetDied_on_check(moment(Died_on_confirmed).format("MMM DD, YYYY"))    
              Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetDied_on_Open(true)}}])
            }
            else if(Died_on_check!=="" && Died_on=="" && Died_on_check!=(moment(Died_on_confirmed).format("MMM DD, YYYY"))){    
              Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+Died_on_check+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(Died_on_confirmed).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{SetDied_on_Open(true)}}])    
              SetDied_on("");
              SetDied_on_check(""); 
            }else{
              SetDied_on(moment(Died_on_confirmed).format("MMM DD, YYYY"))           
            }
            
          }




          const update_status=(clicked)=>{  
            if(clicked==="died"){
              Set_member_update_status((member_update_status)=>({...member_update_status, radio_1:"yes"}))
              Set_member_update_status((member_update_status)=>({...member_update_status, radio_2:"no"}))
              Set_member_update_status((member_update_status)=>({...member_update_status, radio_3:"no"}))
              Set_member_update_status((member_update_status)=>({...member_update_status, value:"3"}))  
              SetMigrateOut(false);
              SetDiedDate_container(true);
          
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, value:""}));
          
          
          }
          if(clicked==="alive"){
            Set_member_update_status((member_update_status)=>({...member_update_status, radio_1:"no"}))
            Set_member_update_status((member_update_status)=>({...member_update_status, radio_2:"no"}))
            Set_member_update_status((member_update_status)=>({...member_update_status, radio_3:"yes"}))
            Set_member_update_status((member_update_status)=>({...member_update_status, value:"1"}))  
            SetMigrateOut(false);
            SetDiedDate_container(true);
        
            SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
            SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
            SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
            SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
            SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
            SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
            SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
            SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
            SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
            SetMigration_reason((Migration_reason)=>({...Migration_reason, value:""}));
          
        
        
        }
            else if(clicked==="migrate"){
              Set_member_update_status((member_update_status)=>({...member_update_status, radio_1:"no"}))
              Set_member_update_status((member_update_status)=>({...member_update_status, radio_2:"yes"}))
              Set_member_update_status((member_update_status)=>({...member_update_status, radio_3:"no"}))
              Set_member_update_status((member_update_status)=>({...member_update_status, value:"2"}))
              SetMigrateOut(true);
              SetDiedDate_container(true);
              SetDied_on("");
              SetDied_on_check("");
            
            }
          }


          const MigrateOutReason=(value)=>{
            if(value==="1"){
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"yes"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, value:"1"}));
            }
            else if(value==="2"){
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"yes"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, value:"2"}));
            }
            else if(value==="3"){
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"yes"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, value:"3"}));
            } 
            else if(value==="4"){
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"yes"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, value:"4"}));
            }
            else if(value==="5"){
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"yes"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, value:"5"}));
            } 
            else if(value==="6"){
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"yes"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, value:"6"}));
            }
            else if(value==="7"){
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"yes"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, value:"7"}));
            } 
            else if(value==="8"){
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"yes"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, value:"8"}));
            } 
            else if(value==="9"){
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_1:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_2:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_3:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_4:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_5:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_6:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_7:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_8:"no"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, radio_9:"yes"}));
              SetMigration_reason((Migration_reason)=>({...Migration_reason, value:"9"}));
            } 
            
          
          }




          

const update_current_status_confirmation=(Mem_SL)=>{
  
    if(member_update_status.value===""){
  Alert.alert("তথ্য আপডেট","তথ্য আপডেটের ক্ষেত্রে, প্রথমে নিচের অপশন থেকে যে কোন একটি নির্বাচন করতে হবে। ",[{text:"ঠিক আছে", onPress:()=>""}])                  
    }  
    else if(member_update_status.value==="3" && (Died_on==="" || moment((moment(Died_on, "MMM DD, YYYY").format("YYYY-MM-DD"))).isBefore((moment(memberProfile.selected_Mem_DOB, "MMM DD, YYYY").format("YYYY-MM-DD"))))){
      Alert.alert("তথ্য আপডেট","সদস্য মারা গিয়েছেন নির্বাচন করা হয়েছে। সে ক্ষত্রে, মারা যাওয়ার সঠিক তারিখ দিতে হবে। মারা যাওয়ার তারিখ জন্মের তারিখ থেকে কম হবে না।",[{text:"ঠিক আছে", onPress:()=>""}])                  
    }
    else if(member_update_status.value==="2" && Migration_reason.value===""){
      Alert.alert("তথ্য আপডেট","সদস্য স্থানান্তরিত হয়েছেন নির্বাচন করা হয়েছে। সে ক্ষত্রে, স্থানান্তরিত হওয়ার সঠিক কারন একটি নির্বাচন করতে হবে।",[{text:"ঠিক আছে", onPress:()=>""}])                  
    }
    else if(member_update_status.value==="2" && (Died_on==="" || moment((moment(Died_on, "MMM DD, YYYY").format("YYYY-MM-DD"))).isBefore((moment(memberProfile.selected_Mem_DOB, "MMM DD, YYYY").format("YYYY-MM-DD"))))){
      Alert.alert("তথ্য আপডেট","সদস্য স্থানান্তরিত হয়েছেন নির্বাচন করা হয়েছে। সে ক্ষত্রে, স্থানান্তরিত হওয়ার সঠিক তারিখ একটি নির্বাচন করতে হবে। তারিখ জন্মের তারিখ থেকে কম হবে না।",[{text:"ঠিক আছে", onPress:()=>""}])                  
    }
    else if(member_update_status.value==="1" && (Died_on==="" || moment((moment(Died_on, "MMM DD, YYYY").format("YYYY-MM-DD"))).isBefore((moment(memberProfile.selected_Mem_DOB, "MMM DD, YYYY").format("YYYY-MM-DD"))))){
      Alert.alert("তথ্য আপডেট","সদস্য স্থায়ী এবং জীবিত হিসাবে নির্বাচন করা হয়েছে। সে ক্ষত্রে, অবস্থা পরিবর্তন হওয়ার সঠিক তারিখ একটি নির্বাচন করতে হবে। তারিখ জন্মের তারিখ থেকে কম হবে না।",[{text:"ঠিক আছে", onPress:()=>""}])                  
    }
    else if(member_update_status.value==="1" && parseInt(memberProfile.selected_Guest_date_from)<6 && memberProfile.selected_Guest_date_from!=""){
      Alert.alert("তথ্য আপডেট","সদস্য স্থায়ী এবং জীবিত হিসাবে নির্বাচন করা হয়েছে। সে ক্ষত্রে, অতিথির অবস্থান কমপক্ষে ৬ মাস বা তাঁর বেশি হলে, অবস্থার পরিবর্তন করতে পারবেন। নির্বাচিত সদস্য এই খানায় অতিথি হিসাবে আছেন "+memberProfile.selected_Guest_date_from+" মাস থেকে।",[{text:"ঠিক আছে", onPress:()=>""}])                  
    }
    else if(member_update_status.value==="1" &&  memberProfile.selected_Guest_date_from=="" && props.toUpdate!=="complete_migration"){
      Alert.alert("তথ্য আপডেট","সদস্য স্থায়ী এবং জীবিত হিসাবে নির্বাচন করা হয়েছে। অতিথি হিসাবে কবে থেকে বর্তমান খানায় অবস্থান করছেন, তাঁর কোন সঠিক তারিখ নেই। আপনার সুপারভাইসারের সাথে যোগাযোগ করুন।",[{text:"ঠিক আছে", onPress:()=>""}])                  
    }
    else if(member_update_status.value==="2" && props.toUpdate==="complete_migration"){
      Alert.alert("তথ্য আপডেট","সদস্যের বর্তমান অবস্থা স্থানান্তরিত হিসাবে আছে। তাই সদস্যকে আবার স্থানান্তরিত হিসাবে তথ্য আপডেট করতে পারবেননা।",[{text:"ঠিক আছে", onPress:()=>""}])                  
    }

    else if(member_update_status.value==="3"){
      Alert.alert("তথ্য আপডেট(মারা গিয়েছেন)", "আপনি কি নিশ্চিত সদস্য মারা গিয়েছেন এবং সদস্যকে মৃত হিসাবে স্ট্যাটাস আপডেট করতে চাচ্ছেন?",[{text:"না সঠিক না", onPress:()=>""},{text:"তথ্য সঠিক", onPress:()=>update_current_status(Mem_SL)}])  
    }
    else if(member_update_status.value==="2"){    
      Alert.alert("তথ্য আপডেট(স্থানান্তরিত)", "আপনি কি নিশ্চিত সদস্য স্থানান্তরিত হয়েছেন এবং স্থানান্তরিত হিসাবে স্ট্যাটাস আপডেট করতে চাচ্ছেন?",[{text:"না সঠিক না", onPress:()=>""},{text:"তথ্য সঠিক", onPress:()=>update_current_status(Mem_SL)}])  
    }
    else if(member_update_status.value==="1"){    
      Alert.alert("তথ্য আপডেট(স্থায়ী এবং জীবিত)", "আপনি কি নিশ্চিত সদস্য স্থায়ী এবং জীবিত হিসাবে স্ট্যাটাস আপডেট করতে চাচ্ছেন?",[{text:"না সঠিক না", onPress:()=>""},{text:"তথ্য সঠিক", onPress:()=>update_current_status(Mem_SL)}])  
    }
    
  }



  
const update_current_status= (Mem_SL)=>{


  var iconStatus = "";
  var enrollType = "";

  if(parseInt(memberProfile.selected_mem_age)<=5){
    iconStatus = "3";
    enrollType = "3";//Child
    isMWRA = '2';
    }
    else if(memberProfile.selected_Mem_Sex_value=="2" && memberProfile.Marital_Status_value=="1"){
    iconStatus = "2";
    enrollType = "2";//mwra
    isMWRA = '1';
    }
    else{
    iconStatus = "5";
    enrollType = "5";//member
    isMWRA = '2';
    }

    

    if(member_update_status.value==="3"){//status died
     var c_status = "3";
     var status_changed_on = moment(Died_on, "MMM DD, YYYY").format("YYYY-MM-DD");
     var Alert_headder = "তথ্য পরিবর্তন হয়েছে(মৃত)"; 
     var add_update = "";
    }
    else if(member_update_status.value==="2"){//status migration out
      var c_status = "2";
      var status_changed_on = moment(Died_on, "MMM DD, YYYY").format("YYYY-MM-DD");
      var Alert_headder = "তথ্য পরিবর্তন হয়েছে(স্থানান্তরিত)";
      var add_update = "";
     }
     else if(member_update_status.value==="1"){//alive  and parmamnet from guset status
      var c_status = "1";
      var status_changed_on = moment(Died_on, "MMM DD, YYYY").format("YYYY-MM-DD");
      var Alert_headder = "তথ্য পরিবর্তন হয়েছে(জীবিত এবং স্থায়ী সদস্য)";
      var add_update = ", Mem_Icon = '"+iconStatus+"', Mem_Enroll_Type = '"+enrollType+"', is_MWRA = '"+isMWRA+"' ";
     }
     else{
      var add_update = "";
     }
  
     
  
    db.transaction(tx=>{
      tx.executeSql(
      "update member set Mem_Cstatus = '"+c_status+"', ReasonToMigrate = '"+Migration_reason.value+"',  statusCngOn ='"+status_changed_on+"', Edit_Date =  '"+moment().format("YYYY-MM-DD HH:mm")+"'  "+add_update+" WHERE Mem_SL = '"+Mem_SL+"' ",
      [],
      (tx, result)=>{
  
        
  
        if(result.rowsAffected>0){      
          console.log(add_update +"~~~~~"+memberProfile.selected_Mem_Sex_value+"~~"+memberProfile.selected_Marital_Status);     
          if(props.toUpdate==="complete_migration"){
            Alert.alert("পরিবর্তন হয়েছে", "নির্বাচিত সদস্যের অবস্থান পরিবর্তন হয়েছে।",[{text:"ঠিক আছে", onPress:()=>props.afterMigrationConfirmation(result.rowsAffected)}])                  
          } else{
            Alert.alert(Alert_headder, "আপনার দেয়া তথ্য সঠিক ভাবে পরিবর্তন হয়েছে। আপনি কি আর অন্য কোন সদস্যের তথ্য আপডেট করতে চাচ্ছেন?",[{text:"না, আর কোন তথ্য পরিবর্তন করব না", onPress:()=>props.back_to_survey(result.rowsAffected)},{text:"অন্য সদস্যের তথ্য পরিবর্তন করব", onPress:()=>props.pass_value_for_back_to_survey(result.rowsAffected)}])          
            SetData_update_tracker(result.rowsAffected);  
          }    
          
    
        }      
  
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });
    
  
  }

const [camera_container_open, set_camera_container_open] = useState(false);
const [camera_document_type, set_camera_document_type] = useState("");
const [mem_sl_for_camera, setMem_sl_for_camera] = useState("");


const open_camera=  (mem_sl,doc_type)=>{
    setMem_sl_for_camera(mem_sl);
    set_camera_container_open(true);
    setShow_profile(false);
    set_camera_document_type(doc_type);
}

  const close_camera=(data)=>{
    var close = data="close"? false : true;
    set_camera_container_open(close);    
    setShow_profile(true);
    open_profile();
  }





// const [image_updater, setImage_updater] = useState(Math.random());


const [imageAvailable, setImgAvailable] = useState("");
const show_hh_picture=()=>{
  // setImage_updater(Math.random());
  const full_image_path = RNFS.DocumentDirectoryPath+"/PRFIMAGES/HOUSES/"+props.villageCode+""+props.bari+""+props.hh+".jpg";
  RNFS.exists(full_image_path)
  .then((exist)=>{
    if(exist){
      setImgAvailable({uri:("file://"+full_image_path + "?" + image_updater)});
        console.log("exist");
        // setHideOverlay(false);
    }else{
      setImgAvailable(require("../img/noimage.png"));
      console.log("not exist");
      // setHideOverlay(true);
    }
  }).catch((error)=>{
    console.log(error);
  })
}

useEffect(()=>{
  show_hh_picture()
},[image_updater])




const valuesForMwraSurvey = [
  props.valuesForMwraSurvey[0],//0
  props.valuesForMwraSurvey[1],//1
  props.valuesForMwraSurvey[2],//2
  props.valuesForMwraSurvey[3],//3
  props.valuesForMwraSurvey[4],//4
  props.valuesForMwraSurvey[5],//5
  props.valuesForMwraSurvey[6],//6
  props.valuesForMwraSurvey[7],//7
  props.valuesForMwraSurvey[8], //8
  props.valuesForMwraSurvey[9],//9
  props.valuesForMwraSurvey[10],//10
  props.valuesForMwraSurvey[11],//11
  props.valuesForMwraSurvey[12],//12
  props.valuesForMwraSurvey[13],//13
  props.valuesForMwraSurvey[14],//14
  
  // props.valuesForMwraSurvey[15],//15
  // memberProfile.selected_Mem_SL,//16
  // memberProfile.selected_Mem_PID//17
  ];




  

const go_to_mwra_survey = ()=>{

setShow_profile(false);

if(props.byPass===true){

  Navigation.push(props.valuesForMwraSurvey[12],{
    component:{
      name:"MWRA_Survey",
      passProps:{
        name:props.valuesForMwraSurvey[0], //props.name,
        userID:props.valuesForMwraSurvey[1],//props.userID,
        password:props.valuesForMwraSurvey[2],//props.password,
        cluster:props.valuesForMwraSurvey[3],//props.cluster,
        roundNo:props.valuesForMwraSurvey[4],//props.roundNo,
        block:memberProfile.selected_Mother_block,
        villageCode:memberProfile.selected_Village_Code,
        villageName:props.valuesForMwraSurvey[7],//props.villageName,
        bari:memberProfile.selected_Bari_Code,
        bariName:props.valuesForMwraSurvey[9],//props.bariName,
        hh:memberProfile.selected_HH_Code,
        hhName:props.valuesForMwraSurvey[11],//props.hhName,
        componentId:props.valuesForMwraSurvey[12],//props.componentId,
        MemberAddTracker:props.valuesForMwraSurvey[13],//props.MemberAddTracker,//13
        MemberUpdateTracker:props.valuesForMwraSurvey[14],//props.MemberUpdateTracker//14                  
        mwraVisit:props.mwraVisit,//mwraVisit="yes"//15
        selected_Mem_SL:memberProfile.selected_Mem_SL,//memberProfile.selected_Mem_SL//16
        selected_Mem_PID:memberProfile.selected_Mem_PID,
        
        byPass:props.byPass
      },

      options:{
        topBar:{
          visible:true,
          title:{
            text:"MWRA প্রোফাইল"
          },
          rightButtons:[{
            // id:"backbutton",
            component:{
              name:"BackButton",
              passProps:{                  
                originComponentId: props.valuesForMwraSurvey[12],
                position: "MWRA_profile_byPass",
                backButtonText:"বর্তমানে গর্ভবতীদের লিস্ট",
                name:props.valuesForMwraSurvey[0], //props.name,
                userID:props.valuesForMwraSurvey[1],//props.userID,
                password:props.valuesForMwraSurvey[2],//props.password,
                cluster:props.valuesForMwraSurvey[3],//props.cluster,
                roundNo:props.valuesForMwraSurvey[4],//props.roundNo,
                block:valuesForMwraSurvey[5],//props.block,
                // villageCode:props.valuesForMwraSurvey[6],//props.villageCode,
                // villageName:props.valuesForMwraSurvey[7],//props.villageName,
                // bari:props.valuesForMwraSurvey[8],//props.bari, 
                // bariName:props.valuesForMwraSurvey[9],//props.bariName,
                // hh:props.valuesForMwraSurvey[10],//props.hh,
                // hhName:props.valuesForMwraSurvey[11],//props.hhName,
                // componentId:props.valuesForMwraSurvey[12],//props.componentId,
                // MemberAddTracker:props.valuesForMwraSurvey[13],//props.MemberAddTracker,//13
                // MemberUpdateTracker:props.valuesForMwraSurvey[14],//props.MemberUpdateTracker//14                  
                // mwraVisit:props.mwraVisit,//mwraVisit="yes"//15
                // selected_Mem_SL:memberProfile.selected_Mem_SL,//memberProfile.selected_Mem_SL//16
                // selected_Mem_PID:memberProfile.selected_Mem_PID

                
              }
            }
  
            
          }]
          
        }
      }


    }
  })

}else{

    Navigation.push(props.valuesForMwraSurvey[12],{
      component:{
        name:"MWRA_Survey",
        passProps:{
          name:props.valuesForMwraSurvey[0], //props.name,
          userID:props.valuesForMwraSurvey[1],//props.userID,
          password:props.valuesForMwraSurvey[2],//props.password,
          cluster:props.valuesForMwraSurvey[3],//props.cluster,
          roundNo:props.valuesForMwraSurvey[4],//props.roundNo,
          block:valuesForMwraSurvey[5],//props.block,
          villageCode:props.valuesForMwraSurvey[6],//props.villageCode,
          villageName:props.valuesForMwraSurvey[7],//props.villageName,
          bari:props.valuesForMwraSurvey[8],//props.bari, 
          bariName:props.valuesForMwraSurvey[9],//props.bariName,
          hh:props.valuesForMwraSurvey[10],//props.hh,
          hhName:props.valuesForMwraSurvey[11],//props.hhName,
          componentId:props.valuesForMwraSurvey[12],//props.componentId,
          MemberAddTracker:props.valuesForMwraSurvey[13],//props.MemberAddTracker,//13
          MemberUpdateTracker:props.valuesForMwraSurvey[14],//props.MemberUpdateTracker//14                  
          mwraVisit:props.mwraVisit,//mwraVisit="yes"//15
          selected_Mem_SL:memberProfile.selected_Mem_SL,//memberProfile.selected_Mem_SL//16
          selected_Mem_PID:memberProfile.selected_Mem_PID
        },
  
        options:{
          topBar:{
            visible:true,
            title:{
              text:"MWRA প্রোফাইল"
            },
            rightButtons:[{
              // id:"backbutton",
              component:{
                name:"BackButton",
                passProps:{                  
                  originComponentId: props.valuesForMwraSurvey[12],
                  position: props.mwraVisit==='yes' ? "MWRA_Survey_for_survey_visit" : "MWRA_Survey_for_profile_check",
                  backButtonText:props.mwraVisit==='yes' ? "MWRA লিস্ট" : "খানা",                  
                  name:props.valuesForMwraSurvey[0], //props.name,
                  userID:props.valuesForMwraSurvey[1],//props.userID,
                  password:props.valuesForMwraSurvey[2],//props.password,
                  cluster:props.valuesForMwraSurvey[3],//props.cluster,
                  roundNo:props.valuesForMwraSurvey[4],//props.roundNo,
                  block:valuesForMwraSurvey[5],//props.block,
                  villageCode:props.valuesForMwraSurvey[6],//props.villageCode,
                  villageName:props.valuesForMwraSurvey[7],//props.villageName,
                  bari:props.valuesForMwraSurvey[8],//props.bari, 
                  bariName:props.valuesForMwraSurvey[9],//props.bariName,
                  hh:props.valuesForMwraSurvey[10],//props.hh,
                  hhName:props.valuesForMwraSurvey[11],//props.hhName,
                  componentId:props.valuesForMwraSurvey[12],//props.componentId,
                  MemberAddTracker:props.valuesForMwraSurvey[13],//props.MemberAddTracker,//13
                  MemberUpdateTracker:props.valuesForMwraSurvey[14],//props.MemberUpdateTracker//14                  
                  mwraVisit:props.mwraVisit,//mwraVisit="yes"//15
                  selected_Mem_SL:memberProfile.selected_Mem_SL,//memberProfile.selected_Mem_SL//16
                  selected_Mem_PID:memberProfile.selected_Mem_PID
  
                  
                }
              }
    
              
            }]
            
          }
        }
  
  
      }
    })
  }
  

}



const migrate_confirmation=(value)=>{
  if(value==="1" && (member_migration.value==="2" || member_migration.value==="")){
    set_member_migration((member_migration)=>({...member_migration, radio_1:"yes"}));
    set_member_migration((member_migration)=>({...member_migration, value:"1"}));
    setNew_CID_container(true);
    generateIDs();
  }
  else{
    set_member_migration((member_migration)=>({...member_migration, radio_1:"no"}));
    set_member_migration((member_migration)=>({...member_migration, value:"2"}));
    setNew_CID_container(false);
  }
  
  
}

const [New_CID_container, setNew_CID_container] = useState(false);

const{updateIDs, PID, CID, Serial, LineNo} =  GenerateIDs();

const [generated_PID, setPID] = useState("");
const [generated_CID, setCID] = useState("");
const [generated_MemSL, setMemSL] = useState("");
const [generated_LineNo, setLineNo] = useState("");


const generateIDs= async()=>{

  var hh = props.migration==="Yes_fromHH" ? props.hh : props.migration==="Yes_fromBari" && ManuallySelectedHH!=="" ? ManuallySelectedHH : "";

if(hh!==""){
  setPID("অপেক্ষা করুন");
  setCID("অপেক্ষা করুন")
  setMemSL("")
  setLineNo("");
  const ids = await updateIDs("103", "01", props.villageCode, props.bari, hh);//"103", "01", just to execute the function not necessary for generate the cid and line no  
  setPID(ids.PID);
  setCID(ids.CID)
  setMemSL(ids.Serial)
  setLineNo(ids.LineNo);
}

}






const update_member_migration=()=>{

  var hh = props.migration==="Yes_fromHH" ? props.hh : props.migration==="Yes_fromBari" && ManuallySelectedHH!=="" ? ManuallySelectedHH : "";


if(props.migration==="Yes_fromHH" && member_migration.value===""){
  Alert.alert("খানা পরিবর্তন", "নির্বাচিত সদস্যকে এই খানায় যোগ করতে চাচ্ছেন, হ্যাঁ বাটনে ক্লিক করুন।",[{text:"ঠিক আছে", onPress:()=>""}])  
 
}
else if(props.migration==="Yes_fromBari" && hh==""){
  Alert.alert("খানা নির্বাচন করুন", "নির্বাচিত সদস্যকে যে খানায় যোগ করতে চাচ্ছেন, সে খানা নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}])  
}
else if(props.migration==="Yes_fromBari" && hh!="" && member_migration.value===""){
  Alert.alert("খানা পরিবর্তন", "নির্বাচিত সদস্যকে এই খানায় যোগ করতে চাচ্ছেন, হ্যাঁ বাটনে ক্লিক করুন।",[{text:"ঠিক আছে", onPress:()=>""}])   
}
else{
  db.transaction(tx=>{
    tx.executeSql(
    "update member "+
    "SET "+
    "Mem_Cstatus = '1',  "+
    "ReasonToMigrate = '', "+
    "Village_Code = '"+props.villageCode+"', "+
    "Bari_Code = '"+props.bari+"', "+
    "HH_Code = '"+hh+"', "+
    "MCID = '"+generated_CID+"', "+
    "Mem_Line_No = '"+generated_LineNo+"', "+
    "Edit_Date=date('now') "+
    "WHERE "+
    "Mem_SL = '"+props.mem_sl+"' ",
    [],
    (tx, result)=>{

      if(result.rowsAffected>0){        
if(props.migration==="Yes_fromHH"){
        Alert.alert("পরিবর্তন হয়েছে", "নির্বাচিত সদস্য সঠিক ভাবে উল্লেখিত খানায় যোগ হয়েছে।। আপনি কি আর অন্য কোন সদস্যের যোগ করতে চাচ্ছেন?",[{text:"না, আর কোন সদস্য যোগ হবে না", onPress:()=>props.back_to_survey(result.rowsAffected)},{text:"হ্যাঁ, অন্য সদস্য যোগ করব।", onPress:()=>props.pass_value_for_back_to_survey(result.rowsAffected)}])                  
}
else if(props.migration==="Yes_fromBari"){
  Alert.alert("পরিবর্তন হয়েছে", "নির্বাচিত সদস্য সঠিক ভাবে উল্লেখিত খানায় যোগ হয়েছে।।",[{text:"ঠিক আছে", onPress:()=>props.afterUpdate(result.rowsAffected)}])                  
}

      }        
    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });




    db.transaction(tx=>{
      tx.executeSql(
    "update MWRA_Survey "+
    "set "+
		"cid = '"+generated_CID+"', "+
		"village = '"+props.villageCode+"', "+
		"bari='"+props.bari+"', "+
		"hh='"+hh+"' "+
		"WHERE "+
		"pid = '"+props.mpid+"' ",
      [],
      (tx, result)=>{
  
        if(result.rowsAffected>0){          
          console.log("MWRA_updated");
        }        
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });




      db.transaction(tx=>{
        tx.executeSql(
      "update Preg_Outcome_Mother "+
      "SET "+
      "MCID = '"+generated_CID+"' "+
      "WHERE "+
      "Mem_PID = '"+props.mpid+"' ",
        [],
        (tx, result)=>{    
          if(result.rowsAffected>0){          
            console.log("Preg_Outcome_Mother updated");
          }        
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });



        db.transaction(tx=>{
          tx.executeSql(
        "update Preg_Outcome_Baby "+
        "SET "+
          "MCID = '"+generated_CID+"' "+
          "WHERE "+
          "Mem_PID = '"+props.mpid+"' ",
          [],
          (tx, result)=>{    
            if(result.rowsAffected>0){          
              console.log("Preg_Outcome_Baby updated");
            }        
          },
          function(tx, error){
          console.log("add data error: "+ error.message);
          });
          });



}
}


const[migrationConfirmation, setMigrationConfirmation] = useState(false);





const [hhList, setHHList] = useState([]);

  const getListOfKhana=()=>{  
    console.log("vill_"+props.villageCode);
    console.log("bari_"+props.bari);
    console.log("selected member HH "+memberProfile.selected_HH_Code);

    // setHHList((SelectedSpouse)=>({...SelectedSpouse, name:""}))
    // setHHList((SelectedSpouse)=>({...SelectedSpouse, value:""}))

db.transaction(tx=>{
  tx.executeSql(
  "select  hh.hh 'hh', hh.hh_name 'hh_name' from hh "+
  "inner join member m on hh.village = m.Village_Code and hh.bari = m.Bari_Code and hh.hh = m.HH_Code and m.Mem_Cstatus in ('1', '6') "+
  "where hh.village = '"+props.villageCode+"' and hh.bari = '"+props.bari+"' and hh.hh!= '"+memberProfile.selected_HH_Code+"' and hh.cStatus = '1' group by hh.village, hh.bari, hh.hh order by hh.hh",
  [],
  (tx, result)=>{
    
  var length = result.rows.length;

        if(length>0){
          let results = [];
          for(let i= 0; i<length; i++){
             let items=result.rows.item(i);

             results.push({name:items.hh_name+" ("+items.hh+")", value:items.hh});                

          } 
          setHHList(results);
        }

  },
  function(tx, error){
  console.log("add data error: "+ error.message);
  });
  });
}

useEffect(()=>{
  getListOfKhana();
},[toMIgrate, memberProfile.selected_HH_Code])

const [ManuallySelectedHH, setHH] = useState("");


const show_migration_confirmation_container=()=>{
if(ManuallySelectedHH!=="" && props.migration==="Yes_fromBari"){
  setMigrationConfirmation(true);
}
else if(props.migration==="Yes_fromHH"){
  setMigrationConfirmation(true);
}
else{
  setMigrationConfirmation(false);
}
}

useEffect(()=>{
  show_migration_confirmation_container();
},[ManuallySelectedHH])


useEffect(()=>{
  generateIDs();
}, [ManuallySelectedHH])


const handle_no_image=()=>{
  if(memberProfile.selected_Mem_Sex_value==="1"){
    setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_IMG:require('../img/man_PIC.png')}))    
  }
  else{
    setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_IMG:require('../img/woman_PIC.png')}))
  }
}



const no_image_father=()=>{
  setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_FIMG:require('../img/man_PIC.png')}))
}
const no_image_mother=()=>{
  setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_MIMG:require('../img/woman_PIC.png')}))
}

const no_image_spouse=()=>{
  if(memberProfile.selected_Mem_Sex_value==="1"){
    setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_SIMG:require('../img/woman_PIC.png')}))
  }else{
    setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_SIMG:require('../img/man_PIC.png')}))
  }

  
}



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
return(
    <View>

{camera_container_open &&(
<Camera_open document_type = {camera_document_type} close_container={close_camera} mem_serial = {mem_sl_for_camera} idcard = {mem_sl_for_camera} houseno={""} member_gender = {memberProfile.selected_Mem_Sex}/>
)}

<Modal visible={show_profile} transparent={true} animationType="fade">

      <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
      <View style={{borderRadius:10, backgroundColor:"#f0f0f0", minHeight:"50%", width:"63%", flexDirection:"column", padding:5, alignItems:"center"}}>
        

        <Image source={imageAvailable} style={{height:200, width:"100%", borderTopLeftRadius:9, borderTopRightRadius:9}}/>
        <TouchableOpacity onPress={open_camera.bind(this,memberProfile.selected_Mem_SL,"profile")}>
        <Image onError={handle_no_image}  source={memberProfile.selected_Mem_IMG} style={{height:95, width:95, borderRadius:100, marginTop:-55, borderWidth:2, borderColor:"#FFF"}}/>  
        </TouchableOpacity>

        

        <Text style={{fontSize:18, color:"#db2777", fontWeight:"bold"}}>{memberProfile.selected_Mem_Name}</Text>

        <View style={{width:"100%", flexDirection:"row", justifyContent:"center"}}>
          {memberProfile.icon_HHH}
          {memberProfile.icon_Guest}
          {memberProfile.icon_MWRA}
          {memberProfile.icon_Old}
          {memberProfile.icon_OnlyMem}
          {memberProfile.icon_Pregnant}
          {memberProfile.icon_abroad}
          {memberProfile.icon_child}
        </View>

        <View style={{width:"100%", alignItems:"flex-start",marginTop:"2%", borderTopWidth:1, borderTopColor:"#e0e0e0"}}>
          <Text style={font.fontStyle}>সি আই ডি: <Text style={{color:"#db2777"}}>{memberProfile.selected_Mem_Formatted_CID}</Text></Text>
          <Text style={font.fontStyle}>পি আই ডি: <Text style={{color:"#db2777"}}>{memberProfile.selected_Mem_Formatted_PID}</Text></Text>
          <Text style={font.fontStyle}>জন্ম তারিখ: <Text style={{color:"#db2777"}}>{memberProfile.selected_Mem_DOB}</Text></Text>
          <Text style={font.fontStyle}>জন্ম তারিখের উৎস: <Text style={{color:"#db2777"}}>{memberProfile.selected_DOB_Source}</Text></Text>
          <Text style={font.fontStyle}>বর্তমান বয়স: <Text style={{color:"#db2777"}}>{memberProfile.selected_mem_age}</Text></Text>
          <Text style={font.fontStyle}>লিঙ্গ: <Text style={{color:"#db2777"}}>{memberProfile.selected_Mem_Sex}</Text></Text>
          <Text style={font.fontStyle}>বৈবাহিক অবস্থা: <Text style={{color:"#db2777"}}>{memberProfile.selected_Marital_Status}</Text></Text>
          <Text style={font.fontStyle}>নিবন্ধনের তারিখ: <Text style={{color:"#db2777"}}>{memberProfile.selected_reg_date}</Text></Text>
          



{toUpdate_hide && (
          <View style={{width:"100%", height:"auto", marginTop:10, borderTopWidth:1, borderTopColor:"#e0e0e0", paddingTop:10}}>
          
          <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", padding:2, borderBottomWidth:1, borderBottomColor:"#e0e0e0", paddingBottom:10}}>
            <View style={{width:"50%", alignItems:"flex-start", flexDirection:"row", justifyContent:"flex-start"}}>
          
          <View>
            <Image onError={no_image_father}  source={memberProfile.selected_Mem_FIMG} style={{height:50, width:50, borderRadius:100}}/>  
          </View>

            <View style={{marginLeft:5}}>
            
            <Text style={{color:"#db2777"}}>বাবাঃ {memberProfile.selected_father_name}</Text>
            <Text>MCID: {memberProfile.selected_Father_MCID}</Text>
            
            </View>

            </View>



            <View style={{borderLeftColor:"#e0e0e0", borderLeftWidth:1, width:"50%", alignItems:"flex-start", flexDirection:"row", justifyContent:"flex-start"}}>
          
          <View style={{marginLeft:5}}>
            <Image onError={no_image_mother}  source={memberProfile.selected_Mem_MIMG} style={{height:50, width:50, borderRadius:100}}/>  
          </View>

            <View style={{marginLeft:5, width:200}}>
            
            <Text numberOfLines={2}  ellipsizeMode='tail' style={{color:"#db2777"}}>মাঃ {memberProfile.selected_mother_name}</Text>
            <Text>MCID: {memberProfile.selected_Mother_MCID}</Text>            
            </View>

            </View>

          </View>

        
          {/* <Text style={font.fontStyle}></Text> */}

          <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", padding:2, borderBottomWidth:1, borderBottomColor:"#e0e0e0", paddingBottom:10}}>
            <View style={{width:"50%", alignItems:"flex-start", flexDirection:"row", justifyContent:"flex-start"}}>          
          <View>
            <Image onError={no_image_spouse} source={memberProfile.selected_Mem_SIMG} style={{height:50, width:50, borderRadius:100}}/>  
          </View>
            <View style={{marginLeft:5}}>            
            <Text style={{color:"#db2777"}}>স্বামী/স্ত্রীঃ {memberProfile.selected_Spouse}</Text>
            <Text>MCID: {memberProfile.selected_Spouse_MCID}</Text>            
            </View>
            </View>
          </View>

          
          

          </View>
)}

{toMIgrate &&(
<View style={{ width:"100%", height:"auto", borderTopWidth:1, borderTopColor:"#e0e0e0", paddingTop:5}}>      
<View style={{width:"100%"}}>
  <Text style={{fontSize:12, color:"#9e0505"}}>
    বিঃদ্রঃ যে কোন তথ্য আপডেট বা পরিবর্তনের ক্ষেত্রে ভাল ভাবে যাচাই করুন। একবার তথ্য আপডেট বা পরিবরতন কারার পর, পুনরায় ডাটা সঠিক করতে পারবেন না। সে ক্ষত্রে আপনাকে সুপারভাইসরের সাথে যোগাযোগ করতে হবে।
    {/* {data_update_tracker} */}
  </Text>

</View>



{HHList_container &&(
<View style={{height:90, width:"100%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"এই বাড়ির কোন খানায় যোগ করতে চান?"}
            inputField_1={<View style={{width:"100%"}}>
            <DropDown 
                data={hhList} 
                labelField={"name"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={ManuallySelectedHH}
                onChange={item => {                  
                  setHH(item.value);
                  
                }}
             />
            </View>} 
            />            
            </View>
            )}



{migrationConfirmation &&(
<View style={{height:100, width:"100%", marginTop:4}}>                      
      <QuestionContainer
      question={"আপনি কি নিশ্চিত, নির্বাচিত সদস্যকে এই খানায় যোগ করতে চাচ্ছেন?"}
      radio_1={<View style={{width:"45%"}}><RadioButton callFunction={migrate_confirmation.bind(this,"1")} Value={member_migration.radio_1} title={"হ্যাঁ, এই খানায় যোগ হবেন"}/></View>}            
      direction={"column"}
      />
</View>
)}


{New_CID_container && (
<View style={{height:80, width:"100%", marginTop:4}}>                      
      <QuestionContainer
      question={"নির্বাচিত সদস্যের নতুন সি আই ডি"}
      radio_1={<View style={{width:"45%"}}><Text style={{color:"#db2777", fontWeight:"bold"}}>{generated_CID}</Text></View>}            
      direction={"column"}
      />
</View>
)}



</View>
)}



{toUpdate_show && (
<View style={{ width:"100%", height:"auto", borderTopWidth:1, borderTopColor:"#e0e0e0", paddingTop:5}}>      
      <View style={{width:"100%"}}>
        <Text style={{fontSize:12, color:"#9e0505"}}>
          বিঃদ্রঃ যে কোন তথ্য আপডেট/পরিবর্তনের ক্ষেত্রে ভাল ভাবে যাচাই করুন। একবার আপডেটের পর, পুনরায় আপডেট করতে চাইলে, সুপারভাইসারের সাথে যোগাযোগ করতে হবে।
          {/* {data_update_tracker} */}
        </Text>

      </View>

      <View style={{height:adjustHeight, width:"100%", marginTop:4}}>                      
            <QuestionContainer
            question={"নির্বাচিত সদস্যের বর্তমান অবস্থা, নিচের অপশন থেকে একটি নির্বাচন করুন।"}
            radio_1={<View style={{width:"65%"}}><RadioButton callFunction={update_status.bind(this,"died")} Value={member_update_status.radio_1} title={"মারা গিয়েছেন"}/></View>}            
            radio_2={<View style={{width:"65%"}}><RadioButton callFunction={update_status.bind(this,"migrate")} Value={member_update_status.radio_2} title={"স্থানান্তরিত"}/></View>}
            radio_3={aliveOption &&( <View style={{width:"65%"}}><RadioButton callFunction={update_status.bind(this,"alive")} Value={member_update_status.radio_3} title={"এই খানায় স্থায়িভাবে বসবাস করছেন"}/></View>)}                        
            direction={"column"}
            />
      </View>      

{migrateOut &&(
      <View style={{height:350, width:"100%", marginTop:5}}>                      
            <QuestionContainer
            question={"স্থানান্তরিত হওয়ার সঠিক কারণটি নির্বাচন করুন।"}
            radio_1={<View style={{width:"90%"}}><RadioButton callFunction={MigrateOutReason.bind(this,"1")} Value={Migration_reason.radio_1} title={"বিবাহ করে অন্যত্র চলে গেছেন"}/></View>}            
            radio_2={<View style={{width:"90%"}}><RadioButton callFunction={MigrateOutReason.bind(this,"2")} Value={Migration_reason.radio_2} title={"তালাকপ্রাপ্ত হয়ে চলে গেছেন"}/></View>}            
            radio_3={<View style={{width:"90%"}}><RadioButton callFunction={MigrateOutReason.bind(this,"3")} Value={Migration_reason.radio_3} title={"এই খানায় ভাড়াটিয়া হিসাবে থাকতেন, এখন অন্যত্র চলে গেছেন "}/></View>}            
            radio_4={<View style={{width:"90%"}}><RadioButton callFunction={MigrateOutReason.bind(this,"4")} Value={Migration_reason.radio_4} title={"চাকরির সুবাদে অন্যত্র চলে গেছেন"}/></View>}            
            radio_5={<View style={{width:"90%"}}><RadioButton callFunction={MigrateOutReason.bind(this,"5")} Value={Migration_reason.radio_5} title={"স্থায়িভাবে বসবাস পরিবর্তন করে অন্যত্র চলে গেছেন"}/></View>}            
            radio_6={<View style={{width:"90%"}}><RadioButton callFunction={MigrateOutReason.bind(this,"6")} Value={Migration_reason.radio_6} title={"স্থানান্তরিত"}/></View>}            
            radio_7={<View style={{width:"90%"}}><RadioButton callFunction={MigrateOutReason.bind(this,"7")} Value={Migration_reason.radio_7} title={"এই বাড়ির অন্য একটি খানায় বসবাস করেন"}/></View>}            
            radio_8={<View style={{width:"90%"}}><RadioButton callFunction={MigrateOutReason.bind(this,"8")} Value={Migration_reason.radio_8} title={"অন্যান্য"}/></View>}            
            radio_9={<View style={{width:"90%"}}><RadioButton callFunction={MigrateOutReason.bind(this,"9")} Value={Migration_reason.radio_9} title={"জানিনা"}/></View>}            
            direction={"column"}
            />
      </View>      
)}

{DiedDate_container &&(
      <View style={{height:80, width:"100%", marginTop:"1%"}}>                      
            <QuestionContainer
            question={"নির্বাচিত সদস্য বর্তমান অবস্থা পরিবর্তনের সঠিক তারিখটি নির্বাচন করুন।"}
            inputField_1={<View style={{width:"60%"}}><TouchableOpacity onPress={Died_on_checker} ><Date_field value={Died_on} ph={"যাচাইকৃত অবস্থা পরিবর্তনের তারিখ"}/></TouchableOpacity>
            <DatePicker
            modal
            mode='date'
            title={"মৃত্যুর তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            maximumDate={new Date()}
            open={Died_on_Open}
            date={new Date()}
            onConfirm={(Died_on) => {
              SetDied_on_Open(false)                            
              Died_on_onConfirm(Died_on);
            }}
            onCancel={() => {
              SetDied_on_Open(false)
              SetDied_on("");
              SetDied_on_check(""); 
              }} />
            </View>}
            direction={"column"}
            />
            </View>
)}

</View>



)}

        </View>  


        
        <View style={{width:"100%", paddingBottom:10, justifyContent:"space-around",  flexDirection:"row", marginTop:"5%"}}>           


          <TouchableOpacity onPress={props.closeProfileModel_fun}>
          <Text style={{color:"#0e7490", textAlign:"right"}}>প্রোফাইল বক্স বন্ধ</Text>
          </TouchableOpacity>

          {toUpdate_show &&(
          <TouchableOpacity onPress={update_current_status_confirmation.bind(this,memberProfile.selected_Mem_SL)}>
          <Text style={{color:"#0e7490", textAlign:"right"}}>তথ্য আপডেট</Text>
          </TouchableOpacity>
          )}

        {mwraVisitShow &&(
          <TouchableOpacity onPress={go_to_mwra_survey}>
          <Text style={{color:"#0e7490", textAlign:"right"}}>MWRA প্রোফাইল</Text>
          </TouchableOpacity>
          )}

          {toMIgrate &&(
          <TouchableOpacity onPress={update_member_migration}>
          <Text style={{color:"#0e7490", textAlign:"right"}}>এই খানায় যোগ হবেন</Text>
          </TouchableOpacity>
          )}




        </View>

        
      </View>
      </View>

      </Modal>
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

export default Member_profile;
