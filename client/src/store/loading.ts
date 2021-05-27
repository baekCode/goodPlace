import {createAction, handleActions} from 'redux-actions';

interface IInitialState {
}

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(START_LOADING, (requestType: string) => requestType);
export const finishLoading = createAction(FINISH_LOADING, (requestType: string) => requestType);

const initialState: IInitialState = {};

const loading = handleActions({
    [START_LOADING] : (state: IInitialState, action: any) => {
      console.log(action);
      return {
        ...state,
        [action.payload]: true
      };
    },
    [FINISH_LOADING]: (state: IInitialState, action: any) => ({
      ...state,
      [action.payload]: false
    }),
  },
  initialState
);

export default loading;
