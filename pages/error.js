/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import styles from "../styles/Detail.module.css";
import styled from "styled-components";
import Image from "next/image";
import icons from "../src/assets/icons";
import { LanguageContext } from "../src/provider/LanguageProvider";

const error = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className={styles["Page-Wrapper"]}>
      <ERContainer>
        <div style={{ textAlign: "center" }}>
          <Image src={icons.icon_dir_error} width={120} height={120} />
          <Title>{dictionary.titleError1}</Title>
          <Title1>{dictionary.titleError2}</Title1>
        </div>
      </ERContainer>
    </div>
  );
};

const ERContainer = styled.div`
  border-radius: 8px;
  border: solid 1px #e8e8e8;
  background-color: #fff;
  height: 684px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #303233;
  letter-spacing: 0.5px;
`;

const Title1 = styled.div`
  font-size: 14px;
  color: #727272;
`;

export default error;
