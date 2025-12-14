import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useAppStore } from './store/useAppStore';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';

function App() {
  const { theme } = useAppStore();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#52c41a',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
