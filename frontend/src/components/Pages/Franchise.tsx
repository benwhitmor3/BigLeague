import React from 'react';
import GMSelect from "/Users/buw0017/projects/TheBigLeagueGame/frontend/src/components/Dropdowns/GMSelect";
import {observer} from "mobx-react";
import {useQuery} from "/Users/buw0017/projects/TheBigLeagueGame/frontend/src/models";
import {Coach} from "/Users/buw0017/projects/TheBigLeagueGame/frontend/src/components/Dropdowns/Coach";


export const Franchise: React.FunctionComponent = observer(() => {
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
            <GMSelect/>
            <Coach/>
            </div>
        );
        }
}
)

export default Franchise;

