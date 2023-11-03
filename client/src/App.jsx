import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import News from './components/News';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<News />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Page not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
