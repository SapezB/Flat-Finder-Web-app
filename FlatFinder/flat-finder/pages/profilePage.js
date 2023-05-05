import React, { useState, useEffect } from 'react';
import styles from '../styles/profile.module.css'
import Search from '../components/Search/Search';
import { ReactSession } from 'react-client-session';
import { useLocalStorage } from '../components/useLocalStorage/useLocalStorage';


function ProfilePage(props) {
    const [data, setData] = useState()
    const [connects, setConnects] = useState([])
    const uid = ReactSession.get('uid')


    useEffect(() => {  //Fetch profile from flask server and store into state 'data'.
        fetch('http://127.0.0.1:5000/get_profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : uid })
        }).then(
            response => response.json().then(
                data => {
                    setData(data)
                    console.log(data)
                })
        );
    }, [])

    useEffect(() => {  //Fetch listings from flask server and store into state 'data'.
        fetch("http://127.0.0.1:5000/get_connects").then(
            response => response.json().then(
                connects => {
                    setConnects(connects)
                    console.log(connects)
                })
        );
    }, [])

    return (
        <div>
            <Search></Search>
            <div class={styles.containers}>
                <div class={styles.containerToColomn}>
                    <section class={styles.containerToRow}>
                        <div class={styles.profileContainer}>
                            <div class={styles.userPhoto}>
                                {/* <img src={"mwphoto"} alt="userPhoto"/> */}
                            </div>
                            <ul class={styles.infoBox}>
                                {(typeof data == 'undefined') ? (
                                    <div class={styles.username}>Loading...</div>
                                ) : (<div>
                                    <div class={styles.username}>{data.name}</div>
                                    <div class={styles.jobPosition}>{data.job}</div>
                                    <div class={styles.location}>{data.location}</div>
                                    <div class={styles.contact}>
                                        {/* <Link to="/">Contact info</Link> */}
                                        Contact info :
                                        Phone : {data.phoneNum}
                                        Email : {data.email}
                                    </div>
                                </div>
                                )}
                            </ul>
                        </div>

                    </section>

                    <div class={styles.connectSuggestContainer}>
                        <section class={styles.list}>
                            {(typeof connects === 'undefined') ? (
                                <p>Loading...</p>
                            ) : (
                                connects.map((connect, i) =>
                                    <div key={i} class={styles.listElement}>
                                        <div class={styles.userPhoto}>
                                            {/* <img src={"mwphoto"} alt="userPhoto"/> */}
                                        </div>
                                        <ul class={styles.infoBox}>
                                            <div class={styles.username}>{connect.name}</div>
                                            <div class={styles.jobPosition}>{connect.job}</div>
                                        </ul>
                                        <button class={styles.button}>Connect</button>
                                    </div>
                                ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
