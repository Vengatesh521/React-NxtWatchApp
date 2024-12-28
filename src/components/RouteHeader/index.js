import {Link} from 'react-router-dom'
import './index.css'

const RouteHeader = () => (
  <div className="route-container">
    <div className="navigation-links">
      <div>
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
            alt="nav home"
            className="nav-bar-img"
          />
          Home
        </Link>
      </div>
      <div>
        <Link to="/trending" className="nav-link">
          <img
            src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/chart-line.svg"
            alt="nav trending"
            className="nav-bar-img"
          />
          Trending
        </Link>
      </div>
      <div>
        <Link to="/gaming" className="nav-link">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/1237/1237113.svg"
            alt="nav gaming"
            className="nav-bar-img"
          />
          Gaming
        </Link>
      </div>
      <div>
        <Link to="/saved-videos" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-saved-videos-icon.png"
            alt="nav saved videos"
            className="nav-bar-img"
          />
          Saved Videos
        </Link>
      </div>
    </div>
    <div className="contact-section">
      <h1>CONTACT US</h1>
      <div className="social-icons">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
          className="nav-bar-img"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
          className="nav-bar-img"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
          className="nav-bar-img"
        />
      </div>
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  </div>
)

export default RouteHeader
