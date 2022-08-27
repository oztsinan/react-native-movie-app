import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OpenerLogo from '../../src/screens/OpenerLogo'
import MovieDetails from '../../src/screens/MovieDetails'

import Tabs from '../navigation/Tabs'



const StackScreen = () =>{
    const Stack = createNativeStackNavigator()

    return(
        <Stack.Navigator initialRouteName={OpenerLogo} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OpenerLogo" component={OpenerLogo} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
            
        </Stack.Navigator>
    )
}

export default StackScreen