/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { Button, Carousel, Modal } from "react-bootstrap";
import icons from "../../assets/icons";
import styled from "styled-components";
import styles from "../../../styles/Detail.module.css";
import { useState } from "react";
export const MyVerticallyCenteredModal = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{
          position: "relative",
          borderBottom: "none",
          justifyContent: "center",
        }}
      >
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ justifyContent: "center" }}
        >
          Hướng dẫn thanh toán
        </Modal.Title>
        <div
          style={{
            position: "absolute",
            top: -10,
            right: -10,
          }}
        >
          <Image
            src={icons.icon_close}
            width={24}
            height={24}
            onClick={props.onHide}
          />
        </div>
      </Modal.Header>
      <div className={styles["step-by"]}>
        <ButtonCircle type="button">
          <TxtButton>1</TxtButton>
        </ButtonCircle>
        <Line />
        <ButtonCircle type="button">
          <TxtButton>2</TxtButton>
        </ButtonCircle>
        <Line bgColor3 />
        <ButtonCircle type="button">
          <TxtButton>3</TxtButton>
        </ButtonCircle>
      </div>

      <Modal.Body
        style={{
          alignSelf: "center",
          marginBottom: 20,
          justifyContent: "center",
        }}
      >
        {/*For Web*/}
        <div className={styles["content-modal"]}>
          <Image src={icons.icon_mockup1} />
          <Space />
          <Image src={icons.icon_mockup2} />
          <Space />
          <Image src={icons.icon_mockup3} />
        </div>

        {/*For Mobile*/}
        <Carousel
          className={styles["carousel"]}
          activeIndex={index}
          onSelect={handleSelect}
          nextIcon={<></>}
          prevIcon={<></>}
        >
          <Carousel.Item>
            <Image src={icons.icon_mockup1} />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={icons.icon_mockup2} />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={icons.icon_mockup3} />
          </Carousel.Item>
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};

const Space = styled.p`
  width: 40px;
`;

const ButtonCircle = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 15px;
  text-align: center;
  border: none;
  background-color: #d82d8b;
  align-self: center;
  line-height: 1px;
`;

const TxtButton = styled.span`
  color: #fff;
`;

const Line = styled.div`
  margin: 10px 20px 10px 22px;
  border-radius: 2.5px;
  background-color: ${(props) => (props.bgColor3 ? " #e8e8e8" : "#ffd6e7")};
  height: 4px;
  width: 100px;
`;
