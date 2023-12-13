import React, { useContext } from "react";
import { TouchableOpacity, Image, Text, View, ScrollView } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../components/colors/GColors";

import { AuthContext } from "../store/auth-context";

export const CustomDrawer = (props) => {
  const AuthCtx=useContext(AuthContext)
  const isAuthenticated=AuthCtx.isAuthenticated
  function logoutHandler(){
    AuthCtx.logout()
    return 
  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor: "#BC1342" }}>
      <View style={{flex:0.17}}>
        <LinearGradient
          style={{flex:1, backgroundColor: "#ccc454", width: "100%" }}
          colors={["#BC1342", "#571262"]}
        >
          <TouchableOpacity
            style={{ marginStart: 15, width: 25 }}
            onPress={() => props.navigation.closeDrawer()}
          >
            <Image source={require("../assets/drawables/back.png")} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 15,
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image source={require("../assets/drawables/profileImg.png")} />
              <View style={{ marginStart: 10 }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 17,
                    fontWeight: "500",
                  }}
                >
                  Manpreet Kumar
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 17,
                    fontWeight: "400",
                  }}
                >
                  Player
                </Text>
              </View>
            </View>
            {isAuthenticated&&<TouchableOpacity  onPress={() => props.navigation.navigate('EditScreen')}>
              <Image source={require("../assets/drawables/editProfile.png")} />
            </TouchableOpacity>}
          </View>
        </LinearGradient>
      </View>
      <ScrollView style={{flex:0.83,backgroundColor:Colors.white,padding:10}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:5,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/home.png')}/>
          <Text style={{}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/facilities.png')}/>
          <Text style={{}}>Facilities</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/playerList.png')}/>
          <Text style={{}}>Player List</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/lock.png')}/>
          <Text style={{}}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/certificate.png')}/>
          <Text style={{}}>Generate Certificate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/lang.png')}/>
          <Text style={{}}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/about.png')}/>
          <Text style={{}}>About Khel Sathi</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/privacy.png')}/>
          <Text style={{}}>Privacy & Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/feedback.png')}/>
          <Text style={{}}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/settings.png')}/>
          <Text style={{}}>Setting</Text>
        </TouchableOpacity>
        {isAuthenticated&&<TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/delete.png')}/>
          <Text style={{}}>Delete Account</Text>
        </TouchableOpacity>}
        {isAuthenticated&&<TouchableOpacity onPress={ logoutHandler} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/logout.png')}/>
          <Text style={{}}>Logout</Text>
        </TouchableOpacity>}
      {!isAuthenticated&& <TouchableOpacity onPress={() => props.navigation.navigate('EditScreen')} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <Image style={{marginEnd:7,marginBottom:9}} source={require('../assets/drawables/login.png')}/>
          <Text style={{}}>Login</Text>
        </TouchableOpacity>}
        

      </ScrollView>
    
    </SafeAreaView>
  );
};