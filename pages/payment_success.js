/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import styles from "../styles/Detail.module.css";
import styled from "styled-components";
import Image from "next/image";
import icons from "../src/assets/icons";
import { LanguageContext } from "../src/provider/LanguageProvider";
import { useRouter } from "next/router";

const PaymentSuccess = () => {
  const { dictionary } = useContext(LanguageContext);
  const router = useRouter();

  const onGoBackHome = () => {
    router.push("/");
  };

  return (
    <div className={styles["Page-Wrapper"]}>
      <PMSContainer>
        <Flex>
          <Image src={icons.icon_momo} width={56} height={56} />
          <div
            style={{
              margin: 5,
              paddingTop: 10,
            }}
          >
            <Image src={icons.icon_chain} width={24} height={24} />
          </div>
          <Image src={icons.icon_logo_airline} width={56} height={56} />
        </Flex>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <Image src={icons.icon_success} width={130} height={130} />
          <Title>{dictionary.paymentSuccess}</Title>
          <Title1>{dictionary.paymentSuccess1}</Title1>
        </div>
        <Flex style={{ marginTop: 16 }}>
          <BorderTotal>
            <TxtAirline>VietNam Airlines</TxtAirline>
            <TxtPrice>1.983.000đ</TxtPrice>
          </BorderTotal>
        </Flex>
        <Flex>
          <Button onClick={onGoBackHome}>
            <TitleButton>{dictionary.goBackHome}</TitleButton>
          </Button>
        </Flex>
      </PMSContainer>
    </div>
  );
};

const PMSContainer = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Flex = styled.div`
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

const TxtAirline = styled.div`
  font-size: 16px;
  font-weight: normal;
  line-height: 1.38;
  color: #727272;
`;

const TxtPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 1.33;
  color: #303233;
`;

const BorderTotal = styled.div`
  border-radius: 8px;
  border: dashed 1px #d82d8b;
  background-color: #fff;
  width: 223px;
  text-align: center;
  padding: 17px 41px 17px;
`;

const Button = styled.button`
  padding: 15px 30px;
  border-radius: 8px;
  background-color: #d82d8b;
  border-color: transparent;
  margin-top: 32px;
`;

const TitleButton = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.38;
  text-align: center;
  color: #fff;
`;

export default PaymentSuccess;
