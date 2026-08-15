import React, { useEffect, useState } from 'react'
import { View, Text, Alert, FlatList, TouchableHighlight, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ButtonBottom from  '../components/ButtonBottom';
import { openDatabase } from 'react-native-sqlite-storage';
// import Block_list_data from '../components/Block_list_data';

import Khana_list_data from '../components/Khana_list_data';
import moment from 'moment';
import Code_7_bubble from '../components/Code_7_bubble';
import MiscQuery from '../components/MiscQuery';
import { passValueToSidebar } from '../components/SideBar_values';
// import Database from "./Database"



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











const Khana_list_page = (props) => {


  useEffect(()=>{
    passValueToSidebar(props.userID, true);
  },[]);



  const [newBariMsg, SetNewBariMsg] = useState(false);

  const [khana_list_items, setKhana_list_items] = useState([]);
  
  const [totalRows, setTotalRows]=useState({
    totalRowsCount:""
  });

  const [loading, setLoading]=useState({
    loadingState : true
  });
  




const [floatButton, setFloatButton] = useState(false);  


const any_code_7_member=()=>{//internal migration
  db.transaction(tx=>{
    tx.executeSql(
      "select * from member "+
      "WHERE "+
      "cluster = '"+props.cluster+"' and "+
      "block = '"+props.block+"' and "+
      "Village_Code= '"+props.villageCode+"' and "+
      "Bari_Code = '"+props.bari+"' and "+
      "Mem_cStatus = '2' and "+
      "ReasonToMigrate = '7' ",
    [],
    (tx, result)=>{      
    var length = result.rows.length;
          if(length>0){
            setFloatButton(true);
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





const any_code_6_member=()=>{//guest member check
  db.transaction(tx=>{
    tx.executeSql(
      "select * from member "+
      "WHERE "+
      "cluster = '"+props.cluster+"' and "+
      "block = '"+props.block+"' and "+
      "Village_Code= '"+props.villageCode+"' and "+
      "Bari_Code = '"+props.bari+"' and "+
      "Mem_Enroll_Type = '6' and Mem_Cstatus = '1' ",
    [],
    (tx, result)=>{      
    var length = result.rows.length;
          if(length>0){
            setFloatButton(true);
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









  const get_khana_list_main_query=()=>{
    setLoading({loadingState:true})
    // Alert.alert("asfasdf");

  db.transaction(tx=>{
    tx.executeSql(
    "select case when tracker.update_status = '1' then '1' else '2' end as 'Update_status', hh.hh 'hh', hh.hh_name 'hh_name', count(distinct member.Mem_SL) 'totalMember', max(survey.surveyDate) 'surveyDT', max(cast(survey.surveyNo as INT)) 'curSurDone' from hh "+ //, case when e.Moved_Status>0 then Moved_Status else '0' end as 'Moved_Status_4'
    "left join survey on survey.village = hh.village and survey.bari = hh.bari and survey.hh = hh.hh and survey.Cluster = '"+props.cluster+"' and survey.Block = '"+props.block+"' "+
    "left join member on hh.village = member.Village_Code and hh.bari = member.Bari_Code and hh.hh = member.HH_Code and member.HH_Code is not null and member.Mem_Cstatus in('1') "+
    //"left join (select Village_Code, Bari_Code, HH_Code, count(*)'Moved_Status' from member where date(Entry_Date) = '1908-08-08' group by Village_Code, Bari_Code, HH_Code) e on e.Village_Code = hh.village and e.Bari_Code = hh.bari and e.HH_Code = hh.hh "+
    //Disabled as HH update completed//"left join HH_Update_Tracker 'tracker' on survey.village = tracker.village and survey.bari = tracker.bari and survey.hh = tracker.hh  and tracker.Cluster = '"+cl.trim()+"' and tracker.Block = '"+bl.trim()+"' "+
    "left join HH_Relation_Update_Tracker 'tracker' on survey.village = tracker.village and survey.bari = tracker.bari and survey.hh = tracker.hh  and tracker.Cluster = '"+props.cluster+"' and tracker.Block = '"+props.block+"' "+
    "where hh.village = '"+props.villageCode+"' and hh.bari = '"+props.bari+"' and hh.cStatus = '1' group by hh.village, hh.bari, hh.hh order by hh.hh asc ",
    [],
    (tx, result)=>{
      
    var length = result.rows.length;


        setTotalRows({totalRowsCount:length})

          if(length>0){

            let results = [];
            for(let i= 0; i<length; i++){
               let items=result.rows.item(i);

              //  Alert.alert("sdf"+items.doneBari);

              var hh = result.rows.item(i).hh;
              var hhName = ((result.rows.item(i).hh_name).trim()).toUpperCase();
              var totalMember = result.rows.item(i).totalMember;
              var Update_status = result.rows.item(i).Update_status;
              var curSurDone = result.rows.item(i).curSurDone;
              //var Moved_Status_4 = result.rows.item(i).Moved_Status_4;
              var curSurDoneImg;
              

              // Alert.alert(""+Total_HH_Done);


              if(parseInt(curSurDone)==parseInt(props.roundNo))// && Moved_Status_4==="0")
              {
              curSurDoneImg = require("../img/done.png");
              }
              else{
              curSurDoneImg = require("../img/notDone.png");
              }

              var surveyDT;
              if(result.rows.item(i).surveyDT==null){
              surveyDT = "কোন ভিজিট হইনি";
              }
              else{
              var surveyDT_Database_KHA = result.rows.item(i).surveyDT;
              var surveyDT = moment(surveyDT_Database_KHA).format('MMM DD, YYYY');
              }

              
               
               results.push({villageName:props.villageName, bariName:props.bariName, cluster:props.cluster ,block:props.block, villageCode:props.villageCode, bari:props.bari, hh:hh, hhName:hhName,curSurDoneImg:curSurDoneImg, totalMember:totalMember, surveyDT:surveyDT}) 
               

            }
            setKhana_list_items(results);
          setLoading({loadingState:false})
          SetNewBariMsg(false);
          }
          else{
            setLoading({loadingState:false})     
            SetNewBariMsg(true);
          }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
  }
  










    const render_khana_list_items=({item})=>{

      return(
        <Khana_list_data item={item} cluster = {props.cluster} block={props.block} userID={props.userID} password={props.password} componentId = {props.componentId} name={props.name} roundNo={props.roundNo} />
      )
    }
        // onPress={call.bind(this,item.block_no)}
       
        
       

        const SerachBar=()=>{
          return(
            <View style={{padding:10, backgroundColor:"#fff", borderBottomWidth:1, borderBottomColor:"#b0acac"}}>

            <View style={{paddingLeft:5, flexDirection:"row", justifyContent:"space-between"}}>
              <View>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                ক্লাস্টার {props.cluster} | ব্লক {props.block} | বাড়ি {props.bari} | মোট খানা {totalRows.totalRowsCount}
              </Text>            
              </View>

              <View>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
              রাউন্ড {props.roundNo}
              </Text>
              </View>

            </View>

            </View>
            
          )
        }


        useEffect( ()=>{
            get_khana_list_main_query();
          },[]);


    

          const values_for_misc_query=[
            "exe_from_hh_list",
            props.roundNo,
            props.cluster,
            props.block,
            props.villageCode,
            props.bari            
          ];


const[miscQuery,setMiscQuery] = useState(false);
          
const call_misc_query=()=>{
  setMiscQuery(true);
}


const closeMiscQueryContainer=()=>{
  console.log("check");
  setMiscQuery(false);
}




const check_before_new_hh=()=>{//to check if there any other blocks incomplete

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
            go_to_new_hh_reg();
          }
    })
  })

}




const go_to_new_hh_reg=()=>{
  Navigation.push(props.componentId,{
    component:{
      name:"New_hh_reg",
      passProps:{
      name:props.name,
      userID:props.userID,
      password:props.password,
      cluster:props.cluster,
      roundNo:props.roundNo,
      block:props.block,
      bari:props.bari,
      bariName:props.bariName,
      villageCode:props.villageCode,
      villageName:props.villageName,
      componentId:props.componentId
      },
      options:{
        topBar:{
          visible:true,
          title:{
            text:"নতুন খানা রেজিস্ট্রেশান"
          },
          rightButtons:[{
            component:{
              name:"BackButton",
              passProps:{
                originComponentId: props.componentId,
                position:"new_hh_registration",
                backButtonText:"খানা লিস্ট",
                name:props.name,
                userID:props.userID,
                password:props.password,
                cluster:props.cluster,
                roundNo:props.roundNo,
                block:props.block,
                bari:props.bari,
                bariName:props.bariName,
                villageCode:props.villageCode,
                villageName:props.villageName,
                componentId:props.componentId
              }
            }
  
            
          }]
          
        }
      }


    }
  })
}



useEffect(()=>{
  passValueToSidebar(props.userID, newBariMsg==true? false : true, props.componentId);
},[newBariMsg]);


        if(loading.loadingState==true){
          return(
            <View style={{justifyContent:"center", alignItems:"center", height:"100%"}}>
            <ActivityIndicator size={'large'} color={"#be185d"}/>

            </View>
          )
        }
        else{
  return (



    <View style={{flex:100, flexDirection:"column", justifyContent:"center", backgroundColor:"#f0f0f0"}}>
      {/* #f0f0f0 */}



   {floatButton && (
   <Code_7_bubble function={call_misc_query} icon={require("../img/floating.png")}/>
   )}


    {miscQuery &&(
    <MiscQuery closeList={closeMiscQueryContainer} values_for_misc_query={values_for_misc_query}/>
     )}

      

        {newBariMsg && (
          <View style={{marginBottom:10, marginTop:"1%",height:"auto", width:"98%", padding:10, backgroundColor:"#fff", borderRadius:10, elevation:1, backgroundColor:"#FFF", alignSelf:"center"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                নতুন বাড়ির জন্য নতুন খানা।               
              </Text>
              
              <Text style={{fontSize:12, color:"#ed1144"}}>              
                  বিঃদ্রঃ আপনার দেয়া নতুন বাড়ির তথ্য সফলভাবে সেভ হয়েছে। এখনই, কমপক্ষে একটি খানা তৈরী করতে হবে। নতুবা, নতুন বাড়িটি, বাড়ির লিস্ট থেকে সরে যাবে এবং বাড়ির লিস্টে দেখতে পাবেননা।
              </Text>
            </View>
            )}


    <View style={{flex:100, width:"100%", alignSelf:"center"}}>
      <FlatList 
      ListHeaderComponent={SerachBar}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={5}
      data={khana_list_items} 
      renderItem={render_khana_list_items}
      keyExtractor={(khana_list_items)=> khana_list_items.hh}
      onRefresh={()=>this.get_khana_list_main_query}
      refreshing={loading.loadingState}
      stickyHeaderIndices={[0]}
      />
      </View>

      

      {/* <Text>{props.name}</Text>
      <Text>{props.userID}</Text>
      <Text>{props.password}</Text>
      <Text>{props.cluster}</Text> */}

{/* <Text>
  {bari_list_items.block_no}
</Text> */}
      
    

    
    

         

    
    <ButtonBottom img = {require('../img/plus.png')} call_fun_for_block_list={check_before_new_hh} newBari={newBariMsg} userID={props.userID} password={props.password} name={props.name} cluster={props.cluster} componentId={props.componentId}/>

    
</View>
  )
}
}

export default Khana_list_page;

