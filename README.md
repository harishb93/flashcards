# Flashcards

---

## Project Purpose:

This is a Udacity React Nanodegree Project. This project is Flashcards app where an user can add a new deck to the list of decks, add cards to a deck, take a quiz for a deck and view results. The purpose of this project is to implement the same in react-native. The app will showcase react-native fundamentals and functionalities like AsyncStorage, Styling, Tab Navigation, Stack Navigation, Local notifications and Animation effects.

## How to Load the App

The project uses Expo and the Create-React-Native-App starter. If you do not have Expo-cli installed, you can download it here: [Expo](https://expo.io/tools)

Once Expo cli is installed and the account is created, navigate to the directory where you want to store the app

```
git clone https://github.com/harishb93/flashcards.git
yarn
<or>
git clone https://github.com/harishb93/flashcards.git
npm install
```

Once all of the dependencies have been installed you can launch the app with

```
yarn start
<or>
npm start
```

A new browser window should automatically open displaying the Expo DevTools. If it doesn't, navigate to [http://localhost:19002/](http://localhost:19002/) in your browser. You may want to connect your physical device to your computer or have an emulator set up with ADB configured for Expo to be able to pick it up.


## How to Use the App

- User can add a new deck
  ![New Deck Screen](NewDeck.png "new deck" | width=100)

- Selected user can view his/her Decks
  ![Home Screen](HomeScreen.png "home screen" | width=100)

- User can view an individual deck
  ![View deck Screen](ViewDeck.png "view deck" | width=100)

- Deck when no cards are added
  ![View deck Screen - No Cards](ViewDeck-NoCards.png "view deck no cards" | width=100)

- User can add a new card to a deck
  ![New card Screen](NewCard.png "new card" | width=100)

- User can take a quiz
  ![Quiz Screen - Question](Quiz-Question.png "quiz question" | width=100)

  ![Quiz Screen - Answer](Quiz-Answer.png "quiz answer" | width=100)

  ![Quiz Screen - Result](Quiz-Result.png "quiz result" | width=100)
