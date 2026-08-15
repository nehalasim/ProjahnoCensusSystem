import React, { useEffect, useState } from 'react'
import { BackHandler, View, Text, Alert, FlatList, TouchableHighlight, Image, TouchableOpacity, TextInput, ActivityIndicator, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ButtonBottom from  '../components/ButtonBottom';
import { openDatabase } from 'react-native-sqlite-storage';
// import Block_list_data from '../components/Block_list_data';

import Khana_list_data from '../components/Khana_list_data';
import moment from 'moment';
import Inside_khana_member_list from '../components/Inside_khana_member_list';
import Inside_khana_survey_list from '../components/Inside_khana_survey_list';
import Inside_khana_mwra_list from '../components/Inside_khana_mwra_list';
import Survey_question from '../components/Survey_question';
import Camera_open from '../components/Camera_open';
import { check_mwra_existance } from '../components/check_mwra_existance';
import Code_7_bubble from '../components/Code_7_bubble';
import MiscQuery from '../components/MiscQuery';
import BackButtonHandler from '../components/BackButtonHandler';
import { passValueToSidebar } from '../components/SideBar_values';
// import Database from "./Database"

var RNFS = require('react-native-fs');

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




const Inside_khana_page = (props) => {





// console.log(props.cluster);
// console.log(props.block);
// console.log(props.bari);
// console.log(props.hh);
// console.log("bariName"+props.bariName);
// console.log(props.MemberAddTracker);

      
const[inside_khana_options, SetInside_khana_options] = useState(true);
const[inside_hh_options_disable, Set_inside_hh_options_disable] = useState(false);



// if(props.MemberAddTracker===undefined){
//   var  MemberAddTracker="2"
//  }else{
//    var  MemberAddTracker=props.MemberAddTracker
//  }
 
//  if(props.MemberUpdateTracker===undefined){
//    var  MemberUpdateTracker="2"
//   }else{
//     var  MemberUpdateTracker=props.MemberUpdateTracker
//   }      

var props_array=[
      props.name,
      props.userID,
      props.password,
      props.cluster,
      props.roundNo,
      props.block,
      props.villageCode,
      props.villageName,
      props.bari, 
      props.bariName,
      props.hh,
      props.hhName,
      props.componentId,
      props.MemberAddTracker,//13
      props.MemberUpdateTracker//14
      
]



  const [visible, setVisible]=useState({
      member_list_visible:false,
      survey_visit_list:false,
      mwra_list:false,
      survey_question:false
      
  });



const[member_list_border_color, set_member_list_border_color] = useState("#0e7490");
const[survey_visit_list_border_color, set_survey_visit_list_border_color] = useState("#0e7490");
const[mwra_list_border_color, set_mwra_list_border_color] = useState("#0e7490");




const Khana_options=(buttonPressed)=>{
  

  // var selected_button_color = "#850909";
  // var default_button_color = "#0e7490";
  // var button_color="";

  if(buttonPressed==="member" && (parseInt(props.MemberAddTracker)!==1 && parseInt(props.MemberUpdateTracker)!==1)){    
    setVisible((visible)=> ({...visible, member_list_visible:true}));
    setVisible((visible)=> ({...visible, survey_visit_list:false}));
    setVisible((visible)=> ({...visible, mwra_list:false}));
    setVisible((visible)=> ({...visible, survey_question:false}));
    set_member_list_border_color("#f71a0a");
    set_survey_visit_list_border_color("#0e7490")
    set_mwra_list_border_color("#0e7490")
    
    
  }
  else if(buttonPressed==="survey" && (parseInt(props.MemberAddTracker)!==1 && parseInt(props.MemberUpdateTracker)!==1)){    
    setVisible((visible)=> ({...visible, member_list_visible:false}));
    setVisible((visible)=> ({...visible, survey_visit_list:true}));
    setVisible((visible)=> ({...visible, mwra_list:false}));
    setVisible((visible)=> ({...visible, survey_question:false}));
    set_member_list_border_color("#0e7490")
    set_survey_visit_list_border_color("#f71a0a")
    set_mwra_list_border_color("#0e7490")
  }
  else if(buttonPressed==="mwra" && (parseInt(props.MemberAddTracker)!==1 && parseInt(props.MemberUpdateTracker)!==1)){    
    setVisible((visible)=> ({...visible, member_list_visible:false}));
    setVisible((visible)=> ({...visible, survey_visit_list:false}));
    setVisible((visible)=> ({...visible, mwra_list:true}));
    setVisible((visible)=> ({...visible, survey_question:false}));
    set_member_list_border_color("#0e7490")
    set_survey_visit_list_border_color("#0e7490")
    set_mwra_list_border_color("#f71a0a")
  }
  else if(buttonPressed==="surveyQuestion"){
    setVisible((visible)=> ({...visible, member_list_visible:false}));
    setVisible((visible)=> ({...visible, survey_visit_list:false}));
    setVisible((visible)=> ({...visible, mwra_list:false}));
    setVisible((visible)=> ({...visible, survey_question:true}));

    set_member_list_border_color("#0e7490")
    set_survey_visit_list_border_color("#0e7490")
    set_mwra_list_border_color("#0e7490")
  }else{
    Alert.alert("সার্ভে ভিজিট","আপনি ইতিমধ্যে, সার্ভে ভিজিট শুরু করেছেন। তাই এই মুহূর্তে অন্য কোন অপশনএ প্রবেশ করতে পারবেননা। তাই অনুগ্রহ করে, সার্ভে ভিজিট সম্পূর্ণ করুন।",[{text:"ঠিক আছে"}]);    

    set_member_list_border_color("#0e7490")
    set_survey_visit_list_border_color("#0e7490")
    set_mwra_list_border_color("#0e7490")
  }
  // change_color_Khana_options_button();
  
}





const check_survey_started_member_added =()=>{

  // Alert.alert(props.MemberAddTracker+"==="+props.MemberUpdateTracker);

  if(parseInt(props.MemberAddTracker)===1 || parseInt(props.MemberUpdateTracker)===1){
    setVisible((visible)=> ({...visible, member_list_visible:false}));
    setVisible((visible)=> ({...visible, survey_visit_list:false}));
    setVisible((visible)=> ({...visible, mwra_list:false}));
    setVisible((visible)=> ({...visible, survey_question:true}));
    SetInside_khana_options(true);
    // Set_inside_hh_options_disable(true);
    
  }
  else if(parseInt(props.MemberAddTracker)===2 || parseInt(props.MemberUpdateTracker)===2){
    setVisible((visible)=> ({...visible, member_list_visible:false}));
    setVisible((visible)=> ({...visible, survey_visit_list:false}));
    setVisible((visible)=> ({...visible, mwra_list:false}));
    setVisible((visible)=> ({...visible, survey_question:true}));
    SetInside_khana_options(true);
    // Set_inside_hh_options_disable(false);
    
  }
  else{

  }
}



useEffect(()=>{check_survey_started_member_added()},[]);



// const open_survey_question=()=>{
//     setVisible((visible)=> ({...visible, member_list_visible:false}));
//     setVisible((visible)=> ({...visible, survey_visit_list:false}));
//     setVisible((visible)=> ({...visible, mwra_list:false}));
//     setVisible((visible)=> ({...visible, survey_question:true}));
  
// }

const[blockDetails,setBlockDetails]=useState({
  Block_TotalPregnant:0,
  Block_TotalMember:0,
  Block_TotalMWRA:0,
  Block_TotalChild:0,
  Block_TotalMember60UP:0
})




useEffect(()=>{
  khana_information();
},[])
const khana_information=()=>{

  db.transaction(tx=>{tx.executeSql("drop table if EXISTS MWRA_visit",[],(tx, result)=>{console.log("temp droped")})})
      db.transaction(tx=>{tx.executeSql("create TEMP table MWRA_visit as select ROW_NUMBER() OVER (PARTITION BY pid ORDER BY Entry_Date DESC) 'rn', * from MWRA_Survey WHERE VisitOutCome='1'",[],(tx, result)=>{console.log("temp created")})})
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
          "b.Cluster = '"+props.cluster+"' and b.Block='"+props.block+"' and b.Bari_code='"+props.bari+"' and b.HH_Code = '"+props.hh+"' ",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                  // console.log("selected");
                   let items=result.rows.item(i);          
                   setBlockDetails((blockDetails)=>({...blockDetails, Block_TotalPregnant:items.totalPregnant}))
                }    
        })
      })



      db.transaction(tx=>{
        tx.executeSql(
          "select count(a.Mem_SL) 'totalMemNo' from member a "+
          "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+props.cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
          "a.cluster = b.cluster and "+
          "a.Village_Code = b.village and "+
          "a.Bari_Code = b.bari "+
          "where "+
          "a.Mem_Cstatus in ('1') "+
          "and "+
          "a.Cluster = '"+props.cluster+"' and a.Block='"+props.block+"' and a.Bari_code = '"+props.bari+"' and a.HH_Code = '"+props.hh+"' ",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);          
                  //  setBlockDetails({Block_TotalMember:items.totalMemNo});   
                   setBlockDetails((blockDetails)=>({...blockDetails, Block_TotalMember:items.totalMemNo})) 
                }    
        })
      })




      db.transaction(tx=>{
        tx.executeSql(
          "select count(a.Mem_SL) 'totalMWRA' from member a "+
          "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+props.cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
          "a.cluster = b.cluster and "+
          "a.Village_Code = b.village and "+
          "a.Bari_Code = b.bari "+
          "where "+
          "a.Mem_Cstatus in ('1') and "+
          "a.is_MWRA = '1' "+
          "and "+
          "a.Cluster = '"+props.cluster+"' and a.Block='"+props.block+"' and a.Bari_code = '"+props.bari+"' and a.HH_Code = '"+props.hh+"'  ",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);          
                  //  setBlockDetails({Block_TotalMWRA:items.totalMWRA});    
                   setBlockDetails((blockDetails)=>({...blockDetails, Block_TotalMWRA:items.totalMWRA}))
                }    
        })
      })








      db.transaction(tx=>{
        tx.executeSql(
          "select count(a.Mem_SL) 'totalChild' from member a "+
          "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+props.cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
          "a.cluster = b.cluster and "+
          "a.Village_Code = b.village and "+
          "a.Bari_Code = b.bari "+
          "where "+
          "a.Mem_Cstatus in ('1') "+
          "and "+
          "a.Mem_Enroll_Type = '3' "+
          "and "+
          "(((JulianDay('now')) - JulianDay(a.Mem_DOB))/365.25)<=5 "+
          "and "+
          "a.Cluster = '"+props.cluster+"' and a.Block='"+props.block+"' and a.Bari_code = '"+props.bari+"' and a.HH_Code = '"+props.hh+"'  ",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);          
                  //  setBlockDetails({Block_TotalMWRA:items.totalMWRA});    
                   setBlockDetails((blockDetails)=>({...blockDetails, Block_TotalChild:items.totalChild}))
                }    
        })
      })




      db.transaction(tx=>{
        tx.executeSql(
          "select count(a.Mem_SL) 'totalMember_60_up' from member a "+
          "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+props.cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on  "+
          "a.cluster = b.cluster and  "+
          "a.Village_Code = b.village and  "+
          "a.Bari_Code = b.bari  "+
          "where  "+
          "a.Mem_Cstatus in ('1')  "+
          "and  "+
          "a.Cluster = '"+props.cluster+"' and a.Block = '"+props.block+"' and a.Bari_code = '"+props.bari+"' and a.HH_Code = '"+props.hh+"'  "+
          "and  "+
          "((JulianDay('now')) - JulianDay(case "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+  
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+ 
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
          "else Mem_DOB end))/365.25>=60  ",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);          
                  //  setBlockDetails({Block_TotalMWRA:items.totalMWRA});    
                   setBlockDetails((blockDetails)=>({...blockDetails, Block_TotalMember60UP:items.totalMember_60_up}))
                }    
        })
      })

}



