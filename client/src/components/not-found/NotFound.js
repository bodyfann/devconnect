import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NotFound extends Component {
  render() {
    // Return error only if we are not in "/"
    let returnCode = '';
    if (this.props.location.pathname !== '/') {
      returnCode = (
        <div>
          <h1 className="display-4">Page Not Found</h1>
          <p>Sorry, this page does not exist</p>
        </div>
      );
    }
    return returnCode;
  }
}
export default withRouter(NotFound);
