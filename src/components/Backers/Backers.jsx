import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageList from '../ImageList/ImageList';

class Backers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
    this.formatData(this.props);
  }

  componentDidUpdate(prevProps) {
    const { backers } = this.props;
    if (prevProps.backers !== backers) {
      this.formatData(prevProps);
    }
  }

  formatData({ backers }) {
    const back = backers.map(backer => ({
      image: backer.image,
      tooltip: `$${backer.contributionAmount} by ${backer.name}`,
      url: backer.profile
    }));
    this.setState({ backers: back });
  }

  render() {
    const { imageRounded, imageGray, imageBordered } = this.props;
    const { backers } = this.state;
    return (
      <div className="Backers">
        <ImageList
          imageRounded={imageRounded}
          gray={imageGray}
          images={backers}
          imageBordered={imageBordered}
        />
      </div>
    );
  }
}

Backers.propTypes = {
  /**
   * If true the image will be rounded as a circle, default `true`
   */
  imageRounded: PropTypes.bool,
  /**
   * If true the image will have a solid border, default `true`
   */
  imageBordered: PropTypes.bool,
  /**
   * If true the image doesn't show colors, default `false`
   */
  imageGray: PropTypes.bool,
  /**
   * List of backers, default will be empty `[]`.
   */
  backers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      profile: PropTypes.string,
      image: PropTypes.string,
      contributionAmount: PropTypes.number
    })
  )
};
Backers.defaultProps = {
  imageRounded: true,
  imageBordered: true,
  imageGray: false,
  backers: []
};

export default Backers;
