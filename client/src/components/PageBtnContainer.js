import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/PageBtnContainer';

const PageBtnContainer = () => {
  const { numOfPages, page } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    console.log('prev page');
  };

  const nextPage = () => {
    console.log('next page');
  };

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className='btn-container'>
        {pages.map((pagItem) => (
          <button
            key={pagItem}
            type='button'
            className={pagItem === page ? 'pageBtn active' : 'pageBtn'}
            onClick={() => console.log(pagItem)}
          >
            {pagItem}
          </button>
        ))}
      </div>
      <button className='next-btn' onClick={nextPage}>
        Next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
