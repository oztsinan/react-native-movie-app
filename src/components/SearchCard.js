import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList,Button,Animated, Image, Text, ImageBackground, View, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useSelector } from "react-redux";
import axios from 'axios'
import MovieDetailsActorCard from '../components/MovieDetailsActorCard'


Icon.loadFont()

const SearchCard = ({ image, score, desc, bg ,title,mediaType,contentID ,genreID}) => {

    const navigation = useNavigation()
    const [translateControl, setTranslateControl] = useState(true)

    const translateX = useRef(new Animated.Value(0)).current
    
    const [nullState,setNullState] = useState('test')

    const [actorsDB,setActorsDB] = useState([])
    const [lastGenres,setLastGenres] = useState([])


    const {globalDegerler} = useSelector(state=>state)
    const apiKey = globalDegerler.apiKey
    const language = globalDegerler.checkLanguage
    const imgUrl = globalDegerler.imgUrl



    const clickContent = () =>{
        navigation.navigate('MovieDetails', {id : contentID , content : mediaType , language : language, routeName :  'Tabs' })
    }

    async function getActors(){
        await axios.get('https://api.themoviedb.org/3/' + mediaType + '/' + contentID + '/credits?api_key=' + apiKey + '&language=' + language)
        .then((response) => {
          setActorsDB(response.data.cast)
        })
    }

    useEffect(()=>{

        getActors()

        var testData = []

        genreID.filter((item)=> {
            item == 28 ? testData.push('Aksiyon') : nullState ||
            item == 12 ? testData.push('Macera') : nullState ||
            item == 16 ? testData.push('Animasyon') : nullState ||
            item == 35 ? testData.push('Komedi') : nullState ||
            item == 80 ? testData.push('Suç') : nullState ||
            item == 99 ? testData.push('Belgesel') : nullState ||
            item == 18 ? testData.push('Dram') : nullState ||
            item == 10751 ? testData.push('Aile') : nullState ||
            item == 14 ? testData.push('Fantastik') : nullState ||
            item == 36 ? testData.push('Tarih') : nullState ||
            item == 27 ? testData.push('Korku') : nullState ||
            item == 10402 ? testData.push('Müzik') : nullState ||
            item == 9648 ? testData.push('Gizem') : nullState ||
            item == 10749 ? testData.push('Romantik') : nullState ||
            item == 878 ? testData.push('Bilim Kurgu') : nullState ||
            item == 10770 ? testData.push('TV Filmi') : nullState ||
            item == 53 ? testData.push('Gerilim') : nullState ||
            item == 10752 ? testData.push('Savaş') : nullState ||
            item == 37 ? testData.push('Vahşi Batı') : nullState 
        } )


        setLastGenres(testData)

    },[])

    return(

        <View style={{ width: '100%', height: 340, flexDirection: 'row', backgroundColor: 'white', marginBottom: 50 }}>


            <TouchableWithoutFeedback
                onPress={() => {

                    setTranslateControl(!translateControl)
                    if (translateControl) {

                        Animated.timing(translateX, {
                            toValue: -100,
                            useNativeDriver: true,
                        }).start()

                    } else {

                        Animated.timing(translateX, {
                            toValue: 0,
                            useNativeDriver: true,
                        }).start()





                    }
                }}
            >

                <Animated.View
                    style={{
                        transform: [{ translateX: translateX }],
                        zIndex: 1,
                        
                        position: 'absolute',
                        width: '60%',
                        height: '100%',
                        shadowColor: 'black',
                        shadowOffset: { width: 20, height: 0 },
                        shadowOpacity: 0.7,
                        shadowRadius: 30,
                        elevation: 10,


                    }}>
                    <Image style={styles.coverImage} resizeMode="cover" source={{ uri: image }} />
                </Animated.View>


            </TouchableWithoutFeedback>


            <TouchableWithoutFeedback>

                <View style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                    <ImageBackground imageStyle={{ opacity: 0.4 }} blurRadius={30} style={{ width: '100%', height: '100%' }} resizeMode="cover" source={{ uri: bg }} />

                    <View style={{ position: 'absolute', right: 0, width: '63%', height: '100%',justifyContent:'flex-end',alignItems:'flex-end'}}>
                        
                        
                  
                    <View style={{position:'absolute',top:0,marginRight:-10}}>
                    <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={actorsDB}
                            style={{marginTop:20}}
                            keyExtractor={(item, index) => 'key'+index+item.id}
                            renderItem={({ item }) => <MovieDetailsActorCard  containWidth={60} width={60} height={100} photo={imgUrl + item.profile_path} name={item.name} />}
                            /> 
                    </View>
                     
                            
                        
                        
                        
                        
                        <View style={{flexDirection:'row'}}>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginBottom:10,marginRight:10}}>
                            <Icon name="star" size={20} color="red" /> 
                            <Text style={{color:'white',fontSize:20}}> {score} </Text>
                            <Text style={{color:'white',marginLeft:5,marginRight:8}}> | </Text>
                            <Icon name="film" size={20} color="red" /> 
                            <Text style={{color:'white',fontSize:20}}> {mediaType == 'tv' ? globalDegerler.systemText[language].tvText : globalDegerler.systemText[language].movieText }</Text>
                        </View>

                        <TouchableOpacity style={styles.icerigeGitBtn} onPress={clickContent}>
                            <Text style={{color:'white',fontSize:16,fontWeight:'600'}} >
                                {globalDegerler.systemText[language].searchCardViewBtn}
                            </Text>
                            
                        </TouchableOpacity>

                        <Text numberOfLines={4} style={{paddingTop:15, textAlign:'right',fontWeight: '300', color: 'white', fontSize: 14 ,marginBottom:20,marginRight:10 }}>{desc} </Text>
                    </View>



                </View>
            </TouchableWithoutFeedback>


        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '70%',
        height: 400,
        borderRadius: 50,
        marginBottom: 40
    },
    coverImage: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 20,
        borderBottomEndRadius: 20,
    },
    icerigeGitBtn : {
        width:120,
        height:30,
        backgroundColor:'red',
        marginRight:10,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default SearchCard;