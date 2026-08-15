import React, { Component, useEffect, useState } from 'react'
import {View, Text, TextInput, Button, Pressable, Image, Alert, Keyboard, TouchableOpacity, Modal } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { openDatabase } from 'react-native-sqlite-storage'
import { check, request, PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Image as ImageCompressor } from 'react-native-compressor'
import CRUD_button from './CRUD_button'
import QuestionContainer from './QuestionContainer'
import RadioButton from './RadioButton'
import Enlarge_image from './Enlarge_image'


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



const Camera_open = (props) => {

  


    const [selectedImage, setSelectedImage] = useState(null);
    const [image_updater, Set_image_updater] = useState(Math.random());
    
    const [profile_picture, set_profile_picture] = useState(true);
    const [howTotakePicture, setHowTotakePicture] = useState(false);

    const[IdCards, setIdCards]=useState({
      radio_1:"no",
      radio_2:"no",
      radio_3:"no",
      radio_4:"no",
      value:""
    });

    // props.document_type
    // props.mem_serial
    // 





    
    const openImagePicker = () => {
        const options={
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 500,
          maxWidth: 500,
          quality:1
        };
        launchImageLibrary(options, handleResponse);
      };
    
      const handleCameraLaunch = () => {
        
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight:500,
          maxWidth:500,
          // saveToPhotos:true
    };
      if(props.document_type==="IDs" && IdCards.value===""){
      Alert.alert("আইডির ধরন","কোন নির্দিষ্ট একটি আইডি কার্ড নির্বাচন করুন।",[{text:"ঠিক আছে", onPress:()=>console.log("ok")}])
      }
      else{


        check(PERMISSIONS.ANDROID.CAMERA).then((res)=>{
          if(res===RESULTS.GRANTED){
            launchCamera(options, handleResponse);
            console.log("WRITE_EXTERNAL_STORAGE granted");
          }
          else{
            Alert.alert("ক্যামেরা ব্যাবহারের জন্য সম্মতি","সার্ভেলেন্সের অ্যাপটি ইন্সটল করার সময় ক্যামেরা ব্যাবহারের জন্য সম্মতি (হ্যাঁ) করা হয়নি। তাই এই ফিচার/অপশন ব্যাবহার করতে পারবেননা। সেটিংস্‌ পরিবর্তনের জন্য আপনার সুপারভাইসারের সাহায্য নিন।",[{text:"ঠিক আছে", onPress:()=>console.log("CANCELED")}])
            console.log("WRITE_EXTERNAL_STORAGE NOT NOT granted");
          }
         });

        
      }
    };


    
      const handleResponse = async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error: ', response.error);
        } else {
          
          let imageUri = await response.uri || response.assets?.[0]?.uri;
          

          if(props.document_type==="profile"){
            await RNFS.moveFile(imageUri,RNFS.DocumentDirectoryPath+"/PRFIMAGES/MEMBER/"+props.mem_serial+".jpg");     
            update_image_database(RNFS.DocumentDirectoryPath+"/PRFIMAGES/MEMBER/"+props.mem_serial+".jpg");
            // setSelectedImage("file://"+RNFS.DocumentDirectoryPath+"/PRFIMAGES/MEMBER/"+props.mem_serial+".jpg");
          }
          else if(props.document_type==="houses"){
            await RNFS.moveFile(imageUri,RNFS.DocumentDirectoryPath+"/PRFIMAGES/HOUSES/"+props.houseno+".jpg");     
            // setSelectedImage("file://"+RNFS.DocumentDirectoryPath+"/PRFIMAGES/HOUSES/"+props.mem_serial+".jpg");
          }
          else if(props.document_type==="IDs"){
            await RNFS.moveFile(imageUri,RNFS.DocumentDirectoryPath+"/PRFIMAGES/IDs/"+IdCards.value+props.mem_serial+".jpg");     
            // setSelectedImage("file://"+RNFS.DocumentDirectoryPath+"/PRFIMAGES/IDs/"+props.mem_serial+".jpg");
          }
          else if(props.document_type==="user"){
            await RNFS.moveFile(imageUri,RNFS.DocumentDirectoryPath+"/PRFIMAGES/USERS/"+props.user+".jpg");     
            // setSelectedImage("file://"+RNFS.DocumentDirectoryPath+"/PRFIMAGES/IDs/"+props.mem_serial+".jpg");
          }
          
          

          Set_image_updater(Math.random());//it helps to update and show image instantly. this state is used in URI of the image tag      
         
        }
      };


      
      const img_path = props.document_type==="profile" ? "/PRFIMAGES/MEMBER/" : props.document_type==="houses" ? "/PRFIMAGES/HOUSES/" : props.document_type==="IDs" ? "/PRFIMAGES/IDs/"+IdCards.value : props.document_type==="user" ? "/PRFIMAGES/USERS/" : "" ;
      const image_file = props.document_type==="profile" ? props.mem_serial : props.document_type==="houses" ? props.houseno : props.document_type==="IDs" ? props.idcard : props.document_type==="user" ? props.user:"";
       

        const [imgAvailable, setImgAvailable] = useState("");
        const show_image=()=>{
          
          const full_image_path = RNFS.DocumentDirectoryPath+img_path+image_file+".jpg";
          RNFS.exists(full_image_path)
          .then((exist)=>{
            if(exist){
              setImgAvailable({uri:("file://"+full_image_path + "?" + image_updater)});
                console.log("exist");
            }else{
              setImgAvailable(require("../img/noimage.png"));
              console.log("not exist");
            }
          }).catch((error)=>{
            console.log(error);
          })
      }
      

        useEffect(()=>{
          show_image()
        },[image_updater, IdCards]);



      


      // const img = (selectedImage===null || selectedImage==="")  ? require("../img/noimage.png") : {uri:("file://"+RNFS.DocumentDirectoryPath+img_path+image_file+".jpg" + "?" + image_updater)};


