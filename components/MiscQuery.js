import React, { useEffect, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Text, FlatList, Alert, Image, ActivityIndicator, TouchableHighlight, Touchable, TouchableOpacity, Modal } from 'react-native'
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

//today 18/june/2024


const db = openDatabase(
    {
      name: 'prf.db',
      location: 'default',
      //createFromLocation:"/storage/emulated/0/103_prf.db"   
    },
    ()=>{console.log("Database OK.....")},
    error=>{Alert.alert("Database ERROR!!!!!!")}
    );


const MiscQuery = (props) => {

  // console.log(props.values_for_misc_query[0]);//execution from location
  // console.log(props.values_for_misc_query[1]);//round
  // console.log(props.values_for_misc_query[2]);//cluster
  // console.log(props.values_for_misc_query[3]);//block
  // console.log(props.values_for_misc_query[4]);//village
  // console.log(props.values_for_misc_query[5]);//bari

  const[loading, setLoading] = useState(false);
  const [listModalView, setListModalView] = useState(true);


  const [migratedMemberItems, setMigratedMemberItems] = useState([]);
  const[totalMigration, setTotalMigration] = useState("");
  const [ifMigrationMemAvailable, setIfMigrationMemAvailable] =useState(false);

  const any_code_7_member=()=>{//internal migration
    setOpenProfile(false);
    setLoading(true);
    console.log("function check location "+props.values_for_misc_query[0]);
    if(props.values_for_misc_query[0]==="exe_from_hh_list"){
      query="";
    }
    else if(props.values_for_misc_query[0]==="exe_from_hh"){
      query=" HH_Code = '"+props.values_for_misc_query[6]+"' and ";
    }
    else{
      query="";
    }

    db.transaction(tx=>{
      tx.executeSql(
        "select "+
        "(substr(Mem_PID,1,3)||' '||substr(Mem_PID,4,2)||' '||substr(Mem_PID,6,3)||' '||substr(Mem_PID,9,3))'FormattedMPID', "+
        "(substr(MCID,1,4)||' '||substr(MCID,5,3)||' '||substr(MCID,8,3)||' '||substr(MCID,11,3))'FormattedMCID', "+
        "Mem_SL, "+
        "Mem_PID, "+
        "MCID, "+
        "Father_Name, "+
        "Mother_Name, "+
        "Hus_Wife_Name, "+
        "Mem_Name, "+
        "Mem_Sex, "+
        "case "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+ 
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+ 
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
        "else Mem_DOB end as 'Mem_DOB', "+
        "IMG "+
        "from member "+
        "WHERE "+
        "cluster = '"+props.values_for_misc_query[2]+"' and "+
        "block = '"+props.values_for_misc_query[3]+"' and "+
        "Village_Code= '"+props.values_for_misc_query[4]+"' and "+
        "Bari_Code = '"+props.values_for_misc_query[5]+"' and "+query+
        "Mem_cStatus = '2' and "+
        "ReasonToMigrate = '7' ",
      [],
      (tx, result)=>{      
      var length = result.rows.length;
      
      if(length>0){
        setTotalMigration(length);
        setIfMigrationMemAvailable(true);
      let results = [];
        for(let i= 0; i<length; i++){

          var FormattedMPID = result.rows.item(i).FormattedMPID;        
          var FormattedMCID = result.rows.item(i).FormattedMCID;
          var Mem_SL = result.rows.item(i).Mem_SL;                
          var Mem_PID = result.rows.item(i).Mem_PID;        
          var MCID = result.rows.item(i).MCID;        
          var Father_Name = result.rows.item(i).Father_Name;        
          var Mother_Name = result.rows.item(i).Mother_Name;        
          var Hus_Wife_Name = result.rows.item(i).Hus_Wife_Name;        
          var Mem_Name = result.rows.item(i).Mem_Name;        
          var Mem_Sex = result.rows.item(i).Mem_Sex;        
          var Mem_DOB = moment(result.rows.item(i).Mem_DOB).format("MMM DD, YYYY");        
          var IMG = result.rows.item(i).IMG;        


          var avatar;
        var gender;
        
        if(Mem_Sex=="1"){
        avatar = require('../img/man.png');
        gender = "পুরুষ"
        }
        else{
        avatar = require('../img/woman.png');
        gender = "মহিলা";
        }


        var member_photo = "";
        if(IMG===null || IMG ===""){
          if(Mem_Sex=="1"){            
            member_photo = require('../img/man_PIC_sq.png');
            }
            else{            
            member_photo = require('../img/woman_PIC_sq.png');
            } 
        }else{
          member_photo = {uri:IMG};
        }

          results.push({Mem_SL:Mem_SL, avatar:avatar, gender:gender, member_photo:member_photo, FormattedMPID:FormattedMPID, FormattedMCID:FormattedMCID, Mem_PID:Mem_PID, MCID:MCID, Father_Name:Father_Name, Mother_Name:Mother_Name, Hus_Wife_Name:Hus_Wife_Name, Mem_Name:Mem_Name, Mem_DOB:Mem_DOB})
              
        }
        setMigratedMemberItems(results);
        setLoading(false);
      }
      else{
        setIfMigrationMemAvailable(false);
        setLoading(false);
      }
  
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });
  }


  useEffect(()=>{
    any_code_7_member();
  },[])




{/* Yes_fromHH */}
  const renderMigratedMemberItems=({item})=>{
    return(
      // <View style={{justifyContent:"space-between", width:"100%", backgroundColor:"red", flexDirection:"column", height:"100%"}}>
      <TouchableOpacity onPress={open_profile.bind(this, item.Mem_PID, item.Mem_SL, "Yes_fromBari")} style={{width:"48.5%", height:130, backgroundColor:"#fff", borderRadius:8, padding:5, margin:5, flexDirection:"row", justifyContent:"flex-start", alignItems:"flex-start", elevation:2,}}>

            <ImageBackground source={require('../img/no_image.png')} style={{height:"80%"}}> 
            {/* <View style={{height:"100%"}}> */}
            <Image source={item.member_photo} style={{height:90, width:90, borderRadius:10, borderWidth:2, borderColor:"#5976ba"}}/>
            {/* </View> */}
            </ImageBackground>            

            <View style={{flexDirection:"column", marginLeft:10, justifyContent:"space-between"}}>
              <Text style={{color:"#be185d", fontWeight:"bold", fontSize:12, lineHeight:20}}>{item.Mem_Name}</Text>
              <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>পিআইডি {item.FormattedMPID}</Text>
              <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>সিআইডি  {item.FormattedMCID}</Text>
              <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>লিঙ্গ {item.gender}</Text>
              <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>জন্ম {item.Mem_DOB}</Text>
              
            </View>

      </TouchableOpacity>
      //  </View>
    )
};







const [guestMemberItems, setGuestMemberItems] = useState([]);
const [totalGuest, setTotalGuest] = useState("");
const[ifGuestMemAvailable, setIfGuestMemAvailable] = useState(false);

const any_code_6_member=()=>{ //guest
  setLoading(true);

  if(props.values_for_misc_query[0]==="exe_from_hh_list"){
    query="";
  }
  else if(props.values_for_misc_query[0]==="exe_from_hh"){
    query=" HH_Code = '"+props.values_for_misc_query[6]+"' and ";
  }
  else{
    query="";
  }

  db.transaction(tx=>{
    tx.executeSql(
      "select "+
      "(substr(Mem_PID,1,3)||' '||substr(Mem_PID,4,2)||' '||substr(Mem_PID,6,3)||' '||substr(Mem_PID,9,3))'FormattedMPID', "+
      "(substr(MCID,1,4)||' '||substr(MCID,5,3)||' '||substr(MCID,8,3)||' '||substr(MCID,11,3))'FormattedMCID', "+
      "Mem_PID, "+
      "Mem_SL, "+
      "MCID, "+
      "Father_Name, "+
      "Mother_Name, "+
      "Hus_Wife_Name, "+
      "Mem_Name, "+
      "Mem_Sex, "+
      "Guest_date_from, "+
      "case "+
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+ 
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+ 
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
      "else Mem_DOB end as 'Mem_DOB', "+
      "IMG "+
      "from member "+
      "WHERE "+
      "cluster = '"+props.values_for_misc_query[2]+"' and "+
      "block = '"+props.values_for_misc_query[3]+"' and "+
      "Village_Code= '"+props.values_for_misc_query[4]+"' and "+
      "Bari_Code = '"+props.values_for_misc_query[5]+"' and "+query+" "+
      "Mem_Enroll_Type = '6' and Mem_Cstatus = '1' ",
    [],
    (tx, result)=>{      
    var length = result.rows.length;
    
    if(length>0){
      setTotalGuest(length);
      setIfGuestMemAvailable(true);
    let results = [];
      for(let i= 0; i<length; i++){

        var FormattedMPID = result.rows.item(i).FormattedMPID;        
        var FormattedMCID = result.rows.item(i).FormattedMCID;        
        var Mem_PID = result.rows.item(i).Mem_PID;        
        var Mem_SL = result.rows.item(i).Mem_SL;        
        var MCID = result.rows.item(i).MCID;        
        var Father_Name = result.rows.item(i).Father_Name;        
        var Mother_Name = result.rows.item(i).Mother_Name;        
        var Hus_Wife_Name = result.rows.item(i).Hus_Wife_Name;        
        var Mem_Name = result.rows.item(i).Mem_Name;        
        var Mem_Sex = result.rows.item(i).Mem_Sex;        
        var Mem_DOB = moment(result.rows.item(i).Mem_DOB).format("MMM DD, YYYY");        
        var IMG = result.rows.item(i).IMG;        
        var Guest_date_from = moment(result.rows.item(i).Guest_date_from).format("MMM DD, YYYY");
        var GuestDateDiff =result.rows.item(i).Guest_date_from=="" || result.rows.item(i).Guest_date_from==null ? "! ! !" : (moment().diff(moment(result.rows.item(i).Guest_date_from),"month",false));





        var avatar;
      var gender;
      
      if(Mem_Sex=="1"){
      avatar = require('../img/man.png');
      gender = "পুরুষ"
      }
      else{
      avatar = require('../img/woman.png');
      gender = "মহিলা";
      }


      var member_photo = "";
      if(IMG===null || IMG ===""){
        if(Mem_Sex=="1"){            
          member_photo = require('../img/man_PIC_sq.png');
          }
          else{            
          member_photo = require('../img/woman_PIC_sq.png');
          } 
      }else{
        member_photo = {uri:IMG};
      }

        results.push({Mem_SL:Mem_SL, GuestDateDiff:GuestDateDiff, Guest_date_from:Guest_date_from, avatar:avatar, gender:gender, member_photo:member_photo, FormattedMPID:FormattedMPID, FormattedMCID:FormattedMCID, Mem_PID:Mem_PID, MCID:MCID, Father_Name:Father_Name, Mother_Name:Mother_Name, Hus_Wife_Name:Hus_Wife_Name, Mem_Name:Mem_Name, Mem_DOB:Mem_DOB})
            
      }
      setGuestMemberItems(results);
      setLoading(false);
    }else{
      setIfGuestMemAvailable(false);
      setLoading(false);
    }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
}


useEffect(()=>{
  any_code_6_member();
},[])




const[ifParmanentMigration, setIfParmanentMigration] = useState(false);
const [totalCompleteMigration, setTotalCompleteMigration] = useState("");
const[completeMigrationMem_Item, setCompleteMigrationMem_Item] =useState([]);

const any_code_2_member=()=>{//complete migration
  setOpenProfile(false);
  setLoading(true);
  console.log("function check location "+props.values_for_misc_query[0]);
  if(props.values_for_misc_query[0]==="exe_from_hh_list"){
    query="";
  }
  else if(props.values_for_misc_query[0]==="exe_from_hh"){
    query=" HH_Code = '"+props.values_for_misc_query[6]+"' and ";
  }
  else{
    query="";
  }

  db.transaction(tx=>{
    tx.executeSql(
      "select "+
      "(substr(Mem_PID,1,3)||' '||substr(Mem_PID,4,2)||' '||substr(Mem_PID,6,3)||' '||substr(Mem_PID,9,3))'FormattedMPID', "+
      "(substr(MCID,1,4)||' '||substr(MCID,5,3)||' '||substr(MCID,8,3)||' '||substr(MCID,11,3))'FormattedMCID', "+
      "Mem_SL, "+
      "Mem_PID, "+
      "MCID, "+
      "Father_Name, "+
      "Mother_Name, "+
      "Hus_Wife_Name, "+
      "Mem_Name, "+
      "Mem_Sex, "+
      "statusCngOn, "+
      "case "+
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+ 
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+ 
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
      "else Mem_DOB end as 'Mem_DOB', "+
      "IMG "+
      "from member "+
      "WHERE "+
      "cluster = '"+props.values_for_misc_query[2]+"' and "+
      "block = '"+props.values_for_misc_query[3]+"' and "+
      "Village_Code= '"+props.values_for_misc_query[4]+"' and "+
      "Bari_Code = '"+props.values_for_misc_query[5]+"' and "+query+
      "Mem_cStatus = '2' and "+
      "(((JulianDay('now', 'localtime')) - JulianDay(date(statusCngOn)))/30.417)<16 and "+
      "ReasonToMigrate != '7' ",
    [],
    (tx, result)=>{      
    var length = result.rows.length;
    
    if(length>0){
      setTotalCompleteMigration(length);
      setIfParmanentMigration(true);
    let results = [];
      for(let i= 0; i<length; i++){

        var FormattedMPID = result.rows.item(i).FormattedMPID;        
        var FormattedMCID = result.rows.item(i).FormattedMCID;
        var Mem_SL = result.rows.item(i).Mem_SL;                
        var Mem_PID = result.rows.item(i).Mem_PID;        
        var MCID = result.rows.item(i).MCID;        
        var Father_Name = result.rows.item(i).Father_Name;        
        var Mother_Name = result.rows.item(i).Mother_Name;        
        var Hus_Wife_Name = result.rows.item(i).Hus_Wife_Name;        
        var Mem_Name = result.rows.item(i).Mem_Name;        
        var Mem_Sex = result.rows.item(i).Mem_Sex;        
        var Mem_DOB = moment(result.rows.item(i).Mem_DOB).format("MMM DD, YYYY");        
        var MigrationtDateDiff = result.rows.item(i).statusCngOn==null || result.rows.item(i).statusCngOn=="" ? "! ! !" : (moment().diff(moment(result.rows.item(i).statusCngOn),"month",false));
        var IMG = result.rows.item(i).IMG;        


        var avatar;
      var gender;
      
      if(Mem_Sex=="1"){
      avatar = require('../img/man.png');
      gender = "পুরুষ"
      }
      else{
      avatar = require('../img/woman.png');
      gender = "মহিলা";
      }


      var member_photo = "";
      if(IMG===null || IMG ===""){
        if(Mem_Sex=="1"){            
          member_photo = require('../img/man_PIC_sq.png');
          }
          else{            
          member_photo = require('../img/woman_PIC_sq.png');
          } 
      }else{
        member_photo = {uri:IMG};
      }

        results.push({MigrationtDateDiff:MigrationtDateDiff, Mem_SL:Mem_SL, avatar:avatar, gender:gender, member_photo:member_photo, FormattedMPID:FormattedMPID, FormattedMCID:FormattedMCID, Mem_PID:Mem_PID, MCID:MCID, Father_Name:Father_Name, Mother_Name:Mother_Name, Hus_Wife_Name:Hus_Wife_Name, Mem_Name:Mem_Name, Mem_DOB:Mem_DOB})
            
      }
      setCompleteMigrationMem_Item(results);
      setLoading(false);
    }
    else{
      setIfParmanentMigration(false);
      setLoading(false);
    }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
}


useEffect(()=>{
  any_code_2_member();
},[])





const renderComplete_migration=({item})=>{
  return(
    // <View style={{justifyContent:"space-between", width:"100%", backgroundColor:"red", flexDirection:"column", height:"100%"}}>
    <TouchableOpacity onPress={open_profile.bind(this, item.Mem_PID, item.Mem_SL, "complete_migration")} style={{width:"48.5%", height:145, backgroundColor:"#fff", borderRadius:8, padding:5, margin:5, flexDirection:"row", justifyContent:"flex-start", alignItems:"flex-start", elevation:2,}}>

          <ImageBackground source={require('../img/no_image.png')} style={{height:"80%"}}> 
          {/* <View style={{height:"100%"}}> */}
          <Image source={item.member_photo} style={{height:90, width:90, borderRadius:10, borderWidth:2, borderColor:"#5976ba"}}/>
          {/* </View> */}
          </ImageBackground>

          <View style={{flexDirection:"column", marginLeft:10, justifyContent:"space-between"}}>
            <Text style={{color:"#be185d", fontWeight:"bold", fontSize:12, lineHeight:20}}>{item.Mem_Name}</Text>
            <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>পিআইডি {item.FormattedMPID}</Text>
            <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>সিআইডি  {item.FormattedMCID}</Text>
            <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>লিঙ্গ {item.gender}</Text>
            <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>জন্ম {item.Mem_DOB}</Text>
            <Text style={{fontSize:12, lineHeight:20, color:"#be185d"}}>গত {item.MigrationtDateDiff} মাস আগে স্থানান্তরিত হয়েছেন। </Text>
            
          </View>

    </TouchableOpacity>
    //  </View>
  )
};









const renderGuestMemberItems=({item})=>{
  return(
    // <View style={{justifyContent:"space-between", width:"100%", backgroundColor:"red", flexDirection:"column", height:"100%"}}>
    <TouchableOpacity onPress={open_profile.bind(this, item.Mem_PID, item.Mem_SL, "")} style={{width:"48.5%", height:145, backgroundColor:"#fff", borderRadius:8, padding:5, margin:5, flexDirection:"row", justifyContent:"flex-start", alignItems:"flex-start", elevation:2,}}>


          {/* <View style={{height:"100%"}}> */}
          <ImageBackground source={require('../img/no_image.png')} style={{height:"80%"}}> 
          <Image source={item.member_photo} style={{height:90, width:90, borderRadius:10, borderWidth:2, borderColor:"#5976ba"}}/>
          </ImageBackground>
          {/* </View> */}

          <View style={{flexDirection:"column", marginLeft:10, justifyContent:"space-between"}}>
            <Text style={{color:"#be185d", fontWeight:"bold", fontSize:12, lineHeight:20}}>{item.Mem_Name}</Text>
            <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>পিআইডি {item.FormattedMPID}</Text>
            <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>সিআইডি  {item.FormattedMCID}</Text>
            <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>লিঙ্গ {item.gender}</Text>
            <Text style={{fontSize:12, lineHeight:20, color:"#474747"}}>জন্ম {item.Mem_DOB}</Text>
            <Text style={{fontSize:12, lineHeight:20, color:"#be185d"}}>অবস্থান করছেন গত {item.GuestDateDiff} মাস থেকে। </Text>
            
          </View>

    </TouchableOpacity>
    //  </View>
  )
};




const [openProfile, setOpenProfile] = useState(false);



const [profile_PID, setProfile_PID] = useState("");
const [profile_Serial, setProfile_Serial] = useState("");
const [migrationUpdate, setMigrationUpdate] = useState("");
const [parmanentMigrationStatus, setParmanentMigrationStatus]=useState("");

const open_profile= (mem_pid, mem_sl, status)=>{    
  setProfile_PID(mem_pid);
  setProfile_Serial(mem_sl);
  setMigrationUpdate(status);
  setParmanentMigrationStatus(status);
  setOpenProfile(true);


}

const closeProfileModel=()=>{
  setOpenProfile(false);
}



// if(loading===true){
// <Modal visible={true} transparent={true} animationType="slide">
//   <View>
//   <ActivityIndicator color={"red"} size={"large"}/>
//   </View>
// </Modal>
// }
// else{


return (

  <View>
<Modal visible={listModalView} transparent={true} animationType="slide">

    <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
        <View style={{ backgroundColor:"#f0f0f0", width:"95%", height:"98%", padding:10, borderRadius:10}}>

      <View style={{flex:100, flexDirection:"column", justifyContent:"space-around"}}>


<View style={{flex:98}}>
      {ifMigrationMemAvailable &&(
          <View style={{borderBottomWidth: 1, flex:25, width:"100%", borderBottomColor:"#a1a1a1"}}>
          <View style={{paddingBottom:20}}>
          <Text style={{fontSize:14, fontWeight:"bold", color:"#be185d"}}>এই বাড়ির অন্য একটি খানায় বসবাস করেন, এমন স্ট্যাটাস দেয়া সদস্যের লিস্ট। সদস্য সংখ্যা {totalMigration}</Text>          
          <Text style={{fontSize:12}}>বিঃদ্রঃ অনুগ্রহ করে, নিচের লিস্ট থেকে প্রত্যেকটি সদস্যকে নির্বাচন করে, বর্তমান বাড়ির নির্দিষ্ট কোন একটি খানায় স্থানান্তরিত করুন।</Text>
          </View>
          <FlatList
          numColumns={2}
          data={migratedMemberItems}
          renderItem={renderMigratedMemberItems}
          keyExtractor={(migratedMemberItems)=>migratedMemberItems.Mem_PID}
          horizontal={false}
          onRefresh={any_code_7_member}
          refreshing={loading}
          />
          </View>
)}



{ifGuestMemAvailable &&(
          <View style={{borderBottomWidth: 1, flex:25, width:"100%", borderBottomColor:"#a1a1a1", paddingTop:10}}>
          <View style={{paddingBottom:20}}>
          <Text style={{fontSize:14, fontWeight:"bold", color:"#be185d"}}>অতিথি হিসাবে অবস্থান করছেন। এমন সদস্যের লিস্ট। সদস্যের সংখ্যা {totalGuest}</Text>          
          <Text style={{fontSize:12}}>বিঃদ্রঃ যদি তাদের অবস্থান, ৬ মাস বা তাঁর বেশি হয়ে যায়, তাহলে সার্ভে ভিজিটের মাধ্যমে নির্দিষ্ট খানায় তাদের অবস্থান সঠিক/নিশ্চিত করুন।</Text>
          </View>
          <FlatList
          numColumns={2}
          data={guestMemberItems}
          renderItem={renderGuestMemberItems}
          keyExtractor={(guestMemberItems)=>guestMemberItems.Mem_PID}
          horizontal={false}
          onRefresh={any_code_6_member}
          refreshing={loading}
          />
          </View>
          )} 



{ifParmanentMigration &&(
          <View style={{borderBottomWidth: 1, flex:25, width:"100%", borderBottomColor:"#a1a1a1", paddingTop:10}}>
          <View style={{paddingBottom:20}}>
          <Text style={{fontSize:14, fontWeight:"bold", color:"#be185d"}}>সম্পূর্ণরুপে স্থানান্তরিত হয়ে আছেন, এমন সদস্যের লিস্ট । সদস্যের সংখ্যা {totalCompleteMigration}</Text>          
          <Text style={{fontSize:12}}>বিঃদ্রঃ যদি নিচে উল্লেখিত সদস্য নিজ খানায় ফিরে আসেন, তাহলে তাদের প্রোফাইলএ ক্লিক করে তাদের অবস্তানের পরিবর্তন করুন। আর যদি না আসেন তাহলে, ৬ মাস পর স্বয়ংক্রিয়ভাবে এই লিস্ট থেকে তাদের নাম চলে যাবে। </Text>
          </View>
          <FlatList
          numColumns={2}
          data={completeMigrationMem_Item}
          renderItem={renderComplete_migration}
          keyExtractor={(completeMigrationMem_Item)=>completeMigrationMem_Item.Mem_PID}
          horizontal={false}
          onRefresh={any_code_2_member}
          refreshing={loading}
          />
          </View>
           )} 



          </View>





          <TouchableOpacity onPress={props.closeList} style={{flex:3, width:"100%", marginTop:"3.3%", justifyContent:"center", alignItems:"center"}}>
          <Text style={{fontSize:12, color:"#4757bf", fontWeight:"bold", textAlign:"center"}}>
            লিস্টটি এখন বন্ধ করব
          </Text>
          </TouchableOpacity>


          </View>






        </View>  
    </View>

</Modal>



  {openProfile && (
    <Member_profile toUpdate={parmanentMigrationStatus} afterMigrationConfirmation={any_code_2_member} afterUpdate={any_code_7_member} villageCode = {props.values_for_misc_query[4]} bari={props.values_for_misc_query[5]} migration={migrationUpdate} mpid = {profile_PID} mem_sl = {profile_Serial}  closeProfileModel_fun = {closeProfileModel} valuesForMwraSurvey={""}/>
    // <Member_profile migration={props.migration} mpid = {selectedMemberMPID} mem_sl = {selectedMemberMSL} toUpdate = {props.toUpdate} closeProfileModel_fun = {closeProfileModel}  pass_value_for_back_to_survey = {pass_value_for_back_to_survey_and_call_all_member} back_to_survey = {back_to_survey_question} cluster={props.cluster} block={props.block} villageCode = {props.villageCode} bari = {props.bari} hh = {props.hh} valuesForMwraSurvey={""}/>
    )}</View>


  )
}
// }
export default MiscQuery
