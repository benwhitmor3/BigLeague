import React, {useState, useEffect} from 'react';
import './Stadium.css';
import StadiumForm from "./StadiumForm";
import GMSelect from "./Dropdowns/GMSelect";
import {observer} from "mobx-react";
import {useQuery} from "../models";


export const Stadium: React.FunctionComponent = observer(() => {
    const {store, error, loading, data} = useQuery(store =>
            store.queryAllGm(
                {},
                `
    trait
    `,
    ),
    );

    if (loading) return <div>loading</div>;
    else {
        return (
            <div>
            <StadiumForm/>
            <GMSelect/>
            </div>
        );
        }
}
)

export default Stadium;