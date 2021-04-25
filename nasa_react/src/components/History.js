import React, { useEffect, useState } from 'react';
import pictureService from "../services/PictureService";
import ShowPicture from './ShowPicture';

export default function History() {
    const [pictures, setPictures] = useState([]);

    useEffect(async () => {
        try {
            const data = await pictureService.getHistory(localStorage.getItem("token"), "GET");
            setPictures(data.history);
        } catch (err) {
            console.log("err", err);
        }
    }, [])

    const deletePicture = async (id) => {
        try {
            const data = await pictureService.deletePicture(localStorage.getItem("token"), "DELETE", id);
            alert("The Picture is Deleted!")
            let newPictures = pictures.filter((p) => p._id !== id);
            setPictures(newPictures);
        } catch (err) {
            console.log("err", err);
        }
    }
    return (
        <>
            <h2>My server call history:</h2>
            <ul className="list-group  m-5">
                {
                    pictures.map(function (single) {
                        return (
                            <li className="list-group-item" key={single._id}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className="row mb-5"><b>{`Date: ${single.date}`}</b></p>
                                        <button className="btn btn-secondary d-flex align-items-end mt-5" onClick={(id) => { deletePicture(single._id) }}>Delete</button>
                                    </div>
                                    <div className="col-4">
                                        <p>{single.title}</p>
                                        <ShowPicture mediaType={single.mediaType} url={single.url} width="400" height="300" />
                                    </div>
                                    <p className="col-4">{`Explanation: ${single.explanation}`}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}