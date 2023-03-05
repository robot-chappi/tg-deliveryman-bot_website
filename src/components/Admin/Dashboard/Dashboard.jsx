import React from 'react';
import { useOutletContext } from "react-router-dom"
import Header from "../Header/Header";
import BarChart from "../../../charts/barChart";
import {barChartDataDailyTraffic, barChartOptionsDailyTraffic} from "../../../variables/charts";
import TableProducts from "./TableProducts/TableProducts";
import Panel from "../Panel/Panel";
import MiniStatistic from "../../../charts/MiniStatistic";
import Footer from "../Footer/Footer";


const Dashboard = () => {
    // eslint-disable-next-line no-unused-vars
    const [currentUser] = useOutletContext()

    const hour = new Date().getHours();

    return (
        <div>
            <Header/>
            <Panel user={'Chappic'} hour={hour}/>
            <div style={{overflowX: 'clip', position: 'relative'}}>
                <div className="absolute top-5 w-72 h-72 bg-pink-300 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="absolute left-40 w-72 h-72 bg-pink-700 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000" style={{bottom: '-40rem'}}></div>
                <div className="absolute left-30 w-72 h-72 bg-pink-100 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000" style={{bottom: '-60rem'}}></div>
                <div className="absolute left-40 w-72 h-72 bg-pink-700 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000" style={{bottom: '-40rem'}}></div>
            </div>
            <section id={'statistic'} className={'bg-white dark:bg-gray-900 pt-14'}>
                <MiniStatistic application={380} users={400} subscribers={89} products={400}/>
                <div>
                    <h2 className="mb-4 text-4xl text-center tracking-tight font-extrabold text-gray-900 dark:text-white">Продажи</h2>
                    <BarChart chartData={barChartDataDailyTraffic} chartOptions={barChartOptionsDailyTraffic}/>
                </div>
            </section>
            <TableProducts/>
            <Footer/>
        </div>
    );
};

export default Dashboard;