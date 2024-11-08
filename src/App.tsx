import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/home/Home';
import NotFound from './routes/not-found/NotFound';
import Login from './routes/login/Login';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Board from './routes/board/Board';

function App() {
  return (
    <BrowserRouter>
      <div className="w-full flex align-top justify-center grow">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board/:boardId" element={<Board />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <Toaster toastOptions={{ style: { backgroundColor: '#d4d4d4' } }} />
    </BrowserRouter>
  );
}

export default App;
