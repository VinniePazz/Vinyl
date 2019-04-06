import React, { Component } from "react";
import Dropzone from "react-dropzone";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CircularProgress from '@material-ui/core/CircularProgress';

class Fileupload extends Component {

  showUploadedImages = () =>
    this.props.images.map(item => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.props.handleRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{ background: `url(${item.url}) no-repeat` }}
        />
      </div>
    ));

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              accept="image/jpeg, image/png, image/gif, image/bmp"
              onDrop={e => this.props.handleDrop(e)}
              multiple={false}
              className="dropzone_box"
            >
              <div className="wrap">
                <FontAwesomeIcon icon="plus-circle" />
              </div>
            </Dropzone>
            {this.showUploadedImages()}
            {this.props.uploading && (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "60px"
                }}
              >
                <CircularProgress style={{ color: "#777777" }} thickness={6} />
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default Fileupload;
