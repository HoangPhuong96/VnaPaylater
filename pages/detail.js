/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import { QRCode } from "react-qrcode-logo";
import { get } from "lodash";

import icons from "../src/assets/icons";
import styles from "../styles/Detail.module.css";
import styled from "styled-components";
import { MyVerticallyCenteredModal } from "../src/components/Modal";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../src/provider/LanguageProvider";
import CallApi from "../src/service/mainApi";

const dataCustomer = [
  {
    name: "NGUYEN/HOANG",
    code: "2V2468",
  },
  {
    name: "NGUYEN/AN",
    code: "2V2468",
  },
  {
    name: "NGUYEN/B",
    code: "2V2468",
  },
];

const initialState = {
  totalPayment: "1.983.000",
  ticketFrom: {
    nameFrom: "TP.Hồ Chí Minh",
    nameTo: "Huế",
    codeFrom: "SGN",
    codeTo: "HUI",
    dateStart: "6:00, 26/03/2022",
    dateEnd: "8:00, 26/03/2022",
  },

  ticketTo: {
    nameFrom: "Huế",
    nameTo: "TP.Hồ Chí Minh",
    codeFrom: "HUI",
    codeTo: "SGN",
    dateStart: "6:00, 26/03/2022",
    dateEnd: "8:00, 26/03/2022",
  },

  dataCustomer: dataCustomer,
  dataTest: [],
  loading: true,
};

