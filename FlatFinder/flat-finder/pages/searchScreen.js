import React, { useEffect, useState } from 'react';
import Listings from '../components/Listings/Listings';
import Search from '../components/Search/Search';
import styles from '../styles/searchScreen.module.css';


const searchScreen = () => {
    const [properties, setProperties] = useState([]);
    const [data, setData] = useState();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        //Fetch listings from flask server and store into state 'data'.
        fetch("http://127.0.0.1:5000/listings").then((response) =>
            response.json().then((properties) => {
                setProperties(properties["listings"]);
                //newcode
                setData(properties["listings"]);
                //newcode
                console.log(properties);
            })
        );
    }, []);

    const handleSearch = (searchTerm) => {
        console.log("searchTerm:", searchTerm);
        console.log("properties:", properties);
        //newcode
        setSearchTerm(searchTerm);
        //newcode
        const filteredProperties = properties.filter(
            (property) =>
                property.Address.toLowerCase() &&
                property.Address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredProperties);
        console.log(filteredProperties);
    };

    return (
        <>
            <Search onSearch={handleSearch}></Search>

            {data?.length > 0 ? (
                <div className={styles.container}>
                    {data.map((property) => (
                        <Listings property={property} />
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <h2>No properties found</h2>
                </div>
            )}
        </>
    );
};

export default searchScreen;