const open_survey_question=()=>{//to check if there any other blocks incomplete

  db.transaction(tx=>{tx.executeSql("drop table if EXISTS check_block",[],(tx, result)=>{console.log("temp droped")})})
  db.transaction(tx=>{tx.executeSql("create TEMP table check_block as select a.Block 'block', count(a.bari)'bari', count(c.bari)'doneBari' from clusterDiv a "+
  "left join (select cluster, block, bari, surveyDate from survey where surveyNo = (select Round_No from Surv_Round where strftime('%Y-%m-%d', date('now','localtime')) between Start_Date and End_Date) group by cluster, block, bari)c "+
  "on c.cluster = a.cluster and a.block = c.block and a.bari = c.Bari "+
  "WHERE "+ 
  "a.Cluster = '"+props.cluster+"' "+ 
  "AND  "+
  "a.village||a.bari in  (select village||bari from hh where cStatus = '1')  "+
  "AND  "+
  "a.CStatus= '1'  "+
  "group by a.Block "+
  "order by a.block",[],(tx, result)=>{console.log("temp created")})})

  db.transaction(tx=>{
    tx.executeSql(
      "select * from check_block "+
      "WHERE "+
      "cast(doneBari as INT)>0 "+
      "AND "+
      "cast(bari as INT)<>cast(doneBari as INT) "+
      "AND "+
      "cast(block as INT)<>"+parseInt(props.block)+" order by block limit 1",
    [],
    (tx, result)=>{          
    var length = result.rows.length;        


            if(length>0){
            for(let i= 0; i<length; i++){              
               let incomplete_block=result.rows.item(i).block;          
               Alert.alert("অসম্পূর্ণ ব্লক","ব্লক নাম্বার "+ incomplete_block +", এখনও অসম্পূর্ণ আছে। প্রথমে "+incomplete_block+" ব্লকটি সম্পূর্ণ করুন, তারপর এই ব্লকে এসে ভিজিট দিতে পারবেন।",[{text:"ঠিক আছে"}]);    
            }    
          }
          else{
            check_hh_survey_complete_status();
          }
    })
  })

}

