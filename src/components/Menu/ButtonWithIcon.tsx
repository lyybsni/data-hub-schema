import {css} from "@emotion/css";

export const ButtonWithIcon = (props: {
    icon: any,
    text: string,
}) => {
    return <span className={css`display: inline-flex`}>
        {props.icon}
        {props.text}
    </span>
}