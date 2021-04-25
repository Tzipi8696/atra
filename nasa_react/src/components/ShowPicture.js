import React from 'react';

export default function ShowPicture(props) {
    return props.mediaType !== "video" ?
        (
            <img src={props.url} width={props.width} height={props.height} alt="Here a picture"></img>
        ) :
        (
            <iframe src={props.url}
                width={props.width}
                height={props.height}
                alt="APOD: Astronomy picture of the day"
                title="video"
            >
            </iframe>
        )
}
