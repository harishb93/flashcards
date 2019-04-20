import React, {Component} from 'react'
import {KeyboardAvoidingView, Platform, TouchableOpacity, Text, StyleSheet, TextInput,Alert} from 'react-native'
import {white,navyBlue,blue} from '../utils/colors'
import {addDeck} from '../actions'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {_addDeck} from '../utils/api'

function SubmitBtn({onPress,allowSubmit}) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={onPress}>
      <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  );
}

class AddDeck extends Component{

  state={
    deckName: ''
  }

  submit = () => {
    const {deckName} = this.state
    const key=deckName.replace(/\s+/g, '');
    if(deckName.length > 2){
      //Dispatch addDeck action
      this.props.dispatch(addDeck(key,deckName))
      //Add deck to storage using AsyncStorage
      _addDeck(key,deckName)
      //Navigate to Deck
      this.props.navigation.dispatch(NavigationActions.navigate({
        routeName: 'Deck',
        params: {deckId: key, title: deckName}
      }))
      //Set state to default
      this.setState({
        deckName: ''
      })
    }
    else{
      Alert.alert(
        'Deck Name length',
        'Deck name must be more than 2 characters',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    }
  }

  render(){
    const {deckName} = this.state

    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.content}>Enter name of the new deck you would like to add</Text>
        <TextInput
          style={styles.textInput}
          maxLength={20}
          onChangeText={(deckName) => this.setState({deckName})}
          value={deckName} placeholder="Enter Deck Name" autoFocus={true} />
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


export default connect()(AddDeck)
