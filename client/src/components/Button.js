export default function Button({children, text, type, ...rest}){
    return (
        <>
            <button {...rest} type={type}>{ children || text}</button>
        </>
    )
}