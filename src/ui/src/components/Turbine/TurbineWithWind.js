import React from 'react';
import toHundreds from '../../functions/view-functions';
import CardContentFieldItem from '../CardContentFieldItem';
import { useTranslation } from 'react-i18next';

const TurbineWithWind = ({ turbineAngle, windAngle, pitchAngle, mode }) => {
  const { t } = useTranslation();

  const turbineColors = {
    Optimized: '#00ad03',
    Normal: '#b4eb34',
    Offline: '#bababa',
  };

  return (
    <div>
      <div
        style={{
          width: '200px',
          height: '200px',
          border: '1px solid black',
          borderRadius: '50%',
          position: 'relative',
          transition: 'transform 0.5s ease',
        }}
      >
        {/* Turbine visualization */}
        <div
          style={{
            clipPath: `polygon(
              50% 0,
              100% 50%,
              50% 100%,
              0 50%
            )`,
            width: '20px',
            height: '150px',
            background: 'linear-gradient(0deg, red 50%, blue 50%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
        <div
          style={{
            clipPath: `polygon(
              50% 0,
              100% 50%,
              50% 100%,
              0 50%
            )`,
            width: '20px',
            height: '150px',
            background: `linear-gradient(0deg, transparent 50%, ${turbineColors[mode]} 50%)`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${turbineAngle}deg)`,
          }}
        ></div>
        <div
          style={{
            clipPath: `polygon(
              50% 0,
              100% 50%,
              50% 100%,
              0 50%
            )`,
            width: '20px',
            height: '150px',
            background: 'linear-gradient(0deg, transparent 50%, #3f8491 50%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${
              (windAngle + 180) % 360
            }deg)`,
          }}
        ></div>
        <div
          style={{
            width: '160px',
            height: '1px',
            background: 'black',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
        <div
          style={{
            width: '160px',
            height: '1px',
            background: 'black',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(90deg)',
          }}
        ></div>
      </div>
      {/* Display angle values */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'flex-start',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <CardContentFieldItem
          text={`${t('TURBINE_ANGLE')}: ${toHundreds(turbineAngle)}`}
        />
        <CardContentFieldItem
          text={`${t('WIND_ANGLE')}: ${toHundreds(windAngle)}`}
        />
        <CardContentFieldItem
          text={`${t('PITCH_ANGLE')}: ${toHundreds(pitchAngle)}`}
        />
        <CardContentFieldItem text={`${t('MODE')}: ${mode}`} />
      </div>
    </div>
  );
};

export default TurbineWithWind;
