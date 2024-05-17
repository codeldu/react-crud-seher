import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Add = () => {

    const [image, setImage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const convertToBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImage(reader.result);
        }

       
    }
    let navigate = useNavigate()
    const onSubmit = (data) => {

        let sendData = async () => {
            await axios.post('http://localhost:3000/api', { ...data, file: image });
            navigate('/')
        }
        sendData()
    }

    return (

        <div className="row">
            {image && <img src={image} />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-lg-12 mb-3">
                    <label>Type :
                        <input type="text" {...register('type', { required: true })} />
                        {errors.type && <span>Type doldurulmalidir!</span>}
                    </label>
                </div>
                <div className="col-lg-12 mb-3">
                    <label>Description :
                        <input type="text" {...register('description', { required: true })} />
                        {errors.description && <span>Description doldurulmalidir!</span>}
                    </label>
                </div>
                <div className="col-lg-12 mb-3">
                    <label>Image :
                        <input type="file" {...register('file', { required: true })} onInput={(e) => convertToBase64(e.target.files[0])} />
                        {errors.file && <span> doldurulmalidir!</span>}
                    </label>
                </div>
                <div className="col-lg-12">
                    <button type='submit'>Add Data</button>
                </div>

            </form>
        </div>


    )
}
