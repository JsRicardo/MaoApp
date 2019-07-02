import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer, IRootState } from './reducers';
import thunk, { ThunkMiddleware } from 'redux-thunk';


export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<IRootState>))
)