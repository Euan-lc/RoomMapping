import { StyleSheet, Text, View } from 'react-native';

// Importing React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Importing Screens
import Home from './screens/Home';
import Historical from './screens/Historical';
import LogoTitle from './screens/LogoTitle';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <View style={{ flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}  
        >
          <Stack.Screen
            name='Home'
            component={Home}
            options={ { title: 'RoomMapping', headerTitle: props => <LogoTitle {...props} /> }}  
          />
          <Stack.Screen
            name='Historical'
            component={Historical}
            options={{ title: 'Historique de scans' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;