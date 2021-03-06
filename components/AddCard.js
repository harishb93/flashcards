import React, {Component} from 'react'
import {KeyboardAvoidingView, Platform, TouchableOpacity, Text, StyleSheet, TextInput, Alert} from 'react-native'
import {white,navyBlue,blue,purple} from '../utils/colors'
import {addCard} from '../actions'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {_addCardToDeck} from '../utils/api'

function SubmitBtn({onPress}) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={onPress}>
      <Text style={styles.submitBtnText}>Add Card</Text>
    </TouchableOpacity>
  );
}

class AddCard extends Component{

  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params

    return {
      title
    }
  }

  state={
    question: '',
    answer: ''
  }

  submit = () => {
    const {question,answer} = this.state
    const {deckId,addCardToDeck,goBack,deck} = this.props

    if(question.length > 0 && answer.length > 0){
      //Dispatch action to add card to deck
      addCardToDeck(deckId,question,answer)
      //Store Updated deck in an object
      const questionAndAnswer = {
        question: question,
        answer: answer
      }

      const updatedDeck = {title: deck.title, questions: deck.questions.concat(questionAndAnswer)}
      //Update deck in AsyncStorage
      _addCardToDeck(deckId,updatedDeck)
      //Set default values
      this.setState({
        question: '',
        answer: ''
      })
      //Alert for adding card success
      Alert.alert(
        'Card Added',
        'Successfully added card to the deck',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
      //Navigate to Home
      goBack()
    }
    else{
      Alert.alert(
        'Empty Question/Answer',
        'The question and/or the answer is empty. Please have some value.',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    }


  }

  render(){
    const {question,answer} = this.state

    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.heading}>Add Card</Text>
        <TextInput
          style={styles.textInput}
          maxLength={50}
          onChangeText={(question) => this.setState({question})}
          value={question} placeholder="Question here" autoFocus={true} />
        <TextInput
          style={styles.textInput}
          maxLength={50}
          multiLine={true}
          numberOfLines={3}
          onChangeText={(answer) => this.setState({answer})}
          value={answer} placeholder="Answer here" />
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
    alignItems: 'center', //flex-start, flex-end, center, stretch
    justifyContent: 'space-around', //flex-start, flex-end, center, space-around, space-between
    marginLeft: 30,
    marginRight: 30
  },
  heading:{
    fontSize: 24,
    fontWeight: 'bold',
    color: purple,
    padding: 30,
    textAlign: 'center'
  },
  content: {
    fontSize:20,
    color: blue,
    textAlign: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: navyBlue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: navyBlue,
    padding: 10,
    borderRadius: 2,
    height: 45,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  textInput:{
    height: 40,
    width: 200,
    borderColor: navyBlue,
    borderWidth: 2,
    alignSelf:'center',
    textAlign:'center'
  }
})

function mapStateToProps(decks, {navigation}){
  const {deckId} = navigation.state.params
  return {
    deckId,
    deck: decks[deckId]
  }
}

function mapDispatchToProps(dispatch, {navigation}){
  return {
    goBack: () => navigation.goBack(),
    addCardToDeck: (deckId,question,answer) => {dispatch(addCard(deckId,question,answer))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddCard)
