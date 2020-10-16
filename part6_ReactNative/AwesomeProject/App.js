import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigate, goBack, navRef } from '../utils/navService';


// 建立清晰规范的数据处理流程
function HomeScreen() {  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <HomeButton />
    </View>
  );
}

function HomeButton() {
  const [text, setText] = React.useState('')
  return (
    <TouchableOpacity 
        style={{
          height: 50,
          width: 300,
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'green'
        }}
        onPress={() => {
          navigate('Detail', {
            key: '主页传值',
            setText
          })
        }}>
        <Text style={{fontSize: 40}}>Home Screen{text}</Text>
  </TouchableOpacity>
  )      
}

function DetailScreen(props) {
  const { route } = props
  const { key, setText } = route.params
  const value = "详情页传值"
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }}>
      <Text style={{fontSize: 40}} 
      onPress={() => {
          setText(value);
          goBack();
      }}>Detail Screen{key}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;