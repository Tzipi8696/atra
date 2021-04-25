import React from 'react';

export default function ShowPicture(props) {
    return props.mediaType !== "video" ?
        (
            <img src={props.url} width={props.width} height={props.height} alt=""></img>
        ) :
        (
            <iframe src={`${props.url}&origin=http://localhost:3000`}
                width={props.width}
                height={props.height}
                alt="APOD: Astronomy picture of the day"
                title="video"
            >
            </iframe>
        )
}
