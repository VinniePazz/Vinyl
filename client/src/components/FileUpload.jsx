import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import CircularProgress from "@material-ui/core/CircularProgress";

const DropzoneContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #8080802e;
  height: 30vh;
  overflow: auto;

  .dropzone {
    height: 100%;
		width: 25%;
		border: none;
  }

  @media (max-width: 900px) {
    .dropzone {
      width: 35%;
    }
	}
	
	@media (max-width: 700px) {
    .dropzone {
      width: 40%;
    }
	}
	
	@media (max-width: 550px) {
    .dropzone {
      width: 50%;
    }
  }
`;

const StyledDropZone = styled.div`
  background: #e76f51;
  cursor: pointer;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.15s ease-out;

  p {
    color: #ffffff;
		text-align: center;
		padding: 1em;
  }

  &:hover {
    background-color: #b94e33;
  }
`;

const ImageBox = styled.div`
  width: 20%;
  height: 100%;
  padding: 0.8em;
  position: relative;

  button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transition: all 0.2s ease;
    opacity: 0;
    padding: 0.5em;
    transform: translate(-50%, -50%);
  }

  div {
    width: 100%;
    height: 100%;
    background-image: ${({ image }) => `url(${image})`};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.2s ease;
  }

  &:hover {
    button {
      opacity: 1;
    }
    div {
      background-image: ${({ image }) =>
        `linear-gradient(to bottom, #000000a1, #000000a1), url(${image})`};
    }
  }
`;

class Fileupload extends Component {
  showUploadedImages = () =>
    this.props.images.map(item => (
      <ImageBox
        key={item.public_id}
        onClick={() => this.props.handleRemove(item.public_id)}
        image={item.url}
      >
        <div />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.props.handleRemove(item.public_id)}
        >
          <DeleteIcon />
        </Button>
      </ImageBox>
    ));

  render() {
    return (
      <DropzoneContainer>
        <Dropzone
          accept="image/jpeg, image/png, image/gif, image/bmp"
          onDrop={e => this.props.handleDrop(e)}
          multiple={false}
					className="dropzone"
        >
          <StyledDropZone>
            <p>click to upload image</p>
          </StyledDropZone>
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
            <CircularProgress style={{ color: "#e76f51" }} thickness={6} />
          </div>
        )}
      </DropzoneContainer>
    );
  }
}

const styles = theme => ({
  remove: {}
});

export default withStyles(styles)(Fileupload);
