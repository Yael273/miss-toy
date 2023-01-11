import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { loadToys } from '../store/action/toy.action';
import { LabelsCountChart } from '../cmps/label-count-chart';
import { LabelsPriceChart } from '../cmps/label-price-count';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function DashBoard() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    function getChartsData() {
        const chartsData = toys.reduce(
            (acc, toy) => {
                toy.labels.forEach((label) => {
                    acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1
                    acc.labelsPriceMap[label] = acc.labelsPriceMap[label] ? (acc.labelsPriceMap[label] += toy.price) : toy.price
                })

                return acc
            },
            { labelsCountMap: {}, labelsPriceMap: {} }
        )
        Object.keys(chartsData.labelsPriceMap).forEach((label) => (chartsData.labelsPriceMap[label] /= chartsData.labelsCountMap[label]))

        return chartsData
    }

    const { labelsPriceMap, labelsCountMap } = getChartsData()

    return (
        <section className="home-page">
            <h2>Toys Data</h2>
            <div className="charts flex">
                <LabelsCountChart dataMap={labelsCountMap} />
                <LabelsPriceChart dataMap={labelsPriceMap} />
            </div>
        </section>
    )
    
}
