import React from 'react'
import styles from "./styles.module.scss";
import { CharacterContext } from '../../utils/contexts/CharacterContext';

const Filter = ({ filterParams, setFilterParams }) => {


    const handleChange = (value,type) => {
        if(type === 1){
            let filterParams_temp = {...filterParams};
            const gender = value.target.value === "gender_select" ? "" : value.target.value;
            filterParams_temp = {...filterParams,gender}
            setFilterParams(filterParams_temp);
        }else {
            let filterParams_temp = {...filterParams};
            const status = value.target.value === "status_select" ? "" : value.target.value;
            filterParams_temp = {...filterParams,status}
            setFilterParams(filterParams_temp);


        }
    }


    return (
        <div className={styles.filter} >
            <label >
                <div>Gender</div>
                <select value={filterParams.gender} onChange={(value)=>handleChange(value,1)} >
                    <option value="gender_select">Select a gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown" >Unknown</option>
                </select>
            </label>

            <label >
                <div>Status</div>
                <select value={filterParams.status} onChange={(value)=>handleChange(value,2)} >
                    <option value="status_select">Select a status</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown" >Unknown</option>
                </select>
            </label>

        </div>
    )


}

export default Filter;
