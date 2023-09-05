"use client"
import React, { useEffect, useState } from 'react';

function FormDataList() {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Fetching data...");
                const res = await fetch("http://localhost:3000/api/getFormdata", {
                    cache: "no-store",
                });
                if (!res.ok) {
                    console.error("Failed to fetch data. Response status:", res.status);
                    // Log the response status to see if it provides more information
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                setFormData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching form data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            {formData.map((i, index) => (
                <div key={index}>
                    <p>{index + 1}</p>
                    <p>{i.date}</p>
                    <p>{i.phone}</p>
                </div>
            ))}
        </>
    );
}

export default FormDataList;
