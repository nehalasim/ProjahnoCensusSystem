import { openDatabase } from "react-native-sqlite-storage";


const db = openDatabase(
  {
    name: 'prf.db',
    location: 'default',
    //createFromLocation:"/storage/emulated/0/103_prf.db"   
  },
  ()=>{console.log("Database OK.....")},
  error=>{Alert.alert("Database ERROR!!!!!!")}
  );


export const AlterTableQuery = async () => {


  const executeTransaction = (query, successMessage, errorMessage) => {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx) {
        tx.executeSql(query, [], function (tx, results) {
          console.log("Successmessage: "+successMessage);
          resolve();
        }, function (tx, error) {
          console.log("error message: "+errorMessage + error.message);
          reject("error: "+error);
        });
      });
    });
  };

  try {
    //if you want to add any alternation query, the query should be at top of the all query.
    // await executeTransaction("your query", "success message", "error message");

    executeTransaction("CREATE TABLE if not exists AdminUser (name text, userID text primary key, password text)", "AdminUser table created", "Error while creating AdminUser table:")
    .then(()=>{
     executeTransaction("insert or ignore into AdminUser(name, userID, password) values('Administrator', '23646', '818456')", "AdminUser inserted", "Error while inserting into AdminUser: ");
    }).then(()=>{
      executeTransaction("ALTER TABLE user ADD s_whatsApp varchar(11) NULL", "ALTER TABLE user completed", "Error while altering user table: ");
    }).then(()=>{
      executeTransaction("ALTER TABLE member ADD IMG varchar(200) NULL", "ALTER TABLE member completed", "Error while altering member table: ");
    })
    
    // await 
    // await 
    
    
  } catch (error) {
    console.error("Transaction failed: ", error);
  }


  };