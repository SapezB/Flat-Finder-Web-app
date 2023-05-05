import { useRouter } from "next/router";
import styles from "./listings.module.css"

export const Favorites = (listing) =>{

    const router = useRouter()

    const handleClick = () => {
        router.push({
        pathname: '/propertyPage',
        query: {
          listingId: listing['listing'].id,
        },
        })
    }
    console.log(listing['listing'].id)
    return(
        <div key={listing['listing'].id}>
            <a onClick={handleClick}>
               <img src={listing['listing'].image} className={styles.img}></img>
            </a>
            <h3>{listing.Address}</h3>
            <p>Price : {listing['listing'].Price}</p>
      
       </div>
    )
}