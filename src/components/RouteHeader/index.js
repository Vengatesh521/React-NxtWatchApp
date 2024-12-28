import {Link} from 'react-router-dom'
import {FaFire, FaGamepad, FaBookmark} from 'react-icons/fa'
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
          <FaFire className="nav-icon" />
          Trending
        </Link>
      </div>
      <div>
        <Link to="/gaming" className="nav-link">
          <FaGamepad className="nav-icon" />
          Gaming
        </Link>
      </div>
      <div>
        <Link to="/saved-videos" className="nav-link">
          <FaBookmark className="nav-icon" />
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
