import React from "react";
import styled from "styled-components";

const ToogleButton = styled.div`
  position: relative;
  cursor: pointer;

  height: 1em;
  width: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & div {
    width: 100%;
    height: 2px;
    background-color: #ffffff;
    transform-origin: 45% 50%;
    transition: all 0.2s ease;
  }

	&:hover {
		div {
			background-color: #e76f51;
		}
	}

  .middle {
    background-color: ${({ openDrawer }) =>
      openDrawer ? "transparent" : "#ffffff"};
  }

  .top {
    transform: ${props => props.openDrawer && "translateY(8px) rotate(135deg)"};
  }

  .bottom {
    transform: ${props =>
      props.openDrawer && "translateY(-8px) rotate(-135deg)"};
  }
`;

const MobileToogle = ({ openDrawer, toogleDrawer }) => {
  return (
    <ToogleButton openDrawer={openDrawer} onClick={toogleDrawer}>
      <div className="top" />
      <div className="middle" />
      <div className="bottom" />
    </ToogleButton>
  );
};

export default MobileToogle;
