import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 70%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .skill-row {
    display: flex;
  }

  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-skill {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0.5rem;
    column-gap: 1rem;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }
  .form-container button {
    align-self: center;
    height: 35px;
    margin-top: 1rem;
  }
  .form-container .skill-del-btn {
    margin-top: 0rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: center;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
