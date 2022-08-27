import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image,StyleSheet,TouchableOpacity,FlatList } from "react-native";
import { useSelector } from "react-redux";
import { NativeRouter, Route, Link } from "react-router-native";




const BigSlider = ({data,content,language,marginValue,routeName})=>{

    const {globalDegerler} = useSelector(state=>state)

    const navigation = useNavigation()

    const imgUrl = globalDegerler.imgUrl



    return  (


    <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        keyExtractor={(item, index) => 'key'+index}
        renderItem={({ item }) => 


        <TouchableOpacity 
            onPress={()=> navigation.navigate('MovieDetails', {id : item.id , content : content , language : language, routeName :  routeName })} >
        <Image
            source={{uri : imgUrl + item.poster_path}}
            style={{
                width : 150,
                height : 280,
                borderRadius : 20,
                marginLeft : marginValue>0 ? marginValue : 15,

            }} 
            resizeMode="cover"  
        />
        </TouchableOpacity>

        
      
      
      }
    />

        
    
    )
}


export default BigSlider