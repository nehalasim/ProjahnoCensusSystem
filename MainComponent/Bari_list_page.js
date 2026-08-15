import React, { useEffect, useState } from 'react'
import { View, Text, Alert, FlatList, TouchableHighlight, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ButtonBottom from  '../components/ButtonBottom';
import { openDatabase } from 'react-native-sqlite-storage';
// import Block_list_data from '../components/Block_list_data';
import Bari_list_data from '../components/Bari_list_data';
import moment from 'moment';
import Code_7_bubble from '../components/Code_7_bubble';
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











const Bari_list_page = (props) => {



  useEffect(()=>{
    passValueToSidebar(props.userID, true, props.componentId);
  },[]);



  const [bari_list_items, setBari_list_items] = useState([]);
  
  const [totalRows, setTotalRows]=useState({
    totalRowsCount:""
  });

  const [loading, setLoading]=useState({
    loadingState : true
  });
  


        // name:name,
        // userID:userID,
        // password:password,
        // cluster:cluster,
        // roundNo:roundNo,
        // block:block





        const check_before_new_bari=()=>{//to check if there any other blocks incomplete

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
                    go_to_new_bari_reg();
                  }
            })
          })
        
        }




  const go_to_new_bari_reg=()=>{    
  
    Navigation.push(props.componentId,{
      component:{
        name:"New_bari_reg",
        passProps:{
        name:props.name,
        userID:props.userID,
        password:props.password,
        cluster:props.cluster,
        roundNo:props.roundNo,
        block:props.block  
        },
  
        options:{
          topBar:{
            visible:true,
            title:{
              text:"নতুন বাড়ি রেজিস্ট্রেশান"
            },
            rightButtons:[{
              component:{
                name:"BackButton",
                passProps:{
                  originComponentId: props.componentId,
                  position:"new_bari_registration",
                  backButtonText:"বাড়ি লিস্ট",
                  name:props.name,
                  userID:props.userID,
                  password:props.password,
                  cluster:props.cluster,
                  roundNo:props.roundNo,
                  block:props.block  
                }
              }
    
              
            }]
            
          }
        }
  
  
      }
    })
    
  
  }


  




  const get_bari_list_main_query=()=>{
    setLoading({loadingState:true})
    // Alert.alert("asfasdf");

  db.transaction(tx=>{
    tx.executeSql(
    "select case when tracker.update_status = '2' or tracker.update_status is null or tracker.update_status = ''  then 'Not_updated' else 'Updated' end as 'update_status', a.cluster, a.block, a.villageName, a.village, a.bari, a.bariName, date(b.SurveyDate) 'surveyDT', case when c.total_HH>0 then c.total_HH else '0' end as 'totalHH', case when d.total_Done>0 then d.total_Done else '0' end as 'Total_HH_Done'  from clusterDiv a  "+
    "left join (select Cluster, block, village, bari, max(surveyDate)'SurveyDate' from survey group by Cluster, block, village, bari) b on a.cluster = b.cluster and a.block = b.block and a.village = b.village and a.Bari = b.Bari "+
    "left join (select village, bari, count(*)'total_HH' from HH where cStatus = '1' group by village, bari) c on a.village = c.village and a.bari = c.bari "+
    "left join (select Cluster, block,  village, bari, count(*)'total_Done' from survey where surveyNo = '"+props.roundNo+"' group by Cluster, block, village, bari) d on a.cluster = d.cluster and a.block = d.block and a.village = d.village and a.Bari = d.Bari "+
    "left join (select village, Bari, update_status from HH_Update_Tracker where update_status = '2' group by village, Bari) 'tracker' on a.village = tracker.village and a.Bari = tracker.Bari "+
    "WHERE "+
    "a.cStatus = '1' "+
    "AND  "+
    "a.Cluster = '"+props.cluster+"' "+
    "AND "+
    "a.block = '"+props.block+"' "+
    "AND "+
    "c.total_HH>0 "+
    "order by  cast(a.bari as INT)",
    [],
    (tx, result)=>{
      
    var length = result.rows.length;


        setTotalRows({totalRowsCount:length})

          if(length>0){

            let results = [];
            for(let i= 0; i<length; i++){
               let items=result.rows.item(i);

              //  Alert.alert("sdf"+items.doneBari);

              var bari = result.rows.item(i).bari;
              var bariName = ((result.rows.item(i).bariName).trim()).toUpperCase();
              var villageName = ((result.rows.item(i).villageName).trim()).toUpperCase();;
              var villageCode = result.rows.item(i).village;
              var totalHH = result.rows.item(i).totalHH;
              var Total_HH_Done = result.rows.item(i).Total_HH_Done;
              var update_status = result.rows.item(i).update_status;//not requred at this stage, it will check during HH

              // Alert.alert(""+Total_HH_Done);

              var surveyDT;
              if(result.rows.item(i).surveyDT==null){
              surveyDT = "কোন ভিজিট হইনি";
              }
              else{
              
              var surveyDT = moment(result.rows.item(i).surveyDT).format('MMM DD, YYYY');
              }



              if(parseInt(Total_HH_Done)>0){
                if(parseInt(Total_HH_Done)===parseInt(totalHH) || parseInt(Total_HH_Done)>parseInt(totalHH)){//Total_HH_Done>totalHH this is used just to avoid error because in survey table multiple row insrtered for same round and HH
                   var bari_completed_for_this_round = require("../img/done.png");
                   }
                   else{
                       var bari_completed_for_this_round = require("../img/inComplete.png");
                   }
                }
               else{
                   var bari_completed_for_this_round = require("../img/notDone.png");
               }
               
               results.push({bari:bari, bariName:bariName,villageName:villageName, villageCode:villageCode,totalHH:totalHH, Total_HH_Done:Total_HH_Done, update_status:update_status, surveyDT:surveyDT, bari_completed_for_this_round:bari_completed_for_this_round}) 
               

            }
            setBari_list_items(results);
          setLoading({loadingState:false})
          }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
  }
  










    const render_bari_list_items=({item})=>{

      return(
        <Bari_list_data item={item} cluster = {props.cluster} block={props.block} userID={props.userID} componentId = {props.componentId} name={props.name} roundNo={props.roundNo} password={props.password} />
      )
    }
        // onPress={call.bind(this,item.block_no)}
       
        
       

        const SerachBar=()=>{
          return(
            <View style={{padding:10, backgroundColor:"#fff", borderBottomWidth:1, borderBottomColor:"#b0acac"}}>

            <View style={{paddingLeft:5, flexDirection:"row", justifyContent:"space-between"}}>

            <View>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                ক্লাস্টার {props.cluster} | ব্লক {props.block} | মোট বাড়ি {totalRows.totalRowsCount}
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
          get_bari_list_main_query();
          },[]);


    



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



      



    <View style={{flex:100, width:"100%", alignSelf:"center"}}>
      <FlatList 
      ListHeaderComponent={SerachBar}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={5}
      data={bari_list_items} 
      renderItem={render_bari_list_items}
      keyExtractor={(bari_list_items)=> bari_list_items.bari}
      onRefresh={()=>this.get_bari_list_main_query}
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
      
    
    
    

         

    
    <ButtonBottom img = {require('../img/plus.png')} call_fun_for_block_list={check_before_new_bari} userID={props.userID} password={props.password} name={props.name} cluster={props.cluster} componentId={props.componentId}/>

    
</View>
  )
}
}

export default Bari_list_page;

