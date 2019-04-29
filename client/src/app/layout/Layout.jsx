import React, { Component } from "react";
import throttle from "lodash.throttle";
import styled from "styled-components";

import Header from "../../components/Header_footer/Header/Header";
import Footer from "../../components/Header_footer/Footer/Footer";

const PageContainer = styled.div`
  margin-top: 4em;
`;

class Layout extends Component {
  state = {
    header: "default"
  };

	scrollTop = 0;

  handleScroll = throttle((e) => {

    if (this.scrollTop >= 100 && window.pageYOffset > this.scrollTop) {
      this.setState({ header: 'hidden' });
		}
		
    if ( window.pageYOffset < this.scrollTop && this.scrollTop !== 0) {
      this.setState({ header: 'showedOnScroll' });
		}
		
    if ( window.pageYOffset === 0) {
      this.setState({ header: 'default' });
    }

		this.scrollTop = window.pageYOffset;

  }, 200);

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  render() {
    const { header } = this.state;
    return (
      <>
        <Header header={header} />
        <PageContainer>{this.props.children}</PageContainer>
        <Footer />
      </>
    );
  }
}

export default Layout;
