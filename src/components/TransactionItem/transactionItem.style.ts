import styled from 'styled-components';

export const Wrapper = styled.div`
  outline: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    outline: 1px solid wheat;
    display: flex;
    width: 80%;

    .logo {
      outline: 1px solid green;
      padding: 14px;
    }

    p {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
`;
