import { useState } from "react";
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


export function GenerateIDs(){
    
    


  

    const [loading, setLoading] = useState();
    const [PID, SetPID] = useState("");
    const [Serial, SetSerial] = useState("");
    const [CID, SetCID] = useState("");
    const [LineNo, SetLineNo] = useState("");



    


const updateIDs= async (cluster, block, villageCode, bari, hh)=>{

        let mpid = "";
        let serial = "";
        let cid = "";
        let lineNo = "";

setLoading(true);



const queryPID = new Promise((resolve, reject) => {

    db.transaction(tx=>{
      tx.executeSql(
      "select max(Mem_PID)'maxPID' from member where Cluster ='"+cluster+"' and  Block = '"+block+"' and Mem_PID not in ('99999999999')",
      [],
      (tx, result)=>{
        
      var length = result.rows.length;
  
            if(length>0){
              let results = [];
              for(let i= 0; i<length; i++){
                 let items=result.rows.item(i);
                 var last_PID_of_Cluster_Block = items.maxPID.substring(5, 11);    
                 var pid = parseInt(last_PID_of_Cluster_Block) + parseInt("1");
                 var nextPID = pid.toString();
                 
                 if(parseInt(items.maxPID)>0){
                 if(nextPID.length=="1"){
                    mpid = (cluster+""+block+"00000"+nextPID);
                  }
                  else if(nextPID.length=="2"){                 
                    mpid = (cluster+""+block+"0000"+nextPID);
                  }
                  else if(nextPID.length=="3"){        
                    mpid = (cluster+""+block+"000"+nextPID);
                  }
                  else if(nextPID.length=="4"){
                    mpid = (cluster+""+block+"00"+nextPID);
                  }
                  else if(nextPID.length=="5"){
                    mpid = (cluster+""+block+"0"+nextPID);
                  }
                  else if(nextPID.length=="6"){
                    mpid = (cluster+""+block+""+nextPID);
                  }
                  else{
                    mpid = ("Invalid!!!");
                  }
                }
                else{
                    mpid = (cluster+""+block+""+"000001");
                  }

                  
                 
              }               
            }else{
                mpid = (cluster+""+block+""+"000001");
            }
            resolve();

  
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });
    });



    const querySerial = new Promise((resolve, reject) => {

    db.transaction(tx=>{
        tx.executeSql(
        "select max(Mem_SL)'maxSL' from member where Cluster ='"+cluster+"' and  Block = '"+block+"'",
        [],
        (tx, result)=>{
          
        var length = result.rows.length;
    
              if(length>0){
                let results = [];
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);
                   


                   var sl = parseInt(items.maxSL.substring(5, 11)) + parseInt("1");
                   var nextSL = sl.toString();

                   
                   if(parseInt(items.maxSL)>0){
                    if(nextSL.length=="1"){
                      // document.getElementById("Query_Generated_SL").value = cl+bl+"00000"+nextSL;
                      serial = (cluster+""+block+""+"00000"+nextSL)
                      }
                      else if(nextSL.length=="2"){
                      // document.getElementById("Query_Generated_SL").value = cl+bl+"0000"+nextSL;
                      serial = (cluster+""+block+""+"0000"+nextSL)
                      }
                      else if(nextSL.length=="3"){
                      // document.getElementById("Query_Generated_SL").value = cl+bl+"000"+nextSL;
                      serial = (cluster+""+block+""+"000"+nextSL)
                      }
                      else if(nextSL.length=="4"){
                      // document.getElementById("Query_Generated_SL").value = cl+bl+"00"+nextSL;
                      serial = (cluster+""+block+""+"00"+nextSL)
                      }
                      else if(nextSL.length=="5"){
                      // document.getElementById("Query_Generated_SL").value = cl+bl+"0"+nextSL;
                      serial = (cluster+""+block+""+"0"+nextSL)
                      }
                      else if(nextSL.length=="6"){
                        serial = (cluster+""+block+""+nextSL)
                      }
                      else{
                        serial = ("Invalid!!!")
                      }
                  }
                  else{
                    // document.getElementById("Query_Generated_PID").value = cl+bl+"000001";
                    serial = (cluster+""+block+""+"000001");                    
                    }
  
                    
                   
                }               
              }else{
                serial = (cluster+""+block+""+"000001");                    
              }

              resolve();
    
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });
    });




    const queryCID = new Promise((resolve, reject) => {

     db.transaction(tx=>{
          tx.executeSql(
          "select max(MCID)'nxtMCID' from member where Village_Code='"+villageCode+"' and Bari_Code='"+bari+"' and HH_Code='"+hh+"' and MCID not in ('999999999999')",
          [],
          (tx, result)=>{
            
          var length = result.rows.length;
      
                if(length>0){
                  
                  for(let i= 0; i<length; i++){
                     let items=result.rows.item(i);
                     
                     if(parseInt(items.nxtMCID)>0){

                      var NextLineNo = parseInt(items.nxtMCID.substring(10, 12))+parseInt("1");
                      var NextCID = NextLineNo.toString();

                      if(NextCID.length == "1"){
                        NextCID = "0"+NextCID;                        
                        cid = (villageCode+""+bari+""+hh+""+NextCID);
                        lineNo =(NextCID);
                        }
                        else{
                        NextCID = NextCID.trim();
                        cid = (villageCode+""+bari+""+hh+""+NextCID);
                        lineNo =(NextCID);
                        }

                     }
                     else{
                      cid = (villageCode+""+bari+""+hh+""+"01");
                      lineNo ="01";
                     }
                  }               
                }else{
                  cid = (villageCode+""+bari+""+hh+""+"01");
                  lineNo = "01";
                }
                resolve();
      
          },
          function(tx, error){
          console.log("add data error: "+ error.message);
          });

          setLoading(false);
          });
        });



        await Promise.all([queryPID, querySerial, queryCID]);
        SetPID(mpid);
        SetSerial(serial);
        SetCID(cid);
        SetLineNo(lineNo);

        return {PID: mpid, Serial: serial, CID: cid, LineNo: lineNo };

    };



    return {updateIDs, PID, CID, Serial, LineNo};


}