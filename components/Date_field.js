import React, { Component } from 'react'
import { View, TextInput, Keyboard} from 'react-native';

const Date_field = (props) => {
  return (
<View style={{marginTop:-4}}>
            
            <TextInput 
            value={props.value}            
            inlineImageLeft={"calendar"} 
            inlineImagePadding={10}             
            placeholder={props.ph} 
            placeholderTextColor={"blue"} 
            style={{borderColor:"#9e9e9e", width:"100%", height:35, color:"#1c1c1c",  borderBottomWidth:0.4, fontSize:12, fontWeight:"bold"}}             
            editable={false}
            />

        </View>
  )
}

export default Date_field
