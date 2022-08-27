import React, { useEffect, useState } from "react";
import {StyleSheet,View,Text, Image , TouchableOpacity} from 'react-native'

const MovieDetailsActorCard = ({photo,name,job,width,height,containWidth})=>{

    const [photoURL,setPhotoURL] = useState(photo)

    return(
        <TouchableOpacity>

            <View 
            style={{
                width : containWidth,
                justifyContent :'flex-start',
                alignItems :'center',
                textAlign:'center',
                marginLeft : 15,
            }}
            >
                <Image key={name} onError={()=> setPhotoURL('https://i.ibb.co/TMBS80g/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.png') } 
                style={{        
                    width : width,
                    height :height,
                    borderRadius : 10,
                    backgroundColor:'gray'
                }} 
                source={{uri : photoURL }} resizeMode="cover" />
                
                <View style={style.actorText}> 
                    <Text style={{color:'white',fontSize:10,fontWeight:'400',textAlign:'center'}}>{name}</Text>
                    <Text style={ job ? {color:'white',fontSize:9,fontWeight:'300',textAlign:'center',marginTop:3} : {display:'none'}}>{job}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    actorText:{
        textAlign : 'center',
        justifyContent:'center',
        alignItems:'center',
        width:80,
        paddingTop : 5,
        shadowColor : 'black',
        shadowOffset:{
            width : 0, height :0 
        },
        shadowRadius : 3,
        shadowOpacity : 10
    },

})

export default MovieDetailsActorCard