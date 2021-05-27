import {createAction, handleActions} from 'redux-actions';

interface IInitialState {
  keyword: string;
  prevKeywords: string[]
}

const initialState: IInitialState = {
  keyword     : '',
  prevKeywords: []
};

const CHANGE_KEYWORD = 'search/CHANGE_KEYWORD' as const;

export const changeKeyword = createAction(CHANGE_KEYWORD, (keyword: string) => (keyword));

const search = handleActions<IInitialState, any>(
  {
    [CHANGE_KEYWORD]: (state, {payload: keyword}) => ({
      ...state,
      keyword
    })
  }, initialState);

export default search;