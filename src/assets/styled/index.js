import styled from "styled-components";

export const PageWrapper = styled.div`
  margin: 20px 166px 20px 166px;
`;

export const H1 = styled.h1`
  font-weight: ${(props) => {
    switch (props.weight) {
      case "semibold":
        return 600;
      case "bold":
        return 700;
      default:
        return 400;
    }
  }};
`;

export const H3 = styled.h3`
  font-weight: ${(props) => {
    switch (props.weight) {
      case "semibold":
        return 600;
      case "bold":
        return 700;
      default:
        return 400;
    }
  }};
`;

export const H4 = styled.h4`
  font-weight: ${(props) => {
    switch (props.weight) {
      case "semibold":
        return 600;
      case "bold":
        return 700;
      default:
        return 400;
    }
  }};
`;

export const H5 = styled.h5`
  font-weight: ${(props) => {
    switch (props.weight) {
      case "semibold":
        return 600;
      case "bold":
        return 700;
      default:
        return 400;
    }
  }};
`;

export const CardView = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 0.1em #e8e8e8;
  padding: 20px;
`;
