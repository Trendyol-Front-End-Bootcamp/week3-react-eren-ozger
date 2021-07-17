import React from 'react'
import { createAction } from '../createAction';
import axios from '../axios';

export function useCharacter() {
    
    const [state, dispatch] = React.useReducer(
        (state, action) => {
            switch (action.type) {
                case "SET_CHARACTER_LIST":
                    return {
                        ...state,
                        loading: false,
                        characterList: action.payload.results,
                        apiInfo: action.payload.info
                    };
                case "FILTER_CHARACTER_LIST":
                    console.log(action.payload.deviceid)
                    return {
                        ...state,
                        loading: false,
                        characterList: [...action.payload]
                    };
                case "SET_LOADING":
                    return {
                        ...state,
                        loading: action.payload,
                    };
                default:
                    return state;

            }
        },
        { characterList: [], apiInfo: undefined, loading: false }
    );
    /*--------------------------------------------------------------------*/

    const useCharacterMemo = React.useMemo(
        () => ({
            getCharacters: async (page) => {
                axios.get(`/api/character?page=${page}`).catch(
                    console.log("error")
                ).then((response)=>
                    dispatch(createAction("SET_CHARACTER_LIST", response.data))
                )
            },
            findFirstSeenIn : async (item) => {
                return new Promise((resolve, reject) => {
                    try {
                        let splitArr = item?.episode[0].split("/");
                        let firstEpisode_id = splitArr[splitArr.length - 1];
                        axios.get(`/api/episode/${firstEpisode_id}`).then((response)=>{
                            resolve(response?.data?.name);
                        }).catch(()=>{
                            reject("First seen data not found.");
                        }) 
                    } catch (err) {
                        reject("First seen data not found.")
                    }
                })
            } 

        }), [state]
    );


    return { useCharacterMemo, state };





}