import VisibleMainWrapper from "../../../redux/containers/VisibleMainWrapper";


export const ProfileWrapperComponent = ({children}) => {
  return (
      <VisibleMainWrapper>
          <div className={`profile-wrapper-component`}>
              {children}
          </div>
      </VisibleMainWrapper>
  )
}