const check_hh_survey_complete_status=()=>{//to check if the hh is already completed or not for the current round

  // console.log("check_hh_survey_complete_status function");

  db.transaction(tx=>{
    tx.executeSql(
      "select a.surveyNo 'Last_Survey_no',(CAST(a.surveyNo as INT)+1)'Current_Survey_No', a.surveyDate'Last_Survey_On', a.nextSurvey_StartDate 'Next_Survey_Date', b.end_dt'End_Survey_Date' from survey a "+
      "left join bari_v_sche b on ltrim(rtrim(a.village)) = ltrim(rtrim(b.village)) and ltrim(rtrim(a.bari)) = ltrim(rtrim(b.bari)) and ltrim(rtrim(a.HH)) = ltrim(rtrim(b.HH)) "+
      "WHERE "+
      "a.village = '"+props.villageCode+"' and a.bari = '"+props.bari+"'  and a.hh = '"+props.hh+"' "+
      "order by "+
      "CAST(a.surveyNo as INT)desc limit 1",
    [],
    (tx, result)=>{          
    var length = result.rows.length;        
    // console.log("check_hh_survey_complete_status function Query = = "+length);

    if(length>0){
    for(let i= 0; i<length; i++){
      // console.log("last survey "+result.rows.item(i).Last_Survey_no);
      let last_Survey=result.rows.item(i).Last_Survey_no===null ? "0" : result.rows.item(i).Last_Survey_no;          
      let Last_Survey_date=result.rows.item(i).Last_Survey_On;          
      let Next_Survey_Date=result.rows.item(i).Next_Survey_Date;          
      
      let Last_Survey_date_formatted = moment(Last_Survey_date).format('MMM DD, YYYY');
      let Next_Survey_Date_formatted = moment(Next_Survey_Date).format('MMM DD, YYYY');

      if(parseInt(props.roundNo)>parseInt(last_Survey)){

          Khana_options("surveyQuestion")
      }
      else{
        Alert.alert("ভিজিট সম্পূর্ণ","এই খানা বর্তমান রাউন্ডের জন্য ভিজিট সম্পূর্ণ হয়েছে "+Last_Survey_date_formatted+" তারিখে। পরের ভিজিট "+Next_Survey_Date_formatted+" তারিখের পর থেকে এবং পরের রাউন্ড এ গিয়ে এন্ট্রি দিতে পারবেন।",[{text:"ঠিক আছে"}]);    
      }

      
        }   
      }
      else{
        Khana_options("surveyQuestion");
      }
        
        



    })
  })



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
  // show_hh_picture();
}
const [imageAvailable, setImgAvailable] = useState("");
const show_hh_picture=()=>{
  // console.log("image function");
  // setImage_updater(Math.random());
  const full_image_path =  (RNFS.DocumentDirectoryPath+"/PRFIMAGES/HOUSES/"+props.villageCode+""+props.bari+""+props.hh+".jpg");
  RNFS.exists(full_image_path)
  .then((exist)=>{
    if(exist){
      setImgAvailable({uri:("file://"+full_image_path + "?" + image_updater)});
        // console.log("exist");
        setHideOverlay(false);
    }else{
      setImgAvailable(require("../img/noimage.png"));
      // console.log("not exist");
      setHideOverlay(true);
    }
  }).catch((error)=>{
    console.log(error);
  })
}

