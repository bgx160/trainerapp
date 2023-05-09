import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import { API_URL } from './constants';
import dayjs from 'dayjs'
import useFetch from "../hooks/useFetch";
import 'react-big-calendar/lib/css/react-big-calendar.css'

function EventCalendar() {
    const { data, loading, error } = useFetch(`${API_URL}/gettrainings`);

    const localizer = dayjsLocalizer(dayjs);

    const isValidTraining = (training) => {
        if (training.customer && training.activity && training.date) {
            return true;
        }
    }

    const events = data.map(training => {
        if (isValidTraining(training)) {
            return {
                title: `${training.activity} with ${training.customer.firstname} ${training.customer.lastname}`,
                start: new Date(training.date),
                end: new Date(dayjs(training.date).add(training.duration, 'minute'))
            }
        }
        return null;
    });

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong. Try refreshing the page</p>}
            {data &&
                <div style={{ height: 650, width: 1200 }}>
                    <Calendar
                        defaultView="week"
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </div>
            }
        </>
    );
}
export default EventCalendar;