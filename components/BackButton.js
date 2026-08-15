import React, { Component } from 'react'
import { View, Image, Text, Alert, TouchableHighlight, Touchable, Pressable } from 'react-native';
import { Navigation } from 'react-native-navigation';






class BackButton extends Component {




  CallFunction=()=>{

        if(this.props.position==="Home"){
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"Login",
              options:{
                topBar:{
                  visible:false
                }
              }
            }
          })
        }
        else if(this.props.position==="Block_list_page" || this.props.position==="Pregnancy_list"){  
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"Home",
              passProps:{
                userID:this.props.userID,
                password:this.props.password, 
                name:this.props.name,
                cluster:this.props.cluster
              },
              options:{
                
                topBar:{
                  visible:true,
                  title:{
                    text:""
                  },
                  rightButtons:[{
                    component:{
                      name:"BackButton",
                      passProps:{
                        originComponentId: this.props.originComponentId,
                        position:"Home",
                        backButtonText:"লগ আউট"

                      }
                    }
          
                    
                  }]
                  

                }
              }
            }
          })
        }
        else if(this.props.position==="MWRA_profile_byPass"){
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"Pregnancy_list",
              passProps:{
                userID:this.props.userID,
                password:this.props.password, 
                name:this.props.name,
                cluster:this.props.cluster
              },
              options:{
                
                topBar:{
                  visible:true,
                  title:{
                    text:""
                  },
                  rightButtons:[{
                    component:{
                      name:"BackButton",
                      passProps:{
                        originComponentId: this.props.originComponentId,
                        position:"Pregnancy_list",
                        backButtonText:"ড্যাশবোর্ড",
                        userID:this.props.userID,
                        password:this.props.password, 
                        name:this.props.name,
                        cluster:this.props.cluster

                      }
                    }
          
                    
                  }]
                  

                }
              }
            }
          })
        }
        else if(this.props.position==="Bari_list_page"){  
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"Block_list_page",
              passProps:{
                userID:this.props.userID,
                password:this.props.password, 
                name:this.props.name,
                cluster:this.props.cluster,
                roundNo:this.props.roundNo
              },
              options:{
                
                topBar:{
                  visible:true,
                  title:{
                    text:"ব্লক লিস্ট"
                  },
                  rightButtons:[{
                    component:{
                      name:"BackButton",
                      passProps:{
                        originComponentId: this.props.originComponentId,
                        position:"Block_list_page",
                        backButtonText:"ড্যাশবোর্ড",
                        userID:this.props.userID,
                        password:this.props.password, 
                        name:this.props.name,
                        cluster:this.props.cluster
                        

                      }
                    }
          
                    
                  }]
                  

                }
              }
            }
          })



        }


        else if(this.props.position==="Khana_list_page" || this.props.position==="new_bari_registration"){  
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"Bari_list_page",
              passProps:{
                userID:this.props.userID,                
                name:this.props.name,
                password:this.props.password,
                cluster:this.props.cluster,
                block:this.props.block,
                roundNo:this.props.roundNo
              },
              options:{
                
                topBar:{
                  visible:true,
                  title:{
                    text:"বাড়ি লিস্ট"
                  },
                  rightButtons:[{
                    component:{
                      name:"BackButton",
                      passProps:{
                        originComponentId: this.props.originComponentId,
                        position:"Bari_list_page",
                        backButtonText:"ব্লক লিস্ট",
                        userID:this.props.userID,
                        password:this.props.password, 
                        name:this.props.name,
                        cluster:this.props.cluster,
                        roundNo:this.props.roundNo
                        

                      }
                    }
          
                    
                  }]
                  

                }
              }
            }
          })



        }



        else if(this.props.position==="Inside_khana_page" || this.props.position==="new_hh_registration"){  
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"Khana_list_page",
              passProps:{
                userID:this.props.userID,                
                name:this.props.name,
                password:this.props.password,
                cluster:this.props.cluster,
                block:this.props.block,
                bari:this.props.bari,
                villageCode:this.props.villageCode,
                roundNo:this.props.roundNo,
                bariName:this.props.bariName,
                villageName:this.props.villageName
              },
              options:{
                
                topBar:{
                  visible:true,
                  title:{
                    text:"খানা লিস্ট"
                  },
                  rightButtons:[{
                    component:{
                      name:"BackButton",
                      passProps:{
                        originComponentId: this.props.originComponentId,
                        position:"Khana_list_page",
                        backButtonText:"বাড়ি লিস্ট",
                        userID:this.props.userID,
                        password:this.props.password, 
                        name:this.props.name,
                        cluster:this.props.cluster,
                        block:this.props.block,
                        roundNo:this.props.roundNo
                        

                      }
                    }
          
                    
                  }]
                  

                }
              }
            }
          })



        }
        else if(this.props.position==="Add_member"){  
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"Inside_khana_page",
              passProps:{
                userID:this.props.userID,                
                name:this.props.name,
                password:this.props.password,
                cluster:this.props.cluster,
                block:this.props.block,
                roundNo:this.props.roundNo,
                villageCode:this.props.villageCode,
                villageName:this.props.villageName,
                bari:this.props.bari,
                bariName:this.props.bariName,
                hh:this.props.hh,
                hhName:this.props.hhName,
                MemberAddTracker:"0"

                
              },
              options:{
                
                topBar:{
                  visible:true,
                  title:{
                    text:"খানা ভিজিট"
                  },
                  rightButtons:[{
                    component:{
                      name:"BackButton",
                      passProps:{
                        originComponentId: this.props.originComponentId,
                        position:"Inside_khana_page",
                        backButtonText:"খানা লিস্ট",
                        userID:this.props.userID,
                        password:this.props.password, 
                        name:this.props.name,
                        cluster:this.props.cluster,
                        roundNo:this.props.roundNo,
                        block:this.props.block,
                        villageCode:this.props.villageCode,
                        villageName:this.props.villageName,
                        bari:this.props.bari,
                        bariName:this.props.bariName,
                        hh:this.props.hh,
                        hhName:this.props.hhName
                        

                      }
                    }
          
                    
                  }]
                  

                }
              }
            }
          })



        }




        else if(this.props.position==="MWRA_Survey_for_survey_visit"){  
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"MWRA_list_page",
              passProps:{
                name:this.props.name,
                userID:this.props.userID,
                password:this.props.password,
                cluster:this.props.cluster,
                roundNo:this.props.roundNo,
                block:this.props.block,
                villageCode:this.props.villageCode,
                villageName:this.props.villageName,
                bari:this.props.bari, 
                bariName:this.props.bariName,
                hh:this.props.hh,
                hhName:this.props.hhName,
                componentId:this.props.componentId,
                MemberAddTracker:this.props.MemberAddTracker,//13
                MemberUpdateTracker:this.props.MemberUpdateTracker,//14                  
                mwraVisit:this.props.mwraVisit,
                selected_Mem_SL:this.props.selected_Mem_SL//16

                
              },
              options:{
                
                topBar:{
                  visible:true,
                  title:{
                    text:"MWRA লিস্ট"
                  },
                  rightButtons:[]
                  

                }
              }
            }
          })



        }


        else if(this.props.position==="MWRA_Survey_for_profile_check"){  
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"Inside_khana_page",
              passProps:{
                name:this.props.name,
                userID:this.props.userID,
                password:this.props.password,
                cluster:this.props.cluster,
                roundNo:this.props.roundNo,
                block:this.props.block,
                villageCode:this.props.villageCode,
                villageName:this.props.villageName,
                bari:this.props.bari, 
                bariName:this.props.bariName,
                hh:this.props.hh,
                hhName:this.props.hhName,
                componentId:this.props.componentId,
                MemberAddTracker:this.props.MemberAddTracker,//13
                MemberUpdateTracker:this.props.MemberUpdateTracker,//14                  
                mwraVisit:this.props.mwraVisit,
                selected_Mem_SL:this.props.selected_Mem_SL//16

                
              },
              options:{
                
                topBar:{
                  visible:true,
                  title:{
                    text:"খানা ভিজিট"
                  },
                  
                  rightButtons:[{
                    component:{
                      name:"BackButton",
                      passProps:{
                        originComponentId: this.props.originComponentId,
                        position:"Inside_khana_page",
                        backButtonText:"খানা লিস্ট",
                        userID:this.props.userID,
                        password:this.props.password, 
                        name:this.props.name,
                        cluster:this.props.cluster,
                        roundNo:this.props.roundNo,
                        block:this.props.block,
                        villageCode:this.props.villageCode,
                        villageName:this.props.villageName,
                        bari:this.props.bari,
                        bariName:this.props.bariName,
                        hh:this.props.hh,
                        hhName:this.props.hhName
                        

                      }
                    }
          
                    
                  }]
                  

                }
              }
            }
          })



        }


        
        else if(this.props.position==="MWRA_Survey_question" && this.props.byPass===true){  
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"MWRA_Survey",
              passProps:{
                name:this.props.name,
                userID:this.props.userID,
                password:this.props.password,
                cluster:this.props.cluster,
                roundNo:this.props.roundNo,
                block:this.props.block,
                villageCode:this.props.villageCode,
                villageName:this.props.villageName,
                bari:this.props.bari, 
                bariName:this.props.bariName,
                hh:this.props.hh,
                hhName:this.props.hhName,
                componentId:this.props.componentId,
                MemberAddTracker:this.props.MemberAddTracker,//13
                MemberUpdateTracker:this.props.MemberUpdateTracker,//14                  
                mwraVisit:this.props.mwraVisit,
                selected_Mem_SL:this.props.selected_Mem_SL,//16
                selected_Mem_PID:this.props.selected_Mem_PID,
                byPass:this.props.byPass
                

                
              },
              options:{
                
                topBar:{
                  visible:true,
                  title:{
                    text:"MWRA প্রোফাইল"
                  },
                  rightButtons:[{
                    // id:"backbutton",
                    component:{
                      name:"BackButton",
                      passProps:{                  
                        originComponentId: this.props.originComponentId,
                        // position:"MWRA_Survey_for_survey_visit",
                        // backButtonText:"MWRA লিস্ট",                  
                        position: "MWRA_profile_byPass",
                        backButtonText:"বর্তমানে গর্ভবতীদের লিস্ট",
                        name:this.props.name,
                        userID:this.props.userID,
                        password:this.props.password,
                        cluster:this.props.cluster,
                        roundNo:this.props.roundNo,
                        block:this.props.block,
                        villageCode:this.props.villageCode,
                        villageName:this.props.villageName,
                        bari:this.props.bari, 
                        bariName:this.props.bariName,
                        hh:this.props.hh,
                        hhName:this.props.hhName,
                        componentId:this.props.componentId,
                        MemberAddTracker:this.props.MemberAddTracker,//13
                        MemberUpdateTracker:this.props.MemberUpdateTracker,//14                  
                        mwraVisit:this.props.mwraVisit,
                        selected_Mem_SL:this.props.selected_Mem_SL,//16
                        byPass:this.props.byPass
        
                        
                      }
                    }
          
                    
                  }]
                  

                }
              }
            }
          })



        }

        else if(this.props.position==="MWRA_Survey_question"){  
          Navigation.push(this.props.originComponentId,{
            component:{
              name:"MWRA_Survey",
              passProps:{
                name:this.props.name,
                userID:this.props.userID,
                password:this.props.password,
                cluster:this.props.cluster,
                roundNo:this.props.roundNo,
                block:this.props.block,
                villageCode:this.props.villageCode,
                villageName:this.props.villageName,
                bari:this.props.bari, 
                bariName:this.props.bariName,
                hh:this.props.hh,
                hhName:this.props.hhName,
                componentId:this.props.componentId,
                MemberAddTracker:this.props.MemberAddTracker,//13
                MemberUpdateTracker:this.props.MemberUpdateTracker,//14                  
                mwraVisit:this.props.mwraVisit,
                selected_Mem_SL:this.props.selected_Mem_SL,//16
                selected_Mem_PID:this.props.selected_Mem_PID,
                

                
              },
              options:{
                
                topBar:{
                  visible:true,
                  title:{
                    text:"MWRA প্রোফাইল"
                  },
                  rightButtons:[{
                    // id:"backbutton",
                    component:{
                      name:"BackButton",
                      passProps:{                  
                        originComponentId: this.props.originComponentId,
                        position:"MWRA_Survey_for_survey_visit",
                        backButtonText:"MWRA লিস্ট",                  
                        name:this.props.name,
                        userID:this.props.userID,
                        password:this.props.password,
                        cluster:this.props.cluster,
                        roundNo:this.props.roundNo,
                        block:this.props.block,
                        villageCode:this.props.villageCode,
                        villageName:this.props.villageName,
                        bari:this.props.bari, 
                        bariName:this.props.bariName,
                        hh:this.props.hh,
                        hhName:this.props.hhName,
                        componentId:this.props.componentId,
                        MemberAddTracker:this.props.MemberAddTracker,//13
                        MemberUpdateTracker:this.props.MemberUpdateTracker,//14                  
                        mwraVisit:this.props.mwraVisit,
                        selected_Mem_SL:this.props.selected_Mem_SL//16
        
                        
                      }
                    }
          
                    
                  }]
                  

                }
              }
            }
          })



        }
  

}


  render() {
    return (

      <Pressable onPress={this.CallFunction}>
        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
          
          
            <View style={{justifyContent:"center"}}>
            <Text style={{fontSize:18, color:"black"}}>{this.props.backButtonText}</Text>
            </View>

            <Image source={require('../img/back.png')} style={{height:35, width:35}}/>
          
        </View>
        </Pressable>

    )
  }
}

export default BackButton;