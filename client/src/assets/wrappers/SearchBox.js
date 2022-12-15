import styled from 'styled-components';

const Wrapper = styled.section`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);

  .container-box {
    padding: 1rem 2rem;
  }
  .skills {
    display: flex;
    column-gap: 1rem;
  }
  .java {
    background: #fcefc7;
    color: #e9b949;
    text-align: center;
    width: 100px;
    height: 30px;
    border-radius: var(--borderRadius);
  }

  .js {
    background: #e0e8f9;
    color: #647acb;
    text-align: center;
    width: 100px;
    height: 30px;
    border-radius: var(--borderRadius);
  }

  .react {
    color: #d66a6a;
    background: #ffeeee;
    text-align: center;
    width: 100px;
    height: 30px;
    border-radius: var(--borderRadius);
  }
`;
export default Wrapper;
