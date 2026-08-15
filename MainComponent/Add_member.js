import React, { useEffect, useState } from 'react'
import { View, Text, Alert, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import QuestionContainer from '../components/QuestionContainer'
import RadioButton from '../components/RadioButton'
import CRUD_button from '../components/CRUD_button'
import InputField from '../components/InputField'
import Date_field from '../components/Date_field'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { Dropdown } from 'react-native-element-dropdown'
import DropDown from '../components/DropDown'
import { openDatabase } from 'react-native-sqlite-storage';
import CustomAlert from '../components/CustomAlert'
import { Navigation } from 'react-native-navigation'
import Headder from '../components/Headder'
import Inside_khana_member_list from '../components/Inside_khana_member_list'
import { GenerateIDs } from '../components/GenerateIDs';
import { passValueToSidebar } from '../components/SideBar_values'

const db = openDatabase(
  {
    name: 'prf.db',
    location: 'default',
    //createFromLocation:"/storage/emulated/0/103_prf.db"
  },
  ()=>{console.log("Database OK.....")},
  error=>{Alert.alert("Database ERROR!!!!!!")}
  );





const Add_member = (props) => {

  useEffect(()=>{
    passValueToSidebar(props.userID, false, props.componentId);
  },[]);
  

  const{updateIDs, Gen_PID, Gen_CID, Gen_Serial, Gen_LineNo} =  GenerateIDs();

  // const[PID, SetPID] = useState("");
  // const[Serial, SetSerial] = useState("");
  // const[CID, SetCID] = useState("");
  // const[LineNo, SetLineNo] = useState("")

  const [PID, SetPID] = useState("");
  const [CID, SetCID] = useState("");
  const [Serial, SetSerial] = useState("");
  const [LineNo, SetLineNo] = useState("");



  const generateIDs= async()=>{

    SetPID("অপেক্ষা করুন");
    SetCID("অপেক্ষা করুন")
    SetSerial("")
    SetLineNo("");

    const ids = await updateIDs(props.cluster, props.block, props.villageCode, props.bari, props.hh);
    SetPID(ids.PID);
    SetCID(ids.CID)
    SetSerial(ids.Serial)
    SetLineNo(ids.LineNo);

  }


  // name:props.items[0],
  // userID:props.items[1],
  // password:props.items[2],
  // cluster:props.items[3],
  // roundNo:props.items[4],
  // block:props.items[5],
  // villageCode:props.items[6],
  // villageName:props.items[7],  
  // bari:props.items[8],
  // bariName:props.items[9],
  // hh:props.items[10],
  // hhName:props.items[11]

  

  // const{systolic = '', diastolic= ''} = blood_pressure_count;

  const[loading, SetLoading]=useState(false);




  // const generate_pid=()=>{  

  //   db.transaction(tx=>{
  //     tx.executeSql(
  //     "select max(Mem_PID)'maxPID' from member where Cluster ='"+props.cluster+"' and  Block = '"+props.block+"' and Mem_PID not in ('99999999999')",
  //     [],
  //     (tx, result)=>{
        
  //     var length = result.rows.length;
  
  //           if(length>0){
  //             let results = [];
  //             for(let i= 0; i<length; i++){
  //                let items=result.rows.item(i);
  //                var last_PID_of_Cluster_Block = items.maxPID.substring(5, 11);    
  //                var pid = parseInt(last_PID_of_Cluster_Block) + parseInt("1");
  //                var nextPID = pid.toString();
                 
  //                if(parseInt(items.maxPID)>0){
  //                if(nextPID.length=="1"){
  //                 // document.getElementById("Query_Generated_PID").value = cl+bl+"00000"+nextPID;
  //                 SetPID(props.cluster+""+props.block+"00000"+nextPID);
  //                 }
  //                 else if(nextPID.length=="2"){
  //                 // document.getElementById("Query_Generated_PID").value = cl+bl+"0000"+nextPID;
  //                 SetPID(props.cluster+""+props.block+"0000"+nextPID);
  //                 }
  //                 else if(nextPID.length=="3"){
  //                 // document.getElementById("Query_Generated_PID").value = cl+bl+"000"+nextPID;
  //                 SetPID(props.cluster+""+props.block+"000"+nextPID);
  //                 }
  //                 else if(nextPID.length=="4"){
  //                 // document.getElementById("Query_Generated_PID").value = cl+bl+"00"+nextPID;
  //                 SetPID(props.cluster+""+props.block+"00"+nextPID);
  //                 }
  //                 else if(nextPID.length=="5"){
  //                 // document.getElementById("Query_Generated_PID").value = cl+bl+"0"+nextPID;
  //                 SetPID(props.cluster+""+props.block+"0"+nextPID);
  //                 }
  //                 else if(nextPID.length=="6"){
  //                 // document.getElementById("Query_Generated_PID").value = cl+bl+nextPID;
  //                 SetPID(props.cluster+""+props.block+""+nextPID);
  //                 }
  //                 else{
  //                 SetPID("Invalid!!!");
  //                 }
  //               }
  //               else{
  //                 // document.getElementById("Query_Generated_PID").value = cl+bl+"000001";
  //                 SetPID(props.cluster+""+props.block+""+"000001");
  //                 }

                  
                 
  //             }               
  //           }else{
  //             SetPID(props.cluster+""+props.block+""+"000001");
  //           }
  
  //     },
  //     function(tx, error){
  //     console.log("add data error: "+ error.message);
  //     });
  //     });



  //     db.transaction(tx=>{
  //       tx.executeSql(
  //       "select max(Mem_SL)'maxSL' from member where Cluster ='"+props.cluster+"' and  Block = '"+props.block+"'",
  //       [],
  //       (tx, result)=>{
          
  //       var length = result.rows.length;
    
  //             if(length>0){
  //               let results = [];
  //               for(let i= 0; i<length; i++){
  //                  let items=result.rows.item(i);
                   


  //                  var sl = parseInt(items.maxSL.substring(5, 11)) + parseInt("1");
  //                  var nextSL = sl.toString();

                   
  //                  if(parseInt(items.maxSL)>0){
  //                   if(nextSL.length=="1"){
  //                     // document.getElementById("Query_Generated_SL").value = cl+bl+"00000"+nextSL;
  //                     SetSerial(props.cluster+""+props.block+""+"00000"+nextSL)
  //                     }
  //                     else if(nextSL.length=="2"){
  //                     // document.getElementById("Query_Generated_SL").value = cl+bl+"0000"+nextSL;
  //                     SetSerial(props.cluster+""+props.block+""+"0000"+nextSL)
  //                     }
  //                     else if(nextSL.length=="3"){
  //                     // document.getElementById("Query_Generated_SL").value = cl+bl+"000"+nextSL;
  //                     SetSerial(props.cluster+""+props.block+""+"000"+nextSL)
  //                     }
  //                     else if(nextSL.length=="4"){
  //                     // document.getElementById("Query_Generated_SL").value = cl+bl+"00"+nextSL;
  //                     SetSerial(props.cluster+""+props.block+""+"00"+nextSL)
  //                     }
  //                     else if(nextSL.length=="5"){
  //                     // document.getElementById("Query_Generated_SL").value = cl+bl+"0"+nextSL;
  //                     SetSerial(props.cluster+""+props.block+""+"0"+nextSL)
  //                     }
  //                     else if(nextSL.length=="6"){
  //                       SetSerial(props.cluster+""+props.block+""+nextSL)
  //                     }
  //                     else{
  //                       SetSerial("Invalid!!!")
  //                     }
  //                 }
  //                 else{
  //                   // document.getElementById("Query_Generated_PID").value = cl+bl+"000001";
  //                   SetSerial(props.cluster+""+props.block+""+"000001");                    
  //                   }
  
                    
                   
  //               }               
  //             }else{
  //               SetSerial(props.cluster+""+props.block+""+"000001");                    
  //             }
    
  //       },
  //       function(tx, error){
  //       console.log("add data error: "+ error.message);
  //       });
  //       });





  //       db.transaction(tx=>{
  //         tx.executeSql(
  //         "select max(MCID)'nxtMCID' from member where Village_Code='"+props.villageCode+"' and Bari_Code='"+props.bari+"' and HH_Code='"+props.hh+"' and MCID not in ('999999999999')",
  //         [],
  //         (tx, result)=>{
            
  //         var length = result.rows.length;
      
  //               if(length>0){
                  
  //                 for(let i= 0; i<length; i++){
  //                    let items=result.rows.item(i);
                     
  //                    if(parseInt(items.nxtMCID)>0){

  //                     var NextLineNo = parseInt(items.nxtMCID.substring(10, 12))+parseInt("1");
  //                     var NextCID = NextLineNo.toString();

  //                     if(NextCID.length == "1"){
  //                       NextCID = "0"+NextCID;                        
  //                       SetCID(props.villageCode+""+props.bari+""+props.hh+""+NextCID);
  //                       SetLineNo(NextCID);
  //                       }
  //                       else{
  //                       NextCID = NextCID.trim();
  //                       SetCID(props.villageCode+""+props.bari+""+props.hh+""+NextCID);
  //                       SetLineNo(NextCID);
  //                       }

  //                    }
  //                    else{
  //                     SetCID(props.villageCode+""+props.bari+""+props.hh+""+"01");
  //                     SetLineNo(NextCID);
  //                    }
  //                 }               
  //               }else{
  //                 SetCID(props.villageCode+""+props.bari+""+props.hh+""+"01");
  //                 SetLineNo("1");
  //               }
      
  //         },
  //         function(tx, error){
  //         console.log("add data error: "+ error.message);
  //         });
  //         });






  //   }






  const [fatherName, SetFatherName] = useState([]);

  const get_father_name=()=>{  

    setSelectedFather({FatherName:""});
    setSelectedFather({FatherMPID:""});


  db.transaction(tx=>{
    tx.executeSql(
    "select 'এই লিস্টে নেই' as 'Mem_Name', '99999999999' as 'Mem_PID' union select Mem_Name, Mem_PID from member where Village_Code = '"+props.villageCode+"' and Bari_Code = '"+props.bari+"' and HH_Code='"+props.hh+"' and Mem_Sex = '1' and "+
    "(cast((((JulianDay('now')) - JulianDay(case "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
    "else Mem_DOB end))/365.25) AS int)>=13 OR CAST(Mem_Age AS int)>13) ",
    [],
    (tx, result)=>{
      
    var length = result.rows.length;

          if(length>0){
            let results = [];
            for(let i= 0; i<length; i++){
               let items=result.rows.item(i);
               results.push({name:items.Mem_Name, MPID:items.Mem_PID})                
            } 
            SetFatherName(results);
          }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
  }





  const [motherName, SetMotherName] = useState([]);

  const get_mother_name=()=>{  
    setSelectedMother({MotherName:""});
    setSelectedMother({MotherMPID:""});

  db.transaction(tx=>{
    tx.executeSql(
    "select 'এই লিস্টে নেই' as 'Mem_Name', '99999999999' as 'Mem_PID' union select Mem_Name, Mem_PID from member where Village_Code = '"+props.villageCode+"' and Bari_Code = '"+props.bari+"' and HH_Code='"+props.hh+"' and Mem_Sex = '2' and "+
    "(cast((((JulianDay('now')) - JulianDay(case "+
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
      "else Mem_DOB end))/365.25) AS int)>=13 OR CAST(Mem_Age AS int)>13)",
    [],
    (tx, result)=>{
      
    var length = result.rows.length;

          if(length>0){
            let results = [];
            for(let i= 0; i<length; i++){
               let items=result.rows.item(i);
               results.push({name:items.Mem_Name, MPID:items.Mem_PID})                
            } 
            SetMotherName(results);
          }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
  }





  const [spouseName, SetSpouseName] = useState([]);

  

  const get_spouse_name=()=>{  

    // setSelectedSpouse({SpouseName:""});
    // setSelectedSpouse({SpouseMPID:""});
    setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseMPID:""}))
    setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseName:""}))

    var spouseGender = "";
    if(MemberGender.value==="1"){
      spouseGender = "2"
    }else if(MemberGender.value==="2"){
      spouseGender = "1"
    }
    else{
      spouseGender = ""
    }
    

  db.transaction(tx=>{
    tx.executeSql(
    "select 'এই লিস্টে নেই' as 'Mem_Name', '99999999999' as 'Mem_PID' union select Mem_Name, Mem_PID from member where Village_Code = '"+props.villageCode+"' and Bari_Code = '"+props.bari+"' and HH_Code='"+props.hh+"' and Mem_Sex = '"+spouseGender+"' and "+
    "(cast((((JulianDay('now')) - JulianDay(case "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
    "else Mem_DOB end))/365.25) AS int)>=13 OR CAST(Mem_Age AS int)>13)",
    [],
    (tx, result)=>{
      
    var length = result.rows.length;

          if(length>0){
            let results = [];
            for(let i= 0; i<length; i++){
               let items=result.rows.item(i);
               results.push({name:items.Mem_Name, MPID:items.Mem_PID})                
            } 
            SetSpouseName(results);
          }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
  }

  


  
// console.log(""+fatherName.name);
//  Alert.alert(""+fatherName.MPID);



  // const data = [
  //   { label: 'Item 1', value: '1' },
  //   { label: 'Item 2', value: '2' },
  //   { label: 'Item 3', value: '3' },
  //   { label: 'Item 4', value: '4' },
  //   { label: 'Item 5', value: '5' },
  //   { label: 'Item 6', value: '6' },
  //   { label: 'Item 7', value: '7' },
  //   { label: 'Item 8', value: '8' },
  // ];
  
                const Level_of_education = [ 
                    {label: "প্রথম শ্রেণীর নিচে", value : "00"},
                    {label: "প্রথম/ আউয়াল/ মক্তব আউয়াল", value : "01"},
                    {label: "দ্বিতীয়/ দুত্তম/ মক্তব দুত্তম", value : "02"},
                    {label: "তৃতীয়/ ছুত্তম/ মক্তব ছুওম", value : "03"},
                    {label: "চতুর্থ/ চারম/ মক্তব চারম", value : "04"},
                    {label: "পঞ্চম/ পাঞ্ছম/ মক্তব পাঞ্ছম", value : "05"},
                    {label: "ষষ্ট/ দাখিলআউয়াল/ ছাফেলা আউয়ালবামুতাওয়াছছিতাআউয়াল ", value : "06"},
                    {label: "সপ্তম/  দাখিলদুত্তম/ ছাফেলা দুওমবামুতাওয়াছছিতাদুওম", value : "07"},
                    {label: "অষ্টম/ দাখিল ছুত্তমঅষ্টম/ ছাফেলা ছুওমবামুতাওয়াছছিতাছূওম", value : "08"},
                    {label: "নবম/ দাখিলচারম নবম/ ছাফেলা চারম বামুতাওয়াছছিতাচারম", value : "09"},
                    {label: "দশম/ দাখিল/ আলিয়াআউয়ালবাছামিয়াপ্রথম", value : "10"},
                    {label: "উচ্চ মাধ্যমিক/ আলিম/ আলিয়াদুত্তমবাছামিয়াদ্বিতীয়/ আলিয়াছুওমবাফজিলতপ্রথম", value : "12"},
                    {label: "ডিগ্রী/ ফাজিল/ আলিয়া ছুওম/ আলিয়াচারমবাফজিলতদ্বিতীয়", value : "14"},
                    {label: " মাস্টার্স/ কালিম/ দাওরাহাদিস", value : "16"},
                    {label: "শুধু মাত্র হাফিজি", value : "77"},
                    {label: "জানা নেই", value : "98"}
                  ];


const Level_of_occupation = [
                    {label:"সরকারী চাকুরী", value : "01"},
                    {label:"প্রাইভেট চাকুরী", value : "02"},
                    {label:"স্বনির্ভর", value : "03"},
                    {label:"কৃষিকাজ", value : "04"},
                    {label:"দিন মজুর", value : "05"},
                    {label:"অন্যান্য কাজ", value : "06"},
                    {label:"কাজ করে না", value : "07"},
                    {label:"প্রযোজ্য নয়", value : "08"}
];



const Level_of_relationship = [
                    {label:"খানা প্রধান", value:"01"},
                    {label:"স্ত্রী বা স্বামী", value:"02"},
                    {label:"ছেলে বা মেয়", value:"03"},
                    {label:"মেয়ের জামাই বা ছেলের বউ", value:"04"},
                    {label:"নাতী বা নাতনী", value:"05"},
                    {label:"বাবা / মা", value:"06"},
                    {label:"শ্বশুর / শাশুড়ি", value:"07"},
                    {label:"ভাই / বোন", value:"08"},
                    {label:"অন্যান্য আত্মীয় স্বজন", value:"09"},
                    {label:"পালিত সন্তান/ সৎসন্তান", value:"10"},
                    {label:"কোন সম্পর্ক নাই", value:"11"}
];



  
  const [SelectedFather, setSelectedFather] = useState({
    FatherName:"",
    FatherMPID:""
  });

  const [SelectedMother, setSelectedMother] = useState({
    MotherName:"",
    MotherMPID:""
  });

  const [SelectedSpouse, setSelectedSpouse] = useState({
    SpouseName:"",
    SpouseMPID:""
  });

  const[Education, SetEducation] = useState("");
  const[Occupation, SetOccupation] = useState("");
  const[Relatioship, SetRelatioship] = useState("");


  const [ShowWriteFatherName, SetShowWriteFatherName] = useState(false);
  const [ShowWriteMotherName, SetShowWriteMotherName] = useState(false);
  const [ShowWriteSpouseName, SetShowWriteSpouseName] = useState(false);

  // const [WriteFatherName, setWriteFatherName] = useState("");
  // const [WriteMotherName, setWriteMotherName] = useState("");
  // const [WriteSpouseName, setWriteSpouseName] = useState("");
  

  const[DOB_Documents_available, SetDOB_Documents_available]=useState({
    radio_1:"no",
    radio_2:"no",
    value:""
  });

  const[MemberGender, SetMemberGender]=useState({
    radio_1:"no",
    radio_2:"no",
    value:""
  });



  const[BloodPressureMeasured, SetBloodPressureMeasured]=useState({
    radio_1:"no",
    radio_2:"no",
    value:""
  });


  const[BloodPressureNotMeasured, SetBloodPressureNotMeasured]=useState({
    radio_1:"no",
    radio_2:"no",
    radio_3:"no",
    value:""
  });

  const[BloodPressureimbalance, SetBloodPressureimbalance]=useState({
    radio_1:"no",
    radio_2:"no",
    value:""
  });

  const[BloodPressureimbalance_reffered, SetBloodPressureimbalance_reffered]=useState();

  const[member_type, SetMember_type] = useState({
    radio_1:"no",
    radio_2:"no",
    radio_3:"no",
    radio_4:"no",
    radio_5:"no",
    value:""
  })


  const[Guest_Entry_Date, SetGuest_Entry_Date] = useState("");

  

  const[Guest_Entry_Date_check, SetGuest_Entry_Date_check] = useState("");
  const[Guest_Entry_Date_Open, SetGuest_Entry_Date_Open] = useState(false);

  const[DOB_Documents_available_show, SetDOB_Documents_available_show] = useState(false);
  
  const[BC_DT_Open, SetBC_DT_Open] = useState(false);
  const[BC_Date, SetBC_Date] = useState("");
  const[BC_Date_check, SetBC_Date_check] = useState("");
  const[BC_Ceritificate_show, SetBC_Ceritificate_show]=useState(false);
  const[BC_Date_Verified_show, SetBC_Date_Verified_show]=useState(false);
  const[BC, set_BC]=useState({radio_1:"no", value:""})
  const[BC_Certificate_Available, SetBC_Certificate_Available]=useState({radio_1:"no", value:""})

  const[NID_DT_Open, SetNID_DT_Open] = useState(false);
  const[NID_Date, SetNID_Date] = useState("");
  const[NID_Date_check, SetNID_Date_check] = useState("");
  const[NID_Ceritificate_show, SetNID_Ceritificate_show]=useState(false);
  const[NID_Date_Verified_show, SetNID_Date_Verified_show]=useState(false);
  const[NID, set_NID]=useState({radio_1:"no", value:""})
  const[NID_Certificate_Available, SetNID_Certificate_Available]=useState({radio_1:"no", value:""})


  const[VC_DT_Open, SetVC_DT_Open] = useState(false);
  const[VC_Date, SetVC_Date] = useState("");
  const[VC_Date_check, SetVC_Date_check] = useState("");
  const[VC_Ceritificate_show, SetVC_Ceritificate_show]=useState(false);
  const[VC_Date_Verified_show, SetVC_Date_Verified_show]=useState(false);
  const[VC, set_VC]=useState({radio_1:"no", value:""})
  const[VC_Certificate_Available, SetVC_Certificate_Available]=useState({radio_1:"no", value:""})


  const[OD_DT_Open, SetOD_DT_Open] = useState(false);
  const[OD_Date, SetOD_Date] = useState("");
  const[OD_Date_check, SetOD_Date_check] = useState("");
  const[OD_Ceritificate_show, SetOD_Ceritificate_show]=useState(false);
  const[OD_Date_Verified_show, SetOD_Date_Verified_show]=useState(false);
  const[OD, set_OD]=useState({radio_1:"no", value:""})
  const[OD_Certificate_Available, SetOD_Certificate_Available]=useState({radio_1:"no", value:""})

  const[General_DT_Open, SetGeneral_DT_Open] = useState(false);
  const[General_DOB_Date, SetGeneral_DOB_Date] = useState("");
  const[General_DOB_Date_check, SetGeneral_DOB_Date_check] = useState("");
  const[General_Age_entry, SetGeneral_Age_entry] = useState("");

  const[General_dob_Question_show, SetGeneral_dob_Question_show]=useState(false);
  const[General_DOB_show, SetGeneral_DOB_show]=useState(false);
  const[General_age_show, SetGeneral_age_show]=useState(false);
  const[General_DOB_Question_answer, SetGeneral_DOB_Question_answer]=useState({
    radio_1:"no",
    radio_2:"no",
    value:""
  })


  const[MaritalStatus, SetMaritalStatus]=useState({
    radio_1:"no",
    radio_2:"no",
    radio_3:"no",
    radio_4:"no",
    value:""
  })


  const[blood_pressure_count, SetBlood_pressure_count] = useState({
    systolic:"",
    diastolic:""
  })

  const Gen_Dob_question=(clicked)=>{
  
    if(clicked==="yes" && (General_DOB_Question_answer.value==="" || General_DOB_Question_answer.value==="2")){
      SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, radio_1:"yes"}))
      SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, radio_2:"no"}))
      SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, value:"1"}))  
      SetGeneral_DOB_show(true);
      SetGeneral_age_show(false);
      SetGeneral_Age_entry("");


    }
    else if(clicked==="no" && (General_DOB_Question_answer.value==="" || General_DOB_Question_answer.value==="1")){
      SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, radio_1:"no"}))
      SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, radio_2:"yes"}))
      SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, value:"2"}))
      SetGeneral_DOB_show(false);
      SetGeneral_age_show(true);
      SetGeneral_DOB_Date("");
      SetGeneral_DOB_Date_check("");
    }
  
  }



  const member_gender=(clicked)=>{
      if(clicked==="yes"){
        SetMemberGender((MemberGender)=>({...MemberGender, radio_1:"yes"}))
        SetMemberGender((MemberGender)=>({...MemberGender, radio_2:"no"}))
        SetMemberGender((MemberGender)=>({...MemberGender, value:"1"}))
        SetShowWriteSpouseName(false);
        // setWriteSpouseName("");
        
      }else if(clicked==="no"){
        SetMemberGender((MemberGender)=>({...MemberGender, radio_1:"no"}))
        SetMemberGender((MemberGender)=>({...MemberGender, radio_2:"yes"}))
        SetMemberGender((MemberGender)=>({...MemberGender, value:"2"}))
        SetShowWriteSpouseName(false);
        // setWriteSpouseName("");
      }
      else{
        //do nothig
      }
  }



  const set_marital_status=(clicked)=>{
    if(clicked==="1"){
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_1:"yes"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_2:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_3:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_4:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, value:"1"}))
    }
    else if(clicked==="2"){
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_1:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_2:"yes"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_3:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_4:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, value:"2"}))            
    }
    else if(clicked==="3"){
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_1:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_2:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_3:"yes"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_4:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, value:"3"}))            
    }
    else if(clicked==="4"){
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_1:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_2:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_3:"no"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, radio_4:"yes"}))
      SetMaritalStatus((MaritalStatus)=>({...MaritalStatus, value:"4"}))            
    }
    else{
      //do nothig
    }
}








  const blood_pressure_measured=(clicked)=>{
    if(clicked==="yes"){
      SetBloodPressureMeasured((BloodPressureMeasured)=>({...BloodPressureMeasured, radio_1:"yes"}))
      SetBloodPressureMeasured((BloodPressureMeasured)=>({...BloodPressureMeasured, radio_2:"no"}))
      SetBloodPressureMeasured((BloodPressureMeasured)=>({...BloodPressureMeasured, value:"1"}))
        
      SetBlood_pressure_count_container(true);
      SetBlood_pressure_not_given(false);      
      SetBloodPressureNotMeasured({radio_1:"no"});
      SetBloodPressureNotMeasured({radio_2:"no"});
      SetBloodPressureNotMeasured({radio_3:"no"});
      SetBloodPressureNotMeasured({value:""});

      

    }else if(clicked==="no"){
      SetBloodPressureMeasured((BloodPressureMeasured)=>({...BloodPressureMeasured, radio_1:"no"}))
      SetBloodPressureMeasured((BloodPressureMeasured)=>({...BloodPressureMeasured, radio_2:"yes"}))
      SetBloodPressureMeasured((BloodPressureMeasured)=>({...BloodPressureMeasured, value:"2"}))      
      SetBlood_pressure_not_given(true);
      
      SetBlood_pressure_count_container(false);
      // SetBlood_pressure_count({systolic:""});
      // SetBlood_pressure_count({diastolic:""});
      SetBlood_pressure_count((blood_pressure_count)=>({...blood_pressure_count, systolic:""}))
      SetBlood_pressure_count((blood_pressure_count)=>({...blood_pressure_count, diastolic:""}))
      SetBlood_pressure_referral(false);
      SetBloodPressureimbalance({radio_1:"no"})
      SetBloodPressureimbalance({radio_2:"no"})
      SetBloodPressureimbalance({value:""})
      

      
    }
    else{
      //do nothig
    }
}




