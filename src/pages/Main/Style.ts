import styled from "styled-components";

const StyledMain = styled.div`
  .logo-img {
    width: 100px;
    object-fit: cover;
  }
`;

const StyledSider = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .logo {
    width: 120px;
    object-fit: cover;
  }
  a {
    text-decoration: none;
  }
  .active {
    li {
      background-color: #1976d2;
      color: white;
      svg {
        path {
          stroke: white;
        }
      }
    }
  }
  .dis-active {
    color: black;
    cursor: pointer;
    &:hover {
      li {
        background-color: #1976d2;
        color: white;
        svg {
          path {
            stroke: white;
          }
        }
      }
    }
  }
  .exit-content {
    margin-bottom: 10px;
    color: red;
    &:hover {
      background-color: red;
      color: white;
      svg {
        color: white !important;
      }
    }
  }
`;

export { StyledSider, StyledMain };
