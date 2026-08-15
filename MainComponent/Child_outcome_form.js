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
import { GenerateIDs } from '../components/GenerateIDs';
import { check_mwra_existance } from '../components/check_mwra_existance';
import { check } from 'react-native-permissions';
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

const Child_outcome_form = (props) => {


  useEffect(()=>{
    passValueToSidebar(props.userID, false, props.componentId);
  },[]);

        // name: props.name,        
        // userID:props.userID,
        // password:props.password,
        // cluster:props.cluster,     
        // roundNo:props.roundNo,     
        // blockprops:props.blockprops,  
        // villageCode:props.villageCode, 
        // villageName:props.villageName, 
        // bari:props.bari,        
        // bariName:props.bariName,    
        // hh:props.hh,          
        // hhName:props.hhName,      
        // componentId:props.componentId, 
        // MemberAddTracker:props.MemberAddTracker,
        // MemberUpdateTracker:props.MemberUpdateTracker,
        // mwraVisit:props.mwraVisit,   
        // selected_Mem_SL:props.selected_Mem_SL,
        // selected_Mem_PID:props.selected_Mem_PID,
        // selected_Mem_CID:props.selected_Mem_CID,
        // FormattedMPID:props.FormattedMPID,
        // FormattedMCID:props.FormattedMCID,
        
        // MWRA_name: props.MWRA_name,
        // MWRA_dobFormatted:props.MWRA_dobFormatted,
        // MWRA_dob:props.MWRA_dob,
        // MWRA_spouse:props.MWRA_spouse,
        // MWRA_lastVisit:props.MWRA_lastVisit,
        // MWRA_pregnancyStatus:props.MWRA_pregnancyStatus,
        // MWRA_LMP:props.MWRA_LMP,
        // MWRA_MeritalStatus:props.MWRA_MeritalStatus,
        // MWRA_pregnancyValue:props.MWRA_pregnancyValue,
        // MWRA_Menopause : props.MWRA_Menopause,
        // MWRA_MeritalStatusValue:props.MWRA_MeritalStatusValue,
        // MWRA_Pregnancy_identified_by:props.MWRA_Pregnancy_identified_by,
        // MWRA_PregnancyNo_MWRA:props.MWRA_PregnancyNo_MWRA,
        // Spouse_MPID:props.Spouse_MPID,
        // pregnancyNoDB:props.pregnancyNoDB,
        // surveyNo:props.surveyNo, 
        // liveBirthNumber: totalBirths.value
        // formattedDeliveryDate
        // return {PID, CID, Serial, LineNo, updateIDs};

        const{updateIDs, PID, CID, Serial, LineNo} =  GenerateIDs();

        const [generated_PID, setPID] = useState("");
        const [generated_CID, setCID] = useState("");
        const [generated_MemSL, setMemSL] = useState("");
        const [generated_LineNo, setLineNo] = useState("");



        const generateIDs= async()=>{

          setPID("অপেক্ষা করুন");
          setCID("অপেক্ষা করুন")
          setMemSL("")
          setLineNo("");

          const ids = await updateIDs(props.cluster, props.block, props.villageCode, props.bari, props.hh);
          setPID(ids.PID);
          setCID(ids.CID)
          setMemSL(ids.Serial)
          setLineNo(ids.LineNo);

        }










        




const [childName, setChildName] = useState("");


const[MemberGender, SetMemberGender]=useState({
  radio_1:"no",
  radio_2:"no",
  value:""
});


const member_gender=(clicked)=>{
  if(clicked==="yes"){
    SetMemberGender((MemberGender)=>({...MemberGender, radio_1:"yes"}))
    SetMemberGender((MemberGender)=>({...MemberGender, radio_2:"no"}))
    SetMemberGender((MemberGender)=>({...MemberGender, value:"1"}))    
  }else if(clicked==="no"){
    SetMemberGender((MemberGender)=>({...MemberGender, radio_1:"no"}))
    SetMemberGender((MemberGender)=>({...MemberGender, radio_2:"yes"}))
    SetMemberGender((MemberGender)=>({...MemberGender, value:"2"}))
  }else {
    SetMemberGender((MemberGender)=>({...MemberGender, radio_1:"no"}))
    SetMemberGender((MemberGender)=>({...MemberGender, radio_2:"no"}))
    SetMemberGender((MemberGender)=>({...MemberGender, value:""}))
  }
}



const[alive, setAlive]=useState({
  radio_1:"no",
  radio_2:"no",
  value:""
});

const [ifDied, setIfDied] = useState(false);
const [ifAlive, setifAlive] = useState(false);

const aliveCheck=(clicked)=>{
  if(clicked==="yes"){
    setAlive((alive)=>({...alive, radio_1:"yes"}));
    setAlive((alive)=>({...alive, radio_2:"no"}));
    setAlive((alive)=>({...alive, value:"1"}));    
    setIfDied(false);
    setDiedDateOn("");
    setDiedDateOnCheck("");
    setifAlive(true);
    
    
  }else if(clicked==="no"){
    setAlive((alive)=>({...alive, radio_1:"no"}));
    setAlive((alive)=>({...alive, radio_2:"yes"}));
    setAlive((alive)=>({...alive, value:"2"}));
    setIfDied(true);
    setifAlive(false);
    setRelation("");
    setChildWeight("");
    
  }else{
    setAlive((alive)=>({...alive, radio_1:"no"}));
    setAlive((alive)=>({...alive, radio_2:"no"}));
    setAlive((alive)=>({...alive, value:""}));
    setIfDied(false);
    setDiedDateOn("");
    setDiedDateOnCheck("");
    setifAlive(false);
    setRelation("");
    setChildWeight("");
  }
}





const[DiedContainer, setDiedContainer] = useState(false);
const[DiedDateOn, setDiedDateOn] = useState("");
const[DiedDateOnCheck, setDiedDateOnCheck] = useState("");

const DiedDateOnChecker=()=>{
  if(DiedDateOn!="" && DiedDateOnCheck!=""){
    setDiedDateOn("");
    setDiedDateOnCheck("");
    setDiedContainer(true);    
   }
  else if(DiedDateOn=="" && DiedDateOnCheck==""){
    setDiedContainer(true);    
}
else if(DiedDateOn!="" && DiedDateOnCheck==""){
  Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{setDiedContainer(true)}}])
}
else{
  // do nothing
}

}


