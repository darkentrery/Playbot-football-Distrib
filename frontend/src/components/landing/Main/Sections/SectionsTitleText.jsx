import React from 'react'

function SectionsTitleText({title,text,goldtext,text2,mwidth}) {
  return (
    <div className="section-title-text" style={{maxWidth:mwidth}}>
    <h3 className="section-title">{title}</h3>
    <p className="section--text">
    {text}
   <span className='gold-text'>{goldtext}</span>
    {text2}
    </p>
  </div>
  )
}

export default SectionsTitleText