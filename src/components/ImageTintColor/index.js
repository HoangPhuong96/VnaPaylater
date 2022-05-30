/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import { tintData, isColorful } from "./utils.js";

export default class ImageTintColor extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();

    this.state = {
      src: props.src,
    };
  }

  componentDidMount() {
    this._mounted = true;
    this.applyTint(this.props.src, this.props.color);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.src !== this.props.src) {
      this.applyTint(newProps.src, newProps.color);
    }
  }

  applyTint(src, color) {
    if (!isColorful(src) && this.imgRef.current) {
      const imgElement = this.imgRef.current;

      tintData(imgElement, color, { cache: this.props.cache }).then(
        (src) => this._mounted && this.setState({ src })
      );
    }
  }

  render() {
    return (
      <img
        {...this.props}
        src={this.state.src}
        alt={this.props.alt}
        ref={this.imgRef}
        crossOrigin="anonymous"
      />
    );
  }
}
