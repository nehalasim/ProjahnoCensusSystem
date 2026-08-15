import React from 'react'
import { View, Text } from 'react-native'

const Version = (props) => {
    var color = props.color;
   
  return (
    <View>
        <Text style={{fontSize:12, color:color}}>
        ভার্সন 1.0.RN
        </Text>
    </View>
  )
}

export default Version
