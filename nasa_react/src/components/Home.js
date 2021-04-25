import React, { useEffect, useState } from 'react';
import pictureService from "../services/PictureService";
import ShowPicture from "./ShowPicture";

export default function Home() {

    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [explanation, setExplanation] = useState("");
    const [mediaType, setMediaType] = useState("")
    const [msg, setMsg] = useState("Loading.....")

    useEffect(async () => {
        try {
            const data = await pictureService.createByRequest(localStorage.getItem("token"), "POST");
            setMsg("-Astronomy picture of the day-")
            setUrl(data.url);
            setTitle(data.title);
            setExplanation(data.explanation);
            setMediaType(data.mediaType);
        } catch (err) {
            console.log("err", err);
        }
    }, [])

    return (
        <div className="container" >
            <h1>{msg}</h1>
            <h6>{title ? `${title}:` : null }</h6>
            {!url ?  null:<ShowPicture mediaType={mediaType} url={url} width="700" height="400" /> }
            <div className="row">
                <div className="col-3"></div>
                <p className="col-6 mt-2">{explanation}</p>
            </div>
        </div>
    )
}