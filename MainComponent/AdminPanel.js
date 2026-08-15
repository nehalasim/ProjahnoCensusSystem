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
import DocumentPicker, { types } from 'react-native-document-picker';
import { AlterTableQuery } from '../components/AlterTableQuery'
import { passValueToSidebar } from '../components/SideBar_values'
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



const AdminPanel = (props) => {
    const[loading, setLoading] = useState(false);
    const[password, setPassword]=useState("");




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
            console.log("not exist");
          }
          
      },
          function(tx, error){
          console.log("add data error: "+ error.message);
          reject("add data error: "+ error.message)
          });
          })
        

      });
    }



    const adminPassword= async()=>{
      try {          
        const checkAdminTAbleExist = await check_admin_table_existance("AdminUser");
        if(checkAdminTAbleExist){
      console.log("running");
      db.transaction(
        function(tx){
          console.log("running query");
        tx.executeSql(
        "select password from AdminUser",
        [],
        function(tx, result){
        
        let length = result.rows.length;
        if(length > 0){
        for (i=0; i<length; i++){   
          console.log(""+result.rows.password);     
        setPassword(result.rows.item(i).password);
        console.log("result query");
        }
      }
        
    },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        })
    }else{
      setPassword("বর্তমানে কোন পাসওয়ার্ড সেট করা নেই।");
    } 
  }
  catch(error){
console.log(error);
    }

  }
  


    useEffect(()=>{
      adminPassword();
    },[])





    // const check_member_table_existance=(tableName)=>{
    //   return new Promise((resolve, reject)=>{

    //     db.transaction(
    //       function(tx){
    //       tx.executeSql(
    //       "select name from sqlite_master WHERE type='table' AND name='"+tableName+"' ",
    //       [],
    //       function(tx, result){
          
    //       let length = result.rows.length;
    //       if(length > 0){  
    //         resolve(true);
    //         console.log("exist");
    //       }else{
    //         resolve(false);
    //         console.log("not exist");
    //       }
          
    //   },
    //       function(tx, error){
    //       console.log("add data error: "+ error.message);
    //       reject("add data error: "+ error.message)
    //       });
    //       })
        

    //   });
    // }


    const[cluster, setCluster] = useState("");
    const currentCluster= async ()=>{
      try{
        const checktableExistance = await check_admin_table_existance("member");
        if(checktableExistance){
      console.log("clusger running");
      db.transaction(
        function(tx){
          console.log("clusger running query");
        tx.executeSql(
        "select cCluster , max(totalMember)'totalMember' from ( "+
        "select cluster 'cCluster' , count(*) 'totalMember' from member where Mem_Cstatus = '1' "+
        "group by cluster "+
        "union "+
        "select cluster, count(*)'totalSurvey' from survey "+
        "group by cluster "+
        ")",
        [],
        function(tx, result){
        
        let length = result.rows.length;
        if(length > 0){
        for (i=0; i<length; i++){   
          
          if(parseInt(result.rows.item(i).totalMember)>10000){
            setCluster(result.rows.item(i).cCluster);
          }else{
            setCluster("বর্তমানে কোন ক্লাস্টার সেট করা নেই।")
          }          

          


        }
      }else{
        setCluster("বর্তমানে কোন ক্লাস্টার সেট করা নেই।")
      }
        
    },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        })
      }
      else{
        setCluster("বর্তমানে কোন ক্লাস্টার সেট করা নেই।")
      }
      }catch(error){
        console.log(error);
      }
    }

    useEffect(()=>{
      currentCluster();
    },[])





    const [selectedFile, setSelectedFile] = useState("");


    const selectFile = async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [types.allFiles],
        });
  
        // Destructure the first element of the array
        const file = res[0];
  
        console.log('Document Picker Response:', file);
  
        // Check the structure of the response and log each property
        console.log('file.name:', file.name);
        console.log('file.uri:', file.uri);
        console.log('file.type:', file.type);
        console.log('file.size:', file.size);
  
        // Ensure file.uri is defined before attempting to split it
        const fileName = file.name || (file.uri ? file.uri.split('/').pop() : 'Unknown');
        console.log('File name:', fileName);
  
        setSelectedFile(fileName+" ফাইলটি আপলোড হচ্ছে অপেক্ষা করুন...।।");
        await moveFileToDocumentDirectory(file.uri, fileName);

  
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User canceled the picker
          console.log('User canceled the picker');
        } else {
          // Handle other errors
          Alert.alert('Error', err.message);
        }
      }
    };



    const moveFileToDocumentDirectory = async (sourceUri, fileName) => {
      setLoading(true);
      // setCurrent_bd_file_size("");
      try {
        
        const destPath = `${RNFS.DocumentDirectoryPath+"/../"+"databases"}/${"prf.db"}`;
    
        // Move the file
        await RNFS.copyFile(sourceUri, destPath);
        
        Alert.alert("আপলোড হয়েছে", "আপনার নির্বাচিত ডাটাবেজ ফাইলটি সঠিক ভাবে আপলোড হয়েছে এবং তা পুরন ডাটাবেজের তথ্য, নতুন ডাটাবেজের তথ্য দারা রিপ্লেস হয়েছে।",[{text:"ঠিক আছে", onPress:()=>{""}}]);
        setLoading(false);
        setSelectedFile(fileName);
        // check_current_db_file_size();

        setTimeout(()=>{
          alter_table();
        }, 2000)
        

      } catch (err) {
        console.error('Error moving file', err);
        Alert.alert('Error', `Failed to move the file. ${err.message}`);
        setLoading(false);
      }

    };




  

