import './AccordionWrapper.scss';
import React, { useState, useEffect } from 'react';

export const AccordionWrapper = ({
    defaultValue = false,
    children,
    contentClasses = '',
    wrapperClasses = '',
    actionElClasses = '',
    isError = false,
  }) => {
    const [isExpanded, setIsExpanded] = useState(defaultValue);
  
    const handleClick = () => {
      setIsExpanded(!isExpanded);
    };
  
    useEffect(() => {
      if (isError && !isExpanded) {
        setIsExpanded(true)
        isError = false;
      }
    }, [isError])
    return (
      <div className={'accordion__wrapper ' + wrapperClasses}>
        <p onClick={handleClick} className={'accordion__wrapper-action ' + actionElClasses + (isExpanded && 'accordion__wrapper-action--active')}>
            Дополнительные параметры
        </p>
        <div className={'accordion__wrapper-content ' + contentClasses} style={{display: isExpanded ? '' : 'none'}}>
            {children}
        </div>
      </div>
    );
  };

