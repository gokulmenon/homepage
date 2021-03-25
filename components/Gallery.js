import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';
import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram } from "@fortawesome/free-brands-svg-icons"

const PREFIX_IMG_URL = '/static/images/gallery/';
const PREFIX_THUMBNAIL_URL = '/static/images/gallery/thumbnails/';


class Gallery extends React.Component {
  constructor(){
      super();
      let milkyway_images = this._getMilkywayStaticImages()
      let other_images =  [
        {
          original: `${PREFIX_IMG_URL}nyc1_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}nyc1_thumbnail.jpg`,
          originalTitle: 'Jersey Heights, New Jersey',
          description: 'Jersey Heights Skyline , as seen from Manhattan, New York.'
        },
        {
          original: `${PREFIX_IMG_URL}nyc2_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}nyc2_thumbnail.jpg`,
          originalTitle: 'Manhattan, New York',
          description: 'Street View , New York City, New York.'
        },
        {
          original: `${PREFIX_IMG_URL}nyc3_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}nyc3_thumbnail.jpg`,
          originalTitle: 'Manhattan, New York',
          description:  'Central Park as seen from top of the rock, New York'
        },
        {
          original: `${PREFIX_IMG_URL}nyc4_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}nyc4_thumbnail.jpg`,
          originalTitle: 'Manhattan, New York',
          description:'The Empire State, New York'
        },
        {
          original: `${PREFIX_IMG_URL}utah1_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}utah1_thumbnail.jpg`,
          originalTitle: 'Arches National Park, Utah',
          description: 'The famous Delicate Arch at the Arches National Park, Utah'
        },
        {
          original: `${PREFIX_IMG_URL}utah2_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}utah2_thumbnail.jpg`,
          originalTitle: 'Antelope Canyon, Arizona',
          description: 'The Lower Antelope Canyon is a photographers dream destination.'
        },
        {
          original: `${PREFIX_IMG_URL}hawaii1_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}hawaii1_thumbnail.jpg`,
          originalTitle: 'The Kilauea Volcano, Hawaii',
          description: 'Located in the Hawaii Volcanos National Park on the Big Island in Hawaii, Kilauea is an active shield volcano, one of the most active volcanos amongst the five volcanoes in the park.'
        },
        {
          original: `${PREFIX_IMG_URL}hawaii2_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}hawaii2_thumbnail.jpg`,
          originalTitle: 'Haleakala Crater in Maui, Hawaii',
          description: 'Taken at the Haleakala Crater in Maui, Hawai while trying to capture the sunrise. One of the most beautiful sunrises Ive ever seen.'
        },
        {
          original: `${PREFIX_IMG_URL}hawaii3_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}hawaii3_thumbnail.jpg`,
          originalTitle: 'Mauna Kea, Hawaii',
          description: 'This is sunset at the famous Mauna Kea summit on the big island, Hawaii'
        },
        {
          original: `${PREFIX_IMG_URL}grand_canyon1_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}grand_canyon1_thumbnail.jpg`,
          originalTitle: 'Grand Canyon National Park, Arizona',
          description: 'Some clear blue skies at Grand Canyon National Park, Arizona',
        },
        {
          original: `${PREFIX_IMG_URL}eclipse_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}eclipse_thumbnail.jpg`,
          originalTitle: 'Smoky Mountain National Park, Tennesse',
          description: 'Taken during totality during the 2017 total solar eclipse close to Smoky Mountain National Park, Tennesse',
        },
        {
          original: `${PREFIX_IMG_URL}norway1_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}norway1_thumbnail.jpg`,
          originalTitle: 'Gudvangen, Norway',
          description: 'An old viking style boat on the premises of Gudvangen Fjordtttell hotel.',
        },
        {
          original: `${PREFIX_IMG_URL}iceland1_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}iceland1_thumbnail.jpg`,
          originalTitle: 'Snaefellsnes Peninsula, Iceland',
          description: 'An old picnic bench near the coast Snaefellsnes Peninsula, in southern short of Iceland'
        },
        {
          original: `${PREFIX_IMG_URL}iceland2_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}iceland2_thumbnail.jpg`,
          originalTitle: 'Reykjavik, Iceland',
          description: 'Street view, Reykjavik, capital city of Iceland.'
        },
        {
          original: `${PREFIX_IMG_URL}iceland3_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}iceland3_thumbnail.jpg`,
          originalTitle: 'Hallgrímskirkja , Reykjavik, Iceland',
          description: 'Hallgrímskirkja is a church built on a small hilltop, easily the most identifiable landmark in the city of Reyjkavik in Iceland.'
        },
        {
          original: `${PREFIX_IMG_URL}iceland4_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}iceland4_thumbnail.jpg`,
          originalTitle: 'Gatklettur, Iceland',
          description: 'Gatklettur or Arch of Hellnar is found between the villages of Helnar and Arnarstapi, on the southern shore of Iceland.'
        },
        {
          original: `${PREFIX_IMG_URL}iceland5_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}iceland5_thumbnail.jpg`,
          originalTitle: 'Thingvellir National Park, Iceland',
          description: 'Part of the golden circle, Thingvellir National Park on a good clear night can have spectacular northern lights show on display.'
        },
        {
          original: `${PREFIX_IMG_URL}alaska1_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}alaska1_thumbnail.jpg`,
          originalTitle: 'Denali National Park, Alaska',
          description: 'Stood on top of a glacier to take this picture, a scene that looks from an ice age.'
        },
        {
          original: `${PREFIX_IMG_URL}alaska2_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}alaska2_thumbnail.jpg`,
          originalTitle: 'Whittier Glacier, Alaska',
          description: 'Taken on Glacier Cruise on the protected waters of Prrrince William Sound, Whittier, Alaska.'
        },
      ];
      this.images = milkyway_images.concat(other_images);
  }

