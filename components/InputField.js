import React, { Component } from 'react'
import { View, TextInput, Keyboard} from 'react-native';

class InputField extends Component {
  render() {
    return (
        <View style={{marginTop:-4}}>
            
            <TextInput 
            // onChangeText={(t)=>{this.setState({var:t})}} 
            onChangeText={this.props.getValue}
            value={this.props.value}
            inputMode={this.props.inputMode} 
            inlineImageLeft={this.props.imgLeft} 
            inlineImagePadding={10} 
            secureTextEntry={this.props.secureText} 
            placeholder={this.props.placeholder} 
            placeholderTextColor={"blue"} 
            style={{borderColor:"#9e9e9e", width:"100%", height:37, fontWeight:"bold", color:"#1c1c1c",  borderBottomWidth:0.4, fontSize:12}}
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect={false}            
            keyboardType={this.props.keyboardType}
            editable={this.props.readOnly}
            maxLength={this.props.maxLength}
            ref={this.props.ref}
            onFocus = {this.props.onFocus}
            onBlur={this.props.onBlur}
            contextMenuHidden={true}



            
            





            />

        </View>
     )
  }
}

export default InputField;