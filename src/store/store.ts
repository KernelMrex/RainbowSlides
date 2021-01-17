import { combineReducers, createStore } from 'redux'
import { presentationReducer } from './presentation/reducers'
import { popupReducer } from './popup/reducers'

const rootReducer = combineReducers({ presentation: presentationReducer, popup: popupReducer })

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)