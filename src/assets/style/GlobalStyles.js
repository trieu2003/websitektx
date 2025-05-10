import { createGlobalStyle } from 'styled-components';

// Tạo global styles để áp dụng cho toàn bộ trang
const GlobalStyles = createGlobalStyle`
  body {
    // font-family: 'DM Sans', sans-serif;  /* Thay font chữ ở đây */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #111111;  /* Thêm màu nền cho toàn trang */
    color: #ffffff;  /* Màu chữ mặc định */
  }

  * {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }
`;

export default GlobalStyles;
