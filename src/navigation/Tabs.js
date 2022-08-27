import React from "react"
import { View, StyleSheet, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import OpenerLogo from '../../src/screens/OpenerLogo'
import Home from '../../src/screens/Home'
import MovieDetails from '../../src/screens/MovieDetails'
import Icon from 'react-native-vector-icons/Fontisto'
Icon.loadFont();

import Profile from "../screens/Profile";
import Browse from "../screens/Browse";
import Search from "../screens/Search";


const TabScreen = () => {
    const Tab = createBottomTabNavigator()

    return (


        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                borderTopWidth: 0,
                backgroundColor: 'transparent',
                position: 'absolute',
                borderRadius: 30,
                bottom: 25,
                left: 20,
                right: 20,
            }
        }} initialRouteName={MovieDetails} >

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image style={{ width: 30, height: 40 }} resizeMode="contain" source={focused ? require('../assets/img/tab-icons/homeiconactive.png') : require('../assets/img/tab-icons/homeicon.png')} />
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="Browse"
                component={Browse}
                options={{
                    tabBarIcon: ({ focused }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image style={{ width: 30, height: 40 }} resizeMode="contain" source={focused ? require('../assets/img/tab-icons/movieiconactive.png') : require('../assets/img/tab-icons/movieicon.png')} />
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image style={{ width: 30, height: 40 }} resizeMode="contain" source={focused ? require('../assets/img/tab-icons/searchiconactive.png') : require('../assets/img/tab-icons/searchicon.png')} />
                        </View>
                    )
                }}
            />



        </Tab.Navigator>

    )
}



export default TabScreen