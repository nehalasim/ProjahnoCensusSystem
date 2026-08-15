'use strict';

import React, { memo, useEffect, useState } from 'react'
import { StyleSheet,View, Text, Alert, FlatList, TouchableHighlight, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ButtonBottom from '../components/ButtonBottom';
import { openDatabase } from 'react-native-sqlite-storage';
import { PieChart } from 'react-native-gifted-charts';
import moment from 'moment';
// openDatabase.DEBUG(true);
// openDatabase.enablePromise(false);


// import Database from "../Database"
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







  

const Khana_list_data = ({item, cluster, block, userID, componentId, name, roundNo, password}) => {



  
const call=()=>{
  // console.log("c"+cluster);
  // console.log("b"+block);
  // console.log("bari"+item.bari);
  // Alert.alert("bariname"+item.bariName);
  // console.log("bariname"+item.bariName)
  // Alert.alert("bariname"+item.bariName);
  // console.log("hh"+item.hh);
  // console.log("hh_Name"+item.hhName);
  // console.log("u"+userID);
  // console.log("pass"+password);
  // console.log("c"+componentId);
  // console.log("n"+name);
  // console.log("rn"+roundNo);
  // console.log("Vill"+item.villageCode);
  

  Navigation.push(componentId,{
    component:{
      name:"Inside_khana_page",
      passProps:{
        name:name,
        userID:userID,
        password:password,
        cluster:cluster,
        roundNo:roundNo,
        block:block,
        bari:item.bari,
        bariName:item.bariName,
        hh:item.hh,
        hhName:item.hhName,
        villageCode:item.villageCode,
        villageName:item.villageName,
        componentId:componentId

      },

      options:{
        topBar:{
          visible:true,
          title:{
            text:"খানা ভিজিট"
          },
          rightButtons:[{
            // id:"backbutton",
            component:{
              name:"BackButton",
              passProps:{
                originComponentId: componentId,
                position:"Inside_khana_page",
                backButtonText:"খানার লিস্ট",
                name:name,
                password:password,
                userID:userID,               
                cluster:cluster,
                roundNo:roundNo,
                block:block,
                bari:item.bari,
                hh:item.hh,
                villageCode:item.villageCode,
                bariName:item.bariName,
                villageName:item.villageName

                
              }
            }
  
            
          }]
          
        }
      }


    }
  })
  

}






  const renderLegend = (text, color) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || '#44403c',
          }}
        />
        <Text style={{fontWeight:"bold", color: '#44403c', fontSize: 16}}>{text || ''}</Text>
      </View>
    );
  };

    const[expanded, setExpanded]=useState(false);
    const[blockDetails, setBlockDetails]=useState({
        Block_TotalMember:"0",      
        Block_TotalMWRA:"0",
        Block_TotalPregnant:"0",
        Block_TotalChild:"0",
        Block_TotalMember60UP:"0",
        Block_TotalChildDied:"0",
        Block_TotalMemberdDied:"0",
        khana_LastEntryDate:"0",
        khana_NextEntryStartDate:"0",
        khana_NextEntryEndtDate:"0"

    })

    

    const block_show_details=()=>{
      

      setExpanded(!expanded)

      
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
          "b.Cluster = '"+cluster+"' and b.Block='"+block+"' and b.Bari_code='"+item.bari+"' and b.HH_Code = '"+item.hh+"' ",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                  console.log("selected");
                   let items=result.rows.item(i);          
                   setBlockDetails((blockDetails)=>({...blockDetails, Block_TotalPregnant:items.totalPregnant}))
                }    
        })
      })



      db.transaction(tx=>{
        tx.executeSql(
          "select count(a.Mem_SL) 'totalMemNo' from member a "+
          "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
          "a.cluster = b.cluster and "+
          "a.Village_Code = b.village and "+
          "a.Bari_Code = b.bari "+
          "where "+
          "a.Mem_Cstatus in ('1') "+
          "and "+
          "a.Cluster = '"+cluster+"' and a.Block='"+block+"' and a.Bari_code = '"+item.bari+"' and a.HH_Code = '"+item.hh+"' ",
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
          "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
          "a.cluster = b.cluster and "+
          "a.Village_Code = b.village and "+
          "a.Bari_Code = b.bari "+
          "where "+
          "a.Mem_Cstatus in ('1') and "+
          "a.is_MWRA = '1' "+
          "and "+
          "a.Cluster = '"+cluster+"' and a.Block='"+block+"' and a.Bari_code = '"+item.bari+"' and a.HH_Code = '"+item.hh+"'  ",
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
          "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
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
          "a.Cluster = '"+cluster+"' and a.Block='"+block+"' and a.Bari_code = '"+item.bari+"' and a.HH_Code = '"+item.hh+"'  ",
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
          "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on  "+
          "a.cluster = b.cluster and  "+
          "a.Village_Code = b.village and  "+
          "a.Bari_Code = b.bari  "+
          "where  "+
          "a.Mem_Cstatus in ('1')  "+
          "and  "+
          "a.Cluster = '"+cluster+"' and a.Block = '"+block+"' and a.Bari_code = '"+item.bari+"' and a.HH_Code = '"+item.hh+"'  "+
          "and  "+
          "(((JulianDay('now')) - JulianDay(a.Mem_DOB))/365.25)>=60  ",
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







      db.transaction(tx=>{
        tx.executeSql(
          "select count(a.Mem_SL) 'totalChildDied' from member a "+
          "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
          "a.cluster = b.cluster and "+
          "a.Village_Code = b.village and "+
          "a.Bari_Code = b.bari "+
          "where "+
          "a.Mem_Cstatus in ('3') "+
          "and "+
          "strftime('%Y',a.statusCngOn) = strftime('%Y','now') "+ 
          "and "+
          "a.Cluster = '"+cluster+"' and a.Block='"+block+"' and a.Bari_code = '"+item.bari+"' and a.HH_Code = '"+item.hh+"' "+ 
          "and  "+
          "(((JulianDay('now')) - JulianDay(a.Mem_DOB))/365.25)<=5  ",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);          
                  //  setBlockDetails({Block_TotalMWRA:items.totalMWRA});    
                   setBlockDetails((blockDetails)=>({...blockDetails, Block_TotalChildDied:items.totalChildDied}))
                }    
        })
      })




      db.transaction(tx=>{
        tx.executeSql(
          "select count(a.Mem_SL) 'totalMemberDied' from member a "+
          "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
          "a.cluster = b.cluster and "+
          "a.Village_Code = b.village and "+
          "a.Bari_Code = b.bari "+
          "where "+
          "a.Mem_Cstatus in ('3') "+
          "and "+
          "strftime('%Y',a.statusCngOn) = strftime('%Y','now') "+ 
          "and "+
          "a.Cluster = '"+cluster+"' and a.Block='"+block+"' and a.Bari_code = '"+item.bari+"' and a.HH_Code = '"+item.hh+"' "+ 
          "and  "+
          "(((JulianDay('now')) - JulianDay(a.Mem_DOB))/365.25)>5  ",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);          
                  //  setBlockDetails({Block_TotalMWRA:items.totalMWRA});    
                   setBlockDetails((blockDetails)=>({...blockDetails, Block_TotalMemberdDied:items.totalMemberDied}))
                }    
        })
      })





      db.transaction(tx=>{
        tx.executeSql(
          "select strftime('%Y-%m-%d',Entry_Date) 'EntryDate', nextSurvey_StartDate, nextSurvey_EndDate from survey "+
          "WHERE "+
          "cluster = '"+item.cluster+"' "+
          "AND "+
          "block = '"+item.block+"' "+
          "and "+
          "village = '"+item.villageCode+"' "+
          "and "+
          "bari='"+item.bari+"' "+
          "and "+
          "hh = '"+item.hh+"' "+
          "order by Date(Entry_Date) DESC limit 1",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);          
                

                       var last_entry_date = ''
                       if(items.EntryDate==null){
                        last_entry_date='কোন ভিজিট হয়নি'
                       }else{
                        last_entry_date=moment(items.EntryDate).format('MMM DD, YYYY');
                       }
                       
                       
                       var next_survey_start_date = ''
                       if(items.nextSurvey_StartDate==null){
                        next_survey_start_date='কোন ভিজিট হয়নি'
                       }else{
                        next_survey_start_date=moment(items.nextSurvey_StartDate).format('MMM DD, YYYY');
                       }


                       var next_survey_end_date = ''
                       if(items.nextSurvey_EndDate==null){
                        next_survey_end_date='কোন ভিজিট হয়নি'
                       }else{
                        next_survey_end_date=moment(items.nextSurvey_EndDate).format('MMM DD, YYYY');
                       }




                   setBlockDetails((blockDetails)=>({...blockDetails, khana_LastEntryDate:last_entry_date}))
                   setBlockDetails((blockDetails)=>({...blockDetails, khana_NextEntryStartDate:next_survey_start_date}))
                   setBlockDetails((blockDetails)=>({...blockDetails, khana_NextEntryEndtDate:next_survey_end_date}))


              


                }    
        })
      })










    }

  return (
    
        <View style={{flex:100, flexDirection:"row", justifyContent:"flex-start"}}>
        <View style={{flex:80}}>




    <TouchableHighlight underlayColor={"#cffafe"} onPress={call.bind(this,item.hh)}>
        
        <View style={{flexDirection:"column", flex:100}}>
        <View style={{flex:90}}>

        

    <View style={{backgroundColor:"#fff", height:98, width:"100%", borderBottomWidth:1, borderBottomColor:"#b0acac", flex:100, flexDirection:"row",  padding:2, justifyContent:"space-between"}}>

      <View style={{ flex:40, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
          <View style={{flex:2, alignItems:"center",justifyContent:"center"}}>
          <Image source={require('../img/khana.png')} style={{height:85, width:85}} resizeMode='contain'/>
          </View>

        <View style={{flex:3.5}}>
        <Text style={{color:"#be185d", fontSize:35}}>
        {item.hh}
        </Text>
        
        <Text style={{color:"#be185d", fontSize:12}} ellipsizeMode='tail' numberOfLines={1}> 
        <Image source={require('../img/MenuIcon/star.png')} style={{height:20, width:20}}/> {item.hhName}
        {/* {item.completed_bari}/{item.total_bari} */}
        </Text>
        </View> 
      </View>

      

      <View style={{flex:30, alignItems:"center", justifyContent:"space-around", flexDirection:"column"}}>
        <Text style={{color:"#383838", fontSize:12}}>
        ভিজিট স্ট্যাটাস
        </Text>
        {/* cluster:props.cluster ,block:props.block, villageCode:props.villageCode, bari:props.bari, hh:hh, hhName:hhName,curSurDoneImg:curSurDoneImg, totalMember:totalMember, surveyDT:surveyDT */}
        <Image source={item.curSurDoneImg} style={{height:30, width:30}} resizeMode='contain'/>
      </View>
      
      <View style={{flex:40, alignItems:"center", justifyContent:"center"}}>
      <Text style={{color:"#383838", fontSize:12}}>              
      
      সর্বশেষ ভিজিটের তারিখ
      
      </Text>

      
        <Text style={{color:"#be185d", fontSize:12, fontWeight:"bold"}}>              
        {item.surveyDT}
        </Text>
        {/* <Image onPress={()=>setExpanded(!expanded)} source={require('./img/khana.png')} style={{height:"20%", width:"20%"}}/> */}
      
        
      </View>
      
    </View>
    </View>
        <View style={{flex:10}}>
        {expanded &&(
        
        <View style={{flexDirection:"row", flex:100, padding:10, justifyContent:"space-around", alignItems:"center"}}>
          
          <View style={{width:"48%", backgroundColor:"#d4d4d4", borderRadius:5, elevation:1, padding:5}}>
          <Text style={styles.fontStyle}>পরবর্তী ভিজিটের শুরুর তারিখ  <Text style={{fontWeight:"bold", color:"#be185d"}}>{blockDetails.khana_NextEntryStartDate}</Text></Text>
          {/* <Text style={styles.fontStyle}>পরবর্তী ভিজিটের সর্বশেষ তারিখ <Text style={{fontWeight:"bold", color:"#be185d"}}>{blockDetails.khana_NextEntryEndtDate}</Text></Text>             */}
          </View>

          <View style={{width:"48%",backgroundColor:"#d4d4d4", borderRadius:5, elevation:1, padding:5}}>




          <View>
          <Text style={styles.fontStyle}>সর্বমোট জনসংখ্যা <Text style={{fontWeight:"bold", color:"#be185d"}}>{blockDetails.Block_TotalMember}</Text></Text>
          <Text style={styles.fontStyle}>MWRA <Text style={{fontWeight:"bold", color:"#be185d"}}>{blockDetails.Block_TotalMWRA}</Text></Text>
          <Text style={styles.fontStyle}>গর্ভবতী বর্তমান সংখ্যা <Text style={{fontWeight:"bold", color:"#be185d"}}>{blockDetails.Block_TotalPregnant}</Text></Text>
          <Text style={styles.fontStyle}>জীবিত শিশু অনূর্ধ্ব পাঁচ (≤৫ বছর) <Text style={{fontWeight:"bold", color:"#be185d"}}> {blockDetails.Block_TotalChild}</Text></Text>
          <Text style={styles.fontStyle}>জীবিত সদস্য ৬০ বা তার বেশি (≥৬০ বছর) <Text style={{fontWeight:"bold", color:"#be185d"}}> {blockDetails.Block_TotalMember60UP}</Text></Text>
          <Text style={styles.fontStyle}>এই বছর শিশু মৃত্যু অনূর্ধ্ব পাঁচ (≤৫ বছর) <Text style={{fontWeight:"bold", color:"#be185d"}}>{blockDetails.Block_TotalChildDied}</Text></Text>
          <Text style={styles.fontStyle}>এই বছর মৃত্যুর সংখ্যা <Text style={{fontWeight:"bold", color:"#be185d"}}>{blockDetails.Block_TotalMemberdDied}</Text></Text>

          {/* <Text style={styles.fontStyle}>সর্বশেষ ভিজিটের তারিখ <Text style={{fontWeight:"bold", color:"#be185d"}}>{blockDetails.khana_LastEntryDate}</Text></Text> */}

          

          </View>

          </View>




        </View>
        
        
        )}
        </View>
        </View>
    </TouchableHighlight>    







    </View>

    <TouchableHighlight underlayColor={"#cffafe"} onPress={block_show_details} style={{backgroundColor:"#e0f2fe", flex:7, borderBottomWidth:1, borderBottomColor:"#a3a3a3", justifyContent:"center", alignItems:"center"}}>
    <View>
        <Image source={require('../img/down.png')} style={{height:30, width:30}}/>
    </View>
    </TouchableHighlight>

    </View>


    

    
  )
}

const styles = StyleSheet.create({
  fontStyle:{
    lineHeight:25,
    fontSize:14,
    color:"#404040"
  }
})


export default memo(Khana_list_data)
