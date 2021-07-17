import React,{useEffect} from 'react'
import styles from "./styles.module.scss";
import Header from '../../components/Header/index';
import Footer from '../../components/Footer';
import { CharacterContext } from '../../utils/contexts/CharacterContext';
import CharacterCard from '../../components/CharacterCard/index';
import Pagination from '../../components/Pagination/index';


const Home = () => {
    const { state, useCharacterMemo } = React.useContext(CharacterContext);
    const [filterParams,setFilterParams] = React.useState({
        status : "",
        gender :"",
    })
    useEffect(() => {

        //page - status - gender 
       useCharacterMemo.getCharacters("",filterParams.status,filterParams.gender);
    }, [])


    return (
        <>
            <div className={styles.home}  >
                <Header />
                <Pagination filterParams={filterParams} />
                {renderHomeContent()}
                <Footer />
            </div>
        </>
    )

    function renderHomeContent() {
        return (
            <div className={styles.homeContent} >
                {state.characterList && 
                state.characterList.length > 0 && state.characterList.map((item)=>{
                    return(
                            <CharacterCard  item={item} />
                    )
                })}
            </div>
        )
    }
}

export default Home;
