import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {navyBlue, orange, white, purple} from '../utils/colors'

class Deck extends Component{

  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params

    return {
      title
    }
  }

  render(){

    const {deckId, deck} = this.props

    return(
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.heading}>{deck.title}</Text>
        <Text style={styles.content}>There are {deck.questions.length} cards in this deck</Text>
        {
          deck.questions.length===0 ?
          <Text style={styles.content}>To start the quiz, you will have to add atleast 1 card</Text>
          :
          <Text style={styles.content}>Would you like to take the quiz or add a new card?</Text>
        }
        <TouchableOpacity style={styles.options}>
          <Text style={styles.optionsText}>Add Card</Text>
        </TouchableOpacity>
        {
          deck.questions.length!== 0 &&
          <TouchableOpacity style={styles.options}>
            <Text style={styles.optionsText}>Start Quiz</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }

}

const styles=StyleSheet.create({
  content:{
    fontSize: 18,
    color: purple,
    padding: 30,
    textAlign: 'center'
  },
  heading:{
    fontSize: 24,
    fontWeight: 'bold',
    color: purple,
    padding: 30,
    textAlign: 'center'
  },
  options: {
    backgroundColor: navyBlue,
    borderRadius: 16 ,
    borderColor: orange,
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
  optionsText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
})


function mapStateToProps(state, {navigation}){
  const {deckId} = navigation.state.params
  return {
    deckId,
    deck: state[deckId]
  }
}

function mapDispatchToProps(dispatch, {navigation}){
  return {
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Deck)
