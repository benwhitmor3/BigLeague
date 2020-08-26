import React, {useState, useEffect} from 'react';
import './Stadium.css';
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {Select} from "./Select";
import {Alert, Input as InputField} from "antd";
import CSS from "csstype";

type stadiumConfig = {
    stadium_name: string;
    seats: number;
    boxes: number;
    city: string;
    total: number;
    franchise: string;
};

// function for stadium component
export default function StadiumForm() {
  const {register, handleSubmit, errors, control} = useForm<stadiumConfig>();
  const onSubmit = handleSubmit(({stadium_name, seats, boxes, city, total, franchise}: stadiumConfig) => {
        console.log(stadium_name, seats, boxes, city, total, franchise);
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


    useEffect(() => {
        setTotal((seats * 15000) + (boxes * 500000));
    }, [seats, boxes]);

  //     useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/api/cities/')
  //       .then(res => {
  //         setCities(res.data)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //   })
  // }, []);

//     interface submitStadiumConfig {
//     stadium_name: string;
//     seats: number;
//     boxes: number;
//     franchise: string;
//     city: string;
// }
//
//     const submitStadium = ({stadium_name, seats, boxes, franchise, city}: submitStadiumConfig) => {
//     console.log({
//             stadium_name: stadium_name,
//             stadium_seats: seats,
//             stadium_boxes: boxes,
//             franchise: franchise,
//             city: city
//         });
//           axios.post('http://127.0.0.1:8000/api/stadiums/',
//         {
//             stadium_name: stadium_name,
//             stadium_seats: seats,
//             stadium_boxes: boxes,
//             franchise: franchise,
//             city: city
//         }
//     )
//             .then(res => {
//           console.log(res)
//         })
//         .catch(err => {
//           console.log(err)
//     })
// };

    const formStyles: CSS.Properties = {
    backgroundColor: '#d4380d',
    display: "block",
    border: '0px',
    margin: '10px',
    borderRadius: '4px',
    padding: '0.5rem',
    fontSize: '14px',
    color: '#fff2e8',
    };

    const buttonStyles: CSS.Properties = {
        backgroundColor: '#ad2102',
        margin: '5px',
        marginLeft: '10px',
        border: '0px',
        borderRadius: '12px',
        fontSize: '14px',
        color: '#fff2e8',
        width: '20vh',
    };

  return (
              <form onSubmit={onSubmit}>
            <label>Stadium Name</label>
            <input name="stadium_name" style={formStyles} ref={register({
                required: {
                    value: true,
                    message: "Stadium name is a required field",
                },
                maxLength: {
                    value: 20,
                    message: 'Max stadium name length is 20',
                },
            })}/>

            <label>Seats</label>
            <input name="seats" type="number" style={formStyles} onChange={event =>
            {setSeats(event.target.valueAsNumber)}} ref={register({
                required: {
                    value: true,
                    message: "Seats is a required field",
                },
                min: {
                    value: 1,
                    message: 'At least 1 seat is required',
                },
            })}/>

            <label>Boxes</label>
            <input name="boxes" type="number" style={formStyles} onChange={event =>
            {setBoxes(event.target.valueAsNumber)}} ref={register({
                required: {
                    value: true,
                    message: "Boxes is a required field",
                },
                min: {
                    value: 1,
                    message: 'At least 1 box is required',
                },
            })}/>

            <label style = {{marginRight: '10px'}}>City</label>
            <Controller name="city" style={{fontWeight: 'bold', backgroundColor: '#ffffff', color: '#ad2102'}}
            as={Select} defaultValue={"London"} value={city}
            onChange={(event: any) => {setCity(event.target.valueAsNumber)}}
            options={options}
            control={control} rules={{ required: true }}/>

            <input name="total" type="number" style={{display: "none"}} value={total} ref={register({})}/>
            <h4 style ={{marginTop: '10px'}}>{total ? 'Construction Cost: $' + +total/1000000 + ' million' : ''}</h4>

          <input name="franchise" style={{display: "none"}} value={franchise} ref={register({})}/>

            <input type="submit" style={buttonStyles} value="Build Stadium"/>

            <br/> {errors.stadium_name && <Alert message={errors.stadium_name.message} type="error" closable/>}
            <br/>
            <br/> {errors.seats && <Alert message={errors.seats.message} type="error" closable/>}
            <br/>
            <br/> {errors.boxes && <Alert message={errors.boxes.message} type="error" closable/>}
            <br/>

        </form>
    //
    // <div className="Stadium">
    //   <h1>Stadium Construction</h1>
    //
    // <p>Enter your Stadium Name</p>
    // <input
    //       type="string"
    //       value={stadium_name}
    //       onChange={event => {
    //           setStadium_Name(event.currentTarget.value);
    //       }}
    //       placeholder="stadium name"
    //     />
    // <p/>
    //
    //     <label>
    //         Choose your city:
    //  <Select options={options} value={city} onChange={setCity}/>
    //     </label>
    //
    //
    // <p>Enter your seats and boxes</p>
    //
    //   <div className="number-inputs">
    //     <input
    //       type="number"
    //       value={seats}
    //       onChange={event => {
    //           setSeats(event.target.valueAsNumber);
    //       }}
    //       placeholder="seats"
    //       min={0}
    //     />
    //     <input
    //       type="number"
    //       value={boxes}
    //       onChange={event => {
    //           setBoxes(event.target.valueAsNumber);
    //       }}
    //       placeholder="boxes"
    //       min={0}
    //     />
    //   </div>
    //
    //   <h4>{total ? '$' + +total/100000 + ' million' : ''}</h4>
    //
    //   <div>
    //       {seats && boxes && stadium_name
    //     ? <button onClick={() =>submitStadium({stadium_name, seats, boxes, franchise, city})}>Submit Stadium Plan </button>
    //     : null}
    //   </div>
    //
    // </div>
  );
}