const blood_pressure_imbalance=(clicked)=>{
  if(clicked==="yes"){
    SetBloodPressureimbalance((BloodPressureimbalance)=>({...BloodPressureimbalance, radio_1:"yes"}))
    SetBloodPressureimbalance((BloodPressureimbalance)=>({...BloodPressureimbalance, radio_2:"no"}))
    SetBloodPressureimbalance((BloodPressureimbalance)=>({...BloodPressureimbalance, value:"1"}))

  }else if(clicked==="no"){
    SetBloodPressureimbalance((BloodPressureimbalance)=>({...BloodPressureimbalance, radio_1:"no"}))
    SetBloodPressureimbalance((BloodPressureimbalance)=>({...BloodPressureimbalance, radio_2:"yes"}))
    SetBloodPressureimbalance((BloodPressureimbalance)=>({...BloodPressureimbalance, value:"2"}))
  }
  else{
    SetBloodPressureimbalance((BloodPressureimbalance)=>({...BloodPressureimbalance, radio_1:"no"}))
    SetBloodPressureimbalance((BloodPressureimbalance)=>({...BloodPressureimbalance, radio_2:"no"}))
    SetBloodPressureimbalance((BloodPressureimbalance)=>({...BloodPressureimbalance, value:""}))
  }
}



const blood_pressure_not_measured=(clicked)=>{
  if(clicked==="yes"){
    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, radio_1:"yes"}))
    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, radio_2:"no"}))
    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, radio_3:"no"}))
    
    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, value:"1"}))

  }else if(clicked==="no"){
    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, radio_1:"no"}))
    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, radio_2:"yes"}))
    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, radio_3:"no"}))

    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, value:"2"}))
  }
  else if(clicked==="nk"){
    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, radio_1:"no"}))
    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, radio_2:"no"}))
    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, radio_3:"yes"}))

    SetBloodPressureNotMeasured((BloodPressureNotMeasured)=>({...BloodPressureNotMeasured, value:"3"}))
  }

  else{
    //do nothig
  }
}






  const DOB_Docs=(clicked)=>{
    if(clicked==="yes"){
      SetDOB_Documents_available((DOB_Documents_available)=>({...DOB_Documents_available, radio_1:"yes"}))
      SetDOB_Documents_available((DOB_Documents_available)=>({...DOB_Documents_available, radio_2:"no"}))
      SetDOB_Documents_available((DOB_Documents_available)=>({...DOB_Documents_available, value:"1"}))
      SetDOB_Documents_available_show(true);      
      SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, radio_1:"no"}))
      SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, radio_2:"no"}))
      SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, value:""}))
      SetGeneral_dob_Question_show(true);
      SetGeneral_DOB_show(false);
      SetGeneral_age_show(false);
      SetGeneral_Age_entry("");
      SetGeneral_DOB_Date("");
      SetGeneral_DOB_Date_check("");




      SetOD_Certificate_Available((OD_Certificate_Available)=>({...OD_Certificate_Available, radio_1:"no"}))
      SetOD_Certificate_Available((OD_Certificate_Available)=>({...OD_Certificate_Available, value:"2"}))
      set_OD((OD)=>({...OD, radio_1:"no"}))
      set_OD((OD)=>({...OD, value:"2"}))

      SetBC_Certificate_Available((BC_Certificate_Available)=>({...BC_Certificate_Available, radio_1:"no"}))
      SetBC_Certificate_Available((BC_Certificate_Available)=>({...BC_Certificate_Available, value:"2"}))
      set_BC((BC)=>({...BC, radio_1:"no"}))
      set_BC((BC)=>({...BC, value:"2"}))

      SetVC_Certificate_Available((VC_Certificate_Available)=>({...VC_Certificate_Available, radio_1:"no"}))
      SetVC_Certificate_Available((VC_Certificate_Available)=>({...VC_Certificate_Available, value:"2"}))
      set_VC((VC)=>({...VC, radio_1:"no"}))
      set_VC((VC)=>({...VC, value:"2"}))


      SetNID_Certificate_Available((NID_Certificate_Available)=>({...NID_Certificate_Available, radio_1:"no"}))
      SetNID_Certificate_Available((NID_Certificate_Available)=>({...NID_Certificate_Available, value:"2"}))
      set_NID((NID)=>({...NID, radio_1:"no"}))
      set_NID((NID)=>({...NID, value:"2"}))


      

    }
    else if(clicked==="no"){
      SetGeneral_dob_Question_show(true);
      SetDOB_Documents_available((DOB_Documents_available)=>({...DOB_Documents_available, radio_1:"no"}))
      SetDOB_Documents_available((DOB_Documents_available)=>({...DOB_Documents_available, radio_2:"yes"}))
      SetDOB_Documents_available((DOB_Documents_available)=>({...DOB_Documents_available, value:"2"}))
      SetDOB_Documents_available_show(false);

      SetOD_Certificate_Available((OD_Certificate_Available)=>({...OD_Certificate_Available, radio_1:"no"}))
      SetOD_Certificate_Available((OD_Certificate_Available)=>({...OD_Certificate_Available, value:""}))
      SetOD_Date_Verified_show(false);
      SetOD_Date("");
      SetOD_Date_check(""); 
      SetOD_Ceritificate_show(false);        
      set_OD((OD)=>({...OD, radio_1:"no"}))
      set_OD((OD)=>({...OD, value:""}))

      SetBC_Certificate_Available((BC_Certificate_Available)=>({...BC_Certificate_Available, radio_1:"no"}))
      SetBC_Certificate_Available((BC_Certificate_Available)=>({...BC_Certificate_Available, value:""}))
      SetBC_Date_Verified_show(false);
      SetBC_Date("");
      SetBC_Date_check(""); 
      SetBC_Ceritificate_show(false);        
      set_BC((BC)=>({...BC, radio_1:"no"}))
      set_BC((BC)=>({...BC, value:""}))

      SetVC_Certificate_Available((VC_Certificate_Available)=>({...VC_Certificate_Available, radio_1:"no"}))
      SetVC_Certificate_Available((VC_Certificate_Available)=>({...VC_Certificate_Available, value:""}))
      SetVC_Date_Verified_show(false);
      SetVC_Date("");
      SetVC_Date_check(""); 
      SetVC_Ceritificate_show(false);        
      set_VC((VC)=>({...VC, radio_1:"no"}))
      set_VC((VC)=>({...VC, value:""}))


      SetNID_Certificate_Available((NID_Certificate_Available)=>({...NID_Certificate_Available, radio_1:"no"}))
      SetNID_Certificate_Available((NID_Certificate_Available)=>({...NID_Certificate_Available, value:""}))
      SetNID_Date_Verified_show(false);
      SetNID_Date("");
      SetNID_Date_check("");
      SetNID_Ceritificate_show(false);        
      set_NID((NID)=>({...NID, radio_1:"no"}))
      set_NID((NID)=>({...NID, value:""}))


    }
    else{
      SetDOB_Documents_available((DOB_Documents_available)=>({...DOB_Documents_available, radio_1:"no"}))
      SetDOB_Documents_available((DOB_Documents_available)=>({...DOB_Documents_available, radio_2:"no"}))
      SetDOB_Documents_available((DOB_Documents_available)=>({...DOB_Documents_available, value:""}))
      SetDOB_Documents_available_show(false);
    }
    
    

  }






  
