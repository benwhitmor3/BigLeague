import React, {useState, useEffect} from 'react';
import {useForm, Controller} from "react-hook-form";
import {Select} from "../Reusables/Select";
import { Card } from "antd";
import CSS from "csstype";
import {useQuery} from "../../models";

type stadiumConfig = {
    stadium_name: string;
    seats: number;
    boxes: number;
    city: string;
    franchise: string;
};

// function for stadium component
export default function StadiumDisplay() {
  const {register, handleSubmit, errors, control} = useForm<stadiumConfig>();
  const {store} = useQuery(store => store.queryAllStadium(
      {},
      'stadiumName'
  ));
  const onSubmit = handleSubmit(({stadium_name, seats, boxes, city, franchise}: stadiumConfig) => {
        console.log(stadium_name, seats, boxes, city, total, franchise);
        store.mutateCreateStadium({
              "stadiumInput": {
                    "stadiumName": stadium_name,
                    "seats": seats,
                    "boxes": boxes,
                    "grade": 20,
                    "maxGrade": 20,
                    "homeFieldAdvantage": 0,
                    "city": city,
                    "franchise": "franchise"
                }
            })
        });

  const [seats, setSeats] = useState<number>(0);
  const [boxes, setBoxes] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [city, setCity] = useState<string>("London");
  // // specify city and label to avoid any type allowed
  // // options allows typescript to receive appropriate type [value: , label:]
  // const [cities, setCities] = useState([{city: "", label: ""}]);
  // let options = cities.map(cities => {return {value: cities.city, label: cities.city}});
  let options = [{ value: "london", label: "London" }, { value: "phoenix", label: "Phoenix" },
                      { value: "new york", label: "New York" }]

 let franchise = "franchise";



    const displayStyles: CSS.Properties = {
    fontSize: '14px',
    color: '#d40010',
    };


  return (
                <div className="site-card-border-less-wrapper">
    <Card title="Stadium" bordered={false} style={{ width: 300 }}>
      <p style={displayStyles}>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </div>

  );
}