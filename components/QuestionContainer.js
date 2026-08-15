import React from 'react'
import { View, Text, Alert } from 'react-native'

const QuestionContainer = (props) => {

    var questionDirection=props.direction;
    var main_question = props.question;
    var question = "";
    if(main_question!=""){
      question = <View style={{width:"100%",flexGrow:1}}><Text style={{color:"#404040", fontSize:12}}>{props.question}</Text></View>;
    }
    else{
      question = "";
    }



  return (
    
    
    <View style={{height:"100%", width:"100%", backgroundColor:"#fff", padding:10, borderRadius:10, elevation:1, flexDirection:"column", flex:100}}>
            {question}

              <View style={{flexGrow:10, width:"100%", flexDirection:questionDirection, justifyContent:"space-around", padding:10}}>


                  {props.radio_1}
                  {props.radio_2}
                  {props.radio_3}
                  {props.radio_4}
                  {props.radio_5}
                  {props.radio_6}
                  {props.radio_7}
                  {props.radio_8}
                  {props.radio_9}
                  {props.inputField_1}
                  {props.inputField_2}
                  {props.inputField_3}
                  {props.dropDown_1}
                  {props.dropDown_2}
                  {props.dropDown_3}
                  {props.sideButton}

                  
                  
              </View>
    </View>
  )
}

export default QuestionContainer
