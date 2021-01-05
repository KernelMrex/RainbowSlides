import { combineReducers, createStore } from 'redux'
import { presentationReducer } from './presentation/reducers'

const rootReducer = combineReducers({ presentation: presentationReducer })

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)