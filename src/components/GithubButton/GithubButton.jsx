import React from 'react';
import PropTypes from 'prop-types';
import GithubService from '../../service/GithubDetail.services';
import Icon from '../Icon/Icon';

class GithubButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: null
    };
  }

  componentWillMount() {
    const { btnType, showCounter, showBtnText, showGithubIcon, repository, username } = this.props;
    this.setState({
      showCounter,
      btnType,
      showBtnText,
      showGithubIcon
    });
    if (btnType === 'fork' || btnType === 'star' || btnType === 'watch' || btnType === 'issue') {
      GithubService.getRepositoriesStats(username, repository)
        .then(res => {
          if (btnType === 'fork')
            this.setState({
              counter: res.forks_count,
              iconClass: 'fa fa-code-fork',
              linkUrl: `https://github.com/${username}/${repository}/fork`
            });
          if (btnType === 'star')
            this.setState({
              counter: res.stargazers_count,
              iconClass: 'fa fa-star',
              linkUrl: `https://github.com/${username}/${repository}`
            });
          if (btnType === 'watch')
            this.setState({
              counter: res.watchers_count,
              iconClass: 'fa fa-eye',
              linkUrl: `https://github.com/${username}/${repository}/subscription`
            });
          if (btnType === 'issue')
            this.setState({
              counter: res.open_issues_count,
              iconClass: 'fa fa-exclamation-circle',
              linkUrl: `https://github.com/${username}/${repository}/issues`
            });
        })
        .catch(err => err);
    }
    if (btnType === 'follow') {
      GithubService.getUserFallowers(username)
        .then(res => {
          this.setState({
            counter: res.length,
            iconClass: 'fa fa-github',
            linkUrl: `https://github.com/${username}`
          });
        })
        .catch(err => err);
    }

    if (btnType === 'download') {
      this.setState({
        counter: null,
        showCounter: false,
        iconClass: 'fa fa-cloud-download',
        linkUrl: `https://api.github.com/repos/${username}/${repository}/archive/master.zip`
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { showCounter, showGithubIcon, showBtnText, btnType } = this.state;
    const { username, repository } = this.props;
    if (nextProps.showCounter !== showCounter) {
      this.setState({ showCounter: nextProps.showCounter });
    }
    if (nextProps.showGithubIcon !== showGithubIcon) {
      this.setState({ showGithubIcon: nextProps.showGithubIcon });
    }

    if (nextProps.showBtnText !== showBtnText) {
      this.setState({ showBtnText: nextProps.showBtnText });
    }

    if (nextProps.btnType !== btnType) {
      this.setState({
        showCounter: nextProps.showCounter,
        btnType: nextProps.btnType,
        counter: null,
        showBtnText: nextProps.showBtnText
      });

      if (
        nextProps.btnType === 'fork' ||
        nextProps.btnType === 'star' ||
        nextProps.btnType === 'watch' ||
        nextProps.btnType === 'issue'
      ) {
        GithubService.getRepositoriesStats(nextProps.username, nextProps.repository)
          .then(res => {
            if (nextProps.btnType === 'fork')
              this.setState({
                counter: res.forks_count,
                iconClass: 'fa fa-code-fork',
                linkUrl: `https://github.com/${username}/${repository}/fork`
              });
            if (nextProps.btnType === 'star')
              this.setState({
                counter: res.stargazers_count,
                iconClass: 'fa fa-star',
                linkUrl: `https://github.com/${username}/${repository}`
              });
            if (nextProps.btnType === 'watch')
              this.setState({
                counter: res.watchers_count,
                iconClass: 'fa fa-eye',
                linkUrl: `https://github.com/${username}/${repository}/subscription`
              });
            if (nextProps.btnType === 'issue')
              this.setState({
                counter: res.open_issues_count,
                iconClass: 'fa fa-exclamation-circle',
                linkUrl: `https://github.com/${username}/${repository}/issues`
              });
          })
          .catch(err => err);
      }
      if (nextProps.btnType === 'follow') {
        GithubService.getUserFallowers(nextProps.username)
          .then(res => {
            this.setState({
              counter: res.length,
              iconClass: 'fa fa-github',
              linkUrl: `https://github.com/${username}`
            });
          })
          .catch(err => err);
      }

      if (nextProps.btnType === 'download') {
        this.setState({
          counter: null,
          showCounter: false,
          iconClass: 'fa fa-cloud-download',
          linkUrl: `https://api.github.com/repos/${username}/${repository}/archive/master.zip`
        });
      }
    }
  }

  render() {
    const { linkUrl, showGithubIcon, iconClass, showBtnText, showCounter, counter } = this.state;
    const { btnText } = this.props;
    return (
      <div className="GithubDetail_btn_container d-inline">
        <a
          className="btn GithubDetail_btn"
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={showGithubIcon ? 'fa fa-github' : iconClass} aria-hidden="true" />{' '}
          {showBtnText && <span className="buttonText">{btnText}</span>}
        </a>
        {showCounter && (
          <span className="speech-bubble">
            {counter != null ? (
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                {' '}
                {counter}{' '}
              </a>
            ) : (
              <Icon icon="fa fa-circle-o-notch fa-spin" />
            )}
          </span>
        )}
      </div>
    );
  }
}

GithubButton.propTypes = {
  showCounter: PropTypes.bool,
  showBtnText: PropTypes.bool,
  showGithubIcon: PropTypes.bool,
  username: PropTypes.string,
  repository: PropTypes.string,
  btnType: PropTypes.string,
  btnText: PropTypes.string
};

GithubButton.defaultProps = {
  showCounter: true,
  showBtnText: true,
  showGithubIcon: false,
  username: 'chubin',
  repository: 'cheat.sh',
  btnType: 'fork',
  btnText: 'Fork'
};

export default GithubButton;