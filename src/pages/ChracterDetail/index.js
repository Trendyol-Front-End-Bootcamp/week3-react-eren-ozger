import React from 'react'
import styles from "./styles.module.scss";
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import { useParams } from "react-router-dom";
import CharacterCard from '../../components/CharacterCard/index';
import axios from '../../utils/axios';

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = React.useState(null)
    const [episodeList, setEpisodeList] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        axios.get(`/api/character/${id}`).catch((err) =>
            setError(err.message)
        ).then((response) => {
            console.log("response.data : ",response.data)
            setCharacter(response.data)
            let episodesIdArray = [];
            response.data.episode.reverse().forEach((item,index) => {
                if (item) {
                    let splitArr = item?.split("/");
                    let episode_id = splitArr[splitArr.length - 1];
                    if (episode_id) {
                        index < 10 && episodesIdArray.push(episode_id)
                    }
                }
            });

            let commaSeperatedString = episodesIdArray.length === 1 ? episodesIdArray[0] : episodesIdArray.join(",");
            axios.get(`/api/episode/${commaSeperatedString}`).catch((err) =>
                setError(err.message)
            ).then((response) => {
                setEpisodeList(response.data.length > 0 ? response.data : [response.data]);
            })
        
        }
        )
    }, [id])


    return (
        <>
            <div className={styles.characterDetail}  >
                <Header />
                {renderCharacterDetail()}
                <Footer />
            </div>
        </>
    )

    function renderCharacterDetail() {
        return (
            <div className={styles.characterDetailContent}>
                <div className={styles.characterDetailContentContainer}>
                    {character !== null && <CharacterCard item={character} />}
                    <div className={styles.lastEpisodesContainer}>
                        <div className={styles.lastEpisodesContainerTitle}>{`Last ${episodeList?.length} episode(s)`}</div>
                        {episodeList?.length>0 && 
                        episodeList.map((item)=>{
                            return renderEpisodeItem(item);
                        }) }
                    </div>
                </div>
            </div>
        )
    }

    function renderEpisodeItem(item){
        return(
            <div key={item.id} className={styles.lastEpisodesContainerEpisodes}>
                {item.episode + " - " + item.name} <div className={styles.grayText}>{item.air_date}</div>
            </div>
        )
    }
}

export default CharacterDetail;
