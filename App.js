import React, {Component} from 'react'
import {View, Platform,StatusBar, StyleSheet} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {Ionicons, MaterialCommunityIcons, Feather} from '@expo/vector-icons'
import {createBottomTabNavigator,createAppContainer, createStackNavigator} from 'react-navigation'
import { flipY, zoomIn, zoomOut } from 'react-navigation-transitions';
import {purple,white,navyBlue} from './utils/colors'
import {Constants} from 'expo'
import Decks from './components/Decks'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import QuizCard from './components/QuizCard'
import {setLocalNotification} from './utils/helpers'

function UdaciStatusBar({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({tintColor}) => <Feather name='plus-circle' size={30} color={tintColor} />
    }
  }
},
{
  navigationOptions: {
    header: null
  }
},
{
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (prevScene
    && prevScene.route.routeName === 'Home'
    && nextScene.route.routeName === 'Deck') {
    return zoomIn();
  }

}

const Stack = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: navyBlue
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: navyBlue
      }
    }
  },
  QuizCard: {
    screen: QuizCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: navyBlue
      }
    }
  }
},{
  transitionConfig: (nav) => handleCustomTransition(nav),
}))

export default class App extends Component {

  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={navyBlue} barStyle='light-content' />
          <Stack />
        </View>
      </Provider>
    );
  }
}
