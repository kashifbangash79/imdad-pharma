import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    // States to hold amounts fetched from the database
    const [totalAmount, setTotalAmount] = useState(1000000);
    const [todayReceived, setTodayReceived] = useState(400000);
    const [todaySent, setTodaySent] = useState(456970);

    // Fetch data from the database
    useEffect(() => {
        // Replace with your API calls to fetch the data
        fetch('/api/amounts')
            .then(response => response.json())
            .then(data => {
                setTotalAmount(data.totalAmount);
                setTodayReceived(data.todayReceived);
                setTodaySent(data.todaySent);
            });
    }, []);

    const arrowUp = (
        <svg className="w-6 h-6 inline-block text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 5a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L11 7.414V14a1 1 0 11-2 0V7.414L7.707 9.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 5z" clipRule="evenodd" />
        </svg>
    );

    const arrowDown = (
        <svg className="w-6 h-6 inline-block text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 15a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L9 12.586V6a1 1 0 112 0v6.586l1.293-1.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 15z" clipRule="evenodd" />
        </svg>
    );

    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl">
                            IMDAD PHARMA 💊
                            <span className="hidden sm:block text-4xl">IMDAD PHARMA 💊</span>
                        </h2>

                        <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                            to="/"
                        >
                            <svg
                                fill="white"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            >
                                <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                            </svg>
                            &nbsp; IMDAD PHARMA
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full">
                    <img className="w-96" src="https://i.ibb.co/5BCcDYB/Remote2.png" alt="image1" />
                </div>
            </aside>

            <div className="grid place-items-center sm:mt-20">
                <img className="sm:w-96 w-48" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image2" />
            </div>

            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">IMDAD PHARMA 💊</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mx-4 sm:mx-16 my-10">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-lg font-medium">Total Amount</h3>
                    <p className="text-2xl font-bold text-green-600">
                        {totalAmount >= 0 ? arrowUp : arrowDown} Rs. {totalAmount}
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-lg font-medium">Today Received</h3>
                    <p className="text-2xl font-bold text-blue-600">
                        {todayReceived >= 0 ? arrowUp : arrowDown} Rs. {todayReceived}
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-lg font-medium">Today Sent</h3>
                    <p className="text-2xl font-bold text-red-600">
                        {todaySent >= 0 ? arrowUp : arrowDown} Rs. {todaySent}
                    </p>
                </div>
            </div>
        </div>
    );
}
