import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import { Dashboard, Auth, Contain } from "@/layouts";
import PrivateRoute from '@/components/PrivateRouter'; // Adjust path as necessary
import DataMember from './pages/dashboard/dataMember';
import DataKomisi from './pages/dashboard/dataKomisi';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/contain/*" element={< Contain />} />
        <Route path="*" element={<Navigate to="/auth/home" replace />} />

        {/* Protected routes */}
        <Route path="/dashboard/*" element={<PrivateRoute element={Dashboard} />} />
      </Routes>
    </Provider>
  );
}

export default App;
