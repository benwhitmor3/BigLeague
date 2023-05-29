import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Table} from 'antd';
import {observer} from "mobx-react";
import {IObservableArray, observable} from 'mobx';
import {StoreContext, FranchiseTypeModelType} from "../../../models";
import {tableStyles} from "./TableStyles";


export const LeaderboardTable: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        const columns = [
            {
                title: 'Franchise',
                dataIndex: ['franchise'],
                key: 'franchise',
            },
            {
                title: 'Profit (m)',
                dataIndex: 'profit',
                key: 'profit',
                sorter: (a: any, b: any) => a.profit - b.profit,
                defaultSortOrder: 'descend',
                render: (profit: number) => <span>{(profit / 1000000)?.toFixed(0)}</span>,
            },
        ];

        // need to map to array —– can't use toJS(franchiseSet) as that doesn't carry mob x "getter" which has profit
        let data: IObservableArray<FranchiseTypeModelType> =  observable(store.User.league.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise))

        return (
            <div>
                <Table
                    rowKey="id"
                    // @ts-ignore (need this to add defaultSorter for Wins)
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                    style={tableStyles}
                />
            </div>
        );
    }
)

export default LeaderboardTable;
