import "./FaqItemList.scss";

export const FaqItemList = ({children}) => {
    return (
        <> 
        <ul className="faq-items__list">
            {children.map(child => (
                <li className="faq-items__list-item">
                    {child}
                </li>
            ))}
            
        </ul>
        </>
    )
}

export default FaqItemList