const alter_table=()=>{

AlterTableQuery()
    .then((message) => {
      console.log("message: "+message);
      currentCluster();
      adminPassword();
    })
    .catch((error) => {
      console.error("error: "+error);
    });
  }






  const update_admin_password= async ()=>{
    try{
      const checktableExistance = await check_admin_table_existance("AdminUser");
      if(checktableExistance){
    console.log("clusger running");
    db.transaction(
      function(tx){
        console.log("clusger running query");
      tx.executeSql(
      "update AdminUser set password = '"+password+"'",
      [],
      function(tx, result){
      
     if(result.rowsAffected>0){            
      Alert.alert("অ্যাডমিন পাসওয়ার্ড", "আপনার এন্ট্রি করা নতুন পাসওয়ার্ড সেট হয়েছে।",[{text:"ঠিক আছে", onPress:()=>{""}}]);
      adminPassword();
        }
      
  },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      })
    }
    else{
      Alert.alert("অ্যাডমিন পাসওয়ার্ড!!!", "বর্তমানে কোন ক্লাস্টার/ডাটাবেজ সেট করা নেই।",[{text:"ঠিক আছে", onPress:()=>{""}}]);
    }
    }catch(error){
      console.log(error);
    }
  }

    

  useEffect(()=>{
    passValueToSidebar(props.userID, false, props.componentId);
  },[]);


  return (
    <View style={{width:"100%", alignItems:"center"}}>
    <View style={{marginTop:"1%",height:"auto", width:"98%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
            <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
              অ্যাডমিন প্যানেল                
            </Text>            
          </View>




          <View style={{height:100, width:"98%", marginTop:"1%", borderTopWidth:1, paddingTop:10, borderTopColor:"#b3b3b3"}}>              
            <QuestionContainer
            question={"বর্তমান ডাটা অনুযায়ী, এই ট্যাব যে ক্লাস্টারটি সেট করা আছে।"}
            inputField_1={<View style={{width:"50%"}}><InputField value={cluster} maxLength={40} placeholder={"ক্লাস্টার"} imgLeft={"cluster"} readOnly={false}/></View>} 
            direction={"column"}
            
            />
            </View>


          <View style={{height:100, width:"98%", marginTop:"1%", borderTopWidth:1, paddingTop:10, borderTopColor:"#b3b3b3"}}>              
            <QuestionContainer
            question={"অ্যাডমিন পাসওয়ার্ড। পাসওয়ার্ড পরিবর্তন করতে চাইলে নিচের বক্সে পাসওয়ার্ড পরিবর্তন করে আপডেট বাটনে ক্লিক করুন।"}
            inputField_1={<View style={{width:"60%"}}><InputField getValue={(text)=> setPassword(text)} value={password} maxLength={40} placeholder={"পাসওয়ার্ড"} imgLeft={"lock"}/></View>} 
            direction={"row"}
            sideButton={<View style={{width:"20%"}}><CRUD_button callFunction={update_admin_password} title={"আপডেট"} radious={50}/></View>}
            />
            </View>




            <View style={{height:130, width:"98%", marginTop:"1%", borderTopWidth:1, paddingTop:10, borderTopColor:"#b3b3b3"}}>              

            

            
            <QuestionContainer
            question={"নতুন ডাটাবেজ ফাইল আপলোডের জন্য ফাইল বাটনে ক্লিক করে, ডাটাবেজ ফাইলটি নির্বাচন করুন। বিঃদ্রঃ নতুন ডাটাবেজ ফাইলটি আপনার পুরন ডাটাবেজ ফাইলের উপরে রিপ্লেস হবে। সেক্ষেত্রে আপনার পুরন ডাটাবেজের তথ্য নতুন ডাটাবেজের তথ্য দিয়ে রিপ্লেস হয়ে যাবে।"}
            inputField_1={<View style={{height:"100%", alignItems:"center", justifyContent:"center"}}><Text style={{fontSize:12, color:"blue"}}>নির্বাচিত ফাইলের নামঃ <Text style={{color:"red", fontWeight:"bold"}}>{selectedFile}</Text></Text></View>} 
            direction={"row"}
            sideButton={<View style={{width:"20%"}}><CRUD_button callFunction={selectFile} title={"ফাইল"} radious={50}/></View>}
            />

              

            


            </View>

           


            


        </View>
  )
}

export default AdminPanel
