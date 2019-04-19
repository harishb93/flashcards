export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(){
  return {
    type: RECEIVE_DECKS
  }
}

export function addDeck(deckname,title){
  return {
    type: ADD_DECK,
    deckname,
    title
  }
}

export function addCard(deckname,question,answer){
  return {
    type: ADD_CARD,
    deckname,
    question,
    answer
  }
}
