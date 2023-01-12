import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, ButtonGroup, Button, CinePlayer } from '../';
import useOnClickOutside from '../../utils/useOnClickOutside';
import PatientInfo from '../PatientInfo';
import { StringNumber } from '../../types';

const ViewportActionBar = ({
  studyData,
  showNavArrows,
  showStatus,
  showCine,
  cineProps,
  showPatientInfo: patientInfoVisibility,
  onArrowsClick,
  onDoubleClick,
  getStatusComponent,
}) => {
  const [showPatientInfo, setShowPatientInfo] = useState(patientInfoVisibility);

  const {
    label,
    useAltStyling,
    studyDate,
    currentSeries,
    seriesDescription,
    patientInformation,
  } = studyData;

  const {
    patientName,
    patientSex,
    patientAge,
    MRN,
    thickness,
    spacing,
    scanner,
  } = patientInformation;

  const closePatientInfo = () => setShowPatientInfo(false);
  const showPatientInfoRef = useRef(null);
  const clickOutsideListener = useOnClickOutside(
    showPatientInfoRef,
    closePatientInfo
  );

  useEffect(() => {
    if (showPatientInfo) {
      clickOutsideListener.add();
    } else {
      clickOutsideListener.remove();
    }

    return () => clickOutsideListener.remove();
  }, [clickOutsideListener, showPatientInfo]);

  const borderColor = useAltStyling ? '#365A6A' : '#1D205A';

  let backgroundColor = 'rgb(77 77 77)';
  if (useAltStyling) {
    backgroundColor = '#031923';
  }

  return (
    <div
      className="flex flex-wrap items-center p-2 -mt-2 border-b select-none"
      style={{
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      }}
      onDoubleClick={onDoubleClick}
      onContextMenu={e => e.preventDefault()}
    >
      <div className="flex flex-1 grow mt-2 min-w-48">
        {/* <div className="flex items-center">
          <span className="mr-2 text-white text-large">{label}</span>
          {showStatus && getStatusComponent()}
        </div> */}
        <div className="flex flex-col justify-start ml-4">
          <div className="flex">
            <span className="text-base text-white">{studyDate}</span>
            <span className="pl-2 ml-2 text-base border-l border-primary-light text-primary-light">
              S: {currentSeries}
            </span>
          </div>
          <div className="flex">
            {/* TODO:
                This is tricky. Our "no-wrap" in truncate means this has a hard
                length. The overflow forces ellipse. If we don't set max width
                appropriately, this causes the ActionBar to overflow.
                Can clean up by setting percentage widths + calc on parent
                containers
             */}
            <p className="text-base truncate max-w-40 text-primary-light">
              {seriesDescription}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start ml-4">
        <p className="text-base max-w-50 text-primary-light text-xs">{patientName}</p>
      </div>
      <div className="flex flex-col justify-start ml-4">
        <p className="text-base max-w-40 text-primary-light text-xs">
          Sex: {patientSex}
        </p>
        <p className="text-base max-w-40 text-primary-light text-xs">
          Age: {patientAge}
        </p>
      </div>
      <div className="flex flex-col justify-start ml-4">
        <p className="text-base max-w-40 text-primary-light text-xs">MRN: {MRN}</p>
        <p className="text-base max-w-40 text-primary-light text-xs">
          Tickness: {thickness}
        </p>
      </div>
      <div className="flex flex-col justify-start ml-4">
        <p className="text-base max-w-40 text-primary-light text-xs">
          Spacing: {spacing}
        </p>
        <p className="text-base max-w-60 text-primary-light text-xs">
          Scanner: {scanner}
        </p>
      </div>
      {/* {showNavArrows && !showCine && (
        <div className="mt-2" style={{ pointerEvents: 'all' }}>
          <ButtonGroup>
            <Button
              size="initial"
              className="px-2 py-1 bg-black"
              border="light"
              onClick={() => onArrowsClick('left')}
            >
              <Icon name="chevron-left" className="w-4 text-white" />
            </Button>
            <Button
              size="initial"
              border="light"
              className="px-2 py-1 bg-black"
              onClick={() => onArrowsClick('right')}
            >
              <Icon name="chevron-right" className="w-4 text-white" />
            </Button>
          </ButtonGroup>
        </div>
      )} */}
      {/* {showCine && !showNavArrows && (
        <div className="mt-2 mr-auto min-w-48 max-w-48">
          <CinePlayer {...cineProps} />
        </div>
      )} */}
    </div>
  );
};

ViewportActionBar.propTypes = {
  onArrowsClick: PropTypes.func.isRequired,
  showNavArrows: PropTypes.bool,
  showCine: PropTypes.bool,
  cineProps: PropTypes.object,
  showPatientInfo: PropTypes.bool,
  studyData: PropTypes.shape({
    //
    useAltStyling: PropTypes.bool,
    //
    label: PropTypes.string.isRequired,
    studyDate: PropTypes.string.isRequired,
    currentSeries: StringNumber.isRequired,
    seriesDescription: PropTypes.string.isRequired,
    patientInformation: PropTypes.shape({
      patientName: PropTypes.string.isRequired,
      patientSex: PropTypes.string.isRequired,
      patientAge: PropTypes.string.isRequired,
      MRN: PropTypes.string.isRequired,
      thickness: PropTypes.string.isRequired,
      spacing: PropTypes.string.isRequired,
      scanner: PropTypes.string.isRequired,
    }),
  }).isRequired,
  getStatusComponent: PropTypes.func.isRequired,
};

ViewportActionBar.defaultProps = {
  cineProps: {},
  showCine: false,
  showStatus: true,
  showNavArrows: true,
  showPatientInfo: false,
};

export default ViewportActionBar;
