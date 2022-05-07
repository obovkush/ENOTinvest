import { initState } from './initState'
import { rootReducer } from './reducers/rootReducer'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware())
)