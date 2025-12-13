import React from 'react';
import './About.css'
import {MDBTypography} from "mdbreact";
import {AppProps} from "../../index";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

function About(appProps: AppProps) {
    const {t} = useTranslation();
    return (
        <section className='d-flex flex-column justify-content-center'>
            <section id='what-is-krasiot' className='hero-section'>
                <h1 className="h1-responsive bold mb-5 text-center">{t('ns1:whatIsKrasiotHeading')}</h1>
                <MDBTypography className='lead text-center'>
                    {t('ns1:whatIsKrasiotParagraph')}
                </MDBTypography>
            </section>
            <div className="divider"/>
            <section id="iot-in-agriculture">
                <h2 className="h2-responsive color-primary bold mb-4">{t('ns1:iotInAgricultureHeading')}</h2>
                <p className="text-long">
                    {t('ns1:iotInAgricultureParagraph')}
                </p>
            </section>
            <div className="divider"/>
            <section id="features">
                <h2 className="h2-responsive color-primary bold mb-4">{t('ns1:featuresHeading')}</h2>
                <ul>
                    <li>{t('ns1:featureSensorMonitoring')}</li>
                    <li>{t('ns1:featureRealTimeData')}</li>
                    <li>{t('ns1:featureAlerts')}</li>
                    <li>{t('ns1:featureAnalytics')}</li>
                </ul>
            </section>
        </section>
    )
}

export default connect()(About)
