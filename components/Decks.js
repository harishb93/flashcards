import React, {Component} from 'react'
import {View, ScrollView, Platform, TouchableOpacity, Text, StyleSheet} from 'react-native'
import {navyBlue,purple,white,yellow} from '../utils/colors'
import {connect} from 'react-redux'
import {_receiveDecks} from '../utils/api'
import {receiveDecks} from '../actions'
import {AppLoading} from 'expo'

function DeckCard({questionsCount, cardname, navigate}){
  return(
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosDeckCard : styles.deckCardAndroid}
      onPress={navigate}>
      <Text style={styles.deckCardTitle}>{cardname}</Text>
      <Text style={styles.deckCardText}>{questionsCount} cards</Text>
    </TouchableOpacity>
  )
}

class Decks extends Component{

  state ={
    ready: false
  }

  componentDidMount(){
    const {dispatch} = this.props

    _receiveDecks()
    .then((decks) => dispatch(receiveDecks(decks)))
    .then(() => this.setState(() => ({
      ready: true
    })))
  }

  render(){

    const {decks} = this.props
    const {ready} = this.state

    if(ready === false){
      return <AppLoading />
    }

    return(
      <ScrollView style={{flex: 1}}>
        <Text style={styles.heading}>Decks</Text>
        <View>
          {Object.keys(decks).map(key => {
            const cardname=decks[key].title
            const questionsCount=decks[key].questions.length
            return (
              <DeckCard key={key} questionsCount={questionsCount} cardname={cardname}
                navigate={ () => {
                  this.props.navigation.navigate(
                    'Deck',
                    {deckId: key, title: cardname}
                  )
                }
              }
              />
          )
        })}
        {
          (Object.keys(decks).length === 0) &&
          <Text style={styles.content}>There are no decks created. You can get started by adding a new deck</Text>
        }
      </View>
    </ScrollView>
  )
}
}

const styles=StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading:{
    fontSize: 24,
    fontWeight: 'bold',
    color: navyBlue,
    padding: 30,
    textAlign: 'center'
  },
  iosDeckCard: {
    backgroundColor: navyBlue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  deckCardAndroid: {
    backgroundColor: navyBlue,
    borderRadius: 16 ,
    borderColor: yellow,
    borderWidth: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  deckCardTitle: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  deckCardText: {
    color: white,
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 5
  },
  content: {
    fontSize:20,
    color: navyBlue,
    textAlign: 'center'
  },
})

function mapStateToProps(decks){

  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)
