import {Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'

import './App.css'

// Replace your code here

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/trending" component={Trending} />
    <ProtectedRoute exact path="/gaming" component={Gaming} />
    <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
    <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />
    <Route exact path="/login" component={LoginForm} />
  </Switch>
)

export default App
