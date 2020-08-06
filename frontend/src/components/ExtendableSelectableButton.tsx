import React, {useState} from 'react';

/** A set of groupped constants */
enum SelectableButtonTypes {
    Important = "important",
    Optional = "optional",
    Irrelevant = "irrelevant"
}

interface IButtonProps {
    text: string,
    /** The type of button, pulled from the Enum SelectableButtonTypes */
    type: SelectableButtonTypes,
    action: (selected: boolean) => void
}

const ExtendedSelectableButton = ({text, type, action}: IButtonProps) => {
    let [selected, setSelected]  = useState<boolean>(false);

    return (<button className={"extendedSelectableButton " + type + (selected? " selected" : "")} onClick={ _ => {
        setSelected(!selected)
        action(selected)
    }}>{text}</button>)
}

/** Exporting the component AND the Enum */
export { ExtendedSelectableButton, SelectableButtonTypes}