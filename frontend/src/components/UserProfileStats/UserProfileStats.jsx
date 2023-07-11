import './UserProfileStats.scss';

export const UserProfileStats = ({ wins, draw, lose, winRate, goals, assists, totalGames }) => {


    return (
        <div className="user-profile__stats-376">
            <div className="user-profile__stats-title-376">
                Статистика
            </div>
            <div className="user-profile__stats-list-376">

                <div className="user-profile__stats-item-376">
                    {wins}
                    <div style={{ background: "#72C140" }} className="user-profile__stats-item-right-ballon-376">

                    </div>
                </div>

                <div className="user-profile__stats-item-376">
                    {draw}
                    <div style={{ background: "#EFB041" }} className="user-profile__stats-item-right-ballon-376">

                    </div>
                </div>

                <div className="user-profile__stats-item-376">
                    {lose}
                    <div style={{ background: "#EC5B56" }} className="user-profile__stats-item-right-ballon-376">

                    </div>
                </div>
        
                <div style={{width: "100%"}}>

                </div>

                {
                    totalGames !== 0 && (
                        <div className="user-profile__stats-item-376">
                            {winRate}%
                            <span className='user-profile__stats-item-text-16-376'>
                                WR
                            </span>
                        </div>
                    )
                }

                <div style={{width: "100%"}}>

                </div>

                {goals !== 0 && (
                    <div className="user-profile__stats-item-376">
                        {goals}
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.79054 12.9363H2.69953C2.09045 11.926 1.7033 10.7873 1.61255 9.51896L1.65836 9.48515L4.02216 7.74037L6.37608 8.72573L7.14419 11.1947L5.72915 12.9363H2.79054ZM7.7085 11.5912H10.2925L11.7641 13.3897L10.863 16.1492L10.8536 16.1783C9.65213 16.4904 8.41178 16.4958 7.20897 16.1944L7.19424 16.1492L6.2927 13.3882L7.7085 11.5912ZM16.4184 9.54171L16.4448 9.52413C16.3529 10.7933 15.9617 11.9312 15.3088 12.9401L15.3075 12.9361H15.2093H12.2704L10.8567 11.1962L11.6803 8.72553L13.9783 7.74064L16.3415 9.48497L16.4184 9.54171ZM11.709 2.14918L11.7775 2.0986C12.9002 2.58198 13.9244 3.31694 14.7013 4.22721L14.6752 4.30855L13.7707 7.13531L11.4157 8.06642L9.33832 6.59035V3.89902L11.709 2.14918ZM15.1926 4.94837H15.1979C15.9501 5.99403 16.3876 7.30196 16.4561 8.66938L16.4258 8.68959L14.4451 7.2442L15.1926 4.94837ZM4.22905 7.13533L3.32458 4.3087L3.29856 4.22737C4.07768 3.31446 5.10555 2.57791 6.23205 2.09456L6.21708 2.15437L6.29254 2.20827L8.66149 3.90037V6.59035L6.58411 8.06645L4.22905 7.13533ZM14.8298 13.6755C13.9991 14.7074 12.904 15.4763 11.6442 15.9808L11.6155 15.9616L12.3629 13.6128H14.8141L14.8298 13.6755ZM3.55457 7.24435L1.60137 8.66966C1.66972 7.30349 2.10552 5.99525 2.80493 4.94851H2.80711L3.55457 7.24435ZM17.1362 9.02885C17.1362 4.50691 13.4947 0.863832 9.02885 0.863832C4.50627 0.863832 0.863832 4.50592 0.863832 9.02885C0.863832 13.4944 4.50656 17.1362 9.02885 17.1362C13.4937 17.1362 17.1362 13.4941 17.1362 9.02885ZM7.05275 1.87104L7.0561 1.86101C8.31789 1.49121 9.68416 1.49095 11.0017 1.86192L11.0047 1.87104L9.02873 3.25952L7.05275 1.87104ZM5.63658 13.6128L6.38665 15.9701C5.13789 15.4657 4.05228 14.7002 3.22744 13.6754L3.24312 13.6128H5.63658ZM9.02767 7.17663L10.9485 8.61733L10.2006 10.9145H7.79907L7.0516 8.61862L9.02767 7.17663Z" fill="#949494" stroke="#949494" strokeWidth="0.272336" />
                        </svg>
                    </div>
                )}

                {assists !== 0 && (
                    <div className="user-profile__stats-item-376">
                        {assists}
                        <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 9.47507V3.0047C23 2.4482 22.5489 1.99707 21.9924 1.99707H21.4686C21.2014 1.99707 20.9847 2.2137 20.9847 2.48094V2.48094C20.9847 2.74817 20.7681 2.96481 20.5009 2.96481L16.1134 2.96481C15.6657 2.96481 15.3028 2.60189 15.3028 2.15421V2.15421C15.3028 1.59255 14.7454 1.2011 14.2171 1.39173L2.62341 5.57478C2.08227 5.77028 1 6.60117 1 8.3607C1 8.79155 1.10069 9.16085 1.26509 9.47507M23 9.47507V9.79692C23 10.4614 22.4614 11 21.7969 11L3.51908 11C2.885 10.8893 1.77209 10.4441 1.26509 9.47507M23 9.47507H12.1325L1.26509 9.47507M12 2.19166L12.5598 3.83389M10.4046 2.7673L10.9644 4.40953M8.75318 3.36313L9.31298 5.00536M7.07379 3.96906L7.63359 5.61129" stroke="#949494" strokeWidth="1.0214" strokeLinecap="round" />
                            <path d="M20.6716 12L21 11H19L19.3284 12H20.6716Z" stroke="#949494" strokeWidth="1.0214" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.6716 12L18 11H16L16.3284 12H17.6716Z" stroke="#949494" strokeWidth="1.0214" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.67164 12L6 11H4L4.32836 12H5.67164Z" stroke="#949494" strokeWidth="1.0214" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.67164 12L9 11H7L7.32836 12H8.67164Z" stroke="#949494" strokeWidth="1.0214" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.6716 12L12 11H10L10.3284 12H11.6716Z" stroke="#949494" strokeWidth="1.0214" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                )}

            </div>
        </div>
    )
}