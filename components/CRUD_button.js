import React from 'react'
import { Pressable, Text } from 'react-native'

const CRUD_button = (props) => {

  var radious =props.radious;

  return (
    
        <Pressable onPress={props.callFunction} style={{width:"100%", backgroundColor:"#f50f72", alignItems:"center", justifyContent:"center", height:40, borderRadius:radious, elevation:2}}>
        <Text style={{color:"#fff", fontWeight:"bold", fontSize:12}}>{props.title}</Text>
       </Pressable>
  )
}

export default CRUD_button;

