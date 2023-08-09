import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
    validateIp,
    addTitleLayer,
    getAdress,
    getIpLocation,
    addOffset,
} from './heipers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input'),
    btn = document.querySelector('button'),
    ipInfo = document.querySelector('#ip'),
    locationInfo = document.querySelector('#location'),
    ispInfo = document.querySelector('#isp'),
    timezoneInfo = document.querySelector('#timezone'),
    mapArea = document.querySelector('.map');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

//map

const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
    zoomControl: false,
});

const marcerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
    // iconAnchor: [22, 94],
});

addTitleLayer(map);

L.marker([51.505, -0.09], { icon: marcerIcon }).addTo(map);

//
function getData() {
    //проверка данных
    if (validateIp(ipInput.value)) {
        getAdress(ipInput.value).then(setInfo);
        getIpLocation(ipInput.value).then(setLocation);
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText =
        mapData.location.country + ' ' + mapData.location.region;
    ispInfo.innerText = mapData.isp;
    timezoneInfo.innerText = mapData.location.timezone;
    console.log(mapData);
}

function setLocation(ipLocation) {
    const { latitude, longitude } = ipLocation;

    map.setView([latitude, longitude]);
    L.marker([latitude, longitude], { icon: marcerIcon }).addTo(map);

    if (matchMedia('(max-width: 1023px)').matches) {
        addOffset(map);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getAdress('102.22.22.1').then(setInfo);
    getIpLocation('102.22.22.1').then(setLocation);
});
