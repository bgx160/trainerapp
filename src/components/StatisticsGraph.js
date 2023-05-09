import { groupBy, sumBy, toArray } from "lodash";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { API_URL } from "./constants";
import useFetch from "../hooks/useFetch";

function StatisticsGraph() {
    const { data, loading, error } = useFetch(`${API_URL}/api/trainings`);

    const dataGroupedByActivity = toArray(groupBy(data.content, training => training.activity));

    const chartData = dataGroupedByActivity.map(object => {
        return {
            name: object[0].activity,
            duration: sumBy(object, object => object.duration)
        }
    });

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong. Try refreshing the page</p>}
            {data &&
                <BarChart width={1000} height={300} data={chartData} barSize={100}>
                    <CartesianGrid />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'duration in minutes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#3f50b5" />
                </BarChart>
            }
        </>
    );
}
export default StatisticsGraph;