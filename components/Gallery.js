import ImageGallery from 'react-image-gallery';
import React from "react"

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
          originalTitle: '',
          description: 'Jersey Heights Skyline , as seen from Manhattan, New York.'
        },
        {
          original: `${PREFIX_IMG_URL}nyc2_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}nyc2_thumbnail.jpg`,
          originalTitle: '',
          description: 'Street View , New York City, New York.'
        },
        {
          original: `${PREFIX_IMG_URL}nyc3_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}nyc3_thumbnail.jpg`,
          originalTitle: '',
          description:  'Central Park as seen from top of the rock, New York'
        },
        {
          original: `${PREFIX_IMG_URL}nyc4_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}nyc4_thumbnail.jpg`,
          originalTitle: '',
          description:'The Empire State, New York'
        },
        {
          original: `${PREFIX_IMG_URL}utah1_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}utah1_thumbnail.jpg`,
          originalTitle: '',
          description: ''
        },
        {
          original: `${PREFIX_IMG_URL}utah2_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}utah2_thumbnail.jpg`,
          originalTitle: '',
          description: ''
        },
        {
          original: `${PREFIX_IMG_URL}hawaii2_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}hawaii2_thumbnail.jpg`,
          originalTitle: 'Haleakala Crater in Maui, Hawaii',
          description: 'Taken at the Haleakala Crater in Maui, Hawai while trying to capture the sunrise. One of the most beautiful sunrises Ive ever seen.'
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
          original: `${PREFIX_IMG_URL}iceland1_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}iceland1_thumbnail.jpg`,
          originalTitle: '',
          description: ''
        },
        {
          original: `${PREFIX_IMG_URL}iceland2_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}iceland2_thumbnail.jpg`,
          originalTitle: '',
          description: ''
        },
        {
          original: `${PREFIX_IMG_URL}iceland3_small.jpg`,
          thumbnail: `${PREFIX_THUMBNAIL_URL}iceland3_thumbnail.jpg`,
          originalTitle: '',
          description: ''
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
    return <ImageGallery items={this.images} showNav={false} />;
  }
}

export default Gallery