useEffect(()=>{
  show_hh_picture();
},[image_updater])











const checkMwraExistance=()=>{
  db.transaction(tx=>{
    tx.executeSql(
      "select count(member.Mem_PID)'totalMWRA', count(MWRA_Survey.pid) 'totalMwraVisitDone' "+
      "from member "+
      "left join MWRA_Survey on MWRA_Survey.pid = member.Mem_PID and date(MWRA_Survey.VisitDT, 'localtime') = date('now','localtime') "+
      "where "+ 
      "member.Village_Code = '"+props.villageCode+"' "+
      "and member.Bari_Code = '"+props.bari+"' "+
      "and member.HH_Code = '"+props.hh+"' "+
      "and member.is_MWRA = '1' "+
      "and member.Mem_Cstatus = '1' "+ 
      "limit 1",
    [],
    (tx, result)=>{          
    var length = result.rows.length;        
    // console.log(length);
    for(let i= 0; i<length; i++){

      // console.log("query running");
      let totalMwra=result.rows.item(i).totalMWRA;          
      let totalMwraisitDone=result.rows.item(i).totalMwraVisitDone;          


      if(parseInt(totalMwraisitDone) >= parseInt(totalMwra)){
            //code if done
      }else{        
        go_to_mwra_list();
      }
}


    })
  })
}




