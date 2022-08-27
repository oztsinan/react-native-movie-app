import { BlurView } from '@react-native-community/blur'

import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Image, StyleSheet, Text, Button, ImageBackground, FlatList, Video, ScrollView } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/Feather'
Icon.loadFont()

import BigSliderv1 from '../components/Slider/BigSliderv1'
import BigSliderv2 from '../components/Slider/BigSliderv2'
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";






const Home = () => {
  const navigation = useNavigation()
  const { globalDegerler } = useSelector(state => state)
  const [upcomingDB, setUpcomingDB] = useState([])


  const [trendingDB, setTrendingDB] = useState([])
  const [topRatedDB, setTopRatedDB] = useState([])
  const [popularTVDB, setPopularTVDB] = useState([])


  const [trendingClick, setTrendingClick] = useState(true)
  const [topRatedClick, setTopRatedClick] = useState(false)
  const [popularTVClick, setPopularTVClick] = useState(false)




  const apiKey = globalDegerler.apiKey

  const [checkLanguage, setcheckLanguage] = useState(globalDegerler.checkLanguage)



  async function upcomingMovieDBCallAPI() {

    await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=' + checkLanguage + '&page=1')
      .then((response) => {
        setUpcomingDB(response.data.results)
      })

    await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey)
      .then((response) => {
        console.log('deneme');
        setTrendingDB(response.data.results)
      })

    await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=' + checkLanguage + '&page=1')
      .then((response) => {
        setTopRatedDB(response.data.results)
      })

    await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey + '&language=' + checkLanguage + '&page=1')
      .then((response) => {
        setPopularTVDB(response.data.results)
      })


  }




  useEffect(() => {

    upcomingMovieDBCallAPI()



  }, [])


  const buttonDetect = (value) => {


    setTopRatedClick(false)
    setPopularTVClick(false)
    setTrendingClick(false)

    value(true)



  }


  return (


    <View style={{ flex: 1, backgroundColor: 'black' }}>

      <ImageBackground blurRadius={100} style={{ flex: 1, justifyContent: "center" }} resizeMode="cover" source={require('../assets/img/cover.jpg')}>

        <ScrollView>

          <View style={style.titleBar}>
            <View style={style.headerTop}>
              <View style={style.headerLeft}>
                <Text style={{ color: 'red', fontSize: 20, fontWeight: '600', marginBottom: 3 }}> | </Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '300' }}> {globalDegerler.systemText[checkLanguage].welcomeMsg} {globalDegerler.name} </Text>
              </View>
              <View style={style.headerRight}>
                <Icon onPress={()=> navigation.navigate('Search') } name="search" size={25} color="white" />
              </View>
            </View>
          </View>

          <View style={{ paddingBottom: 20 }}>
            <Text style={{ width: '100%', color: 'white', fontSize: 20, textAlign: 'center', marginBottom: 25, fontWeight: '300' }}>{globalDegerler.systemText[checkLanguage].upComingMovie}</Text>
            <BigSliderv1 routeName="Home" marginValue={25} data={upcomingDB} language={checkLanguage} content='movie' />
          </View>


          <View>
            <View style={{ flexDirection: 'row', marginLeft:20,marginRight:20,paddingBottom: 20, justifyContent: 'space-around', alignItems: 'center' }}>
              <Text onPress={()=> buttonDetect(setTrendingClick)} style={{ color: trendingClick ? '#EB3842' : '#65656E', fontSize: 14, fontWeight: '400' }}> Trending </Text>
              <Text onPress={()=> buttonDetect(setTopRatedClick)} style={{  color: topRatedClick ? '#EB3842' : '#65656E', fontSize: 14, fontWeight: '400' }}> Top Rated </Text>
              <Text onPress={()=> buttonDetect(setPopularTVClick)} style={{  color: popularTVClick ? '#EB3842' : '#65656E', fontSize: 14, fontWeight: '400' }}> Popular TV </Text>
            </View>



            <View style={{ display: trendingClick ? 'flex' : 'none' }}>
              <BigSliderv2 routeName="Home" marginValue={25} data={trendingDB} language={checkLanguage} content='movie' />
            </View>


            <View style={{ display: topRatedClick ? 'flex' : 'none' }}>
              <BigSliderv2 routeName="Home" marginValue={25} data={topRatedDB} language={checkLanguage} content='movie' />
            </View>


            <View style={{ display: popularTVClick ? 'flex' : 'none' }}>
              <BigSliderv2 routeName="Home" marginValue={25} data={popularTVDB} language={checkLanguage} content='tv' />
            </View>


          </View>


        </ScrollView>

        <View style={style.BlurViewcont}>
          <BlurView style={style.absolute} blurType="dark" blurAmount={4} />
        </View>




      </ImageBackground>
    </View>



  )
}

const style = StyleSheet.create({

  headerTop: {
    width: '100%',
    height: 60,
    flexDirection: 'row'
  },
  headerLeft: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerRight: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  titleBar: {
    margin: 20,
    marginTop: 50,
  },
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
  },

})

export default Home;