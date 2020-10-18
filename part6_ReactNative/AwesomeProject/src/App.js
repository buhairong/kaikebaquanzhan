import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Switch, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigate, goBack, navRef } from '../utils/navService';


// 建立清晰规范的数据处理流程
function HomeScreen() {  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <HomeButton />
        <Text style={{fontSize: 40}} onPress={() => {
          navigate('List')
        }}>九宫格</Text>
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




// 明确状态归属，合理切分组件
const {width: screenWidth} = Dimensions.get("window")
const width = (screenWidth - 32) * 0.3

function List() {
  const [isSingle, setIsSingle] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)

  return (
    <View style={{ flex: 1, padding: 16}}>
      <View style={{ 
          marginTop: 50,
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <Text style={{fontSize: 40}}>单选</Text>
        <Switch
          style={{ marginLeft: 10 }}
          value={isSingle}
          onValueChange={setIsSingle}
        />
      </View>
      <View style={{
          flex: 1, 
          flexDirection: "row", 
          flexWrap: "wrap", 
          justifyContent: 'space-between',
          marginTop: 50,
        }}>
          {isSingle
          ? [...new Array(9)].map((_, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedIndex(i)}
                  style={[
                    styles.item,
                    selectedIndex === i && { backgroundColor: 'green' },
                  ]}
                />
              );
            })
          : [...new Array(9)].map((_, i) => {
              return <Cell key={i} />;
            })}
      </View>
    </View>
  );
}

function Cell() {
  const [selected, setSelected] = React.useState(false);
  return (
    <TouchableOpacity
      onPress={() => setSelected(!selected)}
      style={[styles.item, selected && { backgroundColor: 'green' }]}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    fontSize: 40,
    borderWidth: 1,
    width: width,
    height: width,
    lineHeight: width,
    textAlign: "center",
    marginBottom: 10
  }
})





const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navRef}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;