import React from "react"
import Zoom from "./Zoom"
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import {redirect} from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Map() {
    const queryParameters = new URLSearchParams(window.location.search)
    const type = queryParameters.get("type")
    const mapid = queryParameters.get("mapurl")
    const [mapUrl, setMapUrl] = useState("")
    const [published, setPublished] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchMap = (mapId) => {
        fetch(`${apiUrl}api/map/${mapId}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("There has been a problem with your fetch operation")
            })
            .then(data => {
                setMapUrl(data.url)
                setIsLoaded(true)
                setPublished(data.published)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchMap(mapid)
    }, []);

    if (!isLoaded) {
        return <div>Loading...</div>
    } else if (!published) {
        return <div>Map is not available for viewing</div>
    } else {
        return (
            <div>
                {type === 'static' &&
                <Zoom imageUrl={mapUrl}/>}
                {type === 'interactive' &&
                <p>Awaiting completion of US</p>}
            </div>
        )
    }
}
