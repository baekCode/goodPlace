import React, {useRef, useState} from 'react';
import {Container, MapRegion} from './styles';
import {useDispatch} from 'react-redux';
import {changeKeyword} from '../../store/search';

interface ISearchForm {
  addressName?: string
}

export default function SearchForm({addressName}: ISearchForm) {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changeKeyword(keyword));
  };
  return (
    <Container>
      <h1>검색폼</h1>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" value={keyword} onChange={onChange}/>
        <button>검색</button>
      </form>
      <MapRegion children={addressName}/>
    </Container>
  );
}