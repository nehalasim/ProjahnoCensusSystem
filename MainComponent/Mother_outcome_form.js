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

  

const Mother_outcome_form = (props) => {

  useEffect(()=>{
    passValueToSidebar(props.userID, false, props.componentId);
  },[]);
    // {props.name}
    // {props.userID}
    // {props.password}
    // {props.cluster}
    // {props.roundNo}
    // {props.blockprops}
    // {props.villageCode}
    // {props.villageName}
    // {props.bari}
    // {props.bariName}
    // {props.hh}
    // {props.hhName}
    // {props.componentId}
    // {props.MemberAddTracker}
    // {props.MemberUpdateTracker}
    // {props.mwraVisit}
    // {props.selected_Mem_SL}
    // {props.selected_Mem_PID}
    // {props.selected_Mem_CID}
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
    // {props.MWRA_pregnancyValue}
    // {props.MWRA_Menopause}
    // {props.MWRA_MeritalStatusValue}
    // {props.MWRA_Pregnancy_identified_by}
    // {props.MWRA_PregnancyNo_MWRA}
    // {props.Spouse_MPID}
        // pregnancyNoDB:pregnancyNoDB,
        // surveyNo:surveyNo 





    const[deliveryDate, setDeliveryDate] = useState("");
    const[deliveryDateCheck, setDeliveryDateCheck] = useState("");
    const[deliveryDateContainer, setDeliveryDateContainer] = useState(false);

    

    const deliveryDateChecker=()=>{
        if(deliveryDate!="" && deliveryDateCheck!=""){
          setDeliveryDate("");
          setDeliveryDateCheck("");
          setDeliveryDateContainer(true);    
         }
        else if(deliveryDate=="" && deliveryDateCheck==""){
          setDeliveryDateContainer(true);    
      }
      else if(deliveryDate!="" && deliveryDateCheck==""){
        Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{setDeliveryDateContainer(true)}}])
      }
      else{
        // do nothing
      }
      
      }


      const DeliveryDate_onConfirm=(changedOn)=>{
  
        if(deliveryDateCheck=="" && deliveryDate==""){
          setDeliveryDateCheck(moment(changedOn).format("MMM DD, YYYY"))    
          Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{setDeliveryDateContainer(true)}}])
        }
        else if(deliveryDateCheck!=="" && deliveryDate=="" && deliveryDateCheck!=(moment(changedOn).format("MMM DD, YYYY"))){    
          Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+deliveryDateCheck+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(changedOn).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{setDeliveryDateContainer(true)}}])    
          setDeliveryDate("");
          setDeliveryDateCheck(""); 
        }else{          
          setDeliveryDate(moment(changedOn).format("MMM DD, YYYY")) 
        }
        
      }


      const[deliveryTime, setDeliveryTime] = useState("");
      const[deliveryTimeCheck, setDeliveryTimeCheck] = useState("");
      const[deliveryTimeContainer, setDeliveryTimeContainer] = useState(false);


      const deliveryTimeChecker=()=>{
        if(deliveryTime!="" && deliveryTimeCheck!=""){
          setDeliveryTime("");
          setDeliveryTimeCheck("");
          setDeliveryTimeContainer(true);    
         }
        else if(deliveryTime=="" && deliveryTimeCheck==""){
          setDeliveryTimeContainer(true);    
      }
      else if(deliveryTime!="" && deliveryTimeCheck==""){
        Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত সময় আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{setDeliveryTimeContainer(true)}}])
      }
      else{
        // do nothing
      }
      
      }


      const DeliveryTime_onConfirm=(changedOn)=>{
  
        if(deliveryTimeCheck=="" && deliveryTime==""){
          setDeliveryTimeCheck(moment(changedOn).format("HH:mm"))    
          Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত সময় আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{setDeliveryTimeContainer(true)}}])
        }
        else if(deliveryTimeCheck!=="" && deliveryTime=="" && deliveryTimeCheck!=(moment(changedOn).format("HH:mm"))){    
          Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+deliveryTimeCheck+" সময় এবং দ্বিতীয় এন্ট্রিতে "+(moment(changedOn).format("HH:mm"))+" সময় দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{setDeliveryTimeContainer(true)}}])    
          setDeliveryTime("");
          setDeliveryTimeCheck(""); 
        }else{          
          setDeliveryTime(moment(changedOn).format("HH:mm")); 
        }
        
      }

      




      const totalBirths = [ 
        {label: "১", value : "1"},
        {label: "২", value : "2"},
        {label: "৩", value : "3"},
        {label: "৪", value : "4"},
      ];

      const placeOfBirthValues = [ 
      {label: "বাসা",  value:"1"},
      
      {label: "উপজেলা হাসপাতাল",  value:"2"},
      {label: "জেলা হাসপাতাল",  value:"3"},
      {label: "সরকারী  হাসপাতাল",  value:"4"},
      {label: "প্রাইভেট হাসপাতাল",  value:"5"},

      {label: "মাতৃমঙ্গল",  value:"6"},
      {label: "পরিবার পারিকল্পনা কেন্দ্র",  value:"8"},

      {label: "কমিইউনিটি ক্লিনিক",  value:"9"},

      {label: "অন্যান্য",  value:"7"}
      ];

      



