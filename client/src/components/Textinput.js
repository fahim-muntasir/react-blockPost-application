import React from "react";

export default function Textimport({text, ...rest}){
    return(
        <>  
            <label>{text}</label>
            <input {...rest} />
        </>
    )
}