import React, { useState } from 'react'
import main1 from '../../../img/main1.png'
import main2 from '../../../img/main2.png'
import main3 from '../../../img/main3.png'
import main4 from '../../../img/main4.png'

// import test from '../../../img/Group 386.png'




function SectionOne2Img() {

 const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 450);

    window.addEventListener("resize", () => {
      setIsSmallScreen(window.innerWidth <= 450);
    });

  return (
   <div className='sectionOne2img'>
    <img src={isSmallScreen?main3:main1} alt="groupimages" />
    <img src={isSmallScreen?main4:main2} alt="groupimages" />
    <div className='plus'>+</div>
   </div>
  )
}

export default SectionOne2Img