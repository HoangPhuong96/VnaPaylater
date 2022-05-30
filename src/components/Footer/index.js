/* eslint-disable jsx-a11y/alt-text */
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import ImageTintColor from "../ImageTintColor";
import icons from "../../assets/icons";
import colors from "../../assets/colors";
import { LanguageContext } from "../../provider/LanguageProvider";
import { useContext } from "react";
import Link from "next/link";

const Footer = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <Container fluid>
      <Row className="footer">
        <Col xs={12} sm={6} md={6} lg={6} className="footer-col-left">
          <div className="sub-row">
            <span className="sub-text">{dictionary.support}</span>
          </div>
          <div className="sub-row">
            <Image src={icons.icon_call_phone} />
            <span className="sub-text-link">1900 54 54 41 (1000đ/phút)</span>
          </div>
          <div className="sub-row">
            <Image src={icons.icon_mail} />
            <a
              href="https://momo.vn/hoi-dap/cach-lien-he-voi-momo"
              className="sub-text-link"
            >
              hotro@momo.vn
            </a>
          </div>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} className="footer-col-right">
          <div className="footer-right">
            <span className="sub-text-download">{dictionary.downloadApp}</span>
            <div className="container-download">
              <a href="https://apps.apple.com/vn/app/id918751511?amp%3Butm_campaign=momo-1dong&amp%3Butm_medium=download&utm_source=website-momo">
                <Image
                  src={require("../../assets/images/download-apple.jpeg")}
                  className="image-download"
                  width="116px"
                  height="36px"
                />
              </a>
              <div style={{ width: 10 }} />
              <a href="https://play.google.com/store/apps/details?id=com.mservice.momotransfer&utm_source=website-momo&utm_medium=download&utm_campaign=momo-1dong">
                <Image
                  src={require("../../assets/images/download-google.jpeg")}
                  className="image-download"
                  width="116px"
                  height="36px"
                />
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
