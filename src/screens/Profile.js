import React, { useEffect,useState } from "react";
import { SafeAreaView,Text,ScrollView, View, StyleSheet ,ImageBackground, TextInput} from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import { BlurView } from '@react-native-community/blur'
Icon.loadFont()
import { useDispatch, useSelector } from "react-redux";
import { SetName,SetSystemLanguage } from "../redux/actions";


const Profile = () => {

  const { globalDegerler } = useSelector(state => state)
  const apiKey = globalDegerler.apiKey





  const [name,setName] = useState(globalDegerler.name)
  const [checkLanguage,setLanguage] = useState(globalDegerler.checkLanguage)


  const [nameInput,setNameInput] = useState('')
  const [languageInput,setLanguageInput] = useState('')


  const dispatch = useDispatch()

  useEffect(()=>{

    dispatch(SetName(nameInput))

  },[nameInput])

  useEffect(()=>{


  },[languageInput])

  return (


    <View style={{ flex : 1, backgroundColor :'black'}}>
      <ImageBackground blurRadius={100} style={{flex : 1,justifyContent: "center"}} resizeMode="cover" source={require('../assets/img/cover.jpg')}>


      <ScrollView>

        <SafeAreaView>


          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:25}}>
            <Text style={{color:'white'}}> İsim :  </Text>
            <TextInput value={nameInput} onChangeText={setNameInput} autoCorrect={false} autoCapitalize='none'  placeholderTextColor={'black'} style={{width:200,height:30,backgroundColor:'white',borderRadius:10,textAlign:'center'}} placeholder={name} />
          </View>

          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:25}}>
            <Text style={{color:'white'}}> Sistem Dili :  </Text>
            <TextInput value={languageInput} onChangeText={setLanguageInput} autoCorrect={false} autoCapitalize='none'  placeholderTextColor={'black'} style={{width:200,height:30,backgroundColor:'white',borderRadius:10,textAlign:'center'}} placeholder={checkLanguage} />
          </View>


        </SafeAreaView>

      </ScrollView>

      <View style={style.BlurViewcont}>
      <BlurView style={style.absolute} blurType="dark" blurAmount={4} />
      </View>

      </ImageBackground>
    </View>



  )
}

const style = StyleSheet.create({
  absolute: {
    position: "absolute",
    width: '100%',
    height: 80,
    bottom: 25,
    zIndex: 0,
    borderRadius: 20
  },
  BlurViewcont: {
    marginLeft: 20,
    marginRight: 20
  }
})

export default Profile;