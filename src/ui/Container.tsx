import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  text-align: left;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`
