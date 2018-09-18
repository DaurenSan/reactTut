import React, { Component } from 'react';
import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps';


const mapState = { center: [55.76, 37.64], zoom: 10 };

const placemarks = [{
    "geometry": {
      "coordinates": [55.684758, 37.738521]
    },
    "properties": {
      "balloonContent": "цвет <strong>воды пляжа бонди</strong>"
    },
    "options": {
      "preset": "islands#icon",
      "iconColor": "#0095b6"
    }
  }, {
    "geometry": {
      "coordinates": [55.833436, 37.715175]
    },
    "properties": {
      "balloonContent": "<strong>серобуромалиновый</strong> цвет"
    },
    "options": {
      "preset": "islands#dotIcon",
      "iconColor": "#735184"
    }
  }, {
    "geometry": {
      "coordinates": [55.687086, 37.529789]
    },
    "properties": {
      "balloonContent": "цвет <strong>влюбленной жабы</strong>"
    },
    "options": {
      "preset": "islands#circleIcon",
      "iconColor": "#3caa3c"
    }
  }, {
    "geometry": {
      "coordinates": [55.782392, 37.614924]
    },
    "properties": {
      "balloonContent": "цвет <strong>детской неожиданности</strong>"
    },
    "options": {
      "preset": "islands#circleDotIcon",
      "iconColor": "yellow"
    }
  }, {
    "geometry": {
      "coordinates": [55.642063, 37.656123]
    },
    "properties": {
      "balloonContent": "цвет <strong>красный</strong>"
    },
    "options": {
      "preset": "islands#redSportIcon"
    }
  }, {
    "geometry": {
      "coordinates": [55.826479, 37.487208]
    },
    "properties": {
      "balloonContent": "цвет <strong>фэйсбука</strong>"
    },
    "options": {
      "preset": "islands#governmentCircleIcon",
      "iconColor": "#3b5998"
    }
  }, {
    "geometry": {
      "coordinates": [55.694843, 37.435023]
    },
    "properties": {
      "balloonContent": "цвет <strong>носика Гены</strong>",
      "iconCaption": "Очень длиннный, но невероятно интересный текст"
    },
    "options": {
      "preset": "islands#greenDotIconWithCaption"
    }
  }, {
    "geometry": {
      "coordinates": [55.790139, 37.814052]
    },
    "properties": {
      "balloonContent": "цвет <strong>голубой</strong>",
      "iconCaption": "Очень длиннный, но невероятно интересный текст"
    },
    "options": {
      "preset": "islands#blueCircleDotIconWithCaption",
      "iconCaptionMaxWidth": "50"
    }
  }]

class MapContainer extends Component {

    render() {
        return(
            <YMaps>
                <Map state={mapState} width='100%' height='100%' >
                {/* Creating a geo object with the "Point" geometry type. */}
                <GeoObject
                    // The geometry description.
                    geometry={{
                    type: 'Point',
                    coordinates: [55.8, 37.8],
                    }}
                    // Properties.
                    properties={{
                    // The placemark content.
                    iconContent: 'Я тащусь',
                    hintContent: 'Ну давай уже тащи',
                    }}
                    // Options.
                    options={{
                    // The placemark's icon will stretch to fit its contents.
                    preset: 'islands#blackStretchyIcon',
                    // The placemark can be moved.
                    draggable: true,
                    }}
                />

                {placemarks.map((placemarkParams, i) =>
                    <Placemark key={i} {...placemarkParams} />
                )}
                </Map>
            </YMaps>
        )
    }
}



export default MapContainer;