import * as templates from './templates.js'
import {render} from 'https://unpkg.com/lit-html?module';

const choices = {
    'Jean-Baptiste Carpeaux': templates.carpeauxTemplate,
    'Rafaele Monti': templates.montiTemplate,
    'Gian Lorenzo Bernini': templates.berniniTemplate,
    'Franz Sedlacek': templates.sedlacekTemplate,
    'Herbert von Reyl-Hanisch': templates.hanischTemplate,
    'Jennifer Lommers': templates.lommersTemplate,
    'Max Ernst': templates.ernstTemplate
}


const galleryRoot = document.getElementById('gallery');
if (document.querySelector('h1').textContent == 'Sculptors') {
    render(templates.berniniTemplate(), galleryRoot);
} else if (document.querySelector('h1').textContent == 'Painters') {
    render(templates.sedlacekTemplate(), galleryRoot);
}

document.addEventListener('click', expandImage);
const artistList = document.querySelectorAll('li');
artistList.forEach((artist) => {artist.addEventListener('click', showArt)});


function expandImage(ev) {
    const overlayElement = document.querySelector('.enlarge');
    const element = ev.target;

    if (element.nodeName.toLowerCase() === 'img') {
        overlayElement.classList.add('active');
        overlayElement.innerHTML = `<img src="${element.src}" alt="image"><button id="close">X</button>`;
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else if (element.id == 'close') {
        overlayElement.classList.remove('active');
        document.getElementsByTagName('body')[0].style.overflow = 'scroll';
    }
}

function showArt(ev) {
    const listItems = Array.from(ev.target.parentNode.children);
    listItems.map((child) => child.classList.remove('active'));

    const clickedName = ev.target.textContent;
    render(choices[clickedName](), galleryRoot);
    
    ev.target.classList.add('active');
}