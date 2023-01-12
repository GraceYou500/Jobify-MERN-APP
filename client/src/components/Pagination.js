import React from 'react';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const Pagination = ({ postsPerPage, totalPosts, currentPage, changeApplicantsPage}) => {

  const pageNumbers = [];

  for (let i =1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  };

  const prevPage = () => {

  };

  const nextPage = () => {

  };


  return (
    <Wrapper>
       <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className='btn-container'>
        {pageNumbers.map((pagItem) => (
          <button
            key={pagItem}
            type='button'
            className={pagItem === currentPage ? 'pageBtn active' : 'pageBtn'}
            onClick={() => changeApplicantsPage(pagItem)}
          >
            {pagItem}
          </button>
        ))}
      </div>
      <button className='next-btn' onClick={nextPage}>
        Next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default Pagination;
