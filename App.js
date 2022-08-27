import React, { useEffect,useState } from "react";
import { SafeAreaView, StyleSheet, Text ,StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./src/redux"

import StackNavigation from './src/navigation/Stack'
import TabNavigation from './src/navigation/Tabs'






const App = () => {

  
  const store = createStore(reducers)
   
  return (
    <Provider store={store} >
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </Provider>
  )
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default App;