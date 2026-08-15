import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { PieChart } from 'react-native-gifted-charts';
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







const Block_PieChart = ({cluster}) => {


  const [pieStatus, setPieStatus] = useState({
    total_hh:0,
    completed_hh:0
  })


  const renderLegend = (text, color) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            marginTop:3,
            height: 18,
            width: 40,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || '#44403c',
          }}
        />
        <Text style={{fontWeight:"bold", color: '#FFF', fontSize: 13}}>{text || ''}</Text>
      </View>
    );
  };



  const get_block_list_main_query=()=>{

    // setLoading({loadingState:true})


    db.transaction(tx=>{
      tx.executeSql(
      "drop table if EXISTS ValidBari",
      [],
      (tx, result)=>{
        console.log("ValidBari droped");
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });

      db.transaction(tx=>{
        tx.executeSql(
        "drop table if EXISTS TotalHH",
        [],
        (tx, result)=>{
          console.log("TotalHH droped");
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });


        db.transaction(tx=>{
          tx.executeSql(
          "drop table if EXISTS total_completed",
          [],
          (tx, result)=>{
            console.log("total_completed droped");
          },
          function(tx, error){
          console.log("add data error: "+ error.message);
          });
          });


        


  db.transaction(tx=>{
    tx.executeSql(
    "create TEMP table ValidBari as select Row_Number() over ( partition by village, bari order by village, bari ) as RN, cluster, block, village, bari, cStatus from clusterDiv "+
    "where "+
    "cluster = '"+cluster+"'"+
    "and "+
    "cStatus= '1'",
    [],
    (tx, result)=>{
      console.log("ValidBari created");
    },
    function(tx, error){
    console.log("add data error: "+ error.message);
    });
    });



    db.transaction(tx=>{
      tx.executeSql(
      "delete from ValidBari where RN > 1",
      [],
      (tx, result)=>{
        console.log("ValidBari data deleted");
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });





      db.transaction(tx=>{
        tx.executeSql(
        "create TEMP table TotalHH as select a.Village_Code, a.Bari_Code, a.HH_Code from member a "+
        "inner join HH b on a.Village_Code = b.village and a.Bari_Code = b.bari and a.HH_Code = b.hh "+
        "where "+
        "a.Mem_Cstatus = '1' "+
        "and "+
        "a.Village_Code||a.Bari_Code in (select village||bari from ValidBari) "+
        "group by a.Village_Code, a.Bari_Code, a.HH_Code",
        [],
        (tx, result)=>{
          console.log("TotalHH created");
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });



        db.transaction(tx=>{
          tx.executeSql(
          "create TEMPORARY table total_completed as "+
          "select a.Village_Code, a.Bari_Code, a.HH_Code from member a "+
          "inner join HH b on a.Village_Code = b.village and a.Bari_Code = b.bari and a.HH_Code = b.hh "+
          "inner join Survey c on a.Village_Code = c.village and a.Bari_Code = c.bari and c.hh = a.HH_Code and CAST(c.surveyNo as INT)=( "+
          "select CAST(Round_No as INT)from Surv_Round "+
          "where "+
          "date('now') between date(Start_Date) and date(End_Date)) "+
          "where "+
          "a.Mem_Cstatus = '1' "+
          "and "+
          "a.Village_Code||a.Bari_Code in (select village||bari from ValidBari) "+
          "group by a.Village_Code, a.Bari_Code, a.HH_Code ",
          [],
          (tx, result)=>{
            console.log("total_completed created");
          },
          function(tx, error){
          console.log("add data error: "+ error.message);
          });
          });





          db.transaction(tx=>{
            tx.executeSql(
            "select count(*) 'total_completed' from total_completed ",
            [],
            (tx, result)=>{
              var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                  var item = result.rows.item(i);
                  // Alert.alert("asdf "+item.total_completed);
                  setPieStatus((pieStatus)=>({...pieStatus, completed_hh:item.total_completed}))
                }
              },
            function(tx, error){
            console.log("add data error: "+ error.message);
            });
            });


            db.transaction(tx=>{
              tx.executeSql(
              "select count(*) 'TotalHH' from TotalHH ",
              [],
              (tx, result)=>{
                var length = result.rows.length;          
                for(let i= 0; i<length; i++){
                  
                  var item = result.rows.item(i);
                  // Alert.alert("asdf "+item.TotalHH);
                  
                  setPieStatus((pieStatus)=>({...pieStatus, total_hh:item.TotalHH}))
                  
                }

                
              },
              function(tx, error){
              console.log("add data error: "+ error.message);
              });
              });






      



  }


  useEffect(()=>{
    get_block_list_main_query();
  },[])

  return (
        
    <View style={{flexDirection:"row", flex:100, justifyContent:"space-around", alignItems:"flex-start", marginTop:10}}>
          
    
    

    <View
      style={{
        // marginVertical: 0,
        // marginHorizontal: 0,
        // borderRadius: 10,
          // paddingVertical: 50,
        width:"90%",
        elevation:3,
        height:"100%",
        borderRadius:5,
        backgroundColor: '#7c3aed',
        justifyContent: 'center',
        alignItems: 'center',
      }}>


      {/*********************    Custom Header component      ********************/}
      <Text
        style={{
          color: '#FFF',
          fontSize: 15,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        খানা ভিজিট
      </Text>
      {/****************************************************************************/}


      <PieChart
        // strokeColor="#44403c"
        // strokeWidth={1}
        donut
        data={[
          // {item.completed_bari}/{item.total_bari}
          {value: (pieStatus.completed_hh), color: '#34d399'},
          {value: ((pieStatus.total_hh-pieStatus.completed_hh)), color: '#f472b6'}
        ]}
        innerCircleColor="#414141"
        innerCircleBorderWidth={4}
        innerCircleBorderColor={'white'}
        showValuesAsLabels={true}
        showText
        radius={100}
        textSize={14}
        textBackgroundRadius={20}
        textBackgroundColor='#e7e5e4'
        textColor='black'
        fontWeight='bold'
        showTextBackground={false}
        centerLabelComponent={() => {
          return (
            <View style={{justifyContent:"center", alignItems:"center"}}>
              <Text style={{color: 'white', fontSize: 13}}>মোট খানা </Text>
              <Text style={{color: 'white', fontSize: 13}}>{pieStatus.total_hh}</Text>                    
            </View>
          );
        }}
      />


      {/*********************    Custom Legend component      ********************/}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 10,
        }}>
        {renderLegend('সম্পূর্ণ', '#34d399')}
        {renderLegend('অসম্পূর্ণ', '#f472b6')}
      </View>
      {/****************************************************************************/}

      
    </View>
      
    






  </View>
        
  )
}

export default Block_PieChart;
