import React, {useRef} from 'react';

export default function SearchForm() {
  const inputRef = useRef(null);
  return (
    <>
      <h1>검색폼</h1>
      <form>
        <input ref={inputRef} type="text"/>
        <button>검색</button>
      </form>
    </>
  );
}