import React, { useEffect, useState } from 'react'
import { View, Text, Alert, FlatList } from 'react-native'
import { LineChart } from 'react-native-gifted-charts';
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






const LineChart_memberStatus = (props) => {



  const[lineType, setLineType]=useState(props.selectedLineType);
  const[period, setPeriod] = useState(props.selectedPeriod);
  const[lineChartSpacing, setLineChartSpacing] = useState(95);

  const setStates=()=>{
    setLineType(props.selectedLineType);
    setPeriod(props.selectedPeriod);
    
  }
useEffect(()=>{
  setStates()
},[props.selectedLineType, props.selectedPeriod])

//   selectedPeriod
// selectedLineType
  // died
  // migrate
  // pregnant
  // outcome


  const [migrationLineData,setMigrationLineData]=useState([]);

  const LineChartMainQuery=()=>{

    setMigrationLineData([]);

    var specifiedPeriod = period==="year" ? 6 : period==="month" ? 12 : "";
    var specifiedPeriodMeater = period==="year" ? "%Y" : period==="month" ? "%Y-%m" : "";
    var orderBy = period==="year" ? "%Y" : period==="month" ? "%Y%m" : "";
    setLineChartSpacing(period==="year" ? 80 : period==="month" ? 75 : "")

    if(lineType==="migrate"){
    db.transaction(tx=>{
      tx.executeSql(
        "WITH RECURSIVE last_12_months AS ( "+
    "SELECT 0 AS n, "+ 
           "strftime('"+specifiedPeriodMeater+"', date('now', 'start of month')) AS year_month, "+
           "strftime('"+orderBy+"', date('now', 'start of month')) AS month_year_numeric "+
    "UNION ALL "+
    "SELECT n + 1, "+
           "strftime('"+specifiedPeriodMeater+"', date('now', 'start of month', '-' || (n + 1) || ' "+period+"')), "+
           "strftime('"+orderBy+"', date('now', 'start of month', '-' || (n + 1) || ' "+period+"')) "+
    "FROM last_12_months "+
    "WHERE n < "+specifiedPeriod+" "+
") "+
"SELECT "+
    "last_12_months.year_month AS 'year', "+
    "last_12_months.month_year_numeric, "+
    "COALESCE(COUNT(a.statusCngOn), 0) AS 'totalMigration' "+
"FROM "+
    "last_12_months "+
"LEFT JOIN ( "+
    "SELECT "+ 
        "strftime('"+specifiedPeriodMeater+"', date(a.statusCngOn)) AS year_month, "+
        "CAST(strftime('"+orderBy+"', date(a.statusCngOn)) AS INTEGER) AS month_year_numeric, "+
        "a.statusCngOn "+
    "FROM "+
        "member a "+
    "INNER JOIN "+ 
        "(SELECT cluster, block, village, bari, cStatus "+
         "FROM clusterDiv "+ 
         "WHERE cluster = '"+props.cluster+"' AND cStatus = '1' "+
         "GROUP BY cluster, block, village, bari) b "+ 
    "ON a.cluster = b.cluster "+ 
    "AND a.Village_Code = b.village "+
    "AND a.Bari_Code = b.bari "+
    "WHERE "+
        "a.Mem_Cstatus = '2' "+
        "AND a.ReasonToMigrate != '7' "+
        "AND a.cluster = '"+props.cluster+"' "+
        "AND date(a.statusCngOn) >= date('now', '-"+specifiedPeriod+" "+period+"') "+
        "AND date(a.statusCngOn) IS NOT NULL "+
") a "+ 
"ON last_12_months.year_month = a.year_month "+
"GROUP BY  "+
    "last_12_months.year_month "+
"ORDER BY  "+
    "last_12_months.month_year_numeric ASC",
      // "select CAST(strftime('"+orderBy+"', date(a.statusCngOn)) AS INTEGER) AS month_year_numeric, strftime('"+specifiedPeriodMeater+"', date(a.statusCngOn)) 'year', count(*) 'totalMigration' from member a "+
      // "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+props.cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
      //         "a.cluster = b.cluster and "+
      //         "a.Village_Code = b.village and "+
      //         "a.Bari_Code = b.bari "+
      // "WHERE "+
      // "a.Mem_Cstatus = '2' "+
      // "AND "+
      // "a.ReasonToMigrate!='7' "+
      // "AND "+
      // "date(a.statusCngOn) >= date('now', '"+specifiedPeriod+"') "+
      // "and "+
      // "date(a.statusCngOn) is not null "+
	    // "AND "+
	    // "a.cluster = '"+props.cluster+"' "+
      // "group by strftime('"+specifiedPeriodMeater+"', date(a.statusCngOn)) "+
      // "order by month_year_numeric asc ",
      [],
      (tx, result)=>{

        var results=[];
        var length = result.rows.length;          
        for(let i= 0; i<length; i++){
          
          var item = result.rows.item(i);
          results.push({
            value: item.totalMigration,
            dataPointText: (item.totalMigration).toString(),
            label: (item.year).toString()
          });

          
        }
        setMigrationLineData(results);
        

        
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });
    }

    else if(lineType==="died"){
      db.transaction(tx=>{
        tx.executeSql(
"WITH RECURSIVE last_12_months AS ( "+
    "SELECT 0 AS n, "+ 
           "strftime('"+specifiedPeriodMeater+"', date('now', 'start of month')) AS year_month, "+
           "strftime('"+orderBy+"', date('now', 'start of month')) AS month_year_numeric "+
    "UNION ALL "+
    "SELECT n + 1, "+
           "strftime('"+specifiedPeriodMeater+"', date('now', 'start of month', '-' || (n + 1) || ' "+period+"')), "+
           "strftime('"+orderBy+"', date('now', 'start of month', '-' || (n + 1) || ' "+period+"')) "+
    "FROM last_12_months "+
    "WHERE n < "+specifiedPeriod+" "+
") "+
"SELECT "+ 
    "last_12_months.year_month AS 'year', "+ 
    "last_12_months.month_year_numeric, "+ 
    "COALESCE(COUNT(a.statusCngOn), 0) AS 'totalDied' "+ 
"FROM  "+ 
    "last_12_months "+ 
"LEFT JOIN ( "+ 
    "SELECT  "+ 
    "strftime('"+specifiedPeriodMeater+"', date(a.statusCngOn)) AS year_month, "+
    "CAST(strftime('"+orderBy+"', date(a.statusCngOn)) AS INTEGER) AS month_year_numeric, "+
        "a.statusCngOn "+ 
    "FROM "+ 
        "member a "+ 
    "INNER JOIN "+ 
        "(SELECT cluster, block, village, bari, cStatus "+ 
         "FROM clusterDiv "+ 
         "WHERE cluster = '"+props.cluster+"' AND cStatus = '1' "+ 
         "GROUP BY cluster, block, village, bari) b "+ 
    "ON a.cluster = b.cluster "+ 
    "AND a.Village_Code = b.village "+ 
    "AND a.Bari_Code = b.bari "+ 
    "WHERE "+ 
        "a.Mem_Cstatus = '3' "+ 
        "AND date(a.statusCngOn) >= date('now', '-"+specifiedPeriod+" "+period+"') "+
        "AND date(a.statusCngOn) IS NOT NULL "+ 
        "AND a.cluster = '"+props.cluster+"' "+ 
") a "+ 
"ON last_12_months.year_month = a.year_month "+ 
"GROUP BY "+ 
    "last_12_months.year_month "+ 
"ORDER BY "+ 
    "last_12_months.month_year_numeric ASC",
        // "select CAST(strftime('"+orderBy+"', date(a.statusCngOn)) AS INTEGER) AS month_year_numeric, strftime('"+specifiedPeriodMeater+"', date(a.statusCngOn)) 'year', count(*) 'totalDied' from member a "+
        // "inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '"+props.cluster+"' and cStatus = '1' group by cluster, block, village, bari) b on "+
        //       "a.cluster = b.cluster and "+
        //       "a.Village_Code = b.village and "+
        //       "a.Bari_Code = b.bari "+
        // "WHERE "+
        // "a.Mem_Cstatus = '3' "+
        // "AND "+
        // "date(a.statusCngOn) >= date('now', '"+specifiedPeriod+"') "+
        // "and "+
        // "date(a.statusCngOn) is not null "+
        // "AND "+
        // "a.cluster = '"+props.cluster+"' "+
        // "group by strftime('"+specifiedPeriodMeater+"', date(a.statusCngOn)) "+
        // "order by month_year_numeric asc ",
        [],
        (tx, result)=>{
  
          var results=[];
          var length = result.rows.length;          
          for(let i= 0; i<length; i++){
            
            var item = result.rows.item(i);
            results.push({
              value: item.totalDied,
              dataPointText: (item.totalDied).toString(),
              label: (item.year).toString()
            });
  
            
          }
          setMigrationLineData(results);
          
  
          
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });
      }




      else if(lineType==="pregnant"){
        db.transaction(tx=>{tx.executeSql("drop table if EXISTS MWRA_visit",[],(tx, result)=>{console.log("temp droped")})})
        db.transaction(tx=>{tx.executeSql("create TEMP table MWRA_visit as select ROW_NUMBER() OVER (PARTITION BY pid, ifPregnant_No ORDER BY Entry_Date ASC) 'rn', * from MWRA_Survey WHERE VisitOutCome='1' and pregnancyStatus = '4' ",[],(tx, result)=>{console.log("temp created")})})
        db.transaction(tx=>{
          tx.executeSql(
            "WITH RECURSIVE last_12_months AS ( "+
    "SELECT 0 AS n, "+ 
           "strftime('"+specifiedPeriodMeater+"', date('now', 'start of month')) AS year_month, "+
           "strftime('"+orderBy+"', date('now', 'start of month')) AS month_year_numeric "+
    "UNION ALL "+
    "SELECT n + 1, "+
           "strftime('"+specifiedPeriodMeater+"', date('now', 'start of month', '-' || (n + 1) || ' "+period+"')), "+
           "strftime('"+orderBy+"', date('now', 'start of month', '-' || (n + 1) || ' "+period+"')) "+
    "FROM last_12_months "+
    "WHERE n < "+specifiedPeriod+" "+
") "+
"SELECT "+
    "last_12_months.year_month AS 'year', "+
    "last_12_months.month_year_numeric, "+
    "COALESCE(COUNT(a.VisitDT), 0) AS 'totalPregnant' "+
"FROM "+
    "last_12_months "+
"LEFT JOIN ( "+
        "SELECT  "+ 
        "strftime('"+specifiedPeriodMeater+"', date(a.VisitDT)) AS year_month, "+
        "CAST(strftime('"+orderBy+"', date(a.VisitDT)) AS INTEGER) AS month_year_numeric, "+
        "a.VisitDT "+
    "FROM  "+
        "MWRA_visit a "+
    "INNER JOIN  "+
        "member b  "+
    "ON a.pid = b.Mem_PID "+
    "WHERE  "+
        "a.pregnancyStatus = '4'  "+
        "AND a.rn = 1  "+
        "AND b.Mem_Cstatus = '1' "+
        "AND b.is_MWRA = '1' "+
        "AND b.Cluster = '"+props.cluster+"' "+
        "AND date(a.VisitDT) >= date('now', '-"+specifiedPeriod+" "+period+"') "+
        "AND date(a.VisitDT) IS NOT NULL "+
        // "group by a.pid, a.ifPregnant_No "+
") a  "+
"ON last_12_months.year_month = a.year_month "+
"GROUP BY  "+
    "last_12_months.year_month "+
"ORDER BY  "+
    "last_12_months.month_year_numeric ASC",
          [],
          (tx, result)=>{
    
            var results=[];
            var length = result.rows.length;          
            for(let i= 0; i<length; i++){
              
              var item = result.rows.item(i);
              results.push({
                value: item.totalPregnant,
                dataPointText: (item.totalPregnant).toString(),
                label: (item.year).toString()
              });
    
              
            }
            setMigrationLineData(results);
            
    
            
          },
          function(tx, error){
          console.log("add data error: "+ error.message);
          });
          });
        }




        else if(lineType==="outcome"){
        db.transaction(tx=>{tx.executeSql("drop table if EXISTS MWRA_visit",[],(tx, result)=>{console.log("temp droped")})})
        db.transaction(tx=>{tx.executeSql("create TEMP table MWRA_visit as select ROW_NUMBER() OVER (PARTITION BY pid, ifPregnant_No ORDER BY Entry_Date DESC) 'rn', * from MWRA_Survey WHERE VisitOutCome='1' and pregnancyStatus = '5' ",[],(tx, result)=>{console.log("temp created")})})
        db.transaction(tx=>{
          tx.executeSql(
            "WITH RECURSIVE last_12_months AS ( "+
    "SELECT 0 AS n, "+ 
           "strftime('"+specifiedPeriodMeater+"', date('now', 'start of month')) AS year_month, "+
           "strftime('"+orderBy+"', date('now', 'start of month')) AS month_year_numeric "+
    "UNION ALL "+
    "SELECT n + 1, "+
           "strftime('"+specifiedPeriodMeater+"', date('now', 'start of month', '-' || (n + 1) || ' "+period+"')), "+
           "strftime('"+orderBy+"', date('now', 'start of month', '-' || (n + 1) || ' "+period+"')) "+
    "FROM last_12_months "+
    "WHERE n < "+specifiedPeriod+" "+
") "+
"SELECT "+
    "last_12_months.year_month AS 'year', "+
    "last_12_months.month_year_numeric, "+
    "COALESCE(COUNT(a.VisitDT), 0) AS 'totalOutcome' "+
"FROM "+
    "last_12_months "+
"LEFT JOIN ( "+
        "SELECT  "+ 
        "strftime('"+specifiedPeriodMeater+"', date(a.VisitDT)) AS year_month, "+
        "CAST(strftime('"+orderBy+"', date(a.VisitDT)) AS INTEGER) AS month_year_numeric, "+
        "a.VisitDT "+
    "FROM  "+
        "MWRA_visit a "+
    "INNER JOIN  "+
        "member b  "+
    "ON a.pid = b.Mem_PID "+
    "WHERE  "+
        "a.pregnancyStatus = '5'  "+
        "AND a.rn = 1  "+
        "AND b.Mem_Cstatus = '1' "+
        "AND b.is_MWRA = '1' "+
        "AND b.Cluster = '"+props.cluster+"' "+
        "AND date(a.VisitDT) >= date('now', '-"+specifiedPeriod+" "+period+"') "+
        "AND date(a.VisitDT) IS NOT NULL "+
") a  "+
"ON last_12_months.year_month = a.year_month "+
"GROUP BY  "+
    "last_12_months.year_month "+
"ORDER BY  "+
    "last_12_months.month_year_numeric ASC",
          // db.transaction(tx=>{tx.executeSql("drop table if EXISTS MWRA_visit",[],(tx, result)=>{console.log("temp droped")})})
          // db.transaction(tx=>{tx.executeSql("create TEMP table MWRA_visit as select ROW_NUMBER() OVER (PARTITION BY pid ORDER BY Entry_Date DESC) 'rn', * from MWRA_Survey WHERE VisitOutCome='1'",[],(tx, result)=>{console.log("temp created")})})
          // db.transaction(tx=>{
          //   tx.executeSql(
          //     "select CAST(strftime('"+orderBy+"', date(a.VisitDT)) AS INTEGER) AS month_year_numeric, strftime('"+specifiedPeriodMeater+"', date(a.VisitDT)) 'year', count(*) 'totalOutcome' from MWRA_visit a "+ 
          //     "inner join member b on a.pid = b.Mem_PID "+ 
          //     "WHERE "+ 
          //     "a.pregnancyStatus = '5' "+ 
          //     "and "+ 
          //     "a.rn = 1 "+ 
          //     "AND "+ 
          //     "b.Mem_Cstatus = '1' "+ 
          //     "AND "+ 
          //     "b.is_MWRA = '1' and "+ 
          //     "b.Cluster = '"+props.cluster+"' "+ 
          //     "group by strftime('"+specifiedPeriodMeater+"', date(a.VisitDT)) "+
          //     "order by month_year_numeric asc ",
            [],
            (tx, result)=>{
      
              var results=[];
              var length = result.rows.length;          
              for(let i= 0; i<length; i++){
                
                var item = result.rows.item(i);
                results.push({
                  value: item.totalOutcome,
                  dataPointText: (item.totalOutcome).toString(),
                  label: (item.year).toString()
                });
      
                
              }
              setMigrationLineData(results);
              
      
              
            },
            function(tx, error){
            console.log("add data error: "+ error.message);
            });
            });
          }






  }


  


useEffect(()=>{
  LineChartMainQuery();
},[lineType, period])


    // const lineData = [
    //     {value: 0, dataPointText: '0', label:"2021"},
    //     {value: 10, dataPointText: '10', label:"2022"},
    //     {value: 8, dataPointText: '8', label:"03"},
    //     {value: 58, dataPointText: '58', label:"04"},
    //     {value: 56, dataPointText: '56', label:"05"},
    //     {value: 78, dataPointText: '78', label:"06"},
    //   ];
    
    return (
        <View>        
            <LineChart
            data={migrationLineData}
            width={510}
            height={205}            
            endSpacing={40}
            showVerticalLines
            spacing={lineChartSpacing}
            initialSpacing={30}
            color1="skyblue"    
            textColor1="green"
            dataPointsHeight={6}
            dataPointsWidth={6}
            dataPointsColor1="blue"
            textShiftY={-2}
            textShiftX={-5}
            textFontSize={14}
        />
        </View>
    );
  
}

export default LineChart_memberStatus
