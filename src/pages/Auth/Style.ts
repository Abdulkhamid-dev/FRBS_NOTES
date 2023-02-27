import styled from "styled-components";
import bgImg from "../../assets/img/login_bg.jpg";

const StyledSign = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${bgImg});
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 400px;
    padding: 10px 15px;
    background-color: rgb(225, 225, 225);
    border-radius: 6px;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      max-width: 220px;
    }
  }
  .form-block {
  }
  .MuiFormControl-root {
    width: 100%;
  }
  .link {
    margin: 5px 0 0;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export { StyledSign };
