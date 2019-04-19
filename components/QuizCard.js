import React, {Component} from 'react'
import {View, Platform, TouchableOpacity, Text, StyleSheet, Button} from 'react-native'
import {white,navyBlue,blue} from '../utils/colors'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

function SubmitBtn({text,onPress}) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={onPress}>
      <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  );
}

class QuizCard extends Component{

  static navigationOptions = ({navigation}) => {

    return {
      title: 'Quiz'
    }
  }

  state={
    index: 0,
    correct: 0,
    showAnswer: false
  }

  handleAnswer = (text) => {

    this.setState((state) => ({
      index: state.index + 1,
      correct: text === 'correct' ? state.correct + 1 : state.correct,
      showAnswer: !state.showAnswer
    }))

  }

  goBackToDeck = () => {
    this.props.goBack()
  }

  handleShowAnswer = () => {
    this.setState((state) =>({
      showAnswer: !state.showAnswer
    }))
  }

  handleRestart = () => {
    this.setState({
      showAnswer: false,
      correct: 0,
      index: 0,
    })
  }

  render(){
    const {index,correct,showAnswer} = this.state
    const {questions} = this.props
    const totalCount=questions.length

    return(
      <View style={{flex:1}}>
        {
          index < totalCount
          ?
          showAnswer
            ?
            <View behavior='padding' style={styles.container}>
              <Text style={styles.content}>Question {index + 1} of {totalCount}</Text>
              <Text style={styles.heading}>Answer : {questions[index].answer}</Text>
              <Button title='Show Question' color='#7daed3' onPress={this.handleShowAnswer}>Show Question</Button>
              <SubmitBtn text='Correct' onPress={() => this.handleAnswer('correct')} />
              <SubmitBtn text='Incorrect' onPress={() => this.handleAnswer('incorrect')} />
            </View>
            :
            <View behavior='padding' style={styles.container}>
              <Text style={styles.content}>Question {index + 1} of {totalCount}</Text>
              <Text style={styles.heading}>{questions[index].question}</Text>
              <Button title='Show Answer' color='#7daed3' onPress={this.handleShowAnswer}>Show Answer</Button>
            </View>
          :
          <View behavior='padding' style={styles.container}>
            <Text style={styles.heading}>
              You have scored
            </Text>
            <Text style={styles.heading}>
              {correct} out of {totalCount}
            </Text>
            <SubmitBtn text='Restart Quiz' onPress={this.handleRestart} />
            <SubmitBtn text='Back to Deck' onPress={this.goBackToDeck} />
          </View>
        }
      </View>

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
    color: navyBlue,
    padding: 30,
    textAlign: 'center'
  },
  content: {
    fontSize:20,
    color: navyBlue,
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
    borderRadius: 8,
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
    questions: decks[deckId].questions
  }
}

function mapDispatchToProps(dispatch, {navigation}){
  return {
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizCard)