  _getMilkuWayTitles(){
      const titles = [
          'Anza Borrego State Park, California',
          'Grand Canyon National Park,Arizona',
          'Cherry Springs State Park, Pennsylvania',
          'Cherry Springs State Park, Pennsylvania',
          'Haleakala Crater in Maui, Hawaii',
          'Anza Borrego State Park, California',
          'Zion National Park, Utah',
          'Cherry Springs State Park, Pennsylvania',

      ]
    return titles;
  }

  _getMilkyWayDescriptions(){
      const descriptions = [
          'The milkyway rising in the Anza Borrego Desert near San Diego in California.',
          'Milkyway rising above the Grand Canyon in Arizona.',
          'Cherry Springs State Park, near Coudersport Pennsylvania is about 4.5 hours away drive from new york and is one of the best places to see the milkyway on the eastern US',
          'Another shot of the milky way rising from Cherry Springs.',
          'Hawaii is roughly 20 degrees north of equator in latitude, so from this vantage point the milky way appears almost horizontal to the horizon when it sets in the north west region of the sky I captured this in the early hours of the morning just before sun rise Dubbed House of the Sun by native Hawaiians, Haleakala Crater is the worlds largest dormant volcano and the highest peak in Maui.',
          'Another shot taken at the Anza Borrego Desert near San Diego in California.',
          'Shot of the milky way at the gates of Zion National Park in Utah',
          'One of my older milkyway photographs from Cherry Springs State Park, Pensilvania',
      ]
    return descriptions;
  }

  _getMilkywayStaticImages() {
    let images = [];
    const descriptions = this._getMilkyWayDescriptions();
    const titles = this._getMilkuWayTitles();
    for (let i = 1; i < 9; i++) {
      images.push({
        original: `${PREFIX_IMG_URL}milkyway${i}_small.jpg`,
        thumbnail: `${PREFIX_THUMBNAIL_URL}milkyway${i}_thumbnail.jpg`,
        originalTitle: titles[i-1],
        description: descriptions[i-1],
      });
    }

    return images;
  }

  render() {
    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>;
    return (
    <div>
      <h2 className="major">Gallery</h2>          
      <ImageGallery items={this.images} showNav={true}/>
      <br />
      {/* <span className="image main"><img src="/static/images/pic02.jpg" alt="" /></span> */}
      <p> &nbsp;&nbsp;&nbsp;&nbsp; I have always been interested in photography 
        from the time I could get my hands on a
        camera. Starting from a camera with a limited physical reel to digital 
        cameras to mobile cameras.The best camera is the one you have they say, 
        its very true. <br /><br />
        &nbsp;&nbsp;&nbsp;&nbsp; This page hosts a collection of my photos starting with
        some curated photographs above showcasing my best astrophotography exploits, 
        followed with some of my most recent Instagram feed photos below.
        Please consider copyright and request permission before any usage.
      </p>
      <p> &nbsp;&nbsp;&nbsp;&nbsp; I have taken a keen interest in astrophotography and amateur astronomy in general.
        I have travelled to several dark sky parks and enjoyed the cosmic display of the stars.
        Stargazing became an ever expanding hobby
        Humbled by my new found knowledge and excited to dig deeper into the field and explore the world of
        astronomy.<br />
          <br />&nbsp;&nbsp;&nbsp;&nbsp;  Cities these days block out most but the brightest stars and planets,
        so we have to make more effort these days to go see the night sky like our ancestors
        were easily able to before artificial light pollution
        was even a thing, often driving hours away from cities in search of dark skies.Most people I know
        have never seen the Milkyway our home galaxy with their naked eyes.
        <br /><br />
        &nbsp;&nbsp;&nbsp;&nbsp; Chasing the milkyway every remote travel destination I visit now has become a routine
        and I am still amazed by the beauty of the night sky.
        
        'If you look up at the Milky Way through the eyes of Carl Sagan, you get a feeling in your chest of something greater than yourself. And it is. But it\'s not supernatural.' - Richard Dawkins.
      </p> 
      <h3 className="minor">
        <a href="https://www.instagram.com/gokulsmenon/">
          <FontAwesomeIcon icon={faInstagram}  width="16px" />
          &nbsp;&nbsp; Instagram Feed
        </a> 
      </h3>
      <script src='https://embedsocial.com/js/iframe.js'></script>
        <iframe 
          style={{border: 0, width: '100%', height: '100%'}} 
          scrolling='no' 
          src='https://embedsocial.com/facebook_album/pro_instagram/9964b269b53d447ae1fbd625d714012921152253'>
        </iframe>
      <script>iFrameResize();</script>
      {close}
    </div>
    );
  }
}
  
Gallery.propTypes = {
  onCloseArticle: PropTypes.func
}

export default Gallery