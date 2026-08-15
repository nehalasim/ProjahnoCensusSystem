import React, { Component, useState } from 'react'
import {Linking, ActivityIndicator, View, Text, Image, Touchable, TouchableHighlight,TouchableOpacity, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import moment from 'moment';
import { err } from 'react-native-svg';
import Check_whatsApp from './Check_whatsApp';
import { openDatabase } from "react-native-sqlite-storage";

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


const ButtonBottom = (props) => {

  const[whatsAppNumberContainer, setWhatsAppNumberContainer]=useState(false);
  const[whatsAppNo, setWhatsAppNo] = useState("");


  const go_to_home=()=>{
    if((parseInt(props.surveyStarted_1) !==1 && parseInt(props.surveyStarted_2)!==1) && props.mwra_visit!="yes" && props.newBari!=true){
    Navigation.push(props.componentId,{
                component:{
                  name:"Home",
                  passProps:{
                    userID:props.userID,
                    password:props.password, 
                    name:props.name,
                    cluster:props.cluster
                  },
                  options:{
                    
                    topBar:{
                      visible:true,
                      title:{
                        text:""
                      },
                      rightButtons:[{
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
              })}else{
                Alert.alert("সার্ভে ভিজিট","আপনি ইতিমধ্যে, সার্ভে ভিজিট শুরু করেছেন। তাই এই মুহূর্তে অন্য কোন অপশনএ প্রবেশ করতে পারবেননা। তাই অনুগ্রহ করে, সার্ভে ভিজিট সম্পূর্ণ করুন।",[{text:"ঠিক আছে"}]);    
              }
  }
  




  const [disabled_hardbackup, setDisabled_hardbackup] = useState(false);

  const hard_backUP = async () => {

    const rand = Math.random().toFixed(4);  
    const backupDir = `${RNFS.DownloadDirectoryPath}/PRF_DataBackup`;
    const backupDirDate = `${RNFS.DownloadDirectoryPath}/PRF_DataBackup/PRF_${moment().format("YYYY-MM-DD")}`;
    const backupDirMain = `${RNFS.DownloadDirectoryPath}/PRF_DataBackup/PRF_${moment().format("YYYY-MM-DD")}/PRF_${rand}`;
    const backupDirMain_Images = `${RNFS.DownloadDirectoryPath}/PRF_DataBackup/PRF_${moment().format("YYYY-MM-DD")}/PRF_${rand}/PRFIMAGES`;
    const srcFilePath = `${RNFS.DocumentDirectoryPath}/../databases/prf.db`;
    const destFilePath = backupDirMain+"/prf.db";
    
    const ImageFolder = `${RNFS.DocumentDirectoryPath}/PRFIMAGES`;

    
  
  setDisabled_hardbackup(true);
  setLoading(true);

  RNFS.exists(backupDirDate)
      .then(exists=>{
        if(exists){
          RNFS.unlink(backupDirDate);
        }
      })

    RNFS.exists(backupDir)
    .then(exists=>{
      if(!exists){
        RNFS.mkdir(backupDir);
      }
    }).then(()=>{
      RNFS.mkdir(backupDirDate);           
    }).then(()=>{
      RNFS.mkdir(backupDirMain);
    }).then(()=>{
      RNFS.copyFile(srcFilePath, destFilePath)
    }).then(()=>{
      RNFS.mkdir(backupDirMain_Images);
    }).then(()=>{
      setTimeout(()=>{
        backup_PRF_Images(ImageFolder, backupDirMain_Images)
      },2000);
    }).catch((err)=>{
      setDisabled_hardbackup(false);
      setLoading(false);
      throw new Error(err);
    })

  };
  


  const backup_PRF_Images= async (src, dest)=>{

    
    const items = await RNFS.readDir(src);
    setDisabled_hardbackup(true);
    setLoading(true);
   
    try{
    for (const item of items) {
      const srcPath = item.path;
      const destPath = `${dest}/${item.name}`;

      if (item.isFile()) {
          // Copy file
          await RNFS.copyFile(srcPath, destPath);
      } else if (item.isDirectory()) {
          // Recursively copy subdirectory
          await copyDirectory(srcPath, destPath);
      }

      
      
      
  }
}catch(err){
  setDisabled_hardbackup(false);
  setLoading(false);
  throw new Error(err);
}

Alert.alert("ডাটা ব্যাকআপ","ডাটাবেজ ফাইল এবং অন্যান্য ফাইল "+"(Download/PRF_DataBackup/PRF_"+moment().format("YYYY-MM-DD")+") ফোল্ডার এ ব্যাকআপ হয়েছে।",[{text:"ঠিক আছে"}]);    
setDisabled_hardbackup(false);
setLoading(false);

  }






  const copyDirectory = async (srcDir, destDir) => {
    try {
      // Ensure the destination directory exists
      await RNFS.mkdir(destDir);
  
      // Get the list of files and directories in the source directory
      const items = await RNFS.readDir(srcDir);
  
      for (const item of items) {
        const srcPath = item.path;
        const destPath = `${destDir}/${item.name}`;
  
        if (item.isDirectory()) {
          // Recursively copy the directory
          await copyDirectory(srcPath, destPath);
        } else {
          // Copy the file
          await RNFS.copyFile(srcPath, destPath);
        }
      }
  
      // console.log('Directory copied successfully');
    } catch (error) {
      console.error('Error copying directory:', error);
    }
  };



  const[loading, setLoading] = useState(false);



  const run_backUp=()=>{

    if((parseInt(props.surveyStarted_1) !==1 && parseInt(props.surveyStarted_2)!==1) && props.mwra_visit!="yes" && props.newBari!=true){
    hard_backUP()
    .then(()=>{
      console.log("Backup completed successfully");
      
    }).catch((err)=>{
      console.log(err);
      
    })}
    else{
      Alert.alert("সার্ভে ভিজিট","আপনি ইতিমধ্যে, সার্ভে ভিজিট শুরু করেছেন। তাই এই মুহূর্তে অন্য কোন অপশনএ প্রবেশ করতে পারবেননা। তাই অনুগ্রহ করে, সার্ভে ভিজিট সম্পূর্ণ করুন।",[{text:"ঠিক আছে"}]);    
    }
  }







  const sendWhatsApp_dailyReport=async()=>{
    if((parseInt(props.surveyStarted_1) !==1 && parseInt(props.surveyStarted_2)!==1) && props.mwra_visit!="yes" && props.newBari!=true){
   await db.transaction(
      function(tx){
      tx.executeSql(
      "select name, cluster, s_whatsApp from user where userID = '"+props.userID+"' ",
      [],
      function(tx, result){
      
      let lengt = result.rows.length;        
      
      for (i=0; i<lengt; i++){       

       if(result.rows.item(i).s_whatsApp==null || result.rows.item(i).s_whatsApp=="null" || result.rows.item(i).s_whatsApp==""){
        Alert.alert('দুঃখিত!!!', 'আপনার সুপারভাইসারের হোয়াটসঅ্যাপ নাম্বার সেট করা নেই। অনুগ্রহ করে, প্রথমে আপনার সুপারভাইসারের হোয়াটসঅ্যাপ নাম্বার সেট করুন।',[{text:"ঠিক আছে", onPress:()=>setWhatsAppNumberContainer(true)}]);            
       }
       else{
        
          checkTodays_visit(result.rows.item(i).s_whatsApp)
        
          
        
        
       }

      

      }
      
  },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      })
    }else{
      Alert.alert("সার্ভে ভিজিট","আপনি ইতিমধ্যে, সার্ভে ভিজিট শুরু করেছেন। তাই এই মুহূর্তে অন্য কোন অপশনএ প্রবেশ করতে পারবেননা। তাই অনুগ্রহ করে, সার্ভে ভিজিট সম্পূর্ণ করুন।",[{text:"ঠিক আছে"}]);    
    }
  }



  const checkTodays_visit=(whatsapp)=>{

    db.transaction(
      function(tx){
      tx.executeSql(
      "select count(*)'totalVisit' from survey WHERE date(Entry_Date) = '"+moment().format("YYYY-MM-DD")+"' ",
      [],
      function(tx, result){
      
      let lengt = result.rows.length;        
      
      for (i=0; i<lengt; i++){       

       if(parseInt(result.rows.item(i).totalVisit)>0){
        Alert.alert('সব খানা সার্ভে সম্পূর্ণ!!!', 'আজকের স্ক্যাডুয়াল অনুযায়ী কি সব খানা সার্ভে সম্পূর্ণ করেছেন? ',[{text:"হ্যাঁ, সব খানা সার্ভে সম্পূর্ণ", onPress:()=>generate_report_values(whatsapp)}, {text:"না, এখন খানা সার্ভে শেষ হইনি", onPress:()=>""}]);            
       }
       else{
        Alert.alert('সার্ভে ভিজিট', 'আজকে আপনি এখনও কোন খানা সার্ভে ভিজিট শেষ করেননি। তাই, এই মুহূর্তে, রিপোর্ট তৈরী করার মত কোন তথ্য নেই। প্রথমে আজকের স্ক্যাডুয়াল অনুযায়ী, সব খানা সার্ভে ভিজিট শেষ করুন, তারপর দিনশেষে, হোয়াটসঅ্যাপ রিপোর্ট প্রেরন করতে পারবেন।',[{text:"ঠিক আছে", onPress:()=>""}]);            
       }
       

      

      }
      
  },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      })

  }




  
  // const [survey_start_time, setSurvey_start_time] = useState("");
  // const [Survey_end_time, setSurvey_end_time] = useState("");
  // const [totalVisit, setTotalVisit] = useState("");
  // const [totalPregnant, setTotalPregnant] = useState("");
  // const [totalOutcome, setTotalOutcome] = useState("");
  // const [totalMember, setTotalMember] = useState("");
  // const [totalDied, setTotalDied] = useState("");
  // const [totalMigration, setTotalMigration] = useState("");

  const generate_report_values=async(whatsapp)=>{



    let startTime="";
    let endTime="";
    let totalVisit="";
    let totalPregnant="";
    let totalOutcome="";
    let totalMember="";
    let totalDied = "";
    let totalMigration="";

    const work_started= new Promise((resolve, reject)=>{
      
   db.transaction(
      (tx)=>{
      tx.executeSql(
      "select min(strftime('%H:%M',Entry_Date)) 'survey_start_time' from survey WHERE date(Entry_Date) = '"+moment().format("YYYY-MM-DD")+"' ",
      [],
      (tx, result)=>{

      let lengt = result.rows.length;              
      for (i=0; i<lengt; i++){       
        startTime=result.rows.item(i).survey_start_time;
      }
      resolve();

  },
      function(tx, error){
      console.log("add data error: "+ error.message);
      reject();
      });
      });
    
    })

  


      const work_end= new Promise((resolve, reject)=>{
    db.transaction(
        (tx)=>{
        tx.executeSql(
        "select max(strftime('%H:%M',Entry_Date)) 'survey_end_time' from survey WHERE date(Entry_Date) = '"+moment().format("YYYY-MM-DD")+"' ",
        [],
        (tx, result)=>{
  
        let lengt = result.rows.length;              
        for (i=0; i<lengt; i++){
          endTime=result.rows.item(i).survey_end_time;
        }
        resolve();
  
    },
        function(tx, error){
        console.log("add data error: "+ error.message);
        reject();
        });
        });
      })
      



        const total_visit= new Promise((resolve, reject)=>{
        db.transaction(
          (tx)=>{
          tx.executeSql(
          "select count(*) 'totalVisit' from survey WHERE date(Entry_Date) =  '"+moment().format("YYYY-MM-DD")+"' ",
          [],
          (tx, result)=>{    
          let lengt = result.rows.length;              
          for (i=0; i<lengt; i++){
            totalVisit = result.rows.item(i).totalVisit;
          }
          resolve()
    
      },
          function(tx, error){
          console.log("add data error: "+ error.message);
          reject()
          });
          });
        })
      



     
      const pregnant= new Promise((resolve, reject)=>{
      
      db.transaction(tx=>{tx.executeSql("drop table if EXISTS MWRA_visit",[],(tx, result)=>{console.log("temp droped")})})
      db.transaction(tx=>{tx.executeSql("create TEMP table MWRA_visit as select ROW_NUMBER() OVER (PARTITION BY pid, ifPregnant_No ORDER BY Entry_Date ASC) 'rn', * from MWRA_Survey WHERE VisitOutCome='1' and pregnancyStatus = '4' ",[],(tx, result)=>{console.log("temp created")})})
     
     db.transaction(tx=>{
        tx.executeSql(
          "select count(a.pid)'totalPregnant' from MWRA_visit a "+ 
          "inner join member b on a.pid = b.Mem_PID "+ 
          "WHERE "+ 
          "a.pregnancyStatus = '4' "+ 
          "and "+ 
          "a.rn = 1 "+ 
          "AND "+ 
          "b.Mem_Cstatus = '1' "+ 
          "AND "+ 
          "b.is_MWRA = '1' and "+
          "date(a.Entry_Date) = '"+moment().format("YYYY-MM-DD")+"'  ",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                   totalPregnant=result.rows.item(i).totalPregnant;
                }
                resolve();    
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        reject()
        });
        });
      }) 
    


    
      const outcome= new Promise((resolve, reject)=>{
      db.transaction(tx=>{tx.executeSql("drop table if EXISTS MWRA_visit",[],(tx, result)=>{console.log("temp droped")})})
      db.transaction(tx=>{tx.executeSql("create TEMP table MWRA_visit as  select ROW_NUMBER() OVER (PARTITION BY pid, ifPregnant_No ORDER BY Entry_Date DESC) 'rn', * from MWRA_Survey WHERE VisitOutCome='1' and pregnancyStatus = '5' ",[],(tx, result)=>{console.log("temp created")})})
     
     db.transaction(tx=>{
        tx.executeSql(
          "select count(a.pid) 'totalOutcome' from MWRA_visit a "+ 
          "inner join member b on a.pid = b.Mem_PID "+ 
          "WHERE "+ 
          "a.pregnancyStatus = '5' "+ 
          "and "+ 
          "a.rn = 1 "+ 
          "AND "+ 
          "b.Mem_Cstatus = '1' "+ 
          "AND "+ 
          "b.is_MWRA = '1' and "+
          "date(a.Entry_Date) = '"+moment().format("YYYY-MM-DD")+"' ",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                  totalOutcome=result.rows.item(i).totalOutcome;
                }    
                resolve();
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        reject()
        });
        });
      }) 
    



      const total_member= new Promise((resolve, reject)=>{
      db.transaction(
        (tx)=>{
        tx.executeSql(
        "select count(*) 'totalMember' from member WHERE date(Entry_Date) =  '"+moment().format("YYYY-MM-DD")+"' ",
        [],
        (tx, result)=>{    
        let lengt = result.rows.length;              
        for (i=0; i<lengt; i++){
          totalMember=result.rows.item(i).totalMember;
        }
        resolve()
  
    },
        function(tx, error){
        console.log("add data error: "+ error.message);
        reject()
        });
        });
      })
      



      const total_died= new Promise((resolve, reject)=>{
      db.transaction(
          (tx)=>{
          tx.executeSql(
          "select count(*) 'totalDied' from member WHERE Mem_Cstatus = '3' and date(Edit_Date) = '"+moment().format("YYYY-MM-DD")+"' ",
          [],
          (tx, result)=>{    
          let lengt = result.rows.length;              
          for (i=0; i<lengt; i++){
            totalDied=result.rows.item(i).totalDied;
          }
          resolve()
    
      },
          function(tx, error){
          console.log("add data error: "+ error.message);
          reject()
          });
          });
        }) 
        



        const total_migration= new Promise((resolve, reject)=>{
          db.transaction(
            (tx)=>{
            tx.executeSql(
            "select count(*) 'totalMigration' from member WHERE Mem_Cstatus = '2' and date(Edit_Date) =  '"+moment().format("YYYY-MM-DD")+"' ",
            [],
            (tx, result)=>{    
            let lengt = result.rows.length;              
            for (i=0; i<lengt; i++){
              totalMigration=result.rows.item(i).totalMigration;
            }
            resolve()      
          },
            function(tx, error){
            console.log("add data error: "+ error.message);
            reject()
            });
            });
          })
          

          await Promise.all([work_started, work_end, total_visit, pregnant, outcome, total_member, total_died, total_migration]);
          // setSurvey_start_time(startTime);
          // setSurvey_end_time(endTime);
          // setTotalVisit(totalVisit);
          // setTotalPregnant(totalPregnant);
          // setTotalOutcome(totalOutcome);
          // setTotalMember(totalMember);
          // setTotalDied(totalDied);
          // setTotalMigration(totalMigration);
          sendWhatsAppMessage(whatsapp, startTime, endTime, totalVisit, totalPregnant, totalOutcome, totalMember, totalDied, totalMigration);
          
          // try{
          // await work_started()
          // await work_end()
          // await total_visit()
          // await pregnant()
          // await outcome()
          // await total_member()
          // await total_died()
          // await total_migration()
          // sendWhatsAppMessage(whatsapp);
          // }catch(err){
          //   console.log(err);
          // }


            

  }


  const sendWhatsAppMessage = (whatsapp, startTime, endTime, totalVisit, totalPregnant, totalOutcome, totalMember, totalDied, totalMigration) => {


  console.log(startTime);
  console.log(endTime);
  console.log(totalVisit);
  console.log(totalPregnant);
  console.log(totalOutcome);
  console.log(totalMember);
  console.log(totalDied);
  console.log(totalMigration);
    
    console.log("+88"+whatsapp);
    const message = 
    "নামঃ "+props.name + "\n" + 
    "ক্লাস্টারঃ "+props.cluster + "\n\n" + 
    "আজ আমি প্রথম খানা ভিজিট শেষ করিঃ "+startTime +" সময়ে। "+ "\n" +
    "সর্বশেষ ভিজিট শেষ করিঃ "+endTime +" সময়ে। "+ "\n" + 
    "সর্বমোট খানা ভিজিট দিয়েছিঃ "+totalVisit +"। "+ "\n" + 
    "সর্বমোট গর্ভবতী হিসাবে সনাক্ত হয়েছেঃ "+totalPregnant +"। "+ "\n" + 
    "সর্বমোট গর্ভের ফলাফল জানতে পেরেছিঃ "+totalOutcome +"। "+ "\n" + 
    "সর্বমোট নতুন সদস্য যোগ হয়েছেঃ "+totalMember +"। "+ "\n" + 
    "সর্বমোট সদস্য মৃত হিসাবে চিহ্নিত হয়েছেঃ "+totalDied +"। "+ "\n" + 
    "সর্বমোট সদস্য স্থানান্তরিত হিসাবে চিহ্নিত হয়েছেঃ "+totalMigration +"। "+ "\n\n" + 
    "ধনবাদ"+ "\n" + 
    props.name;
    
    
    
    const phoneNumber = "+88"+whatsapp;





    const url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=${phoneNumber}`;

    Linking.openURL(url)
        .then((supported) => {
            if (!supported) {
                Alert.alert('দুঃখিত!!!', 'অনুগ্রহ করে, আপনার ট্যাবএ চেক করে দেখুন, WhatsApp অ্যাপটি সেটআপ করা আছে কিনা অথবা আপডেটেড ভার্সন সেট করা আছে কিনা।',[{text:"ঠিক আছে"}]);    
            } else {
                return Linking.openURL(url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
};







// const checkWhatsAppNo_exist=()=>{
//   setWhatsAppNumberContainer(true);
// }

const close_WhatsApp=()=>{
  setWhatsAppNumberContainer(false);
}

  return (




        <View style={{flex:5, flexDirection:"row", backgroundColor:"#e3e3e3", justifyContent:"center", alignItems:"center", borderTopWidth:3, borderTopColor:"#ff0d96"}}>



{whatsAppNumberContainer &&(
<Check_whatsApp close_WhatsApp={close_WhatsApp} userID= {props.userID}/>
)}

{/* <Text style={{color:"red", fontSize:14, fontWeight:"bold"}}>
                অপেক্ষা করুন আপলোড হচ্ছে.....
              </Text>
               */}
              

        
        <View style={{width:"45%", alignItems:"center",  justifyContent:"space-around", flexDirection:"row"}}>

            <TouchableOpacity onPress={go_to_home}>
            <Image source={require("../img/home.png")} style={{height:30, width:30}}/>
            </TouchableOpacity>
            {/* sendWhatsAppMessage */}
            <TouchableOpacity onPress={sendWhatsApp_dailyReport}>
            <Image source={require("../img/whatsapp.png")} style={{height:30, width:30}}/>
            </TouchableOpacity>

        </View>

        <View style={{elevation:3, marginTop:-30, borderRadius:100}}>
              <TouchableOpacity onPress={props.call_fun_for_block_list} underlayColor={"transparent"}>
              <Image  source={props.img} style={{height:75, width:75}}/>
              </TouchableOpacity>
              
              {loading &&(
              <View style={{marginTop:0, borderRadius:100, position: 'absolute', zIndex:999999, width:"100%", backgroundColor:"rgba(255, 255, 255, 0.7)", height:"90%", justifyContent:"center", alignItems:"center"}}>
              <ActivityIndicator color={"red"} size={"large"}/>             
              </View>
              )}  
        </View> 


        <View style={{width:"45%", alignItems:"center",  justifyContent:"space-around", flexDirection:"row"}}>
          <TouchableOpacity onPress={run_backUp} disabled={disabled_hardbackup}>
            <Image source={require("../img/backup.png")} style={{height:30, width:30}}/>
            </TouchableOpacity>
            <Image source={require("../img/cloud-backupup.png")} style={{height:35, width:35}}/>
        </View>



        </View>


)
}

export default ButtonBottom;