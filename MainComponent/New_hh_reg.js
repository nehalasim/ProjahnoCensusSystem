import React, { useEffect, useState } from 'react'
import { Keyboard, View, Text, Alert, FlatList, TouchableHighlight, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ButtonBottom from  '../components/ButtonBottom';
import { openDatabase } from 'react-native-sqlite-storage';
// import Block_list_data from '../components/Block_list_data';
import Bari_list_data from '../components/Bari_list_data';
import moment from 'moment';
import Code_7_bubble from '../components/Code_7_bubble';

import CRUD_button from '../components/CRUD_button'
import InputField from '../components/InputField'
import Date_field from '../components/Date_field'
import DatePicker from 'react-native-date-picker'
// import { Dropdown } from 'react-native-element-dropdown'
import DropDown from '../components/DropDown';
import QuestionContainer from '../components/QuestionContainer'
import RadioButton from '../components/RadioButton'
import Inside_khana_member_list from '../components/Inside_khana_member_list';
import { passValueToSidebar } from '../components/SideBar_values';




// var db = Database.getConnection();

const db = openDatabase(
{
  name: 'prf.db',
  location: 'default',
  //createFromLocation:"/storage/emulated/0/103_prf.db"
},
()=>{console.log("Database OK.....")},
error=>{Alert.alert("Database ERROR!!!!!!")}
);



//       {props.name}~~
//       {props.userID}~~
//       {props.password}~~
//       {props.cluster}~~
//       {props.roundNo}~~
//       {props.block}~~
//       {props.bari}~~
//       {props.bariName}~~
//       {props.villageCode}~~
//       {props.villageName}~~
//       {props.componentId}

const New_hh_reg = (props) => {


  useEffect(()=>{
    passValueToSidebar(props.userID, false, props.componentId);
  },[]);

    const [member_list_visible, setMember_list_visible] = useState(false);


    const [creation_type, setCreation_type] = useState({
        radio_1:"no",
        radio_2:"no",
        value:"",
        disabled:false
    });

    const creationType=(clicked)=>{
        if(clicked==="1"){
        setCreation_type((creation_type)=>({...creation_type, radio_1:"yes"}))
        setCreation_type((creation_type)=>({...creation_type, radio_2:"no"}))
        setCreation_type((creation_type)=>({...creation_type, value:"1"}))
        setMember_list_visible(false);
    }else if(clicked==="2"){
        setCreation_type((creation_type)=>({...creation_type, radio_1:"no"}))
        setCreation_type((creation_type)=>({...creation_type, radio_2:"yes"}))
        setCreation_type((creation_type)=>({...creation_type, value:"2"}))
        split_HH_member_check();
        setMember_list_visible(false);
    }else{
        setCreation_type((creation_type)=>({...creation_type, radio_1:"no"}))
        setCreation_type((creation_type)=>({...creation_type, radio_2:"no"}))
        setCreation_type((creation_type)=>({...creation_type, value:""}))
        setMember_list_visible(false);
    }
    }



    
    // const split_hh_check_member_status=(value)=>{
    //     SetCheck_member_with_code_7(value);
    // }

    const[newKhanaName, setNewKhanaName] =useState("");
    const[newKhanaName_dis, setNewKhanaName_dis] = useState(true);


    const check_before_save=()=>{
        if(creation_type.value==""){
            Alert.alert("নতুন খানার ধরন","এই খানাটি আপনি কি ভাবে যোগ করতে চাচ্ছেন, তা অপশন থেকে যেকোন একটি নির্বাচন করুন।",[{text:"ঠিক আছে"}]);     
        }
        else if(creation_type.value==="2" && parseInt(check_member_with_code_7)<1){
         Alert.alert("নতুন খানার ধরন","উপরের এই অপশন ব্যবহারের জন্য, প্রথমে অন্য খানা থেকে সদস্যদেরকে স্থানান্তরিত করে (এই বাড়ির অন্য খানায় বসবাস করছেন) দিয়ে সদস্যের স্ট্যাটাস আপডেট করুন।",[{text:"ঠিক আছে"}]);     
         setCreation_type((creation_type)=>({...creation_type, radio_1:"no"}));
         setCreation_type((creation_type)=>({...creation_type, radio_2:"no"}));
         setCreation_type((creation_type)=>({...creation_type, value:""}));
        }
        else if(newKhanaName==""){
            Alert.alert("খানা প্রধানের নাম","নতুন খানার খানা প্রধানের নাম উল্লেখ করুন, যা পরবর্তীতে খানার নাম হিসাবে গণ্য হবে। ",[{text:"ঠিক আছে"}]);     
        }
        else{
            Alert.alert("নতুন খানা রেজিস্ট্রেশান", "আপনি কি নিশ্চিত খানার এই তথ্য গুল সঠিক? যদি সব তথ্য সঠিক থাকে এবং এই নতুন খানা যোগ করতে চান, তাহলে (সেভ নতুন খানা ক্লিক করুন।)",[{text:"তথ্য সঠিক নয়", onPress:()=>console.log("CANCELED")},{text:"সেভ নতুন খানা", onPress:()=>save_new_khana()}])
        }
        
    }







    const[check_member_with_code_7, SetCheck_member_with_code_7] = useState("");
    const split_HH_member_check=()=>{


        db.transaction(tx=>{
            tx.executeSql(
            "select * from member where Village_Code = '"+props.villageCode+"' and Bari_Code = '"+props.bari+"' and Mem_Cstatus = '2' and ReasonToMigrate = '7' and HH_Code !='"+newKhanaNo+"' ",
            [],
            (tx, result)=>{
                var length = result.rows.length;    

                if(length>0){
                    SetCheck_member_with_code_7(length.toString());
                  }
                  else{
                    SetCheck_member_with_code_7("0");
                    Alert.alert("কোন সদস্য নেই","উপরের এই অপশন ব্যবহারের জন্য, প্রথমে অন্য খানা থেকে সদস্যদেরকে স্থানান্তরিত করে (এই বাড়ির অন্য খানায় বসবাস করছেন) দিয়ে সদস্যের স্ট্যাটাস আপডেট করুন।",[{text:"ঠিক আছে"}]);     
                    setCreation_type((creation_type)=>({...creation_type, radio_1:"no"}));
                    setCreation_type((creation_type)=>({...creation_type, radio_2:"no"}));
                    setCreation_type((creation_type)=>({...creation_type, value:""}));
                  }

            },
            function(tx, error){
            console.log("add data error: "+ error.message);
            });
            });

    }


    const[newKhanaNo, setNewKhanaNo] = useState("");
    const new_khana_no=()=>{

                db.transaction(tx=>{
                    tx.executeSql(
                    "select max(cast(hh as INT))+1 'NexthhCode' from hh where village = '"+props.villageCode+"' and bari = '"+props.bari+"' ",
                    [],
                    (tx, result)=>{
                        var length = result.rows.length;    

                        if(length>0){

                          for(let i= 0; i<length; i++){                            
                            if(result.rows.item(i).NexthhCode===null){
                              setNewKhanaNo("001");   
                            }else{
                              setNewKhanaNo(((result.rows.item(i).NexthhCode).toString()).length===1 ? "00"+(result.rows.item(i).NexthhCode).toString() : ((result.rows.item(i).NexthhCode).toString()).length===2 ? "0"+(result.rows.item(i).NexthhCode).toString(): (result.rows.item(i).NexthhCode).toString());                                                         
                            }                                                        
                          }
                          }
                          else{
                            setNewBariNumber("001"); 
                          }
                    },
                    function(tx, error){
                    console.log("add data error: "+ error.message);
                    });
                    });
        
            }


    const save_new_khana=()=>{

      Keyboard.dismiss();

        db.transaction(tx=>{
            tx.executeSql(
            "insert OR IGNORE into hh (village, bari , hh, hh_name,hh_address, cStatus, createType, lat, lon, UserID) values("+
            "'"+props.villageCode+"', "+
            "'"+props.bari+"', "+
            "'"+newKhanaNo+"', "+
            "'"+newKhanaName+"', "+
            " '', "+
            "'1', "+
            "'"+creation_type.value+"', "+
            "'"+""+"', "+
            "'"+""+"', "+
            "'"+props.userID+"' "+")",
            [],
            (tx, result)=>{
              if(result.rowsAffected>0){          
                if(creation_type.value==="1"){
                    go_inside_khana();
                }
                else if(creation_type.value==="2"){
                    setMember_list_visible(true);

                    setCreation_type((creation_type)=>({...creation_type, disabled:true}));
                    setNewKhanaName_dis(false);
                }
                

              }else{
                Alert.alert("ডাটা সেভ হইনি", "দুঃখিত, আপনার দেয়া নতুন খানার তথ্য কোন কারনে সেভ হইনি। আবার চেষ্টা করুন।",[{text:"ঠিক আছে"}])
              }        
            },
            function(tx, error){
            console.log("add data error: "+ error.message);
            });
            });

    }



    useEffect(()=>{
        new_khana_no()
    },[creation_type]);



    const go_inside_khana=()=>{

        Navigation.push(props.componentId,{
            component:{
              name:"Inside_khana_page",
              passProps:{
                name:props.name,
                userID:props.userID,
                password:props.password,
                cluster:props.cluster,
                roundNo:props.roundNo,
                block:props.block,
                bari:props.bari,
                bariName:props.bariName,
                hh:newKhanaNo,
                hhName:newKhanaName,
                villageCode:props.villageCode,
                villageName:props.villageName,
                componentId:props.componentId
        
              },
        
              options:{
                topBar:{
                  visible:true,
                  title:{
                    text:"খানা ভিজিট"
                  },
                  rightButtons:[{
                    // id:"backbutton",
                    component:{
                      name:"BackButton",
                      passProps:{
                        originComponentId: props.componentId,
                        position:"Inside_khana_page",
                        backButtonText:"খানার লিস্ট",
                        name:props.name,
                        userID:props.userID,
                        password:props.password,
                        cluster:props.cluster,
                        roundNo:props.roundNo,
                        block:props.block,
                        bari:props.bari,
                        bariName:props.bariName,
                        hh:newKhanaNo,
                        hhName:newKhanaName,
                        villageCode:props.villageCode,
                        villageName:props.villageName,
        
                        
                      }
                    }
          
                    
                  }]
                  
                }
              }
        
        
            }
          })

    }


  return (
<View style={{width:"100%", flex:100, flexDirection:"column"}}>
      <View style={{width:"100%", alignItems:"center"}}>
      <View style={{marginTop:"1%",height:"auto", width:"98%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
              <Text style={{fontSize:20, fontWeight:"bold", color:"#be185d"}}>
                নতুন খানা রেজিস্ট্রেশান                
              </Text>
              
              <Text style={{fontSize:12, color:"#404040"}}>
              
                  বিঃদ্রঃ নতুন খানা রেজিস্ট্রেশানের ক্ষত্রে, প্রথমে সব তথ্য যাচাই করুন, তারপর নতুন খানা যোগ করুন। খানা যোগ করার পর, খানা ডিলিট দিতে পারবেননা। সে ক্ষেত্রে, আপনার সুপারভাইসারের সাথে যোগাযোগ করতে হবে।
              </Text>
            </View>




            <View style={{height:110, width:"98%", marginTop:"1%"}}>
            <QuestionContainer
            question={"এই খানাটি আপনি কি ভাবে যোগ করতে চাচ্ছেন? সম্পূর্ণ নতুন হিসাবে যোগ করতে চাচ্ছেন নাকি, অন্য খানা থেকে বিভক্ত হয়ে আসছে, এই ভাবে যোগ করতে চাচ্ছেন?"}
            radio_1={<View style={{width:"40%"}}><RadioButton disabled={creation_type.disabled} callFunction={creationType.bind(this,"1")} Value={creation_type.radio_1} title={"সম্পূর্ণ নতুন খানা"}/></View>}
            radio_2={<View style={{width:"40%"}}><RadioButton disabled={creation_type.disabled} callFunction={creationType.bind(this,"2")} Value={creation_type.radio_2} title={"অন্য খানা থেকে বিভক্ত হয়ে আসছে"}/></View>}
            direction={"row"}
            />
            </View>


            <View style={{height:100, width:"98%", marginTop:"1%"}}>
            <QuestionContainer
            question={"নতুন খানার নাম্বার, স্বয়ংক্রিয় ভাবে নিচের বক্সে আসবে।"}
            inputField_1={<View style={{width:"50%"}}><InputField value={newKhanaNo} maxLength={40} placeholder={"নতুন খানার নাম্বার"} readOnly={false} imgLeft={"newhome"}/></View>} 
            />
            </View>


            <View style={{height:100, width:"98%", marginTop:"1%"}}>
            <QuestionContainer
            question={"নতুন খানার, খানা প্রধানের নাম লিখুন। উল্লেখিত নামটি, পরবর্তীতে খানার নাম হিসাবে গণ্য হবে।"}
            inputField_1={<View style={{width:"50%"}}><InputField getValue={(text)=> setNewKhanaName(text)} value={newKhanaName} maxLength={40} readOnly={newKhanaName_dis} placeholder={"সদস্যের নাম"} imgLeft={"user"}/></View>} 
            />
            </View>



            {member_list_visible &&             
            <View style={{ maxHeight:600, width:"98%"}}>
                <View style={{marginTop:"1%",height:"auto", width:"100%", padding:10, backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, backgroundColor:"#FFF"}}>
            <Text style={{fontSize:12, color:"#404040"}}>              
              বিঃদ্রঃ ভিবক্ত হয়ে আসা নতুন খানা যোগ হয়েছে। নিচের লিস্ট থেকে, সদস্য নির্বাচন করে নতুন খানায় যোগ করুন।
          </Text>
          </View>


            <Inside_khana_member_list onManualBack_to_Survey_Question = {""} onDataReceived={""} migration={"Yes_fromHH"} cStatus={"2"} villageCode={props.villageCode} bari={props.bari} hh={newKhanaNo}/>            
            </View>  
            }

            <View style={{width:"30%", paddingBottom:40, marginTop:"5%"}}><CRUD_button callFunction={check_before_save} title={"সেভ নতুন খানা"} radious={20}/></View> 


            </View>

</View>
  )
}

export default New_hh_reg;
