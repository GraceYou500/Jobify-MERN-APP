import React from 'react';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const Pagination = ({ currentPage, changeApplicantsPage, pageNumbers}) => {

  const prevPage = () => {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      newPage = pageNumbers.length;
    }

    changeApplicantsPage(newPage);

  };

  const nextPage = () => {
  
    let newPage = currentPage + 1;
    if (newPage > pageNumbers.length) {
      newPage = 1;
    };

    console.log("nextPage......",newPage);
 
    changeApplicantsPage(newPage);

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
