import ImageGallery  from 'react-image-gallery';
import PropTypes from 'prop-types';
import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram } from "@fortawesome/free-brands-svg-icons"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Photos extends React.Component {
  constructor(){
      super();
      this.state = {
        showPlayButton: true,
        showGalleryPlayButton: true,
        showFullscreenButton: true,
        useBrowserFullscreen: false,
        showGalleryFullscreenButton: true,
        showVideo: {},
      };
      this.images = [
        { original: "https://i.ibb.co/3BdtHLH/milkyway1-small.jpg", thumbnail: "https://i.ibb.co/sVJZPqx/milkyway1-thumbnail.jpg", originalTitle: "Anza Borrego State Park, California", description: "The milkyway rising in the Anza Borrego Desert near San Diego in California."},
        { original: "https://i.ibb.co/NT5L1PT/milkyway2-small.jpg", thumbnail: "https://i.ibb.co/bb845gS/milkyway2-thumbnail.jpg", originalTitle: "Grand Canyon National Park,Arizona", description: "Milkyway rising above the Grand Canyon in Arizona."},
        { original: "https://i.ibb.co/PMysVx3/milkyway3-small.jpg", thumbnail: "https://i.ibb.co/NZhqNFq/milkyway3-thumbnail.jpg", originalTitle: "Cherry Springs State Park, Pennsylvania", description: "Cherry Springs State Park in Pennsylvania is about 4.5 hours away drive from new york and is one of the best places to see the milkyway on the east coast."},
        { original: "https://i.ibb.co/bmgZqYc/milkyway4-small.jpg", thumbnail: "https://i.ibb.co/ByTcdCv/milkyway4-thumbnail.jpg", originalTitle: "Cherry Springs State Park, Pennsylvania", description: "Another shot of the milky way rising from Cherry Springs."},
        { original: "https://i.ibb.co/KhzXSTz/milkyway5-small.jpg", thumbnail: "https://i.ibb.co/V347qjJ/milkyway5-thumbnail.jpg", originalTitle: "Haleakala Crater in Maui, Hawaii", description: "Hawaii is roughly 20 degrees north of equator in latitude, so from this vantage point the milky way appears almost horizontal to the horizon when it sets in the north west region of the sky I captured this in the early hours of the morning just before sun rise Dubbed House of the Sun by native Hawaiians, Haleakala Crater is the worlds largest dormant volcano and the highest peak in Maui."},
        { original: "https://i.ibb.co/r75g30p/milkyway6-small.jpg", thumbnail: "https://i.ibb.co/jLq1vGb/milkyway6-thumbnail.jpg", originalTitle: "Anza Borrego State Park, California", description: "Another shot taken at the Anza Borrego Desert near San Diego in California"},
        { original: "https://i.ibb.co/xzg4H71/milkyway7-small.jpg", thumbnail: "https://i.ibb.co/K6SV92Y/milkyway7-thumbnail.jpg", originalTitle: "Zion National Park, Utah", description: "Shot of the milky way at the gates of Zion National Park in Utah"},
        { original: "https://i.ibb.co/fx1gnqv/milkyway8-small.jpg", thumbnail: "https://i.ibb.co/Fs9bTK5/milkyway8-thumbnail.jpg", originalTitle: "Cherry Springs State Park, Pennsylvania", description: "One of my older milkyway photographs from Cherry Springs State Park, Pensilvania"},
        { original: "https://i.ibb.co/Sfk55cW/alaska1-small.jpg", thumbnail: "https://i.ibb.co/9yZZ16m/alaska1-thumbnail.jpg", originalTitle: "Denali National Park, Alaska", description: "Stood on top of a glacier to take this picture, a scene that looks from an ice age."},
        { original: "https://i.ibb.co/k6RmNFw/alaska2-small.jpg", thumbnail: "https://i.ibb.co/p3TRJHt/alaska2-thumbnail.jpg", originalTitle: "Whittier Glacier, Alaska", description: "Taken on Glacier Cruise on the protected waters of Prrrince William Sound, Whittier, Alaska."},
        { original: "https://i.ibb.co/dbW0Mgm/eclipse-small.jpg", thumbnail: "https://i.ibb.co/VLsBVGF/eclipse-thumbnail.jpg", originalTitle: "Smoky Mountain National Park, Tennesse", description: "Taken during totality during the 2017 total solar eclipse close to Smoky Mountain National Park, Tennesse"},
        { original: "https://i.ibb.co/P1PLM8D/grand-canyon1-small.jpg", thumbnail: "https://i.ibb.co/dGcqtBn/grand-canyon1-thumbnail.jpg", originalTitle: "Grand Canyon National Park, Arizona", description: "Some clear blue skies at Grand Canyon National Park, Arizona"},
        { original: "https://i.ibb.co/F4przNd/utah1-small.jpg", thumbnail: "https://i.ibb.co/zQpqKMc/utah1-thumbnail.jpg", originalTitle: "Arches National Park, Utah", description: "The famous Delicate Arch at the Arches National Park, Utah"},
        { original: "https://i.ibb.co/QjkLDNW/utah2-small.jpg", thumbnail: "https://i.ibb.co/mDqgsjh/utah2-thumbnail.jpg", originalTitle: "Antelope Canyon, Arizona", description: "The Lower Antelope Canyon is a photographers dream destination."},
        { original: "https://i.ibb.co/wMRLQkz/hawaii1-small.jpg", thumbnail: "https://i.ibb.co/W0BG0Xt/hawaii1-thumbnail.jpg", originalTitle: "The Kilauea Volcano, Hawaii", description: "Located in the Hawaii Volcanos National Park on the Big Island in Hawaii, Kilauea is an active shield volcano, one of the most active volcanos amongst the five volcanoes in the park."},
        { original: "https://i.ibb.co/cYRqmbP/hawaii2-small.jpg", thumbnail: "https://i.ibb.co/sy767Xs/hawaii2-thumbnail.jpg", originalTitle: "Haleakala Crater in Maui, Hawaii", description: "Taken at the Haleakala Crater in Maui, Hawai while trying to capture the sunrise. One of the most beautiful sunrises Ive ever seen."},
        { original: "https://i.ibb.co/WsWrvPr/hawaii3-small.jpg", thumbnail: "https://i.ibb.co/VpCSjZr/hawaii3-thumbnail.jpg", originalTitle: "Mauna Kea, Hawaii", description: "This is sunset at the famous Mauna Kea summit on the big island, Hawaii"},
        { original: "https://i.ibb.co/bQ7vRbd/iceland1-small.jpg", thumbnail: "https://i.ibb.co/QXmBSrj/iceland1-thumbnail.jpg", originalTitle: "Snaefellsnes Peninsula, Iceland", description: "An old picnic bench near the coast Snaefellsnes Peninsula, in southern short of Iceland"},
        { original: "https://i.ibb.co/JtW7mG7/iceland2-small.jpg", thumbnail: "https://i.ibb.co/fHt6ZG9/iceland2-thumbnail.jpg", originalTitle: "Reykjavik, Iceland", description: "Street view, Reykjavik, capital city of Iceland."},
        { original: "https://i.ibb.co/2vQHLQj/iceland3-small.jpg", thumbnail: "https://i.ibb.co/xhY1F4t/iceland3-thumbnail.jpg", originalTitle: "Hallgrímskirkja , Reykjavik, Iceland", description: "'Hallgrímskirkja is a church built on a small hilltop, easily the most identifiable landmark in the city of Reyjkavik in Iceland."},
        { original: "https://i.ibb.co/1vbXRp3/iceland4-small.jpg", thumbnail: "https://i.ibb.co/XXpKZpt/iceland4-thumbnail.jpg", originalTitle: "Gatklettur, Iceland", description: "Gatklettur or Arch of Hellnar is found between the villages of Helnar and Arnarstapi, on the southern shore of Iceland."},
        { original: "https://i.ibb.co/T1x6DS6/iceland5-small.jpg", thumbnail: "https://i.ibb.co/b2KpfZX/iceland5-thumbnail.jpg", originalTitle: "Thingvellir National Park, Iceland", description: "Part of the golden circle, Thingvellir National Park on a good clear night can have spectacular northern lights show on display."},
        { original: "https://i.ibb.co/yQstdcJ/norway1-small.jpg", thumbnail: "https://i.ibb.co/6Xc65ns/norway1-thumbnail.jpg", originalTitle: "Gudvangen, Norway", description: "An old viking style boat on the premises of Gudvangen Fjordtttell hotel."},
        { original: "https://i.ibb.co/QMdmP09/nyc1-small.jpg", thumbnail: "https://i.ibb.co/tpcvXRF/nyc1-thumbnail.jpg", originalTitle: "Jersey Heights, New Jersey", description: "Jersey Heights Skyline , as seen from Manhattan, New York."},
        { original: "https://i.ibb.co/dMFKCV7/nyc2-small.jpg", thumbnail: "https://i.ibb.co/rM1STwL/nyc2-thumbnail.jpg", originalTitle: "Manhattan, New York", description: "Street View , New York City, New York."},
        { original: "https://i.ibb.co/CK79SWY/nyc3-small.jpg", thumbnail: "https://i.ibb.co/pyw3kZB/nyc3-thumbnail.jpg", originalTitle: "Manhattan, New York", description: "Central Park as seen from top of the rock, New York"},
        { original: "https://i.ibb.co/kQvZg9h/nyc4-small.jpg", thumbnail: "https://i.ibb.co/HY814DS/nyc4-thumbnail.jpg", originalTitle: "Manhattan, New York", description: "The Empire State, New York"}
      ];
      this.images2 = [
        {key: 1, original: "https://i.ibb.co/98qNsFb/maskedinvader-A-bee-sitting-under-a-palm-tree-listing-to-music-d308e8da-9390-4d06-b9ec-7f84c805460a.png", thumbnail: ""},
        {key: 2, original: "https://i.ibb.co/qjXv01P/maskedinvader-a-total-solar-eclipse-as-seen-from-a-hill-top-bey-dd1e6d48-d88d-442c-84aa-83c403965521.png", thumbnail: ""},
        {key: 3, original: "https://i.ibb.co/1KqRTYR/maskedinvader-batman-will-always-find-a-way-out-of-the-well-afd030f9-19dc-4020-b4a8-c7e4111b7f82.png", thumbnail: ""},
        {key: 4, original: "https://i.ibb.co/tQLZHmP/maskedinvader-beyond-good-and-evil-92aeaf41-f67b-482c-9b21-4a039cd2af05.png", thumbnail: ""},
        {key: 5, original: "https://i.ibb.co/34SKBXM/maskedinvader-cat-smoking-a-cigerrate-ultra-detailedphotoreali-9ea12cc9-bb7b-49ac-a24d-197f5e5f8181.png", thumbnail: ""},
        {key: 6, original: "https://i.ibb.co/mCvPsMx/maskedinvader-dont-be-afraid-cause-its-dark-at-night-octane-ren-6215777a-c40d-4026-8caa-cc7b836c7170.png", thumbnail: ""},
        {key: 7, original: "https://i.ibb.co/DWBxQrK/maskedinvader-I-love-you-to-the-moon-and-back-photorealisticoct-bedb189a-62b1-4882-bc59-4421cf9b40f5.png", thumbnail: ""},
        {key: 8, original: "https://i.ibb.co/pRyFB75/maskedinvader-knowledge-is-meaningless-without-action-a5870d52-dc8c-49e8-87bc-bbc16f8772d9.png", thumbnail: ""},
        {key: 9, original: "https://i.ibb.co/b2Sq9Y9/maskedinvader-Lord-Vishnu-and-Lord-Shiva-as-one-highly-detaile-5b12efdb-9c2f-4ea1-a6d8-d4ce78f2a469.png", thumbnail: ""},
        {key: 10, original: "https://i.ibb.co/Lnpg4WR/maskedinvader-siddhartha-sitting-alone-under-a-banyan-tree-medi-e52208b3-d2cb-46f6-b176-6314db9fd4eb.png", thumbnail: ""},
        {key: 11, original: "https://i.ibb.co/Lnpg4WR/maskedinvader-siddhartha-sitting-alone-under-a-banyan-tree-medi-e52208b3-d2cb-46f6-b176-6314db9fd4eb.png", thumbnail: ""},
        {key: 12, original: "https://i.ibb.co/DRqb1Fk/maskedinvader-the-moons-of-jupiter-all-colliding-and-exploding-d0b01252-4ba9-40bf-a9f1-1862c9a64a67.png", thumbnail: ""},
        {key: 13, original: "https://i.ibb.co/XkcVkfZ/maskedinvader-the-sun-as-seen-from-pluto-super-photorealistic-966eddaa-c147-43ca-ad7a-6ef53d4e3f9d.png", thumbnail: ""},
        {key: 14, original: "https://i.ibb.co/3d6Mq1G/maskedinvader-windows-wallpaper-in-2050-87be6791-d5f4-4a3e-b7e8-a32fce07f660.png", thumbnail: ""},
        {key: 15, original: "https://i.ibb.co/nQ03Yrz/supermassive-blackhole-midjourney-image.png", thumbnail: ""},
      ];
  } 
  
  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }
  
  _resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showPlayButton) {
      this.setState({showGalleryPlayButton: true});
    }

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  render() {
    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>;
    const renderImages = this.images2.map(item => (
      <div>
            <img src={item.original} key={item.key}/>
        </div>
    ))
    return (
    <div>
      <h2 className="major">Photos</h2>   
      <h3> Photo Gallery </h3>   
      <ImageGallery 
        items={this.images} 
        showNav={true}
        showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
        showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
      />
      <br />
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
      <script src='https://embedsocial.com/js/iframe.js'></script>
      <div style={{maxWidth: '900px'}}>
        <h3 className="minor">
          <a href="https://www.instagram.com/gokulsmenon/">
            <FontAwesomeIcon icon={faInstagram}  width="16px" />
            &nbsp;&nbsp; Instagram Feed
          </a> 
        </h3>
      <script src='https://embedsocial.com/js/iframe.js'>
      </script>
        <iframe 
          style={{border: 0, width: '100%', height: '1800px'}}  
          scrolling="yes" 
          src='https://embedsocial.com/facebook_album/pro_instagram/9964b269b53d447ae1fbd625d714012921152253'>
        </iframe>
      </div>
      <script>iFrameResize();</script> 
      <br />
      <h3> Photo Gallery Beta</h3>   
      <div className="carousel-wrapper">
            <Carousel infiniteLoop useKeyboardArrows autoPlay>
              {renderImages}
            </Carousel>
      </div>  
      <br />
      <p> &nbsp;&nbsp;&nbsp;&nbsp; Above are some images generated using midjourney ai. Using them to beta test a new responsive gallery.
        </p>
      {close}
    </div>
    );
  }
}
  
Photos.propTypes = {
  onCloseArticle: PropTypes.func,
}

export default Photos