import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../models";
import {Statistic, Card} from 'antd';


export const Stadium: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User == undefined) return <div>loading</div>;
        else {
            return (
                <div className="site-card-border-less-wrapper">
                    <Card title="Stadium" bordered={false} style={{width: 300}}>
                        <Statistic title="Name" value={store.User.franchise.stadium.stadiumName}/>
                        <Statistic title="Seats" value={store.User.franchise.stadium.seats}/>
                        <Statistic title="Boxes" value={store.User.franchise.stadium.boxes}/>
                        <Statistic title="Grade" value={store.User.franchise.stadium.grade}/>
                        <Statistic title="Max Grade" value={store.User.franchise.stadium.maxGrade}/>
                    </Card>
                </div>
            );
        }
    }
)

export default Stadium;