const close_camera= async (option)=>{
  // props.document_type
  
  // Alert.alert(img_path+"---"+image_file);
  if(option==="delete"){

    const full_image_path = RNFS.DocumentDirectoryPath+img_path+image_file+".jpg";

         await RNFS.exists(full_image_path)
          .then((exist)=>{
            if(exist){
              RNFS.unlink(RNFS.DocumentDirectoryPath+img_path+image_file+".jpg");
              delete_image_database();
            }
          }).catch((error)=>{
            console.log(error);
          }).finally(()=>{
            delete_image_database();
          })

  }
  props.close_container("close");  
  set_profile_picture(false)
}






const type_of_id=(clicked)=>{
  if(clicked==="bc"){
    setIdCards((IdCards)=>({...IdCards, radio_1:"yes"}))
    setIdCards((IdCards)=>({...IdCards, radio_2:"no"}))
    setIdCards((IdCards)=>({...IdCards, radio_3:"no"}))
    setIdCards((IdCards)=>({...IdCards, radio_4:"no"}))
    
    setIdCards((IdCards)=>({...IdCards, value:"BC/"}))

  }else if(clicked==="nid"){
    setIdCards((IdCards)=>({...IdCards, radio_1:"no"}))
    setIdCards((IdCards)=>({...IdCards, radio_2:"yes"}))
    setIdCards((IdCards)=>({...IdCards, radio_3:"no"}))
    setIdCards((IdCards)=>({...IdCards, radio_4:"no"}))

    setIdCards((IdCards)=>({...IdCards, value:"NID/"}))
  }
  else if(clicked==="vc"){
    setIdCards((IdCards)=>({...IdCards, radio_1:"no"}))
    setIdCards((IdCards)=>({...IdCards, radio_2:"no"}))
    setIdCards((IdCards)=>({...IdCards, radio_3:"yes"}))
    setIdCards((IdCards)=>({...IdCards, radio_4:"no"}))

    setIdCards((IdCards)=>({...IdCards, value:"VC/"}))
  }
  else if(clicked==="od"){
    setIdCards((IdCards)=>({...IdCards, radio_1:"no"}))
    setIdCards((IdCards)=>({...IdCards, radio_2:"no"}))
    setIdCards((IdCards)=>({...IdCards, radio_3:"no"}))
    setIdCards((IdCards)=>({...IdCards, radio_4:"yes"}))

    setIdCards((IdCards)=>({...IdCards, value:"OD/"}))
  }

  else{
    //do nothig
  }
}


