import { Navigation } from "react-native-navigation";
import App from "./App";
import Home from "./Home";
import BackButton from "./components/BackButton";
import SideBar from "./components/SideBar";
import Block_list_page from "./MainComponent/Block_list_page";
import Bari_list_page from "./MainComponent/Bari_list_page";
import Khana_list_page from "./MainComponent/Khana_list_page";
import Inside_khana_page from "./MainComponent/Inside_khana_page";
import Add_member from "./MainComponent/Add_member";
import Member_update from "./MainComponent/Member_update";
import MWRA_list_page from "./MainComponent/MWRA_list_page";
import MWRA_Survey from "./MainComponent/MWRA_Survey";
import MWRA_Survey_question from "./MainComponent/MWRA_Survey_question";
import Mother_outcome_form from "./MainComponent/Mother_outcome_form";
import Child_outcome_form from "./MainComponent/Child_outcome_form";
import New_bari_reg from "./MainComponent/New_bari_reg";
import New_hh_reg from "./MainComponent/New_hh_reg";
import Pregnancy_list from "./MainComponent/Pregnancy_list";
import Welcome from "./Welcome";
import AdminPanel from "./MainComponent/AdminPanel";

// import Database from "./Database"


Navigation.setDefaultOptions({
    statusBar:{
      backgroundColor:"#f0f0f0"
    },
    topBar:{
      height: 55,
      elevation: 0,
      background:{
        color:"#f0f0f0"
      }
    }
  })

Navigation.registerComponent("Welcome", ()=>Welcome)  
Navigation.registerComponent("Login", ()=>App)
Navigation.registerComponent("Home",()=>Home)
Navigation.registerComponent("BackButton",()=>BackButton)
Navigation.registerComponent("SideBar",()=>SideBar)
Navigation.registerComponent("Block_list_page",()=>Block_list_page)
Navigation.registerComponent("Bari_list_page",()=>Bari_list_page)
Navigation.registerComponent("Khana_list_page",()=>Khana_list_page)
Navigation.registerComponent("Inside_khana_page",()=>Inside_khana_page)
Navigation.registerComponent("Add_member",()=>Add_member)
Navigation.registerComponent("Member_update",()=>Member_update)
Navigation.registerComponent("MWRA_list_page",()=>MWRA_list_page)
Navigation.registerComponent("MWRA_Survey",()=>MWRA_Survey)
Navigation.registerComponent("MWRA_Survey_question",()=>MWRA_Survey_question)
Navigation.registerComponent("Mother_outcome_form",()=>Mother_outcome_form)
Navigation.registerComponent("Child_outcome_form",()=>Child_outcome_form)
Navigation.registerComponent("New_bari_reg",()=>New_bari_reg)
Navigation.registerComponent("New_hh_reg",()=>New_hh_reg)
Navigation.registerComponent("Pregnancy_list",()=>Pregnancy_list)
Navigation.registerComponent("AdminPanel",()=>AdminPanel)


// const stack = {





// }




Navigation.events().registerAppLaunchedListener(()=>{
    Navigation.setRoot({
        root:{
            sideMenu:{
                left:{                    
                    component:{
                        id:"SidebarComponentId",
                        name:"SideBar",
                        passProps:{ 
                            // name:""                            
                        }

                    }
        
                },
                center:{

                    
                    stack:{
                        options:{
                            topBar:{
                                leftButtons:{
                                    id:"menubutton",
                                    icon:require('./img/menu.png')
                                },
                                rightButtons:{
                                    id:"backbutton",
                                    // icon:require('./img/back.png'),                                                                                                                                                              
                                }
                    
                            }
                        },
                        children:[
                            {
                                
                                component:{
                                    name:"Welcome",
                                    options:{
                                        topBar:{                        
                                            visible:false
                                        }
                                    }                
                                }
                    
                            }
                        ]
                    }


                    
                    
                }
            }
        }
    })
})