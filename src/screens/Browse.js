import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, StyleSheet, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import { BlurView } from '@react-native-community/blur'
import { useDispatch, useSelector } from "react-redux";
import BigSliderv2 from '../components/Slider/BigSliderv2'
import BigSliderv1 from '../components/Slider/BigSliderv1'
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
Icon.loadFont()



const Browse = () => {

  const { globalDegerler } = useSelector(state => state)
  const apiKey = globalDegerler.apiKey
  const [checkLanguage, setcheckLanguage] = useState(globalDegerler.checkLanguage)

  const [gosterimde, setGosterimde] = useState()
  const [yerliFilmlerDB, setYerliFilmler] = useState()
  const [bilimKurguDB, setBilimKurgu] = useState()
  const [komediDB, setKomedi] = useState()
  const [romantikDB, setRomantik] = useState()
  const [savasDB, setSavas] = useState()
  const [korkuDB, setKorku] = useState()
  const [gizemDB, setGizem] = useState()




  async function getData() {

    await axios.get('https://api.themoviedb.org/3/tv/on_the_air?api_key=' + apiKey + '&language=' + checkLanguage + '&page=1')
      .then((response) => {
        setGosterimde(response.data.results)
      })
    await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=' + checkLanguage + '&with_watch_monetization_types=flatrate' + '&language=' + checkLanguage)
      .then((response) => {
        setYerliFilmler(response.data.results)
      })

    await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=878&with_watch_monetization_types=flatrate' + '&language=' + checkLanguage)
      .then((response) => {
        setBilimKurgu(response.data.results)
      })

    await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35&with_original_language=' + checkLanguage + '&with_watch_monetization_types=flatrate' + '&language=' + checkLanguage)
      .then((response) => {
        setKomedi(response.data.results)
      })

    await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + 10749 + '&with_watch_monetization_types=flatrate' + '&language=' + checkLanguage)
      .then((response) => {
        setRomantik(response.data.results)
      })

    await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + 10752 + '&with_watch_monetization_types=flatrate' + '&language=' + checkLanguage)
      .then((response) => {
        setSavas(response.data.results)
      })

    await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + 27 + '&with_watch_monetization_types=flatrate' + '&language=' + checkLanguage)
      .then((response) => {
        setKorku(response.data.results)
      })

    await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + 9648 + '&with_watch_monetization_types=flatrate' + '&language=' + checkLanguage)
      .then((response) => {
        setGizem(response.data.results)
      })


  }

  useEffect(() => {
    getData()
  }, [])


  return (


    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ImageBackground blurRadius={100} style={{ flex: 1, justifyContent: "center" }} resizeMode="cover" source={require('../assets/img/cover.jpg')}>


        <ScrollView>

          <SafeAreaView>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginBottom: 20 }}>
                <Text style={{ color: 'red', fontSize: 20, fontWeight: '600', marginBottom: 3 }}> | </Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '300' }}>  {globalDegerler.systemText[checkLanguage].TVdegosterimde} </Text>
              </View>
              <BigSliderv2 routeName="Browse" marginValue={25} data={gosterimde} language={checkLanguage} content='tv' />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginBottom: 20 }}>
                <Text style={{ color: 'orange', fontSize: 20, fontWeight: '600', marginBottom: 3 }}> | </Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '300' }}>  {globalDegerler.systemText[checkLanguage].yerliFilmler} </Text>
              </View>
              <BigSliderv1 routeName="Browse" marginValue={25} data={yerliFilmlerDB} language={checkLanguage} content='movie' />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginBottom: 20 }}>
                <Text style={{ color: 'blue', fontSize: 20, fontWeight: '600', marginBottom: 3 }}> | </Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '300' }}>  {globalDegerler.systemText[checkLanguage].romantik} </Text>
              </View>
              <BigSliderv1 routeName="Browse" marginValue={25} data={romantikDB} language={checkLanguage} content='movie' />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginBottom: 20 }}>
                <Text style={{ color: 'green', fontSize: 20, fontWeight: '600', marginBottom: 3 }}> | </Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '300' }}>{globalDegerler.systemText[checkLanguage].komedi}</Text>
              </View>
              <BigSliderv1 routeName="Browse" marginValue={25} data={komediDB} language={checkLanguage} content='movie' />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginBottom: 20 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 3 }}> | </Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '300' }}>{globalDegerler.systemText[checkLanguage].bilimKurgu}</Text>
              </View>
              <BigSliderv1 routeName="Browse" marginValue={25} data={bilimKurguDB} language={checkLanguage} content='movie' />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginBottom: 20 }}>
                <Text style={{ color: 'red', fontSize: 20, fontWeight: '600', marginBottom: 3 }}> | </Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '300' }}>{globalDegerler.systemText[checkLanguage].savas}</Text>
              </View>
              <BigSliderv1 routeName="Browse" marginValue={25} data={savasDB} language={checkLanguage} content='movie' />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginBottom: 20 }}>
                <Text style={{ color: 'red', fontSize: 20, fontWeight: '600', marginBottom: 3 }}> | </Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '300' }}>{globalDegerler.systemText[checkLanguage].korku}</Text>
              </View>
              <BigSliderv1 routeName="Browse" marginValue={25} data={korkuDB} language={checkLanguage} content='movie' />
            </View>

            <View style={{ paddingBottom:100,justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginBottom: 20 }}>
                <Text style={{ color: 'red', fontSize: 20, fontWeight: '600', marginBottom: 3 }}> | </Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '300' }}>{globalDegerler.systemText[checkLanguage].belgesel}</Text>
              </View>
              <BigSliderv1 routeName="Browse" marginValue={25} data={gizemDB} language={checkLanguage} content='movie' />
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

export default Browse;