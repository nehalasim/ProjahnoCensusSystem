import React from 'react'
import{View, Text, Image, TouchableOpacity} from 'react-native'
const Headder = (props) => {
  return (
    // #f0f0f0
<View style={{alignItems:"center", height:55, width:"100%", backgroundColor:"#f0f0f0", flexDirection:"row", justifyContent:"space-between"}}>

<View style={{paddingLeft:10, alignItems:"center"}}>
<Text style={{fontSize:18, color:"black"}}>
{props.pageName}
</Text>
</View>


{/* onPress={props.function} */}
<TouchableOpacity onPress={props.function}>
<View style={{padding:10, height:"100%", flexDirection:"row", alignItems:"center"}}>

<Text style={{fontSize:18, color:"black"}}>
{props.backPage}
</Text>

<Image source={require('../img/back.png')} style={{height:35, width:35}}/>

</View>
</TouchableOpacity>

</View>
  )
}

export default Headder
