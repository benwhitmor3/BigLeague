import React, {useState} from "react";
import {observer} from "mobx-react";
import {GmTypeModelType, useQuery} from "../../models";
import {Select} from "../Select";
import CSS from "csstype";


export const GMSelect: React.FunctionComponent = observer(() => {
    const {store, error, loading, data} = useQuery(store =>
            store.queryAllGm(
                {},
                `
    trait
    `,
    ),
    );


    const buttonStyles: CSS.Properties = {
        backgroundColor: '#ad2102',
        marginTop: '10px',
        border: '0px',
        borderRadius: '10px',
        fontSize: '14px',
        color: '#fff2e8',
        width: '15vh',
        padding: '8px',
    };

    // @ts-ignore
    const traits: any = data.allGm;
    const[selected, setSelected] = useState<string>("FACILITATOR");

        const update_gm = (updated_gm: any) => {
            setSelected(updated_gm);
        }
        const submit_gm = (selected: string) => {
        console.log(selected);
    };
        let options = traits.map((traits: { trait: string }) => {
            return {value: traits.trait, label: traits.trait.toLowerCase()}});

        return (
            <div>
            <label>General Manager</label>
            <br/>
            <Select style={{fontWeight: 'bold', backgroundColor: '#ffffff', color: '#ad2102', marginTop: '5px'}}
                    options={options} value={selected} onChange={(updated_gm: any) => update_gm(updated_gm)}/>
            <br/>
            <button style={buttonStyles} onClick={() => submit_gm(selected)}>
                Confirm GM
            </button>
            </div>
        );
}
)


export default GMSelect;