const Died_onConfirm=(changedOn)=>{

  if(DiedDateOnCheck=="" && DiedDateOn==""){
    setDiedDateOnCheck(moment(changedOn).format("MMM DD, YYYY"))    
    Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{setDiedContainer(true)}}])
  }
  else if(DiedDateOnCheck!=="" && DiedDateOn=="" && DiedDateOnCheck!=(moment(changedOn).format("MMM DD, YYYY"))){    
    Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+DiedDateOnCheck+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(changedOn).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{setDiedContainer(true)}}])    
    setDiedDateOn("");
    setDiedDateOnCheck(""); 
  }else{
    

    setDiedDateOn(moment(changedOn).format("MMM DD, YYYY")) 

    
    
  }
  
}



const [relationshipValue, setRelationshipValue] = useState([]);


     






  const [relation, setRelation] = useState("");
  const [childWeight, setChildWeight] = useState("");



  const check_before_save=()=>{
    if((childName==="" || childName.toString().substring(0,1)==="x"  || childName.toString().substring(0,1)==="X")){
      Alert.alert("শিশুর নাম","শিশুর সঠিক নাম লিখুন, নাম (X,x) দিয়ে লিখা যাবেনা",[{text:"ঠিক আছে", onPress:()=>""}])
    }
    else if(generated_PID==="" || generated_CID===""){
      Alert.alert("শিশুর আইডি","(CID/PID) বাটনে ক্লিক করে শিশুর জন্য পি আই ডি এবং সি আই ডি তৈরী করুন।",[{text:"ঠিক আছে", onPress:()=>""}])
    }
    else if(generated_LineNo==="" || generated_MemSL===""){
      Alert.alert("শিশুর আইডি","শিশুর লাইন নাম্বার বা সিরিয়াল নাম্বার সঠিক ভাবে তৈরী হচ্ছে না। ",[{text:"ঠিক আছে", onPress:()=>""}])
    }
    else if(MemberGender.value===""){
      Alert.alert("শিশুর লিঙ্গ","শিশুর সঠিক লিঙ্গ নির্বাচন করুন",[{text:"ঠিক আছে", onPress:()=>""}])
    }
    else if(alive.value===""){
      Alert.alert("শিশুর কি জীবিত","শিশু জীবিত থাকলে হ্যাঁ বা না নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}])
    }
    else if(alive.value==="2" && (DiedDateOn==="" || moment(moment(DiedDateOn, "MMM DD, YYYY")).isBefore(moment(moment(props.formattedDeliveryDate, "MMM DD,YYYY")))) ){
      Alert.alert("মারা যাওয়ার তারিখ","শিশু মারা যাওয়ার সঠিক তারিখ নির্বাচন করুন। মারা যাওয়ার তারিখটি, "+props.formattedDeliveryDate+" তারিখ থেকে কম হবে না।",[{text:"ঠিক আছে", onPress:()=>""}])
    }
    else if(alive.value==="1" && relation===""){
      Alert.alert("সম্পর্ক","খানা প্রধানের সাথে শিশুর সম্পর্ক নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}])
    }
    else if(alive.value==="1" && (childWeight==="" || parseInt(childWeight)<700 || parseInt(childWeight)>6000)){
      Alert.alert("শিশুর ওজন","শিশুর সঠিক ওজন লিখুন, ওজন ৭০০ গ্রামের কম বা ৬০০০ গ্রামের বেশি হবেনা।",[{text:"ঠিক আছে", onPress:()=>""}])
    }
    else{
      Alert.alert("শিশুর তথ্য/আউটকাম ফর্ম", "আপনার দেয়া সব তথ্য সঠিক থাকলে, (সেভ শিশুর তথ্য/আউটকাম ফর্ম) বাটনে ক্লিক করুন।",[{text:"না, তথ্য সঠিক নয়", onPress:()=>""},{text:"সেভ শিশুর তথ্য/আউটকাম ফর্ম", onPress:()=>save_form()}])
    }
  }




const[childSerial, setChildSerial] = useState(1);


  const setValuesToRelation= async ()=>{
    if(childSerial===1){    
  setRelationshipValue([
      {label: "ছেলে বা মেয়", value : "03"},
      {label: "নাতী বা নাতনী", value : "05"},
      {label: "বাবা / মা", value : "06"},
      {label: "অন্যান্য আত্মীয় স্বজন", value : "09"},
      {label: "পালিত সন্তান/ সৎসন্তান", value : "10"},
      {label: "কোন সম্পর্ক নাই", value : "11"}
  ]); 
    }
    else if(parseInt(childSerial)>1 && relation!==""){

      var SetDefautRelation =
      relation==="03" ? {label: "ছেলে বা মেয়", value : "03"} : 
      relation==="05" ? {label: "নাতী বা নাতনী", value : "05"} :
      relation==="06" ? {label: "বাবা / মা", value : "06"} : 
      relation==="09" ? {label: "অন্যান্য আত্মীয় স্বজন", value : "09"} : 
      relation==="10" ? {label: "পালিত সন্তান/ সৎসন্তান", value : "10"} : 
      relation==="11" ? {label: "কোন সম্পর্ক নাই", value : "11"} : null;

      if(SetDefautRelation){
        setRelationshipValue([SetDefautRelation]);
      }
      setRelation(relation);
    }
    else 
    {
    
      setRelationshipValue([
        {label: "ছেলে বা মেয়", value : "03"},
        {label: "নাতী বা নাতনী", value : "05"},
        {label: "বাবা / মা", value : "06"},
        {label: "অন্যান্য আত্মীয় স্বজন", value : "09"},
        {label: "পালিত সন্তান/ সৎসন্তান", value : "10"},
        {label: "কোন সম্পর্ক নাই", value : "11"}
    ]); 

    }
  }

  useEffect(()=>{
    setValuesToRelation();
  },[alive])



  


  const save_form=()=>{




      var deliveryDate = props.formattedDeliveryDate!=="" ? moment(props.formattedDeliveryDate, "MMM DD, YYYY").format("YYYY-MM-DD") : "";
      var diedOn = DiedDateOn!=="" ? moment(DiedDateOn, "MMM DD, YYYY").format("YYYY-MM-DD") : "";  
    
      db.transaction(tx=>{
        tx.executeSql(
        "insert OR IGNORE into Preg_Outcome_Baby ( "+
        "Mem_PID, "+
        "MCID, "+
        "Round_No, "+
        "Preg_SL, "+
        "Baby_SL, "+
        "CSex, "+
        "CName, "+
        "Mem_SL, "+
        "Child_PID, "+
        "Child_CID, "+
        "Rel_HH, "+
        "CStatus, "+
        "CDOD, "+
        "CWeight_gm, "+
        "Weight_Date, "+
        "Weight_Time, "+
        "Entry_Date, "+
        "UserID) values("+
        "'"+props.selected_Mem_PID+"',"+
        "'"+props.selected_Mem_CID+"',"+
        "'"+props.surveyNo+"',"+
        "'"+props.pregnancyNoDB+"',"+
        "'"+childSerial+"',"+
        "'"+MemberGender.value+"',"+
        "'"+childName+"',"+            
        "'"+generated_LineNo+"',"+
        "'"+generated_PID+"',"+
        "'"+generated_CID+"',"+
        "'"+relation+"',"+
        "'"+alive.value+"',"+
        "'"+diedOn+"',"+
        "'"+childWeight+"',"+
        "'"+moment().format("YYYY-MM-DD")+"', "+
        "'"+moment().format("HH:mm")+"', "+
        "'"+moment().format("YYYY-MM-DD HH:mm")+"', "+
        "'"+props.userID+"' "+")",
        [],
        (tx, result)=>{

          if(result.rowsAffected>0){

            save_to_member_table();
            

            

              if(parseInt(childSerial)===parseInt(props.liveBirthNumber)){
                if(props.byPass===true){
                  go_to_pregnancy_list();
                }
                else{
                  Alert.alert("ভিজিট সম্পূর্ণ","আপনার দেয়া শিশুর তথ্য সফলভাবে সেভ হয়েছে। এখন নিচের (ঠিক আছে) বাটনে ক্লিক করুন। যদি আর কোন MWRA ভিজিট অবশিষ্ট থাকে, তাহলে বাটনে ক্লিকের পর MWRA লিস্টে যাবে অথবা সম্পূর্ণ হলে খানার লিস্টে চলে যাবে।",[{text:"ঠিক আছে", onPress:()=>{checkMWRA()}}]);
                }
                
              }
              else{
                setChildSerial((parseInt(childSerial)+1));
                setChildName("");
                setPID("");
                setCID("");
                SetMemberGender((MemberGender)=>({...MemberGender, radio_1:"no"}));
                SetMemberGender((MemberGender)=>({...MemberGender, radio_2:"no"}));
                SetMemberGender((MemberGender)=>({...MemberGender, value:""}));

                setAlive((alive)=>({...alive, radio_1:"no"}));
                setAlive((alive)=>({...alive, radio_2:"no"}));
                setAlive((alive)=>({...alive, value:""}));
                setIfDied(false);
                setifAlive(false);

                setChildWeight("");
                // {childSerial===1 ? "প্রথম": childSerial===2 ? "দ্বিতীয়": childSerial===3 ? "তৃতীয়" : childSerial===4 ? "চতুর্থ" : null}
                Alert.alert("পরবর্তী শিশু","আপনার দেয়া শিশুর তথ্য সেভ হয়েছে। এখন পরবর্তী শিশুর তথ্য এন্ট্রি করুন।",[{text:"ঠিক আছে", onPress:()=>{""}}])
              }
          }else{
//nothing to do
          }      
    
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });
    
    
  }



  const go_to_pregnancy_list=()=>{
    Navigation.push(props.componentId,{
      component:{
        name:"Pregnancy_list",
        passProps:{
          name: props.name,//0
          userID: props.userID,//1
          password: props.password,//2
          cluster: props.cluster,//3
          roundNo: props.roundNo,
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
  


  const save_to_member_table=()=>{
    var deliveryDate = props.formattedDeliveryDate!=="" ? moment(props.formattedDeliveryDate, "MMM DD, YYYY").format("YYYY-MM-DD") : "";
      var diedOn = DiedDateOn!=="" ? moment(DiedDateOn, "MMM DD, YYYY").format("YYYY-MM-DD") : "";  
    
      db.transaction(tx=>{
        tx.executeSql(
        "insert OR IGNORE into member (Mem_SL, Visit_Date, Visit_Time, Cluster, Block, Mem_Line_No, Mem_PID, MCID, Village_Code, Bari_Code, HH_Code, Mem_Name, Mem_Sex, Mem_DOB, High_Edu, Main_Occupation, Rel_HH, Mother_Line, Mother_Name, Father_Line, Father_Name, Mem_Cstatus, statusCngOn, is_MWRA, Mem_Icon,  Mem_Enroll_Type, Reg_Date, Entry_Date, Entry_UserID) values("+
        "'"+generated_MemSL+"',"+
       "'"+moment().format("YYYY-MM-DD")+"', "+
       "'"+moment().format("HH:mm")+"', "+
        "'"+props.cluster+"',"+
        "'"+props.block+"',"+
        "'"+generated_LineNo+"',"+
        "'"+generated_PID+"',"+
        "'"+generated_CID+"',"+
        "'"+props.villageCode+"',"+
        "'"+props.bari+"',"+
        "'"+props.hh+"',"+
        "'"+childName+"',"+
        "'"+MemberGender.value+"',"+
        "'"+deliveryDate+"',"+
        "'00',"+
        "'08',"+
        "'"+relation+"',"+
        "'"+props.selected_Mem_PID+"',"+
        "'"+props.MWRA_name+"',"+
        "'"+props.Spouse_MPID+"',"+
        "'"+props.SpouseName_inDB+"',"+
        "'"+alive.value +"',"+
        "'"+diedOn +"',"+
        "'2',"+
        "'3',"+
        "'3',"+
        "'"+moment().format("YYYY-MM-DD")+"', "+
        "'"+moment().format("YYYY-MM-DD HH:mm")+"', "+
        "'"+props.userID+"'"+")",
        [],
        (tx, result)=>{
          if(result.rowsAffected>0){
              console.log("saved to member table");
          }      
    
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });
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
                শিশুর তথ্য বা আউটকাম ফর্ম               
              </Text>              
              <Text style={{fontSize:12, color:"#404040"}}>
                  বিঃদ্রঃ শিশুর তথ্য বা আউটকাম ফর্ম পূরণের ক্ষত্রে, প্রথমে সব তথ্য যাচাই করুন, তারপর ডাটা এন্ট্রি করুন।
              </Text>
            </View>




            <View style={{ flexDirection:"row", padding:5, marginTop:5, height:"auto", width:"98%", backgroundColor:"#fff", borderRadius:10, elevation:5}}>
 

              <View style={{width:"50%", borderRightWidth:1, borderColor:"#e6e6e6", padding:5}}>             
              <Text style={font.fontColor}>মায়ের নামঃ <Text style={{color:"#db2777"}}>{props.MWRA_name} </Text></Text>
              <Text style={font.fontColor}>মায়ের জন্ম তারিখঃ {props.MWRA_dobFormatted}</Text>
              <Text style={font.fontColor}>মায়ের বর্তমান বয়সঃ {props.MWRA_dob}</Text>
              <Text style={font.fontColor}>স্বামীঃ {props.MWRA_spouse}</Text>
              <Text style={font.fontColor}>সর্বশেষ ভিজিটঃ <Text style={{color:"#db2777"}}>{props.MWRA_lastVisit}</Text></Text>
              <Text style={font.fontColor}>মায়ের বৈবাহিক অবস্থাঃ <Text style={{color:"#db2777"}}>{props.MWRA_MeritalStatus}</Text></Text>
              <Text style={font.fontColor}>এম পি আইডিঃ <Text style={{color:"#db2777"}}>{props.FormattedMPID} </Text></Text>
              <Text style={font.fontColor}>এম সি আইডিঃ <Text style={{color:"#db2777"}}>{props.FormattedMCID} </Text></Text>              
              </View>
              
              <View style={{width:"50%", padding:5}}>
              <Text style={font.fontColor}>সর্বমোট জীবিত শিশুর সংখ্যাঃ <Text style={{color:"#db2777"}}>{props.liveBirthNumber}</Text></Text>  
              <Text style={font.fontColor}>গর্ভ/মাসিকের অবস্থাঃ <Text style={{color:"#db2777"}}>গর্ভের ফলাফল জানা গিয়েছে</Text></Text>
              <Text style={font.fontColor}>LMP সর্বশেষঃ <Text style={{color:"#db2777"}}>{props.MWRA_LMP}</Text></Text>
              <Text style={font.fontColor}>গর্ভের ফলাফলের তারিখঃ <Text style={{color:"#db2777"}}>{props.formattedDeliveryDate}</Text></Text>
              <TouchableOpacity onPress={move_to_hh_list}>
              <Text>
              {props.cluster}, {props.block}, {props.villageCode}, {props.bari}, {props.hh}

              </Text>
              </TouchableOpacity>
              </View>

       
            </View>

            <View style={{marginTop:"1%",height:"auto", width:"98%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:18, fontWeight:"bold", color:"#be185d"}}>
                 {childSerial===1 ? "প্রথম": childSerial===2 ? "দ্বিতীয়": childSerial===3 ? "তৃতীয়" : childSerial===4 ? "চতুর্থ" : null} শিশুর তথ্য
              </Text>           
            </View>



            <View style={{height:90, marginTop:"1%", width:"98%"}}>
            <QuestionContainer
            question={"শিশুর সঠিক নাম নিচের বক্সে লিখুন?"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=> setChildName(text)} value={childName} maxLength={40} placeholder={"শিশুর নাম"} imgLeft={"user"}/></View>} 
            direction={"column"}
            />
            </View>


            <View style={{width:"98%", marginTop:"1%"}}>
            <CRUD_button callFunction={generateIDs} title={"CID/PID"} radious={20}/>
            </View>


            <View style={{height:90, marginTop:"1%", width:"98%"}}>
            <QuestionContainer
            question={"শিশুর পি আই ডি?"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=> setChildName(text)} value={generated_PID} maxLength={40} placeholder={"পি আই ডি"} imgLeft={"id"} readOnly={false}/></View>} 
            direction={"column"}
            />
            </View>

            <View style={{height:90, marginTop:"1%", width:"98%"}}>
            <QuestionContainer
            question={"শিশুর সি আই ডি?"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=> setChildName(text)} value={generated_CID} maxLength={40} placeholder={"সি আই ডি"} imgLeft={"id"} readOnly={false}/></View>} 
            direction={"column"}
            />
            </View>


            <View style={{height:95, width:"98%", marginTop:"1%"}}>
            <QuestionContainer
            question={"শিশুর সঠিক লিঙ্গ নির্বাচন করুন"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={member_gender.bind(this,"yes")} Value={MemberGender.radio_1} title={"পুরুষ"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={member_gender.bind(this,"no")} Value={MemberGender.radio_2} title={"মহিলা"}/></View>}
            direction={"row"}
            />
            </View>


            <View style={{height:95, width:"98%", marginTop:"1%"}}>
            <QuestionContainer
            question={"শিশুটি কি এখনও জীবিত আছে?"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={aliveCheck.bind(this,"yes")} Value={alive.radio_1} title={"হ্যাঁ, জীবিত"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={aliveCheck.bind(this,"no")} Value={alive.radio_2} title={"না, মারা গেছে"}/></View>}
            direction={"row"}
            />
            </View>


{ifDied &&(
            <View style={{height:85,marginTop:"1%", width:"98%"}}>                                  
            <QuestionContainer
            question={"মারা যাওয়ার সঠিক তারিখ নির্বাচন করুন।"}
            inputField_1={<View><TouchableOpacity onPress={DiedDateOnChecker} ><Date_field value={DiedDateOn} ph={"মারা যাওয়ার তারিখ"}/></TouchableOpacity>
            <DatePicker
            modal
            title={"মারা যাওয়ার তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            mode='date'
            maximumDate={new Date()}
            open={DiedContainer}
            date={new Date()}
            onConfirm={(statusChnageOn) => {
              setDiedContainer(false)
              Died_onConfirm(statusChnageOn);
            }}
            onCancel={() => {
              setDiedContainer(false)
              setDiedDateOn("")
              setDiedDateOnCheck("");
              }} />
            </View>}
            
            direction={"column"}
            />
           
            </View>
            )}



{ifAlive &&(
  <View style={{width:"100%", alignItems:"center"}}>
            <View style={{height:100, width:"98%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"খানা প্রধানের সাথে সম্পর্ক"}
            inputField_1={<View style={{width:"50%"}}>
              <DropDown 
                data={relationshipValue} 
                labelField={"label"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={relation}
                onChange={item => {                  
                  setRelation(item.value);                                    
                }}
             />
            </View>} 
            />
            </View>

            <View style={{height:90, marginTop:"1%", width:"98%"}}>
            <QuestionContainer
            question={"শিশুর ওজন লিখুন? (গ্রাম/gm)"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=> setChildWeight(text)} value={childWeight} maxLength={4} placeholder={"শিশুর ওজন, যেমনঃ ২৫০০"} keyboardType={"phone-pad"} imgLeft={"weight"}/></View>} 
            direction={"column"}
            />
            </View>

            </View>

            

)}


            <View style={{width:"30%", marginTop:"5%", paddingBottom:"5%"}}>
            <CRUD_button callFunction={check_before_save} title={"সেভ শিশুর তথ্য/আউটকাম ফর্ম"} radious={20}/>
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


export default Child_outcome_form;
