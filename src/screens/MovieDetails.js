import { useNavigation, NavigationActions, useRoute } from "@react-navigation/native";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Button, ImageBackground, Image, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch,useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/Feather'
Icon.loadFont()

import MovieDetailsActorCard from '../components/MovieDetailsActorCard'
import BigSlider from "../components/Slider/BigSliderv1";



const MovieDetails = ({ navigation,route }) => {
  const {globalDegerler} = useSelector(state=>state)

  const scrollRef = useRef()
  const ActorFlatListRef = useRef()
  const CrewFlatListRef = useRef()

  

  const [movieDB, setMovieDB] = useState([])
  const [movieDBCredits, setMovieDBCredits] = useState([])
  const [movieDBCrew, setMovieDBCrew] = useState([])
  const [movieDBCategory, setMovieDBCategory] = useState("")
  const [movieDBYear, setMovieDBYear] = useState("")
  const [movieDBVote, setMovieDBVote] = useState("")
  const [movieDBDesc, setMovieDBDesc] = useState(0)

  const [featuredDB, setFeaturedDB] = useState("")

  const [aciklamaShow, setAciklamaShow] = useState(false)


  const apiKey = globalDegerler.apiKey
  const imgUrl = globalDegerler.imgUrl



  const content = route.params.content ? route.params.content : 'tv' 
  const id = route.params.id ?  route.params.id : '550'
  const checkLanguage = route.params.language

  async function getData(){
    await axios.get('https://api.themoviedb.org/3/' + content + '/' + id + '?api_key=' + apiKey + '&language=' + checkLanguage)
    .then((response) => {
      setMovieDB(response.data)
      setMovieDBVote(response.data.vote_average.toFixed(2))
      setMovieDBCategory(response.data.genres[0].name)
      setMovieDBYear(response.data.release_date)  
      setMovieDBDesc(response.data.overview.length)
    })
    .catch(err=>err)
    

    await axios.get('https://api.themoviedb.org/3/' + content + '/' + id + '/credits?api_key=' + apiKey + '&language=' + checkLanguage)
    .then((response) => {
      setMovieDBCredits(response.data.cast)
    })
    .catch(err=>err)
    

    await axios.get('https://api.themoviedb.org/3/' + content + '/' + id + '/credits?api_key=' + apiKey + '&language=' + checkLanguage)
    .then((response) => {
      setMovieDBCrew(response.data.crew)
    })
    .catch(err=>err)
    

    await axios.get('https://api.themoviedb.org/3/movie/'+ id +'/recommendations?api_key=' + apiKey + '&language=' + checkLanguage + '&page=1')
    .then((response) => {
      setFeaturedDB(response.data.results)
    })
    .catch(err=>err)
    
  }

  useEffect(() => {

    console.log(route.params.routeName);
    
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });


    ActorFlatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
    CrewFlatListRef.current?.scrollToOffset({ animated: true, offset: 0 })

    getData()


  }, [route])


  return (
    
    <View style={style.main}>

      <SafeAreaView style={style.topMenu} >
        <Icon onPress={() => route.params.routeName ? navigation.navigate(route.params.routeName) : navigation.navigate('Home') } name="arrow-left" size={25} color="white" style={{ marginLeft: 20, shadowColor: 'black', shadowOffset: { width: 0, height: 0 }, shadowRadius: 10, shadowOpacity: 1 }} />
      </SafeAreaView>



      <View style={style.cover}>

        <Image style={style.coverImage} source={{ uri: imgUrl + movieDB.backdrop_path }} resizeMode="cover" />
        <Image style={style.fade} source={require('../assets/img/fade.png')} resizeMode="contain" />
        <View style={style.coverMovieTitle}>

          <Text style={{ textAlign: 'center', fontSize: 25, color: 'white', fontWeight: '600', marginBottom: 10 }}> {content == 'movie' ? movieDB.original_title : movieDB.name} </Text>


          <View style={style.row} >
            <Icon name="star" size={14} color="orange" style={{ marginBottom: 15 }} />
            <Text style={{ color: 'white', fontSize: 17, fontWeight: '300', marginBottom: 15 }}> {movieDBVote} / 10  </Text>
          </View>


          <View style={style.row}>
            <Icon name="calendar" size={12} color="white" />
            <Text style={{ color: 'white', fontSize: 12 }}>  {movieDBYear} </Text>
            <Text style={{ color: 'white', fontSize: 12 }}> | </Text>


            <Icon name="film" size={12} color="white" />
            <Text style={{ color: 'white', fontSize: 12 }}> {movieDBCategory} </Text>
          </View>


        </View>
      </View>

      <View style={style.coverBottom}>

        <ImageBackground imageStyle={{opacity:0.4}} blurRadius={30} source={{uri : imgUrl+movieDB.poster_path}}>
        <Image style={style.fadereverse} source={require('../assets/img/fade-reverse.png')} resizeMode="contain" />

        <ScrollView ref={scrollRef}>


          <ScrollView>

            <View style={movieDBDesc > 0 ? { alignItems: 'flex-start' } : { display: 'none' }}>
              <Text style={{ color: 'white', marginBottom: 20, fontSize: 18, fontWeight: '500', marginLeft: 15 }}> {globalDegerler.systemText[checkLanguage].ViewScreenSummary} </Text>
              <Text onPress={() => setAciklamaShow(!aciklamaShow)} numberOfLines={aciklamaShow ? 99 : 3} style={{ marginLeft: 20, marginRight: 25, color: 'white', fontSize: 14, fontWeight: '300', lineHeight: 25 }}>{movieDB.overview}</Text>
            </View>

          </ScrollView>


          <ScrollView>


            <View style={movieDBDesc > 0 ? { marginTop: 40 } : {}}>
              <Text style={{ color: 'white', marginBottom: 25, fontSize: 18, fontWeight: '500', marginLeft: 15 }}> {globalDegerler.systemText[checkLanguage].ViewScreenActors} </Text>
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={movieDBCredits}
                  ref={ActorFlatListRef}
                  keyExtractor={(item, index) => 'key'+index+item.id}
                  renderItem={({ item }) => <MovieDetailsActorCard  containWidth={90} width={80} height={120} photo={imgUrl + item.profile_path} name={item.name} />}
                />
              </View>
            </View>

            <View style={{ marginTop: 50 }}>
              <Text style={{ color: 'white', marginBottom: 25, fontSize: 18, fontWeight: '500', marginLeft: 15 }}> {globalDegerler.systemText[checkLanguage].ViewScreenCrew} </Text>
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  keyExtractor={(item, index) => 'key'+index+item.id}
                  data={movieDBCrew}
                  ref={CrewFlatListRef}
                  renderItem={({ item }) => <MovieDetailsActorCard containWidth={90} width={80} height={120} job={item.known_for_department} photo={imgUrl + item.profile_path} name={item.name} />}
                />
              </View>
            </View>


            <View style={{ marginTop: 50 }}>
              <Text style={{ color: 'white', marginBottom: 25, fontSize: 18, fontWeight: '500', marginLeft: 15 }}>  { featuredDB.length>0 ?  globalDegerler.systemText[checkLanguage].ViewScreenRecommended : null } </Text>
              <View style={{ paddingBottom: 50 }}>
                <BigSlider routeName={route.params.routeName} key={featuredDB.index} data={featuredDB} language='tr' content='movie' marginValue={20} />
              </View>
            </View>




          </ScrollView>
        </ScrollView>

        </ImageBackground>

      </View>
    </View>




  )
}



const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black'
  },
  cover: {
    flex: 1.5,
    backgroundColor: 'black',
  },
  coverBottom: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  fade: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: -430
  },
  fadereverse: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: -700
  },
  coverMovieTitle: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    top: 340
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topMenu: {
    position: 'absolute',
    zIndex: 1,
    width: '100%'

  },
  movieDB_BG :{
    opacity : 1,
    
  }


})

export default MovieDetails;