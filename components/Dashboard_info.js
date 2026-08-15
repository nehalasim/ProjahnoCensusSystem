import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';



const db = openDatabase(
    {
    name: 'prf.db',
    location: 'default',
    //createFromLocation:"/storage/emulated/0/103_prf.db"
  },
  ()=>{console.log("Database OK.....")},
  error=>{Alert.alert("Database ERROR!!!!!!")}
  );





const Dashboard_info = ({cluster}) => {

    const[DashboardInfo,SetDashboardInfo] = useState({
        blocks:0,
        bari:0,
        member:0,
        guset:0,
        MWRA:0,
        pregnant:0,
        migration:0,
        died:0,
        member_60_up:0,
        member_5_below:0
    })

    const DashInfo=()=>{






        db.transaction(tx=>{
            tx.executeSql(
              "select count(distinct block)'totalBlock' from clusterDiv where cluster = '"+cluster+"' ",
            [],
            (tx, result)=>{          
            var length = result.rows.length;  
                    for(let i= 0; i<length; i++){
                       let items=result.rows.item(i);          
                       SetDashboardInfo((DashboardInfo)=>({...DashboardInfo, blocks:items.totalBlock}))
                    }    
            })
          })


          db.transaction(tx=>{
            tx.executeSql(
              "select count(bari)'totalBari' from clusterDiv where cStatus='1' and Cluster = '"+cluster+"' ",
            [],
            (tx, result)=>{          
            var length = result.rows.length;  
                    for(let i= 0; i<length; i++){
                       let items=result.rows.item(i);          
                       SetDashboardInfo((DashboardInfo)=>({...DashboardInfo, bari:items.totalBari}))
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
              "a.Cluster = '"+cluster+"' ",
            [],
            (tx, result)=>{          
            var length = result.rows.length;  
                    for(let i= 0; i<length; i++){
                       let items=result.rows.item(i);          
                       SetDashboardInfo((DashboardInfo)=>({...DashboardInfo, member:items.totalMemNo}))
                    }    
            })
          })



          db.transaction(tx=>{
            tx.executeSql(
              "select count(a.Mem_SL) 'totalGuest' from member a "+
              "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
              "a.cluster = b.cluster and "+
              "a.Village_Code = b.village and "+
              "a.Bari_Code = b.bari "+
              "where "+
              "a.Mem_Cstatus in ('6') "+
              "and "+
              "a.Cluster = '"+cluster+"' ",
            [],
            (tx, result)=>{          
            var length = result.rows.length;  
                    for(let i= 0; i<length; i++){
                       let items=result.rows.item(i);          
                       SetDashboardInfo((DashboardInfo)=>({...DashboardInfo, guset:items.totalGuest}))
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
              "a.Cluster = '"+cluster+"' ",
            [],
            (tx, result)=>{          
            var length = result.rows.length;  
                    for(let i= 0; i<length; i++){
                       let items=result.rows.item(i);          
                       SetDashboardInfo((DashboardInfo)=>({...DashboardInfo, MWRA:items.totalMWRA}))
                    }    
            })
          })




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
          "b.Cluster = '"+cluster+"'",
        [],
        (tx, result)=>{          
        var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                  console.log("selected");
                   let items=result.rows.item(i);          
                   SetDashboardInfo((DashboardInfo)=>({...DashboardInfo, pregnant:items.totalPregnant}))
                }    
        })
      })





          db.transaction(tx=>{
            tx.executeSql(
              "select count(a.Mem_SL) 'totalMig' from member a "+
              "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
              "a.cluster = b.cluster and "+
              "a.Village_Code = b.village and "+
              "a.Bari_Code = b.bari "+
              "where "+
              "a.Mem_Cstatus in ('2') "+
              "AND "+
              "a.ReasonToMigrate!='7' "+
              "and "+
              "strftime('%Y',a.statusCngOn) = strftime('%Y','now') "+ 
              "and "+
              "a.Cluster = '"+cluster+"' ",
            [],
            (tx, result)=>{          
            var length = result.rows.length;  
                    for(let i= 0; i<length; i++){
                       let items=result.rows.item(i);          
                       SetDashboardInfo((DashboardInfo)=>({...DashboardInfo, migration:items.totalMig}))
                    }    
            })
          })




          db.transaction(tx=>{
            tx.executeSql(
              "select count(a.Mem_SL) 'totalDied' from member a "+
              "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
              "a.cluster = b.cluster and "+
              "a.Village_Code = b.village and "+
              "a.Bari_Code = b.bari "+
              "where "+
              "a.Mem_Cstatus in ('3') "+
              "and "+
              "strftime('%Y',a.statusCngOn) = strftime('%Y','now') "+ 
              "and "+
              "a.Cluster = '"+cluster+"'",
            [],
            (tx, result)=>{          
            var length = result.rows.length;  
                    for(let i= 0; i<length; i++){
                       let items=result.rows.item(i);          
                       SetDashboardInfo((DashboardInfo)=>({...DashboardInfo, died:items.totalDied}))
                    }    
            })
          })




          db.transaction(tx=>{
            tx.executeSql(
              "select count(a.Mem_SL) 'Member_60Up' from member a "+
              // "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on  "+
              // "a.cluster = b.cluster and  "+
              // "a.Village_Code = b.village and  "+
              // "a.Bari_Code = b.bari  "+
              "where  "+
              "a.Mem_Sex in ('1', '2') and "+
              "a.Mem_Cstatus in ('1')  "+
              "and  "+
              "a.Cluster = '"+cluster+"' and "+
              "a.Village_Code||a.Bari_Code||a.HH_Code in (select village||bari||hh from HH where cStatus='1') and "+
              "a.Village_Code||a.Bari_Code in (select village||bari from clusterDiv where cStatus = '1' and cluster = '"+cluster+"' group by village||bari) "+
              "and  "+
              "ROUND((((JulianDay('now')) - JulianDay("+
              "case  "+
               "when a.DOB_Verified_Docs = '1' and a.BirthCertificate_Verified = '1' then a.BirthCertificate_DOB  "+
               "when a.DOB_Verified_Docs = '1' and a.BirthCertificate_Verified = '2' and a.NID_Verified = '1' then a.NID_DOB  "+
               "when a.DOB_Verified_Docs = '1' and a.BirthCertificate_Verified = '2' and a.NID_Verified = '2' and a.EPI_Verified = '1' then a.EPI_DOB  "+
               "when a.DOB_Verified_Docs = '1' and a.BirthCertificate_Verified = '2' and a.NID_Verified = '2' and a.EPI_Verified = '2' and a.OtherDocs_Verified = '1' then a.OtherDocs_DOB  "+
               "else a.Mem_DOB end))/365.25)) >=60",
            [],
            (tx, result)=>{          
            var length = result.rows.length;  
                    for(let i= 0; i<length; i++){
                       let items=result.rows.item(i);          
                       SetDashboardInfo((DashboardInfo)=>({...DashboardInfo, member_60_up:items.Member_60Up}))
                    }    
            })
          })




          db.transaction(tx=>{
            tx.executeSql(
              "select count(a.Mem_SL) 'Member_5Below' from member a "+
              "where "+
              "a.Mem_Cstatus in ('1') "+
              "and "+
              "a.Village_Code||a.Bari_Code||a.HH_Code in (select village||bari||hh from HH where cStatus='1') AND "+
              "a.Village_Code||a.Bari_Code in (select village||bari from clusterDiv where cStatus = '1' and cluster = '"+cluster+"' group by village||bari) "+
              // "a.Mem_Enroll_Type = '3' "+
              "and "+
              "round((((JulianDay('now')) - JulianDay("+
              "case  "+
               "when a.DOB_Verified_Docs = '1' and a.BirthCertificate_Verified = '1' then a.BirthCertificate_DOB  "+
               "when a.DOB_Verified_Docs = '1' and a.BirthCertificate_Verified = '2' and a.NID_Verified = '1' then a.NID_DOB  "+
               "when a.DOB_Verified_Docs = '1' and a.BirthCertificate_Verified = '2' and a.NID_Verified = '2' and a.EPI_Verified = '1' then a.EPI_DOB  "+
               "when a.DOB_Verified_Docs = '1' and a.BirthCertificate_Verified = '2' and a.NID_Verified = '2' and a.EPI_Verified = '2' and a.OtherDocs_Verified = '1' then a.OtherDocs_DOB  "+
               "else a.Mem_DOB end))/365.25)) between 0 and 5 "+
              "and "+
              "a.Cluster = '"+cluster+"' ",
            [],
            (tx, result)=>{          
            var length = result.rows.length;  
                    for(let i= 0; i<length; i++){
                       let items=result.rows.item(i);          
                       SetDashboardInfo((DashboardInfo)=>({...DashboardInfo, member_5_below:items.Member_5Below}))
                    }    
            })
          })




          

    }


    useEffect(()=>{
        DashInfo();
    },[])


  return (
    <View style={{height:"100%", justifyContent:"space-evenly", alignItems:"center", flexDirection:"column"}}>
        <View style={Styles.block_container}>
        
        <View style={Styles.blocks}>
          <Text style={Styles.block_title}>ব্লক</Text> 
          <Text style={Styles.block_value}>{DashboardInfo.blocks}</Text>   
        </View>


        <View style={Styles.blocks}>
          <Text style={Styles.block_title}>বাড়ি</Text> 
          <Text style={Styles.block_value}>{DashboardInfo.bari}</Text>
        </View>

        </View>



        <View style={Styles.block_container}>
        
        <View style={Styles.blocks}>
          <Text style={Styles.block_title}>সদস্য</Text> 
          <Text style={Styles.block_value}>{DashboardInfo.member}</Text>   

        </View>


        <View style={Styles.blocks}>
          <Text style={Styles.block_title}>অথিতি</Text> 
          <Text style={Styles.block_value}>{DashboardInfo.guset}</Text>
        </View>

        </View>

        <View style={Styles.block_container}>
        
        <View style={Styles.blocks}>
          <Text style={Styles.block_title}>MWRA</Text> 
          <Text style={Styles.block_value}>{DashboardInfo.MWRA}</Text>   
        </View>


        <View style={Styles.blocks}>
          <Text style={Styles.block_title}>গর্ভবতী</Text> 
          <Text style={Styles.block_value}>{DashboardInfo.pregnant}</Text>
        </View>

        </View>

        <View style={Styles.block_container}>
        
        <View style={Styles.blocks}>
          <Text style={Styles.block_title}>স্থানান্তর</Text> 
          <Text style={Styles.block_value}>{DashboardInfo.migration}</Text>   
        </View>


        <View style={Styles.blocks}>
          <Text style={Styles.block_title}>মৃত্যু</Text> 
          <Text style={Styles.block_value}>{DashboardInfo.died}</Text>
        </View>

        </View>

        <View style={Styles.block_container}>
        
        <View style={Styles.blocks}>
          <Text style={Styles.block_title}>≥৬০ সদস্য</Text> 
          <Text style={Styles.block_value}>{DashboardInfo.member_60_up}</Text>   
        </View>


        <View style={Styles.blocks}>
          <Text style={Styles.block_title}>≤৫ সদস্য</Text> 
          <Text style={Styles.block_value}>{DashboardInfo.member_5_below}</Text>
        </View>

        </View>
        
    </View>
  )
}



const Styles = StyleSheet.create({
    block_container:{
      flexDirection:"row", 
      width:"100%", 
      justifyContent:"space-evenly"
    },
    blocks:{
      backgroundColor:"#FFD662FF", 
      elevation:2, 
      height:65, 
      width:"45%", 
      borderRadius:5, 
      padding:8
    },
    
    block_title:{
      fontSize:16, 
      color:"#000"
    },
    block_value:{
      fontSize:18, 
      color:"#000",
      fontWeight:"bold"
    
    }
  
  })

export default Dashboard_info;
