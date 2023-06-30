import "./FaqItemList.scss";

export const FaqItemList = ({children}) => {
    return (
        <> 
        <ul className="faq-items__list">
            {children.map((child, i) => (
                <li className="faq-items__list-item" key={i}>
                    {child}
                </li>
            ))}
            
        </ul>
        </>
    )
}

export default FaqItemList