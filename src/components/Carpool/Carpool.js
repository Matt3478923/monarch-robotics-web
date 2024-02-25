import React from 'react';
import "./Carpool.css"

export default function Carpool() {
    return(
        <div className="mainDiv">
            <h1>Carpool</h1>
            <div className="alert">
                <h2>Warning!</h2>
                <p>You have not completed carpool registraion!</p>
                <p>Please complete carpool registraition in user preferences to enroll in carpool to events</p>
            </div>
            <br/>
            <div className="carpoolEvents">
                <div className="carpoolEvent">
                    <div className="carpoolEventInformation">
                        <p className="carpoolEventTitle">Kickoff</p>
                        <p className="carpoolEventDate">Jan, 26, 2024</p>
                        <p className="carpoolEventLocation">Denver Coliseum</p>
                        <div className="carpoolEventActions">
                            <button>Add To Calender</button>
                            <button>Add Driver</button>
                        </div>
                    </div>
                    <div className="carpoolVehicle">
                        <div className="carpoolVehicleInformation">
                            <div className="carpoolVehicleInformationTitle">
                                <div className="carpoolVehicleDriverName">Zoe</div>
                                <div className="carpoolVehiclePersons">5 Passengers</div>
                            </div>
                            <div className="carpoolVehicleInformationTrip">
                                <div className="carpoolLocationDeparture">Monarch High School</div>
                                <div className="carpoolLocationIcons">

                                    <div className="carpoolLocationLeftArrowIcons">
                                        <img height="20px" src="https://img.icons8.com/material-rounded/24/arrow.png"
                                             alt="arrow"/>
                                    </div>
                                    <div className="carpoolLocationCenterIcons">
                                        <img height="40px" src="https://img.icons8.com/ios/50/sedan.png" alt="car"/>
                                    </div>
                                    <div className="carpoolLocationRightArrowIcons">
                                        <img height="20px" src="https://img.icons8.com/material-rounded/24/arrow.png"
                                             alt="arrow"/>
                                    </div>
                                </div>
                                <div className="carpoolLocationArrival">Denver Coliseum</div>
                            </div>
                        </div>
                        <div className="carpoolVehiclePassengers">
                            <div className="tripTitle">Departure</div>
                            <div className="carpoolRemaining">Remaining Spots: 0</div>
                            <div className="carpoolMember">Allison</div>
                            <div className="carpoolMember">Matthew</div>
                            <div className="carpoolMember">Zoe</div>
                            <div className="carpoolMember">Nick</div>
                            <div className="carpoolMember">Devin</div>
                        </div>
                        <div className="carpoolVehiclePassengers">
                            <div className="tripTitle">Return</div>
                            <div className="carpoolRemaining">Remaining Spots: 1</div>
                            <div className="carpoolMember">Allison</div>
                            <div className="carpoolMember">Matthew</div>
                            <div className="carpoolMember">Zoe</div>
                            <div className="carpoolMember">Nick</div>
                            <div className="carpoolJoin">
                                <button>Join</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}