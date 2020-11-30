import React from 'react';
import StadiumForm from "/Users/buw0017/projects/TheBigLeagueGame/frontend/src/components/Forms/StadiumForm";
import StadiumDisplay from "/Users/buw0017/projects/TheBigLeagueGame/frontend/src/components/Forms/StadiumDisplay";
import {observer} from "mobx-react";
import {useQuery} from "/Users/buw0017/projects/TheBigLeagueGame/frontend/src/models";


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
            <StadiumDisplay/>
            </div>
        );
        }
}
)

export default Stadium;

