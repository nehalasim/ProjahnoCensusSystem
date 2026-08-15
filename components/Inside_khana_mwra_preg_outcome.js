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



const Inside_khana_mwra_preg_outcome = (props) => {




    const [loading, setLoading]=useState({
        loadingState : false
      });
    
    
    
      const [MWRA_survey_data, setMWRA_survey_data] = useState([]);
      const [totalRows, setTotalRows] = useState("");
    
    

    //   {label: "বাসা",  value:"1"},
    //   {label: "উপজেলা হাসপাতাল",  value:"2"},
    //   {label: "জেলা হাসপাতাল",  value:"3"},
    //   {label: "সরকারী  হাসপাতাল",  value:"4"},
    //   {label: "প্রাইভেট হাসপাতাল",  value:"5"},
    //   {label: "মাতৃমঙ্গল",  value:"6"},
    //   {label: "পরিবার পারিকল্পনা কেন্দ্র",  value:"8"},
    //   {label: "কমিইউনিটি ক্লিনিক",  value:"9"},
    //   {label: "অন্যান্য",  value:"7"}
    // নরমান ডেলিভারি
    // সিজারিয়ান সেকশন


      const get_survey_data=()=>{
    
    
        setLoading({loadingState:true})
      
        db.transaction(tx=>{
          tx.executeSql(
          "select "+
           "a.Mem_PID||a.Round_No||a.Preg_SL as 'serial', "+
            "a.Del_Date, "+
            "case "+
            "when  a.Del_Place = '1' then 'বাসা' "+
            "when a.Del_Place = '2' then 'উপজেলা হাসপাতাল' "+
            "when a.Del_Place = '3' then 'জেলা হাসপাতাল' "+
            "when a.Del_Place = '4' then 'সরকারী  হাসপাতাল' "+
            "when a.Del_Place = '5' then 'প্রাইভেট হাসপাতাল' "+
            "when a.Del_Place = '6' then 'মাতৃমঙ্গল' "+
            "when a.Del_Place = '7' then 'অন্যান্য' "+
            "when a.Del_Place = '8' then 'পরিবার পারিকল্পনা কেন্দ্র' "+
            "when a.Del_Place = '9' then 'কমিইউনিটি ক্লিনিক' else 'কোন তথ্য নেই'  end as 'DeliveryPlace', "+
            "case when a.Delivery_mode = '1' then 'নরমান ডেলিভারি' when a.Delivery_mode = '2' then 'সিজারিয়ান সেকশন' else 'কোন তথ্য নেই' end as 'DeliveryMode', "+
            "case when a.LB_Num is null or a.LB_Num='' then '0' else a.LB_Num||' জন' end as 'LB_Num', "+
            "case when a.SB_Num is null or a.SB_Num='' then '0' else a.SB_Num||' জন' end as 'SB_Num', "+
            "case when a.Abortion='1' then 'হ্যাঁ' when a.Abortion='2' then 'না' else '' end as 'Abortion', "+
            "c.CName, "+
            "case when c.CSex = '1' then 'ছেলে' when c.CSex = '2' then 'মেয়ে' else '' end as 'CSex', "+
            "c.Baby_SL, "+
            "(substr(c.Child_PID,1,3)||' '||substr(c.Child_PID,4,2)||' '||substr(c.Child_PID,6,3)||' '||substr(c.Child_PID,9,3))'FormattedMPID', "+
            "(substr(c.Child_CID,1,4)||' '||substr(c.Child_CID,5,3)||' '||substr(c.Child_CID,8,3)||' '||substr(c.Child_CID,11,3))'FormattedMCID', "+
            "case when c.CWeight_gm is null or c.CWeight_gm='' or c.CWeight_gm='999' or c.CWeight_gm='9999' then 'কোন তথ্য নেই' else c.CWeight_gm end as 'CWeight_gm', "+
            "case when m.Mem_Cstatus = '1' then 'জীবিত' when m.Mem_Cstatus = '2' then 'স্থানান্তরিত' when m.Mem_Cstatus = '3' then 'মৃত' else 'তথ্য নেই' end as 'cStatus' "+
            "from Preg_Outcome_Mother a "+
            "left join Preg_Outcome_Baby c on a.Mem_PID =  c.Mem_PID and a.Round_No = c.Round_No and a.Preg_SL = c.Preg_SL "+
            "left join member m on c.Child_PID = m.Mem_PID "+
            "WHERE "+
            "a.Mem_PID = '"+props.pid+"' "+
            "order by date(a.Del_Date) DESC",
          [],
          (tx, result)=>{
            
          var length = result.rows.length;    
          setTotalRows(length)                  
          if(length>0){      
                  let results = [];    
                  for(let i= 0; i<length; i++){
            
                     var serial = result.rows.item(i).serial;
                     var DeliveryDate = moment(result.rows.item(i).Del_Date).format("MMM DD, YYYY");      
                     var DeliveryPlace = result.rows.item(i).DeliveryPlace;
                     var DeliveryMode = result.rows.item(i).DeliveryMode;
                     var LiveNum = result.rows.item(i).LB_Num;
                     var StillNum = result.rows.item(i).SB_Num;
                     var Abortion = result.rows.item(i).Abortion;
                     var Cname = result.rows.item(i).CName;
                     var Csex = result.rows.item(i).CSex;
                     var BabySl = result.rows.item(i).Baby_SL;
                     var PID = result.rows.item(i).FormattedMPID;
                     var CID = result.rows.item(i).FormattedMCID;
                     var weight = result.rows.item(i).CWeight_gm;
                     var CStatus = result.rows.item(i).cStatus;                                         
    
                    results.push({serial:serial, DeliveryDate:DeliveryDate, DeliveryPlace:DeliveryPlace, DeliveryMode:DeliveryMode, LiveNum:LiveNum, StillNum:StillNum, Abortion:Abortion, Cname:Cname, Csex:Csex, BabySl:BabySl, PID:PID, CID:CID, weight:weight, CStatus:CStatus}) 
                    
                  }
                  setMWRA_survey_data(results);
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
    
            
    
        <View style={{backgroundColor:"#fff", height:130, width:"100%", borderBottomWidth:1, borderBottomColor:"#b0acac", flex:100, flexDirection:"row",  padding:2, justifyContent:"space-between"}}>
    
    
    
    
    
        <View style={{flex:90, flexDirection:"row", justifyContent:"flex-start"}}>
          <View style={{ flex:10,  flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderRightWidth:1, borderRightColor:"#d6d6d6"}}>
              
              {/* <View style={{flex:1, alignItems:"center",justifyContent:"center", marginLeft:15}}>
              <Image source={item.member_photo} style={{height:80, width:80, borderRadius:100, borderWidth:2, borderColor:"#0369a1"}} resizeMode='contain'/>
              </View> */}
    
            <View style={{flex:10, height:"100%", justifyContent:"center", marginLeft:10}}>

            <Text style={{color:"#be185d", fontSize:12, fontWeight:"bold"}}>
             {item.DeliveryDate}
            </Text>
            
            <Text style={{color:"#404040", fontSize:12}} ellipsizeMode='tail' numberOfLines={1}> 
            প্রসবের স্থানঃ {item.DeliveryPlace}          
            </Text>
            
            <Text style={{color:"#404040", fontSize:12}} ellipsizeMode='tail' numberOfLines={1}> 
             প্রসবের ধরনঃ {item.DeliveryMode}          
            </Text>
          
            </View> 

          </View>
    
          
          
    
    
    
          
          <View style={{paddingLeft:10, flex:8, alignItems:"flex-start", justifyContent:"space-between", height:"100%", flexDirection:"row", borderRightWidth:1, borderRightColor:"#d6d6d6"}}>
    
        <View style={{width:"auto", flexDirection:"column", justifyContent:"space-evenly", height:"100%"}}>
          <Text style={{color:"#383838", fontSize:12}}>                      
          জীবিত জন্ম <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.LiveNum}</Text>        
          </Text>
    
          <Text style={{color:"#383838", fontSize:12}}>                      
          মৃত জন্ম <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.StillNum}</Text>
          </Text>

          <Text style={{color:"#383838", fontSize:12}}>                      
          গর্ভপাত <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.Abortion}</Text>
          </Text>

          <Text style={{color:"#383838", fontSize:12}}>                      
          সিরিয়াল <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.BabySl}</Text>
          </Text>

          
               
        </View>    
    
          </View>


          <View style={{paddingLeft:10, flex:15, alignItems:"flex-start", justifyContent:"space-between", height:"100%", flexDirection:"row"}}>
    
        <View style={{width:"auto", flexDirection:"column", justifyContent:"space-evenly", height:"100%"}}>
          <Text style={{color:"#383838", fontSize:12}}>                      
          নাম <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.Cname}</Text>        
          </Text>
    
          <Text style={{color:"#383838", fontSize:12}}>                      
          লিঙ্গ <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.Csex}</Text>
          </Text>
          <Text style={{color:"#383838", fontSize:12}}>                      
          বর্তমান অবস্তা <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.CStatus}</Text>
          </Text>

          <Text style={{color:"#383838", fontSize:12}}>                      
          ওজন <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.weight}</Text>
          </Text>

          <Text style={{color:"#383838", fontSize:12}}>                      
          PID <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.PID}</Text>
          </Text>
          
          <Text style={{color:"#383838", fontSize:12}}>                      
          CID <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.CID}</Text>
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
                গর্ভের ফলাফল এবং সংক্ষিপ্ত বিবরন  ।  সর্বমোট সার্ভে সংখ্যা {totalRows}  
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
              keyExtractor={(items)=> items.serial}
              onRefresh={get_survey_data}
              refreshing={loading.loadingState}

            />
</View>  
)
}
}

export default Inside_khana_mwra_preg_outcome;
