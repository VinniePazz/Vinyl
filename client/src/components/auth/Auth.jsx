import React, { Component } from "react";
import { connect } from "react-redux";

import { auth } from "../../actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    async componentDidMount() {
			await this.props.auth();
			
      let user = this.props.user.userData;

      if (!user.isAuth) {
        if (reload) {
          this.props.history.push("/register");
        }
      } else {
        if (adminRoute && !user.isAdmin) {
          this.props.history.push("/user/dashboard");
        } else {
          if (reload === false) {
            this.props.history.push("/user/dashboard");
          }
        }
      }
      this.setState({ loading: false });
    }

    render() {
      if (this.state.loading) {
        return (
          <div style={{textAlign: 'center', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress color="secondary" thickness={4} style={{marginTop: '-64px'}} />
          </div>
        );
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(
    mapStateToProps,
    { auth }
  )(AuthenticationCheck);
}
