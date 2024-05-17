import React from 'react';
import { useEffect, useState } from 'react';
import { MdPhonelinkRing } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Get = () => {
    const [card, setcard] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectValue, setSelectValue] = useState("normal")
  
    const getData = async () => {
      let response = await axios.get('http://localhost:3000/api');
      setcard(response.data);
      
    }

    useEffect(() => {
     
      getData();
  
    }, [])

    const deleteElement =  async (id) =>{
      await axios.delete('http://localhost:3000/api/'+id);
      getData();
    }

    const filteredElements = () => {

        let sorted;
    
        if (selectValue == 'a-z') {
          sorted = card.toSorted((a,b) => a.type.localeCompare(b.type))
        }else if (selectValue == 'z-a'){
          sorted = card.toSorted((a,b) => b.type.localeCompare(a.type))
        }else {
          sorted = [...card]
        }
    
    
        let typeFilter = sorted.filter((item) => item.type.toUpperCase().startsWith(inputValue.toUpperCase()))
        let descFilter = sorted.filter((item) => item.description.toUpperCase().startsWith(inputValue.toUpperCase()))
    
        let arr = [...typeFilter, ...descFilter];
    
        return arr.filter((item, i, ar) => ar.indexOf(item) === i)
    
    
      }
  
  return (

    <div className="row">
            <div className="col-lg-3">
              <select style={{ width: ' 100%' }} onChange={(e) => setSelectValue(e.target.value)}>
                <option value="normal" >
                  Normal
                </option>
                <option value="a-z">
                  A-Z
                </option>
                <option value="z-a">
                  Z-A
                </option>
              </select>
            </div>
            <div className="col-lg-9">
              <input type="text" style={{ width: '100%' }} className='mb-5' onInput={(e) => { setInputValue(e.target.value) }} />
            </div>
            {
              filteredElements().map(element => <div className="col-lg-3 col-sm-6 mb-5"><img src={element.file}/><h4>{element.type}</h4><span>{element.description}</span><br /><Link to={'/edit/'+element.id}><button>Edit</button></Link> <button onClick={()=>deleteElement(element.id)}>Delete</button></div>)
            }
          </div>
  )
}
