import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
import './App.scss';
import Login from './pages/Login/Login';
import { userContext } from './Contexts/userContext';
import ImportMembers from './pages/ImportMembers/ImportMembers';
import CreateWindFarm from './pages/CreateWindFarm/CreateWindFarm';
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

            <Route element={<ProtectedRoute />}>
              <Route path="/import" element={<ImportMembers />} />
              <Route path="/create-wind-farm" element={<CreateWindFarm />} />
              <Route path="/system" element={<AchievementSystems />} />
              <Route path="/system-achievements" element={<Achievement />} />
              <Route
                path="/create-achievements"
                element={<CreateAchievements />}
              />
            </Route>
          </Routes>
        </userContext.Provider>
      </div>
    </Suspense>
  );
}

export default App;