const BC_question=(clicked)=>{
  
  if(clicked==="yes" && (BC.value==="" || BC.value==="2")){
    set_BC((BC)=>({...BC, radio_1:"yes"}))
    set_BC((BC)=>({...BC, value:"1"}))
    SetBC_Ceritificate_show(true);

  }
  else if(clicked==="yes" && BC.value==="1"){
    set_BC((BC)=>({...BC, radio_1:"no"}))
    set_BC((BC)=>({...BC, value:"2"}))
    SetBC_Ceritificate_show(false);
    SetBC_Date_Verified_show(false);
    SetBC_Date("");
    SetBC_Date_check("");
    SetBC_Certificate_Available((BC_Certificate_Available)=>({...BC_Certificate_Available, radio_1:"no"}))
    SetBC_Certificate_Available((BC_Certificate_Available)=>({...BC_Certificate_Available, value:"2"}))
    
    
  }

}



const BC_certificate=(clicked)=>{  
  
  if(clicked==="yes" && BC.value==="1" && (BC_Certificate_Available.value==="2" || BC_Certificate_Available.value==="")){
    SetBC_Certificate_Available((BC_Certificate_Available)=>({...BC_Certificate_Available, radio_1:"yes"}))
    SetBC_Certificate_Available((BC_Certificate_Available)=>({...BC_Certificate_Available, value:"1"}))
    SetBC_Date_Verified_show(true);
    
  }
  else if(clicked==="yes" && BC_Certificate_Available.value==="1" && (BC.value==="1" || BC.value==="2")){
    SetBC_Certificate_Available((BC_Certificate_Available)=>({...BC_Certificate_Available, radio_1:"no"}))
    SetBC_Certificate_Available((BC_Certificate_Available)=>({...BC_Certificate_Available, value:"2"}))
    SetBC_Date_Verified_show(false);
    SetBC_Date("");
    SetBC_Date_check("");

    
  }
  
  
  
  
}





const guest_entry_date_checker=()=>{

  if(Guest_Entry_Date!="" && Guest_Entry_Date_check!=""){
    SetGuest_Entry_Date("");
    SetGuest_Entry_Date_check(""); 
    SetGuest_Entry_Date_Open(true);    
    
   }
  else if(Guest_Entry_Date=="" && Guest_Entry_Date_check==""){
 SetGuest_Entry_Date_Open(true);    

}
else if(Guest_Entry_Date!="" && Guest_Entry_Date_check==""){
  Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আর নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetGuest_Entry_Date_Open(true)}}])

}
else{
  // do nothing

}

}







const BC_date_checker=()=>{

  if(BC_Date!="" && BC_Date_check!=""){
    SetBC_Date("");
    SetBC_Date_check(""); 
    SetBC_DT_Open(true);        
   }
  else if(BC_Date=="" && BC_Date_check==""){
  SetBC_DT_Open(true);      
  }
  else if(BC_Date!="" && BC_Date_check==""){
  Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetBC_DT_Open(true)}}])  
  }
  else{
  // do nothing
  }
}


const BC_Date_onConfirm=(BC_Date_confirmed)=>{
  
  if(BC_Date_check=="" && BC_Date==""){
    SetBC_Date_check(moment(BC_Date_confirmed).format("MMM DD, YYYY"))    
    Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetBC_DT_Open(true)}}])
  }
  else if(BC_Date_check!=="" && BC_Date=="" && BC_Date_check!=(moment(BC_Date_confirmed).format("MMM DD, YYYY"))){    
    Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+BC_Date_check+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(BC_Date_confirmed).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{SetBC_DT_Open(true)}}])    
    SetBC_Date("");
    SetBC_Date_check(""); 
  }else{
    SetBC_Date(moment(BC_Date_confirmed).format("MMM DD, YYYY"))     
  }
}




const Guest_entry_Date_onConfirm=(Guest_Date_confirmed)=>{
  
  if(Guest_Entry_Date_check=="" && Guest_Entry_Date==""){
    SetGuest_Entry_Date_check(moment(Guest_Date_confirmed).format("MMM DD, YYYY"))    
    Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetGuest_Entry_Date_Open(true)}}])
  }
  else if(Guest_Entry_Date_check!=="" && BC_Date=="" && Guest_Entry_Date_check!=(moment(Guest_Date_confirmed).format("MMM DD, YYYY"))){    
    Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+Guest_Entry_Date_check+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(Guest_Date_confirmed).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{SetGuest_Entry_Date_Open(true)}}])    
    SetGuest_Entry_Date("");
    SetGuest_Entry_Date_check(""); 
  }else{
    SetGuest_Entry_Date(moment(Guest_Date_confirmed).format("MMM DD, YYYY"))     
  }
}











const NID_date_checker=()=>{
  if(NID_Date!="" && NID_Date_check!=""){
    SetNID_Date("");
    SetNID_Date_check(""); 
    SetNID_DT_Open(true);    
   }
  else if(NID_Date=="" && NID_Date_check==""){
 SetNID_DT_Open(true);    
}
else if(NID_Date!="" && NID_Date_check==""){
  Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetNID_DT_Open(true)}}])
}
else{
  // do nothing
}

}


const NID_Date_onConfirm=(NID_Date_confirmed)=>{
  
  if(NID_Date_check=="" && NID_Date==""){
    SetNID_Date_check(moment(NID_Date_confirmed).format("MMM DD, YYYY"))    
    Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetNID_DT_Open(true)}}])
  }
  else if(NID_Date_check!=="" && NID_Date=="" && NID_Date_check!=(moment(NID_Date_confirmed).format("MMM DD, YYYY"))){    
    Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+NID_Date_check+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(NID_Date_confirmed).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{SetNID_DT_Open(true)}}])    
    SetNID_Date("");
    SetNID_Date_check(""); 
  }else{
    SetNID_Date(moment(NID_Date_confirmed).format("MMM DD, YYYY")) 
    
  }
  
}





const VC_date_checker=()=>{
  if(VC_Date!="" && VC_Date_check!=""){
    SetVC_Date("");
    SetVC_Date_check(""); 
    SetVC_DT_Open(true);    
   }
  else if(VC_Date=="" && VC_Date_check==""){
 SetVC_DT_Open(true);    
}
else if(VC_Date!="" && VC_Date_check==""){
  Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetVC_DT_Open(true)}}])
}
else{
  // do nothing
}

}


const VC_Date_onConfirm=(VC_Date_confirmed)=>{
  
  if(VC_Date_check=="" && VC_Date==""){
    SetVC_Date_check(moment(VC_Date_confirmed).format("MMM DD, YYYY"))    
    Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetVC_DT_Open(true)}}])
  }
  else if(VC_Date_check!=="" && VC_Date=="" && VC_Date_check!=(moment(VC_Date_confirmed).format("MMM DD, YYYY"))){    
    Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+VC_Date_check+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(VC_Date_confirmed).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{SetVC_DT_Open(true)}}])    
    SetVC_Date("");
    SetVC_Date_check(""); 
  }else{
    SetVC_Date(moment(VC_Date_confirmed).format("MMM DD, YYYY")) 
    
  }
  
}





const OD_date_checker=()=>{
  if(OD_Date!="" && OD_Date_check!=""){
    SetOD_Date("");
    SetOD_Date_check(""); 
    SetOD_DT_Open(true);    
   }
  else if(OD_Date=="" && OD_Date_check==""){
 SetOD_DT_Open(true);    
}
else if(OD_Date!="" && OD_Date_check==""){
  Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetOD_DT_Open(true)}}])
}
else{
  // do nothing
}

}


const OD_Date_onConfirm=(OD_Date_confirmed)=>{
  
  if(OD_Date_check=="" && OD_Date==""){
    SetOD_Date_check(moment(OD_Date_confirmed).format("MMM DD, YYYY"))    
    Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetOD_DT_Open(true)}}])
  }
  else if(OD_Date_check!=="" && OD_Date=="" && OD_Date_check!=(moment(OD_Date_confirmed).format("MMM DD, YYYY"))){    
    Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+OD_Date_check+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(OD_Date_confirmed).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{SetOD_DT_Open(true)}}])    
    SetOD_Date("");
    SetOD_Date_check(""); 
  }else{
    SetOD_Date(moment(OD_Date_confirmed).format("MMM DD, YYYY")) 
    
  }
  
}






const General_date_checker=()=>{
  if(General_DOB_Date!="" && General_DOB_Date_check!=""){
    SetGeneral_DOB_Date("");
    SetGeneral_DOB_Date_check("");
    SetGeneral_DT_Open(true);    
   }
  else if(General_DOB_Date=="" && General_DOB_Date_check==""){
    SetGeneral_DT_Open(true);    
}
else if(General_DOB_Date!="" && General_DOB_Date_check==""){
  Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetGeneral_DT_Open(true)}}])
}
else{
  // do nothing
}

}



const General_Date_onConfirm=(General_Date_confirmed)=>{
  
  if(General_DOB_Date_check=="" && General_DOB_Date==""){
    SetGeneral_DOB_Date_check(moment(General_Date_confirmed).format("MMM DD, YYYY"))    
    Alert.alert("পুনরায় এন্ট্রি করুন","অনুগ্রহ করে নির্বাচিত তারিখটি আবার নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>{SetGeneral_DT_Open(true)}}])
  }
  else if(General_DOB_Date_check!=="" && General_DOB_Date=="" && General_DOB_Date_check!=(moment(General_Date_confirmed).format("MMM DD, YYYY"))){    
    Alert.alert("এন্ট্রি ভুল","আপনি প্রথম এন্ট্রিতে "+General_DOB_Date_check+" তারিখ এবং দ্বিতীয় এন্ট্রিতে "+(moment(General_Date_confirmed).format("MMM DD, YYYY"))+" তারিখ দিয়েছেন। পার্থক্য থাকার কারনে, আপনাকে পুনরায় এন্ট্রি করতে হবে।",[{text:"ঠিক আছে", onPress:()=>{SetGeneral_DT_Open(true)}}])    
    SetGeneral_DOB_Date("");
    SetGeneral_DOB_Date_check(""); 
  }else{
    SetGeneral_DOB_Date(moment(General_Date_confirmed).format("MMM DD, YYYY")) 
    
  }
  
}










const hide_general_dob_information=()=>{  
if(BC_Certificate_Available.value==="1" || NID_Certificate_Available.value==="1" || VC_Certificate_Available.value==="1" || OD_Certificate_Available.value==="1"){  
  SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, radio_1:"no"}))
  SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, radio_2:"no"}))
  SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, value:""}))  

    SetGeneral_dob_Question_show(false);
    SetGeneral_DOB_show(false);
    SetGeneral_age_show(false);
    SetGeneral_Age_entry("");
    SetGeneral_DOB_Date("");
    SetGeneral_DOB_Date_check("");

  }
  else if(
    DOB_Documents_available.value==="2" ||
    (BC_Certificate_Available.value==="2" && 
    NID_Certificate_Available.value==="2" && 
    VC_Certificate_Available.value==="2" && 
    OD_Certificate_Available.value==="2")
  ){
    SetGeneral_dob_Question_show(true);
  }
  else{
    SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, radio_1:"no"}))
  SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, radio_2:"no"}))
  SetGeneral_DOB_Question_answer((General_DOB_Question_answer)=>({...General_DOB_Question_answer, value:""}))  
    SetGeneral_dob_Question_show(false);
    SetGeneral_DOB_show(false);
    SetGeneral_age_show(false);
    SetGeneral_Age_entry("");
    SetGeneral_DOB_Date("");
    SetGeneral_DOB_Date_check("");
  }
  
}