const [IdCardQuestion, setIdCardQuestion] = useState(false);
const check_id_question_requirement = ()=>{
if(props.document_type==="IDs"){
  setIdCardQuestion(true); 
}else{
  setIdCardQuestion(false); 
}
}
useEffect(()=>{
  check_id_question_requirement()
},[image_updater]);


const [zoom, setZoom] = useState(false);

const openEnlargeContainer=()=>{

  if(imgAvailable!=require("../img/noimage.png")){
    setZoom(true)
  }else{

  }
  
}

const closeEnlargeContainer=(data)=>{
  setZoom(data)
}





const update_image_database = (img)=>{
  db.transaction(function (tx) {
    tx.executeSql(
    "update member set IMG = '"+"file://"+img+"' where Mem_SL = '"+props.mem_serial+"';",
    [],
    function (tx, results){
      console.log("image updated");
    },
    function(tx, error){
    console.log("not updated");
    }
    )
    });
}


const delete_image_database = ()=>{

  if(props.document_type==="profile")
{  db.transaction(function (tx) {
    tx.executeSql(
    "update member set IMG = NULL where Mem_SL = '"+props.mem_serial+"';",
    [],
    function (tx, results){
      console.log("image deleted");
    },
    function(tx, error){
    console.log("not updated");
    }
    )
    });}

}

