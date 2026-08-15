import React,{useEffect} from 'react'
import {View, Text} from 'react-native'
import Inside_khana_mwra_list from '../components/Inside_khana_mwra_list'
import { passValueToSidebar } from '../components/SideBar_values'

const MWRA_list_page = (props) => {

  const props_array=[
  props.name,//0
  props.userID,//1
  props.password,//2
  props.cluster,//3
  props.roundNo,//4
  props.block,//5
  props.villageCode,//6
  props.villageName,//7
  props.bari, //8
  props.bariName,//9
  props.hh,//10
  props.hhName,//11
  props.componentId,//12
  props.MemberAddTracker,//13
  props.MemberUpdateTracker,//14
  props.mwraVisit//15
  // mwraVisit="yes"
  ];



  useEffect(()=>{
    passValueToSidebar(props.userID, false, props.componentId);
  },[]);

  return (
    <View>
      <View style={{alignSelf: 'center', marginTop:"1%", width:"96%", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>

              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                MWRA সার্ভে ভিজিট 
              </Text>              
              
              <Text style={{fontSize:12, color:"#404040"}}>              
                  বিঃদ্রঃ MWRA ভিজিটের ক্ষত্রে, লিস্টে থাকা সব MWRA ভিজিট করতে হবে। সব MWRA ভিজিট সম্পূর্ণ হলে, স্বয়ংক্রিয় ভাবে এই লিস্ট থেকে বের হয়ে যাবে। অনুগ্রহ করে, ভিজিট অসম্পূর্ণ রেখে কোন ভাবে এই লিস্ট থেকে বের হবেননা। 
                  
              </Text>

      </View>

<Inside_khana_mwra_list passedValues = {props_array}/>
    </View>
  )
}

export default MWRA_list_page;
