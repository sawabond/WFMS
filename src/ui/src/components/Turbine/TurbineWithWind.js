import React from 'react';
import toHundreds from '../../functions/view-functions';
import CardContentFieldItem from '../CardContentFieldItem';
import { useTranslation } from 'react-i18next';

const TurbineWithWind = ({ turbine, conditionsState }) => {
  const { t } = useTranslation();

  const turbineColors = {
    Optimized: '#00ff00',
    Normal: '#009933',
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
            background: `linear-gradient(0deg, transparent 50%, ${
              turbineColors[turbine.statusString]
            } 50%)`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${turbine.globalAngle}deg)`,
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
              (conditionsState.windGlobalAngle + 180) % 360
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
          text={`${t('TURBINE_ANGLE')}: ${toHundreds(turbine.globalAngle)}`}
        />
        <CardContentFieldItem
          text={`${t('WIND_ANGLE')}: ${toHundreds(
            conditionsState.windGlobalAngle
          )}`}
        />
        <CardContentFieldItem
          text={`${t('PITCH_ANGLE')}: ${toHundreds(turbine.pitchAngle)}`}
        />
        <CardContentFieldItem
          color={turbineColors[turbine.statusString]}
          text={`${t('MODE')}: ${turbine.statusString}`}
        />
        <CardContentFieldItem
          text={`${t('HUMIDITY')}: ${toHundreds(conditionsState.humidity)}`}
        />
        <CardContentFieldItem
          text={`${t('TEMPERATURE')}: ${toHundreds(
            conditionsState.temperature
          )}`}
        />
        <CardContentFieldItem
          text={`${t('WIND_SPEED')}: ${toHundreds(conditionsState.windSpeed)}`}
        />
        <CardContentFieldItem
          text={`${t('TIMESTAMP')}: ${conditionsState.timestamp}`}
        />
      </div>
    </div>
  );
};

export default TurbineWithWind;
