import './UserProfilePhoto.scss'

export const UserProfilePhoto = ({img, name}) => {
    return (
        <div className="load-user-photo-preview">
            <div className="load-user-photo-preview-frame">
                <div className="load-user-photo-preview-top-frame">
                    <img className='load-user-photo-preview-user-img' src={img} alt="" />
                    <div className="load-user-photo-preview-top-frame-fog"></div>
                </div>
                <div className="load-user-photo-preview-bottom">
                    <div className="load-user-photo-preview-username">
                        ALEX_MIRAN
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePhoto