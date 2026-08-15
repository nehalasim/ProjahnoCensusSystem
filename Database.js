'use strict';
import React from 'react';
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


class Database {
    getConnection() {
        return db;
    }
}

module.exports = new Database();

// import React, { Component } from 'react'
// import { Alert, View } from 'react-native';
// import { openDatabase } from 'react-native-sqlite-storage'



// const db = openDatabase(
//     {
//     name: 'prf.db',
//     location: 'default',
//     //createFromLocation:"/storage/emulated/0/103_prf.db"
//   },
//   ()=>{console.log("Database OK.....")},
//   error=>{Alert.alert("Database ERROR!!!!!!")}
//   );


  
// class Database {
//   abc(){
  

//     db.transaction(
//       function(tx){
//       tx.executeSql(
//       "select * from CurrentUser limit 1",
//       [],
//       function(tx, result){
      
//       var lengt = result.rows.length, i;
          
//       for ( i=0; i<lengt; i++){
          
//         return(
// <View>
//   <Text>
//   {result.rows.item(i).name}
//   </Text>
// </View>
//         )
//               // Alert.alert(result.rows.item(i).name)
     
          

//       }
//       },
//       function(tx, error){
//       console.log("add data error: "+ error.message);
//       });
//       });



//   }
// }


// const b = new Database();
// export default b;
