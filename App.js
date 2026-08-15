import React, { Component, useEffect, useState } from 'react';
import {KeyboardAvoidingView, TouchableWithoutFeedback, View, Text, TextInput, Button, Pressable, Image, Alert, Keyboard, TouchableOpacity } from 'react-native';
import InputField from './components/InputField';
import { Navigation } from 'react-native-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import { request, PERMISSIONS, requestMultiple, RESULTS, check } from 'react-native-permissions';
import CRUD_button from './components/CRUD_button';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Image as ImageCompressor } from 'react-native-compressor';
import NewUser from './components/NewUser';
import ForgetPassword from './components/ForgetPassword';
import Version from './components/Version';

// import Camera_open from './components/Camera_open';
// import image_compressor from './components/image_compressor'
// import b from './Database'



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


// db.transaction(function (tx) {
//   tx.executeSql(
//   "drop TABLE CurrentUser",
//   [],
//   function (tx, results){
//     console.log("droped")
//   },
//   function(tx, error){
//   console.log("Error while creating table "+ error.message);
//   }
//   )
//   });

// db.transaction(function (tx) {
//   tx.executeSql(
//   "CREATE TABLE if not exists AdminUser (name text, userID text primary key, password text)",
//   [],
//   function (tx, results){
//     console.log("AdminUser");
//   },
//   function(tx, error){
//   console.log("Error while creating table "+ error.message);
//   }
//   )
//   });



  // db.transaction(function (tx) {
  //   tx.executeSql(
  //   "insert or ignore into AdminUser(name, userID, password) values('Administrator', '23646', '818456')",
  //   [],
  //   function (tx, results){
  //     console.log("AdminUser inserted");
  //   },
  //   function(tx, error){
  //   console.log("Error while creating table "+ error.message);
  //   }
  //   )
  //   });


  // db.transaction(function (tx) {
  //   console.log("alter")
  //   tx.executeSql(
  //   "ALTER TABLE member ADD IMG varchar(200) NULL",
  //   [],
  //   function (tx, results){
  //     console.log("ALTER TABLE member");
  //   },
  //   function(tx, error){
  //   console.log("Error while creating table "+ error.message);
  //   }
  //   )
  //   });



  







