import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Alert, Image, ActivityIndicator } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import moment from 'moment';

const db = openDatabase(
    {
      name: 'prf.db',
      location: 'default',
      //createFromLocation:"/storage/emulated/0/103_prf.db"
    },
    ()=>{console.log("Database OK.....")},
    error=>{Alert.alert("Database ERROR!!!!!!")}
    );


const Inside_khana_survey_list = (props) => {

  // name
  // userID
  // password
  // cluster
  // roundNo
  // block
  // bari
  // hh
  // villageCode

    const [SurveyItems, setSurveyItems] = useState([]);
  
    const [loading, setLoading]=useState({
        loadingState : false
      });

      const [totalRows, setTotalRows]=useState({
        totalRowsCount:""
      });



      const render_khana_survey_items=({item})=>{

        return(
          <View style={{flex:100, flexDirection:"row", justifyContent:"flex-start"}}>
          <View style={{flex:80}}>
  
  
  
  

          
          <View style={{flexDirection:"column", flex:100}}>
          <View style={{flex:90}}>
  
          
  
      <View style={{backgroundColor:"#fff", height:90, width:"100%", borderBottomWidth:1, borderBottomColor:"#b0acac", flex:100, flexDirection:"row",  padding:2, justifyContent:"space-between"}}>
  
        <View style={{paddingLeft:5, flex:10, flexDirection:"column", alignItems:"flex-start", justifyContent:"flex-start", borderRightWidth:1, borderRightColor:"#cfcfcf"}}>

          <Text><Text style={{fontWeight:"bold", color:"#be185d", fontSize:12}}>{item.surveyDate}</Text></Text>
          <Text style={{color:"#424242", fontSize:12}}>রাউন্ড নংঃ <Text style={{color:"#be185d", fontSize:12}} ellipsizeMode='tail' numberOfLines={1}>{item.surveyNo}</Text></Text>
          <Text style={{color:"#424242", fontSize:12}}>আউটকামঃ <Text style={{color:"#be185d", fontSize:12}} ellipsizeMode='tail' numberOfLines={1}>{item.visitOutcome}</Text></Text>
          
        </View>
  
        
  
        <View style={{paddingLeft:5, flex:15, flexDirection:"column", alignItems:"flex-start", justifyContent:"flex-start", borderRightWidth:1, borderRightColor:"#cfcfcf"}}>
        <Text style={{color:"#424242", fontSize:12}}>নতুন সদস্য যোগ <Text style={{color:"#be185d", fontSize:12, fontWeight:"bold"}} ellipsizeMode='tail' numberOfLines={1}>{item.Q1}</Text></Text>
        <Text style={{color:"#424242", fontSize:12}}>সদস্যের স্ট্যাটাস আপডেট <Text style={{color:"#be185d", fontSize:12,  fontWeight:"bold"}} ellipsizeMode='tail' numberOfLines={1}>{item.Q2}</Text></Text>
        </View>

        <View style={{paddingLeft:5, flex:20, flexDirection:"column", alignItems:"flex-start", justifyContent:"space-around"}}>
        <Text style={{color:"#424242", fontSize:12}}>সর্বমোট সদস্য যোগ হয়েছেঃ  <Text style={{color:"#be185d", fontSize:12, fontWeight:"bold"}} ellipsizeMode='tail' numberOfLines={1}>{item.added}</Text></Text>
        <Text style={{color:"#424242", fontSize:12}}>সর্বমোট সদস্য আপডেট হয়েছেঃ <Text style={{color:"#be185d", fontSize:12,  fontWeight:"bold"}} ellipsizeMode='tail' numberOfLines={1}>{item.updated}</Text></Text>
        <Text style={{color:"#424242", fontSize:12}}>পরবর্তী ভিজিটের সম্ভাব্য শুরুর তারিখঃ <Text style={{color:"#be185d", fontSize:12,  fontWeight:"bold"}} ellipsizeMode='tail' numberOfLines={1}>{item.nextSurvey}</Text></Text>
        <Text style={{color:"#424242", fontSize:12}}>পরবর্তী ভিজিটের সম্ভাব্য শেষ তারিখঃ <Text style={{color:"#be185d", fontSize:12,  fontWeight:"bold"}} ellipsizeMode='tail' numberOfLines={1}>{item.endSurvey}</Text></Text>
        </View>
        
        
        
      </View>
      </View>
          
          </View>

  
  
  
  
  
  
  
      </View>
  

  
      </View>
        )
      }

      const SerachBar=()=>{
        return(
          <View style={{padding:7, backgroundColor:"#fff", borderBottomWidth:1, borderBottomColor:"#b0acac", borderTopColor:"#b0acac", borderTopWidth:1}}>

          <View style={{paddingLeft:5, flexDirection:"row", justifyContent:"space-between"}}>
            <View>
            <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
              সার্ভে ভিজিট  ।  সর্বমোট সার্ভে ভিজিট  {totalRows.totalRowsCount}
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





      // select
      // s.surveyDate,
      // s.surveyNo,
      // case 
      // when (Q1_NewMember='2' or Q2_MemberUpdate='2' or Q1_NewMember='1' or Q2_MemberUpdate='1') and (s.member_present is null or s.member_present = '' or s.member_present!='') then '1'
      
      // when Q1_NewMember='9' or Q1_NewMember='' then '2'
      // end as 'visitOutcome',
      // s.nextSurvey_EndDate,
      // s.Q1_NewMember,
      // s.Q2_MemberUpdate,
      // case when s.Q1_NewMember='1' then count(nm.Mem_PID) end as 'totalMemberAdded',
      // case when s.Q2_MemberUpdate = '1' then COUNT(um.Mem_PID) end as 'totalMmeberUpdate'
      // from survey s
      // left join member nm on s.village = nm.Village_Code and s.bari = nm.Bari_Code and s.hh = nm.HH_Code and (date(s.surveyDate) = date(nm.Reg_Date) or date(s.surveyDate)= date(nm.Entry_Date)) 
      // left join member um on s.village = um.Village_Code and s.bari = um.Bari_Code and s.hh = um.HH_Code and (date(s.surveyDate) = date(um.statusCngOn) or date(surveyDate) = date(um.Edit_Date))
      // where
      // s.village = '5661' and
      // s.bari = '052' and
      // s.hh = '005'
      // group by s.surveyNo
      // order by surveyDate desc
    

      // select * from survey where village = '"+props.villageCode+"' and bari = '"+props.bari+"' and hh = '"+props.hh+"' order by surveyDate desc

    const get_khana_survey_list_main_query=()=>{
      setLoading({loadingState:true})
    
      db.transaction(tx=>{
        tx.executeSql(
        "select "+
      "s.surveyDate, "+
      "s.surveyNo, "+
      "case "+
      "when (Q1_NewMember='2' or Q2_MemberUpdate='2' or Q1_NewMember='1' or Q2_MemberUpdate='1') and (s.member_present is null or s.member_present = '' or s.member_present!='') then '1' "+      
      "when Q1_NewMember='9' or Q1_NewMember='' then '2' "+
      "end as 'visitOutcome', "+
      "s.nextSurvey_StartDate, "+
      "s.nextSurvey_EndDate, "+
      "case when s.Q1_NewMember = '1' then 'হ্যাঁ' else 'না' end as 'Q1', "+
      "case when s.Q2_MemberUpdate = '1' then 'হ্যাঁ' else 'না' end as 'Q2', "+
      "case when s.Q1_NewMember='1' then count(nm.Mem_PID) else '0' end as 'totalMemberAdded', "+
      "case when s.Q2_MemberUpdate = '1' then COUNT(um.Mem_PID) else '0' end as 'totalMmeberUpdate' "+
      "from survey s "+
      "left join member nm on s.village = nm.Village_Code and s.bari = nm.Bari_Code and s.hh = nm.HH_Code and (date(s.surveyDate) = date(nm.Reg_Date) or date(s.surveyDate)= date(nm.Entry_Date)) "+
      "left join member um on s.village = um.Village_Code and s.bari = um.Bari_Code and s.hh = um.HH_Code and (date(s.surveyDate) = date(um.statusCngOn) or date(surveyDate) = date(um.Edit_Date)) "+
      "where "+
      "s.village = '"+props.villageCode+"' and "+
      "s.bari = '"+props.bari+"' and "+
      "s.hh = '"+props.hh+"' "+
      "group by s.surveyNo "+
      "order by surveyDate desc",
        [],
        (tx, result)=>{
          
        var length = result.rows.length;

    
    
            setTotalRows({totalRowsCount:length})
            
    
              if(length>0){
    
                let results = [];
                for(let i= 0; i<length; i++){
      

                  var surveyNo = result.rows.item(i).surveyNo;                  
                  var surveyDate = moment(result.rows.item(i).surveyDate).isValid() ?  moment(result.rows.item(i).surveyDate).format('MMM DD, YYYY') : "";
                  var visitOutcome = result.rows.item(i).visitOutcome = '1' ? 'সম্পূর্ণ' : 'অসম্পূর্ণ'; 
                  var nextSurvey = moment(result.rows.item(i).nextSurvey_StartDate).isValid() ? moment(result.rows.item(i).nextSurvey_StartDate).format('MMM DD, YYYY'): "n/a";
                  var endSurvey = moment(result.rows.item(i).nextSurvey_EndDate).isValid() ? moment(result.rows.item(i).nextSurvey_EndDate).format('MMM DD, YYYY'): "n/a";
                  var Q1 = result.rows.item(i).Q1;                  
                  var Q2 = result.rows.item(i).Q2;    
                  var added = result.rows.item(i).totalMemberAdded;    
                  var updated = result.rows.item(i).totalMmeberUpdate;        
                  

                  results.push({endSurvey:endSurvey, surveyNo:surveyNo, surveyDate:surveyDate, visitOutcome:visitOutcome, nextSurvey:nextSurvey, Q1:Q1, Q2:Q2, added:added, updated:updated}) 
    
                }
                setSurveyItems(results);
                setLoading({loadingState:false})

              }
              else{
                Alert.alert("সার্ভে", "এই খানায় এখন পর্যন্ত কোন সার্ভে ভিজিট হয়নি।")
                setLoading({loadingState:false})
              }
    
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });
      }


      useEffect(()=>{
        get_khana_survey_list_main_query()
      },[])







    if(loading.loadingState===true){
      return(
<ActivityIndicator color={"red"} size={"large"}/>
      )
      
    }
else{
  return (
    <View style={{paddingTop:5}}>
        <FlatList 
      ListHeaderComponent={SerachBar}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={5}
      data={SurveyItems} 
      renderItem={render_khana_survey_items}
      keyExtractor={(SurveyItems)=> SurveyItems.surveyNo}
      onRefresh={()=>this.get_khana_survey_list_main_query}
      refreshing={loading.loadingState}
      stickyHeaderIndices={[0]}
      />
    </View>
  )
}


}

export default (Inside_khana_survey_list)
