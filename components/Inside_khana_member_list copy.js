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
      })
      const [show_profile, setShow_profile]=useState(false);


      const [totalRows, setTotalRows]=useState({
        totalRowsCount:""
      });




      const[memberProfile, setMemberProfile]=useState({
        selected_Mem_IMG:"",
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
        selected_Marital_Status:"",
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
        icon_abroad:""

      });

      
      const[Died_on_Open, SetDied_on_Open] = useState(false);
      const[Died_on, SetDied_on] = useState("");
      const[Died_on_check, SetDied_on_check] = useState("");


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


      const open_profile=(mpid, Mem_SL)=>{


        Set_image_updater(Math.random());

        SetMigrateOut(false);
        SetDiedDate_container(false);


        SetDied_on("");
        SetDied_on_check("");


        Set_member_update_status((member_update_status)=>({...member_update_status, radio_1:"no"}))
        Set_member_update_status((member_update_status)=>({...member_update_status, radio_2:"no"}))
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

        setShow_profile(true);

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

          "member.Entry_Date as 'reg_date', "+ 
          "member.Father_Name 'father_name', "+
          "case when father.Mem_PID = '' or father.Mem_PID is null then 'n/a' else (substr(father.MCID,1,4)||' '||substr(father.MCID,5,3)||' '||substr(father.MCID,8,3)||' '||substr(father.MCID,11,3)) end as 'Father_MCID', "+
          "member.Mother_Name 'mother_name', "+
          "case when mother.Mem_PID = '' or mother.Mem_PID is null then 'n/a' else (substr(mother.MCID,1,4)||' '||substr(mother.MCID,5,3)||' '||substr(mother.MCID,8,3)||' '||substr(mother.MCID,11,3)) end as 'Mother_MCID', "+
		  
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
		      "member.IMG "+
          "from member "+
          "left join (select Mem_Name, Mem_PID, MCID from member) father on member.Father_Line = father.Mem_PID and member.Father_Line<>'99999999999' "+
          "left join (select Mem_Name, Mem_PID, MCID from member) mother on member.Mother_Line = mother.Mem_PID and  member.Mother_Line<>'99999999999' "+
          "left join (select Mem_Name, Mem_PID, MCID from member) spouse on member.Hus_Wife_Line = spouse.Mem_PID and member.Hus_Wife_Line<>'99999999999' "+
          "left join "+
          "(WITH a as( "+
          "SELECT EDD, ROW_NUMBER() OVER (PARTITION BY pid ORDER BY CAST(MWRA_Survey.surveyNo AS int) DESC) 'rn' , pregnancyStatus, Entry_Date, pid, VisitOutCome from MWRA_Survey "+
          "WHERE "+
          "pid = '"+mpid+"' "+
          "order by cast(MWRA_Survey.surveyNo as INT) desc )select * from a where rn = 1 "+
          ") MWRA_Survey on MWRA_Survey.pid = member.Mem_PID and MWRA_Survey.VisitOutCome = '1' "+
          "WHERE "+
          "member.Mem_PID = '"+Mem_SL+"' ",
          [],
          (tx, result)=>{
            
          var length = result.rows.length;
  
  

      
                  let results = [];
   
                  for(let i= 0; i<length; i++){
                     let items=result.rows.item(i);
                      var IMG= result.rows.item(i).IMG;
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
          }
          else{
              if_Guest = "";
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
  
          var memberDOB = moment(Mem_DOB).format('MMM DD, YYYY');
          var enroll_date = moment(reg_date).format('MMM DD, YYYY');

          
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
          
          
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_IMG:member_photo}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Name:Mem_Name}))

          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_SL:Mem_SL}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_PID:PID}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_CID:CID}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Formatted_PID:FormattedMPID}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Formatted_CID:FormattedMCID}))

          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_DOB:memberDOB}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_DOB_Source:DOB_Source}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_mem_age:moment().diff(Mem_DOB,"years",false)}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Village_Code:Village_Code}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Bari_Code:Bari_Code}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_HH_Code:HH_Code}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Sex:gender}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mem_Sex_avatar:member_photo}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Marital_Status:Marital_Status}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_reg_date:enroll_date}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_father_name:father_name}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Father_MCID:Father_MCID}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_mother_name:mother_name}))
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Mother_MCID:Mother_MCID}))
          
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
          setMemberProfile((memberProfile)=>({...memberProfile,selected_Spouse_MCID:Spouse_MCID}))

          
          //SetModelData((SetModelData)=>({...SetModelData,ChildError:ChildStatusError }))

            
        }                
                
        setLoading({loadingState:false})
  
      
          },
          function(tx, error){
          console.log("add data error: "+ error.message);
          });
          });


      }


      

      const render_khana_member_items=({item})=>{

        
        

        return(
          <View style={{flex:100, flexDirection:"row", justifyContent:"flex-start"}}>

  
  
  
          {/* onPress={call.bind(this,item.hh)} */}
      
          
          <View style={{flexDirection:"column", flex:100}}>

  
          
  
      <View style={{backgroundColor:"#fff", height:90, width:"100%", borderBottomWidth:1, borderBottomColor:"#b0acac", flex:100, flexDirection:"row",  padding:10, justifyContent:"space-between"}}>
  


          <TouchableOpacity onPress={open_profile.bind(this,item.MPID, item.Member_SL)} style={{flex:90, flexDirection:"row"}}>
        <View style={{ flex:35, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        

            <View style={{flex:1, alignItems:"center",justifyContent:"center", marginLeft:15}}>
            <Image source={item.member_photo} style={{height:80, width:80, borderRadius:100, borderWidth:2, borderColor:"#0369a1"}}/>
            </View>

  
  
          <View style={{flex:5, height:"100%", justifyContent:"center", marginLeft:10, marginLeft:25}}>
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
              খানার সদস্য  ।  খানার সর্বমোট সদস্য  {totalRows.totalRowsCount}
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
      
      Set_image_updater(Math.random());
      
      // Alert.alert("from_member_list"+data_update_tracker);
      closeProfileModel();
      setLoading({loadingState:true})
    
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
        // "member.Mem_DOB 'Mem_DOB', "+
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
        "where member.Village_Code = '"+props.villageCode+"' and member.Bari_Code = '"+props.bari+"'  and member.HH_Code='"+props.hh+"' and member.Mem_Cstatus in ('1') "+
        "group by member.Mem_PID, member.Mem_SL",
        [],
        (tx, result)=>{
          
        var length = result.rows.length;


        
     
      
    
    
            setTotalRows({totalRowsCount:length})
            
    
              if(length>0){
    
                let results = [];
 
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);

                   var Mem_name = result.rows.item(i).Mem_Name;        
                   var Entry_Date = result.rows.item(i).Entry_Date;     
    

                   var IMG = result.rows.item(i).IMG;        
                   var MPID = result.rows.item(i).MPID;        
                   var Member_SL = result.rows.item(i).Member_SL;        
                   var MCID = result.rows.item(i).MCID;
                   var FormattedMPID = result.rows.item(i).FormattedMPID;
                   var FormattedMCID = result.rows.item(i).FormattedMCID;
                       
                   var enrollType = result.rows.item(i).Mem_Enroll_Type;
                   var fName = result.rows.item(i).Father_Name;
                   var mName = result.rows.item(i).Mother_Name;
                   var sName = result.rows.item(i).Spouse;
                   var cStatus = result.rows.item(i).Mem_Cstatus;        
                   var is_MWRA = result.rows.item(i).is_MWRA;
                   var pregnent = result.rows.item(i).pregnent;
                   var Mem_DOB = result.rows.item(i).Mem_DOB;        
                   var Member_sex = result.rows.item(i).Mem_Sex;
                   var OldStatus = result.rows.item(i).OldStatus;

                   var ChildStatus = result.rows.item(i).ChildStatus;
                   var PregnancyOutcome = result.rows.item(i).PregnancyOutcome;
                   var MWRAStatus = result.rows.item(i).MWRAStatus;



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


        

        
        
        
        
        var f_Name = "";
        var m_Name = "";
        var s_Name = "";
        
        if(enrollType=="3"){
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

        var memberDOB = moment(Mem_DOB).format('MMM DD, YYYY');


        var Child_status_data_error;
        if(ChildStatus==="NotChild"){
          Child_status_data_error="নির্বাচিত শিশুর বয়স ৫ বছরের বেশি আছে জন্ম তারিখ অনুযায়ী। কিন্তু ডাটাবেজে এখনও বর্তমান স্ট্যাটাস অনুযায়ী (শিশু স্ট্যাটাস) এ আছে। তাই এই ডাটা ঠিক করার জন্য খানা ভিজিটের মাধ্যমে ঠিক করুন অথবা আপনার সুপারভাইজারের সাথে আলাপ করে ডাটাটি সঠিক করুন।";
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
          waring_icon = <TouchableOpacity onPress={warning_description.bind(this,Child_status_data_error,Pregnancy_status_data_error,mwra_status_data_error)}><Image source={require('../img/exclamation.png')} style={{height:30, width:30, borderWidth:3, borderColor:"#e11d48", borderRadius:100}}/></TouchableOpacity>
        }
        else{
          waring_icon = "";
        }
        

        // var NID_card = "";
        // if(enrollType!="3"){
          NID_card = <TouchableOpacity onPress={open_camera.bind(this,Member_SL, "IDs")}><Image source={require('../img/card1.png')} style={{height:30, width:35}}/></TouchableOpacity>
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




        
        

                  results.push({if_Old:if_Old, NID_card:NID_card, Child_status_data_error:Child_status_data_error, Pregnancy_status_data_error:Pregnancy_status_data_error, mwra_status_data_error:mwra_status_data_error, waring_icon:waring_icon, Member_SL:Member_SL, MPID:MPID, MCID:MCID, Mem_name:Mem_name, f_Name:f_Name, s_Name:s_Name, m_Name:m_Name, avatar:avatar, if_Guest:if_Guest, if_Child:if_Child, if_abroad:if_abroad, if_Only_member:if_Only_member, ifPregnent:ifPregnent, if_is_MWRA:if_is_MWRA, If_HH_Head:If_HH_Head, FormattedMPID:FormattedMPID, FormattedMCID:FormattedMCID, memberDOB:memberDOB, member_photo:member_photo, gender:gender}) 
    
                }
                setMemberItems(results);
                setLoading({loadingState:false})

              }
              else{
                Alert.alert("খানার সদস্য", "এই খানায় বর্তমানে কোন সদস্য নেই।")
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



      const warning_description=(ChildStatusError, PregnancyError, MWRAError)=>{
        SetModelView({visible:true});
        SetModelData((SetModelData)=>({...SetModelData,ChildError:ChildStatusError }))
        SetModelData((SetModelData)=>({...SetModelData,EDDError:PregnancyError }))
        SetModelData((SetModelData)=>({...SetModelData,MWRAError:MWRAError }))

      }
      const closeModel=()=>{
        SetModelView({visible:false});
      }

      const closeProfileModel=()=>{
        setShow_profile(false);
      }

      

      // Child_status_data_error:Child_status_data_error, Pregnancy_status_data_error:Pregnancy_status_data_error, mwra_status_data_error


const[member_update_status, Set_member_update_status]=useState({
  radio_1:"no",
  radio_2:"no",
  value:""
})


const update_status=(clicked)=>{  
  if(clicked==="died"){
    Set_member_update_status((member_update_status)=>({...member_update_status, radio_1:"yes"}))
    Set_member_update_status((member_update_status)=>({...member_update_status, radio_2:"no"}))
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
    Set_member_update_status((member_update_status)=>({...member_update_status, value:"2"}))
    SetMigrateOut(true);
    SetDiedDate_container(true);
    SetDied_on("");
    SetDied_on_check("");
  
  }
}



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
Alert.alert("তথ্য আপডেট","তথ্য আপডেটের ক্ষেত্রে, প্রথমে (মারা গিয়েছেন অথবা স্থানান্তরিত) হয়েছেন, যে কোন একটি নির্বাচন করতে হবে")
  }

  else if(member_update_status.value==="1" && (Died_on==="" || moment((moment(Died_on, "MMM DD, YYYY").format("YYYY-MM-DD"))).isBefore((moment(memberProfile.selected_Mem_DOB, "MMM DD, YYYY").format("YYYY-MM-DD"))))){
    Alert.alert("তথ্য আপডেট","সদস্য মারা গিয়েছেন নির্বাচন করা হয়েছে। সে ক্ষত্রে, মারা যাওয়ার সঠিক তারিখ দিতে হবে। মারা যাওয়ার তারিখ জন্মের তারিখ থেকে কম হবে না।")
  }
  else if(member_update_status.value==="2" && Migration_reason.value===""){
    Alert.alert("তথ্য আপডেট","সদস্য স্থানান্তরিত হয়েছেন নির্বাচন করা হয়েছে। সে ক্ষত্রে, স্থানান্তরিত হওয়ার সঠিক কারন একটি নির্বাচন করতে হবে।")
  }
  else if(member_update_status.value==="2" && (Died_on==="" || moment((moment(Died_on, "MMM DD, YYYY").format("YYYY-MM-DD"))).isBefore((moment(memberProfile.selected_Mem_DOB, "MMM DD, YYYY").format("YYYY-MM-DD"))))){
    Alert.alert("তথ্য আপডেট","সদস্য স্থানান্তরিত হয়েছেন নির্বাচন করা হয়েছে। সে ক্ষত্রে, স্থানান্তরিত হওয়ার সঠিক তারিখ একটি নির্বাচন করতে হবে। তারিখ জন্মের তারিখ থেকে কম হবে না।")
  }
  else if(member_update_status.value==="1"){
    Alert.alert("তথ্য আপডেট(মারা গিয়েছেন)", "আপনি কি নিশ্চিত সদস্য মারা গিয়েছেন এবং সদস্যকে মৃত হিসাবে স্ট্যাটাস আপডেট করতে চাচ্ছেন?",[{text:"না সঠিক না", onPress:()=>""},{text:"তথ্য সঠিক", onPress:()=>update_current_status(Mem_SL)}])  
  }
  else if(member_update_status.value==="2"){    
    Alert.alert("তথ্য আপডেট(স্থানান্তরিত)", "আপনি কি নিশ্চিত সদস্য স্থানান্তরিত হয়েছেন এবং স্থানান্তরিত হিসাবে স্ট্যাটাস আপডেট করতে চাচ্ছেন?",[{text:"না সঠিক না", onPress:()=>""},{text:"তথ্য সঠিক", onPress:()=>update_current_status(Mem_SL)}])  
  }  
}








const update_current_status= (Mem_SL)=>{

  if(member_update_status.value==="1"){//status died
   var c_status = "3";
   var status_changed_on = moment(Died_on, "MMM DD, YYYY").format("YYYY-MM-DD");
   var Alert_headder = "তথ্য পরিবর্তন হয়েছে(মৃত)"; 
  }
  else if(member_update_status.value==="2"){//status migration out
    var c_status = "2";
    var status_changed_on = moment(Died_on, "MMM DD, YYYY").format("YYYY-MM-DD");
    var Alert_headder = "তথ্য পরিবর্তন হয়েছে(স্থানান্তরিত)";
   }
   else{
    //nothing to do
   }


  db.transaction(tx=>{
    tx.executeSql(
    "update member set Mem_Cstatus = '"+c_status+"', statusCngOn ='"+status_changed_on+"', Edit_Date = date('now')  WHERE Mem_SL = '"+Mem_SL+"' ",
    [],
    (tx, result)=>{

      

      if(result.rowsAffected>0){                
        Alert.alert(Alert_headder, "আপনার দেয়া তথ্য সঠিক ভাবে পরিবর্তন হয়েছে। আপনি কি আর অন্য কোন সদস্যের তথ্য আপডেট করতে চাচ্ছেন?",[{text:"না, আর কোন তথ্য পরিবর্তন করব না", onPress:()=>back_to_survey_question(result.rowsAffected)},{text:"অন্য সদস্যের তথ্য পরিবর্তন করব", onPress:()=>pass_value_for_back_to_survey_and_call_all_member(result.rowsAffected)}])          
        SetData_update_tracker(result.rowsAffected);  
  
      }      

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
  

}







const back_to_survey_question=(totalAdd)=>{
  // {data_saved_tracker}
  var member_updated = parseInt(totalAdd) > 0 || parseInt(data_update_tracker)>0 ? "1" : "2"; 
  props.onDataReceived(member_updated)
}



const [camera_container_open, set_camera_container_open] = useState(false);
const [camera_document_type, set_camera_document_type] = useState("");
const [mem_sl_for_camera, setMem_sl_for_camera] = useState("");

const open_camera=  (mem_sl,doc_type)=>{
  setMem_sl_for_camera(mem_sl);
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



{camera_container_open &&(
<Camera_open document_type = {camera_document_type} close_container={close_camera} mem_serial = {mem_sl_for_camera} idcard = {mem_sl_for_camera} houseno={""} member_gender = {memberProfile.selected_Mem_Sex}/>
)}


      <Modal visible={modelView.visible} transparent={true} animationType="fade">
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)', height:"100%", width:"100%"}}>
      <View style={{minHeight:"10%", width:"100%", justifyContent:"center", alignItems:"center"}}>
        <View style={{backgroundColor:"#eab308", borderRadius:8, padding:5, width:"98%",  minHeight:100, padding:10, elevation:5}}>
          <Text style={{color:"#000"}}>
            {modelData.ChildError} {modelData.EDDError} {modelData.MWRAError}
          </Text>
          <Text></Text>
          <TouchableOpacity onPress={closeModel}>
          <Text style={{color:"#0e7490", textAlign:"right"}}>মেসেজ বক্স অফ</Text>
          </TouchableOpacity>

        </View>
      </View>
      </View>
      </Modal>


      <Modal visible={show_profile} transparent={true} animationType="fade">

      <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
      <View style={{borderRadius:10, backgroundColor:"#f0f0f0", minHeight:"50%", width:"60%", flexDirection:"column", padding:5, alignItems:"center"}}>
        

        <Image source={require("../img/khana/khana.png")} style={{height:200, width:"100%", borderTopLeftRadius:9, borderTopRightRadius:9}}/>
        <TouchableOpacity onPress={open_camera.bind(this,memberProfile.selected_Mem_SL,"profile")}>
        <Image  source={memberProfile.selected_Mem_IMG} style={{height:95, width:95, borderRadius:100, marginTop:-55, borderWidth:2, borderColor:"#FFF"}}/>  
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
          <Text style={font.fontStyle}>বর্তমান বয়স: <Text style={{color:"#db2777"}}>{memberProfile.selected_mem_age} বছর</Text></Text>
          <Text style={font.fontStyle}>লিঙ্গ: <Text style={{color:"#db2777"}}>{memberProfile.selected_Mem_Sex}</Text></Text>
          <Text style={font.fontStyle}>বৈবাহিক অবস্থা: <Text style={{color:"#db2777"}}>{memberProfile.selected_Marital_Status}</Text></Text>
          <Text style={font.fontStyle}>নিবন্ধনের তারিখ: <Text style={{color:"#db2777"}}>{memberProfile.selected_reg_date}</Text></Text>
          



{toUpdate_hide && (
          <View style={{width:"100%", height:"auto", marginTop:10, borderTopWidth:1, borderTopColor:"#e0e0e0", paddingTop:10}}>
          
          <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", padding:2, borderBottomWidth:1, borderBottomColor:"#e0e0e0", paddingBottom:10}}>
            <View style={{width:"50%", alignItems:"flex-start", flexDirection:"row", justifyContent:"flex-start"}}>
          
          <View>
            <Image  source={require("../img/MenuIcon/nhl.jpg")} style={{height:50, width:50, borderRadius:100}}/>  
          </View>

            <View style={{marginLeft:5}}>
            
            <Text style={{color:"#db2777"}}>বাবাঃ {memberProfile.selected_father_name}</Text>
            <Text>MCID: {memberProfile.selected_Mother_MCID}</Text>
            
            </View>

            </View>



            <View style={{borderLeftColor:"#e0e0e0", borderLeftWidth:1, width:"50%", alignItems:"flex-start", flexDirection:"row", justifyContent:"flex-start"}}>
          
          <View style={{marginLeft:5}}>
            <Image  source={require("../img/MenuIcon/nhl.jpg")} style={{height:50, width:50, borderRadius:100}}/>  
          </View>

            <View style={{marginLeft:5}}>
            
            <Text style={{color:"#db2777"}}>মাঃ {memberProfile.selected_mother_name}</Text>
            <Text>MCID: {memberProfile.selected_Mother_MCID}</Text>
            
            </View>

            </View>

          </View>

        
          {/* <Text style={font.fontStyle}></Text> */}

          <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", padding:2, borderBottomWidth:1, borderBottomColor:"#e0e0e0", paddingBottom:10}}>
            <View style={{width:"50%", alignItems:"flex-start", flexDirection:"row", justifyContent:"flex-start"}}>          
          <View>
            <Image  source={require("../img/MenuIcon/nhl.jpg")} style={{height:50, width:50, borderRadius:100}}/>  
          </View>
            <View style={{marginLeft:5}}>            
            <Text style={{color:"#db2777"}}>স্বামী/স্ত্রীঃ {memberProfile.selected_Spouse}</Text>
            <Text>MCID: {memberProfile.selected_Spouse_MCID}</Text>            
            </View>
            </View>
          </View>

          
          

          </View>
)}



{toUpdate_show && (
<View style={{ width:"100%", height:"auto", borderTopWidth:1, borderTopColor:"#e0e0e0", paddingTop:5}}>      
      <View style={{width:"100%"}}>
        <Text style={{fontSize:12, color:"#9e0505"}}>
          বিঃদ্রঃ যে কোন তথ্য আপডেট বা পরিবর্তনের ক্ষেত্রে ভাল ভাবে যাচাই করুন। একবার তথ্য আপডেট বা পরিবরতন কারার পর, পুনরায় ডাটা সঠিক করতে পারবেন না। সে ক্ষত্রে আপনাকে সুপারভাইসরের সাথে যোগাযোগ করতে হবে।
          {data_update_tracker}
        </Text>

      </View>

      <View style={{height:120, width:"100%", marginTop:4}}>                      
            <QuestionContainer
            question={"নির্বাচিত সদস্যের বর্তমান অবস্থা, নিচের দুটি অপশন থেকে একটি নির্বাচন করুন।"}
            radio_1={<View style={{width:"45%"}}><RadioButton callFunction={update_status.bind(this,"died")} Value={member_update_status.radio_1} title={"মারা গিয়েছেন"}/></View>}            
            radio_2={<View style={{width:"45%"}}><RadioButton callFunction={update_status.bind(this,"migrate")} Value={member_update_status.radio_2} title={"স্থানান্তরিত"}/></View>}            
            direction={"column"}
            />
      </View>      

                    {/* <label><input type="radio" id="regular_survey_member_Update_Migr_reason_1" name="regular_survey_member_Update_Migr_reason" />বিবাহ করে অন্যত্র চলে গেছেন</label> 
                    <label><input type="radio" id="regular_survey_member_Update_Migr_reason_2" name="regular_survey_member_Update_Migr_reason" />তালাকপ্রাপ্ত হয়ে এই বাড়ি থেকে চলে গেছেন</label> 
                    <label><input type="radio" id="regular_survey_member_Update_Migr_reason_3" name="regular_survey_member_Update_Migr_reason" />বিধবা/বিপত্নি হয়ে এই বাড়ি থেকে চলে গেছেন </label> 
                    <label><input type="radio" id="regular_survey_member_Update_Migr_reason_4" name="regular_survey_member_Update_Migr_reason" />এই খানায় ভাড়াটিয়া হিসাবে থাকতেন, এখন অন্যত্র চলে গেছেন </label>    
                    <label><input type="radio" id="regular_survey_member_Update_Migr_reason_5" name="regular_survey_member_Update_Migr_reason" />চাকরির সুবাদে অন্যত্র চলে গেছেন </label>    
                    <label><input type="radio" id="regular_survey_member_Update_Migr_reason_6" name="regular_survey_member_Update_Migr_reason" />স্থায়িভাবে বসবাস পরিবর্তন করে অন্যত্র চলে গেছেন</label>    
                    <label><input type="radio" id="regular_survey_member_Update_Migr_reason_7" name="regular_survey_member_Update_Migr_reason" />এই বাড়ির অন্য একটি খানায় বসবাস করেন</label>    
                    <label><input type="radio" id="regular_survey_member_Update_Migr_reason_8" name="regular_survey_member_Update_Migr_reason" />অন্যান্য</label>    
                    <label><input type="radio" id="regular_survey_member_Update_Migr_reason_9" name="regular_survey_member_Update_Migr_reason" />জানিনা</label>     */}


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


          <TouchableOpacity onPress={closeProfileModel}>
          <Text style={{color:"#0e7490", textAlign:"right"}}>প্রোফাইল বক্স বন্ধ</Text>
          </TouchableOpacity>

          {toUpdate_show &&(
          <TouchableOpacity onPress={update_current_status_confirmation.bind(this,memberProfile.selected_Mem_SL)}>
          <Text style={{color:"#0e7490", textAlign:"right"}}>তথ্য আপডেট</Text>
          </TouchableOpacity>
          )}

        </View>

        
      </View>
      </View>

      </Modal>

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
