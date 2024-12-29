import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {FaThumbsUp, FaThumbsDown, FaBookmark} from 'react-icons/fa'
import Header from '../Header'
import RouteHeader from '../RouteHeader'
import './index.css'

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    isLoading: true,
    hasError: false,
    like: false,
    dislike: false,
    saved: false,
  }

  componentDidMount() {
    this.fetchVideoDetails()
    this.checkIfVideoSaved()
  }

  fetchVideoDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedVideoDetails = {
          title: data.video_details.title,
          videoUrl: data.video_details.video_url,
          thumbnailUrl: data.video_details.thumbnail_url,
          channel: data.video_details.channel,
          viewCount: data.video_details.view_count,
          publishedAt: data.video_details.published_at,
          description: data.video_details.description,
        }
        this.setState({videoDetails: updatedVideoDetails, isLoading: false})
      } else {
        this.setState({hasError: true, isLoading: false})
      }
    } catch {
      this.setState({hasError: true, isLoading: false})
    }
  }

  // Check if video is saved in localStorage
  checkIfVideoSaved = () => {
    const {videoDetails} = this.state
    const savedVideos = JSON.parse(localStorage.getItem('savedVideos')) || []
    const isSaved = savedVideos.some(video => video.id === videoDetails.id)
    this.setState({saved: isSaved})
  }

  handleLike = () => {
    this.setState(prevState => ({
      like: !prevState.like,
      dislike: prevState.like ? prevState.dislike : false,
    }))
  }

  handleDislike = () => {
    this.setState(prevState => ({
      dislike: !prevState.dislike,
      like: prevState.dislike ? prevState.like : false,
    }))
  }

  handleSave = () => {
    const {saved, videoDetails} = this.state

    // Toggle the saved state
    this.setState({saved: !saved}, () => {
      const savedVideos = JSON.parse(localStorage.getItem('savedVideos')) || []

      if (!saved) {
        // Save the video to localStorage
        savedVideos.push(videoDetails)
      } else {
        // Remove the video from localStorage
        const updatedVideos = savedVideos.filter(
          video => video.id !== videoDetails.id,
        )
        localStorage.setItem('savedVideos', JSON.stringify(updatedVideos))
      }

      localStorage.setItem('savedVideos', JSON.stringify(savedVideos))
    })
  }

  render() {
    const {videoDetails, isLoading, hasError, like, dislike, saved} = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }

    if (hasError) {
      return <p className="error">Failed to load video details. Try again!</p>
    }

    const {
      title,
      videoUrl,
      thumbnailUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoDetails

    return (
      <>
        <Header />
        <div className="container">
          <RouteHeader />
          <div
            data-testid="VideoItemDetails"
            className="video-details-container"
          >
            <ReactPlayer
              url={videoUrl}
              className="video-player"
              title={title}
              controls
            />
            <div className="video-info">
              <h1 className="video-title">{title}</h1>
              <div className="video-meta">
                <p>{viewCount} views</p>
                <p>Published on {publishedAt}</p>
              </div>
              <p className="video-description">{description}</p>
            </div>
            <div className="video-buttons">
              <button
                type="button"
                className={`video-button ${like ? 'active' : ''}`}
                onClick={this.handleLike}
              >
                <FaThumbsUp /> Like
              </button>
              <button
                type="button"
                className={`video-button ${dislike ? 'active' : ''}`}
                onClick={this.handleDislike}
              >
                <FaThumbsDown /> Dislike
              </button>
              <button
                type="button"
                className={`video-button ${saved ? 'active' : ''}`}
                onClick={this.handleSave}
              >
                <FaBookmark /> Save
              </button>
            </div>
            <div className="channel-info">
              <img
                className="channel-logo"
                src={channel.profile_image_url}
                alt={channel.name}
              />
              <div>
                <h2 className="channel-name">{channel.name}</h2>
                <p className="subscriber-count">
                  {channel.subscriber_count} subscribers
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