const App = (props) => {







    const [state, setState]=useState({
        EnteredUserID:"",
        EnteredUserPassword:"",
        
    })



    


    const check_admin_table_existance=(tableName)=>{
      return new Promise((resolve, reject)=>{

        db.transaction(
          function(tx){
          tx.executeSql(
          "select name from sqlite_master WHERE type='table' AND name='"+tableName+"' ",
          [],
          function(tx, result){
          
          let length = result.rows.length;
          if(length > 0){  
            resolve(true);
            console.log("exist");
          }else{
            resolve(false);
            console.log("not exist!!!");
          }
          
      },
          function(tx, error){
          console.log("add data error: "+ error.message);
          reject("add data error: "+ error.message)
          });
          })
        

      });
    }

    

    

   const login= async()=>{

    // b.abc();
    let userID = state.EnteredUserID;
    let userPass = state.EnteredUserPassword;
    // let running_round = roundNo.running_round_no;

    
    if(userID==="23646"){
 
      const checkTAbleExistance =  await check_admin_table_existance("AdminUser");''
      try{
      
      if(checkTAbleExistance){  
      db.transaction(
        function(tx){
        tx.executeSql(
        "select * from AdminUser where userID='"+userID+"' and password = '"+userPass+"' ",
        [],
        function(tx, result){
        
        var lengt = result.rows.length, i;
        
        if(lengt>0){      
        for ( i=0; i<lengt; i++){        
          
         if(userID===result.rows.item(i).userID && userPass===result.rows.item(i).password){
  
          Keyboard.dismiss();
  
          let u = (result.rows.item(i).userID);
          let n = (result.rows.item(i).name);
          let c = (result.rows.item(i).cluster);
          let img = "imagepath";
  
          Navigation.push(props.componentId,{
            component:{
              name:"AdminPanel",
              passProps:{
               userID:userID,
               password:userPass, 
               name:result.rows.item(i).name,
              },
              options:{
            
  
                topBar:{
                  visible:true,
                  title:{
                    text:""
                  },
                  rightButtons:[{
                    // id:"backbutton",
                    component:{
                      name:"BackButton",
                      passProps:{
                        originComponentId: props.componentId,
                        position:"Home",
                        backButtonText:"লগ আউট"
                      }
                    }
          
                    
                  }]
                  
                }
              }
  
  
            }
          })
          }       
        }
  
      }
      else{
        Alert.alert("উইজারের তথ্য ভুল","আপনার দেয়া তথ্য ভুল হয়েছে, সঠিক তথ্য দিয়ে লগইন বাটনে ক্লিক করুন।")
       }
  
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        })
      }else{
        if(userID==="23646" && userPass==="818456"){
          Keyboard.dismiss();
          Navigation.push(props.componentId,{
            component:{
              name:"AdminPanel",
              passProps:{
               userID:userID,
               password:userPass, 
               name:"Administrator",
              },
              options:{
            
  
                topBar:{
                  visible:true,
                  title:{
                    text:""
                  },
                  rightButtons:[{
                    // id:"backbutton",
                    component:{
                      name:"BackButton",
                      passProps:{
                        originComponentId: props.componentId,
                        position:"Home",
                        backButtonText:"লগ আউট"
                      }
                    }
          
                    
                  }]
                  
                }
              }
  
  
            }
          })

        }
      }


      }catch(error){
        console.log(error);
      }

    }
    else{ 
    await db.transaction(
      function(tx){
      tx.executeSql(
      "select * from user where userID='"+userID+"' and password = '"+userPass+"'",
      [],
      function(tx, result){
      
      var lengt = result.rows.length, i;
      
      if(lengt>0){      
      for ( i=0; i<lengt; i++){        
        
       if(userID===result.rows.item(i).userID && userPass===result.rows.item(i).password){

        Keyboard.dismiss();

        let u = (result.rows.item(i).userID);
        let n = (result.rows.item(i).name);
        let c = (result.rows.item(i).cluster);
        let img = "imagepath";

        Navigation.push(props.componentId,{
          component:{
            name:"Home",
            passProps:{
             userID:userID,
             password:userPass, 
             name:result.rows.item(i).name,
             cluster:result.rows.item(i).cluster
            },
            options:{
          

              topBar:{
                visible:true,
                title:{
                  text:""
                },
                rightButtons:[{
                  // id:"backbutton",
                  component:{
                    name:"BackButton",
                    passProps:{
                      originComponentId: props.componentId,
                      position:"Home",
                      backButtonText:"লগ আউট"
                    }
                  }
        
                  
                }]
                
              }
            }


          }
        })
        }       
      }

    }
    else{
      Alert.alert("উইজারের তথ্য ভুল","আপনার দেয়া তথ্য ভুল হয়েছে, সঠিক তথ্য দিয়ে লগইন বাটনে ক্লিক করুন।")
     }

      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });

    }

     }


  

  




  //    const onShare = async () => {


       
  //      let path = RNFS.ExternalStorageDirectoryPath+"/103_prf.db";
  //      if(RNFS.exists(path)){
  //       // await RNFS.moveFile(path, RNFS.DocumentDirectoryPath+"/103_prf.db");             
  //       await RNFS.moveFile(path, RNFS.DocumentDirectoryPath+"/PRFIMAGES/USERS/103_prf.jpg");     
  //        Alert.alert(RNFS.ExternalStorageDirectoryPath+"/103_prf.db");
        
         
  //      }
  //      else{
  //       Alert.aler("no");
  //      }




  //  }


   useEffect(()=>{
    requestMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO
      
    ]).then((result)=>{
      result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
      result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];
      result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
      result[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES];
      result[PERMISSIONS.ANDROID.CAMERA];
      result[PERMISSIONS.ANDROID.RECORD_AUDIO];
      
    })
   },[])



  //  useEffect(()=>{
  //   check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((res)=>{
  //     if(res===RESULTS.GRANTED){
  //       console.log("READ_EXTERNAL_STORAGE granted");
  //     }
  //    })
  //    check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((res)=>{
  //     if(res===RESULTS.GRANTED){
  //       console.log("WRITE_EXTERNAL_STORAGE granted");
  //     }
  //    });
  //  },[])
   

//    const [selectedImage, setSelectedImage] = useState(null);
//    const [image_updater, Set_image_updater] = useState(Math.random());

//    const openImagePicker = () => {
//     const options={
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 700,
//       maxWidth: 700,
//       quality:1
//     };
//     launchImageLibrary(options, handleResponse);
//   };

//   const handleCameraLaunch = () => {
    
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight:700,
//       maxWidth:700,
//       // saveToPhotos:true
// };
//     launchCamera(options, handleResponse);
//   };

//   const handleResponse = async (response) => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('Image picker error: ', response.error);
//     } else {
      
//       let imageUri = await response.uri || response.assets?.[0]?.uri;
//       await RNFS.moveFile(imageUri,RNFS.DocumentDirectoryPath+"/PRFIMAGES/MEMBER/salma9.jpg");     
//       setSelectedImage("file://"+RNFS.DocumentDirectoryPath+"/PRFIMAGES/MEMBER/salma9.jpg");
//       Set_image_updater(Math.random());//it helps to update and show image instantly. this state is used in URI of the image tag      
//     }
//   };



  // Alert.alert(RNFS.ExternalDirectoryPath);


  RNFS.exists(RNFS.DocumentDirectoryPath + "/PRFIMAGES/MEMBER")
  .then(exists => {
    if (!exists) {
      RNFS.mkdir(RNFS.DocumentDirectoryPath + "/PRFIMAGES/MEMBER")
        .then(() => {
          return RNFS.mkdir(RNFS.DocumentDirectoryPath + "/PRFIMAGES/HOUSES");          
        })
        // .then(() => {
        //   return RNFS.mkdir(RNFS.DocumentDirectoryPath + "/PRFIMAGES/IDs");
        // })
        .then(() => {
          return RNFS.mkdir(RNFS.DocumentDirectoryPath + "/PRFIMAGES/IDs/BC");
        })
        .then(() => {
          return RNFS.mkdir(RNFS.DocumentDirectoryPath + "/PRFIMAGES/IDs/NID");
        }).then(() => {
          return RNFS.mkdir(RNFS.DocumentDirectoryPath + "/PRFIMAGES/IDs/VC");
        }).then(() => {
          return RNFS.mkdir(RNFS.DocumentDirectoryPath + "/PRFIMAGES/IDs/OD");
        }).then(() => {
          return RNFS.mkdir(RNFS.DocumentDirectoryPath + "/PRFIMAGES/USERS");
        })        
        .catch(error => {
          console.error("Error creating HOUSES directory:", error);
        });
    } else {
      //nothing  to do
    }
  })
  .catch(error => {
    console.error("Error checking MEMBER directory existence:", error);
  });



  // // Alert.alert(RNFS.DocumentDirectoryPath);

  // if(!(RNFS.exists(RNFS.DocumentDirectoryPath+"/PRFIMAGES/MEMBER"))){
  //   RNFS.mkdir(RNFS.DocumentDirectoryPath+"/PRFIMAGES/MEMBER")
  //   RNFS.mkdir(RNFS.DocumentDirectoryPath+"/PRFIMAGES/HOUSES")
  // }else{
  //   Alert.alert("ex");
  // }
  

  //  const show_image=()=>{
  //   Alert.alert(selectedImage);
  //  }



  //  const [camera_container, set_camera_container] = useState(false);


  //  const handle_image=(data)=>{
  //   set_camera_container(false);
  //   setSelectedImage(data);    
  // }



  //  const camera_container_show=()=>{
  //   set_camera_container(false)
  //  }

   const [newUserContainer, setNewUserContainer] = useState(false);
   const open_new_user=()=>{
    setNewUserContainer(true);
   }




  
  //  console.log("DownloadDirectoryPath----"+RNFS.DownloadDirectoryPath);


   RNFS.exists(RNFS.DownloadDirectoryPath + "/DataBackup")
  .then(exists => {
    if (!exists) {
      RNFS.mkdir(RNFS.DownloadDirectoryPath + "/DataBackup")
    }}).catch(error => {
      console.error("Error checking MEMBER directory existence:", error);
    });


  //  const onShare=()=>{
  //   const full_path = RNFS.DownloadDirectoryPath + "/DataBackup/prf.db";

  //   RNFS.exists(full_path)
  //   .then((exist)=>{
  //     if(exist){
  //         // RNFS.moveFile(full_path, RNFS.DocumentDirectoryPath+"/files/prf_new.db");
  //         // console.log("exist"+RNFS.DocumentDirectoryPath);
  //         console.log(RNFS.DocumentDirectoryPath+"/../"+"databases");
        
  //     }else{

  //       console.log("not exist");

  //     }
  //   }).catch((error)=>{
  //     console.log(error);
  //   })

  // }

  const closeNewUser=()=>{
    setNewUserContainer(false);
  }


  const closeForgetPassword=()=>{
    setForgetPasswordContainer(false);
  }
  


  const[forgetPasswordContainer, setForgetPasswordContainer] = useState(false);
  const open_forget_password=()=>{
    setForgetPasswordContainer(true);
   }

  return (
    
    // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:2}}>
    <View style={{justifyContent:"center", height:"100%", backgroundColor:"#f0f0f0"}}>
    <View style={{ height:750, alignItems:"center", justifyContent:"space-evenly", flexDirection:"column"}}>


      <View style={{alignItems:"center", justifyContent:"center"}}>
        <Image source= {require("./img/logo.png")} style={{height:180, width:180, elevation:2}} />
        {/* <Button title="export" onPress={onShare}/> */}
      </View>

      <View style={{width:"65%",  alignItems:"center"}}>
        <Text style={{color:"#404040", fontSize:15, fontWeight:"bold"}}>
          প্রজন্ম সার্ভেলেন্স সিস্টেম
        </Text>
      </View>





      <View style={{width:"65%", height:40}}>
        <InputField placeholder={"ইউজার আইডি"} imgLeft={"user"} getValue ={(text)=>{setState((state)=>({...state, EnteredUserID:text}))}} keyboardType="numeric"/>        
      </View>



      <View style={{width:"65%", height:40}}>
      <InputField placeholder={"পাসওয়ার্ড"} secureText={true} imgLeft={"lock"} getValue ={(text)=>{setState((state)=>({...state, EnteredUserPassword:text}))}} keyboardType="numeric"/> 
      {/* {(text)=>{setState({EnteredUserPassword:text})}}              */}
      </View>


      

      
      

      <View style={{width:"35%"}}>
      <CRUD_button callFunction={login} title={"লগইন"} radious={30}/>
      </View>




      <View style={{width:"30%", height:"10%", alignItems:"center", justifyContent:"space-between", flexDirection:"row"}}>
      
      <TouchableOpacity onPress={open_forget_password} style={{alignItems:"center", justifyContent:"center"}}>
        <Text style={{color:"red"}}>পাসওয়ার্ড মনে নেই</Text>
       </TouchableOpacity>

       <Text style={{color:"#AAA"}}>|</Text>

       <TouchableOpacity onPress={open_new_user} style={{alignItems:"center", justifyContent:"center"}}>
        <Text style={{color:"#4269f5", fontWeight:"bold"}}>নতুন ইউজার</Text>
       </TouchableOpacity>

      </View>



      <View style={{ width:"100%", alignItems:"center"}}>
      <TouchableOpacity>

        <Version color={"#666666"}/>

        </TouchableOpacity>

        {/* <TouchableOpacity onPress={camera_container_show}>
        <Text>Camera</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={openImagePicker}>
          <Text>
            photo
          </Text>
        </TouchableOpacity> */}

        

        </View>



{newUserContainer && (
<NewUser closeNewUser={closeNewUser}/>
)}

{forgetPasswordContainer && (
<ForgetPassword closeForgetPassword={closeForgetPassword}/>
)}




          {/* <View>
        <Image
          source={{uri:selectedImage}}
          style={{height:200, width:260}}
          resizeMode="contain"
        />

        </View> */}
        
        {/* {camera_container &&(
        <Camera_open image_location={handle_image}/>
      )} */}




    </View>
    </View>


    
  )
}



export default App
