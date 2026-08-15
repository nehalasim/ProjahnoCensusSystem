import React, { useState } from 'react'
import { TouchableOpacity, Text,Image } from 'react-native'

const RadioButton = (props) => {

  
  var source = <Image source={require('../img/no.png')} style={{height:20, width:20, opacity:0.5}}/>;
  if(props.Value==="yes"){
    source = <Image source={require('../img/yes.png')} style={{height:20, width:20}}/>;
  }
  else{
    source = <Image source={require('../img/no.png')} style={{height:20, width:20, opacity:0.5}}/>;
  }
  
  
  // var rightImageSource = "";
  // if(props.rightImage==="male"){
  //   rightImageSource = <Image source={require('../img/man.png')} style={{height:20, width:20, alignSelf:"flex-end"}}/>;
  // }
  // else if(props.rightImage==="female"){
  //   rightImageSource = <Image source={require('../img/woman.png')} style={{height:20, width:20}}/>;
  // }
  // else{
  //   rightImageSource="";
  // }



  return (
    
    <TouchableOpacity disabled={props.disabled} onPress={props.callFunction} style={{ padding:5, width:"100%", backgroundColor:"#3b82f6", borderRadius:20, height:30, alignItems:"center", justifyContent:"flex-start", flexDirection:"row",}}>                    
                  {source}
                  <Text style={{fontWeight:"bold", color:"#fff", marginLeft:5, fontSize:12}}>{props.title}</Text>
                  {/* {rightImageSource} */}
    </TouchableOpacity>
  )
}

export default RadioButton
