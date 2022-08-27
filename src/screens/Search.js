import React, { useEffect, useState } from "react";
import { Image, Text,ScrollView, View, StyleSheet, ImageBackground, TextInput ,FlatList} from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import { BlurView } from '@react-native-community/blur'
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import SearchCard from '../components/SearchCard'

Icon.loadFont()



const Search = () => {

  const [searchInput,setSearchInput] = useState('')
  const [results, setResults] = useState([])
  const [nullState,setNullState] = useState()


  
  const { globalDegerler } = useSelector(state => state)
  const [checkLanguage,setCheckLanguage] = useState(globalDegerler.checkLanguage)
  const apiKey = globalDegerler.apiKey
  const imgUrl = globalDegerler.imgUrl
  

  var uzunluk = searchInput.length


  var sendData = []

  useEffect(() => {

    sendData = []

    async function getData() {
        
      await axios.get('https://api.themoviedb.org/3/search/multi?api_key=' + apiKey + '&language=' + checkLanguage + '&query=' + searchInput + '&page=1&include_adult=false')
    .then((response) => {

      

      response.data.results.map((item,index) => {
         item.media_type === 'movie'  ?  (item.overview && item.backdrop_path && item.poster_path ? sendData.push(item) : nullState) : nullState ||
         item.media_type === 'tv'  ?  (item.overview && item.backdrop_path && item.poster_path ||  item.vote_average!= 0 ? sendData.push(item) : nullState) : nullState ||
         item.media_type == 'person' ? item.known_for.filter((item) => item.overview && item.backdrop_path && item.poster_path ? sendData.push(item) :nullState ) : nullState

      })

      setResults(sendData)


    })
    .catch(err=>err)
    }

    getData()



  }, [searchInput])

  return (

    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ImageBackground blurRadius={100} style={{ flex: 1, justifyContent: "center" }} resizeMode="cover" source={require('../assets/img/cover.jpg')}>

        <SafeAreaView style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput autoCorrect={false} onChangeText={(val)=> setTimeout(()=>{ setSearchInput(val) },750) } autoCapitalize="none" style={style.input} placeholder={globalDegerler.systemText[checkLanguage].searchText}/>
        </SafeAreaView>





        


          <FlatList
            data={results}
            style={{flex : 1}}
            keyExtractor={(item, index) => 'key'+index+item.id}
            renderItem = {({item}) => <SearchCard genreID={item.genre_ids} contentID={item.id} mediaType={item.media_type} title={ item.title ? item.title : item.name} desc={item.overview} bg={imgUrl+item.backdrop_path} image={imgUrl+item.poster_path} score={item.vote_average}  />  }
          />


   







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
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 20,
    textAlign: 'center',
  },
  flatListImage : {
    width : 400,
    height : 200,
    backgroundColor : 'red'
  }
})

export default Search;