const openExample=(option)=>{
  setHowTotakePicture(option);
}


  return (


    <View>

<Modal visible={howTotakePicture} transparent={true} animationType="fade">
<View style={{backgroundColor:'rgba(0, 0, 0, 0.8)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
        <View style={{borderRadius:10, backgroundColor:"#f0f0f0", minHeight:"40%", width:"97%", flexDirection:"column", padding:20, alignItems:"center", justifyContent:"space-between"}}>
      <Text style={{color:"#383838"}}>ফটো কিভাবে নিবেন, নিচের তথ্যগুল ভাল করে লক্ষ করুন এবং চেষ্টা করুন, নিচের মত করে ফটো নেয়ার।</Text>

<View style={{width:"100%", justifyContent:"space-between", flexDirection:"row"}}>
        <View style={{alignItems:"center"}}>
          <Image source={require('../img/HowPortrait.png')} style={{height:300, width:200}}/>
          <Text style={{color:"#383838"}}>কোন সদস্যের ফটো নেয়ার জন্য</Text><Text style={{color:"#383838"}}>চেষ্টা করুন উপরের ফটো মত নিতে।</Text>
        </View>

        <View style={{alignItems:"center"}}>
          <Image source={require('../img/HowNID.png')} style={{height:300, width:200}}/>
          <Text style={{color:"#383838"}}>কোন ডকুমেন্টের ফটো নেয়ার জন্য</Text><Text style={{color:"#383838"}}>চেষ্টা করুন উপরের ফটো মত নিতে।</Text>
        </View>

        <View style={{alignItems:"center"}}>
          <Image source={require('../img/HowHH.png')} style={{height:300, width:200}}/>
          <Text style={{color:"#383838"}}>খানার ফটো নেয়ার জন্য</Text><Text style={{color:"#383838"}}>চেষ্টা করুন খানাকে ডানদিকে রাখতে।</Text>
        </View>

        </View>


        <TouchableOpacity onPress={openExample.bind(this,false)}>
        <Text style={{color:"#4b61b8", lineHeight:40, marginTop:20}}>
          আমি বুঝতে পারছি
        </Text>
        </TouchableOpacity>


        </View>
</View>
</Modal>

      
        <Modal visible={profile_picture} transparent={true} animationType="fade">
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.8)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
        <View style={{borderRadius:10, backgroundColor:"#f0f0f0", minHeight:"35.5%", width:"60%", flexDirection:"column", padding:5, alignItems:"center"}}>
       
        <Text style={{fontSize:12, color:"#292929", marginTop:10}}>বিঃদ্র ফটো নেয়ার সময়, যাকে বা যে বস্তুকে উদ্দেশ করে তুলছেন। তাকে ক্যামেরার স্ক্রীনে মধ্যখানে রাখার চেষ্টা করুন।</Text>
        <TouchableOpacity onPress={openExample.bind(this,true)} style={{alignSelf:"flex-end", marginRight:20}}><Text style={{fontSize:12, color:"#b80606"}}>  ফটো কিভাবে তুলব</Text></TouchableOpacity>
        
        <TouchableOpacity onPress={openEnlargeContainer}>
        <Image  source={imgAvailable} style={{height:230,  marginTop:20, borderRadius:20, aspectRatio: 2, resizeMode: 'cover'}}/>
        </TouchableOpacity>
        
      <View style={{width:"40%", marginTop:10}}>
      <CRUD_button callFunction={handleCameraLaunch} title={"ক্যামেরা"} radious={30}/>
      </View>

      <View style={{width:"100%"}}>
             {IdCardQuestion &&(
            <View style={{height:260, marginTop:"5%"}}>
            <QuestionContainer
            question={"কোন ধরনের আইডির জন্য ফটো নিতে চাচ্ছেন? নিচের অপশন থেকে যে কোন একটি নির্বাচন করুন। প্রত্যেকটির জন্য একটি করে ফটো নিতে পারবেন। অথবা ছবি যদি নেয়া থাকে, নিচের অপশন থেকে যেকোন অপশন নির্বাচন করে, ছবির মধ্যে একবার ক্লিক করলে, ছবিটি বড় করে দেখতে পারবেন।"}
            radio_1={<View style={{width:"70%"}}><RadioButton callFunction={type_of_id.bind(this,"bc")} Value={IdCards.radio_1} title={"জন্ম নিবন্ধন সার্টিফিকেট"}/></View>}
            radio_2={<View style={{width:"70%"}}><RadioButton callFunction={type_of_id.bind(this,"nid")} Value={IdCards.radio_2}title={"ন্যাশনাল আইডি কার্ড (NID)"}/></View>}
            radio_3={<View style={{width:"70%"}}><RadioButton callFunction={type_of_id.bind(this,"vc")} Value={IdCards.radio_3} title={"টিকা কার্ড"}/></View>}            
            radio_4={<View style={{width:"70%"}}><RadioButton callFunction={type_of_id.bind(this,"od")} Value={IdCards.radio_4} title={"অন্যান্য ডকুমেন্টস"}/></View>}
            direction={"column"}
            />
            </View>
            
             )} 

            </View> 
        
        
        <View style={{ marginTop:20, width:"100%", flexDirection:"row", justifyContent:"space-around"}}>

        <TouchableOpacity onPress={close_camera.bind(this,"delete")}>
        <Text style={{color:"#ed3444", lineHeight:40}}>
        কোন ফটো প্রয়োজন নেই
        </Text>
        </TouchableOpacity>



        <TouchableOpacity onPress={close_camera.bind(this,"keep")}>
        <Text style={{color:"#4b61b8", lineHeight:40}}>
       বর্তমান ফটো ঠিক আছে
        </Text>
        </TouchableOpacity>

        
        </View>



        </View>
</View>
</Modal>


{zoom && (
<Enlarge_image imagePath = {"file://"+RNFS.DocumentDirectoryPath+img_path+image_file+".jpg"} closeEnlarge = {closeEnlargeContainer}/>
)}      

</View>

     


  )
}

export default Camera_open;

