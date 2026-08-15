import React, { useEffect, useState } from 'react'
import { View, Text, Alert, FlatList, TouchableHighlight, Image, TouchableOpacity, TextInput, ActivityIndicator, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ButtonBottom from  '../components/ButtonBottom';
import { openDatabase } from 'react-native-sqlite-storage';
import Block_list_data from '../components/Block_list_data';
import moment from 'moment';
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











const Block_list_page = (props) => {



  useEffect(()=>{
    passValueToSidebar(props.userID, true, props.componentId);
  },[]);

  const [block_list_items, setBlock_list_items] = useState([]);
  
  const [totalRows, setTotalRows]=useState({
    totalRowsCount:""
  });

  const [loading, setLoading]=useState({
    loadingState : true
  });





const get_block_list_main_query=()=>{

    setLoading({loadingState:true})
    // Alert.alert("asfasdf");

  db.transaction(tx=>{
    tx.executeSql(
    "select a.Block 'block', count(a.bari)'bari', count(c.bari)'doneBari', c.surveyDate 'lastDateOFSurvey', a.village 'village_Code' from clusterDiv a "+
    "left join (select cluster, block, bari, surveyDate from survey where surveyNo = (select Round_No from Surv_Round where strftime('%Y-%m-%d', date('now','localtime')) between Start_Date and End_Date) group by cluster, block, bari)c "+
    "on c.cluster = a.cluster and a.block = c.block and a.bari = c.Bari "+
    "WHERE "+
    "a.Cluster = '"+props.cluster+"' "+
    "AND "+
    "a.village||a.bari in  (select village||bari from hh where cStatus = '1') "+
    "AND "+
    "a.CStatus= '1' "+
    "group by a.Block "+
    "order by a.block",
    [],
    (tx, result)=>{
      
    var length = result.rows.length;


        setTotalRows({totalRowsCount:length})

          if(length>0){

            let results = [];
            for(let i= 0; i<length; i++){
               let items=result.rows.item(i);

              //  Alert.alert("sdf"+items.doneBari);

               if(parseInt(items.bari)==parseInt(items.doneBari)){
                var block_visit_status_icon = require("../img/done.png");
               }
               else if(parseInt(items.doneBari)<parseInt(items.bari) && parseInt(items.doneBari)!=0){
                var block_visit_status_icon = require("../img/inComplete.png");
               }else{
                var block_visit_status_icon = require("../img/notDone.png");
               }


                var lstSurDt="";
                if(items.lastDateOFSurvey=="" || items.lastDateOFSurvey==null){
                lstSurDt = "এই রাউন্ডএ কোন ভিজিট হয়নি।";
                }
                else{
              

                var lstSurDt = moment(items.lastDateOFSurvey).format('MMM DD, YYYY');
                }
               
               results.push({block_no: items.block, total_bari: items.bari, completed_bari: items.doneBari, last_dt_survey: lstSurDt, block_visit_status:block_visit_status_icon}) 
              //  console.log(items.block);
              //  console.log(items.doneBari);
               

            }
            setBlock_list_items(results);
          setLoading({loadingState:false})
          }

    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });
  }
  










    const render_block_list_items=({item})=>{

      return(
        <Block_list_data item={item} cluster = {props.cluster} name={props.name} password = {props.password} userID={props.userID} componentId={props.componentId} roundNo={props.roundNo}/>
      )
    }
        // onPress={call.bind(this,item.block_no)}
       
        
       

        const SerachBar=()=>{
          return(
            <View style={{padding:10, backgroundColor:"#fff", borderBottomWidth:1, borderBottomColor:"#b0acac"}}>

            <View style={{paddingLeft:5, flexDirection:"row", justifyContent:"space-between"}}>
              <View>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
               ক্লাস্টার {props.cluster} | মোট ব্লক {totalRows.totalRowsCount}
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
          get_block_list_main_query();
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
      data={block_list_items} 
      renderItem={render_block_list_items}
      keyExtractor={(block_list_items)=> block_list_items.block_no}
      onRefresh={()=>this.get_block_list_main_query}
      refreshing={loading.loadingState}
      stickyHeaderIndices={[0]}
      />
      </View>


    
</View>
  )
}
}

export default Block_list_page;