const NID_question=(clicked)=>{
  
  if(clicked==="yes" && (NID.value==="" || NID.value==="2")){
    set_NID((NID)=>({...NID, radio_1:"yes"}))
    set_NID((NID)=>({...NID, value:"1"}))
    SetNID_Ceritificate_show(true);

  }
  else if(clicked==="yes" && NID.value==="1"){
    set_NID((NID)=>({...NID, radio_1:"no"}))
    set_NID((NID)=>({...NID, value:"2"}))
    SetNID_Ceritificate_show(false);
    SetNID_Date_Verified_show(false);
    SetNID_Date("");
    SetNID_Date_check("");
    SetNID_Certificate_Available((NID_Certificate_Available)=>({...NID_Certificate_Available, radio_1:"no"}))
    SetNID_Certificate_Available((NID_Certificate_Available)=>({...NID_Certificate_Available, value:"2"}))
    
  }

}

const NID_certificate=(clicked)=>{
  if(clicked==="yes" && NID.value==="1" && (NID_Certificate_Available.value==="2" || NID_Certificate_Available.value==="")){
    SetNID_Certificate_Available((NID_Certificate_Available)=>({...NID_Certificate_Available, radio_1:"yes"}))
    SetNID_Certificate_Available((NID_Certificate_Available)=>({...NID_Certificate_Available, value:"1"}))
    SetNID_Date_Verified_show(true);

  }
  else if(clicked==="yes" && NID_Certificate_Available.value==="1" && (NID.value==="1" || NID.value==="2")){
    SetNID_Certificate_Available((NID_Certificate_Available)=>({...NID_Certificate_Available, radio_1:"no"}))
    SetNID_Certificate_Available((NID_Certificate_Available)=>({...NID_Certificate_Available, value:"2"}))
    SetNID_Date_Verified_show(false);
    SetNID_Date("");
    SetNID_Date_check("");
    
  }

}




const VC_question=(clicked)=>{
  
  if(clicked==="yes" && (VC.value==="" || VC.value==="2")){
    set_VC((VC)=>({...VC, radio_1:"yes"}))
    set_VC((VC)=>({...VC, value:"1"}))
    SetVC_Ceritificate_show(true);

  }
  else if(clicked==="yes" && VC.value==="1"){
    set_VC((VC)=>({...VC, radio_1:"no"}))
    set_VC((VC)=>({...VC, value:"2"}))
    SetVC_Ceritificate_show(false);
    SetVC_Date_Verified_show(false);
    SetVC_Date("");
    SetVC_Date_check("");
    SetVC_Certificate_Available((VC_Certificate_Available)=>({...VC_Certificate_Available, radio_1:"no"}))
    SetVC_Certificate_Available((VC_Certificate_Available)=>({...VC_Certificate_Available, value:"2"}))
    
  }

}

const VC_certificate=(clicked)=>{
  if(clicked==="yes" && VC.value==="1" && (VC_Certificate_Available.value==="2" || VC_Certificate_Available.value==="")){
    SetVC_Certificate_Available((VC_Certificate_Available)=>({...VC_Certificate_Available, radio_1:"yes"}))
    SetVC_Certificate_Available((VC_Certificate_Available)=>({...VC_Certificate_Available, value:"1"}))
    SetVC_Date_Verified_show(true);

  }
  else if(clicked==="yes" && VC_Certificate_Available.value==="1" && (VC.value==="1" || VC.value==="2")){
    SetVC_Certificate_Available((VC_Certificate_Available)=>({...VC_Certificate_Available, radio_1:"no"}))
    SetVC_Certificate_Available((VC_Certificate_Available)=>({...VC_Certificate_Available, value:"2"}))
    SetVC_Date_Verified_show(false);
    SetVC_Date("");
    SetVC_Date_check("");
    
  }

}





const OD_question=(clicked)=>{
  
  if(clicked==="yes" && (OD.value==="" || OD.value==="2")){
    set_OD((OD)=>({...OD, radio_1:"yes"}))
    set_OD((OD)=>({...OD, value:"1"}))
    SetOD_Ceritificate_show(true);

  }
  else if(clicked==="yes" && OD.value==="1"){
    set_OD((OD)=>({...OD, radio_1:"no"}))
    set_OD((OD)=>({...OD, value:"2"}))
    SetOD_Ceritificate_show(false);
    SetOD_Date_Verified_show(false);
    SetOD_Date("");
    SetOD_Date_check("");
    SetOD_Certificate_Available((OD_Certificate_Available)=>({...OD_Certificate_Available, radio_1:"no"}))
    SetOD_Certificate_Available((OD_Certificate_Available)=>({...OD_Certificate_Available, value:"2"}))
    
  }

}

const OD_certificate=(clicked)=>{
  if(clicked==="yes" && OD.value==="1" && (OD_Certificate_Available.value==="2" || OD_Certificate_Available.value==="")){
    SetOD_Certificate_Available((OD_Certificate_Available)=>({...OD_Certificate_Available, radio_1:"yes"}))
    SetOD_Certificate_Available((OD_Certificate_Available)=>({...OD_Certificate_Available, value:"1"}))
    SetOD_Date_Verified_show(true);

  }
  else if(clicked==="yes" && OD_Certificate_Available.value==="1" && (OD.value==="1" || OD.value==="2")){
    SetOD_Certificate_Available((OD_Certificate_Available)=>({...OD_Certificate_Available, radio_1:"no"}))
    SetOD_Certificate_Available((OD_Certificate_Available)=>({...OD_Certificate_Available, value:"2"}))
    SetOD_Date_Verified_show(false);
    SetOD_Date("");
    SetOD_Date_check("");
    
  }

}



const show_FatherName_Field=()=>{
  if(SelectedFather.FatherMPID==="99999999999"){
    SetShowWriteFatherName(true);
    

  }else{
    SetShowWriteFatherName(false);
    // setWriteFatherName("");
  }
}


const show_MotherName_Field=()=>{
  if(SelectedMother.MotherMPID==="99999999999"){
    SetShowWriteMotherName(true);
    

  }else{
    SetShowWriteMotherName(false);
    // setWriteMotherName("");
  }
}


const show_SpouseName_Field=()=>{
  if(SelectedSpouse.SpouseMPID==="99999999999"){
    SetShowWriteSpouseName(true);
    

  }else{
    SetShowWriteSpouseName(false);
    // setWriteSpouseName("");
  }
}


useEffect(()=>{show_FatherName_Field()},[SelectedFather]);
useEffect(()=>{show_MotherName_Field()},[SelectedMother]);
useEffect(()=>{show_SpouseName_Field()},[SelectedSpouse]);

useEffect(()=>{get_father_name()},[member_type])
useEffect(()=>{get_mother_name()},[member_type])


useEffect(()=>{hide_general_dob_information()},[BC_Certificate_Available,NID_Certificate_Available, VC_Certificate_Available, OD_Certificate_Available]);
useEffect(()=>{get_spouse_name()},[MemberGender]);

  
const [Full_form, SetFull_form] = useState(false)






const set_member_type=(clicked)=>{
  if(clicked==="2"){
    SetMember_type((member_type)=>({...member_type, radio_1:"yes"}))
    SetMember_type((member_type)=>({...member_type, radio_2:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_3:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_4:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_5:"no"}))
    SetMember_type((member_type)=>({...member_type, value:"2"}))
    SetFull_form(true)
    SetGuest_entry_date_container(false);
    SetGuest_Entry_Date("");
    SetGuest_Entry_Date_check("");
    setMember_list_visible(false);


  }else if(clicked==="5"){
    SetMember_type((member_type)=>({...member_type, radio_1:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_2:"yes"}))
    SetMember_type((member_type)=>({...member_type, radio_3:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_4:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_5:"no"}))
    SetMember_type((member_type)=>({...member_type, value:"5"}))
    SetFull_form(true)
    SetGuest_entry_date_container(false);
    SetGuest_Entry_Date("");
    SetGuest_Entry_Date_check("");
    setMember_list_visible(false);

  }
  else if(clicked==="8"){
    SetMember_type((member_type)=>({...member_type, radio_1:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_2:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_3:"yes"}))
    SetMember_type((member_type)=>({...member_type, radio_4:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_5:"no"}))
    SetMember_type((member_type)=>({...member_type, value:"8"}))
    SetFull_form(true)
    SetGuest_entry_date_container(false);
    SetGuest_Entry_Date("");
    SetGuest_Entry_Date_check("");
    setMember_list_visible(false);

  }
  else if(clicked==="6"){
    SetMember_type((member_type)=>({...member_type, radio_1:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_2:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_3:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_4:"yes"}))
    SetMember_type((member_type)=>({...member_type, radio_5:"no"}))
    SetMember_type((member_type)=>({...member_type, value:"6"}))
    SetGuest_entry_date_container(true);
    SetFull_form(true);    
    setMember_list_visible(false);

  }
  else if(clicked==="9"){
    SetMember_type((member_type)=>({...member_type, radio_1:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_2:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_3:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_4:"no"}))
    SetMember_type((member_type)=>({...member_type, radio_5:"yes"}))
    SetMember_type((member_type)=>({...member_type, value:"9"}))
    SetFull_form(false);
    SetGuest_entry_date_container(false);
    SetGuest_Entry_Date("");
    SetGuest_Entry_Date_check("");
    setMember_list_visible(true);
    

  }
  else{
    // do nothing
  }
}


const[Show_merital_status, SetShow_merital_status] = useState(false);
const[Show_spouse_selection, SetShow_spouse_selection] = useState(false);
const[Blood_pressure_60_up, setBlood_pressure_60_up] = useState(false);
const[Blood_pressure_not_given, SetBlood_pressure_not_given] = useState(false);
const[Blood_pressure_count_container, SetBlood_pressure_count_container] = useState(false);
const[Blood_pressure_referral, SetBlood_pressure_referral] = useState(false);

const[Member_name, SetMember_name] = useState("");
const[MobileNumber, SetMobileNumber] = useState("");


const[Calculated_Age, SetCalculated_Age] = useState("");
const[Final_DOB, SetFinal_DOB] = useState("");

const calculated_age=()=>{  
  if(BC_Certificate_Available.value==="1" && BC_Date!==""){
    SetCalculated_Age(moment().diff(moment(BC_Date,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false));    
    SetFinal_DOB(moment(BC_Date,"MMM DD, YYYY"));
    return false;
  }
  else if(NID_Certificate_Available.value==="1" && NID_Date!==""){
    SetCalculated_Age(moment().diff(moment(NID_Date,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false));    
    SetFinal_DOB(moment(NID_Date,"MMM DD, YYYY"));
    return false;
  }
  else if(VC_Certificate_Available.value==="1" && VC_Date!==""){
    SetCalculated_Age(moment().diff(moment(VC_Date,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false));    
    SetFinal_DOB(moment(VC_Date,"MMM DD, YYYY"));
    return false;
  }
  else if(OD_Certificate_Available.value==="1" && OD_Date!==""){
    SetCalculated_Age(moment().diff(moment(OD_Date,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false));    
    SetFinal_DOB(moment(OD_Date,"MMM DD, YYYY"));
    return false;
  }
  else if(General_DOB_Question_answer.value==="1" && General_DOB_Date!==""){
    SetCalculated_Age(moment().diff(moment(General_DOB_Date,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false));    
    SetFinal_DOB(moment(General_DOB_Date,"MMM DD, YYYY"));
    return false;
  }  
  else{
    SetCalculated_Age(General_Age_entry);
    SetFinal_DOB(moment().subtract(parseInt(General_Age_entry),'years'));
  }


  // Alert.alert(Final_DOB);
  
}

useEffect(()=>{calculated_age()},[BC_Date, NID_Date, VC_Date, OD_Date, General_DOB_Date, General_Age_entry]);



const Show_merital_status_container=()=>{ 
if(parseInt(Calculated_Age)>=13){
  SetShow_merital_status(true); 
}else{
  SetShow_merital_status(false);  
  SetMaritalStatus({radio_1:"no"})
  SetMaritalStatus({radio_2:"no"})
  SetMaritalStatus({radio_3:"no"})
  SetMaritalStatus({radio_4:"no"})
  SetMaritalStatus({value:""})

  SetShow_spouse_selection(false);
  // setSelectedSpouse({SpouseName:""});
  // setSelectedSpouse({SpouseMPID:""});
  setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseMPID:""}))
  setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseName:""}))
 

}
}

useEffect(()=>{Show_merital_status_container()},[Calculated_Age]);




const Show_spouse_selection_container=()=>{
  console.log("s_name_run");
  if(parseInt(Calculated_Age)>=13 && MaritalStatus.value==="1"){
    console.log("s_name");
    SetShow_spouse_selection(true);    
    // setSelectedSpouse({SpouseName:""});
    // setSelectedSpouse({SpouseMPID:""});
    setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseMPID:""}))
    setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseName:""}))
  }else{  
    console.log("s_name_no");
  SetShow_spouse_selection(false);
  // setSelectedSpouse({SpouseName:""});
  // setSelectedSpouse({SpouseMPID:""});
  setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseMPID:""}))
  setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseName:""}))
  }
}

useEffect(()=>{Show_spouse_selection_container()},[MaritalStatus, MemberGender])


const Blood_pressure_60_up_container=()=>{
  if(parseInt(Calculated_Age)>=60){
    setBlood_pressure_60_up(true);
}else{
  setBlood_pressure_60_up(false);
  SetBloodPressureMeasured({radio_1:"no"});
  SetBloodPressureMeasured({radio_2:"no"});
  SetBloodPressureMeasured({value:""});

  SetBlood_pressure_not_given(false);
  SetBloodPressureNotMeasured({radio_1:"no"});
  SetBloodPressureNotMeasured({radio_2:"no"});
  SetBloodPressureNotMeasured({radio_3:"no"});
  SetBloodPressureNotMeasured({value:""});

  SetBlood_pressure_count_container(false);
  // SetBlood_pressure_count({systolic:""});
  // SetBlood_pressure_count({diastolic:""});
  SetBlood_pressure_count((blood_pressure_count)=>({...blood_pressure_count, systolic:""}))
  SetBlood_pressure_count((blood_pressure_count)=>({...blood_pressure_count, diastolic:""}))
  
  SetBlood_pressure_referral(false);
  SetBloodPressureimbalance({radio_1:""});
  SetBloodPressureimbalance({radio_2:""});
  SetBloodPressureimbalance({value:""});  
}
}


