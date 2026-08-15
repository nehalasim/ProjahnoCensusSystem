import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Alert, Image, ActivityIndicator, TouchableHighlight, Touchable, TouchableOpacity, Modal } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import moment from 'moment';
import { styles } from 'react-native-gifted-charts/src/LineChart/styles';
import Member_profile from './Member_profile';
import Camera_open from './Camera_open';
import Notification from './Notification';


const db = openDatabase(
  {
    name: 'prf.db',
    location: 'default',
    //createFromLocation:"/storage/emulated/0/103_prf.db"
  },
  ()=>{console.log("Database OK.....")},
  error=>{Alert.alert("Database ERROR!!!!!!")}
  );


const Inside_khana_mwra_visit_list = (props) => {


  const [loading, setLoading]=useState({
    loadingState : false
  });



  const [MWRA_survey_data, setMWRA_survey_data] = useState([]);
  const [totalRows, setTotalRows] = useState("");
  // totalRows.totalRowsCount

  const get_survey_data=()=>{


    setLoading({loadingState:true})
  
    db.transaction(tx=>{
      tx.executeSql(
      "select a.VisitDT, a.surveyNo, "+ 
      "case when a.VisitOutCome = '1' then 'উপস্থিত' when a.VisitOutCome = '2' then 'অনুপস্থিত' when a.VisitOutCome = '3' then 'সম্মতি নেই' end as 'VisitOutCome', "+ 
      "case when a.VisitOutCome = '1'and a.MeritalStatus = '1' then 'বিবাহিতা' when a.VisitOutCome = '1' and a.MeritalStatus = '3' then 'বিধবা' else 'n/a' end as 'MeritalStatus', "+ 
      "case "+ 
      "when a.VisitOutCome = '1' and a.pregnancyStatus = '1' then 'মাসিক চলছে' "+//মাসিক চলছে 
      "when a.VisitOutCome = '1' and a.pregnancyStatus = '2' then 'নিয়মিত মাসিক বন্ধ আছে' "+ 
      "when a.VisitOutCome = '1' and a.pregnancyStatus = '3' then 'মাসিক অনিয়মিত' "+ 
      "when a.VisitOutCome = '1' and a.pregnancyStatus = '4' then 'গর্ভবতী হিসাবে সনাক্ত' "+ 
      "when a.VisitOutCome = '1' and a.pregnancyStatus = '5' then 'গর্ভের ফলাফল জানা গিয়েছে' "+ 
      "when a.VisitOutCome = '1' and a.pregnancyStatus = '6' then 'মাসিক একেবারে বন্ধ(Menopause)' "+ 
      "when a.VisitOutCome = '1' and a.pregnancyStatus = '7' then 'সর্বশেষ গর্ভধারণের পর এখনও মাসিক শুরু হইনি' "+ 
      "when a.VisitOutCome = '1' and a.pregnancyStatus = '9' then 'ভুল সনাক্ত' "+ 
      "else 'n/a' end as 'pregnancyStatus', "+ 
      "a.LMP "+
      "from MWRA_Survey a "+ 
      "WHERE "+ 
      "pid = '"+props.pid+"' "+ 
      "order by date(VisitDT) DESC",
      [],
      (tx, result)=>{
        
      var length = result.rows.length;

      setTotalRows(length)
      
      
      if(length>0){
  
              let results = [];

              for(let i= 0; i<length; i++){




                 var visitDate = moment(result.rows.item(i).VisitDT).format("MMM DD, YYYY");      
                 var visitOutcome = result.rows.item(i).VisitOutCome;
                 var surveyNo = result.rows.item(i).surveyNo;
                 var meritalStatus = result.rows.item(i).MeritalStatus;
                 var pregnancyOutcome = result.rows.item(i).pregnancyStatus;
                 var LMP = moment(result.rows.item(i).LMP, "YYYY-MM-DD").isValid() ? moment(result.rows.item(i).LMP, "YYYY-MM-DD").format("MMM DD, YYYY") : 'n/a';
                 
                 
                

      
      

                results.push({surveyNo:surveyNo, LMP:LMP, visitDate:visitDate, visitOutcome:visitOutcome, meritalStatus:meritalStatus, pregnancyOutcome:pregnancyOutcome}) 
                
              }
              setMWRA_survey_data(results);
              console.log(pregnancyOutcome);
              setLoading({loadingState:false})

            }
            else{
              Alert.alert("MWRA সার্ভের তথ্য", "এই MWRA এর এখন পর্যন্ত কোন সার্ভে ভিজিট হইনি")
              setLoading({loadingState:false})
            }
  
      },
      function(tx, error){
      console.log("add data error: "+ error.message);
      });
      });
    }



    useEffect(()=>{
      get_survey_data();
    },[])



    const [expandedRows, setExpandedRows] = useState([]);
    const[MWRA_details, setMWRA_details]=useState({

    });
    
    const render_mwra_survey_items=({item})=>{

        
      // const isExpanded = expandedRows.includes(item.surveyNo);

      return(
        <View style={{flex:100, flexDirection:"row", justifyContent:"flex-start"}}>
        <View style={{flex:80}}>



        {/* onPress={call.bind(this,item.hh)} */}
    
        
        <View style={{flexDirection:"column", flex:100}}>
        <View style={{flex:90}}>

        

    <View style={{backgroundColor:"#fff", height:85, width:"100%", borderBottomWidth:1, borderBottomColor:"#b0acac", flex:100, flexDirection:"row",  padding:2, justifyContent:"space-between"}}>





    <View style={{flex:90, flexDirection:"row", justifyContent:"flex-start"}}>
      <View style={{ flex:4,  flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderRightWidth:1, borderRightColor:"#d6d6d6"}}>
          
          {/* <View style={{flex:1, alignItems:"center",justifyContent:"center", marginLeft:15}}>
          <Image source={item.member_photo} style={{height:80, width:80, borderRadius:100, borderWidth:2, borderColor:"#0369a1"}} resizeMode='contain'/>
          </View> */}

        <View style={{flex:2, height:"100%", justifyContent:"center", marginLeft:25}}>
        <Text style={{color:"#be185d", fontSize:12, fontWeight:"bold"}}>
         {item.visitDate}
        </Text>
        
        <Text style={{color:"#404040", fontSize:12}} ellipsizeMode='tail' numberOfLines={1}> 
        {item.visitOutcome}          
        </Text>
        
        {/* <Text style={{color:"#404040", fontSize:12}}>{item.EDD_Formatted}</Text> */}
        
      
        </View> 
      </View>

      
      



      
      <View style={{paddingLeft:10, flex:15, alignItems:"flex-start", justifyContent:"space-between", height:"100%", flexDirection:"row"}}>
      



    <View style={{width:"auto", flexDirection:"column", justifyContent:"space-evenly", height:"100%"}}>
      <Text style={{color:"#383838", fontSize:12}}>                      
      বৈবাহিক অবস্থা <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.meritalStatus}</Text>        
      </Text>

      <Text style={{color:"#383838", fontSize:12}}>                      
      মাসিকের অবস্থা <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.pregnancyOutcome}</Text>
      </Text>
      <Text style={{color:"#383838", fontSize:12}}>                      
      মাসিকের তারিখ <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.LMP}</Text>
      </Text>
       
      

      

    </View>    


      </View>
      </View>


   

     
      
    </View>
    </View>




    {/* <View style={{flex:10}}>
      {isExpanded &&(
      
      <View style={{flexDirection:"row", flex:100, padding:10, justifyContent:"space-around", alignItems:"center", borderBottomColor:"#b3b3b3", borderBottomWidth:1}}>
        
        <View style={{width:"55%", backgroundColor:"#fff", borderRadius:5, elevation:1, padding:5}}>
        <View style={{width:"100%", alignItems:"center"}}>
          <Text style={{fontSize:13, color:"#363636", lineHeight:15, fontWeight:"bold"}}>সর্বশেষ ৫ ভিজিটের ফলাফল</Text>
          <Text style={{fontSize:12, color:"#363636"}}>{MWRA_details.noVisit}</Text>
        </View>
        <Text>
        {item.visitDate}
        </Text>
            <FlatList
            data={MWRA_last5Visit}
            renderItem={render_MWRA_details}
            keyExtractor={(MWRA_last5Visit)=> MWRA_last5Visit.visitDate}                          
            />
            
        </View>

        <View style={{width:"42%",backgroundColor:"#d4d4d4", borderRadius:5, elevation:1, padding:5}}>
        <View>
                   <Text style={{lineHeight:15, textAlign:"center", fontSize:13, color:"#363636", fontWeight:"bold"}}>সর্বশেষ সফল ভিজিটের ফলাফল</Text>
                   <Text style={{fontSize:12, color:"#363636", textAlign:"center"}}>{MWRA_details.noVisit}</Text>
                   <Text style={{lineHeight:23, fontSize:12, color:"#363636"}}>{MWRA_details.visitDate}</Text>
                   <Text style={{lineHeight:23, fontSize:12, color:"#363636"}} ellipsizeMode='tail' numberOfLines={1}>{MWRA_details.pregnancy}</Text>
                   <Text style={{lineHeight:23, fontSize:12, color:"#363636"}}>{MWRA_details.lmp}</Text>
                   <Text style={{lineHeight:23, fontSize:12, color:"#363636"}}>{MWRA_details.meritalStatus}</Text>
        </View>
        </View>




      </View>
      
      
      )}
      </View> */}



        
        </View>










    </View>  


    {/* <TouchableHighlight underlayColor={"#cffafe"} onPress={() => toggleRowExpansion(props.pid, item.surveyNo)}  style={{backgroundColor:"#e0f2fe", flex:5, borderBottomWidth:1, borderBottomColor:"#a3a3a3", justifyContent:"center", alignItems:"center"}}>
        <View>
            <Image source={require('../img/down.png')} style={{height:30, width:30}}/>
        </View>
      </TouchableHighlight> */}

    </View>
      )

      
    }
    




    const SerachBar=()=>{
      return(
        <View style={{padding:7, backgroundColor:"#fff", borderBottomWidth:1, borderBottomColor:"#b0acac", borderTopColor:"#b0acac", borderTopWidth:1}}>

        <View style={{paddingLeft:5, flexDirection:"row", justifyContent:"space-between"}}>
          <View>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
          MWRA সার্ভে লিস্ট এবং সংক্ষিপ্ত বিবরন  ।  সর্বমোট সার্ভে সংখ্যা {totalRows}  
          </Text>            
          </View>

          <View>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
          {/* রাউন্ড {props.roundNo} */}
          </Text>
          </View>

        </View>

        </View>
        
      )
    }


    // const toggleRowExpansion = (pid, sno) => {
    //   if (expandedRows.includes(sno)) {
    //     setExpandedRows([]);
    //   } else {
    //     setExpandedRows([sno]);        
    //   }


    //   setMWRA_details((MWRA_details)=>({...MWRA_details,noVisit:"" }));
    //   setMWRA_details((MWRA_details)=>({...MWRA_details,visitDate:"" }));
    //   setMWRA_details((MWRA_details)=>({...MWRA_details,pregnancy:"" }));
    //   setMWRA_details((MWRA_details)=>({...MWRA_details,lmp:"" }));
    //   setMWRA_details((MWRA_details)=>({...MWRA_details,meritalStatus:"" }));

    

    //   db.transaction(tx=>{
    //     tx.executeSql(
    //       "",
    //     [],
    //     (tx, result)=>{          
    //     var length = result.rows.length;          
    //             if(length>0){
    //             for(let i= 0; i<length; i++){
    //                let items=result.rows.item(i);          

    //                var vdt = moment(items.VisitDT).format("MMM DD, YYYY");
    //                var lmp = moment(items.LMP).format("MMM DD, YYYY");


    //                setMWRA_details((MWRA_details)=>({...MWRA_details,visitDate:"ভিজিটের তারিখঃ "+vdt }));
    //                setMWRA_details((MWRA_details)=>({...MWRA_details,pregnancy:"মাসিকের অবস্থাঃ "+items.pregStatus}));
    //                setMWRA_details((MWRA_details)=>({...MWRA_details,lmp:"মাসিকের তারিখঃ "+lmp }));
    //                setMWRA_details((MWRA_details)=>({...MWRA_details,meritalStatus:"বৈবাহিক অবস্থাঃ "+items.MeritalStatus}));

                   
                  
                  

    //               //  visitDate:"",
    //               //  pregnancy:"",
    //               //  lmp:"",
    //               //  meritalStatus:""



                   
    //             }  
    //           }else{
    //             setMWRA_details((MWRA_details)=>({...MWRA_details,noVisit:"ডাটাবেজ অনুযায়ী কোন ভিজিট দেয়া হইনি"}));
    //           }  
                

    //     })
    //   })




    // };


    if(loading.loadingState===true){
      return(
<ActivityIndicator color={"red"} size={"large"}/>
      )
      
    }
else{

  return (
        <View>
            <FlatList      
            ListHeaderComponent={SerachBar}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              windowSize={5}
              data={MWRA_survey_data} 
              renderItem={render_mwra_survey_items}
              keyExtractor={(items)=> items.surveyNo}
              onRefresh={get_survey_data}
              refreshing={loading.loadingState}

            />
        </View>
  )
}
}

export default Inside_khana_mwra_visit_list
