import { Layout, Menu, Switch, Dropdown, Button } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';

const { Header, Content, Footer } = Layout;

export function MainLayout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { theme, setTheme, isAuthenticated, user, logout } = useAppStore();

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
      { key: 'profile', icon: <UserOutlined />, label: t('profileHeading') },
      { key: 'logout', icon: <LogoutOutlined />, label: t('logoutLabel'), onClick: logout },
    ],
  };

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
                {user?.name}
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
