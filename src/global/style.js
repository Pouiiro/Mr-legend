import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Poppins|Roboto|Roboto+Condensed|Roboto+Mono&display=swap');
html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;

  }

  body {
    margin: 0;
    overflow: scroll;
    overflow-x: hidden; 
    background-color: #fff !important;
  
  ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
    }
  ::-webkit-scrollbar-thumb {
    background: #FF0000;
    }
  }
`
export default GlobalStyles
