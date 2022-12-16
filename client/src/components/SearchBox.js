import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/SearchBox';
import { useAppContext } from '../context/appContext';

const SearchBox = () => {
  const [java, setJava] = useState(false);
  const [js, setJs] = useState(false);
  const [react, setReact] = useState(false);
  const {
    searchJavaApp,
    cancelJava,
    searchJsApp,
    cancelJs,
    searchReactApp,
    cancelReact,
  } = useAppContext();

  const javaHandle = () => {
    setJava((preJava) => !preJava);
  };

  const jsHandle = () => {
    setJs((preJs) => !preJs);
  };

  const reactHandle = () => {
    setReact((preReact) => !preReact);
  };

  useEffect(() => {
    if (java) {
      searchJavaApp('Java');
    } else if (!java) {
      cancelJava();
    }
    if (js) {
      searchJsApp('JavaScript');
    } else if (!js) {
      cancelJs();
    }
    if (react) {
      searchReactApp('React');
    } else if (!react) {
      cancelReact();
    }
  }, [java, js, react]);

  return (
    <Wrapper>
      <div className='container-box'>
        <h3>Search Box</h3>
        <div className='skills'>
          <button type='button' className='java btn' onClick={javaHandle}>
            Java
          </button>
          <button type='button' className='js btn' onClick={jsHandle}>
            JavaScript
          </button>
          <button type='button' className='react btn' onClick={reactHandle}>
            React
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchBox;
