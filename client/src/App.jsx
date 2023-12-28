import './App.css';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import PlacesPage from './pages/PlacesPage';
import ProfilePage from './pages/ProfilePage';
import PlacesFormPage from './pages/PlacesFormPage';
import axios from 'axios';
import { UserContextProvider } from './components/UserContext';


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (

    <UserContextProvider>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<ProfilePage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
        </Route>
      </Routes>

    </UserContextProvider>


  )
}

export default App;
