import { Landing, Register, Error } from './pages';
import {
  SharedLayout,
  AllJobs,
  Stats,
  Profile,
  AddJob,
} from './pages/dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          {/* nested path don't need "/stats", without "/", because the nested route will relative to parent route automatively. */}
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='profile' element={<Profile />} />
          <Route path='add-job' element={<AddJob />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
