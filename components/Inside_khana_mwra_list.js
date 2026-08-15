import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Alert, Image, ActivityIndicator, TouchableHighlight, Touchable, TouchableOpacity, Modal, ImageBackground } from 'react-native'
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


const Inside_khana_mwra_list = (props) => {


  // props.name,//0
  // props.userID,//1
  // props.password,//2
  // props.cluster,//3
  // props.roundNo,//4
  // props.block,//5
  // props.villageCode,//6
  // props.villageName,//7
  // props.bari, //8
  // props.bariName,//9
  // props.hh,//10
  // props.hhName,//11
  // props.componentId,//12
  // props.MemberAddTracker,//13
  // props.MemberUpdateTracker,//14
  // mwraVisit="yes"//15

    // props.passedValues[15] how to call


    const valuesForMwraSurvey=[
  props.passedValues[0],//0
  props.passedValues[1],//0
  props.passedValues[2],//0
  props.passedValues[3],//0
  props.passedValues[4],//0
  props.passedValues[5],//0 block
  props.passedValues[6],//0
  props.passedValues[7],//0
  props.passedValues[8],//0
  props.passedValues[9],//0
  props.passedValues[10],//0
  props.passedValues[11],//0
  props.passedValues[12],//0
  props.passedValues[13],//0
  props.passedValues[14],//0
  // props.passedValues[15]//mwraVisit="yes"//15
    ]

    // console.log(""+props.passedValues[4]);

  const [selectedMemberMPID, setSelectedMemberMPID] = useState("");
  const [selectedMemberMSL, setSelectedMemberMSL] = useState("");
  const [openProfile, setOpenProfile] = useState(false);

  const open_profile = async (mpid, Mem_SL)=>{
    
    // console.log(mpid);
    // console.log(Mem_SL);
    
    var MPID = await mpid;
    var MemSerial = await Mem_SL;
    setSelectedMemberMPID(MPID);
    setSelectedMemberMSL(MemSerial);
    setOpenProfile(true);
    // Alert.alert(""+valuesForMwraSurvey[15]);
  
  
  }

    const [MemberItems, setMemberItems] = useState([]);
  
    const [loading, setLoading]=useState({
        loadingState : false
      });
      
      const[modelView,SetModelView]=useState({
        visible:false
      })
      const[modelData,SetModelData]=useState({
        ChildError:"",
        EDDError:"",
        MWRAError:"",
      })


      const [totalRows, setTotalRows]=useState({
        totalRowsCount:""
      });




const [camera_container_open, set_camera_container_open] = useState(false);
const [camera_document_type, set_camera_document_type] = useState("");
const [mem_sl_for_camera, setMem_sl_for_camera] = useState("");
const [mem_gender_for_camera, setMem_gender_for_camera] = useState("");

const open_camera=(mem_sl,doc_type,gender)=>{
  setMem_sl_for_camera(mem_sl);
  setMem_gender_for_camera(gender)
  set_camera_container_open(true);  
  // setShow_profile(false);
  set_camera_document_type(doc_type)

}

      

const close_camera=(data)=>{
  var close = data="close"? false : true;
  set_camera_container_open(close);    
}






const render_MWRA_details = ({item})=>{
return(

<View>  

    <View style={{width:"100%", alignItems:"flex-start", padding:4, flexDirection:"row", justifyContent:"space-around"}}>
    <View style={{width:"30%"}}>                    
      <Text style={{color:"#383838", fontSize:12}}>{item.visitDate!=="1909-09-09"? item.visitDate :""}</Text>
    </View>
    <View style={{width:"21%"}}>
      <Text style={{color:"#383838", fontSize:12}}>{item.outcome}</Text>
    </View>
    <View style={{width:"43%"}}>
      <Text ellipsizeMode='tail' numberOfLines={1} style={{color:"#383838", fontSize:12}}>{item.pregnancy}</Text>
    </View>
    </View>


  </View>
)
}


      const render_khana_member_items=({item})=>{

        
        const isExpanded = expandedRows.includes(item.Member_SL);

        return(
          <View style={{flex:100, flexDirection:"row", justifyContent:"flex-start"}}>
          <View style={{flex:80}}>
  
  
  
          {/* onPress={call.bind(this,item.hh)} */}
      <TouchableHighlight underlayColor={"#cffafe"}>
          
          <View style={{flexDirection:"column", flex:100}}>
          <View style={{flex:90}}>
  
          
  
      <View style={{backgroundColor:"#fff", height:90, width:"100%", borderBottomWidth:1, borderBottomColor:"#b0acac", flex:100, flexDirection:"row",  padding:2, justifyContent:"space-between"}}>
  




      <TouchableOpacity onPress={open_profile.bind(this,item.MPID, item.Member_SL)} style={{flex:90, flexDirection:"row"}}>
        <View style={{ flex:35, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            
            <ImageBackground source={require('../img/no_image.png')} style={{flex:1, alignItems:"center",justifyContent:"center", marginLeft:15}} resizeMode='contain'>
            <Image source={item.member_photo} style={{height:80, width:80, borderRadius:100, borderWidth:2, borderColor:"#0369a1"}} resizeMode='contain'/>
            </ImageBackground>
  
          <View style={{flex:2, height:"100%", justifyContent:"center", marginLeft:25}}>
          <Text style={{color:"#be185d", fontSize:12, fontWeight:"bold"}}>
           {item.Mem_name}
          </Text>
          
          <Text style={{color:"#404040", fontSize:12}} ellipsizeMode='tail' numberOfLines={1}> 
          <Image source={require('../img/calendar.png')} style={{height:20, width:20}} resizeMode='contain'/> {item.memberDOB}          
          </Text>
          
          <Text style={{color:"#404040", fontSize:12}}>{item.EDD_Formatted}</Text>
          
        
          </View> 
        </View>
  
        
  
        <View style={{flex:40, height:"100%", alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
          
          {item.If_HH_Head}
          {item.if_is_MWRA}          
          {item.ifPregnent}
          {item.if_Only_member}
          {item.if_abroad}
          {item.if_Child}
          {item.if_Guest}
          {item.if_Old}
          {item.survey_completed}
          
        </View>
        



        
        <View style={{flex:35, alignItems:"flex-start", justifyContent:"space-between", height:"100%", flexDirection:"row"}}>
        



      <View style={{width:"auto", flexDirection:"column", justifyContent:"center", height:"100%"}}>
        <Text style={{color:"#383838", fontSize:12}}>                      
        MPID <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.FormattedMPID}</Text>        
        </Text>

        <Text style={{color:"#383838", fontSize:12}}>                      
        MCID <Text style={{color:"#be185d", fontWeight:"bold"}}>{item.FormattedMCID}</Text>
        </Text>

        <Text ellipsizeMode='tail' numberOfLines={1} style={{color:"#404040", fontSize:12}}>{item.s_Name}</Text>      

      </View>      
        </View>
        </TouchableOpacity>


        <View style={{flex:10, justifyContent:"space-between", alignItems:"center", height:"100%", flexDirection:"column", paddingTop:5, paddingBottom:5}}>
        {item.waring_icon}
        {item.NID_card}

        </View>

       
        
      </View>
      </View>




      <View style={{flex:10}}>
        {isExpanded &&(
        
        <View style={{flexDirection:"row", flex:100, padding:10, justifyContent:"space-around", alignItems:"center", borderBottomColor:"#b3b3b3", borderBottomWidth:1}}>
          
          <View style={{width:"55%", backgroundColor:"#fff", borderRadius:5, elevation:1, padding:5}}>
          <View style={{width:"100%", alignItems:"center"}}>
            <Text style={{fontSize:13, color:"#363636", lineHeight:15, fontWeight:"bold"}}>সর্বশেষ ৫ ভিজিটের ফলাফল</Text>
            <Text style={{fontSize:12, color:"#363636"}}>{MWRA_details.noVisit}</Text>
          </View>
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
        </View>



          
          </View>
      </TouchableHighlight>    
  


  
  
  
  
  
  
      </View>  


      <TouchableHighlight underlayColor={"#cffafe"} onPress={() => toggleRowExpansion(item.Member_SL, item.MPID)}  style={{backgroundColor:"#e0f2fe", flex:5, borderBottomWidth:1, borderBottomColor:"#a3a3a3", justifyContent:"center", alignItems:"center"}}>
          <View>
              <Image source={require('../img/down.png')} style={{height:30, width:30}}/>
          </View>
        </TouchableHighlight>

      </View>
        )

        
      }


      
      const SerachBar=()=>{
        return(
          <View style={{padding:7, backgroundColor:"#fff", borderBottomWidth:1, borderBottomColor:"#b0acac", borderTopColor:"#b0acac", borderTopWidth:1}}>

          <View style={{paddingLeft:5, flexDirection:"row", justifyContent:"space-between"}}>
            <View>
            <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
              MWRA সদস্য  ।  খানার সর্বমোট MWRA  {totalRows.totalRowsCount}
            </Text>            
            </View>

            <View>
            <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
            {/* রাউন্ড {props.passedValues[4]} */}
            </Text>
            </View>

          </View>

          </View>
          
        )
      }


      const closeProfileModel=()=>{
       setOpenProfile(false);
     }

      const [image_updater, Set_image_updater] = useState(Math.random());

    const get_khana_member_list_main_query=()=>{



      Set_image_updater(Math.random());
      closeProfileModel();
      setLoading({loadingState:true})
    
      db.transaction(tx=>{
        tx.executeSql(
        "select "+
        "(substr(member.Mem_PID,1,3)||' '||substr(member.Mem_PID,4,2)||' '||substr(member.Mem_PID,6,3)||' '||substr(member.Mem_PID,9,3))'FormattedMPID', "+
        "(substr(member.MCID,1,4)||' '||substr(member.MCID,5,3)||' '||substr(member.MCID,8,3)||' '||substr(member.MCID,11,3))'FormattedMCID', "+
        "member.Mem_Enroll_Type, "+ 
        "member.Visit_Date 'Visit_Date', "+
        "member.Mem_PID 'MPID', "+
        "member.Mem_SL 'Member_SL', "+
        "member.MCID 'MCID', "+
        "member.Father_Name 'Father_Name', "+
        "member.Mother_Name 'Mother_Name', "+
        "member.Hus_Wife_Name 'Spouse', "+
        "member.is_MWRA 'is_MWRA', "+
        "member.Mem_Name 'Mem_Name', "+
        "member.Mem_Sex 'Mem_Sex', "+        
        "MWRA_Survey.EDD  'EDD', "+        
        "case "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+ 
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+ 
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
        "else Mem_DOB end as 'Mem_DOB', "+

        "member.Mem_Cstatus 'Mem_Cstatus', "+        
        "icon.path 'path', "+
        "MWRA_Survey.pregnancyStatus 'pregnent', "+
        "case when MWRA_Visit.pid is not null and MWRA_Visit.pid !='' then 'visit_complete' else 'visit_not_complete' end as 'survey_status', "+
        "case "+
        " when date(member.Entry_Date)<date('2022-03-01') then 'NotUpdated' "+ //'2016-12-01'
        " else date(member.Entry_Date) "+
        " end as 'Entry_Date', "+


        "CASE when (((JulianDay('now')) - JulianDay(case "+
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+  
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+ 
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
            "else Mem_DOB end))/365.25)>=60 then 'old' else 'NotOld' end as 'OldStatus', "+
        
          "CASE when (((JulianDay('now')) - JulianDay(case "+
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+  
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+ 
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
            "else Mem_DOB end))/365.25)> 5 and cast(member.Mem_Enroll_Type as int) = '3' then 'NotChild' else 'ok' end as 'ChildStatus', "+
      
        
            "case when cast(pregnancyStatus as INT)=4 and date(EDD)<date('now') then 'EddCross' else 'ok' end as 'PregnancyOutcome', "+
      
            "case when (cast(member.Marital_Status as INT)<>1 or cast(member.Mem_Sex as INT)<>2 or "+
            "(((JulianDay('now')) - JulianDay(case "+
              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
              "else Mem_DOB end))/365.25)< 13 or (((JulianDay('now')) - JulianDay(case "+
                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB "+
                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB "+
                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB "+
                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB "+
                "else Mem_DOB end))/365.25)> 60 "+
                ") and is_MWRA = '1' then 'NotMWRA' else 'ok' end as 'MWRAStatus', "+
                "member.IMG "+
        "from member "+
        "left join (select pid from MWRA_Survey a where a.village||a.bari||a.hh = '"+props.passedValues[6]+"'||'"+props.passedValues[8]+"'||'"+props.passedValues[10]+"' and 	EXISTS ( "+
          "SELECT 1 "+
          "FROM Surv_Round b "+
          "WHERE DATE(a.VisitDT) BETWEEN DATE(b.Start_Date) AND DATE(b.End_Date) "+
          "AND b.Round_No = '"+props.passedValues[4]+"' "+
      ")"+
      "GROUP BY a.pid ) MWRA_Visit on MWRA_Visit.pid = member.Mem_PID "+
        "left join "+
        "(WITH a as( "+
        "SELECT EDD, ROW_NUMBER() OVER (PARTITION BY pid ORDER BY CAST(MWRA_Survey.surveyNo AS int) DESC) 'rn' , pregnancyStatus, Entry_Date, pid, VisitOutCome from MWRA_Survey "+
        "WHERE "+
        "VisitOutCome = '1' and "+
        "village = '"+props.passedValues[6]+"' "+
        "AND "+
        "bari = '"+props.passedValues[8]+"' "+
        "AND "+
        "hh = '"+props.passedValues[10]+"' order by cast(MWRA_Survey.surveyNo as INT) desc )select * from a where rn = 1 "+
        ") MWRA_Survey on MWRA_Survey.pid = member.Mem_PID "+
        "left join icon on member.Mem_Icon = icon.statusCode and icon.statusCode is not null "+
        "where member.Village_Code = '"+props.passedValues[6]+"' and member.Bari_Code = '"+props.passedValues[8]+"'  and member.HH_Code='"+props.passedValues[10]+"' and member.Mem_Cstatus in ('1') and cast(member.is_MWRA as INT) = 1 "+
        "group by member.Mem_PID, member.Mem_SL",
        [],
        (tx, result)=>{
          
        var length = result.rows.length;

        setTotalRows({totalRowsCount:length})
        
        if(length>0){
    
                let results = [];
 
                for(let i= 0; i<length; i++){
                   let items=result.rows.item(i);

                   var IMG = result.rows.item(i).IMG; 

                   var Mem_name = ((result.rows.item(i).Mem_Name).trim()).toUpperCase();        
                   var Entry_Date = result.rows.item(i).Entry_Date;     
    

                   var MPID = result.rows.item(i).MPID;        
                   var Member_SL = result.rows.item(i).Member_SL;        
                   var MCID = result.rows.item(i).MCID;
                   var FormattedMPID = result.rows.item(i).FormattedMPID;
                   var FormattedMCID = result.rows.item(i).FormattedMCID;
                       
                   var enrollType = result.rows.item(i).Mem_Enroll_Type;
                   var fName = ((result.rows.item(i).Father_Name).trim()).toUpperCase();
                   var mName = ((result.rows.item(i).Mother_Name).trim()).toUpperCase();
                   var sName = result.rows.item(i).Spouse==null || result.rows.item(i).Spouse=="" ? "" : ((result.rows.item(i).Spouse).trim()).toUpperCase();
                   var cStatus = result.rows.item(i).Mem_Cstatus;        
                   var is_MWRA = result.rows.item(i).is_MWRA;
                   var pregnent = result.rows.item(i).pregnent;
                   var EDD = result.rows.item(i).EDD;                   
                   var Mem_DOB = result.rows.item(i).Mem_DOB;        
                   var Member_sex = result.rows.item(i).Mem_Sex;
                   var OldStatus = result.rows.item(i).OldStatus;

                   var ChildStatus = result.rows.item(i).ChildStatus;
                   var PregnancyOutcome = result.rows.item(i).PregnancyOutcome;
                   var MWRAStatus = result.rows.item(i).MWRAStatus;

                   var survey_status = result.rows.item(i).survey_status;



                   var If_HH_Head;
        if(enrollType=="1"){
            If_HH_Head = <Image source={require('../img/HH_head_statusIcon.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            If_HH_Head = "";
        }
        
  
        
        var if_is_MWRA;
        if(is_MWRA=="1"){
            if_is_MWRA = <Image source={require('../img/mwra_statusIcon.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            if_is_MWRA = "";
        }

        
        var ifPregnent;
        var EDD_Formatted="";
        
        if(pregnent=="4"){
        ifPregnent = <Image source={require('../img/pregnent.png')} style={{height:30, width:30, marginLeft:2}}/>        
        EDD_Formatted ="EDD "+ moment(EDD).isValid()? moment(EDD).format('MMM DD, YYYY') : "";
        }
        else{
        ifPregnent = "";
        EDD_Formatted = "";
        }


        var if_Only_member;
        if(enrollType=="5"){
            if_Only_member = <Image source={require('../img/member_statusIcon.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            if_Only_member = "";
        }

        var if_abroad;
        if(enrollType=="8"){
            if_abroad = <Image source={require('../img/abroad.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            if_abroad = "";
        }

        var if_Child;
        if(enrollType=="3"){
            if_Child = <Image source={require('../img/child_statusIcon.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            if_Child = "";
        }

        var if_Old;
        if(OldStatus=="old"){
          if_Old = <Image source={require('../img/old.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
          if_Old = "";
        }
        

        var if_Guest;
        if(enrollType=="6"){
            if_Guest = <Image source={require('../img/guest_statusIcon.png')} style={{height:30, width:30, marginLeft:2}}/>        
        }
        else{
            if_Guest = "";
        }



        var survey_completed;
        if(survey_status=="visit_complete"){
          survey_completed = <View style={{ height:"50%", justifyContent:"center",  alignItems:"center", borderLeftWidth: 1, borderLeftColor: '#dbdbdb', paddingLeft:3, marginLeft:5}}><Image source={require('../img/done.png')} style={{height:30, width:30, marginLeft:2}}/></View>        
        }
        else if(survey_status = "visit_not_complete"){
          survey_completed = <View style={{ height:"50%", justifyContent:"center",  alignItems:"center", borderLeftWidth: 1, borderLeftColor: '#dbdbdb', paddingLeft:3, marginLeft:5}}><Image source={require('../img/notDone.png')} style={{height:30, width:30, marginLeft:2}}/></View>        
        }
        else{
          survey_completed = "";
        }




        var avatar;
        var gender;        
        if(Member_sex=="1"){
        avatar = require('../img/man.png');
        gender = "পুরুষ"
        // member_photo = require('../img/man_PIC.png');
        }
        else{
        avatar = require('../img/woman.png');
        gender = "মহিলা";
        // member_photo = require('../img/woman_PIC.png');
        }

        
        
        
        
        var f_Name = "";
        var m_Name = "";
        var s_Name = "";
        
        if(enrollType=="3"){
        f_Name = "বাবা - "+ fName;
        m_Name =  "মা - "+ mName;
        }
        else if(is_MWRA=="1"){
        s_Name = "স্বামী - "+ sName;
        f_Name = "";
        m_Name =  "";
        }else{
        s_Name = "";
        f_Name = "";
        m_Name = "";
        } 

        var memberDOB = Mem_DOB!==""? moment(Mem_DOB).format('MMM DD, YYYY') : "জন্ম তারিখ নেই";


        var Child_status_data_error;
        if(ChildStatus==="NotChild"){
          Child_status_data_error= "নির্বাচিত শিশুর বয়স ৫ বছরের বেশি আছে জন্ম তারিখ অনুযায়ী। কিন্তু ডাটাবেজে এখনও বর্তমান স্ট্যাটাস অনুযায়ী (শিশু স্ট্যাটাস) এ আছে। তাই এই ডাটা ঠিক করার জন্য খানা ভিজিটের মাধ্যমে ঠিক করুন অথবা আপনার সুপারভাইজারের সাথে আলাপ করে ডাটাটি সঠিক করুন।";
        }else{
          Child_status_data_error= "";
        }

        var Pregnancy_status_data_error;
        if(PregnancyOutcome==="EddCross"){
          Pregnancy_status_data_error= "নির্বাচিত মহিলার EDD পার হয়ে গেছে ডাটাবেজ অনুযায়ী। গর্ভের ফলাফল যদি ইতিমধ্যে হয়ে থাকে, তাহলে MWRA ভিজিটের মাধ্যমে গর্ভের ফলাফল এন্ট্রি করে ভিজিট সমাপ্ত করুন অথবা অন্য কোন সমস্যা হলে, আপনার সুপারভাইজারের সাথে আলাপ করুন এবং ডাটাটি সঠিক করুন। ";
        }else{
          Pregnancy_status_data_error= "";
        }


        var mwra_status_data_error;
        if(MWRAStatus==="NotMWRA"){
          mwra_status_data_error= "নির্বাচিত মহিলা বর্তমান স্ট্যাটাস অনুযায়ী MWRA, কিন্তু এই সদস্যের অন্যান্য তথ্য যেমনঃ লিঙ্গ, বয়স বা বৈবাহিক অবস্থা অনুযায়ী MWRA হবার কথা নয়। তাই এই ডাটা ঠিক করার জন্য খানা ভিজিটের মাধ্যমে ঠিক করুন অথবা আপনার সুপারভাইজারের সাথে আলাপ করে ডাটাটি সঠিক করুন।";
        }else{
          mwra_status_data_error= "";
        }

        
        var waring_icon = "";
        if(ChildStatus==="NotChild" || PregnancyOutcome==="EddCross" || MWRAStatus==="NotMWRA"){
          waring_icon = <TouchableOpacity onPress={warning_description.bind(this,Child_status_data_error,Pregnancy_status_data_error,mwra_status_data_error)}><Image source={require('../img/exclamation.png')} style={{height:30, width:30, borderWidth:3, borderColor:"#e11d48", borderRadius:100}}/></TouchableOpacity>
        }
        else{
          waring_icon = "";
        }
        

        var NID_card = "";
        if(enrollType!="3"){
          NID_card = <TouchableOpacity onPress={open_camera.bind(this,Member_SL, "IDs", Member_sex)}><Image source={require('../img/card1.png')} style={{height:30, width:35}}/></TouchableOpacity>
        }
        else{
          NID_card = "";
        }




        var member_photo;
        if(IMG===null || IMG ===""){
          if(Member_sex=="1"){            
            member_photo = require('../img/man_PIC.png');
            }
            else{            
            member_photo = require('../img/woman_PIC.png');
            } 
        }else{
          member_photo = {uri:IMG + "?" + image_updater};
        }



        

        
        

                  results.push({survey_completed:survey_completed, EDD_Formatted:EDD_Formatted, if_Old:if_Old, NID_card:NID_card, Child_status_data_error:Child_status_data_error, Pregnancy_status_data_error:Pregnancy_status_data_error, mwra_status_data_error:mwra_status_data_error, waring_icon:waring_icon, Member_SL:Member_SL, MPID:MPID, MCID:MCID, Mem_name:Mem_name, f_Name:f_Name, s_Name:s_Name, m_Name:m_Name, avatar:avatar, if_Guest:if_Guest, if_Child:if_Child, if_abroad:if_abroad, if_Only_member:if_Only_member, ifPregnent:ifPregnent, if_is_MWRA:if_is_MWRA, If_HH_Head:If_HH_Head, FormattedMPID:FormattedMPID, FormattedMCID:FormattedMCID, memberDOB:memberDOB, member_photo:member_photo, gender:gender}) 
    
                }
                setMemberItems(results);
                setLoading({loadingState:false})

              }
              else{
                Alert.alert("MWRA", "এই খানায় বর্তমানে কোন MWRA এ নাই।")
                setLoading({loadingState:false})
              }
    
        },
        function(tx, error){
        console.log("add data error: "+ error.message);
        });
        });
      }


      useEffect(()=>{
        get_khana_member_list_main_query()
      },[])

      const warning_description=(ChildStatusError, PregnancyError, MWRAError)=>{
        SetModelView({visible:true});
        SetModelData((SetModelData)=>({...SetModelData,ChildError:ChildStatusError }))
        SetModelData((SetModelData)=>({...SetModelData,EDDError:PregnancyError }))
        SetModelData((SetModelData)=>({...SetModelData,MWRAError:MWRAError }))

      }
      const closeModel=()=>{
        SetModelView({visible:false});
      }

      // Child_status_data_error:Child_status_data_error, Pregnancy_status_data_error:Pregnancy_status_data_error, mwra_status_data_error
      // console.log(props.passedValues[2]);


      const [expandedRows, setExpandedRows] = useState([]);


      const[MWRA_last5Visit, setMWRA_last5Visit] = useState([])
      const[MWRA_details, setMWRA_details] = useState({
        noVisit:"",
        visitDate:"",
        pregnancy:"",
        lmp:"",
        meritalStatus:""
      })



      const toggleRowExpansion = (mem_sl, pid) => {
        if (expandedRows.includes(mem_sl)) {
          setExpandedRows([]);
        } else {
          setExpandedRows([mem_sl]);        
        }

        // if (expandedRows.includes(mem_sl)) {
        //   setExpandedRows(expandedRows.filter(row => row !== mem_sl));
        // } else {
        //   setExpandedRows([...expandedRows, mem_sl]);        
        // }


        setMWRA_details((MWRA_details)=>({...MWRA_details,noVisit:"" }));
        setMWRA_details((MWRA_details)=>({...MWRA_details,visitDate:"" }));
        setMWRA_details((MWRA_details)=>({...MWRA_details,pregnancy:"" }));
        setMWRA_details((MWRA_details)=>({...MWRA_details,lmp:"" }));
        setMWRA_details((MWRA_details)=>({...MWRA_details,meritalStatus:"" }));

        




        db.transaction(tx=>{
          tx.executeSql(
            "select "+ 
            "pid, "+
            "VisitDT, "+ 
            "case "+
            "when VisitOutCome = '1' THEN 'উপস্থিত' "+
            "when VisitOutCome = '2' THEN 'অনুপস্থিত' "+
            "when VisitOutCome = '3' THEN 'সম্মতি দেননি' else '' end as 'visitOutcome', "+
            "case "+
            "when VisitOutCome='1' and pregnancyStatus = '1' then 'মাসিক চলছে' "+ 
            "when VisitOutCome='1' and pregnancyStatus = '2' then 'নিয়মিত মাসিক বন্ধ আছে' "+ 
            "when VisitOutCome='1' and pregnancyStatus = '3' then 'মাসিক অনিয়মিত' "+  
            "when VisitOutCome='1' and pregnancyStatus = '4' then 'গর্ভবতী হিসাবে সনাক্ত' "+   
            "when VisitOutCome='1' and pregnancyStatus = '5' then 'গর্ভের ফলাফল জানা গিয়েছে' "+  
            "when VisitOutCome='1' and pregnancyStatus = '6' then 'মাসিক একেবারে বন্ধ(Menopause)' "+ 
            "when VisitOutCome='1' and pregnancyStatus = '7' then 'সর্বশেষ গর্ভধারণের পর মাসিক শুরু হইনি' "+ 
            "when VisitOutCome='1' and pregnancyStatus = '9' then 'ভুল সনাক্ত' "+ 
            "when VisitOutCome='2' or VisitOutCome='3' then '' "+ 
            "else 'সঠিক মাসিকের অবস্থা উল্লেখ নেই' end as 'pregStatus' "+ 
            "from MWRA_Survey "+ 
            "WHERE "+ 
            "pid = '"+pid+"' "+           
            "order by date(VisitDT) DESC "+              
            "limit 5",
          [],
          (tx, result)=>{          
            var results = [];
          var length = result.rows.length;          
          if(length>0){
                  for(let i= 0; i<length; i++){
                     let items=result.rows.item(i);          
                     console.log(items.visitOutcome);
                     var vdt = moment(items.VisitDT).isValid() ?  moment(items.VisitDT).format("MMM DD, YYYY") : "";
                     results.push({pid:items.pid, visitDate:"তাংঃ "+vdt, outcome:"| "+items.visitOutcome, pregnancy:"| "+items.pregStatus}) 
                  }
                  
                }else{
                  results.push({noVisit:"ডাটাবেজ অনুযায়ী কোন ভিজিট দেয়া হইনি", visitDate:"1909-09-09"})
                }    
                setMWRA_last5Visit(results);

          })
        })



                    




        db.transaction(tx=>{
          tx.executeSql(
            "select "+  
            "pid, "+ 
            "VisitDt, "+  
            "case "+  
            "when VisitOutCome = '1' THEN 'উপস্থিত' "+  
            "end as 'visitOutcome', "+ 
            "case "+  
            "when pregnancyStatus = '1' then 'মাসিক চলছে' "+  
            "when pregnancyStatus = '2' then 'নিয়মিত মাসিক বন্ধ আছে' "+  
            "when pregnancyStatus = '3' then 'মাসিক অনিয়মিত' "+   
            "when pregnancyStatus = '4' then 'গর্ভবতী হিসাবে সনাক্ত' "+    
            "when pregnancyStatus = '5' then 'গর্ভের ফলাফল জানা গিয়েছে' "+   
            "when pregnancyStatus = '6' then 'মাসিক একেবারে বন্ধ(Menopause)' "+  
            "when pregnancyStatus = '7' then 'সর্বশেষ গর্ভধারণের ফলাফলের পর এখনও মাসিক শুরু হইনি' "+  
            "when pregnancyStatus = '9' then 'ভুল সনাক্ত' "+  
            "else 'সঠিক মাসিকের অবস্থা উল্লেখ নেই' end as 'pregStatus', "+
			      "LMP, "+
			      "case "+ 
            "when MeritalStatus = '1' then 'বিবাহিত' "+
            "when MeritalStatus = '2' then 'তালাকপ্রাপ্ত' "+
            "when MeritalStatus = '3' then 'বিধবা' else '' end as 'MeritalStatus' "+
            "from MWRA_Survey "+  
            "WHERE "+  
            "pid = '"+pid+"' "+
            "AND "+
            "VisitOutCome = '1' "+            
            "order by date(VisitDT) DESC "+               
            "limit 1",
          [],
          (tx, result)=>{          
          var length = result.rows.length;          
                  if(length>0){
                  for(let i= 0; i<length; i++){
                     let items=result.rows.item(i);          

                     var vdt = moment(items.VisitDT).isValid()? moment(items.VisitDT).format("MMM DD, YYYY"):"";
                     var lmp = moment(items.LMP).isValid() ?  moment(items.LMP).format("MMM DD, YYYY") : "";


                     setMWRA_details((MWRA_details)=>({...MWRA_details,visitDate:"ভিজিটের তারিখঃ "+vdt }));
                     setMWRA_details((MWRA_details)=>({...MWRA_details,pregnancy:"মাসিকের অবস্থাঃ "+items.pregStatus}));
                     setMWRA_details((MWRA_details)=>({...MWRA_details,lmp:"মাসিকের তারিখঃ "+lmp }));
                     setMWRA_details((MWRA_details)=>({...MWRA_details,meritalStatus:"বৈবাহিক অবস্থাঃ "+items.MeritalStatus}));

                     
                    
                    

                    //  visitDate:"",
                    //  pregnancy:"",
                    //  lmp:"",
                    //  meritalStatus:""



                     
                  }  
                }else{
                  setMWRA_details((MWRA_details)=>({...MWRA_details,noVisit:"ডাটাবেজ অনুযায়ী কোন ভিজিট দেয়া হইনি"}));
                }  
                  

          })
        })




      };




    if(loading.loadingState===true){
      return(
<ActivityIndicator color={"red"} size={"large"}/>
      )
      
    }
else{
  return (

    <View style={{paddingTop:5}}>

{openProfile && (
<Member_profile mpid = {selectedMemberMPID} mem_sl = {selectedMemberMSL} fromMWRA_list = {true} mwraVisit = {props.passedValues[15]} closeProfileModel_fun = {closeProfileModel}  pass_value_for_back_to_survey = {""} back_to_survey = {""} villageCode = {props.passedValues[6]} bari = {props.passedValues[8]} hh = {props.passedValues[10]} valuesForMwraSurvey={valuesForMwraSurvey} />
)}

{camera_container_open &&(
<Camera_open document_type = {camera_document_type} close_container={close_camera} mem_serial = {mem_sl_for_camera} idcard = {mem_sl_for_camera} houseno={""} member_gender = {mem_gender_for_camera}/>
)}


<Notification closeModel={closeModel} if_visible={modelView.visible} ChildError = {modelData.ChildError} EDDError = {modelData.EDDError} MWRAError = {modelData.MWRAError}/>




        <FlatList 
      ListHeaderComponent={SerachBar}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={5}
      data={MemberItems} 
      renderItem={render_khana_member_items}
      keyExtractor={(MemberItems)=> MemberItems.Member_SL}
      onRefresh={get_khana_member_list_main_query}
      refreshing={loading.loadingState}
      stickyHeaderIndices={[0]}
      />
    </View>
  )
}


}


export default Inside_khana_mwra_list






