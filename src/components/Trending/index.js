import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import RouteHeader from '../RouteHeader'

class Trending extends Component {
  state = {
    videos: [],
    isLoading: false,

    apiStatus: 'INITIAL', // 'SUCCESS', 'FAILURE', 'EMPTY'
  }

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async () => {
    this.setState({isLoading: true, apiStatus: 'INITIAL'})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      if (data.videos.length === 0) {
        this.setState({apiStatus: 'EMPTY', isLoading: false})
      } else {
        this.setState({
          videos: data.videos,
          apiStatus: 'SUCCESS',
          isLoading: false,
        })
      }
    } else {
      this.setState({apiStatus: 'FAILURE', isLoading: false})
    }
  }

  renderVideos = () => {
    const {videos} = this.state
    return (
      <ul className="videos-list">
        {videos.map(video => (
          <Link to={`/videos/${video.id}`}>
            <li key={video.id} className="video-item">
              <img
                src={video.thumbnail_url}
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
                  <p className="video-details">{`${video.view_count} • ${video.published_at}`}</p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble completing your request. Please try again.
      </p>
      <button type="button" onClick={this.fetchVideos} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderEmptyView = () => (
    <div className="no-videos-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="no-videos-image"
      />
      <h1>No Search Results Found</h1>
      <p>Try different keywords or remove filters</p>
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderVideos()
      case 'FAILURE':
        return this.renderFailureView()
      case 'EMPTY':
        return this.renderEmptyView()
      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />
        <div className="container">
          <RouteHeader />
          <div data-testid="trending" className="home-container">
            <FaFire className="nav-icon" />
            <h1>Trending</h1>
            <div className="videos-container">
              {isLoading ? this.renderLoader() : this.renderContent()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Trending
