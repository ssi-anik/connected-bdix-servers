import {TV} from "./data/tv";
import {FTP} from "./data/ftp";
import {MOVIES} from "./data/movies";

export function today () {
    return new Date().toLocaleDateString([], {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
    }).replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$3$1$2");
}

export function imageResolver (url, resolve) {
    const image = new Image();
    image.addEventListener('load', () => resolve(true));
    image.addEventListener('error', () => resolve(false));
    image.src = `${url}`;
}

export function serverList () {
    return [
        ...MOVIES,
        ...FTP,
        ...TV,
    ]
}