useEffect(()=>{Blood_pressure_60_up_container()},[Calculated_Age])



// if(document.getElementById("New_Member_Dias").value>=90 || document.getElementById("New_Member_Syst").value>=140){


const check_pressure=()=>{
  if(parseInt(blood_pressure_count.systolic)>=140 || parseInt(blood_pressure_count.diastolic)>=90){
    SetBlood_pressure_referral(true);
    SetBloodPressureimbalance_reffered("1");
  }else{
    SetBlood_pressure_referral(false);
    SetBloodPressureimbalance({radio_1:"no"});
    SetBloodPressureimbalance({radio_1:"no"});
    SetBloodPressureimbalance({value:""});
    SetBloodPressureimbalance_reffered("");
  }
}

useEffect(()=>{check_pressure()},[blood_pressure_count]);


const[Guest_entry_date_container, SetGuest_entry_date_container] = useState(false);



const check_before_save=()=>{
  if(member_type.value===""){
    Alert.alert("সদস্য নিবন্ধনের ধরন","খানায় সদস্যের সঠিক ধরন নির্বাচন করুন");
  }
  else if(member_type.value==="6" && Guest_Entry_Date===""){
    Alert.alert("অতিথি অবস্থানের তারিখ","নিবন্ধনের ধরন অতিথি হিসাবে নির্বাচন করার কারনে, একটি অবস্থানের তারিখ নির্বাচন করুন।",[{text:"ঠিক আছে"}]);
  }  
  else if(member_type.value==="6" && Guest_Entry_Date!="" && (moment().diff(moment(Guest_Entry_Date,"MMM DD, YYYY").format("YYYY-MM-DD"),"months",false))>=6){
    Alert.alert("অতিথি অবস্থানের তারিখ","অবস্থানের তারিখ অনুযায়ী এই সদস্য "+(moment().diff(moment(Guest_Entry_Date,"MMM DD, YYYY").format("YYYY-MM-DD"),"months",false))+" মাস ধরে, এই খানায় অবস্থান করছেন। তাই এই সদস্যকে অতিথি হিসাবে যোগ করতে পারবেন না অথবা অবস্থানের তারিখ সঠিক করুন।",[{text:"ঠিক আছে"}]);
  }
  else if(member_type.value!=="9" && member_type.value!=="" && (PID==="" || parseInt(PID.toString().length)!==11 || CID==="" || parseInt(CID.toString().length)!==12)){
    Alert.alert("PID/CID","PID/CID বাটনে ক্লিক করে নতুন সদস্যের জন্য নতুন PID এবং CID  তৈরি করুন।",[{text:"ঠিক আছে"}]);
  }
  else if(member_type.value!=="9" && member_type.value!=="" && (Member_name==="" || Member_name.toString().substring(0,1)==="x"  || Member_name.toString().substring(0,1)==="X")){
    Alert.alert("সদস্যের নাম","সদস্যের সঠিক নাম লিখুন। নাম এক্স দিয়ে শুরু করা যাবে না।",[{text:"ঠিক আছে"}]);
  }
  else if(member_type.value!=="9" && member_type.value!=="" && (DOB_Documents_available.value==="")){
    Alert.alert("তারিখসহ কোন কার্ড","আপনার কাছে জন্ম তারিখসহ কোন কার্ড বা সনদ আছে কি? হাঁ বা না নির্বাচন করুন।",[{text:"ঠিক আছে"}]);
  }
  else if(member_type.value!=="9" && member_type.value!=="" && DOB_Documents_available.value==="1" && BC.value==="2" && NID.value==="2" && VC.value==="2" && OD.value==="2"){
    Alert.alert("তারিখসহ কোন কার্ড","জন্ম তারিখসহ কার্ড বা সনদ আছে নির্বাচন করছেন, তাই অন্তত উল্লেখিত একটি কার্ড নির্বাচন করতে হবে।",[{text:"ঠিক আছে"}]);
  }
  else if(member_type.value!=="9" && member_type.value!=="" && DOB_Documents_available.value==="1" && BC_Certificate_Available.value==="1" && BC_Date===""){
    Alert.alert("জন্ম নিবন্ধন","জন্ম নিবন্ধন সার্টিফিকেটের জন্ম তারিখটি নির্বাচন করুন",[{text:"ঠিক আছে"}]);
  }
  else if(member_type.value!=="9" && member_type.value!=="" && DOB_Documents_available.value==="1" && NID_Certificate_Available.value==="1" && NID_Date===""){
    Alert.alert("NID","NID থেকে পাওয়া জন্ম তারিখটি নির্বাচন করুন",[{text:"ঠিক আছে"}]);
  }
  else if(member_type.value!=="9" && member_type.value!=="" && DOB_Documents_available.value==="1" && VC_Certificate_Available.value==="1" && VC_Date===""){
    Alert.alert("টিকা কার্ড","টিকা কার্ড থেকে পাওয়া জন্ম তারিখটি নির্বাচন করুন",[{text:"ঠিক আছে"}]);
  }
  else if(member_type.value!=="9" && member_type.value!=="" && DOB_Documents_available.value==="1" && OD_Certificate_Available.value==="1" && OD_Date===""){
    Alert.alert("অন্যান্য ডকুমেন্টস","অন্যান্য ডকুমেন্টস থেকে পাওয়া জন্ম তারিখটি নির্বাচন করুন",[{text:"ঠিক আছে"}]);
  }
  else if(member_type.value!=="9" && member_type.value!=="" && General_DOB_Date==="" && General_Age_entry==="" && ((BC_Certificate_Available.value==="2" && NID_Certificate_Available.value==="2" && VC_Certificate_Available.value==="2" && OD_Certificate_Available.value==="2") || DOB_Documents_available.value==="2")){
    Alert.alert("জন্ম তারিখ","নিচের বক্সে সদস্যের সঠিক জন্ম তারিখ বা বয়স লিখুন। ",[{text:"ঠিক আছে"}]);    
  }
  else if(member_type.value!=="9" && member_type.value!=="" && parseInt(General_Age_entry)<=5 && ((BC_Certificate_Available.value==="2" && NID_Certificate_Available.value==="2" && VC_Certificate_Available.value==="2" && OD_Certificate_Available.value==="2") || DOB_Documents_available.value==="2")){
    Alert.alert("জন্ম তারিখ","সদস্যের বয়স ৫ বছর বা ৫ বছরের নিচে আছে। তাই, সদস্যের সঠিক জন্ম তারিখ দিতে হবে।",[{text:"ঠিক আছে"}]);    
  }
  else if(member_type.value!=="9" && member_type.value!=="" && MobileNumber.length!=11 && MobileNumber!=""){
    Alert.alert("মোবাইল নাম্বার","মোবাইল নাম্বার যদি থাকে, তাহলে সঠিক করে মোবাইল নাম্বার দিন।",[{text:"ঠিক আছে"}]);    
  }
  else if(member_type.value!=="9" && member_type.value!=="" && 
  (SelectedFather.FatherMPID==="99999999999" && SelectedFather.FatherName=="") ||
  SelectedFather.FatherMPID=="" ||
  (SelectedFather.FatherName.toString().substring(0,1)==="x"  || SelectedFather.FatherName.toString().substring(0,1)==="X") 
   ){
    Alert.alert("পিতার নাম","পিতার সঠিক নাম নির্বাচন করুন বা লিখুন। নাম এক্স দিয়ে শুরু করা যাবে না",[{text:"ঠিক আছে"}]);    
   }
   else if(member_type.value!=="9" && member_type.value!=="" && 
  (SelectedMother.MotherMPID==="99999999999" && SelectedMother.MotherName==="") ||
  SelectedMother.MotherMPID=="" ||
  (SelectedMother.MotherName.toString().substring(0,1)==="x"  || SelectedMother.MotherName.toString().substring(0,1)==="X") 
   ){
    Alert.alert("মায়ের নাম","মায়ের সঠিক নাম নির্বাচন করুন বা লিখুন। নাম এক্স দিয়ে শুরু করা যাবে না",[{text:"ঠিক আছে"}]);    
   }
   else if(member_type.value!=="9" && member_type.value!=="" && MemberGender.value==""){
    Alert.alert("পুরুষ বা মহিলা","সদস্য পুরুষ বা মহিলা নির্বাচন করুন।",[{text:"ঠিক আছে"}]);    
   }   
   else if(member_type.value=="2" && (((moment().diff(moment(Final_DOB,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false))<=12 && Final_DOB!="") || parseInt(General_Age_entry)<=12)){
    Alert.alert("নবহিবাহিত সদস্যের বয়স","সদস্যের বয়স ১৩ বছরের কম আছে, সঠিক জন্ম তারিখ নির্বাচন করুন অথবা সদস্যের সঠিক ধরন নির্বাচন করুন",[{text:"ঠিক আছে"}]);    
   }
   else if(member_type.value!=="9" && member_type.value!=="" && MaritalStatus.value==="" && (((moment().diff(moment(Final_DOB,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false))>=13 && Final_DOB!="") || parseInt(General_Age_entry)>=13)){
    Alert.alert("বৈবাহিক অবস্থা","সঠিক বৈবাহিক অবস্থা নির্বাচন করুন।",[{text:"ঠিক আছে"}]);    
   }
   else if(member_type.value==="2" && MaritalStatus.value!="1"){
    Alert.alert("বৈবাহিক অবস্থা","সদস্যের ধরন (নববিবাহিত), তাই (বর্তমানে বিবাহিত/বিবাহিতা) ছাড়া অন্য কোন বৈবাহিক অবস্থা নির্বাচন করতে পারবেননা। অথবা সদস্যের ধরন পরিবর্তন করুন।",[{text:"ঠিক আছে"}]);    
   }
   else if(member_type.value!=="9" && member_type.value!=="" && MaritalStatus.value=="1" && (SelectedSpouse.SpouseMPID=="")){//|| SelectedSpouse.SpouseName==""
    Alert.alert("স্বামী/স্ত্রীর নাম","স্বামী/স্ত্রীর সঠিক নাম নির্বাচন করুন",[{text:"ঠিক আছে"}]);    
   }
   else if(member_type.value!=="9" && member_type.value!=="" && MaritalStatus.value=="1" && SelectedSpouse.SpouseMPID=="99999999999" && (SelectedSpouse.SpouseName=="" || SelectedSpouse.SpouseName.toString().substring(0,1)==="x" || SelectedSpouse.SpouseName.toString().substring(0,1)==="X")){
    Alert.alert("স্বামী/স্ত্রীর নাম","স্বামী/স্ত্রীর সঠিক নাম লিখুন। নাম এক্স দিয়ে শুরু করা যাবে না।",[{text:"ঠিক আছে"}]);    
   }
   else if(member_type.value!=="9" && member_type.value!=="" && Education===""){
    Alert.alert("শিক্ষাগত যোগ্যতা","সদস্যের বর্তমান শিক্ষাগত যোগ্যতা নির্বাচন করুন।",[{text:"ঠিক আছে"}]);    
   }
   else if(member_type.value!=="9" && member_type.value!=="" && Occupation===""){
    Alert.alert("বর্তমান পেশা","সদস্যের বর্তমান পেশা নির্বাচন করুন।",[{text:"ঠিক আছে"}]);    
   }
   else if(member_type.value!=="9" && member_type.value!=="" && Relatioship===""){
    Alert.alert("সম্পর্ক","খানা প্রধানের সাথে সঠিক সম্পর্ক নির্বাচন করুন।",[{text:"ঠিক আছে"}]);    
   }
   else if((member_type.value==="2" || member_type.value==="5") && BloodPressureMeasured.value==="" && member_type.value!=="" && (((moment().diff(moment(Final_DOB,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false))>=60 && Final_DOB!="") || parseInt(General_Age_entry)>=60)){
    Alert.alert("রক্তচাপ পরিমাপ","সদস্যের বয়স ৬০ বা তার উপরে আছে, তাই রক্তচাপ পরিমাপ করুন আথবা পরিমাপ না করার কারন উল্লেখ করুন।",[{text:"ঠিক আছে"}]);    
   }
   else if((member_type.value==="2" || member_type.value==="5") && BloodPressureMeasured.value==="2" && BloodPressureNotMeasured.value==="" && member_type.value!==""){
    Alert.alert("রক্তচাপ পরিমাপ","সদস্যের রক্তচাপ পরিমাপ না করার কারন উল্লেখ করুন।",[{text:"ঠিক আছে"}]);    
   }
   else if((member_type.value==="2" || member_type.value==="5") && BloodPressureMeasured.value==="1" && (blood_pressure_count.systolic==="" || blood_pressure_count.diastolic==="") && member_type.value!==""){
    Alert.alert("রক্তচাপ পরিমাপ","রক্তচাপের সঠিক পরিমাপ লিখুন।",[{text:"ঠিক আছে"}]);    
   }    
   else if((member_type.value==="2" || member_type.value==="5") && BloodPressureMeasured.value==="1" && (parseInt(blood_pressure_count.diastolic)<30 || parseInt(blood_pressure_count.diastolic)>200) && member_type.value!==""){
    Alert.alert("ডায়াস্টোলিক","ডায়াস্টোলিকের পরিমাপ ৩০-২০০ এর মধ্যে হবে।",[{text:"ঠিক আছে"}]);    
   }
   else if((member_type.value==="2" || member_type.value==="5") && BloodPressureMeasured.value==="1" && (parseInt(blood_pressure_count.systolic)<50 || parseInt(blood_pressure_count.systolic)>300) && member_type.value!==""){
    Alert.alert("সিস্টোলিক","সিস্টোলিকের পরিমাপ ৫০-৩০০ এর মধ্যে হবে",[{text:"ঠিক আছে"}]);    
   }
   else if((member_type.value==="2" || member_type.value==="5") && BloodPressureMeasured.value==="1" && (parseInt(blood_pressure_count.systolic)>=140 || parseInt(blood_pressure_count.diastolic)>=90) && member_type.value!=="" && BloodPressureimbalance.value===""){
    Alert.alert("রক্তচাপ অস্বাভাবিক","রক্তচাপ স্বাভাবিক মাত্রার চেয় বেশি আছে। সদস্য কি জকিগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্সে যেতে রাজি হয়েছেন?",[{text:"ঠিক আছে"}]);    
   }
  else{
    
    
    // SetCustom_alert((custom_alert)=>({...custom_alert,visible:true}));
    // SetCustom_alert((custom_alert)=>({...custom_alert,theme:"confirm"}));
    // SetCustom_alert((custom_alert)=>({...custom_alert,title:"নতুন সদস্যের তথ্য"}));
    // SetCustom_alert((custom_alert)=>({...custom_alert,message:"আপনি কি নিশ্চিত, সদস্য "+Member_name+" কে, নতুন সদস্য হিসাবে যোগ করতে চাচ্ছেন?"}));
    // SetCustom_alert((custom_alert)=>({...custom_alert, close:close_custom_alert()}));
    // SetCustom_alert((custom_alert)=>({...custom_alert, confirm:"save_new_member"}));
    // setSelectedFather((SelectedFather)=>({...SelectedFather, FatherName:text}))
    
    Alert.alert("নতুন সদস্যের তথ্য", "আপনি কি নিশ্চিত, সদস্য "+Member_name+" কে, নতুন সদস্য হিসাবে যোগ করতে চাচ্ছেন? সদস্য যোগ করতে (তথ্য সঠিক) বাটনে ক্লিক করুন অথবা (তথ্য সঠিক নয়) বাটনে ক্লিক করুন।",[{text:"তথ্য সঠিক নয়", onPress:()=>console.log("CANCELED")},{text:"তথ্য সঠিক", onPress:()=>save_new_member()}])
    

  }
}




// const[custom_alert, SetCustom_alert] = useState({
//   visible:false,
//   theme:"",
//   title:"",
//   message:"",
// });




// Alert.alert(""+blood_pressure_count.systolic);
const[data_saved_tracker,SetData_saved_tracker] = useState("0");

const save_new_member=()=>{
  

  var isMWRA="";
  var iconStatus="";
  
  if(member_type.value==="8"){
    iconStatus = "8";//member
    isMWRA="2";
    }
    else if(member_type.value==="6"){
        iconStatus = "6";//guest
        isMWRA="2";//guest are not MWRA, Must be parmanent member
    }
    else{
    if(member_type.value==="5" && (((moment().diff(moment(Final_DOB,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false))<=5 && Final_DOB!="") || parseInt(General_Age_entry)<=5) ){
    iconStatus = "3";//child
    isMWRA="2";    
    }
    else if(
      MemberGender.value==="2" && 
      MaritalStatus.value==="1" &&  
        (member_type.value==="5" || member_type.value==="2") && 
        (((moment().diff(moment(Final_DOB,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false))>=13 && (moment().diff(moment(Final_DOB,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false))<=49 && Final_DOB!="") || (parseInt(General_Age_entry)>=13 && parseInt(General_Age_entry)<=49 && General_Age_entry!="")))         
        {
        iconStatus = "2";//mwra
        isMWRA="1";    
    }    
    else{
    iconStatus = "5";//member
    isMWRA="2";
    }
    }




    var enrollType;
    if(member_type.value==="8"){
        enrollType = "8";
    }
    else{

    if(member_type.value==="2"){
    enrollType = "2";//mwra
    }
    else if(member_type.value==="6"){
        enrollType = "6";//guest
    } 
    else if(member_type.value==="5"){    
    if((((moment().diff(moment(Final_DOB,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false))<=5 && Final_DOB!="") || (parseInt(General_Age_entry)<=5 && General_Age_entry!=""))){
    enrollType = "3";//Child    
    }
    else if(MemberGender.value=="2" && MaritalStatus.value=="1" &&  (((moment().diff(moment(Final_DOB,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false))>=13 && (moment().diff(moment(Final_DOB,"MMM DD, YYYY").format("YYYY-MM-DD"),"years",false))<=49 && Final_DOB!="") || (parseInt(General_Age_entry)>=13 && parseInt(General_Age_entry)<=49 && General_Age_entry!="")) ){
    enrollType = "2";//mwra
    }

    else{
    enrollType = "5";//member
    }
    }
    else{
    enrollType = "";
    }
    }

var Guest_Entry_Date_save = "";
if (Guest_Entry_Date!==""){
  Guest_Entry_Date_save = moment(Guest_Entry_Date,"MMM DD, YYYY").format("YYYY-MM-DD")  
  }else{
    Guest_Entry_Date_save = ""
  }

var Final_DOB_save = "";
if(Final_DOB!==""){
Final_DOB_save =  moment(Final_DOB,"MMM DD, YYYY").format("YYYY-MM-DD")  
}else{
Final_DOB_save = "";
}

var BC_Date_save = "";
if(BC_Date!==""){
BC_Date_save =  moment(BC_Date,"MMM DD, YYYY").format("YYYY-MM-DD")  
}else{
BC_Date_save = "";
}


var NID_Date_save = "";
if(NID_Date!==""){
NID_Date_save =  moment(NID_Date,"MMM DD, YYYY").format("YYYY-MM-DD")  
}else{
NID_Date_save = "";
}


var NID_Date_save = "";
if(NID_Date!==""){
NID_Date_save =  moment(NID_Date,"MMM DD, YYYY").format("YYYY-MM-DD")  
}else{
NID_Date_save = "";
}


var VC_Date_save = "";
if(VC_Date!==""){
VC_Date_save =  moment(VC_Date,"MMM DD, YYYY").format("YYYY-MM-DD")  
}else{
VC_Date_save = "";
}


var VC_Date_save = "";
if(VC_Date!==""){
VC_Date_save =  moment(VC_Date,"MMM DD, YYYY").format("YYYY-MM-DD")  
}else{
VC_Date_save = "";
}


var OD_Date_save = "";
if(OD_Date!==""){
OD_Date_save =  moment(OD_Date,"MMM DD, YYYY").format("YYYY-MM-DD")  
}else{
OD_Date_save = "";
}
  

  db.transaction(tx=>{
    tx.executeSql(
    "insert OR IGNORE into member ("+
    "Mem_SL, "+
    "Visit_Date, "+ 
    "Visit_Time, "+
    "Cluster, "+ 
    "Block, "+ 
    "Mem_Line_No, "+ 
    "Mem_PID, "+
    "MCID, "+
    "Village_Code, "+ 
    "Bari_Code, "+ 
    "HH_Code, "+ 
    "Mem_Name, "+ 
    "Mem_Sex, "+ 
    "Mem_DOB, "+ 
    "Mem_Age, "+ 
    "Marital_Status, "+ 
    "Rel_HH, "+ 
    "Mother_Line, "+
    "Mother_Name, "+ 
    "Father_Line, "+ 
    "Father_Name, "+ 
    "Hus_Wife_Line, "+ 
    "Hus_Wife_Name, "+ 
    "Mobile, "+ 
    "Mem_Cstatus, "+ 
    "is_MWRA, "+ 
    "Mem_Icon, "+ 
    "Mem_Enroll_Type, "+ 
    "Guest_date_from, "+ 
    "Reg_Date, "+
    "statusCngOn, "+ 
    "DOB_Verified_Docs, "+ 
    "BirthCertificate, "+ 
    "BirthCertificate_Verified, "+
    "BirthCertificate_DOB, "+ 
    "NID, "+ 
    "NID_Verified, "+ 
    "NID_DOB, "+ 
    "EPI, "+ 
    "EPI_Verified, "+ 
    "EPI_DOB, "+ 
    "OtherDocs, "+ 
    "OtherDocs_Verified, "+ 
    "OtherDocs_DOB, "+ 
    "BP, "+ 
    "BP_ND_Reason, "+ 
    "BP_D, "+ 
    "BP_S, "+ 
    "BP_Referred, "+ 
    "BP_Referral_accept, "+ 
    "Entry_Date, "+ 
    "Entry_UserID) values( "+
    "'"+Serial+"',"+
    "'"+moment().format("YYYY-MM-DD")+"', "+
    "'"+moment().format("HH:mm")+"' ,"+
    "'"+props.cluster+"',"+
    "'"+props.block+"',"+
    "'"+LineNo+"',"+
    "'"+PID+"',"+
    "'"+CID+"',"+
    "'"+props.villageCode+"',"+
    "'"+props.bari+"',"+
    "'"+props.hh+"',"+
    "'"+Member_name+"',"+
    "'"+MemberGender.value+"',"+
    "'"+Final_DOB_save+"',"+
    "'"+Calculated_Age+"',"+
    "'"+MaritalStatus.value+"',"+
    // "'"+memberEdu+"',"+
    // "'"+memberOcupation+"',"+
    "'"+Relatioship+"',"+
    "'"+SelectedMother.MotherMPID+"',"+
    "'"+SelectedMother.MotherName+"',"+
    "'"+SelectedFather.FatherMPID+"',"+
    "'"+SelectedFather.FatherName+"',"+
    "'"+SelectedSpouse.SpouseMPID+"',"+
    "'"+SelectedSpouse.SpouseName+"',"+
    "'"+MobileNumber+"',"+
    "'1',"+
    "'"+isMWRA+"',"+
    "'"+iconStatus+"',"+
    "'"+enrollType+"',"+
    "'"+Guest_Entry_Date_save+"',"+
    "'"+moment().format("YYYY-MM-DD")+"', "+
    " '' , "+
    "'"+DOB_Documents_available.value+"',"+                   
    "'"+BC.value+"',"+
    "'"+BC_Certificate_Available.value+"',"+
    "'"+BC_Date_save+"',"+
    "'"+NID.value+"',"+
    "'"+NID_Certificate_Available.value+"',"+
    "'"+NID_Date_save+"',"+
    "'"+VC.value+"',"+
    "'"+VC_Certificate_Available.value+"',"+
    "'"+VC_Date_save+"',"+
    "'"+OD.value+"',"+
    "'"+OD_Certificate_Available.value+"',"+
    "'"+OD_Date_save+"',"+
    "'"+BloodPressureMeasured.value+"',"+
    "'"+BloodPressureNotMeasured.value+"',"+
    "'"+blood_pressure_count.diastolic+"',"+
    "'"+blood_pressure_count.systolic+"',"+      
    "'"+BloodPressureimbalance_reffered+"',"+
    "'"+BloodPressureimbalance.value+"',"+
    "'"+moment().format("YYYY-MM-DD HH:mm")+"', "+
    "'"+props.userID+"'"+")",
    [],
    (tx, result)=>{
      if(result.rowsAffected>0){
        SetData_saved_tracker(result.rowsAffected);
        Alert.alert("ডাটা সেভ", "নতুন সদস্যের তথ্য সফলভাবে সেভ হয়েছে।  আপনি কি আর কোন নতুন সদস্য যোগ করতে চান?",[{text:"সদস্য যোগ করব", onPress:()=>reset_form()},{text:"সদস্য যোগ করা শেষ", onPress:()=>back_to_survey_question(result.rowsAffected)}])
      }      

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });

}





  // name:props.items[0],
  // userID:props.items[1],
  // password:props.items[2],
  // cluster:props.items[3],
  // roundNo:props.items[4],
  // block:props.items[5],
  // villageCode:props.items[6],
  // villageName:props.items[7],  
  // bari:props.items[8],
  // bariName:props.items[9],
  // hh:props.items[10],
  // hhName:props.items[11]


const back_to_survey_question=(totalAdd)=>{
  // {data_saved_tracker}
  var new_member_added = parseInt(totalAdd) > 0 || parseInt(data_saved_tracker)>0 ? "1" : "2"; 


if(parseInt(new_member_added)===2 && parseInt(props.MemberUpdateTracker)!==1){
  Navigation.push(props.componentId,{
    component:{
      name:"Inside_khana_page",
      passProps:{
        userID:props.userID,                
        name:props.name,
        password:props.password,
        cluster:props.cluster,
        block:props.block,
        roundNo:props.roundNo,
        villageCode:props.villageCode,
        villageName:props.villageName,
        bari:props.bari,
        bariName:props.bariName,
        hh:props.hh,
        hhName:props.hhName,
        MemberAddTracker:new_member_added,
        MemberUpdateTracker:props.MemberUpdateTracker
        
       

        
      },
      options:{        
        topBar:{
          visible:true,
          title:{
            text:"খানা ভিজিট"
          },
          rightButtons:[{                    
            component:{              
              name:"BackButton",              
              passProps:{
                originComponentId: props.componentId,
                position:"Inside_khana_page",
                backButtonText:"খানা লিস্ট",
                userID:props.userID,
                password:props.password, 
                name:props.name,
                cluster:props.cluster,
                roundNo:props.roundNo,
                block:props.block,
                villageCode:props.villageCode,
                villageName:props.villageName,
                bari:props.bari,
                bariName:props.bariName,
                hh:props.hh,
                hhName:props.hhName
                

              }
            }
  
            
          }]
          

        }
      }
    }
  })
}
else{
  Navigation.push(props.componentId,{
    component:{
      name:"Inside_khana_page",
      passProps:{
        userID:props.userID,                
        name:props.name,
        password:props.password,
        cluster:props.cluster,
        block:props.block,
        roundNo:props.roundNo,
        villageCode:props.villageCode,
        villageName:props.villageName,
        bari:props.bari,
        bariName:props.bariName,
        hh:props.hh,
        hhName:props.hhName,
        MemberAddTracker:new_member_added,
        MemberUpdateTracker:props.MemberUpdateTracker

        
      },
      options:{        
        topBar:{
          visible:true,
          title:{
            text:"খানা ভিজিট"
          },
          rightButtons:[]         
        }
      }
    }
  })

}
}


const reset_form=()=>{

SetLoading(true);

  SetPID("");
  SetSerial("");
  SetCID("");
  SetLineNo("");
  SetFatherName([]);
  SetMotherName([]);
  SetSpouseName([]);
  setSelectedFather({FatherName:""});
  setSelectedFather({FatherMPID:""});
  

  setSelectedMother({MotherName:""});
  setSelectedMother({MotherMPID:""});
  
  setSelectedSpouse({SpouseName:""});
  setSelectedSpouse({SpouseMPID:""});
  
  SetEducation("");
  SetOccupation("");
  SetRelatioship("");
  

  SetShowWriteFatherName(false);
  SetShowWriteMotherName(false);
  SetShowWriteSpouseName(false);

  SetDOB_Documents_available({radio_1:"no"});
  SetDOB_Documents_available({radio_2:"no"});
  SetDOB_Documents_available({value:""});

  SetMemberGender({radio_1:"no"});
  SetMemberGender({radio_2:"no"});
  SetMemberGender({value:""});

  SetBloodPressureMeasured({radio_1:"no"});
  SetBloodPressureMeasured({radio_2:"no"});
  SetBloodPressureMeasured({value:""});
  
  SetBloodPressureNotMeasured({radio_1:"no"});
  SetBloodPressureNotMeasured({radio_2:"no"});
  SetBloodPressureNotMeasured({radio_3:"no"});
  SetBloodPressureNotMeasured({value:""});

  SetBloodPressureimbalance({radio_1:"no"});
  SetBloodPressureimbalance({radio_2:"no"});
  SetBloodPressureimbalance({value:""});

  SetBloodPressureimbalance_reffered("");
  
  SetMember_type({radio_1:"no"});
  SetMember_type({radio_2:"no"});
  SetMember_type({radio_3:"no"});
  SetMember_type({radio_4:"no"});
  SetMember_type({radio_5:"no"});
  SetMember_type({value:""});
  
  SetGuest_Entry_Date("");
  SetGuest_Entry_Date_check("");
  
  SetGuest_Entry_Date_Open(false);  
  SetDOB_Documents_available_show(false);
  
  SetBC_DT_Open(false);
  SetBC_Date("");
  SetBC_Date_check("");  
  SetBC_Ceritificate_show(false);
  SetBC_Date_Verified_show(false);
  set_BC({radio_1:""});
  set_BC({value:""});
  SetBC_Certificate_Available({radio_1:""});
  SetBC_Certificate_Available({value:""});

  SetNID_DT_Open(false);
  SetNID_Date("");
  SetNID_Date_check("");  
  SetNID_Ceritificate_show(false);
  SetNID_Date_Verified_show(false);
  set_NID({radio_1:""});
  set_NID({value:""});
  SetNID_Certificate_Available({radio_1:""});
  SetNID_Certificate_Available({value:""});

  SetVC_DT_Open(false);
  SetVC_Date("");
  SetVC_Date_check("");  
  SetVC_Ceritificate_show(false);
  SetVC_Date_Verified_show(false);
  set_VC({radio_1:""});
  set_VC({value:""});
  SetVC_Certificate_Available({radio_1:""});
  SetVC_Certificate_Available({value:""});

  SetOD_DT_Open(false);
  SetOD_Date("");
  SetOD_Date_check("");  
  SetOD_Ceritificate_show(false);
  SetOD_Date_Verified_show(false);
  set_OD({radio_1:""});
  set_OD({value:""});
  SetOD_Certificate_Available({radio_1:""});
  SetOD_Certificate_Available({value:""});

  SetGeneral_DT_Open(false);
  SetGeneral_DOB_Date("");
  SetGeneral_DOB_Date_check("");
  SetGeneral_Age_entry("");
  
  SetGeneral_dob_Question_show(false);  
  SetGeneral_DOB_show(false);  
  SetGeneral_age_show(false);  
  
  SetGeneral_DOB_Question_answer({radio_1:""});
  SetGeneral_DOB_Question_answer({radio_2:""});
  SetGeneral_DOB_Question_answer({value:""});

  SetMaritalStatus({radio_1:""});
  SetMaritalStatus({radio_2:""});
  SetMaritalStatus({radio_3:""});
  SetMaritalStatus({radio_4:""});
  SetMaritalStatus({value:""});
  
  SetBlood_pressure_count({systolic:""});
  SetBlood_pressure_count({diastolic:""});
  
SetShow_merital_status(false);  
SetShow_spouse_selection(false);  
setBlood_pressure_60_up(false);  
SetBlood_pressure_not_given(false);  
SetBlood_pressure_count_container(false);  
SetBlood_pressure_referral(false);  

SetMember_name("");
SetMobileNumber("");

SetCalculated_Age("");
SetFinal_DOB("");

SetGuest_entry_date_container(false);

SetLoading(false);
  


  


  
}


const [member_list_visible, setMember_list_visible] = useState(false);



const back_to_survey_question_manually=(totalUpdated)=>{  
  SetData_saved_tracker(totalUpdated);
}



if(loading===true){
  return
  <ActivityIndicator color={"red"} size={"large"}/>
}

else {
  return (
    
    <View style={{width:"100%", flex:100, flexDirection:"column"}}>
      <View style={{flex:0.43}}>
      <Headder function={back_to_survey_question.bind(this,"0")} pageName={"সদস্য নিবন্ধন"} backPage={""}/>

      <View style={{width:"100%", alignItems:"center"}}>
      <View style={{marginTop:"1%",height:"auto", width:"95%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                নতুন সদস্য নিবন্ধন                
              </Text>
              
              <Text style={{fontSize:12, color:"#404040"}}>
              
                  বিঃদ্রঃ নতুন সদস্য নিবন্ধনের ক্ষত্রে, প্রথমে সব তথ্য যাচাই করুন, তারপর ডাটা এন্ট্রি করুন।
              </Text>
            </View>
            
          


            <View style={{height:225, width:"95%", marginTop:"1%"}}>            
            <QuestionContainer
            question={"নতুন সদস্য নিবন্ধনের ধরন"}
            radio_1={<View style={{width:"50%"}}><RadioButton callFunction={set_member_type.bind(this,"2")} Value={member_type.radio_1} title={"নববিবাহিত"}/></View>}
            radio_2={<View style={{width:"50%"}}><RadioButton callFunction={set_member_type.bind(this,"5")} Value={member_type.radio_2} title={"বাদ পরে যাওয়া খানা সদস্য"}/></View>}
            radio_3={<View style={{width:"50%"}}><RadioButton callFunction={set_member_type.bind(this,"8")} Value={member_type.radio_3} title={"বর্তমানে বিদেশে অবস্থানরত এই পরিবারের সদস্য"}/></View>}
            radio_4={<View style={{width:"50%"}}><RadioButton callFunction={set_member_type.bind(this,"6")} Value={member_type.radio_4} title={"অতিথি হিসাবে এই খানায় অবস্থান করছেন"}/></View>}
            radio_5={<View style={{width:"50%"}}><RadioButton callFunction={set_member_type.bind(this,"9")} Value={member_type.radio_5} title={"এই বাড়ির অন্য খানা থেকে আসছেন"}/></View>}
            direction={"column"}
            />        
            
            </View>
            
            </View>
                
            </View>

            {member_list_visible &&             
            <View style={{flex:80, width:"100%", marginTop:"45%"}}>
            <Inside_khana_member_list onManualBack_to_Survey_Question = {back_to_survey_question_manually} onDataReceived={back_to_survey_question} migration={"Yes_fromHH"} cStatus={"2"} villageCode={props.villageCode} bari={props.bari} hh={props.hh}/>            
            </View>  
            }
         
            

          <ScrollView style={{width:"100%", flex:80, paddingBottom:40}}>
    

            <View style={{width:"100%", height:"100%"}}>     

              {Full_form && (
              <View style={{alignItems:"center"}}>
            <View style={{height:100, width:"95%", marginTop:"1%"}}>
            <QuestionContainer
            question={"PID এবং CID জন্য, ডান দিকের বাটনে ক্লিক করুন।"}
            inputField_1={<View style={{width:"35%"}}><InputField value={PID} keyboardType="numeric" placeholder={"পি আই ডি"}  imgLeft={"id"} readOnly={false} /></View>} 
            inputField_2={<View style={{width:"35%"}}><InputField value={CID} keyboardType="numeric" placeholder={"সি আই ডি"} imgLeft={"id"} readOnly={false} /></View>} 
            direction={"row"}
            sideButton={<View style={{width:"10%"}}><CRUD_button callFunction={generateIDs} title={"PID/CID"} radious={40}/></View>}
            />
            </View>
            
            <View style={{width:"95%"}}>{Guest_entry_date_container && (
            <View style={{height:100, marginTop:"1%"}}>
            <QuestionContainer
            question={"আপনি, নিবন্ধনের ধরন অতিথি হিসাবে নির্বাচন করেছেন, তাই এই সদস্য খানায় কোন তারিখ থেকে অবস্থান করছেন উল্লেখ করুন।"}
            inputField_1={<View style={{width:"40%"}}><TouchableOpacity onPress={guest_entry_date_checker} ><Date_field value={Guest_Entry_Date} ph={"অবস্থানের তারিখ"}/></TouchableOpacity>
            <DatePicker
            modal
            mode='date'
            title={"অতিথি অবস্থানের তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            maximumDate={new Date()}

            open={Guest_Entry_Date_Open}
            date={new Date()}
            onConfirm={(EntryDate) =>{
              SetGuest_Entry_Date_Open(false)                                          
              Guest_entry_Date_onConfirm(EntryDate);
            }}
            onCancel={() => {
              SetGuest_Entry_Date_Open(false);
              SetGuest_Entry_Date("");
              SetGuest_Entry_Date_check("");
              }} />
            </View> }
            />
            </View>
            )}</View>

            <View style={{height:100, width:"95%", marginTop:"1%"}}>
            <QuestionContainer
            question={"সদস্যের নাম লিখুন"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=> SetMember_name(text)} value={Member_name} maxLength={40} placeholder={"সদস্যের নাম"} imgLeft={"user"}/></View>} 
            />
            </View>



            
            <View style={{height:95, width:"95%", marginTop:"1%"}}>
            <QuestionContainer
            question={"আপনার কাছে জন্ম তারিখসহ কোন কার্ড বা সনদ আছে কি? যেমনঃ জন্ম নিবন্ধন সার্টিফিকেট, ন্যাশনাল আইডি কার্ড (NID), টিকা কার্ড অথবা অন্যান্য ডকুমেন্টস।"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={DOB_Docs.bind(this,"yes")} Value={DOB_Documents_available.radio_1} title={"হ্যাঁ, ডকুমেন্টস আছে"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={DOB_Docs.bind(this,"no")} Value={DOB_Documents_available.radio_2} title={"না, ডকুমেন্টস নাই"}/></View>}
            direction={"row"}
            />
            </View>


            <View style={{width:"95%"}}>{DOB_Documents_available_show &&(
            <View style={{ marginTop:"1%",height:"auto", padding:10, backgroundColor:"#f59e0b", padding:10, borderRadius:10, elevation:1}}>
              <Text style={{fontSize:12, fontWeight:"bold", color:"#FFF"}}>
              আপনি নিচের কোন কোন উৎস থেকে জন্ম তারিখ জানতে  পেরেছেন?
              </Text>                            
            </View>
            )}</View>

            
            <View>{DOB_Documents_available_show &&(
            <View style={{height:80, width:"95%", marginTop:"1%"}}>                      
            <QuestionContainer
            question={"জন্ম নিবন্ধন সার্টিফিকেট"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={BC_question.bind(this,"yes")} Value={BC.radio_1} title={"জন্ম নিবন্ধন সার্টিফিকেট"}/></View>}            
            radio_2={<View style={{width:"35%"}}>{BC_Ceritificate_show &&(<RadioButton callFunction={BC_certificate.bind(this,"yes")} Value={BC_Certificate_Available.radio_1} title={"জন্ম তারিখটি যাচাই করতে পেরেছি।"}/>)}</View>}            
            inputField_1={<View style={{width:"25%"}}>{BC_Date_Verified_show &&(<TouchableOpacity onPress={BC_date_checker} ><Date_field value={BC_Date} ph={"যাচাইকৃত জন্ম তারিখ"}/></TouchableOpacity>)}
            <DatePicker
            modal
            mode='date'
            title={"জন্ম নিবন্ধনের তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            maximumDate={new Date()}
            open={BC_DT_Open}
            date={new Date()}
            onConfirm={(BC_Date) => {
              SetBC_DT_Open(false)                            
              BC_Date_onConfirm(BC_Date);
            }}
            onCancel={() => {
              SetBC_DT_Open(false);
              SetBC_Date("");
              SetBC_Date_check("");
              }} />
            </View> }
            direction={"row"}
            />
            </View>            
            )}</View>



<View>{DOB_Documents_available_show &&(
            <View style={{height:80, width:"95%", marginTop:"1%"}}>                      
            <QuestionContainer
            question={"ন্যাশনাল আইডি কার্ড (NID)"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={NID_question.bind(this,"yes")} Value={NID.radio_1} title={"ন্যাশনাল আইডি কার্ড (NID)"}/></View>}            
            radio_2={<View style={{width:"35%"}}>{NID_Ceritificate_show &&(<RadioButton callFunction={NID_certificate.bind(this,"yes")} Value={NID_Certificate_Available.radio_1} title={"জন্ম তারিখটি যাচাই করতে পেরেছি।"}/>)}</View>}            
            inputField_1={<View style={{width:"25%"}}>{NID_Date_Verified_show &&(<TouchableOpacity onPress={NID_date_checker} ><Date_field value={NID_Date} ph={"যাচাইকৃত জন্ম তারিখ"}/></TouchableOpacity>)}
            <DatePicker
            modal
            mode='date'
            title={"ন্যাশনাল আইডির তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            maximumDate={new Date()}
            open={NID_DT_Open}
            date={new Date()}
            onConfirm={(NID_Date) => {
              // SetNID_DT_Open(false)
              // SetNID_Date(moment(NID_Date).format("MMM DD, YYYY"))
              SetNID_DT_Open(false)                            
              NID_Date_onConfirm(NID_Date);
            }}
            onCancel={() => {
              SetNID_DT_Open(false)
              SetNID_Date("");
              SetNID_Date_check("");
              }} />
            </View> }
            direction={"row"}
            />
            </View>
            )}</View>




<View>{DOB_Documents_available_show &&(
            <View style={{height:80, width:"95%", marginTop:"1%"}}>                      
            <QuestionContainer
            question={"টিকা কার্ড"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={VC_question.bind(this,"yes")} Value={VC.radio_1} title={"টিকা কার্ড"}/></View>}            
            radio_2={<View style={{width:"35%"}}>{VC_Ceritificate_show &&(<RadioButton callFunction={VC_certificate.bind(this,"yes")} Value={VC_Certificate_Available.radio_1} title={"জন্ম তারিখটি যাচাই করতে পেরেছি।"}/>)}</View>}            
            inputField_1={<View style={{width:"25%"}}>{VC_Date_Verified_show &&(<TouchableOpacity onPress={VC_date_checker} ><Date_field value={VC_Date} ph={"যাচাইকৃত জন্ম তারিখ"}/></TouchableOpacity>)}
            <DatePicker
            modal
            mode='date'
            title={"টিকা কার্ডের তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            maximumDate={new Date()}
            open={VC_DT_Open}
            date={new Date()}
            onConfirm={(VC_Date) => {
              // SetVC_DT_Open(false)
              // SetVC_Date(moment(VC_Date).format("MMM DD, YYYY"))
              SetVC_DT_Open(false)                            
              VC_Date_onConfirm(VC_Date);
            }}
            onCancel={() => {
              SetVC_DT_Open(false)
              SetVC_Date("");
              SetVC_Date_check(""); 
              }} />
            </View> }
            direction={"row"}
            />
            </View>
            )}</View>



<View>{DOB_Documents_available_show &&(
            <View style={{height:80, width:"95%", marginTop:"1%"}}>                      
            <QuestionContainer
            question={"অন্যান্য ডকুমেন্টস (HSC, SSC (সার্টিফিকেট), পাসপোর্ট, স্মরণিকা, ইত্যাদি)"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={OD_question.bind(this,"yes")} Value={OD.radio_1} title={"অন্যান্য ডকুমেন্টস"}/></View>}            
            radio_2={<View style={{width:"35%"}}>{OD_Ceritificate_show &&(<RadioButton callFunction={OD_certificate.bind(this,"yes")} Value={OD_Certificate_Available.radio_1} title={"জন্ম তারিখটি যাচাই করতে পেরেছি।"}/>)}</View>}            
            inputField_1={<View style={{width:"25%"}}>{OD_Date_Verified_show &&(<TouchableOpacity onPress={OD_date_checker} ><Date_field value={OD_Date} ph={"যাচাইকৃত জন্ম তারিখ"}/></TouchableOpacity>)}
            <DatePicker
            modal
            mode='date'
            title={"অন্যান্য ডকুমেন্টসের তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            maximumDate={new Date()}
            open={OD_DT_Open}
            date={new Date()}
            onConfirm={(OD_Date) => {
              // SetOD_DT_Open(false)
              // SetOD_Date(moment(OD_Date).format("MMM DD, YYYY"))
              SetOD_DT_Open(false)                            
              OD_Date_onConfirm(OD_Date);
            }}
            onCancel={() => {
              SetOD_DT_Open(false)
              SetOD_Date("");
              SetOD_Date_check(""); 
              }} />
            </View> }
            direction={"row"}
            />
            </View>
            )}</View>


            <View>{General_dob_Question_show && (
            <View style={{height:80, width:"87%", marginTop:"1%"}}>                      
            <QuestionContainer
            question={"আপনি কি সদস্যের সঠিক জন্ম তারিখ জানেন, যদি জানেন হ্যাঁ নির্বাচন করুন অথবা না নির্বাচন করুন।"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={Gen_Dob_question.bind(this,"yes")} Value={General_DOB_Question_answer.radio_1} title={"হ্যাঁ, জন্ম তারিখ জানি"}/></View>}            
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={Gen_Dob_question.bind(this,"no")} Value={General_DOB_Question_answer.radio_2} title={"না, জন্ম তারিখ জানিনা"}/></View>}            
            direction={"row"}
            />
            </View>)}
            </View>    


            <View style={{width:"95%"}}>{General_DOB_show &&(
            <View style={{height:80,marginTop:"1%"}}>                                  
            <QuestionContainer
            question={"সঠিক জন্ম তারিখ নির্বাচন করুন।"}
            inputField_1={<View style={{width:"30%"}}><TouchableOpacity onPress={General_date_checker} ><Date_field value={General_DOB_Date} ph={"জন্ম তারিখ নির্বাচন করুন"}/></TouchableOpacity>
            <DatePicker
            modal
            title={"সদস্যের জন্ম তারিখ"}
            confirmText={"ঠিক আছে"}
            cancelText={"বাতিল"}
            mode='date'
            maximumDate={new Date()}
            open={General_DT_Open}
            date={new Date()}
            onConfirm={(Gen_Dob_Date) => {
              SetGeneral_DT_Open(false)
              General_Date_onConfirm(Gen_Dob_Date);
            }}
            onCancel={() => {
              SetGeneral_DT_Open(false)
              SetGeneral_DOB_Date("")
              SetGeneral_DOB_Date_check("");
              }} />
            </View>}
            
            direction={"column"}
            />
            </View>)}

            </View>    



            <View style={{width:"95%"}}>{General_age_show &&(
            <View style={{height:80, marginTop:"1%"}}>
            <QuestionContainer
            question={"সদস্যের বয়স লিখুন।"}
            inputField_1={<View style={{width:"30%"}}><InputField maxLength={3} getValue={(age)=>SetGeneral_Age_entry(age)} keyboardType="numeric" placeholder={"বয়স"} imgLeft={"calendar"}/></View>} 
            />
            </View>)}
            </View>    



            <View style={{height:100, width:"95%", marginTop:"1%"}}>
            <QuestionContainer
            question={"সদস্যের ফোন নাম্বার অথবা সদস্যের যদি কোন ফোন নাম্বার না থাকে, তাহলে এই খানার অন্য সদস্যের ফোন নাম্বার। "}
            inputField_1={<View style={{width:"30%"}}><InputField getValue={(text)=> SetMobileNumber(text)} maxLength={11} placeholder={"ফোন নাম্বার"} keyboardType={"phone-pad"} imgLeft={"telephone"}/></View>} 
            />
            </View>


            <View style={{height:100, width:"95%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"পিতার নাম নির্বাচন করুন।"}
            inputField_1={<View style={{width:"50%"}}>
              <DropDown 
                data={fatherName} 
                labelField={"name"}
                valueField={"MPID"}
                placeholder={'একটি নির্বাচন করুন'}
                // value={SelectedFather.FatherName} 
                onChange={item => {                  
                  item.name==="এই লিস্টে নেই" ? setSelectedFather((SelectedFather)=>({...SelectedFather, FatherName:""})) : setSelectedFather((SelectedFather)=>({...SelectedFather, FatherName:item.name}))
                  setSelectedFather((SelectedFather)=>({...SelectedFather, FatherMPID:item.MPID}))                  
                }}
             />
            </View>} 
            />
            </View>

              
            <View style={{width:"95%"}}>{ShowWriteFatherName && (
            <View style={{height:100, marginTop:"1%"}}>
            <QuestionContainer
            question={"সদস্যের পিতার নাম লিস্টে না থাকার কারণে, পিতার নাম নিচের বক্সে লিখতে হবে।"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=>{setSelectedFather((SelectedFather)=>({...SelectedFather, FatherName:text}))}} maxLength={40} placeholder={"পিতার নাম"} imgLeft={"user"}/></View>} 
            // {(text)=>{setState((state)=>({...state, EnteredUserID:text}))}}
            />
            </View>
            )} 
           
            </View> 









            <View style={{height:100, width:"95%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"মায়ের নাম নির্বাচন করুন।"}
            inputField_1={<View style={{width:"50%"}}>
              <DropDown 
                data={motherName} 
                labelField={"name"}
                valueField={"MPID"}
                placeholder={'একটি নির্বাচন করুন'}
                // value={SelectedMother.MotherName}                 
                onChange={item => {                  
                  item.name==="এই লিস্টে নেই" ? setSelectedMother((SelectedMother)=>({...SelectedMother, MotherName:""})) : setSelectedMother((SelectedMother)=>({...SelectedMother, MotherName:item.name}));
                  setSelectedMother((SelectedMother)=>({...SelectedMother, MotherMPID:item.MPID}))                  
                }}
             />
            </View>} 
            />
          
            </View>

              
            <View style={{width:"95%"}}>{ShowWriteMotherName && (
            <View style={{height:100, marginTop:"1%"}}>
            <QuestionContainer
            question={"সদস্যের মায়ের নাম লিস্টে না থাকার কারণে, মায়ের নাম নিচের বক্সে লিখতে হবে।"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=>{setSelectedMother((SelectedMother)=>({...SelectedMother, MotherName:text}))}} maxLength={40} placeholder={"মাতার নাম"} imgLeft={"user"}/></View>} 
            // {(text)=>{setState((state)=>({...state, EnteredUserID:text}))}}
            />
            </View>
            )} 
            </View> 



            <View style={{height:95, width:"95%", marginTop:"1%"}}>
            <QuestionContainer
            question={"সদস্যের সঠিক লিঙ্গ নির্বাচন করুন"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={member_gender.bind(this,"yes")} Value={MemberGender.radio_1} title={"পুরুষ"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={member_gender.bind(this,"no")} Value={MemberGender.radio_2} title={"মহিলা"}/></View>}
            direction={"row"}
            />
            </View>


            <View style={{width:"95%"}}>
              {Show_merital_status &&(
            <View style={{height:195, marginTop:"1%"}}>
            <QuestionContainer
            question={"নতুন সদস্যের বৈবাহিক অবস্থা।"}
            radio_1={<View style={{width:"50%"}}><RadioButton callFunction={set_marital_status.bind(this,"1")} Value={MaritalStatus.radio_1} title={"বর্তমানে বিবাহিত/বিবাহিতা"}/></View>}
            radio_2={<View style={{width:"50%"}}><RadioButton callFunction={set_marital_status.bind(this,"2")} Value={MaritalStatus.radio_2} title={"তালাকপ্রাপ্ত"}/></View>}
            radio_3={<View style={{width:"50%"}}><RadioButton callFunction={set_marital_status.bind(this,"3")} Value={MaritalStatus.radio_3} title={"বিধবা"}/></View>}
            radio_4={<View style={{width:"50%"}}><RadioButton callFunction={set_marital_status.bind(this,"4")} Value={MaritalStatus.radio_4} title={"এখনও বিবাহ হইনি"}/></View>}
            direction={"column"}
            />
            </View>
            )}

            </View>    



             <View style={{width:"95%"}}>
             {Show_spouse_selection &&(                            
            <View style={{height:100, marginTop:"1%"}}>              
            <QuestionContainer
            question={"স্বামী/স্ত্রির নাম নির্বাচন করুন।"}
            inputField_1={<View style={{width:"50%"}}>
              <DropDown 
                data={spouseName} 
                labelField={"name"}
                valueField={"MPID"}                
                placeholder={'একটি নির্বাচন করুন'}
                onChange={item => {                  
                  item.name==="এই লিস্টে নেই" ? setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseName:""})) : setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseName:item.name}));
                  setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseMPID:item.MPID}));                  
                  
                }}
             />
            </View>} 
            />            
            </View>
              )}
            </View>   

              
            <View style={{width:"95%"}}>{ShowWriteSpouseName && (
            <View style={{height:100, marginTop:"1%"}}>
            <QuestionContainer
            question={"সদস্যের স্বামী/স্ত্রীর নাম লিস্টে না থাকার কারণে, স্বামী/স্ত্রীর নাম নিচের বক্সে লিখতে হবে।"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=>setSelectedSpouse((SelectedSpouse)=>({...SelectedSpouse, SpouseName:text}))} maxLength={40} placeholder={"স্বামী/স্ত্রীর নাম"} imgLeft={"user"}/></View>} 
            // {(text)=>{setState((state)=>({...state, EnteredUserID:text}))}}
            />
            </View>
            )}
            </View>



            <View style={{height:100, width:"95%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"সদস্যের শিক্ষাগত যোগ্যতা নির্বাচন করুন।"}
            inputField_1={<View style={{width:"70%"}}>
              <DropDown 
                data={Level_of_education} 
                labelField={"label"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={Education}
                onChange={item => {                  
                  SetEducation(item.value);                                    
                }}
             />
            </View>} 
            />
            </View>





            <View style={{height:100, width:"95%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"সদস্যের বর্তমান পেশা"}
            inputField_1={<View style={{width:"50%"}}>
              <DropDown 
                data={Level_of_occupation} 
                labelField={"label"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={Occupation}
                onChange={item => {                  
                  SetOccupation(item.value);                                    
                }}
             />
            </View>} 
            />            
            </View>




            <View style={{height:100, width:"95%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"সদস্যের খানা প্রধানের সাথে সম্পর্ক"}
            inputField_1={<View style={{width:"50%"}}>
              <DropDown 
                data={Level_of_relationship} 
                labelField={"label"}
                valueField={"value"}                
                placeholder={'একটি নির্বাচন করুন'}
                value={Relatioship}
                onChange={item => {                  
                  SetRelatioship(item.value);                                    
                }}
             />
            </View>} 
            />       
            
            </View>



            <View style={{width:"95%"}}>
            {Blood_pressure_60_up && (
            <View style={{height:95, marginTop:"1%"}}>
            <QuestionContainer
            question={"সদস্যের বয়স ৬০ বা তার উপরে আছে, তাই রক্তচাপ পরিমাপ করুন।"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={blood_pressure_measured.bind(this,"yes")} Value={BloodPressureMeasured.radio_1} title={"রক্তচাপ মাপা হয়েছে"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={blood_pressure_measured.bind(this,"no")} Value={BloodPressureMeasured.radio_2} title={"রক্তচাপ মাপা হইনি"}/></View>}
            direction={"row"}
            />
            </View>
            )}
            </View>      





            <View style={{width:"95%"}}>
             {Blood_pressure_not_given &&(
            <View style={{height:160, marginTop:"1%"}}>
            <QuestionContainer
            question={"ব্লাড প্রেশার পরিমাপ না নেয়ার কারন নিচে উল্লেখ করুন।"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={blood_pressure_not_measured.bind(this,"yes")} Value={BloodPressureNotMeasured.radio_1}title={"সদস্য অনুমতি দেননি"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={blood_pressure_not_measured.bind(this,"no")} Value={BloodPressureNotMeasured.radio_2} title={"সদস্য অনুপস্থিত"}/></View>}
            radio_3={<View style={{width:"30%"}}><RadioButton callFunction={blood_pressure_not_measured.bind(this,"nk")} Value={BloodPressureNotMeasured.radio_3} title={"রক্তচাপ মাপার যন্ত্র নাই/নষ্ট"}/></View>}
            direction={"column"}
            />
            </View>
            )}

            </View>    



            


            <View style={{width:"95%"}}>
              {Blood_pressure_count_container &&(
            <View style={{height:100, marginTop:"1%"}}>
            <QuestionContainer
            question={"পরিমাপ করে পাওয়া, সঠিক সিস্টোলিক এবং ডায়াস্টোলিকের পরিমাপ গুলো লিখুন।"}
            inputField_1={<View style={{width:"30%"}}><InputField keyboardType="numeric" getValue={(text)=>{SetBlood_pressure_count((blood_pressure_count)=>({...blood_pressure_count, systolic:text}))}} maxLength={3} placeholder={"সিস্টোলিক"} imgLeft={"pressure"}/></View>}
            inputField_2={<View style={{width:"30%"}}><InputField keyboardType="numeric" getValue={(text)=>{SetBlood_pressure_count((blood_pressure_count)=>({...blood_pressure_count, diastolic:text}))}} maxLength={3} placeholder={"ডায়াস্টোলিক"} imgLeft={"pressure"}/></View>}
            
            direction={"row"}
            />    
            </View>
            )}

            </View>




             <View style={{width:"95%"}}>
             {Blood_pressure_referral &&(
            <View style={{height:95, marginTop:"1%"}}>
            <QuestionContainer
            question={"রক্তচাপ স্বাভাবিক মাত্রার চেয় বেশি আছে। তাই সদস্যকে জকিগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্সে রেফার করুন।"}
            radio_1={<View style={{width:"30%"}}><RadioButton callFunction={blood_pressure_imbalance.bind(this,"yes")} Value={BloodPressureimbalance.radio_1} title={"রাজি হয়েছেন"}/></View>}
            radio_2={<View style={{width:"30%"}}><RadioButton callFunction={blood_pressure_imbalance.bind(this,"no")} Value={BloodPressureimbalance.radio_2} title={"রাজি হননি"}/></View>}
            direction={"row"}
            />
            </View>               
            )}                      
            </View>



              <View style={{width:"30%", paddingBottom:40, marginTop:"2%"}}><CRUD_button callFunction={check_before_save} title={"সেভ মেম্বার"} radious={20}/></View> 

              </View>
              )}
            </View>

            

            

            
            </ScrollView>
    </View>


  )
}
}

export default Add_member
