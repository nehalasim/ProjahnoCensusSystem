import { useState } from "react";
import { openDatabase } from 'react-native-sqlite-storage';
import { Alert } from 'react-native';

const db = openDatabase(
  {
    name: 'prf.db',
    location: 'default',
  },
  () => { console.log("Database OK.....") },
  error => { Alert.alert("Database ERROR!!!!!!") }
);

export function check_mwra_existance() {
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState("");





                


  const check_mwra_visit = (villageCode, bari, hh, roundNo) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT "+
          "COUNT(member.Mem_PID) AS totalMWRA, "+
          "COUNT(MWRA_Survey.pid) AS totalMwraVisitDone "+
          "FROM member "+
          "LEFT JOIN ( "+
          "SELECT * "+
          "FROM MWRA_Survey a "+ 
          "WHERE "+
          "a.village||a.bari||a.hh = '"+villageCode+"'||'"+bari+"'||'"+hh+"' and "+ 
          "EXISTS ( "+
          "SELECT 1 "+ 
          "FROM Surv_Round b "+ 
          "WHERE DATE(a.VisitDT) BETWEEN DATE(b.Start_Date) AND DATE(b.End_Date) "+
          "AND b.Round_No = '"+roundNo+"' "+
          ") "+
          "GROUP BY a.pid "+
          ") AS MWRA_Survey ON MWRA_Survey.pid = member.Mem_PID "+ 
          "WHERE "+  
          "member.Village_Code||member.Bari_Code||member.HH_Code = '"+villageCode+"'||'"+bari+"'||'"+hh+"' "+
          "AND member.is_MWRA = '1' "+
          "AND member.Mem_Cstatus = '1' ",
          [],
          (tx, result) => {
            let mwra_completed = "";
            if (result.rows.length > 0) {
              const totalMwra = result.rows.item(0).totalMWRA;
              const totalMwraisitDone = result.rows.item(0).totalMwraVisitDone;

              if (parseInt(totalMwraisitDone) >= parseInt(totalMwra)) {
                mwra_completed = "completed";
              }else{
                mwra_completed = "no";
              }
            }
            resolve(mwra_completed);
          },
          (tx, error) => {
            console.log("Query error: " + error.message);
            reject("failed");
          }
        );
      });
    });
  };

  return { check_mwra_visit };
}