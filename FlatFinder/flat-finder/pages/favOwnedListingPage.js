import styles from '../styles/listings.module.css';
import Search from '../components/Search/Search';
import { useState, useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import Link from 'next/link';
import RemoveListingButton from '../components/removeListingButton/removeListingButton';
import { useRouter } from 'next/router';
import { Favorites } from '../components/Favorites/Favorites';


export default function Listings() {

    const [favListings, setfavListings] = useState([])
    const [ownedListings, setownedListings] = useState([])

    const uid = ReactSession.get('uid')

    useEffect(() => {  //Fetch fav listings from flask server and store into state 'favListings'.
        fetch('http://127.0.0.1:5000/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: uid })
        }).then(
            response => response.json().then(
                favs => {
                    setfavListings(favs)
                    console.log(favs)
                }))
    }, [])

    useEffect(() => {  //Fetch owned listings from flask server and store into state 'favListings'.
        fetch('http://127.0.0.1:5000/owned_listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: uid })
        }).then(
            response => response.json().then(
                owned => {
                    setownedListings(owned['owned'])
                    console.log(owned)
                }))
    }, [])

  

    return (
        <div className={styles.container}>
            <Search></Search>
            <h1 className={styles.header}>Listings and Favourites</h1>

            <div className={styles.listings}>
                <div className={styles.listingsColumn}>
                    <h2>Favourite Listings</h2>
                    {favListings?.length > 0
                        ? (
                            <div className={styles.container}>
                                {favListings.map((listing) => (
                                    <div>
                                    <Favorites listing ={listing}/>
                                  </div>
                                ))}
                            </div>
                        ) :
                        (
                            <div className={styles.empty}>
                                <h2>No properties found</h2>
                            </div>
                        )
                    }
                </div>

                <div className={styles.listingsColumn}>
                    <h2>Owned Listings</h2>
                    <Link href={'/addListing'}><button className={styles.Btn}>Post Listing</button></Link>
                    {ownedListings?.length > 0
                        ? (
                            <div className={styles.container}>
                                {ownedListings.map((listing, i) => (
                                <div key = {i}>
                                    <Link href={'/propertyPage'}>
                                      <img src={listing.image} className={styles.img}></img>
                                      </Link>
                                    <h3>{listing.Address}</h3>
                                    <p>Price : {listing.Price}</p>
                                    <RemoveListingButton listingId = {listing.id}/>
                                </div>
                        
                                ))}
                            </div>
                        ) :
                        (
                            <div className={styles.empty}>
                                <h2>No properties found</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

