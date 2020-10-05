import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react";
import {useQuery} from "../models";
import {CoachSelect} from "./Dropdowns/CoachSelect";


export const Coach: React.FunctionComponent = observer(() => {
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

    if (loading) return <div>loading</div>;
    else {
        return (
            <div>
            <CoachSelect/>
            </div>
        );
        }
}
)

export default Coach;