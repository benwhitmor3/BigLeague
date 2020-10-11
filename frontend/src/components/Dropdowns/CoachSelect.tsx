import React, {useState} from "react";
import {observer} from "mobx-react";
import {useQuery} from "../../models";
import {Select} from "../Reusables/Select";
import CSS from "csstype";


export const CoachSelect: React.FunctionComponent = observer(() => {
    const {store, error, loading, data} = useQuery(store =>
            store.queryAllCoach(
                {},
                `
    name
    attributeOne
    attributeTwo
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
        width: '20vh',
        padding: '8px',
    };

    // @ts-ignore
    const coaches: any = data.allCoach;
    console.log(data)

    const[selected, setSelected] = useState<string>("NAME");

        const update_coach = (updated_coach: any) => {
            setSelected(updated_coach);
        }
        const submit_coach = (selected: string) => {
        console.log(selected);
    };

        let options = coaches.map((coaches: { name: string }) => {
            return {value: coaches.name, label: coaches.name.toLowerCase()}});

    if (loading) return <div>loading</div>;
    else {
        return (
            <div>
                <br/>
                <label>Coach</label>
                <br/>
                <Select style={{fontWeight: 'bold', backgroundColor: '#ffffff', color: '#ad2102', marginTop: '5px'}}
                        options={options} value={selected}
                        onChange={(updated_coach: any) => update_coach(updated_coach)}/>
                <br/>
                <button style={buttonStyles} onClick={() => submit_coach(selected)}>
                    Confirm Coach
                </button>
            </div>
        );
    }
}
)


export default CoachSelect;
