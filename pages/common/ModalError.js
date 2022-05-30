/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { Button, Carousel, Modal } from "react-bootstrap";
import icons from "../../src/assets/icons";
import styled from "styled-components";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
export const ModalError = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName={styles["modal-content"]}
      dialogClassName={styles["dialog-content"]}
    >
      <Modal.Body
        style={{
          alignSelf: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -25,
            right: -15,
          }}
        >
          <Image
            src={icons.icon_close}
            width={30}
            height={30}
            onClick={props.onHide}
          />
        </div>
        <TxtHeader>Đã có lỗi xảy ra</TxtHeader>
        <TxtBottom>{props.message}</TxtBottom>
        <TxtFooter onClick={props.onHide}>ĐÃ HIỂU</TxtFooter>
      </Modal.Body>
    </Modal>
  );
};

const TxtHeader = styled.p`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.38;
  color: #303233;
`;

const TxtBottom = styled.p`
  font-size: 16px;
  line-height: 1.38;
  color: #303233;
`;

const TxtFooter = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.38;
  text-align: right;
  color: #c1177c;
`;
