import React, {useContext, useState} from "react";
import {PlayerTypeModelType, StoreContext} from "../../models";
import {Select} from "../Atoms/Select";
import {observer} from "mobx-react";
import {mutateCreatePlayerQuery} from "../Utils/queries";


interface ILineup {
    current_lineup: any;
    record: any;
    setRosterAlert: (rosteralert:boolean) => void;
}

const LineupSelect: React.FunctionComponent<ILineup> = observer(({current_lineup, record, setRosterAlert} : ILineup) => {

            const store = useContext(StoreContext);

            const [selected, setSelected] = useState(current_lineup);

            const submitLineup = (updated_lineup: any) => {
                // get current lineup array
                let lineupArray: Array<string> = record.franchise.playerSet.map((p: PlayerTypeModelType) =>
                    p.lineup
                );
                // add updated_lineup selection
                lineupArray.push(updated_lineup);
                // if legal lineup run mutation
                if (lineupArray.filter(x => x === "starter").length <= 5 && lineupArray.filter(x => x === "rotation").length <= 3) {
                    setSelected(updated_lineup);
                    store.mutateCreatePlayer({
                            "playerInput": {
                                "name": record.name,
                                "suit": record.suit,
                                "age": record.age,
                                "pv": record.pv,
                                "epv": record.epv,
                                "sEpv": record.sEpv,
                                "contract": record.contract,
                                "tOption": record.tOption,
                                "pOption": record.pOption,
                                "renew": record.renew,
                                "salary": record.salary,
                                "grade": record.grade,
                                "franchiseId": record.franchise.id,
                                "trainer": record.trainer,
                                "year": record.year,
                                "lineup": updated_lineup,
                                "leagueId": store.User.franchise.league.id
                            }
                        }, mutateCreatePlayerQuery,
                        undefined
                    )
                }
                // else set roster alert pop-up
                else {
                    setRosterAlert(true)
                }
            };

            let other_values = ["starter", "rotation", "bench"].filter(x => ![current_lineup].includes(x));

            const options = (other_values: Array<string>) => {
                if (other_values.length === 2) {
                    return [{value: current_lineup, label: current_lineup}, {
                        value: other_values[0],
                        label: other_values[0]
                    },
                        {value: other_values[1], label: other_values[1]}];
                } else {
                    return [{value: current_lineup, label: current_lineup}, {
                        value: other_values[0],
                        label: other_values[0]
                    },
                        {value: other_values[1], label: other_values[1]}, {value: other_values[2], label: other_values[2]}];
                }
            };

            return <Select options={options(other_values)} value={selected}
                           onChange={(updated_lineup: any) => submitLineup(updated_lineup)}/>
        }
);

export default LineupSelect;