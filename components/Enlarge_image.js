import React, { Component, useEffect, useState } from 'react'
import {View, Text, TextInput, Button, Pressable, Image, Alert, Keyboard, TouchableOpacity, Modal } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { openDatabase } from 'react-native-sqlite-storage'
import { request, PERMISSIONS, requestMultiple } from 'react-native-permissions'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Image as ImageCompressor } from 'react-native-compressor'
import CRUD_button from './CRUD_button'
import QuestionContainer from './QuestionContainer'
import RadioButton from './RadioButton'

var RNFS = require('react-native-fs');


const Enlarge_image = (props) => {

    const closeEnlarge=()=>{
        props.closeEnlarge(false)
    }


  return (
    
<Modal visible={true} transparent={true} animationType="fade">
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.8)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center", zIndex: 1999}}>
        <View style={{borderRadius:10, backgroundColor:"#f0f0f0", padding:10, alignItems:"center"}}>
            

            
  <Image source={{uri: props.imagePath}} style={{height:800, width:740, resizeMode:"contain"}}/>            
            

<TouchableOpacity onPress={closeEnlarge}>
<View style={{alignItems:"center", marginTop:20, paddingBottom:20}}>
    <Text style={{color:"#4b61b8"}}>
        ফটো বক্স বন্ধ করুন        
    </Text>
    
</View>
</TouchableOpacity>

        </View>
        </View>
</Modal>

  )
}

export default Enlarge_image;
