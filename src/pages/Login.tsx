import { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAppStore } from '../store/useAppStore';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, setTokens } = useAppStore();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const authResponse = await authApi.login(values);

      const tokens = {
        accessToken: authResponse.access_token,
        refreshToken: authResponse.refresh_token,
        expiresIn: authResponse.expires_in,
      };

      setTokens(tokens);

      const userResponse = await authApi.me();

      login(userResponse, tokens);

      message.success(t('loginHeading'));
      navigate('/');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      if (err.response?.data?.error === 'invalid_credentials') {
        message.error(t('invalidCredentialsMessage'));
      } else {
        message.error(t('defaultErrorMessage'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          {t('loginHeading')}
        </Title>

        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('invalidEmailMessage') },
              { type: 'email', message: t('invalidEmailMessage') },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder={t('emailLabel')} size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('invalidPasswordFormatMessage') }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder={t('passwordLabel')} size="large" />
          </Form.Item>

          <Form.Item>
            <Link to="/forgot-password">{t('forgotPasswordQuestion')}</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              {t('loginLabel')}
            </Button>
          </Form.Item>
        </Form>

        <Divider>{t('orLoginWithSuggestion')}</Divider>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            icon={<GoogleOutlined />}
            size="large"
            block
            onClick={() => message.info(t('socialLoginNotSupported', { provider: 'Google' }))}
          >
            Google
          </Button>
          <Button
            icon={<GithubOutlined />}
            size="large"
            block
            onClick={() => message.info(t('socialLoginNotSupported', { provider: 'GitHub' }))}
          >
            GitHub
          </Button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Text>{t('newUserLoginQuestion')} </Text>
          <Link to="/signup">{t('signupLabel')}</Link>
        </div>
      </Card>
    </div>
  );
}
