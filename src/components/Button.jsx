import React from "react";

export default function Button({
    children,
    type = 'button',
    bgColor ,
    textColor ='text-white',
    className = '',
    ...props
}){ 
    console.log(bgColor)
    //forword refrence is hook of react to take reference of one field or state in other pages 
    return(
        <button className={` justify-center px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`} {...props}>
            {children}
        </button>
    )
}