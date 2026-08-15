import React, { useRef, Component, useEffect, useState } from 'react';
import {ImageBackground, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, View, Text, TextInput, Button, Pressable, Image, Alert, Keyboard, TouchableOpacity } from 'react-native';
import InputField from './components/InputField';
import { Navigation } from 'react-native-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import { request, PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import CRUD_button from './components/CRUD_button';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Image as ImageCompressor } from 'react-native-compressor';
import moment from 'moment';


// import Orientation from 'react-native-orientation-locker';





const Welcome = (props) => {







  // useEffect(() => {
  //   // Lock the entire app to portrait
  //   Orientation.lockToPortrait();

  //   // Optionally unlock all orientations when the component is unmounted
  //   // return () => {
  //   //   Orientation.unlockAllOrientations();
  //   // };
  // }, []);
  

    const fadeAnim1 = useRef(new Animated.Value(0)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;
    const fadeAnim3 = useRef(new Animated.Value(0)).current;
    const fadeAnim4 = useRef(new Animated.Value(0)).current;
  
    const startFadeInSequence = () => {
      Animated.sequence([
        Animated.timing(fadeAnim1, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim3, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim4, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
      ]).start();
    };
  
    useEffect(() => {
      startFadeInSequence();
    }, []);
  


    const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(moment().format('LTS'));
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup on unmount
      }, []);
    




      const go_to_login_page=()=>{
        Navigation.push(props.componentId,{
            component:{
              name:"Login",
              options:{
                topBar:{
                  visible:false,
                  title:{
                    text:""
                  },
                  rightButtons:[]
                  
                }
              }
  
  
            }
          })
      }



  return (
    <ImageBackground resizeMode="cover" position="left"  source={require("./img/welcomeScreen.jpg")} style={{justifyContent:"center", height:"100%", backgroundColor:"#f0f0f0"}}>
    <View style={{ height:"70%", alignItems:"center", justifyContent:"space-evenly", flexDirection:"column"}}>



    <Animated.View style={{ opacity: fadeAnim1 }}>
      <View style={{alignItems:"center", justifyContent:"center"}}>
        <Image source= {require("./img/logo.png")} style={{height:250, width:250}} />
        {/* <Button title="export" onPress={onShare}/> */}
      </View>
      </Animated.View>

      

      <Animated.View style={{ opacity: fadeAnim2 }}>
      <View style={{width:"65%",  alignItems:"center"}}>
        <Text style={{color:"#404040", fontSize:30, color:"#FFF", fontWeight:"bold", textShadowColor: '#7a7a7a', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 1}}>
        প্রজন্ম সার্ভেলেন্স সিস্টেম
        </Text>
      </View>
      </Animated.View>



      <Animated.View style={{ opacity: fadeAnim3}}>
      <View style={{width:"80%",  alignItems:"center"}}>
      <Text style={{textAlign:"center", color:"#404040", fontSize:30, color:"#FFF", fontWeight:"bold", textShadowColor: '#7a7a7a', textShadowOffset: { width: 2, height: 2}, textShadowRadius: 1}}>
          এখন সময় <Text style={{fontSize:40, color:"#f50f72"}}>{currentTime}</Text> এবং আজকের তারিখ <Text style={{fontSize:40, color:"#f50f72"}}>{moment().format("MMM DD, YYYY")}</Text>
        </Text>
      </View>
      </Animated.View>


      


      
      <View style={{width:"50%"}}>
      <Animated.View style={{ opacity: fadeAnim4}}>
      <CRUD_button callFunction={go_to_login_page} title={"সময় এবং তারিখ সঠিক আছে"} radious={30}/>
      </Animated.View>
      </View>

      <Animated.View style={{ opacity: fadeAnim4}}>
      <View style={{width:"80%",  alignItems:"center", backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius:7, padding:10}}>
      <Text style={{textAlign:"center", color:"#404040", fontSize:12, color:"#FFF", fontWeight:"bold"}}>
         বিঃদ্রঃ তারিখ বা সময় যদি ভুল থাকে, অ্যাপটি সম্পূর্ণরূপে বন্ধ করুন। তারপর ট্যাবএর সেটিংএ গিয়ে, সময় এবং তারিখ ঠিক করুন। সময় বা তারিখ ঠিক না করে কোনভাবে ডাটা এন্ট্রি করা যাবেনা। আর যদি ভুল তারিখে/ সময়ে ডাটা এন্ট্রি করেন, আপনার ব্লক/MWRA সার্ভে এবং খানা সার্ভে ভিজিটের সময়সূচী সম্পূর্ণ পরিবর্তন হয়ে যাবে।
        </Text>
      </View>
      </Animated.View>




      </View>
      </ImageBackground>
  )
}

export default Welcome
