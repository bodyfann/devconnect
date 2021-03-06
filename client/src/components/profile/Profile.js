import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';
import NotFound from '../not-found/NotFound';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (loading) {
      profileContent = <Spinner />;
    } else if (profile === null) {
      profileContent = <NotFound />;
    } else {
      /*if (profile === null || loading) {
      profileContent = <Spinner />;
    } else { */
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <button
                onClick={this.goBack}
                className="btn btn-light mb-3 float-left"
              >
                Go Back
              </button>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
