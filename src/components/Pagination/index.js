import React from 'react'
import styles from "./styles.module.scss";
import { CharacterContext } from '../../utils/contexts/CharacterContext';

const Pagination = ({filterParams}) => {

    const { state,useCharacterMemo} = React.useContext(CharacterContext);

    const clickHandler = (type) => {
        if(type === "prev" && state?.apiInfo?.prev !== null ){
            let wholeApiLine = state.apiInfo.prev.split("//rickandmortyapi.com");
            useCharacterMemo.getCharacters(null,null,null,wholeApiLine[1]);
        }else if (type === "next" && state?.apiInfo?.next !== null ){
            let wholeApiLine = state.apiInfo.next.split("//rickandmortyapi.com");
            useCharacterMemo.getCharacters(null,null,null,wholeApiLine[1]);
        }
    }


    return (
        <div className={styles.pagination} >
            <div className={styles.paginationButtons} >
                <div className={styles.paginationButtonsBtn} onClick={()=>clickHandler("prev")}
                    style={{ color: state?.apiInfo?.prev === null ? "black" : "orange" }} >Prev</div>
                <div className={styles.paginationButtonsTitle} >{findCurrentPage()}</div>
                <div className={styles.paginationButtonsBtn} onClick={()=>clickHandler("next")}
                    style={{ color: state?.apiInfo?.next === null ? "black" : "orange" }} >Next</div>
            </div>
        </div>
    )

    function findCurrentPage(){
        let prev = state?.apiInfo?.prev;
        let next = state?.apiInfo?.next;
        if(!next && prev){
            let splitArr = prev.split("page=");
            let splitAgain = splitArr[1].split("&");
            return parseInt(splitAgain[0]);
        }else if(next) {
            let splitArr = next.split("page=");
            let splitAgain = splitArr[1].split("&");
            return parseInt(splitAgain[0]) -1;
        }
    }
}

export default Pagination;
