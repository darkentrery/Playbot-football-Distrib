import './AccordionWrapper.scss';
import React, { useState } from 'react';

export const AccordionWrapper = ({
    defaultValue = false,
    children,
    contentClasses = '',
    wrapperClasses = '',
    actionElClasses = '',
  }) => {
    const [isExpanded, setExpanded] = useState(defaultValue);
  
    const handleClick = () => {
      setExpanded(!isExpanded);
    };
  
    return (
      <div className={'accordion__wrapper ' + wrapperClasses}>
        <p onClick={handleClick} className={'accordion__wrapper-action ' + actionElClasses + (isExpanded && 'accordion__wrapper-action--active')}>
            Дополнительные параметры
        </p>
        <div className={'accrodion__wrapper-content ' + contentClasses} style={{display: isExpanded ? '' : 'none'}}>
            {children}
        </div>
      </div>
    );
  };

