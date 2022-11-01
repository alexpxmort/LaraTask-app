import styled from "styled-components";
import theme from "../theme/theme";

 const RowContainer = styled.div`
display:flex;
flex-direction:row;
`
 const ColumnContainer = styled.div`
display:flex;
flex-direction:column;
`
 const FlexContainer = styled.div`
display:flex;
flex-direction:column;
`

 const FormLoginContainer = styled.div`
display:flex;
flex-direction:column;
padding:15vw;
background-color:${theme.colors.gray};
justify-content:space-around;



`



export {ColumnContainer,FlexContainer,RowContainer,FormLoginContainer};