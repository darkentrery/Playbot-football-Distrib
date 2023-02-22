

export const LoaderComponent = ({width=40, height=40, borderRadius=0}) => {
    return (
        <div className={"loader-component"} style={{borderRadius: borderRadius}}>
            <div className={"custom-loader"} style={{width: width, height: height}}></div>
        </div>
    )
}