import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams ,useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Edit = () => {

    let [info, setInfo] = useState({});
    let [image, setImage] = useState(null);

    let { id } = useParams();

    let navigate = useNavigate();
    const convertToBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImage(reader.result);
        }


    }

    useEffect(() => {
        const getById = async () => {
            let response = await axios.get('http://localhost:3000/api/' + id);
            setInfo(response.data);
            setImage(response.data.file)
        }

        getById();

    }, [])


    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = (data) => {


        axios.patch('http://localhost:3000/api/' + id, { ...data, file: image })
        .then(r => navigate('/'))

    }

    return (
        <div className="row">
            <div className="col-lg-12 mb-5">
                <h1>Edit {id}</h1>
            </div>
            {image && <div className="col-lg-12 mb-5">
                <img src={image} />
            </div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-lg-12 mb-3">
                    <label>Type :
                        <input type="text" {...register('type', { required: true })} defaultValue={info.type} />
                        {errors.type && <span>Type doldurulmalidir!</span>}
                    </label>
                </div>
                <div className="col-lg-12 mb-3">
                    <label>Description :
                        <input type="text" {...register('description', { required: true })} defaultValue={info.description} />
                        {errors.description && <span>Description doldurulmalidir!</span>}
                    </label>
                </div>
                <div className="col-lg-12 mb-3">
                    <label>Image :
                        <input type="file" {...register('file')} onInput={(e) => convertToBase64(e.target.files[0])} />
                        {errors.file && <span> doldurulmalidir!</span>}
                    </label>
                </div>
                <div className="col-lg-12">
                    <button type='submit'>Save Data</button>
                </div>

            </form>
        </div>
    )
}
