import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from './BottomTabs'

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: "#fff",
          },
          headerShown: false,
        }}
        initialRouteName={BottomTabs}
      >
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}