import React, { useEffect, useState } from 'react'
import { View, Text, Alert, FlatList, TouchableHighlight, Image, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ButtonBottom from  '../components/ButtonBottom';
import { openDatabase } from 'react-native-sqlite-storage';
// import Block_list_data from '../components/Block_list_data';
import Bari_list_data from '../components/Bari_list_data';
import moment from 'moment';
import Code_7_bubble from '../components/Code_7_bubble';

import CRUD_button from '../components/CRUD_button'
import InputField from '../components/InputField'
import Date_field from '../components/Date_field'
import DatePicker from 'react-native-date-picker'
// import { Dropdown } from 'react-native-element-dropdown'
import DropDown from '../components/DropDown';
import QuestionContainer from '../components/QuestionContainer'
import RadioButton from '../components/RadioButton'
import { passValueToSidebar } from '../components/SideBar_values';





// var db = Database.getConnection();

const db = openDatabase(
{
  name: 'prf.db',
  location: 'default',
  //createFromLocation:"/storage/emulated/0/103_prf.db"
},
()=>{console.log("Database OK.....")},
error=>{Alert.alert("Database ERROR!!!!!!")}
);



const New_bari_reg = (props) => {

  useEffect(()=>{
    passValueToSidebar(props.userID, true, props.componentId);
  },[]);

  // name:props.name,
  // userID:props.userID,
  // password:props.password,
  // cluster:props.cluster,
  // roundNo:props.roundNo,
  // block:props.block

  const[bariName, setBariName] = useState("");
  const[villageList, setVillageList] = useState([]);
  
  const[village, setVillage] = useState({
      villageName:"",
      villageCode:""
  });

  


  const get_village_list=()=>{
    setNewBariNumber("");
    setVillage((village)=>({...village, villageName:""}))
    setVillage((village)=>({...village, villageCode:""}))
    



    db.transaction(tx=>{
      tx.executeSql(
      "select village, villageName from clusterDiv where cluster = '"+props.cluster+"' and block = '"+props.block+"' group by village ",
      [],
      (tx, result)=>{
      var length = result.rows.length;    
      var results = []
      if(length>0){
        for(let i= 0; i<length; i++){
          var villageCode = result.rows.item(i).village; 
          var villageName = result.rows.item(i).villageName; 
          results.push({villageCode:villageCode,villageName:villageName})           
        }
        setVillageList(results);
        }
        else{
          //nothig to do
        }

      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });

  }


  useEffect(()=>{
    get_village_list();
  },[]);





  const[newBariNumber, setNewBariNumber] = useState("");

  const[upazila, setUpazila] = useState("");
  const[union, setunion] = useState("");


  const new_bari_number=()=>{

    setNewBariNumber("");

    db.transaction(tx=>{
      tx.executeSql(
      "select max(cast(bari as INT)) + 1 'NextBariCode', upazila, union_code from clusterDiv where cluster = '"+props.cluster+"' and village = '"+village.villageCode+"' ",
      [],
      (tx, result)=>{
      var length = result.rows.length;    
      
      if(length>0){
        
        for(let i= 0; i<length; i++){

          if(result.rows.item(i).NextBariCode===null && village.villageCode!==""){
            Alert.alert("নতুন বাড়ি","নতুন বাড়ির সঠিক কোন নাম্বার স্বয়ংক্রিয় ভাবে আসছে না। অনুগ্রহ করে আবার পিছনে গিয়ে, আবার নতুন করে এই ফর্মএ আসুন।",[{text:"ঠিক আছে"}]);     
          }else{
            setNewBariNumber(((result.rows.item(i).NextBariCode).toString()).length===1 ? "00"+(result.rows.item(i).NextBariCode).toString() : ((result.rows.item(i).NextBariCode).toString()).length===2 ? "0"+(result.rows.item(i).NextBariCode).toString(): (result.rows.item(i).NextBariCode).toString());
            setUpazila(result.rows.item(i).upazila);
            setunion(result.rows.item(i).union_code);
          }                     
        }
        }
        else{
          Alert.alert("নতুন বাড়ি","নতুন বাড়ির সঠিক কোন নাম্বার স্বয়ংক্রিয় ভাবে আসছে না। অনুগ্রহ করে আবার পিছনে গিয়ে, আবার নতুন করে এই ফর্মএ আসুন।",[{text:"ঠিক আছে"}]);     
        }

      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });

  }




  useEffect(()=>{
    new_bari_number()
  },[village]);


  const[landmark, setLandmark] = useState("");




  const check_before_save=()=>{
    if(bariName==""){
      Alert.alert("বাড়ির নাম","বাড়ির একটি সঠিক নাম লিখুন",[{text:"ঠিক আছে"}]);     
    }
    else if(village.villageCode=="" || village.villageName=="" || isNaN(village.villageCode)){
      Alert.alert("গ্রাম","গ্রামের লিস্ট থেকে সঠিক গ্রাম নির্বাচন করুন।",[{text:"ঠিক আছে"}]);     
    }
    else if(newBariNumber=="" || ((newBariNumber).toString()).length!=3 || isNaN(newBariNumber)){
      Alert.alert("নতুন বাড়ির নং","বাড়ির কোন সঠিক নাম্বার আসেনি। আবার চেষ্টা করুন।",[{text:"ঠিক আছে"}]);     
    }
    else if(landmark==""){
      Alert.alert("ল্যান্ডমার্ক","নতুন বাড়ির সঠিক কোন ল্যান্ডমার্ক উল্লেখ করুন।",[{text:"ঠিক আছে"}]);     
    }
    else if(union=="" || upazila=="" || isNaN(union) || isNaN(upazila)){
      Alert.alert("ইউনিয়ন/উপজিলা","ইউনিয়ন/উপজিলা নাম্বার সঠিকভাবে লোড হচ্ছে না। পিছনে গিয়ে, আবার নতুন করে এই ফর্মএ আসুন।",[{text:"ঠিক আছে"}]);     
    }
    else{
      Alert.alert("নতুন বাড়ি রেজিস্ট্রেশান", "আপনি কি নিশ্চিত বাড়ির এই তথ্য গুল সঠিক? যদি সব তথ্য সঠিক থাকে এবং এই নতুন বাড়ি যোগ করতে চান, তাহলে (সেভ নতুন বাড়িতে ক্লিক করুন।)",[{text:"তথ্য সঠিক নয়", onPress:()=>console.log("CANCELED")},{text:"সেভ নতুন বাড়ি", onPress:()=>save_new_bari()}])
    }
  }


  const save_new_bari=()=>{

    Keyboard.dismiss();

    db.transaction(tx=>{
      tx.executeSql(
      "insert or ignore into Bari (VILLAGE_CODE, BARI_CODE, BARI_NAME, landmark, lat, lon, CSTATUS, UserID) values("+
"'"+village.villageCode+"',"+
"'"+newBariNumber+"',"+
"'"+bariName+"',"+
"'"+landmark+"',"+
"'"+"000"+"',"+
"'"+"000"+"',"+
"'1',"+
"'"+props.userID+"'"+")",
      [],
      (tx, result)=>{
        if(result.rowsAffected>0){          
          save_to_cl_div();
        }else{
          Alert.alert("ডাটা সেভ হইনি", "দুঃখিত, আপনার দেয়া নতুন বাড়ির তথ্য কোন কারনে সেভ হইনি। ফর্ম থেকে বের হয়ে, আবার চেষ্টা করুন।",[{text:"ঠিক আছে"}])
        }        
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });

}



const save_to_cl_div=()=>{
  db.transaction(tx=>{
    tx.executeSql(
    "insert or ignore into clusterDiv (cluster, block, upazila, union_code, village, villageName, bari, bariName, landmark, lat, lon, cStatus, UserID) values("+
"'"+props.cluster+"',"+
"'"+props.block+"',"+
"'"+upazila+"',"+
"'"+union+"',"+
"'"+village.villageCode+"',"+
"'"+village.villageName+"',"+
"'"+newBariNumber+"',"+
"'"+bariName+"',"+
"'"+landmark+"',"+
"'"+"000"+"',"+
"'"+"000"+"',"+
"'1',"+
"'"+props.userID+"'"+")",
    [],
    (tx, result)=>{
      if(result.rowsAffected>0){          
        Alert.alert("ডাটা সেভ", "ধন্যবাদ, আপনার দেয়া তথ্য সফলভাবে সেভ হয়েছে। এখন (ঠিক আছে) বাটনে ক্লিক করে এই নতুন বাড়ির ভিতরে যান। বাড়িতে যাওয়ার পর (+) বাটনে ক্লিক করে নতুন খানা তৈরী করুন।",[{text:"ঠিক আছে", onPress:()=>go_to_inside_bari()}])
      }else{
        Alert.alert("ডাটা সেভ হইনি", "দুঃখিত, আপনার দেয়া নতুন বাড়ির তথ্য কোন কারনে সেভ হইনি। ফর্ম থেকে বের হয়ে, আবার চেষ্টা করুন।",[{text:"ঠিক আছে"}])
      }        
    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });

}


  const go_to_inside_bari=()=>{

    
  
    Navigation.push(props.componentId,{
      component:{
        name:"Khana_list_page",
        passProps:{
          name:props.name,
          userID:props.userID,
          password:props.password,
          cluster:props.cluster,
          roundNo:props.roundNo,
          block:props.block,
          bari:newBariNumber,
          bariName:bariName,
          villageCode:village.villageCode,
          villageName:village.villageName
  
        },
  
        options:{
          topBar:{
            visible:true,
            title:{
              text:"খানা লিস্ট"
            },
            rightButtons:[
            //   {
            //   component:{
            //     name:"BackButton",
            //     passProps:{
            //       originComponentId: props.componentId,
            //       position:"Khana_list_page",
            //       backButtonText:"বাড়ি লিস্ট",
            //       name:props.name,
            //       userID:props.userID,
            //       password:props.password,
            //       cluster:props.cluster,
            //       roundNo:props.roundNo,
            //       block:props.block
            //     }
            //   }
    
              
            // }
          ]
            
          }
        }
  
  
      }
    })
    
  
  }
  

  
    
  return (
<View style={{width:"100%", flex:100, flexDirection:"column"}}>
      <View style={{width:"100%", alignItems:"center"}}>
      <View style={{marginTop:"1%",height:"auto", width:"98%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                নতুন বাড়ি রেজিস্ট্রেশান                
              </Text>
              
              <Text style={{fontSize:12, color:"#404040"}}>
              
                  বিঃদ্রঃ নতুন বাড়ি রেজিস্ট্রেশানের ক্ষত্রে, প্রথমে সব তথ্য যাচাই করুন, তারপর নতুন বাড়ি যোগ করুন। বাড়ি যোগ করার পর, বাড়ি ডিলিট দিতে পারবেননা। সে ক্ষেত্রে, আপনার সুপারভাইসারের সাথে যোগাযোগ করতে হবে।
              </Text>
            </View>





            <View style={{height:100, width:"98%", marginTop:"1%"}}>
            <QuestionContainer
            question={"বাড়ির একটি সঠিক নাম লিখুন।"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=> setBariName(text)} value={bariName} maxLength={40} placeholder={"বাড়ির নাম"} imgLeft={"home"}/></View>} 
            />
            </View>



            <View style={{height:100, width:"98%", marginTop:"1%"}}>              
            <QuestionContainer
            question={"গ্রামের নাম নির্বাচন করুন।"}
            inputField_1={<View style={{width:"50%"}}>
              <DropDown 
                data={villageList} 
                labelField={"villageName"}
                valueField={"villageCode"}
                placeholder={'একটি নির্বাচন করুন'}
                // value={SelectedFather.FatherName} 
                onChange={item => {                  
                  setVillage((village)=>({...village, villageName:item.villageName}))
                  setVillage((village)=>({...village, villageCode:item.villageCode}))
                }}
             />
            </View>} 
            />
            </View>




            <View style={{height:100, width:"98%", marginTop:"1%"}}>
            <QuestionContainer
            question={"নতুন বাড়ির নাম্বার।"}
            inputField_1={<View style={{width:"50%"}}><InputField  value={newBariNumber} maxLength={40} placeholder={"নতুন বাড়ির নাম্বার"} imgLeft={"newhome"} readOnly={false}/></View>} 
            direction={"column"}
            
            />
            </View>



            <View style={{height:100, width:"98%", marginTop:"1%"}}>
            <QuestionContainer
            question={"ল্যান্ডমার্ক(বাড়ির পাশে কোন প্রতিষ্ঠান, মসজিদ, মন্দির, গির্জা, স্কুল, কলেজের নাম বা পাশের বাড়ির নাম)।"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=> setLandmark(text)} value={landmark} maxLength={60} placeholder={"ল্যান্ডমার্ক"} imgLeft={"landmark"}/></View>} 
            />

            </View>


            <View style={{width:"30%", paddingBottom:40, marginTop:"5%"}}><CRUD_button callFunction={check_before_save} title={"সেভ নতুন বাড়ি"} radious={20}/></View> 


            </View>






            </View>

         
  )
}

export default New_bari_reg
