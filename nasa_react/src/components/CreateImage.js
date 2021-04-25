import React, { useState } from 'react';
import pictureService from "../services/PictureService"

export default function CreateImage() {
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [explanation, setExplanation] = useState("");

    const add = async (e) => {
        e.preventDefault();
        try {
            if (url) {
                await pictureService.createByUser(
                    localStorage.getItem("token"),
                    {
                        date: new Date(),
                        explanation: explanation,
                        mediaType: "image",
                        title: title,
                        url: url
                    }
                );
                alert("The picture successfully added");
            }
            else alert("No image selected");
        } catch (err) {
            console.log("err", err);
        }
    }

    function fileHandling(event) {
        let fileReader = new FileReader()
        fileReader.onload = ((e) => {
            setUrl(e.target.result);
        })
        setUrl(fileReader.readAsDataURL(event.target.files[0]))
    }
    return (
        <form className="col-6 mt-5" style={{ margin: "auto" }}>
            <div className="form-group">
                <label htmlFor="file">Select the desired image: </label>
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="file" onChange={fileHandling}></input>
                        <label className="custom-file-label" htmlFor="file" >Choose file</label>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="title">What the title?</label>
                <input type="text" className="form-control" id="title" placeholder="Enter title"
                    onChange={(e) => { setTitle(e.target.value) }}></input>
            </div>
            <div className="form-group">
                <label htmlFor="explanation">Write an explanation of the picture:</label>
                <textarea className="form-control" id="explanation" placeholder="Enter explanation" rows={4}
                    onChange={(e) => { setExplanation(e.target.value) }}></textarea>
            </div>
            <button className="btn btn-secondary" onClick={(e) => { add(e) }}>Add the picture to your history</button>
        </form>
    )
}