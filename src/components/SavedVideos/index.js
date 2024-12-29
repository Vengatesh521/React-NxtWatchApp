import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaBookmark} from 'react-icons/fa'
import './index.css'
import Header from '../Header'
import RouteHeader from '../RouteHeader'

class SavedVideos extends Component {
  state = {
    savedVideos: [], // Store saved videos in the state
    isLoading: false,
  }

  componentDidMount() {
    this.fetchSavedVideos()
  }

  fetchSavedVideos = () => {
    this.setState({isLoading: true})
    // Fetch saved videos from localStorage
    const savedVideos = JSON.parse(localStorage.getItem('savedVideos')) || []
    this.setState({savedVideos, isLoading: false})
  }

  renderSavedVideos = () => {
    const {savedVideos} = this.state
    if (savedVideos.length === 0) {
      return (
        <div className="no-saved-videos">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no saved videos"
            className="no-videos-image"
          />
          <h1>No Saved Videos</h1>
        </div>
      )
    }

    return (
      <ul className="videos-list">
        {savedVideos.map(video => (
          <Link to={`/videos/${video.id}`} key={video.id}>
            <li className="video-item">
              <img
                src={video.thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail"
              />
              <div className="video-info">
                <img
                  src={video.channel.profile_image_url}
                  alt="profile"
                  className="channel-logo"
                />
                <div>
                  <p className="video-title">{video.title}</p>
                  <p className="channel-name">{video.channel.name}</p>
                  <p className="video-details">{`${video.viewCount} • ${video.publishedAt}`}</p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="container">
          <RouteHeader />
          <div data-testid="savedVideos" className="saved-videos-container">
            <FaBookmark className="nav-icon" />
            <h1>Saved Videos</h1>
            {isLoading ? this.renderLoader() : this.renderSavedVideos()}
          </div>
        </div>
      </>
    )
  }
}

export default SavedVideos
