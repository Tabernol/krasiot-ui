import { Form, Input, Button, Card, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export function Login() {
  const { t } = useTranslation();

  const onFinish = (values: { email: string; password: string }) => {
    console.log('Login:', values);
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
            <Button type="primary" htmlType="submit" size="large" block>
              {t('loginLabel')}
            </Button>
          </Form.Item>
        </Form>

        <Divider>{t('orLoginWithSuggestion')}</Divider>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button icon={<GoogleOutlined />} size="large" block>
            Google
          </Button>
          <Button icon={<GithubOutlined />} size="large" block>
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