const TicketDetail = () => {
  const router = useRouter();
  const { pnr } = router.query;
  const [modalShow, setModalShow] = useState(false);
  const { dictionary, userLanguage } = useContext(LanguageContext);
  const [loaded, setLoaded] = useState(false);
  const [dataShow, setDataShow] = useState({});
  const getData = async ({ bookingCode }) => {
    CallApi.getInfoTicket({
      bookingCode: bookingCode,
      userLanguage: userLanguage,
    })
      .then((response) => {
        console.log("response", response);
        const departureCity = get(response, "departureCityName", "");
        const arrivalCity = get(response, "arrivalCityName", "");
        const departureDateTime = get(response, "departureDateTime", "");
        const arrivalDateTime = get(response, "arrivalDateTime", "");
        const departureDateTimeReturn = get(
          response,
          "departureDateTimeReturn",
          ""
        );
        const arrivalDateTimeReturn = get(
          response,
          "arrivalDateTimeReturn",
          ""
        );
        const arrivalLocationCode = get(response, "arrivalLocationCode", "");
        const departureLocationCode = get(
          response,
          "departureLocationCode",
          ""
        );
        const passengers = get(response, "passengers", "");
        const pnrCode = get(response, "pnrCode", "");
        const deepLink = get(response, "deepLink", "");
        const totalAmount = get(response, "totalAmount", "");

        setDataShow({
          departureCity,
          arrivalCity,
          departureDateTime,
          arrivalDateTime,
          departureDateTimeReturn,
          arrivalDateTimeReturn,
          arrivalLocationCode,
          departureLocationCode,
          passengers,
          pnrCode,
          deepLink,
          totalAmount,
        });
        setLoaded(true);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (pnr) {
      getData({ bookingCode: pnr });
    }
  }, [pnr]);

  const LineAir = () => {
    return (
      <Flex
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Flex style={{ width: 53 }}>
          <Line2 />
          <Line2 />
          <Line2 />
          <Line2 />
          <Line2 />
          <Line2 />
        </Flex>
        <Image src={icons.icon_airplane} width={32} height={32} />
        <Flex style={{ width: 53 }}>
          <Line2 />
          <Line2 />
          <Line2 />
          <Line2 />
          <Line2 />
          <Line2 />
        </Flex>
      </Flex>
    );
  };

  const FieldInfoTicket = ({ isBack = false }) => {
    const leftLocation = isBack
      ? dataShow?.arrivalCity
      : dataShow?.departureCity;
    const rightLocation = isBack
      ? dataShow?.departureCity
      : dataShow?.arrivalCity;
    const leftCode = isBack
      ? dataShow?.arrivalLocationCode
      : dataShow?.departureLocationCode;
    const rightCode = isBack
      ? dataShow?.departureLocationCode
      : dataShow?.arrivalLocationCode;
    const leftDateTime = isBack
      ? dataShow?.departureDateTimeReturn
      : dataShow?.departureDateTime;
    const rightDateTime = isBack
      ? dataShow?.arrivalDateTimeReturn
      : dataShow?.arrivalDateTime;

    return (
      <>
        <TitleFlex>
          <Txt>{leftLocation}</Txt>
          <Txt>{rightLocation}</Txt>
        </TitleFlex>
        <TitleFlex>
          <TxtCode>{leftCode}</TxtCode>
          {LineAir()}
          <TxtCode>{rightCode}</TxtCode>
        </TitleFlex>
        <TitleFlex>
          <TxtDate>{leftDateTime}</TxtDate>
          <TxtDate>{rightDateTime}</TxtDate>
        </TitleFlex>
        <Line1 />
      </>
    );
  };

  const FieldInfoPassenger = () => {
    return (
      <div style={{ position: "relative" }}>
        <div className={styles["curve-half-circle-left-m"]}></div>
        <div className={styles["curve-half-circle-right-m"]}></div>

        <TitleFlex>
          <Txt>{dictionary.passengers}</Txt>
          <Txt>{dictionary.bookingCode}</Txt>
        </TitleFlex>
        <TitleFlex>
          <div style={{ display: "grid" }}>
            {dataShow.passengers &&
              dataShow.passengers.map((item, index) => {
                return <TxtDate key={index.toString()}>{item}</TxtDate>;
              })}
          </div>
          <TxtDate>{dataShow?.pnrCode}</TxtDate>
        </TitleFlex>
        <Line1 />
      </div>
    );
  };

  const onClickPayment = () => {
    router.push(dataShow?.deepLink);
  };

  return (
    <div className={styles["Page-Wrapper"]}>
      {loaded ? (
        <div>
          <Row>
            <Col xs={12} sm={12} md={7} lg={7}>
              <div className={styles["Col-Qr"]}>
                <QRContainer>
                  <div>
                    <p className={styles["title-info-ticket"]}>
                      {dictionary.scanQRtoPay}
                    </p>
                    <p className={styles["test"]}>{dictionary.scanTutorial}</p>
                    <QRCode
                      value={dataShow?.deepLink}
                      logoImage={
                        "https://img.mservice.com.vn/app/img/ota/airline/icon_momo.png"
                      }
                      size={300}
                    />
                  </div>
                </QRContainer>
              </div>
            </Col>
            <Col xs={12} sm={12} md={5} lg={5}>
              <p className={styles["title-info-ticket"]}>
                {dictionary.infoTicket}
              </p>
              <div className={styles["combined-shape"]}>
                <div className={styles["sub-row"]}>
                  <Image
                    src={icons.icon_logo_airline}
                    width={56}
                    height={56}
                    alt={"logo"}
                    layout={"fixed"}
                  />
                  <TitleAirline>Vietnam Airlines</TitleAirline>
                </div>
                <Line />
                <FieldInfoTicket />
                {dataShow?.departureDateTimeReturn &&
                dataShow?.arrivalDateTimeReturn ? (
                  <FieldInfoTicket isBack />
                ) : null}
                <FieldInfoPassenger />
              </div>
              {/* <HR /> */}
              <div
                style={{
                  backgroundColor: "#f6faff",
                  display: "grid",
                  justifyContent: "center",
                  borderRadius: 8,
                  paddingTop: 20,
                  paddingBottom: 20,
                  position: "relative",
                }}
                className={styles["content-total-payment"]}
              >
                <div className={styles["curve-half-circle-left"]}></div>
                <div className={styles["curve-half-circle-right"]}></div>
                <HR />
                <Txt>{dictionary.totalPayment}</Txt>
                <TxtCode>{dataShow?.totalAmount}</TxtCode>
              </div>
              <Flex
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 24,
                }}
              >
                <TxtDiffPaying>{dictionary.txtDiffPaying}</TxtDiffPaying>
                <button
                  onClick={() => setModalShow(true)}
                  className={styles["btn-manual"]}
                >
                  <TxtBtnIntro>{dictionary.checkTutorial}</TxtBtnIntro>
                </button>
              </Flex>
              <FlexBtn
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className={styles["btn-payment"]}
              >
                <ButtonPayment onClick={onClickPayment}>
                  <Flex
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={icons.icon_logo_light}
                      width={24}
                      height={24}
                      alt={"logo"}
                      layout={"fixed"}
                    />
                    <TxtBtnPayment>Thanh toán bằng Momo</TxtBtnPayment>
                  </Flex>
                </ButtonPayment>
              </FlexBtn>
            </Col>
          </Row>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TicketDetail;

const QRContainer = styled.div`
  border: solid 1px #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 8px;
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  text-align: center;
`;

const TitleAirline = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.38;
  color: #303233;
  margin-left: 12px;
`;

const Line = styled.div`
  height: 5px;
  margin: 16px 16px 20px;
  background-color: #e8e8e8;
`;

const Line1 = styled.div`
  height: 1px;
  margin: 12px 0;
  background-color: #d9dde6;
`;

const Line2 = styled.div`
  height: 1px;
  width: 9.5px;
  margin: 18px 4px 17px 1px;
  border: solid 1px #d9dde6;
`;

const TitleFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
`;

const Txt = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: #727272;
  text-decoration: none;
`;

const TxtCode = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #303233;
  text-decoration: none;
`;

const TxtDate = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #303233;
  text-decoration: none;
`;

const HR = styled.hr`
  border-top: 2px dashed #d9dde6;
  background-color: white;
  position: absolute;
  width: 100%;
  top: -18px;
`;

const TxtDiffPaying = styled.p`
  font-size: 14px;
  line-height: 1.43;
  color: #727272;
`;

const TxtBtnIntro = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.29;
  letter-spacing: normal;
  color: #eb2f96;
`;

const FlexBtn = styled.div``;

const ButtonPayment = styled.button`
  border-radius: 8px;
  background-color: #d82d8b;
  border: none;
  width: 100%;
  padding: 12px 0 12px;
`;

const TxtBtnPayment = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.38;
  color: #fff;
  margin-left: 10px;
`;
