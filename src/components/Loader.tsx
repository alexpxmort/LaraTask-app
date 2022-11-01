import React from 'react';
import styled, { css } from 'styled-components';
import {RowContainer } from './Container';


const Loader = ({ ...props }) => {
  return (
    <StyledLoader
      {...props}
      style={{width:'60px',height:'60px'}}
    ></StyledLoader>
  );
};

const StyledLoader = styled(RowContainer)`
  ${({ theme: { colors } }) => css`
    border: 6px solid ${colors.cornFlowerBlue};
    border-radius: 50%;
    border-top: 6px solid ${colors.cobaltBue};
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
`;

export default Loader;