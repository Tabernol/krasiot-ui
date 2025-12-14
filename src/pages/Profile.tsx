import { useState, useEffect } from 'react';
import { Card, Typography, Form, Input, Button, Divider, message, Spin, Modal } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { authApi } from '../api/auth';

const { Title, Text } = Typography;

interface ProfileFormValues {
  firstname: string;
  lastname: string;
  email: string;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser, logout } = useAppStore();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      setRefreshing(true);
      try {
        const userData = await authApi.me();
        setUser(userData);
        profileForm.setFieldsValue({
          firstname: userData.firstname || '',
          lastname: userData.lastname || '',
          email: userData.email,
        });
      } catch {
        message.error(t('defaultErrorMessage'));
      } finally {
        setRefreshing(false);
      }
    };

    fetchUser();
  }, [isAuthenticated, navigate, setUser, profileForm, t]);

  const onProfileFinish = async (values: ProfileFormValues) => {
    setProfileLoading(true);
    try {
      const updatedUser = await authApi.updateProfile({
        firstname: values.firstname || undefined,
        lastname: values.lastname || undefined,
      });
      setUser(updatedUser);
      message.success(t('profileUpdated'));
    } catch {
      message.error(t('defaultErrorMessage'));
    } finally {
      setProfileLoading(false);
    }
  };

  const onPasswordFinish = async (values: PasswordFormValues) => {
    setPasswordLoading(true);
    try {
      await authApi.changePassword({
        current_password: values.currentPassword,
        new_password: values.newPassword,
      });
      message.success(t('profileUpdated'));
      passwordForm.resetFields();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      if (err.response?.data?.error === 'invalid_password') {
        message.error(t('invalidCurrentPasswordMessage'));
      } else {
        message.error(t('defaultErrorMessage'));
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Modal.confirm({
      title: t('closeAccountAreYouSureHeading'),
      icon: <ExclamationCircleOutlined />,
      content: t('closeAccountAreYouSureMessage'),
      okText: t('yesLabel'),
      okType: 'danger',
      cancelText: t('noLabel'),
      onOk: async () => {
        setDeleteLoading(true);
        try {
          await authApi.deleteAccount();
          logout();
          message.success(t('closeAccountHeading'));
          navigate('/');
        } catch {
          message.error(t('defaultErrorMessage'));
        } finally {
          setDeleteLoading(false);
        }
      },
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  if (refreshing) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title level={2}>{t('manageProfileHeading')}</Title>

      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>{t('profileHeading')}</Title>
        <Text type="secondary">{t('profileDescription')}</Text>

        <Form
          form={profileForm}
          layout="vertical"
          onFinish={onProfileFinish}
          style={{ marginTop: 24 }}
          initialValues={{
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
            email: user?.email || '',
          }}
        >
          <div style={{ display: 'flex', gap: 16 }}>
            <Form.Item
              name="firstname"
              label={t('firstnameLabel')}
              style={{ flex: 1 }}
              rules={[{ min: 2, message: t('invalidNameMessage') }]}
            >
              <Input prefix={<UserOutlined />} size="large" />
            </Form.Item>

            <Form.Item
              name="lastname"
              label={t('lastnameLabel')}
              style={{ flex: 1 }}
              rules={[{ min: 2, message: t('invalidNameMessage') }]}
            >
              <Input size="large" />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label={t('emailLabel')}
          >
            <Input prefix={<MailOutlined />} size="large" disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={profileLoading}>
              {t('saveButtonLabel')}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>{t('passwordHeading')}</Title>
        <Text type="secondary">{t('passwordDescription')}</Text>

        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={onPasswordFinish}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="currentPassword"
            label={t('currentPasswordLabel')}
            rules={[{ required: true, message: t('invalidPasswordFormatMessage') }]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={t('newPasswordLabel')}
            rules={[
              { required: true, message: t('invalidPasswordFormatMessage') },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message: t('invalidPasswordFormatMessage'),
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={t('confirmPasswordLabel')}
            dependencies={['newPassword']}
            rules={[
              { required: true, message: t('confirmPasswordLabel') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('passwordsDoNotMatchMessage')));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={passwordLoading}>
              {t('saveButtonLabel')}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Divider />

      <Card>
        <Title level={4} type="danger">{t('closeAccountHeading')}</Title>
        <Text type="secondary">{t('closeAccountDescription')}</Text>
        <div style={{ marginTop: 16 }}>
          <Button danger onClick={handleDeleteAccount} loading={deleteLoading}>
            {t('closeAccountHeading')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
