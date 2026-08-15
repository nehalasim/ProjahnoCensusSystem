import React, { Component, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Keyboard, View, Alert, Text, Image, createContext,TouchableOpacity, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import BackButton from './components/BackButton';
import ButtonBottom from './components/ButtonBottom';
import SideBar from './components/SideBar';
import PopulationChart from './components/PopulationChart';
import Block_PieChart from './components/Block_PieChart';
// import { styles } from 'react-native-gifted-charts/src/LineChart/styles';
import Dashboard_info from './components/Dashboard_info';
import { openDatabase } from 'react-native-sqlite-storage';
import moment from 'moment';
import Camera_open from './components/Camera_open';
import BackButtonHandler from './components/BackButtonHandler';
import LineChart_memberStatus from './components/LineChart_memberStatus';
import { passValueToSidebar } from './components/SideBar_values';


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


const Home = (props) => {




  useEffect(()=>{
    passValueToSidebar(props.userID, true, props.componentId);
  },[]);

  // const [value, setValue] = useState('Hello, Sidebar!');

  // const passValueToSidebar = () => {
  //   Navigation.updateProps('sidebarComponentId', {
  //     value: value,
  //   });
  // };

  // useEffect(()=>{
  //   passValueToSidebar()
  // })


  const[roundNo, setRoundNo]=useState({
    running_round_no:"0"
  })





  const Get_running_round_no=()=>{

    

      db.transaction(
      function(tx){
      tx.executeSql(
      "select Round_No 'current_round' from Surv_Round "+
      " where "+
      " strftime('%Y-%m-%d', date('now','localtime'))>=Start_Date "+
      " and "+
      " strftime('%Y-%m-%d', date('now','localtime'))<=End_Date limit 1",
      [],
      function(tx, result){ 

      let lengt = result.rows.length;
      var round_no = "";        
      for (i=0; i<lengt; i++){        
       var round_no = result.rows.item(i).current_round;
       setRoundNo({running_round_no:round_no});
      //  console.log(roundNo.running_round_no)
      }
    },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      })

      

  }



  
  useEffect(()=>{
    Get_running_round_no();
  },[])


  const [state,setState]=useState({
    name:props.name,
    userId:props.userID,
    password:props.password,
    cluster:props.cluster

  })


  // constructor=(props)=>{
  //   // super(props)
  //   Navigation.events().bindComponent(this);
  // }

  // const navigationEventListener = Navigation.events().bindComponent(this);
  

  Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {

    if(buttonId==="menubutton"){

      // Navigation.updateProps(props.componentId,{
      //   name:"nehal"
      // })

      Navigation.mergeOptions(props.componentId,{
        sideMenu:{
          left:{
            visible:true                                  
          }
          
        }
      })

      

      }  
  })






 const Go_to_block_list=()=>{


  if(roundNo.running_round_no==="0"){
  Alert.alert("রাউন্ড নাম্বার","বর্তমান রাউন্ড নাম্বার এখনও লোড হয়নি। তাই, ড্যাশবোর্ড এ সবকিছু লোড হওয়ার জন্য অপেক্ষা করুন।")    
  }
else{
  Navigation.push(props.componentId,{
    component:{
      name:"Block_list_page",
      passProps:{
        name:props.name,
        userID:props.userID,
        password:props.password,
        cluster:props.cluster,
        roundNo:roundNo.running_round_no


      },

      options:{
        topBar:{
          visible:true,
          title:{
            text:"ব্লক লিস্ট"
          },
          rightButtons:[{
            // id:"backbutton",
            component:{
              name:"BackButton",
              passProps:{
                originComponentId: props.componentId,
                position:"Block_list_page",
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

  }



  const current_date=()=>{
    var date = new Date();

          var lstSurDt = moment(date).format('MMMM DD, YYYY');

          return(
            <View>
              <Text style={{fontWeight:"bold", color:"#db2777"}}>
              {lstSurDt}
              </Text>
            </View>
          )
  }
  




  



  
const[camera_container_open, set_camera_container_open]=useState(false);

const open_camera=()=>{
  set_camera_container_open(true);  

}



const [image_updater, setImage_updater] = useState(Math.random());
const [hideOverlay, setHideOverlay] = useState(true);
const close_camera=(data)=>{
  var close = data="close"? false : true;
  set_camera_container_open(close);   
  setImage_updater(Math.random()); 
}
const [imageAvailable, setImgAvailable] = useState("");
const show_user_picture=()=>{
  // setImage_updater(Math.random());
  const full_image_path = RNFS.DocumentDirectoryPath+"/PRFIMAGES/USERS/"+props.userID+".jpg";
  RNFS.exists(full_image_path)
  .then((exist)=>{
    if(exist){
      setImgAvailable({uri:("file://"+full_image_path + "?" + image_updater)});
        console.log("exist");
        setHideOverlay(false);
    }else{
      setImgAvailable(require("./img/woman_PIC.png"));
      console.log("not exist");
      setHideOverlay(true);
    }
  }).catch((error)=>{
    console.log(error);
  })
}

useEffect(()=>{
  show_user_picture()
},[image_updater])



const [yearButton, setYearButton] = useState("#c9c9c9");
const [monthButton, setMonthButton] = useState("#fa3e74");
const [dayButton, setDayButton] = useState("#c9c9c9");

const[period, setPeriodFrame] = useState("month");

const setPeriod=(period)=>{
if(period==="year"){
  setYearButton("#fa3e74");
  setMonthButton("#c9c9c9");
  setDayButton("#c9c9c9");
  setPeriodFrame(period);
}
else if(period==="month"){
  setMonthButton("#fa3e74");
  setYearButton("#c9c9c9"); 
  setDayButton("#c9c9c9");
  setPeriodFrame(period);
}
else if(period==="day"){
  setDayButton("#fa3e74");
  setYearButton("#c9c9c9");
  setMonthButton("#c9c9c9");
  setPeriodFrame(period);
}
else{
  setYearButton("#c9c9c9");
  setMonthButton("#c9c9c9");
  setDayButton("#c9c9c9");
  setPeriodFrame("");
}
}


const [diedButton, setDiedButton] = useState("#c9c9c9");
const [pregnantButton, setPregnantButton] = useState("#c9c9c9");
const [migrateButton, setMigrateButton] = useState("#fa3e74");
const [outcomeButton, setOutcomeButton] = useState("#c9c9c9");

const[lineType, setLineType] = useState("migrate");


const LineType=(type)=>{

  setLineType("");
if(type==="died"){
  setDiedButton("#fa3e74");


  setPregnantButton("#c9c9c9");
  setMigrateButton("#c9c9c9");
  setOutcomeButton("#c9c9c9");

  setLineType(type);
}
else if(type==="pregnant"){
  setPregnantButton("#fa3e74");

  setDiedButton("#c9c9c9");
  setMigrateButton("#c9c9c9");
  setOutcomeButton("#c9c9c9");
  setLineType(type);
}
else if(type==="migrate"){
  setMigrateButton("#fa3e74");

  setDiedButton("#c9c9c9");
  setPregnantButton("#c9c9c9");
  setOutcomeButton("#c9c9c9");
  setLineType(type);
}
else if(type==="outcome"){
  setOutcomeButton("#fa3e74");

  setDiedButton("#c9c9c9");
  setPregnantButton("#c9c9c9");
  setMigrateButton("#c9c9c9");
  setLineType(type);
}else{
  setDiedButton("#c9c9c9");
  setPregnantButton("#c9c9c9");
  setMigrateButton("#c9c9c9");
  setOutcomeButton("#c9c9c9");
  setLineType("");
}

}




const go_to_pregnancy_list=()=>{
  Navigation.push(props.componentId,{
    component:{
      name:"Pregnancy_list",
      passProps:{
        name:props.name,//0
        userID:props.userID,//1
        password:props.password,//2
        cluster:props.cluster,//3
        roundNo:roundNo.running_round_no,
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



// const go_to_mwra_list=()=>{
//   Navigation.push(props.componentId,{
//     component:{
//       name:"MWRA_list_page",
//       passProps:{
//         name: props.name,//0
//         userID: props.userID,//1
//         password: props.password,//2
//         cluster: props.cluster,//3
//         roundNo: props.roundNo,//4
//         block: props.block,//5
//         villageCode: props.villageCode,//6
//         villageName: props.villageName,//7
//         bari: props.bari, //8
//         bariName: props.bariName,//9
//         hh: props.hh,//10
//         hhName: props.hhName,//11
//         componentId: props.componentId,//12
//         MemberAddTracker: props.MemberAddTracker,//13
//         MemberUpdateTracker: props.MemberUpdateTracker,//14
//         mwraVisit:"yes"//15

//       },

//       options:{
//         topBar:{
//           visible:true,
//           title:{
//             text:"MWRA লিস্ট"
//           },
//           rightButtons:[]
          
//         }
//       }


//     }
//   })
  

// }

  return (
    
    
    <View style={{flex:100, flexDirection:"column", justifyContent:"center", backgroundColor:"#f0f0f0"}}>

<BackButtonHandler/>

{camera_container_open &&(
<Camera_open document_type = {"user"} close_container={close_camera} mem_serial = {""} idcard = {""} houseno={""} member_gender = {""} user = {props.userID}/>
)}
  

      <View style={{flex:4, width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderTopWidth:3, borderTopColor:"#d4d4d4", padding:30, paddingRight:50, borderBottomWidth:1, borderBottomColor:"#d4d4d4"}}>
      
        <View style={{ width:"50%", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
        <TouchableOpacity onPress={open_camera}>
        <Image source={imageAvailable} style={{height:90, width:90, borderRadius:100, borderWidth:3, borderColor:"#db2777"}}/>
        </TouchableOpacity>

        
        <View style={{paddingLeft:10}}>
        <Text style={{fontSize:20, color:"#db2777", fontWeight:"bold"}}>{props.name}</Text>
        <Text style={{ color:"#0891b2"}}>ক্লাস্টারঃ {props.cluster}</Text>        
        </View>
        </View>

        <View style={{ width:"55%"}}>
          <View style={{alignItems:"flex-end"}}>
        <Text style={{color:"#363636"}}>আজকের তারিখ</Text>
        <Text  style={{fontSize:18, color:"#db2777"}}>        
        {current_date()}        
        </Text>
        <Text style={{color:"#363636"}}>
         বর্তমান রাউন্ড <Text style={{color:"#db2777", fontWeight:"bold"}}>{roundNo.running_round_no}</Text>
        </Text>
        </View>

        </View>
        

      </View>



      <View style={{flex:35, flexDirection:"row", justifyContent:"space-around"}}>
      
      <View style={{flex:40}}>
        <Block_PieChart cluster={props.cluster}/>
      </View>

      <View style={{flex:50}}>
            <Dashboard_info cluster = {props.cluster}/>
      </View>


    </View>

    <View style={{flexDirection:"row", flex:24, borderTopWidth:1, borderTopColor:"#cfcfcf", paddingTop:0, alignItems:"center", justifyContent:"flex-start"}}>


<View style={{flex:53, borderRightWidth:1, borderRightColor:"#dbdbdb"}}>
<LineChart_memberStatus selectedPeriod={period} selectedLineType={lineType} cluster={props.cluster}/>
</View>
<View style={{flex:20, padding:1, flexDirection:"column", justifyContent:"flex-start", height:"100%"}}>
  
  
<View style={{flexDirection:"row", padding:10, justifyContent:"space-between", alignItems:"center"}}>
  
  <TouchableOpacity onPress={go_to_pregnancy_list} style={{width:"45%", borderRadius:5, borderWidth:1, backgroundColor:"#d6d4d4",  alignItems:"center", borderColor:"#c7c7c7"}}>
      <Image source={require("./img/pregnant-woman.png")} style={{width:"40%"}}/>
  </TouchableOpacity>
  <TouchableOpacity style={{width:"45%", borderRadius:5, borderWidth:1, backgroundColor:"#d6d4d4",  alignItems:"center", borderColor:"#c7c7c7"}}>
      <Image source={require("./img/migration.png")} style={{width:"70%"}}/>
  </TouchableOpacity>

</View>

  <View style={{marginTop:"5%", borderBottomWidth:1, borderBottomColor:"#cfcfcf", flexDirection:"row", justifyContent:"space-between", padding:5, borderTopWidth:1, borderTopColor:"#dbdbdb", alignItems:"center"}}>
    <TouchableOpacity onPress={setPeriod.bind(this,"year")} style={[styles.buttonDesign,{backgroundColor:yearButton}]}>
      <Text style={{fontWeight:"bold"}}>
        বছর
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={setPeriod.bind(this,"month")}  style={[styles.buttonDesign,{backgroundColor:monthButton}]}>
      <Text style={{fontWeight:"bold"}}>
        মাস
      </Text>
    </TouchableOpacity>

    {/* <TouchableOpacity onPress={setPeriod.bind(this,"day")}  style={[styles.buttonDesign,{backgroundColor:dayButton}]}>
      <Text style={{fontWeight:"bold"}}>
        দিন
      </Text>
    </TouchableOpacity> */}

  </View>



  <View style={{flexDirection:"row", height:"30%", justifyContent:"space-evenly", padding:2}}>

    <View style={{flexDirection:"column", width:"50%", justifyContent:"space-between", alignItems:"center"}}>
    <TouchableOpacity onPress={LineType.bind(this,"died")} style={[styles.buttonDesignForGraph,{backgroundColor:diedButton}]}>
      <Text style={{fontWeight:"bold", fontSize:12}}>
        মৃত
      </Text>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={LineType.bind(this,"migrate")} style={[styles.buttonDesignForGraph,{backgroundColor:migrateButton}]}>
      <Text style={{fontWeight:"bold", fontSize:12}}>
        স্থানান্তরিত
      </Text>
    </TouchableOpacity>
    </View>

    <View style={{flexDirection:"column", width:"50%", justifyContent:"space-between", alignItems:"center"}}>
    <TouchableOpacity onPress={LineType.bind(this,"pregnant")} style={[styles.buttonDesignForGraph,{backgroundColor:pregnantButton}]}>
      <Text style={{fontWeight:"bold", fontSize:12}}>
        গর্ভবতী
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={LineType.bind(this,"outcome")} style={[styles.buttonDesignForGraph,{backgroundColor:outcomeButton}]}>
      <Text style={{fontWeight:"bold", fontSize:12}}>
        গর্ভের ফলাফল
      </Text>
    </TouchableOpacity>
    </View>

  </View>

</View>

    </View>

    <View style={{flex:40, borderTopWidth:1, borderTopColor:"#cfcfcf", paddingTop:5}}>
      <PopulationChart cluster = {props.cluster}/>
    </View>
    
    
    
    
    

         
                    {/* userID:props.userID,
                    password:props.password, 
                    name:props.name,
                    cluster:props.cluster */}
    
    <ButtonBottom img = {require('./img/logo.png')} call_fun_for_block_list={Go_to_block_list} userID={props.userID} password={props.password} name={props.name} cluster={props.cluster} componentId={props.componentId}/>

    
</View>


  )
}

// const styles = StyleSheet.create({
//   fontStyle:{
//     lineHeight:30,
//     fontSize:16,
//     color:"#404040"
//   }
// })

const styles = StyleSheet.create({
buttonDesign:{
 elevation:2, height:40, backgroundColor:"#c9c9c9", width:"48%", borderRadius:5, justifyContent:"center", alignItems:"center"
},
buttonDesignForGraph:{
  elevation:2, height:30, backgroundColor:"#c9c9c9", width:"90%", borderRadius:5, justifyContent:"center", alignItems:"center"
}
})


export default Home





