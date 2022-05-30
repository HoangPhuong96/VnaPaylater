import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ImageTintColor from "../../components/ImageTintColor";

import "../";
import { LanguageContext } from "../../provider/LanguageProvider";
import { PageWrapper, H1, CardView, H5 } from "../../assets/styled";
import icons from "../../assets/icons";
import colors from "../../assets/colors";

const HomePage = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <PageWrapper>
      <Row className="row-content">
        <Col sm={12} md={12} lg={7}>
          <CardView>
            <H1 weight={"semibold"}>{dictionary.title} </H1>
            <div className="sub-row">
              <ImageTintColor
                src={icons.icon_fast}
                color={colors.primary}
                className="icon"
              />
              <span className="sub-text">{dictionary.sub1}</span>
            </div>
            <div className="sub-row">
              <ImageTintColor
                src={icons.icon_fast}
                color={colors.primary}
                className="icon"
              />
              <span className="sub-text">{dictionary.sub2}</span>
            </div>
            <div className="sub-row">
              <ImageTintColor
                src={icons.icon_fast}
                color={colors.primary}
                className="icon"
              />
              <span className="sub-text">{dictionary.sub3}</span>
            </div>
          </CardView>
        </Col>
        <Col sm={12} md={12} lg={5}>
          <CardView className="card-input">
            <H5 weight={"semibold"}>{dictionary.titleCardInput}</H5>
            <hr />
            <p>{dictionary.bookingCode}</p>
            <div>
              <input className="booking-code-input" />
            </div>
            <div className="submit-button-section">
              <button className="submit-button">{dictionary.continue}</button>
            </div>
          </CardView>
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default HomePage;
