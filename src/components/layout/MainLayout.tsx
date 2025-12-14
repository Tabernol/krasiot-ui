import { Layout, Menu, Switch, Dropdown, Button, message } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { authApi } from '../../api/auth';

const { Header, Content, Footer } = Layout;

export function MainLayout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, isAuthenticated, user, tokens, logout } = useAppStore();

  const handleLogout = async () => {
    try {
      if (tokens?.refreshToken) {
        await authApi.logout({ refresh_token: tokens.refreshToken });
      }
    } catch {
      // Ignore logout API errors
    } finally {
      logout();
      message.success(t('logoutLabel'));
      navigate('/login');
    }
  };

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/">{t('aboutAppLabel')}</Link> },
  ];

  const languageMenu = {
    items: [
      { key: 'en', label: 'English', onClick: () => i18n.changeLanguage('en') },
      { key: 'uk', label: 'Українська', onClick: () => i18n.changeLanguage('uk') },
    ],
  };

  const userMenu = {
    items: [
      { key: 'profile', icon: <UserOutlined />, label: t('profileHeading'), onClick: () => navigate('/profile') },
      { key: 'logout', icon: <LogoutOutlined />, label: t('logoutLabel'), onClick: handleLogout },
    ],
  };

  const displayName = user?.firstname || user?.email || '';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: theme === 'dark' ? '#001529' : '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link to="/" style={{ color: theme === 'dark' ? '#fff' : '#001529', fontSize: 20, fontWeight: 'bold' }}>
            Krasiot
          </Link>
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ border: 'none', background: 'transparent' }}
            theme={theme}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Switch
            checked={theme === 'dark'}
            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
          />

          <Dropdown menu={languageMenu}>
            <Button icon={<GlobalOutlined />} type="text" />
          </Dropdown>

          {isAuthenticated ? (
            <Dropdown menu={userMenu}>
              <Button icon={<UserOutlined />} type="text">
                {displayName}
              </Button>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button icon={<LoginOutlined />} type="primary">
                {t('loginLabel')}
              </Button>
            </Link>
          )}
        </div>
      </Header>

      <Content style={{ padding: '24px 48px' }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Krasiot © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
