import { createStore, combineReducers } from 'redux';

const userReducer = (state = {
	keyword: null
}, action) => {
	switch(action.type){
		case "UPDATE_KEYWORD" :
			state = {
				...state,
				keyword: action.keyword
			}
		break;
        default:
        break;
	}
	return state;
}

const reducers = combineReducers({
	user: userReducer
});
export const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
