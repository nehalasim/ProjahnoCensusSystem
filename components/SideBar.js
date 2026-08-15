import React, { Component, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage'
import { Navigation } from 'react-native-navigation';
import Version from './Version';
import UserPassword from './UserPassword';
import Check_whatsApp from './Check_whatsApp';




const db = openDatabase(
    {
    name: 'prf.db',
    location: 'default',
    //createFromLocation:"/storage/emulated/0/103_prf.db"
  },
  ()=>{console.log("Database OK.....")},
  error=>{Alert.alert("Database ERROR!!!!!!")}
  );

    
    const SideBar = (props) => {

        // const [state, setState]=useState({
        //     name:"Asim",
        //     id:"150",
        //     cluster:"103"
        // })



        // console.log()


        


        const logout=()=>{


            if(props.screenPosition===true){
                Navigation.mergeOptions('SidebarComponentId', {
                    sideMenu: {
                      left: {
                        visible: false, // Close the menu
                      },
                    },
                  });
    
    
    
                Navigation.push(props.componentID,{
                    component:{
                      name:"Login",
                      options:{
                        topBar:{
                          visible:false
                        }
                      }
                    }
                  })
            }else{
                Alert.alert("দুঃখিত!!!","এই পেজ থেকে, সাইডবারের কোন অপশন ব্যাবহার করতে পারবেননা।",[{text:"ঠিক আছে", onPress:()=>{""}}])
            }

            

        }



        

        const[changePasswordContainer, setChangePasswordContainer] = useState(false);
        const changePassword=()=>{
if(props.screenPosition===true){
            setChangePasswordContainer(true);
        }else{
            Alert.alert("দুঃখিত!!!","এই পেজ থেকে, সাইডবারের কোন অপশন ব্যাবহার করতে পারবেননা।",[{text:"ঠিক আছে", onPress:()=>{""}}])
        }
            
        }
        const closePasswordContainer=()=>{
            setChangePasswordContainer(false);
            
        }

        const passwordChanged_closeapp=()=>{
            logout();
            setChangePasswordContainer(false);
        }



        const[whatsAppNumberContainer, setWhatsAppNumberContainer]=useState(false);
        const changeWhatsAppNo =()=>{
            if(props.screenPosition===true){
                setWhatsAppNumberContainer(true);
            }else{
                Alert.alert("দুঃখিত!!!","এই পেজ থেকে, সাইডবারের কোন অপশন ব্যাবহার করতে পারবেননা।",[{text:"ঠিক আছে", onPress:()=>{""}}])
            }
            
        }
        const close_WhatsApp=()=>{
            setWhatsAppNumberContainer(false);
        }



        const systemUpdate=()=>{
            if(props.screenPosition===true){
                // setWhatsAppNumberContainer(true);
            }else{
                Alert.alert("দুঃখিত!!!","এই পেজ থেকে, সাইডবারের কোন অপশন ব্যাবহার করতে পারবেননা।",[{text:"ঠিক আছে", onPress:()=>{""}}])
            }
        }


        // const logOut=()=>{
        //     if(props.screenPosition===true){
        //         // setWhatsAppNumberContainer(true);
        //     }else{
        //         Alert.alert("দুঃখিত!!!","এই পেজ থেকে, সাইডবারের কোন অপশন ব্যাবহার করতে পারবেননা।",[{text:"ঠিক আছে", onPress:()=>{""}}])
        //     }
        // }


        // console.log("sideBar: "+props.screenPosition);

      return (
        
            <View style={{backgroundColor:"#FFF", width:"55%", height:"100%"}}>

{whatsAppNumberContainer &&(
<Check_whatsApp close_WhatsApp={close_WhatsApp} userID= {props.userID}/>
)}
                    
                    {changePasswordContainer &&(
                    <UserPassword closePasswordContainer = {closePasswordContainer} passwordChanged_closeapp={passwordChanged_closeapp} userID = {props.userID}/>
                )}



                
                <View style={{flex:100, flexDirection:"column"}}>

                <View style={{alignItems:"center", justifyContent:"space-evenly",  backgroundColor:"#f50f72", flex:20, flexDirection:"column"}}>
                <Image source= {require("../img/logo.png")} style={{height:160, width:160}} />
                <Text style={{color:"#404040", fontSize:23, color:"#FFF", fontWeight:"bold", textShadowColor: '#9c9c9c', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 1}}>
                    প্রজন্ম সার্ভেলেন্স সিস্টেম
                    {/* {props.userID} */}
                    {props.screenPosition}
                </Text>
                <Text style={{color:"#fff"}}>
                <Version color={"#fff"}/>
                </Text>

                </View>



<View style={{flex:70}}>
    <View style={{justifyContent:"space-evenly", height:"30%", padding:30}}>
                
                <Pressable onPress={changePassword} style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                <Image source={require('../img/MenuIcon/password.png')} style={Styles.iconImg}/>
                <Text style={Styles.textFormat}>পাসওয়ার্ড পরিবর্তন</Text>
                </Pressable>

                <Pressable onPress={changeWhatsAppNo} style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                <Image source={require('../img/MenuIcon/whatsapp.png')} style={Styles.iconImg}resizeMode='contain'/>
                <Text style={Styles.textFormat}>সুপারভাইসার হোয়াটসঅ্যাপ</Text>
                </Pressable>

                <Pressable onPress={systemUpdate} style={{flexDirection:"row", justifyContent:"flex-start"}}>
                <Image source={require('../img/MenuIcon/update.png')} style={Styles.iconImg}/>
                <Text style={Styles.textFormat}>সিস্টেম আপডেট</Text>
                </Pressable>
                

                


                <Pressable onPress={logout} style={{flexDirection:"row", justifyContent:"flex-start"}}>
                <Image source={require('../img/MenuIcon/logout.png')} style={Styles.iconImg}/>
                <Text style={Styles.textFormat}>লগআউট</Text>
                </Pressable>
                
                
                
                
                </View>

                </View>

                </View>

            </View>
            



      )
    }
    
    export default SideBar;
    

// class SideBar extends Component {



//   render() {
//     return (

//     )
//   }
// }


const Styles = StyleSheet.create({
    textFormat:{
color:"#5e5d5d",
fontWeight:"bold",
fontSize:14,
paddingLeft:8
    },
    iconImg:{
        height:25, 
        width:25
    }

})


// export default SideBar;