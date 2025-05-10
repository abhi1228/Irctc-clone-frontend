import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import {BrowserRouter as Router, Routes ,Route , Navigate , useLocation, useNavigate} from "react-router-dom";
import styles from "./styles/App.module.css";
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import TrainCarousel from './components/TrainCarousel';
import LoginModal from './pages/LoginModal';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import TrainSearchResults from './pages/TrainSearchResults';
import BookingConfirmation from './pages/BookingConfirmationPage';
import TrainDetails from './pages/TrainDetails';
import BookingHistoryPage from './pages/BookingHistoryPage';
const RouteContentManager=()=>{

  const location=useLocation();

  return (
  <div className={styles.mainContent}>
      {location.pathname === "/" && (
        <>
          <Home />
          <TrainCarousel />
        </>
      )}
      <Routes>
        <Route path="/" element={null} />
        <Route path="/" element={null} />
        <Route path="/train-search/" element={<TrainSearchResults />} />
        <Route path="/train-details/:train_number" element={<TrainDetails />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />

        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-history"
          element={
            <ProtectedRoute>
              <BookingHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <LoginModal
              isOpen={true}
              onClose={() => window.history.back()}
              onLogin={() => {}}
              switchToRegister={() => {}}
            />
          }
        />
      </Routes>
    </div>
  );
}


const App = () => {
  return (
   <>
     <AuthProvider>
      {" "}
      {/* Wrap the entire app with AuthProvider */}
      <Router>
        <div className={styles.app}>
          <Navbar />
          <RouteContentManager />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
   </>
  )
}

export default App