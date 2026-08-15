import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

const DropDown = (props) => {
  return (
    <View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={props.data}
        //   search
          maxHeight={300}
          mode='modal'
          labelField={props.labelField}
          valueField={props.valueField}
          placeholder={props.placeholder}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          searchPlaceholder="Search..."
          value={props.value}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={props.onChange}  
          disable={props.disable}          
        />

    </View>
  )
}

const styles = StyleSheet.create({
    dropdown: {                        
        borderColor:"#9e9e9e", 
        width:"100%", 
        height:35, 
        color:"#1c1c1c",  
        borderBottomWidth:0.4, 
        fontSize:12
        
      },
      icon: {
        marginRight: 5,
        color:"#1c1c1c"
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
        color:"#1c1c1c"
      },
      placeholderStyle: {
        fontSize: 12,
        color:"blue"
      },
      selectedTextStyle: {
        fontSize: 12,
        color:"#1c1c1c"
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 12,
      }
})

export default DropDown;
