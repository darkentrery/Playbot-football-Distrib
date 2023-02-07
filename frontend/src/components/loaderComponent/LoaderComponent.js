

export const LoaderComponent = ({width=40, height=40}) => {
    return (
        <div className={"loader-component"}>
            <div className={"custom-loader"} style={{width: width, height: height}}></div>
        </div>
    )
}