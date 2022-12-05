import React, { useState, useMemo } from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppContext } from '../context/appContext';
import { FormRow, FormSelect } from '.';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    clearFilters,
    handleChange,
  } = useAppContext();

  const handleSearch = (e) => {
    // console.log('handleSearch........', e.target.name, e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  const debounce = () => {
    let timeoutID;

    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          <FormSelect
            type='text'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            options={['all', ...statusOptions]}
            labelText='search Status'
          />
          <FormSelect
            type='text'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            options={['all', ...jobTypeOptions]}
            labelText='search Type'
          />
          <FormSelect
            type='text'
            name='sort'
            value={sort}
            handleChange={handleSearch}
            options={sortOptions}
          />

          <button
            type='button'
            className='btn-block btn btn-danger'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
