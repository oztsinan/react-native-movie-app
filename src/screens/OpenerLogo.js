import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View,StyleSheet,Text,ImageBackground,Image } from "react-native";
import Logo from '../assets/img/openLogo.png'

const OpenerLogo = () =>{
    const navigation = useNavigation()
    

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Tabs')
        },2000)
    },[])
    

  return(
    <View style={style.main}>
        <ImageBackground  style={style.imageBackground} source={require('../assets/img/logoBg.png')} resizeMode="cover" >
        <Image source={require('../assets/img/openLogo.png')} resizeMode="contain" style={style.image} />
        </ImageBackground>

    </View>
  )
}

const style = StyleSheet.create({
  main : {
    flex : 1
  },
  imageBackground : {
    flex :1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  image :{
    width:240,
    backgroundColor: 'transparent'
  }
})

export default OpenerLogo;