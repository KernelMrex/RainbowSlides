import { combineReducers, createStore } from 'redux'
import { presentationReducer } from './presentation/reducers'
import { popupReducer } from './popup/reducers'
import { bufferReducer } from './buffer/reducers'

const rootReducer = combineReducers({ presentation: presentationReducer, popup: popupReducer, buffer: bufferReducer })

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)