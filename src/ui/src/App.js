import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
import './App.scss';
import Login from './pages/Login/Login';
import { userContext } from './Contexts/userContext';
import CreateWindFarm from './pages/WindFarm/CreateWindFarm';
import AchievementSystems from './pages/AchievementsSystems/AchievementsSystems';
import Achievement from './pages/Achievement/Achievement';
import CreateAchievements from './pages/CreateAchievements/CreateAchievements';
import { ProtectedRoute } from './routes/ProtectedRoute';
import NotFound from './pages/MessagePages/NotFound';
import useAuthProvider from './hooks/useAuthProvider';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translationsEn, translationsUk } from './translations.js';
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail';
import EmailConfirmed from './pages/ConfirmEmail/EmailConfirmed';
import WindFarmDetails from './pages/WindFarm/WindFarmDetails';
import WindFarmTurbines from './pages/WindFarmTurbines/WindFarmTurbines';
import WindFarmTurbineDetails from './pages/WindFarmTurbines/WindFarmTurbineDetails';
import Admin from './pages/Admin/Users';
import UserDetails from './pages/Admin/UserDetails';
import CreateWindFarmTurbine from './pages/WindFarmTurbines/CreateWindFarmTurbine';
import WindFarmTurbineStatistics from './pages/WindFarmTurbines/WindFarmTurbineStatistics';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    uk: { translation: translationsUk },
  },
  lng: localStorage.getItem('locale') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

function App() {
  const userProvider = useAuthProvider();

  return (
    <Suspense fallback="Loading...">
      <div className="App">
        <userContext.Provider value={userProvider}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/confirm-email/:email" element={<ConfirmEmail />} />
            <Route
              path="/email-confirmed/:email"
              element={<EmailConfirmed />}
            />
            <Route path="*" element={<NotFound />} />

            <Route element={<ProtectedRoute expectedRole={'User'} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/create-wind-farm" element={<CreateWindFarm />} />
              <Route path="/wind-farms/:farmId" element={<WindFarmDetails />} />
              <Route
                path="/wind-farms/:farmId/turbines"
                element={<WindFarmTurbines />}
              />
              <Route
                path="/wind-farms/:farmId/turbines/:turbineId"
                element={<WindFarmTurbineDetails />}
              />
              <Route
                path="/wind-farms/:farmId/turbines/:turbineId/dashboard"
                element={<WindFarmTurbineStatistics />}
              />
              <Route
                path="/wind-farms/:farmId/turbines/create"
                element={<CreateWindFarmTurbine />}
              />
              <Route path="/system" element={<AchievementSystems />} />
              <Route path="/system-achievements" element={<Achievement />} />
              <Route
                path="/create-achievements"
                element={<CreateAchievements />}
              />
            </Route>
            <Route element={<ProtectedRoute expectedRole={'Admin'} />}>
              <Route path="/users" element={<Admin />} />
              <Route path="/users/:userId" element={<UserDetails />} />
            </Route>
          </Routes>
        </userContext.Provider>
      </div>
    </Suspense>
  );
}

export default App;
