import { Typography, Card, Row, Col, List } from 'antd';
import {
  DashboardOutlined,
  LineChartOutlined,
  BellOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import backgroundImage from '../assets/images/background.webp';

const { Title, Paragraph } = Typography;

export function Home() {
  const { t } = useTranslation();

  const features = [
    { icon: <DashboardOutlined />, text: t('featureSensorMonitoring') },
    { icon: <LineChartOutlined />, text: t('featureRealTimeData') },
    { icon: <BellOutlined />, text: t('featureAlerts') },
    { icon: <BarChartOutlined />, text: t('featureAnalytics') },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Card
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: 32,
          borderRadius: 12,
        }}
        styles={{ body: { padding: '64px 32px' } }}
      >
        <Title level={1} style={{ color: '#fff', textAlign: 'center', marginBottom: 16 }}>
          {t('whatIsKrasiotHeading')}
        </Title>
        <Paragraph style={{ color: '#fff', textAlign: 'center', fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
          {t('whatIsKrasiotParagraph')}
        </Paragraph>
      </Card>

      {/* IoT Section */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2}>{t('iotInAgricultureHeading')}</Title>
            <Paragraph>
              {t('iotInAgricultureParagraph')}
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>
            <Title level={2}>{t('featuresHeading')}</Title>
            <List
              dataSource={features}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<span style={{ fontSize: 24 }}>{item.icon}</span>}
                    title={item.text}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
