import styled from 'styled-components';

const Wrapper = styled.section`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);

  .container-box {
    padding: 1rem 2rem;
  }
  .skills button {
    margin-right: 1rem; 
    margin-bottom:1rem;
  }

  .actived {
    color: #d66a6a;
    background: #ffeeee;
  }
`;
export default Wrapper;
