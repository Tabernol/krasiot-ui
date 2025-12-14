import { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

const { Title, Text } = Typography;

interface SignUpFormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: SignUpFormValues) => {
    setLoading(true);
    try {
      await authApi.register({
        email: values.email,
        password: values.password,
        firstname: values.firstname || undefined,
        lastname: values.lastname || undefined,
      });
      message.success(t('signupHeading'));
      navigate('/login');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      if (err.response?.data?.error === 'email_exists') {
        message.error(t('invalidEmailMessage'));
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
          {t('signupHeading')}
        </Title>

        <Form name="signup" onFinish={onFinish} layout="vertical">
          <div style={{ display: 'flex', gap: 8 }}>
            <Form.Item
              name="firstname"
              style={{ flex: 1 }}
              rules={[{ min: 2, message: t('invalidNameMessage') }]}
            >
              <Input prefix={<UserOutlined />} placeholder={t('firstnameLabel')} size="large" />
            </Form.Item>

            <Form.Item
              name="lastname"
              style={{ flex: 1 }}
              rules={[{ min: 2, message: t('invalidNameMessage') }]}
            >
              <Input placeholder={t('lastnameLabel')} size="large" />
            </Form.Item>
          </div>

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
            rules={[
              { required: true, message: t('invalidPasswordFormatMessage') },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message: t('invalidPasswordFormatMessage'),
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder={t('passwordLabel')} size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: t('confirmPasswordLabel') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('passwordsDoNotMatchMessage')));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder={t('confirmPasswordLabel')} size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              {t('signupLabel')}
            </Button>
          </Form.Item>
        </Form>

        <Divider>{t('orSignupWithSuggestion')}</Divider>

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
          <Text>{t('alreadyHavenAnAccountQuestion')} </Text>
          <Link to="/login">{t('loginLabel')}</Link>
        </div>
      </Card>
    </div>
  );
}
