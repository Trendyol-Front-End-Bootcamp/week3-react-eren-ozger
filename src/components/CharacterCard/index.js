import React from 'react'
import styles from "./styles.module.scss";
import { CharacterContext } from '../../utils/contexts/CharacterContext';
import {Link} from 'react-router-dom';

const CharacterCard = ({ item }) => {
    const { useCharacterMemo } = React.useContext(CharacterContext);
    const [firstSeenEpisode,setFirstSeenEpisodes] = React.useState(undefined)
    
    React.useEffect(() => {
        findFirstSeenEpisode(item);
    }, [item])
    return (
        <div className={styles.card} key={item?.id}  >
            <Link className={styles.cardCharacter} style={{ textDecoration: 'none' }} to={`/CharacterDetail/${item?.id}`} >
                <img className={styles.cardCharacterImg} src={item.image} />
                <div className={styles.cardCharacterDescription} >
                    <h2 className={styles.cardCharacterTitle} >{item.name}</h2>
                    <div className={styles.cardCharacterStatusContainer} >
                    <div className={styles.statusCircle} style={{ backgroundColor: item.status === "unknown" ? "gray" : item.status === "Alive" ? "green" : "red" }} />
                        <div className={styles.cardCharacterDescText} >{item.status + " - " + item.species + " - " + item.gender}</div>
                    </div>
                    <div className={styles.cardCharacterDescTitle}>Last known location:</div>
                    <div className={styles.cardCharacterDescText}>{item.location.name}</div>
                    <div className={styles.cardCharacterDescTitle}>First seen in:</div>
                    <div className={styles.cardCharacterDescText}>{firstSeenEpisode}</div>
                </div>
            </Link>
        </div>
    )



    async function findFirstSeenEpisode(item) {
        const firstSeenEpisode = await useCharacterMemo.findFirstSeenIn(item).catch((err) => {
            return err;
        }).then((res) => {
            return res;
        })
        setFirstSeenEpisodes(firstSeenEpisode);
    }

    
}

export default CharacterCard;
