import { useState } from "react";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import TrainingList from "./TrainingList";
import CustomerList from "./CustomerList";
import EventCalendar from "./EventCalendar";
import StatisticsGraph from "./StatisticsGraph";



function TabMenu() {
    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
    }

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Home"></Tab>
                <Tab value="two" label="Customer list"></Tab>
                <Tab value="three" label="Training list"></Tab>
                <Tab value="four" label="Calendar"></Tab>
                <Tab value="five" label="Statistics"></Tab>

            </Tabs>
            {value === 'one' && <div><h3>Welcome to the home page</h3></div>}
            {value === 'two' && <CustomerList />}
            {value === 'three' && <TrainingList />}
            {value === 'four' && <EventCalendar />}
            {value === 'five' && <StatisticsGraph />}


        </div>
    );
}
export default TabMenu;