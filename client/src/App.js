import { Landing, Register, Error, ProtectedRoute } from './pages';
import {
  SharedLayout,
  AllJobs,
  Stats,
  Profile,
  AddJob,
  AddApplication,
  AllApplications,
} from './pages/dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {/* nested path don't need "/stats", without "/", because the nested route will relative to parent route automatively. */}
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='profile' element={<Profile />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='add-application' element={<AddApplication />} />
          <Route path='all-applications' element={<AllApplications />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
