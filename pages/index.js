/* eslint-disable jsx-a11y/alt-text */
import { useContext, useState, useEffect, useReducer } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import { LanguageContext } from "../src/provider/LanguageProvider";
import { PageWrapper, H1, CardView, H5, H3 } from "../src/assets/styled";
import icons from "../src/assets/icons";
import colors from "../src/assets/colors";
import Image from "next/image";
import styled from "styled-components";
import images from "../src/assets/images";
import BgImage from "../src/assets/images/bg-artboard-mask.png";
import { MyVerticallyCenteredModal } from "../src/components/Modal";
import { useRouter } from "next/router";
import  ModalError  from "./common/ModalError";
import CallApi from "../src/service/mainApi";
import { get } from "lodash";

const ButtonContinue = styled.button`
  margin-bottom: 0px !important;
  font-weight: 600;
  font-size: 16px;
  ${(props) => (props.backgroundColor ? `margin-right` : `margin-left`)};
`;

const initialState = {
  loading: true,
  resultCode: -1,
  resultMessage: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_PAYMENT":
      return { ...state, loading: false };
    case "REQUEST_PAYMENT_SUCCESS": {
      const res = action.response;
      console.log("actionnn", res);
      return {
        ...state,
        resultCode: res.resultCode,
        resultMessage: res.resultMessage,
        loading: true,
      };
    }
    default:
      return state;
  }
};

const Home = () => {
  const { dictionary, userLanguage } = useContext(LanguageContext);
  const [value, setValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorCode, setErrorCode] = useState(false);
  const [result, setResult] = useState({});
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  // Update header text
  function validate(text) {
    var regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(text) && text.length === 6) {
      return true;
    }
    return false;
  }

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const getData = (bookingCode) => {
    setLoaded(true);
    CallApi.getInfoTicket({
      bookingCode: bookingCode,
      userLanguage: userLanguage,
    })
      .then((response) => {
        console.log("response Home ", response);
        setLoaded(false);
        const resultCode = get(response, "resultCode", "");
        const resultMessage = get(response, "resultMessage", "");
        if (resultCode === 0) {
          setLoaded(false);
          router.push(`./detail?pnr=${value}`, `./detail?pnr=${value}`);
        } else {
          setModalShow(true);
        }
        setResult({
          resultCode,
          resultMessage,
        });
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoaded(false);
      });
  };

  const onClick = async () => {
    if (!validate(value)) {
      setErrorCode(true);
    } else {
      setErrorCode(false);
      getData(value);
    }
  };

  return (
    <div
      style={{ backgroundColor: !loaded ? "transparent" : "rgba(0,0,0,0.1)" }}
    >
      <>
        <Modal
          show={loaded}
          centered
          aria-labelledby="contained-modal-title-vcenter"
          contentClassName={styles["content-modal-loading"]}
        >
          <div style={{ backgroundColor: "transparent" }}>
            <Modal.Body
              className={styles["content-modal"]}
              style={{
                alignSelf: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div className={styles["content-modal"]}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </Modal.Body>
          </div>
        </Modal>
        <div className={styles["Page-Wrapper-Home"]}>
          <Row className={styles["row-content"]}>
            <Col
              xs={12}
              sm={5}
              md={5}
              lg={5}
              style={{ alignSelf: "center", padding: 10 }}
            >
              <FlexEnd>
                <div className={styles["content"]}>
                  <H3 weight={"semibold"} style={{ paddingBottom: 10 }}>
                    {dictionary.title}
                  </H3>
                  <div className={styles["sub-row"]}>
                    <Image src={icons.icon_checklist} color={colors.primary} />
                    <span className={styles["sub-text"]}>
                      {dictionary.sub1}
                    </span>
                  </div>
                  <div className={styles["sub-row"]}>
                    <Image src={icons.icon_money} color={colors.primary} />
                    <span className={styles["sub-text"]}>
                      {dictionary.sub2}
                    </span>
                  </div>
                  <div className={styles["sub-row"]}>
                    <Image src={icons.icon_security} color={colors.primary} />
                    <span className={styles["sub-text"]}>
                      {dictionary.sub3}
                    </span>
                  </div>
                </div>
              </FlexEnd>
            </Col>
            <Col xs={12} sm={7} md={7} lg={7}>
              <div className={styles["container-card-input"]}>
                <Image src={images.bg_artboard_mask} />
                <div className={styles["content-card-input"]}>
                  <H5
                    weight={"semibold"}
                    style={{
                      textAlign: "center",
                    }}
                    className="m-auto"
                  >
                    {dictionary.titleCardInput}
                  </H5>
                  <div className={styles["container-input"]}>
                    <p className={styles["title-input"]}>
                      {dictionary.bookingCode}
                    </p>
                    <input
                      type="text"
                      className={styles["booking-code-input"]}
                      placeholder={`${dictionary.example}: VHNKLI`}
                      required
                      value={value}
                      onChange={onChange}
                      style={{
                        border: errorCode
                          ? "solid 1px red"
                          : "solid 1px #e8e8e8",
                      }}
                    />
                  </div>
                  {errorCode && (
                    <TextError>{dictionary.txtErrorBookingCode}</TextError>
                  )}
                  <div className={styles["submit-button-section"]}>
                    <button
                      className={styles["submit-button"]}
                      disabled={!value}
                      onClick={onClick}
                      style={{
                        backgroundColor: value ? "#a60064" : "#f0f0f0",
                      }}
                    >
                      <span
                        style={{
                          color: value ? "#fff" : "#b9b9b9",
                          fontWeight: "bold",
                          lineHeight: 2,
                        }}
                      >
                        {dictionary.continue}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Container className={styles["container-mobile"]}>
          <div className={styles["background-image-input-mobile"]}>
            <Col style={{ height: 24 }}></Col>
            <CardView className={styles["card-input-mobile"]}>
              <div className={styles["content-card-input-mobile"]}>
                <H5
                  weight={"semibold"}
                  style={{
                    textAlign: "center",
                  }}
                >
                  {dictionary.titleCardInput}
                </H5>
                <div className={styles["container-input"]}>
                  <p className={styles["title-input"]}>
                    {dictionary.bookingCode}
                  </p>
                  <input
                    type="text"
                    className={styles["booking-code-input"]}
                    placeholder="Ví dụ: VHNKLI"
                    required
                    value={value}
                    onChange={onChange}
                    style={{
                      border: errorCode ? "solid 1px red" : "solid 1px #e8e8e8",
                    }}
                  />
                  {errorCode && (
                    <TextError style={{ paddingRight: 0 }}>
                      {dictionary.txtErrorBookingCode}
                    </TextError>
                  )}
                </div>
                <div className={styles["submit-button-section"]}>
                  <button
                    className={styles["submit-button"]}
                    disabled={!value}
                    onClick={onClick}
                    style={{
                      backgroundColor: value ? "#a60064" : "#f0f0f0",
                    }}
                  >
                    <span
                      style={{
                        color: value ? "#fff" : "#b9b9b9",
                        fontWeight: "bold",
                        lineHeight: 2,
                      }}
                    >
                      {dictionary.continue}
                    </span>
                  </button>
                </div>
              </div>
            </CardView>
          </div>
        </Container>
        <ModalError
          show={modalShow}
          message={result.resultMessage}
          onHide={() => setModalShow(false)}
        />
      </>
    </div>
  );
};

export default Home;

const FlexEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TextError = styled.div`
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 1.33;
  color: #f5222d;
  position: absolute;
  padding-right: 30px;
`;