const [placeOfBirth, setPlaceOfBirth] = useState("");
const[doctor, setDoctor] = useState({
radio_1:"no",
value:""
});      
const[nurse, setNurse] = useState({
  radio_1:"no",
  value:""
});
const[midwife, setMidwife] = useState({
  radio_1:"no",
  value:""
});
const[paramedic, setParamedic] = useState({
  radio_1:"no",
  value:""
});
const[chw, setCHW] = useState({
  radio_1:"no",
  value:""
});
const[dai, setDai] = useState({
  radio_1:"no",
  value:""
});
const[relative, setRelative] = useState({
  radio_1:"no",
  value:""
});
const[others, setOthers] = useState({
  radio_1:"no",
  value:""
});
const[dontknow, setDontknow] = useState({
  radio_1:"no",
  value:""
});

      
      




      const [ifNotSuccess, setIfNotSuccess] = useState(false);
      const [ifChildDied, setIfChildDied] = useState(false);
      const [visitSuccess, setVisitSuccess] = useState(false);




      const[visitOutcome, setVisitOutcome]=useState({
        radio_1:"no",
        radio_2:"no",
        value:""
      });

      const visitOutcomeCheck=(clicked)=>{
        if(clicked==="yes"){

          setFormNavigation_next("পরবর্তী পেজ");
          setButton_next(true);
          setButton_save(false);

          setVisitOutcome((visitOutcome)=>({...visitOutcome, radio_1:"yes"}))
          setVisitOutcome((visitOutcome)=>({...visitOutcome, radio_2:"no"}))
          setVisitOutcome((visitOutcome)=>({...visitOutcome, value:"1"}))
          setIfNotSuccess(false);
          setVisitSuccess(true);



          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_1:"no"}));
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_2:"no"}));
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_3:"no"}));
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, value:""}));

    setDoctor((doctor)=>({...doctor, radio_1:"no"}))
    setDoctor((doctor)=>({...doctor, value:"2"}))

    setNurse((nurse)=>({...nurse, radio_1:"no"}))
    setNurse((nurse)=>({...nurse, value:"2"}))

    setMidwife((midwife)=>({...midwife, radio_1:"no"}))
    setMidwife((midwife)=>({...midwife, value:"2"}))

    setParamedic((paramedic)=>({...paramedic, radio_1:"no"}))
    setParamedic((paramedic)=>({...paramedic, value:"2"}))

    setCHW((chw)=>({...chw, radio_1:"no"}))
    setCHW((chw)=>({...chw, value:"2"}))
  
    setDai((dai)=>({...dai, radio_1:"no"}))
    setDai((dai)=>({...dai, value:"2"}))

    setRelative((relative)=>({...relative, radio_1:"no"}))
    setRelative((relative)=>({...relative, value:"2"}))

    setOthers((others)=>({...others, radio_1:"no"}))
    setOthers((others)=>({...others, value:"2"}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))

          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, radio_1:"no"}))
          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, value:"2"}))

          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, radio_1:"no"}))
          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, value:"2"}))

          setAbortion((abortion)=>({...abortion, radio_1:"no"}))
          setAbortion((abortion)=>({...abortion, value:"2"}))
          

        }else if(clicked==="no"){

          setFormNavigation_next("");
          setButton_next(false);
          setButton_save(true);
          
          setVisitOutcome((visitOutcome)=>({...visitOutcome, radio_1:"no"}))
          setVisitOutcome((visitOutcome)=>({...visitOutcome, radio_2:"yes"}))
          setVisitOutcome((visitOutcome)=>({...visitOutcome, value:"2"}))
          setIfNotSuccess(true);
          setVisitSuccess(false);

          setDeliveryDate("")
          setDeliveryDateCheck("");

          setDeliveryTime("");
          setDeliveryTimeCheck(""); 

          setDeliveryType((deliveryType)=>({...deliveryType, radio_1:"no"}));
          setDeliveryType((deliveryType)=>({...deliveryType, radio_2:"no"}));
          setDeliveryType((deliveryType)=>({...deliveryType, value:""}));

          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, radio_1:"no"}))
          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, value:""}))

          setLiveBirthCountDisable(true);
          setTotalLiveBirth("");

          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, radio_1:"no"}))
          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, value:""}))

          setStillBirthCountDisable(true);
          setTotalStillBirth("");

          setAbortion((abortion)=>({...abortion, radio_1:"no"}))
          setAbortion((abortion)=>({...abortion, value:""}))

          setIfChildDied(false);

          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_1:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_2:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, value:""}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_1:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_2:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, value:""}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_1:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_2:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, value:""}));


          setPlaceOfBirth("");
          setIfHospital(false);
          setIfNotHospital(false);

    setDoctor((doctor)=>({...doctor, radio_1:"no"}))
    setDoctor((doctor)=>({...doctor, value:""}))

    setNurse((nurse)=>({...nurse, radio_1:"no"}))
    setNurse((nurse)=>({...nurse, value:""}))

    setMidwife((midwife)=>({...midwife, radio_1:"no"}))
    setMidwife((midwife)=>({...midwife, value:""}))

    setParamedic((paramedic)=>({...paramedic, radio_1:"no"}))
    setParamedic((paramedic)=>({...paramedic, value:""}))

    setCHW((chw)=>({...chw, radio_1:"no"}))
    setCHW((chw)=>({...chw, value:""}))
  
    setDai((dai)=>({...dai, radio_1:"no"}))
    setDai((dai)=>({...dai, value:""}))

    setRelative((relative)=>({...relative, radio_1:"no"}))
    setRelative((relative)=>({...relative, value:""}))

    setOthers((others)=>({...others, radio_1:"no"}))
    setOthers((others)=>({...others, value:""}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:""}))
          
        }
        else{
          setVisitOutcome((visitOutcome)=>({...visitOutcome, radio_1:"no"}))
          setVisitOutcome((visitOutcome)=>({...visitOutcome, radio_2:"no"}))
          setVisitOutcome((visitOutcome)=>({...visitOutcome, value:""}))

          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_1:"no"}));
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_2:"no"}));
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_3:"no"}));
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, value:""}));

          setDeliveryDate("")
          setDeliveryDateCheck("");

          setDeliveryTime("");
          setDeliveryTimeCheck(""); 

          setDeliveryType((deliveryType)=>({...deliveryType, radio_1:"no"}));
          setDeliveryType((deliveryType)=>({...deliveryType, radio_2:"no"}));
          setDeliveryType((deliveryType)=>({...deliveryType, value:""}));

          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, radio_1:"no"}))
          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, value:""}))
          setLiveBirthCountDisable(true);
          setTotalLiveBirth("");

          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, radio_1:"no"}))
          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, value:""}))
          setStillBirthCountDisable(true);
          setTotalStillBirth("");

          setAbortion((abortion)=>({...abortion, radio_1:"no"}))
          setAbortion((abortion)=>({...abortion, value:""}))

          setIfChildDied(false);

          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_1:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_2:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, value:""}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_1:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_2:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, value:""}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_1:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_2:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, value:""}));


          setPlaceOfBirth("");
          setIfHospital(false);
          setIfNotHospital(false);

          setDoctor((doctor)=>({...doctor, radio_1:"no"}))
          setDoctor((doctor)=>({...doctor, value:""}))

          setNurse((nurse)=>({...nurse, radio_1:"no"}))
          setNurse((nurse)=>({...nurse, value:""}))

          setMidwife((midwife)=>({...midwife, radio_1:"no"}))
          setMidwife((midwife)=>({...midwife, value:""}))

          setParamedic((paramedic)=>({...paramedic, radio_1:"no"}))
          setParamedic((paramedic)=>({...paramedic, value:""}))

          setCHW((chw)=>({...chw, radio_1:"no"}))
          setCHW((chw)=>({...chw, value:""}))
        
          setDai((dai)=>({...dai, radio_1:"no"}))
          setDai((dai)=>({...dai, value:""}))

          setRelative((relative)=>({...relative, radio_1:"no"}))
          setRelative((relative)=>({...relative, value:""}))

          setOthers((others)=>({...others, radio_1:"no"}))
          setOthers((others)=>({...others, value:""}))

          setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
          setDontknow((dontknow)=>({...dontknow, value:""}))
          
        }
      }


      const[visitUnsuccessful, setVisitUnsuccessful]=useState({
        radio_1:"no",
        radio_2:"no",
        radio_3:"no",
        value:""
      });


      const visitUnsuccessfulReason=(clicked)=>{
        if(clicked==="1"){
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_1:"yes"}))
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_2:"no"}))
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_3:"no"}))

          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, value:"1"}))
          

        }else if(clicked==="2"){
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_1:"no"}))
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_2:"yes"}))
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_3:"no"}))
          
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, value:"2"}))
          
        }
        else if(clicked==="3"){
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_1:"no"}));
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_2:"no"}));
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_3:"yes"}));

          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, value:"3"}));
        }
        else{
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_1:"no"}));
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_2:"no"}));
          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, radio_3:"no"}));

          setVisitUnsuccessful((visitUnsuccessful)=>({...visitUnsuccessful, value:""}));

        }
      }





      const [deliveryType, setDeliveryType] = useState({
        radio_1:"",
        radio_2:"",
        value:""
      });

      const deliveryTypeCheck=(clicked)=>{

        if(clicked==="1"){
          setDeliveryType((deliveryType)=>({...deliveryType, radio_1:"yes"}))
          setDeliveryType((deliveryType)=>({...deliveryType, radio_2:"no"}))
          setDeliveryType((deliveryType)=>({...deliveryType, value:"1"}))
          

        }else if(clicked==="2"){
          setDeliveryType((deliveryType)=>({...deliveryType, radio_1:"no"}))
          setDeliveryType((deliveryType)=>({...deliveryType, radio_2:"yes"}))
          setDeliveryType((deliveryType)=>({...deliveryType, value:"2"}))

        }
        else{
          setDeliveryType((deliveryType)=>({...deliveryType, radio_1:"no"}));
          setDeliveryType((deliveryType)=>({...deliveryType, radio_2:"no"}));
          setDeliveryType((deliveryType)=>({...deliveryType, value:""}));

        }


      }


      const[liveBirthCountDisable, setLiveBirthCountDisable] = useState(true);
      const[liveBirthCount, setLiveBirthCount] = useState({
        radio_1:"no",
        value:"2"
      });
      
      const[totalLiveBirth, setTotalLiveBirth]=useState("");

      const liveBirthCheck =(clicked)=>{
        if(clicked==="1" && liveBirthCount.value==="2"){
          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, radio_1:"yes"}))
          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, value:"1"}))
          setLiveBirthCountDisable(false);

          setAbortion((abortion)=>({...abortion, radio_1:"no"}))
          setAbortion((abortion)=>({...abortion, value:"2"}))
        }
        
        else if(clicked==="1" && liveBirthCount.value==="1"){
          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, radio_1:"no"}))
          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, value:"2"}))
          setLiveBirthCountDisable(true);
          setTotalLiveBirth("");

        }
        else{
          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, radio_1:"no"}))
          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, value:"2"}))
          setLiveBirthCountDisable(true);
          setTotalLiveBirth("");
        }
        
      }





      const [stillBirthCountDisable, setStillBirthCountDisable] = useState(true);
      const[stillBirthCount, setStillBirthCount] = useState({
        radio_1:"no",
        value:"2"
      });
      
      const[totalStillBirth, setTotalStillBirth]=useState("");

      const stillBirthCheck =(clicked)=>{
        if(clicked==="1" && stillBirthCount.value==="2"){
          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, radio_1:"yes"}))
          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, value:"1"}))
          setStillBirthCountDisable(false);

          setIfChildDied(true);

          setAbortion((abortion)=>({...abortion, radio_1:"no"}))
          setAbortion((abortion)=>({...abortion, value:"2"}))
        }
        
        else if(clicked==="1" && stillBirthCount.value==="1"){
          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, radio_1:"no"}))
          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, value:"2"}))
          setStillBirthCountDisable(true);
          setTotalStillBirth("");

          setIfChildDied(false);

          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_1:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_2:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, value:""}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_1:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_2:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, value:""}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_1:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_2:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, value:""}));

        }
        else{
          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, radio_1:"no"}))
          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, value:"2"}))
          setStillBirthCountDisable(true);
          setTotalStillBirth("");

          setIfChildDied(false);

          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_1:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_2:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, value:""}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_1:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_2:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, value:""}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_1:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_2:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, value:""}));
        }
        
      }



      const [abortion, setAbortion] = useState({
        radio_1:"",
        value:""
      });
      
      const abortionCheck=(clicked)=>{
        if(clicked==="1" && abortion.value==="2"){
          setAbortion((abortion)=>({...abortion, radio_1:"yes"}))
          setAbortion((abortion)=>({...abortion, value:"1"}))

          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, radio_1:"no"}))
          setLiveBirthCount((liveBirthCount)=>({...liveBirthCount, value:"2"}))
          setLiveBirthCountDisable(true);
          setTotalLiveBirth("");

          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, radio_1:"no"}))
          setStillBirthCount((stillBirthCount)=>({...stillBirthCount, value:"2"}))
          setStillBirthCountDisable(true);
          setTotalStillBirth("");


          setIfChildDied(false);

          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_1:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_2:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, value:""}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_1:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_2:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, value:""}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_1:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_2:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, value:""}));


        }
        else if(clicked==="1" && abortion.value==="1"){
          setAbortion((abortion)=>({...abortion, radio_1:"no"}))
          setAbortion((abortion)=>({...abortion, value:"2"}))          
        }else{
          setAbortion((abortion)=>({...abortion, radio_1:"no"}))
          setAbortion((abortion)=>({...abortion, value:"2"}))
        }
      }



      const [died_BreathStatus, setDied_BreathStatus]=useState({
        radio_1:"",
        radio_2:"",
        value:""
      });

      const [died_CryStatus, setDied_CryStatus]=useState({
        radio_1:"",
        radio_2:"",
        value:""
      });

      const [died_MoveStatus, setDied_MoveStatus]=useState({
        radio_1:"",
        radio_2:"",
        value:""
      });


      const died_BreathStatusCheck=(clicked)=>{

        if(clicked==="1"){
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_1:"yes"}))
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_2:"no"}))
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, value:"1"}))
          

        }else if(clicked==="2"){
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_1:"no"}))
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_2:"yes"}))
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, value:"2"}))

        }
        else{
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_1:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, radio_2:"no"}));
          setDied_BreathStatus((died_BreathStatus)=>({...died_BreathStatus, value:""}));

        }

      }          



      const died_CryStatusCheck=(clicked)=>{

        if(clicked==="1"){
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_1:"yes"}))
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_2:"no"}))
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, value:"1"}))
          

        }else if(clicked==="2"){
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_1:"no"}))
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_2:"yes"}))
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, value:"2"}))

        }
        else{
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_1:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, radio_2:"no"}));
          setDied_CryStatus((died_CryStatus)=>({...died_CryStatus, value:""}));

        }

      }



      const died_MoveStatusCheck=(clicked)=>{

        if(clicked==="1"){
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_1:"yes"}))
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_2:"no"}))
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, value:"1"}))
          

        }else if(clicked==="2"){
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_1:"no"}))
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_2:"yes"}))
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, value:"2"}))

        }
        else{
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_1:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, radio_2:"no"}));
          setDied_MoveStatus((died_MoveStatus)=>({...died_MoveStatus, value:""}));

        }

      }




      const [pageOne, setPageOne] = useState(true);
      const [pageTwo, setPageTwo] = useState(false);

      const next_page=()=>{

        var dateDiff_Between_Delivery_LMP = props.MWRA_LMP!=="" && deliveryDate!=="" ? moment(deliveryDate, "MMM DD, YYYY").diff((moment(props.MWRA_LMP,"MMM DD, YYYY")),"days") : "" ;

        if(visitOutcome.value===""){
          Alert.alert("গর্ভের ফলাফল","আপনি কি সঠিক গর্ভের ফলাফল জানতে পেরেছেন? হাঁ অথবা না নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}])
        }
        else if(visitOutcome.value==="2" && visitUnsuccessful.value===""){
          Alert.alert("সঠিক কারন","গর্ভের সঠিক ফলাফল জানতে না পারার কারন নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}])
        }
        else if(visitOutcome.value==="2" && visitUnsuccessful.value!==""){
          Alert.alert("saved");
        }
        else if(visitOutcome.value==="1" && (deliveryDate ==="" || deliveryTime==="")){
          Alert.alert("ফলাফলের তারিখ/সময়","ডেলিভারির সঠিক তারিখ/সময় নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}])
        }
        else if(visitOutcome.value==="1" && moment(moment(deliveryDate, "MMM DD, YYYY").format("YYYY-MM-DD")).isBefore(moment(moment(props.MWRA_LMP, "MMM DD,YYYY").format("YYYY-MM-DD")))){
          Alert.alert("ফলাফলের তারিখ","ডেলিভারির ("+deliveryDate+") তারিখ, সর্বশেষ LMP ("+props.MWRA_LMP+") তারিখ থেকে কম হবে না।",[{text:"ঠিক আছে", onPress:()=>""}])
        }
        else if(visitOutcome.value==="1" && abortion.value!=="1" && deliveryDate!=="" && parseInt(dateDiff_Between_Delivery_LMP)< 174){
          Alert.alert("ফলাফলের তারিখ","ডেলিভারির তারিখ থেকে সর্বশেষ LMP তারিখের মধ্যে পার্থক্য "+dateDiff_Between_Delivery_LMP+" দিনের অথবা ২৪ সাপ্তাহের নিচে আছে। সে ক্ষেত্রে, শুধুমাত্র গর্ভপাত হিসাবে এন্ট্রি দিতে পারবেন।",[{text:"ঠিক আছে", onPress:()=>""}])
        }
        else if(visitOutcome.value==="1" && deliveryType.value===""){
          Alert.alert("ডেলিভারি তথ্য","বাচ্চাটি কিভাবে জন্ম গ্রহন করেছে? একটি নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}])
        }
        else if(visitOutcome.value==="1" && liveBirthCount.value==="" && stillBirthCount.value==="" && abortion.value===""){
          Alert.alert("আউটকাম","ডেলিভারি আউটকাম কি ছিল, নিচের অপশন থেকে নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}]) 
        }
        else if(visitOutcome.value==="1" && liveBirthCount.value==="1" && totalLiveBirth===""){
          Alert.alert("জীবিত জন্মগ্রহন","কতজন শিশু জীবিত জন্মগ্রহন করেছে, ড্রপডাউন মেনু থেকে নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}]) 
        } 
        else if(visitOutcome.value==="1" && stillBirthCount.value==="1" && totalStillBirth===""){
          Alert.alert("মৃত জন্মগ্রহন","কতজন শিশু মৃত জন্মগ্রহন করেছে, ড্রপডাউন মেনু থেকে নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}]) 
        }
        else if(stillBirthCount.value==="1" && stillBirthCount.value==="1" && died_BreathStatus.value===""){
          Alert.alert("মৃত জন্মগ্রহন","কমপক্ষে একবারও শ্বাস নেয়নি, এই অপশন থেকে হাঁ অথবা না নির্বাচন করুন",[{text:"ঠিক আছে", onPress:()=>""}]) 
        }
        else if(stillBirthCount.value==="1" && stillBirthCount.value==="1" && died_CryStatus.value===""){
          Alert.alert("মৃত জন্মগ্রহন","কমপক্ষে একবারও কান্না করেনি, এই অপশন থেকে হাঁ অথবা না নির্বাচন করুন",[{text:"ঠিক আছে", onPress:()=>""}]) 
        }
        else if(stillBirthCount.value==="1" && stillBirthCount.value==="1" && died_MoveStatus.value===""){
          Alert.alert("মৃত জন্মগ্রহন","শরীরের যেকোন অংশ কমপক্ষে একবারও নড়াচড়া করেনি, এই অপশন থেকে হাঁ অথবা না নির্বাচন করুন",[{text:"ঠিক আছে", onPress:()=>""}]) 
        }
        else{
          setPageOne(false);
          setPageTwo(true);
          setFormNavigation_next("");          
          setFormNavigation_back("আগের পেজ");
          setButton_save(true);

        }


      }

      const previous_page=()=>{
        setPageOne(true);
        setPageTwo(false);
        setFormNavigation_next("পরবর্তী পেজ");
        setFormNavigation_back("");
        setButton_save(false);
        setButton_next(true);
      }







const pregnancy_helper_doctor=(clicked)=>{
  if(clicked==="1" && doctor.value==="2"){
    setDoctor((doctor)=>({...doctor, radio_1:"yes"}))
    setDoctor((doctor)=>({...doctor, value:"1"}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))

  }
  else if(clicked==="1" && doctor.value==="1"){
    setDoctor((doctor)=>({...doctor, radio_1:"no"}))
    setDoctor((doctor)=>({...doctor, value:"2"}))
  }  
}


const pregnancy_helper_nurse=(clicked)=>{
  if(clicked==="1" && nurse.value==="2"){
    setNurse((nurse)=>({...nurse, radio_1:"yes"}))
    setNurse((nurse)=>({...nurse, value:"1"}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))
  }
  else if(clicked==="1" && nurse.value==="1"){
    setNurse((nurse)=>({...nurse, radio_1:"no"}))
    setNurse((nurse)=>({...nurse, value:"2"}))
  }
}


const pregnancy_helper_midwife=(clicked)=>{
  if(clicked==="1" && midwife.value==="2"){
    setMidwife((midwife)=>({...midwife, radio_1:"yes"}))
    setMidwife((midwife)=>({...midwife, value:"1"}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))
  }
  else if(clicked==="1" && midwife.value==="1"){
    setMidwife((midwife)=>({...midwife, radio_1:"no"}))
    setMidwife((midwife)=>({...midwife, value:"2"}))
  }
}



const pregnancy_helper_paramedic=(clicked)=>{
  if(clicked==="1" && paramedic.value==="2"){
    setParamedic((paramedic)=>({...paramedic, radio_1:"yes"}))
    setParamedic((paramedic)=>({...paramedic, value:"1"}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))
  }
  else if(clicked==="1" && paramedic.value==="1"){
    setParamedic((paramedic)=>({...paramedic, radio_1:"no"}))
    setParamedic((paramedic)=>({...paramedic, value:"2"}))
  }
}


const pregnancy_helper_chw=(clicked)=>{
  if(clicked==="1" && chw.value==="2"){
    setCHW((chw)=>({...chw, radio_1:"yes"}))
    setCHW((chw)=>({...chw, value:"1"}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))
  }
  else if(clicked==="1" && chw.value==="1"){
    setCHW((chw)=>({...chw, radio_1:"no"}))
    setCHW((chw)=>({...chw, value:"2"}))
  }
}


const pregnancy_helper_dai=(clicked)=>{
  if(clicked==="1" && dai.value==="2"){
    setDai((dai)=>({...dai, radio_1:"yes"}))
    setDai((dai)=>({...dai, value:"1"}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))
  }
  else if(clicked==="1" && dai.value==="1"){
    setDai((dai)=>({...dai, radio_1:"no"}))
    setDai((dai)=>({...dai, value:"2"}))
  }
}


const pregnancy_helper_relative=(clicked)=>{
  if(clicked==="1" && relative.value==="2"){
    setRelative((relative)=>({...relative, radio_1:"yes"}))
    setRelative((relative)=>({...relative, value:"1"}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))
  }
  else if(clicked==="1" && relative.value==="1"){
    setRelative((relative)=>({...relative, radio_1:"no"}))
    setRelative((relative)=>({...relative, value:"2"}))
  }
}


const pregnancy_helper_others=(clicked)=>{
  if(clicked==="1" && others.value==="2"){
    setOthers((others)=>({...others, radio_1:"yes"}))
    setOthers((others)=>({...others, value:"1"}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))
  }
  else if(clicked==="1" && others.value==="1"){
    setOthers((others)=>({...others, radio_1:"no"}))
    setOthers((others)=>({...others, value:"2"}))
  }
}


const pregnancy_helper_dontknow=(clicked)=>{
  if(clicked==="1" && dontknow.value==="2"){
    setDontknow((dontknow)=>({...dontknow, radio_1:"yes"}))
    setDontknow((dontknow)=>({...dontknow, value:"1"}))

    setDoctor((doctor)=>({...doctor, radio_1:"no"}))
    setDoctor((doctor)=>({...doctor, value:"2"}))

    setNurse((nurse)=>({...nurse, radio_1:"no"}))
    setNurse((nurse)=>({...nurse, value:"2"}))

    setMidwife((midwife)=>({...midwife, radio_1:"no"}))
    setMidwife((midwife)=>({...midwife, value:"2"}))

    setParamedic((paramedic)=>({...paramedic, radio_1:"no"}))
    setParamedic((paramedic)=>({...paramedic, value:"2"}))

    setCHW((chw)=>({...chw, radio_1:"no"}))
    setCHW((chw)=>({...chw, value:"2"}))
  
    setDai((dai)=>({...dai, radio_1:"no"}))
    setDai((dai)=>({...dai, value:"2"}))

    setRelative((relative)=>({...relative, radio_1:"no"}))
    setRelative((relative)=>({...relative, value:"2"}))

    setOthers((others)=>({...others, radio_1:"no"}))
    setOthers((others)=>({...others, value:"2"}))
    
  }
  else if(clicked==="1" && dontknow.value==="1"){
    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))

  }
}




const show_helper_options=()=>{


  if(placeOfBirth==="2" || placeOfBirth==="3" || placeOfBirth==="4" || placeOfBirth==="5" || placeOfBirth==="9"){
    setIfNotHospital(false);
    setIfHospital(true)

    setDai((dai)=>({...dai, radio_1:"no"}))
    setDai((dai)=>({...dai, value:"2"}))

    setRelative((relative)=>({...relative, radio_1:"no"}))
    setRelative((relative)=>({...relative, value:"2"}))

    setOthers((others)=>({...others, radio_1:"no"}))
    setOthers((others)=>({...others, value:"2"}))

    setDontknow((dontknow)=>({...dontknow, radio_1:"no"}))
    setDontknow((dontknow)=>({...dontknow, value:"2"}))



  }
  else if(placeOfBirth==="1" || placeOfBirth==="6" || placeOfBirth==="8" || placeOfBirth==="7"){
    setIfNotHospital(true);
    setIfHospital(true)
  }else{
    setIfNotHospital(false);
    setIfHospital(false)
  }

  
}

useEffect(()=>{
  show_helper_options();
},[placeOfBirth])


const[ifNotHospital, setIfNotHospital] = useState(false);
const[ifHospital, setIfHospital] = useState(false);

      



const[formNavigation_next, setFormNavigation_next] = useState("");
const[formNavigation_back, setFormNavigation_back] = useState("");


const [Button_next, setButton_next]=useState(false);
const [Button_save, setButton_save]=useState(false);


const save_pergnancy_outcome=()=>{
  if(visitOutcome.value===""){
    Alert.alert("গর্ভের ফলাফল","আপনি কি সঠিক গর্ভের ফলাফল জানতে পেরেছেন? হাঁ অথবা না নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}])
  }
  else if(visitOutcome.value==="2" && visitUnsuccessful.value===""){
    Alert.alert("সঠিক কারন","গর্ভের সঠিক ফলাফল জানতে না পারার কারন নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}])
  }
  else if(visitOutcome.value==="2" && visitUnsuccessful.value!=="" && visitUnsuccessful.value!=="2"){
    Alert.alert("প্রেগ্নেন্সি আউটকাম ফর্ম", "আপনার দেয়া তথ্য সঠিক হলে (সেভ প্রেগ্নেন্সি আউটকাম ফর্ম) বাটনে ক্লিক করুন। ",[{text:"না, তথ্য সঠিক নয়", onPress:()=>""},{text:"সেভ প্রেগ্নেন্সি আউটকাম ফর্ম", onPress:()=>save_mother_outcome()}])
  }
  else if(visitOutcome.value==="2" && visitUnsuccessful.value!=="" && visitUnsuccessful.value==="2"){
    Alert.alert("প্রেগ্নেন্সি আউটকাম ফর্ম", "আপনার দেয়া তথ্য সঠিক হলে (সেভ প্রেগ্নেন্সি আউটকাম ফর্ম) বাটনে ক্লিক করুন। ",[{text:"না, তথ্য সঠিক নয়", onPress:()=>""},{text:"সেভ প্রেগ্নেন্সি আউটকাম ফর্ম", onPress:()=>save_mother_outcome_as_false_preg()}])
  }
  else if(visitOutcome.value==="1" && placeOfBirth===""){
    Alert.alert("জন্মের স্থান","জন্ম কোথায় হয়েছিল? একটি নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>""}])
  }

  else if(visitOutcome.value==="1" && placeOfBirth!=="" && doctor.value==="2" && nurse.value==="2" && midwife.value==="2" && paramedic.value==="2" && chw.value==="2" && dai.value==="2" && relative.value==="2" && others.value==="2" && dontknow.value==="2"){
    Alert.alert("প্রসবে সহায়তা","প্রসবে কে সহায়তা করেছিল, এক বা একাধিক নির্বাচন করতে হবে।",[{text:"ঠিক আছে", onPress:()=>""}])
  }
  else{
    Alert.alert("প্রেগ্নেন্সি আউটকাম ফর্ম", "আপনার দেয়া তথ্য সঠিক হলে (সেভ প্রেগ্নেন্সি আউটকাম ফর্ম) বাটনে ক্লিক করুন। ",[{text:"না, তথ্য সঠিক নয়", onPress:()=>""},{text:"সেভ প্রেগ্নেন্সি আউটকাম ফর্ম", onPress:()=>save_mother_outcome()}])
  }
}


const save_mother_outcome_as_false_preg=()=>{
  
  db.transaction(tx=>{
    tx.executeSql(
    "update MWRA_Survey "+
    "set pregnancyStatus = '9' "+
    "WHERE "+
    "pid = '"+props.selected_Mem_PID+"' "+
    "AND "+
    "date(VisitDT) = (select max(date(VisitDT)) from MWRA_Survey WHERE pid = '"+props.selected_Mem_PID+"')",
    [],
    (tx, result)=>{
      console.log("query access");
      if(result.rowsAffected>0){     
        
        
        if(props.byPass===true){
          go_to_pregnancy_list();
        }          
        else{
          Alert.alert("গর্ভের ফলাফলের তথ্য","আপনার দেয়া তথ্য সফলভাবে সেভ হয়েছে। যেহেতু, কোন জীবিত জন্ম শিশু নেই তাই কোন শিশুর তথ্য/আউটকাম ফর্ম পূরণ করতে হবে না। ঠিক আছে বাটনে ক্লিক করুন।",[{text:"ঠিক আছে", onPress:()=>{checkMWRA()}}])          
        }


            
            
      }      

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
}


const save_mother_outcome=()=>{

  


  var deliveryDateFormatted = deliveryDate!=="" ? moment(deliveryDate, "MMM DD, YYYY").format("YYYY-MM-DD") : "";

  db.transaction(tx=>{
    tx.executeSql(
    "insert OR IGNORE into Preg_Outcome_Mother ( "+        
    "Mem_PID,  "+
    "MCID,  "+
    "Round_No, "+ 
    "Preg_SL,  "+
    "Delivery_info,  "+
    "Delivery_info_not_avail,  "+
    "Del_Date,  "+
    "Del_Time,  "+
    "LiveBirth,  "+
    "LB_Num,  "+
    "StillBirth,  "+
    "SB_Num,  "+
    "Abortion, "+
    "Abor_Q1,  "+
    "Abor_Q2,  "+
    "Abor_Q3,  "+
    "Del_Place,  "+
    "Qual_Doc ,  "+
    "Nurse,  "+
    "Midwife,  "+
    "Paramedic,  "+
    "CHW,  "+
    "Trad_BA,  "+
    "Rel_Neigh,  "+
    "Other,  "+
    "DK,  "+
    "UserID,  "+
    "Delivery_mode,  "+
    "Entry_Date) values( "+
    "'"+props.selected_Mem_PID+"',"+
    "'"+props.selected_Mem_CID+"',"+
    "'"+props.surveyNo+"',"+
    "'"+props.pregnancyNoDB+"',"+
    "'"+visitOutcome.value+"',"+
    "'"+visitUnsuccessful.value+"',"+
    "'"+deliveryDateFormatted+"',"+
    "'"+deliveryTime+"',"+
    "'"+liveBirthCount.value+"',"+
    "'"+totalLiveBirth+"',"+
    "'"+stillBirthCount.value+"',"+
    "'"+totalStillBirth+"',"+
    "'"+abortion.value+"',"+
    "'"+died_BreathStatus.value+"',"+
    "'"+died_CryStatus.value+"',"+
    "'"+died_MoveStatus.value+"',"+
    "'"+placeOfBirth+"',"+
    "'"+doctor.value+"',"+
    "'"+nurse.value+"',"+
    "'"+midwife.value+"',"+
    "'"+paramedic.value+"',"+
    "'"+chw.value+"',"+
    "'"+dai.value+"',"+
    "'"+relative.value+"',"+
    "'"+others.value+"',"+
    "'"+dontknow.value+"',"+
    "'"+props.userID+"', "+
    "'"+deliveryType.value+"', "+
    "'"+moment().format("YYYY-MM-DD HH:mm")+"' )",
    [],
    (tx, result)=>{
      console.log("query access");
      if(result.rowsAffected>0){
         
          if(liveBirthCount.value==="1" && parseInt(totalLiveBirth)>0){
            Alert.alert("গর্ভের ফলাফলের তথ্য","আপনার দেয়া তথ্য সফলভাবে সেভ হয়েছে। যেহেতু, ফলাফল সফল হয়েছে এবং জীবিত "+totalLiveBirth+" জন শিশু জন্ম গ্রহন করেছে, সেক্ষেত্রে শিশুর তথ্য বা শিশু আউটকাম ফর্মটি পুরন করতে হবে। পূরণের জন্য নিচের (শিশুর তথ্য/আউটকাম) বাটনে ক্লিক করুন।",[{text:"শিশুর তথ্য/আউটকাম", onPress:()=>{go_to_child_outcome_form()}}])            
          }
          else if(props.byPass===true){
            go_to_pregnancy_list();
          }          
          else{
            Alert.alert("গর্ভের ফলাফলের তথ্য","আপনার দেয়া তথ্য সফলভাবে সেভ হয়েছে। যেহেতু, কোন জীবিত জন্ম শিশু নেই তাই কোন শিশুর তথ্য/আউটকাম ফর্ম পূরণ করতে হবে না। ঠিক আছে বাটনে ক্লিক করুন।",[{text:"ঠিক আছে", onPress:()=>{checkMWRA()}}])
          }
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


const go_to_child_outcome_form=()=>{
  Navigation.push(props.componentId,{
    component:{
      name:"Child_outcome_form",
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
        MWRA_LMP:props.MWRA_LMP,
        MWRA_MeritalStatus:props.MWRA_MeritalStatus,
        MWRA_pregnancyValue:props.MWRA_pregnancyValue,
        MWRA_Menopause : props.MWRA_Menopause,
        MWRA_MeritalStatusValue:props.MWRA_MeritalStatusValue,
        MWRA_Pregnancy_identified_by:props.MWRA_Pregnancy_identified_by,
        MWRA_PregnancyNo_MWRA:props.MWRA_PregnancyNo_MWRA,
        Spouse_MPID:props.Spouse_MPID,
        pregnancyNoDB:props.pregnancyNoDB,
        surveyNo:props.surveyNo, 
        liveBirthNumber: totalLiveBirth,
        formattedDeliveryDate:deliveryDate,
        byPass:props.byPass

      },

      options:{
        topBar:{
          visible:true,
          title:{
            text:"শিশুর তথ্য এবং আউটকাম ফর্ম"
          },
          rightButtons:[]
          
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





  return (

    <ScrollView style={{backgroundColor:"#f0f0f0"}}>
<View style={{alignItems:"center"}}>

            <View style={{marginTop:"1%",height:"auto", width:"98%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                প্রেগ্নেন্সি আউটকাম ফর্ম               
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
              <Text style={font.fontColor}>গর্ভ/মাসিকের অবস্থাঃ <Text style={{color:"#db2777"}}>গর্ভের ফলাফল জানা গিয়েছে</Text></Text>
              <Text style={font.fontColor}>LMP সর্বশেষঃ <Text style={{color:"#db2777"}}>{props.MWRA_LMP}</Text></Text>
              <Text style={font.fontColor}>বৈবাহিক অবস্থাঃ <Text style={{color:"#db2777"}}>{props.MWRA_MeritalStatus}</Text></Text>
              </View>
              
              <View style={{width:"50%", padding:5}}>
              <Text style={font.fontColor}>এম পি আইডিঃ <Text style={{color:"#db2777"}}>{props.FormattedMPID} </Text></Text>
              <Text style={font.fontColor}>এম সি আইডিঃ <Text style={{color:"#db2777"}}>{props.FormattedMCID} </Text></Text>

              </View>              
       
            </View>




            
            {pageOne &&(
            <View style={{width:"100%", alignItems:"center"}}>
            <View style={{height:90, marginTop:"1%", width:"98%"}}>
            <QuestionContainer
            question={"আপনি কি সঠিক গর্ভের ফলাফল জানতে পেরেছেন?"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={visitOutcomeCheck.bind(this,"yes")} Value={visitOutcome.radio_1} title={"হ্যাঁ, জানতে পেরেছি"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={visitOutcomeCheck.bind(this,"no")} Value={visitOutcome.radio_2} title={"না, জানতে পারিনি"}/></View>}
            direction={"row"}
            />
            </View>


            
            {ifNotSuccess && (
            <View style={{height:165, marginTop:"1%", width:"98%"}}>
            <QuestionContainer
            question={"আপনি সঠিক গর্ভের ফলাফল জানতে পারেননি, নিচের অপশন থেকে কারন উল্লেখ করুন। "}
            radio_1={<View style={{width:"50%"}}><RadioButton callFunction={visitUnsuccessfulReason.bind(this,"1")} Value={visitUnsuccessful.radio_1} title={"ডেলিভারির আগে মা মারা গেছেন"}/></View>}
            radio_2={<View style={{width:"50%"}}><RadioButton callFunction={visitUnsuccessfulReason.bind(this,"2")} Value={visitUnsuccessful.radio_2} title={"ভুল গর্ভবতী হিসাবে সনাক্ত"}/></View>}
            radio_3={<View style={{width:"50%"}}><RadioButton callFunction={visitUnsuccessfulReason.bind(this,"3")} Value={visitUnsuccessful.radio_3} title={"মা ডেলিভারির তথ্য দিতে সমর্থন দেননি"}/></View>}
            direction={"column"}
            />
            </View>           
            )}    




            {visitSuccess && (
            <View style={{width:"98%"}}>
            <View style={{height:100, marginTop:"1%", width:"100%"}}>
            <QuestionContainer
            question={"মাকে জিজ্ঞাসা করুন এবং বাচ্চা প্রসবের (যখন বাচ্চা বের হয়েছে) তারিখ ও সময় লিপিবদ্ধ করুন। (একাধিক শিশুর ক্ষাত্রে সর্বশেষ শিশুর প্রসবের তারিখ ও সময় লিখুন)"}
            
            inputField_1={<View style={{width:"45%"}}><TouchableOpacity onPress={deliveryDateChecker} ><Date_field value={deliveryDate} ph={"প্রসবের তারিখ"}/></TouchableOpacity>
            <DatePicker
            modal
            title={"প্রসবের তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            mode='date'
            maximumDate={new Date()}
            open={deliveryDateContainer}
            date={new Date()}
            onConfirm={(statusChnageOn) => {
              setDeliveryDateContainer(false)
              DeliveryDate_onConfirm(statusChnageOn);
            }}
            onCancel={() => {
              setDeliveryDateContainer(false)
              setDeliveryDate("")
              setDeliveryDateCheck("");
              }} />
            </View>}

            inputField_2={<View style={{width:"45%"}}><TouchableOpacity onPress={deliveryTimeChecker} ><Date_field value={deliveryTime} ph={"প্রসবের সময়"}/></TouchableOpacity>
            <DatePicker
            modal
            title={"প্রসবের সময়"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            mode='time'
            locale="en-GB"      
            is24hourSource="locale" 
            open={deliveryTimeContainer}
            date={new Date()}
            onConfirm={(statusChnageOn) => {
              setDeliveryTimeContainer(false)
              DeliveryTime_onConfirm(statusChnageOn);
            }}
            onCancel={() => {
              setDeliveryTimeContainer(false)
              setDeliveryTime("")
              setDeliveryTimeCheck("");
              }} />
            </View>}

            direction={"row"}
            />
            </View>     


            <View style={{height:90, marginTop:"1%", width:"100%"}}>
            <QuestionContainer
            question={"বাচ্চাটি কিভাবে জন্ম গ্রহন করেছে?"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={deliveryTypeCheck.bind(this,"1")} Value={deliveryType.radio_1} title={"নরমান ডেলিভারি"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={deliveryTypeCheck.bind(this,"2")} Value={deliveryType.radio_2} title={"সিজারিয়ান সেকশন"}/></View>}
            direction={"row"}
            />
            </View>   




            <View style={{height:110, marginTop:"1%", width:"100%"}}>
            <QuestionContainer
            question={"শিশু কি জীবিত জন্মগ্রহন করেছে? হ্যাঁ হলে, নিচের বাটনে ক্লিক করে, ডানদিকের অপশন থেকে কতটি শিশু একসাথে জন্ম গ্রহন করেছে, তা নির্বাচন করুন।"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={liveBirthCheck.bind(this,"1")} Value={liveBirthCount.radio_1} title={"হ্যাঁ, জীবিত জন্ম"}/></View>}

            inputField_1={<View style={{width:"30%"}}>
              <DropDown 
                data={totalBirths} 
                labelField={"label"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={totalLiveBirth}
                disable={liveBirthCountDisable}
                onChange={item => {                  
                  setTotalLiveBirth(item.value);                                    
                }}
             />
            </View>} 

            direction={"row"}
            />            
            </View>


            <View style={{height:110, marginTop:"1%", width:"100%"}}>
            <QuestionContainer
            question={"শিশু কি মৃত জন্মগ্রহন করেছে? হ্যাঁ হলে, নিচের বাটনে ক্লিক করে, ডানদিকের অপশন থেকে কতটি শিশু একসাথে মৃত জন্ম গ্রহন করেছে, তা নির্বাচন করুন।"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={stillBirthCheck.bind(this,"1")} Value={stillBirthCount.radio_1} title={"হ্যাঁ, মৃত হয়েছে"}/></View>}

            inputField_1={<View style={{width:"30%"}}>
              <DropDown 
                data={totalBirths} 
                labelField={"label"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={totalStillBirth}
                disable={stillBirthCountDisable}
                onChange={item => {                  
                  setTotalStillBirth(item.value);                                    
                }}
             />
            </View>} 

            direction={"row"}
            />
            </View>


            <View style={{height:90, marginTop:"1%", width:"100%"}}>
            <QuestionContainer
            question={"গর্ভপাত, যদি গর্ভপাত হয়ে থাকে, নিচের বাটনে ক্লিক করুন।"}
            radio_1={<View style={{width:"30%", marginLeft:73}}><RadioButton callFunction={abortionCheck.bind(this,"1")} Value={abortion.radio_1} title={"হ্যাঁ, গর্ভপাত হয়েছে"}/></View>}
            direction={"column"}
            />
            </View>

            </View>  
            )}  









            {ifChildDied && (
            <View style={{width:"98%"}}>
            <View style={{height:40, marginTop:"1%", width:"100%"}}>
            <QuestionContainer
            question={<Text style={{fontWeight:"bold", color:"#5a5abf"}}>আপনি মৃত জন্ম নির্বাচন করেছেন, তাই নিচের এই তিনটি প্রশ্নের উত্তর দিন।</Text>}            
            direction={"column"}
            />
            </View>

            <View style={{height:80, marginTop:"1%", width:"100%"}}>
            <QuestionContainer
            question={"কমপক্ষে একবারও শ্বাস নেয়নি।"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={died_BreathStatusCheck.bind(this,"1")} Value={died_BreathStatus.radio_1} title={"হ্যাঁ"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={died_BreathStatusCheck.bind(this,"2")} Value={died_BreathStatus.radio_2} title={"না"}/></View>}
            direction={"row"}
            />
            </View>


            <View style={{height:80, marginTop:"1%", width:"100%"}}>
            <QuestionContainer
            question={"কমপক্ষে একবারও কান্না করেনি।"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={died_CryStatusCheck.bind(this,"1")} Value={died_CryStatus.radio_1} title={"হ্যাঁ"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={died_CryStatusCheck.bind(this,"2")} Value={died_CryStatus.radio_2} title={"না"}/></View>}
            direction={"row"}
            />
            </View>


            <View style={{height:80, marginTop:"1%", width:"100%"}}>
            <QuestionContainer
            question={"শরীরের যেকোন অংশ কমপক্ষে একবারও নড়াচড়া করেনি।"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={died_MoveStatusCheck.bind(this,"1")} Value={died_MoveStatus.radio_1} title={"হ্যাঁ"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={died_MoveStatusCheck.bind(this,"2")} Value={died_MoveStatus.radio_2} title={"না"}/></View>}
            direction={"row"}
            />
            </View>
            </View>       
            )} 


            </View>
            )}

            {pageTwo && (

              <View style={{width:"100%", alignItems:"center"}}>
                <View style={{height:110, marginTop:"1%", width:"98%"}}>
            <QuestionContainer
            question={"জন্ম কোথায় হয়েছিল? (একাধিক শিশুর ক্ষাত্রে সর্বশেষ শিশুর প্রসবের স্থান উল্লেখ করুন) "}
            inputField_1={<View style={{width:"70%"}}>
              <DropDown 
                data={placeOfBirthValues} 
                labelField={"label"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={placeOfBirth}              
                onChange={item => {                  
                  setPlaceOfBirth(item.value);                                    
                }}
             />
            </View>} 

            direction={"column"}
            />

            </View>






            {ifHospital &&(
            <View style={{height:250, marginTop:"1%", width:"98%"}}>
            <QuestionContainer
            question={"প্রসবে কে সহায়তা করেছিল?(একাধিক শিশুর ক্ষাত্রে সর্বশেষ শিশুর প্রসবে যে সহায়তা করেছেন তা উল্লেখ করুন? এক বা একাধিক নির্বাচন করতে পারবেন"}
            radio_1={<View style={{width:"50%"}}><RadioButton callFunction={pregnancy_helper_doctor.bind(this,"1")} Value={doctor.radio_1} title={"পাশ করা ডাক্তার"}/></View>}
            radio_2={<View style={{width:"50%"}}><RadioButton callFunction={pregnancy_helper_nurse.bind(this,"1")} Value={nurse.radio_1} title={"নার্স"}/></View>}
            radio_3={<View style={{width:"50%"}}><RadioButton callFunction={pregnancy_helper_midwife.bind(this,"1")} Value={midwife.radio_1} title={"মিডওয়াইফ"}/></View>}
            radio_4={<View style={{width:"50%"}}><RadioButton callFunction={pregnancy_helper_paramedic.bind(this,"1")} Value={paramedic.radio_1} title={"পারামেডিক( এফডব্লিউভি, সাকমো, এমএ)"}/></View>}
            radio_5={<View style={{width:"50%"}}><RadioButton callFunction={pregnancy_helper_chw.bind(this,"1")} Value={chw.radio_1} title={"মাঠ পর্যায়ের স্বাস্থ্যকর্ম"}/></View>}
            direction={"column"}
            />
            </View>
            )}

            {ifNotHospital &&(
            <View style={{height:175, marginTop:"1%", width:"98%"}}>
            <QuestionContainer
            question={""}
            radio_1={<View style={{width:"50%"}}><RadioButton callFunction={pregnancy_helper_dai.bind(this,"1")} Value={dai.radio_1} title={"দাই/ ধন্নী"}/></View>}
            radio_2={<View style={{width:"50%"}}><RadioButton callFunction={pregnancy_helper_relative.bind(this,"1")} Value={relative.radio_1} title={"আত্মীয়/ প্রতিবেশী"}/></View>}
            radio_3={<View style={{width:"50%"}}><RadioButton callFunction={pregnancy_helper_others.bind(this,"1")} Value={others.radio_1} title={"অন্যান্য"}/></View>}
            radio_4={<View style={{width:"50%"}}><RadioButton callFunction={pregnancy_helper_dontknow.bind(this,"1")} Value={dontknow.radio_1} title={"জানিনা"}/></View>}
            direction={"column"}
            />
            </View>
            )}

              </View>

            )}









            




            
            

          <View style={{width:"96%", paddingBottom:40, marginTop:"5%", justifyContent: 'space-between', alignItems:"center", flexDirection:"row"}}>


            
            

            <TouchableOpacity onPress={previous_page} style={{marginRight:20}}>
            <Text style={{color:"#0e7490", fontWeight:"bold"}}>{formNavigation_back}</Text>
            </TouchableOpacity>  


{Button_next &&(
            <TouchableOpacity onPress={next_page} style={{marginRight:10, alignSelf:"flex-end"}}>
            <Text style={{color:"#0e7490", fontWeight:"bold"}}>{formNavigation_next}</Text>
            </TouchableOpacity>
)}

{Button_save &&(
            <View style={{width:"30%", marginRight:"35%"}}>
            <CRUD_button callFunction={save_pergnancy_outcome} title={"সেভ প্রেগ্নেন্সি আউটকাম ফর্ম"} radious={20}/>
            </View>
)}            




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

export default Mother_outcome_form
