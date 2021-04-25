
import produce from 'immer';
import createReducer from './ReducerUtils';

const initialState = {
    user: {
        name: ""
    }
}

const user = {
    setUserName(state, action) {
        state.user.name = action.payload;
    }
}

export default produce((state, action) => {
    createReducer(state, action, user);
}, initialState)