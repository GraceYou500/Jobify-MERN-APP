import styled from 'styled-components'

const Wrapper = styled.section`
 .hobbies-container {
    display:flex;
    flex-wrap: wrap;
    background-color:var(--grey-50);
    width: 480.69px;
    min-height: 35px;
    margin-bottom:2px;
    border:1px solid var(--grey-200);
    border-radius: var(--borderRadius);
 }

 .input-container {
  position: relative;
 }

 .hobbies-inputfield {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0.5rem;
    column-gap: 1rem;
 }

 .dropdown-container {
  width: 480.69px;
  height: 180px;
  background-color:var(--grey-50);
  border:1px solid var(--grey-200);
  position: absolute;
  top: 40px;
  z-index:1000;
  overflow: auto;
 }

 .dropdown-hide {
  display: none
 }

 .hobby-option {
  padding-left:12px;
 }
 .hobby-option:hover {
  cursor: pointer;
  background-color:var(--grey-200);
 }
 .hobby-item {
  margin: 6px 8px;
  padding: 3px;
  min-width: 67px;
  position:relative;
  border:1px solid var(--grey-200);
  border-radius: var(--borderRadius);
 }
 .delete-btn {
  width: 16px;
  height:16px;
  text-align: center;
  line-height: 12px;
  border-radius:50%;
  border:1px solid var(--grey-200);
  background-color: var( --red-light);
  color: var(--red-dark);
  position: absolute;
  top: -5px;
  right: -5px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
 }
 .delete-btn:hover {
  width: 18px;
  height:18px;
  background-color: var(--red-midium);
 }
`

export default Wrapper