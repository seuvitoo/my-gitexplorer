import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
* {
  margin: 0px;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  margin-left: 20px;
}
html, body, #root{
  height: 100%;
}
body {
  font:14px 'Roboto', sans-serif;
  background:#F8F8FF;
  color:#170312;
  -webkit-font-smoothing: antialiased !important;
}
ul {
  list-style: nome;
}
`;