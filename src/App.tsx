import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/home/Home';
import NotFound from './routes/not-found/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
