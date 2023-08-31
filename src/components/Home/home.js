"use client"
import Head from 'next/head';
import React from 'react'
import { useState, useEffect, useRef } from "react"
// import MapComponent from './MapComponent';
import Autocomplete from 'react-google-autocomplete';
import 'react-phone-number-input/style.css'
// import PhoneMap from "./PhoneMap";
// import ChooseCategory from "../ChooseCategory/";
import Modal from "../Modal/Modal";
import TripSummary from "../TripSummary/TripSummary";
// import SuccessBooking from "./SuccessBooking";


import Typed from 'typed.js'; // Make sure to install the 'typed.js' library using npm or yarn
import MapComponent from '../MapComponent/MapComponent';
import styles from './home.module.css'
import Script from 'next/script';

const HeroHome = ({ message, setMessage }) => {
    const [activeMenu, setActiveMenu] = useState('menu1');
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [tourPackage, setPackage] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [days, setDays] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [carType, setCarType] = useState('');
    const [showSummary, setShowSummary] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState(null);
    const [travelTime, setTravelTime] = useState(null);
    const [isMobileViewMain, setIsMobileViewMain] = useState(false);
    const [animatedText, setAnimatedText] = useState('Most Reliable');
    const words = ['Most Reliable', 'Most Efficient', 'Cost Saving'];


    let isMobileMain = false;
    const typedRef = useRef(null);
    useEffect(() => {
        const options = {
            strings: ["Top-Rated", " Affordable", "Most Reliable"],
            // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
            stringsElement: null,
            // typing speed
            typeSpeed: 30,
            // time before typing starts
            startDelay: 1200,
            // backspacing speed
            backSpeed: 20,
            // time before backspacing
            backDelay: 500,
            // loop
            loop: true,
            // false = infinite
            loopCount: 5,
            // show cursor
            showCursor: false,
            // character for cursor
            cursorChar: "|",
            // attribute to type (null == text)
            attr: null,
            // either html or text
            contentType: 'html',
            // call when done callback function
            callback: function () { },
            // starting callback function before each string
            preStringTyped: function () { },
            //callback for every typed string
            onStringTyped: function () { },
            // callback for reset
            resetCallback: function () { }
        };

        if (typedRef.current) {
            const typed = new Typed(typedRef.current, options);

            return () => {
                typed.destroy(); // Destroy the Typed instance to prevent memory leaks
            };
        }
    }, []);
    useEffect(() => {
        calculateDirections();
        isMobileMain = window.innerWidth <= 900; // Adjust the breakpoint as per your mobile view design
        setIsMobileViewMain(isMobileMain);

    }, [fromLocation, toLocation, isMobileViewMain]);
    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % words.length;
            setAnimatedText(words[currentIndex]);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);
    console.log(travelTime)
    console.log(isMobileView)
    const calculateDirections = async () => {
        const googleObject = window.google;
        if (googleObject) {
            const directionsService = new googleObject.maps.DirectionsService();
            const origin = fromLocation; // Replace with your origin address
            const destination = toLocation; // Replace with your destination address

            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                        setDistance(result.routes[0].legs[0].distance.text);
                        calculateTravelTime(result.routes[0].legs[0].duration.value);
                    }
                }
            );
        }
    };
    const calculateTravelTime = duration => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const finalMin = Math.floor((100 / 60) * minutes)
        const formattedTime = `${hours}.${finalMin} hours`;
        setTravelTime(formattedTime);
    };
    const formValidation = () => {
        if (activeMenu == 'menu2') {
            if (city == "") {
                alert("City is required!");
            }
            else if (tourPackage == "") {
                alert("Package is required!");
            }
            else if (date == "") {
                alert("date is required!");
            }
            else if (phone == "" || phone.length !== 10) {
                alert("A valid Phone Number is required!");
            }
            else {
                handleBookTaxi();
            }
        }
        else if (activeMenu == 'round') {
            if (fromLocation == "") {
                alert("Source Location is required!");
            }
            else if (toLocation == "") {
                alert("Destination is required!");
            }
            else if (date == "") {
                alert("date is required!");
            }
            else if (time == "") {
                alert("Time is required!");
            }
            else if (returnDate == "") {
                alert("Return Date is required!");
            }
            else if (phone == "" || phone.length !== 10) {
                alert("A valid Phone Number is required!");
            }
            else {
                handleBookTaxi();
            }

        }
        else if (activeMenu == 'oneway') {
            if (fromLocation == "") {
                alert("Source Location is required!");
            }
            else if (toLocation == "") {
                alert("Destination is required!");
            }
            else if (date == "") {
                alert("date is required!");
            }
            else if (time == "") {
                alert("Time is required!");
            }
            else if (phone == "" || phone.length !== 10) {
                alert("A valid Phone Number is required!");
            }
            else {
                handleBookTaxi();
            }
        }
        else if (activeMenu == 'menu3') {
            if (city == "") {
                alert("City is required!");
            }
            else if (days == "") {
                alert("Days is required!");
            }
            else if (date == "") {
                alert("date is required!");
            }
            else if (phone == "" || phone.length !== 10) {
                alert("A valid Phone Number is required!");
            }
            else {
                handleBookTaxi();
            }
        }
    }

    const generateTimeOptions = () => {
        const timeOptions = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 15) {
                const hour = h.toString().padStart(2, "0");
                const minute = m.toString().padStart(2, "0");
                const timeLabel = `${hour}:${minute}`;
                timeOptions.push(
                    <option key={`${hour}-${minute}`} value={`${hour}:${minute}`}>
                        {timeLabel}
                    </option>
                );
            }
        }
        return timeOptions;
    };
    const handleBookTaxi = () => {
        const isMobile = window.innerWidth <= 900; // Adjust the breakpoint as per your mobile view design
        setIsMobileView(isMobile);

        if (isMobile) {

            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth', // Add smooth scrolling animation
            });
        }
        else setShowModal(true);

    };
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleCustomTimeChange = (event) => {

        setTime(event.target.value);


    };
    const inputDescriptions = {
        from: "Enter your starting location",
        to: "Enter your destination",
        date: "Select the date of your trip",
        time: "Select the time of your trip",
        phone: "Enter your phone number",
        city: "Enter your city",
        tourpackage: "Select a tour package",
        returndate: "Select the return date",
        days: "Select the number of days",
    };

    const renderCustomTimeSelect = () => {
        return (
            <div className={styles.formGroup}>
                <label htmlFor="time">Time: <div className={styles.helpTrip}>
                    <p>{inputDescriptions.time}</p>
                </div> </label>
                {/* Use the select element with generated time options and add onChange handler */}
                <select id={styles.customTime} onChange={handleCustomTimeChange}>
                    {generateTimeOptions()}
                </select>
            </div>
        );
    };

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'from':
                setFromLocation(value);
                break;
            case 'to':
                setToLocation(value);
                break;
            case 'date':
                setDate(value);
                break;
            case 'time':
                setTime(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'days':
                setDays(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'tourpackage':
                setPackage(value);
                break;
            case 'returndate':
                setReturnDate(value);
                break;
            default:
                break;
        }
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };
    const renderData = () => {
        if (activeMenu === 'menu1') {
            setActiveMenu('round');

        } else if (activeMenu === 'menu2') {
            return <div className={styles.menuContentsTrip}>
                <form className={styles.bookingForm} >
                    <div className={styles.formGroup}>
                        <label htmlFor="city">City <div className={styles.helpTrip}>
                            <p>{inputDescriptions.city}</p>
                        </div></label>
                        <input
                            type="city"
                            id="city"
                            name="city"
                            placeholder="Enter your city"
                            value={city}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone <div className={styles.helpTrip}>
                            <p>{inputDescriptions.phone}</p>
                        </div></label>
                        <div className={styles.phoneMain}> <span id={styles.phoneCode}>+91</span>  <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter your number"
                            value={phone}
                            onChange={handleInputChange}
                        />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor={styles.package}>Package <div className={styles.helpTrip}>
                            <p>{inputDescriptions.tourpackage}</p>
                        </div></label>
                        <select
                            id={styles.package}
                            name="tourpackage"
                            value={tourPackage}
                            onChange={handleInputChange}
                        >
                            <option value="">Select package</option>
                            <option value="4 hours, 40 km">4 hours, 40 km</option>
                            <option value="6 hours, 60 km">6 hours, 60 km</option>
                            <option value="8 hours, 80 km">8 hours, 80 km</option>
                            <option value="12 hours, 120 km">12 hours, 120 km</option>
                            <option value="WEDDING">WEDDING</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="date">Date <div className={styles.helpTrip}>
                            <p>{inputDescriptions.date}</p>
                        </div></label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min={getCurrentDate()}
                            value={date}
                            onChange={handleInputChange}

                        />
                    </div>

                </form>
            </div>;
        }
        else if (activeMenu === 'menu3') {
            return <div className={styles.menuContentsTrip}>
                <form className={styles.bookingForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="city">City <div className={styles.helpTrip}>
                            <p>{inputDescriptions.city}</p>
                        </div></label>
                        <input
                            type="city"
                            id="city"
                            name="city"
                            placeholder="Enter your city"
                            value={city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone<div className={styles.helpTrip}>
                            <p>{inputDescriptions.phone}</p>
                        </div></label>
                        <div className={styles.phoneMain}> <span id={styles.phoneCode}>+91</span>  <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter your number"
                            value={phone}
                            onChange={handleInputChange}
                        />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="date">Date <div className={styles.helpTrip}>
                            <p>{inputDescriptions.date}</p>
                        </div></label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min={getCurrentDate()}
                            value={date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor={styles.days}>Days <div className={styles.helpTrip}>
                            <p>{inputDescriptions.days}</p>
                        </div></label>
                        <select
                            id = {styles.days}
                            name="days"
                            value={days}
                            onChange={handleInputChange}
                        >
                            <option>Select Days</option>
                            {Array.from({ length: 15 }, (_, index) => index + 1).map(day => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="redate">Return Date<div className={styles.helpTrip}>
                            <p>{inputDescriptions.returndate}</p>
                        </div></label>
                        <input
                            type="date"
                            id="date"
                            name="returndate"
                            min={getCurrentDate()}
                            value={returnDate}
                            onChange={handleInputChange}
                        />
                    </div>


                </form>
            </div>;
        }
        else if (activeMenu === 'round') {
            return <div className={styles.menuContentsTrip}>
                <form className={styles.bookingForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="from">From <div className={styles.helpTrip}>
                            <p>{inputDescriptions.from}</p>
                        </div> </label>
                        <Autocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} onChange={(e) => setFromLocation(e.target.value)}
                            onPlaceSelected={(place) => setFromLocation(place.formatted_address)}
                            value={fromLocation}
                            options={{
                                types: ['(cities)'],
                            }}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="to">To <div className={styles.helpTrip}>
                            <p>{inputDescriptions.to}</p>
                        </div> </label>
                        <Autocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} onChange={(e) => setToLocation(e.target.value)}
                            onPlaceSelected={(place) => setToLocation(place.formatted_address)}
                            value={toLocation}
                            options={{
                                types: ['geocode'],
                            }}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone<div className={styles.helpTrip}>
                            <p>{inputDescriptions.phone}</p>
                        </div> </label>
                        <div className={styles.phoneMain}> <span id={styles.phoneCode}>+91</span>  <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter your number"
                            value={phone}
                            onChange={handleInputChange}
                        />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="date">Date <div className={styles.helpTrip}>
                            <p>{inputDescriptions.date}</p>
                        </div> </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min={getCurrentDate()}
                            value={date}
                            onChange={handleInputChange}
                        />
                    </div>


                    {renderCustomTimeSelect()}

                    <div className={styles.formGroup}>
                        <label htmlFor="date">Return Date<div className={styles.helpTrip}>
                            <p>{inputDescriptions.returndate}</p>
                        </div> </label>
                        <input
                            type="date"
                            id="date"
                            name="returndate"
                            min={getCurrentDate()}
                            value={returnDate}
                            onChange={handleInputChange}
                        />
                    </div>


                </form>
            </div>;
        }
        else if (activeMenu === 'oneway') {
            return <div className={styles.menuContentsTrip}>
                <form className={styles.bookingForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="from">From <div className={styles.helpTrip}>
                            <p>{inputDescriptions.from}</p>
                        </div> </label>
                        <Autocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} onChange={(e) => setFromLocation(e.target.value)}
                            onPlaceSelected={(place) => setFromLocation(place.formatted_address)}
                            value={fromLocation}
                            options={{
                                types: ['geocode'],
                            }}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="to">To <div className={styles.helpTrip}>
                            <p>{inputDescriptions.to}</p>
                        </div></label>
                        <Autocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} onChange={(e) => setToLocation(e.target.value)}
                            onPlaceSelected={(place) => setToLocation(place.formatted_address)}
                            value={toLocation}
                            options={{
                                types: ['geocode'],
                            }}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone <div className={styles.helpTrip}>
                            <p>{inputDescriptions.phone}</p>
                        </div></label>
                        <div className={styles.phoneMain}> <span id={styles.phoneCode}>+91</span>  <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter your number"
                            value={phone}
                            onChange={handleInputChange}
                        />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="date">Date <div className={styles.helpTrip}>
                            <p>{inputDescriptions.date}</p>
                        </div></label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min={getCurrentDate()}
                            value={date}
                            onChange={handleInputChange}
                        />
                    </div>


                    {renderCustomTimeSelect()}




                </form>
            </div>;
        }
        // Add more menu options and corresponding data here if needed
        return null;
    };
    return (
        <>
            {/* <Navbar /> */}

            <div className={styles.homeContainer} id="hero">
                <div className={styles.hero}>
                    {/* <img src={hero} alt="" /> */}
                    <div className={styles.heroTitle}>
                        <p>
                            Your Taxi Service in Patna :{" "}
                            <span className={`${styles.typed} typed`} ref={typedRef}></span>
                        </p>
                    </div></div>

                <div className={styles.contentContainer}>
                    <div className={styles.formContainer}>
                        <div className={styles.tripOptions}>
                            <ul className={styles.menuTrip}>
                                <li
                                    className={`${styles.menuItemTrip} ${activeMenu === 'round' || activeMenu === 'oneway' ? styles.active : ''}`}
                                    onClick={() => handleMenuClick('menu1')}
                                >
                                    OutStation
                                </li>
                                <li
                                    className={`${styles.menuItemTrip} ${activeMenu === 'menu2' ? styles.active : ''}`}
                                    onClick={() => handleMenuClick('menu2')}
                                >
                                    Local
                                </li>
                                <li
                                    className={`${styles.menuItemTrip} ${activeMenu === 'menu3' ? styles.active : ''}`}
                                    onClick={() => handleMenuClick('menu3')}
                                >
                                    Car Package
                                </li>
                            </ul>
                        </div>

                        {
                            (activeMenu == "menu1" || (activeMenu == "oneway" || activeMenu == "round")) && (
                                <>
                                    <div className={styles.tripOptionsOut}>
                                        <ul className={styles.menuTripOut}>
                                            <li
                                                className={`${styles.menuItemTrip} ${activeMenu === 'round' ? styles.active : ''}`}
                                                onClick={() => handleMenuClick('round')}
                                            >
                                                Round Trip
                                            </li>
                                            <li
                                                className={`${styles.menuItemTrip} ${activeMenu === 'oneway' ? styles.active : ''}`}
                                                onClick={() => handleMenuClick('oneway')}
                                            >
                                                One-Way Trip
                                            </li>
                                            {/* Add more menu items here if needed */}
                                        </ul>
                                    </div>


                                </>
                            )
                        }

                        {renderData()}
                        {!isMobileViewMain && <div className={styles.formButton}>
                            {(activeMenu == "round" || activeMenu == "oneway") && <label htmlFor="distance-calc">Distance : {distance}</label>}
                            <button type="submit" onClick={() => formValidation()}>Book Taxi</button>

                            {(activeMenu == "round" || activeMenu == "oneway") && <label htmlFor="distance-calc">Time : {travelTime}</label>}
                        </div>}
                        {isMobileViewMain && <div className={styles.formButton}>
                            <div>  {(activeMenu == "round" || activeMenu == "oneway") && <label htmlFor="distance-calc">Distance : {distance}</label>}
                                {(activeMenu == "round" || activeMenu == "oneway") && <label htmlFor="distance-calc">Time : {travelTime}</label>}
                            </div>
                            <button type="submit" onClick={() => formValidation()}>Book Taxi</button>
                        </div>}
                    </div>


                    <div className={styles.map}>
                        <MapComponent fromLocation={fromLocation} toLocation={toLocation} />
                    </div> </div>

            </div>



            {/* {showModal && <ChooseCategory setShowModal={setShowModal} />       } */}

            {showModal && <Modal showModal={showModal} setShowModal={setShowModal} carType={carType} setCarType={setCarType} setShowSummary={setShowSummary} showSummary={showSummary} />}
            {isMobileView && <ChooseCategory setCarType={setCarType} setShowSummary={setShowSummary} />}
            {showSummary && <TripSummary showSummary={showSummary} setShowSummary={setShowSummary} fromLocation={fromLocation} toLocation={toLocation} date={date} city={city} returnDate={returnDate} carType={carType} activeMenu={activeMenu} tourPackage={tourPackage} phone={phone} days={days} time={time} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />}
            {isSubmitted && <SuccessBooking />}



        </>
    )
}

export default HeroHome