const { check_mwra_visit } = check_mwra_existance();
const checkMWRA = async () => {
  
  try {
    const all_mwraVisit = await check_mwra_visit(props.villageCode, props.bari, props.hh, props.roundNo);
    if(all_mwraVisit==="completed"){
      move_to_hh_list();
      
    }else{
      go_to_mwra_list();
      
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



const go_to_mwra_list=()=>{
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





const [floatButton, setFloatButton] = useState(false);  





const any_code_7_member=()=>{//internal migration
  db.transaction(tx=>{
    tx.executeSql(
      "select * from member "+
      "WHERE "+
      "cluster = '"+props.cluster+"' and "+
      "block = '"+props.block+"' and "+
      "Village_Code= '"+props.villageCode+"' and "+
      "Bari_Code = '"+props.bari+"' and HH_Code = '"+props.hh+"' and "+
      "Mem_cStatus = '2' and "+
      "ReasonToMigrate = '7' ",
    [],
    (tx, result)=>{      
    var length = result.rows.length;
          if(length>0){
            setFloatButton(true);
            // console.log(floatButton);
          }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
}

useEffect(()=>{
  any_code_7_member();
},[]);



const any_code_2_Parmanent_mig_member=()=>{//internal migration
  db.transaction(tx=>{
    tx.executeSql(
      "select * from member "+
      "WHERE "+
      "cluster = '"+props.cluster+"' and "+
      "block = '"+props.block+"' and "+
      "Village_Code= '"+props.villageCode+"' and "+
      "Bari_Code = '"+props.bari+"' and HH_Code = '"+props.hh+"' and "+
      "Mem_cStatus = '2' and "+
      "ReasonToMigrate != '7' ",
    [],
    (tx, result)=>{      
    var length = result.rows.length;
          if(length>0){
            setFloatButton(true);
            // console.log(floatButton);
          }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
}

useEffect(()=>{
  any_code_2_Parmanent_mig_member();
},[]);







const any_code_6_member=()=>{//guest member check
  // console.log("function runnding");
  db.transaction(tx=>{
    tx.executeSql(
      "select * from member "+
      "WHERE "+
      "cluster = '"+props.cluster+"' and "+
      "block = '"+props.block+"' and "+
      "Village_Code= '"+props.villageCode+"' and "+
      "Bari_Code = '"+props.bari+"' and HH_Code = '"+props.hh+"' and "+
      "Mem_Enroll_Type = '6' and Mem_Cstatus = '1' ",
    [],
    (tx, result)=>{      
      // console.log("query");
    var length = result.rows.length;
          if(length>0){
            setFloatButton(true);
            // console.log(floatButton);
          }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
}

useEffect(()=>{
  any_code_6_member();
},[]);




const[miscQuery,setMiscQuery] = useState(false);

const values_for_misc_query=[
  "exe_from_hh",
  props.roundNo,
  props.cluster,
  props.block,
  props.villageCode,
  props.bari,
  props.hh            
];

          
const call_misc_query=()=>{
  if(parseInt(props.MemberAddTracker)!==1 && parseInt(props.MemberUpdateTracker)!==1){
    setMiscQuery(true);
  }else{
    Alert.alert("সার্ভে ভিজিট","আপনি ইতিমধ্যে, সার্ভে ভিজিট শুরু করেছেন। তাই এই মুহূর্তে অন্য কোন অপশনএ প্রবেশ করতে পারবেননা। তাই অনুগ্রহ করে, সার্ভে ভিজিট সম্পূর্ণ করুন।",[{text:"ঠিক আছে"}]);    
  }  
}


const closeMiscQueryContainer=()=>{
  // console.log("check");
  setMiscQuery(false);
}





useEffect(()=>{
  passValueToSidebar(props.userID, parseInt(props.MemberAddTracker) !==1 && parseInt(props.MemberUpdateTracker)!==1 ? true : false, props.componentId);
},[]);

// parseInt(props.MemberAddTracker) !==1 && parseInt(props.MemberUpdateTracker)!==1

// parseInt(props.surveyStarted_1) !==1 && parseInt(props.surveyStarted_2)!==1 && props.mwra_visit!="yes" && props.newBari!=true





          return (



            


    <View style={{flex:100, flexDirection:"column", justifyContent:"center", backgroundColor:"#f0f0f0"}}>
      <BackButtonHandler />
      {/* #f0f0f0 */}

      {camera_container_open &&(
<Camera_open document_type = {"houses"} close_container={close_camera} mem_serial = {""} idcard = {""} houseno={props.villageCode+""+props.bari+""+props.hh} member_gender = {""}/>
)}

{/* require('../img/khana/khana.png') */}
      <ImageBackground source={imageAvailable} resizeMode='cover' style={{ flex:25, width:"100%", justifyContent:"space-between", alignItems:"center", flexDirection:"row", elevation:4}}>        
      
      {hideOverlay && (
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
    )}
        <View style={{backgroundColor:"#fff", height:"100%", width:"auto", paddingLeft:15, paddingRight:10, marginLeft:14, overflow:"hidden"}} opacity={0.8}>
            <Text style={styles.Khana_des}>বর্তমান রাউন্ড নাম্বার <Text style={styles.Khana_des_value}>{props.roundNo}</Text> </Text>
            <Text style={styles.Khana_des}>গ্রাম <Text style={styles.Khana_des_value}>{props.villageCode}-{props.villageName}</Text></Text>
            <Text style={styles.Khana_des}>ক্লাস্টার/ব্লক/বাড়ি/খানা নাম্বার  <Text style={styles.Khana_des_value}>{props.cluster}/{props.block}/{props.bari}/{props.hh}</Text> </Text>            
            <Text style={styles.Khana_des}>বাড়ির নাম <Text style={styles.Khana_des_value}>{props.bariName}</Text></Text>
            <Text style={styles.Khana_des}>খানার নাম <Text style={styles.Khana_des_value}>{props.hhName}</Text></Text>            
            <Text style={styles.Khana_des}>খানার বর্তমান সদস্য সংখ্যা <Text style={styles.Khana_des_value}>{blockDetails.Block_TotalMember}</Text></Text>
            <Text style={styles.Khana_des}>MWRA <Text style={styles.Khana_des_value}>{blockDetails.Block_TotalMWRA}</Text></Text>
            <Text style={styles.Khana_des}>গর্ভবতী বর্তমান সংখ্যা <Text style={styles.Khana_des_value}>{blockDetails.Block_TotalPregnant}</Text></Text>
            <Text style={styles.Khana_des}>জীবিত শিশু অনূর্ধ্ব পাঁচ (≤৫ বছর) <Text style={styles.Khana_des_value}>{blockDetails.Block_TotalChild}</Text></Text>
            <Text style={styles.Khana_des}>জীবিত সদস্য ৬০ বা তার বেশি (≥৬০ বছর) <Text style={styles.Khana_des_value}>{blockDetails.Block_TotalMember60UP}</Text></Text>
        </View>

        <View opacity={0.6} style={{height:"100%", width:"auto", flexDirection:"column", justifyContent:"flex-end", alignItems:"flex-end", paddingRight:20, paddingBottom:15}}>
                <View style={{backgroundColor:"#000", height:"auto", width:"auto", padding:5, borderRadius:4}}>
                <TouchableOpacity onPress={open_camera}>
                <Image source={require('../img/cam.png')} style={{height:35, width:38}}/>
                </TouchableOpacity>

                </View>
        </View>

      </ImageBackground>

            
      {inside_khana_options && (
      <View style={{height:40, width:"100%", flexDirection:"row", justifyContent:"space-around", paddingTop:5}}>

      
        <Pressable  disabled={inside_hh_options_disable} onPress={()=>Khana_options("member")} style={{backgroundColor:"#bae6fd", width:"30%", alignItems:"center", justifyContent:"center", borderBottomColor:member_list_border_color, borderBottomWidth:4, elevation:3, borderRadius:5}}>
          <Text style={{color:"#404040"}}>মেম্বার লিস্ট</Text>
        </Pressable>
      

        <Pressable disabled={inside_hh_options_disable} onPress={()=>Khana_options("survey")} style={{backgroundColor:"#bae6fd", width:"30%", alignItems:"center", justifyContent:"center", borderBottomColor:survey_visit_list_border_color, borderBottomWidth:4, elevation:3 , borderRadius:5}}>
          <Text style={{color:"#404040"}}>সার্ভে ভিজিট</Text>
        </Pressable>

        <Pressable disabled={inside_hh_options_disable} onPress={()=>Khana_options("mwra")}  style={{backgroundColor:"#bae6fd", width:"30%", alignItems:"center", justifyContent:"center", borderBottomColor:mwra_list_border_color, borderBottomWidth:4, elevation:3, borderRadius:5}}>
          <Text style={{color:"#404040"}}>MWRA</Text>
        </Pressable>

{/* <TouchableOpacity onPress={checkMWRA}>
<Text>
  Check
</Text>
</TouchableOpacity> */}

        

      </View>
    )}      



      <View style={{flex:90, width:"100%"}}>
        
      {visible.member_list_visible && <Inside_khana_member_list cStatus={"1"} villageCode={props.villageCode} bari={props.bari} hh={props.hh}/>}
      {visible.survey_visit_list && <Inside_khana_survey_list villageCode={props.villageCode} bari={props.bari} hh={props.hh}/>}
      {visible.mwra_list && <Inside_khana_mwra_list passedValues = {props_array}/>}
      {visible.survey_question && <Survey_question back_to_hh={move_to_hh_list} checkMwraExistance= {checkMWRA} items = {props_array} />}
       
      </View>





    {floatButton && (
   <Code_7_bubble function={call_misc_query} icon={require("../img/floating.png")}/>
   )}


    {miscQuery &&(
    <MiscQuery closeList={closeMiscQueryContainer} values_for_misc_query={values_for_misc_query}/>
     )}
      
    
    
    
      
         

      {/* call_fun_for_block_list={()=>Khana_options("surveyQuestion")} */}
      {/* call_fun_for_block_list={open_survey_question} */}
      {/* call_fun_for_block_list={open_survey_question} */}
    <ButtonBottom img = {require('../img/plus.png')} call_fun_for_block_list={open_survey_question} userID={props.userID} password={props.password} name={props.name} cluster={props.cluster} componentId={props.componentId} surveyStarted_1 = {props.MemberAddTracker} surveyStarted_2={props.MemberUpdateTracker}/>

    
</View>
  )

}


const styles = StyleSheet.create({
       Khana_des:{
        color:"#1c1917",
        lineHeight:24.5
       },
       Khana_des_value:{
        color:"#be185d",
        fontWeight:"bold"
       }

})

export default Inside_khana_page;

