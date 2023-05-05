import React from 'react';
import styles from './searchScreen.module.css';
import { useRouter } from 'next/router';

const Listings = ({ property }) => {
    console.log(property.id)
    const router = useRouter()
    
    const handleClick = () => {
        router.push({
        pathname: '/propertyPage',
        query: {
          listingId: property.id,
        },
        });
        };
    return (
        <a onClick={handleClick}>
        <div className={styles.flat} key={property.id}>
            <div>
                <p>{property.Address}</p> {/*change to Type after property database linked*/}
            </div>
            <div>
                <img src={property.image}/>
            </div>
            <div>
                <span>PCM : {property.Price}</span> {/*change to Price after linking to property database*/}
                {/* <h3>{Title}</h3> */}
            </div>
        </div>
        </a>
    );
}

export default Listings