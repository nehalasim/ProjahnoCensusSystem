import React from 'react'
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity} from 'react-native';


const CustomAlert = (props) => {

  if(props.theme==="alert"){
    var bgColor="#de95a5";
    var okButton = "ঠিক আছে";
    var cancelButton = "";
    var image = require('../img/warning.png');
    
  }
  else if(props.theme==="confirm"){
    var bgColor="#8cad8e";
    var okButton = "ঠিক আছে";
    var cancelButton = "সঠিক নয়";
    var image = require('../img/correct.png');
    var MsgColor = "#214a24"
    
  }


  return (
    
      <Modal visible={props.visible} transparent={true} animationType="slide" statusBarTranslucent={true}>
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)', height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
        <View style={{backgroundColor:bgColor, flexDirection:"row", justifyContent:"space-around", minHeight:"10%", width:"80%", justifyContent:"center", alignItems:"center", elevation:5}}>

          <Image style={{height:50, width:50}} source={image}/>


        <View style={{flexDirection:"column", justifyContent:"space-between", padding:5, height:"100%", width:"85%",  minHeight:100, padding:10}}>
          
          <View style={{width:"100%"}}>
          <Text style={{color:MsgColor, fontSize:20, fontWeight:"bold"}}>{props.title}</Text>
          </View>

          <View style={{width:"100%"}}>
          <Text style={{color:MsgColor}}>{props.message}</Text>
          </View>
          
         
         
         
         
          <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
          
          <TouchableOpacity onPress={props.close}> 
          <Text style={{color:"#39423a", textAlign:"right", fontWeight:"bold", marginRight:40}}>{cancelButton}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={props.onConfirm}> 
          <Text style={{color:"#39423a", textAlign:"right", fontWeight:"bold"}}>{okButton}</Text>
          </TouchableOpacity> 

          </View>
          
          
         

        </View>
      </View>

        </View>
      
      </Modal>
    
  )
  
}


export default CustomAlert
