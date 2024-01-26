import { ReactNode } from "react"

type Props = {
    children: ReactNode,
    onClick?: () => void,
    clasName?: string,
    style?: object
  }

function Button (props: Props) {

    return (
        <button style={props.style} className={`p-3 bg-blue-900 text-white hover:bg-blue-800 duration-300 ${props.clasName}`} onClick={props.onClick}>{props.children}</button>
    )

}

export default Button