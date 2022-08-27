import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View,Image,StyleSheet,TouchableOpacity,FlatList,Text } from "react-native";
import { useSelector } from "react-redux";
import { NativeRouter, Route, Link } from "react-router-native";




const BigSlider = ({data,content,language,marginValue,routeName})=>{

    const {globalDegerler} = useSelector(state=>state)

    const navigation = useNavigation()

    const imgUrl = globalDegerler.imgUrl

    const[isLoading,setIsLoading] = useState()



    return (

    <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        keyExtractor={(item, index) => 'key'+index}
        renderItem={({ item }) => 


        <TouchableOpacity 
            onPress={()=> navigation.navigate('MovieDetails', {id : item.id , content : content , language : language, routeName :  routeName })} >
        <Image
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            source={{uri : imgUrl + item.poster_path}}
            style={{
                width : 130,
                height : 190,
                borderRadius : 20,
                marginLeft : marginValue>0 ? marginValue : 15,

            }} 
            resizeMode="cover"  
        />

        
        <View style={{
            display : isLoading ? 'flex' : 'none' ,
            width : 130,
            height : 190,
            borderRadius : 20,
            backgroundColor:'rgba(0,0,0,0.2)',
            marginLeft : marginValue>0 ? marginValue : 15,
            justifyContent : 'center',
            alignItems : 'center'
        }}>
            <Image style={{zIndex:2,width:50,height:50}} resizeMode="cover" source={require('../../assets/img/loading.gif')}/>
        </View>
        </TouchableOpacity>

      
      }
    />

        
    
    ) 
} 


export default BigSlider