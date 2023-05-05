import styles from '../styles/propertyPage.module.css';
import {PropertyDetails} from '../components/propertyDetails/propertyDetails';
import { useRouter } from 'next/router';
import Search from '../components/Search/Search'

function PropertyPage () {

    const router = useRouter();
    const listingId = router.query.listingId;
    console.log(listingId)
    return (
        <div>
            <Search></Search>
        <div className={styles.information}>
            <PropertyDetails listingId ={listingId}/>
        </div>
        </div>
    );
}

export default PropertyPage;