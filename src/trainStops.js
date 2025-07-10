/** 
 * routeData.js
 * Data for mapping the train routes
 * Created: 04-16-2025
 * Last Modified: 07-09-2025
 * Authors: Wanquan Zhao, Hannah Zelko, David Legris
 */

// Train stop data with coordinates and attributes
const trainStops = [
  {
    attributes: {
      stop_name: "Toronto",
      route_name: "Toronto-Montreal",
      OBJECTID: 1
    },
    geometry: {
      x: -79.3832,
      y: 43.6532
    }
  },
  {
    attributes: {
      stop_name: "Montréal",
      route_name: "Toronto-Montreal",
      OBJECTID: 2
    },
    geometry: {
      x: -73.5673,
      y: 45.5017
    }
  },
  {
    attributes: {
      stop_name: "Ottawa",
      route_name: "Toronto-Montreal",
      OBJECTID: 3
    },
    geometry: {
      x: -75.6972,
      y: 45.4215
    }
  },
  {
    attributes: {
      stop_name: "Kingston",
      route_name: "Toronto-Montreal",
      OBJECTID: 4
    },
    geometry: {
      x: -76.4942,
      y: 44.2312
    }
  },
  {
    attributes: {
      stop_name: "Brockville",
      route_name: "Toronto-Montreal",
      OBJECTID: 5
    },
    geometry: {
      x: -75.6843,
      y: 44.5897
    }
  },
  {
    attributes: {
      stop_name: "Cornwall",
      route_name: "Toronto-Montreal",
      OBJECTID: 6
    },
    geometry: {
      x: -74.7281,
      y: 45.0181
    }
  },
  {
    attributes: {
      stop_name: "Guelph",
      route_name: "Toronto-Kitchener",
      OBJECTID: 7
    },
    geometry: {
      x: -80.2482,
      y: 43.5448
    }
  },
  {
    attributes: {
      stop_name: "Kitchener",
      route_name: "Toronto-Kitchener",
      OBJECTID: 8
    },
    geometry: {
      x: -80.4862,
      y: 43.4516
    }
  },
  {
    attributes: {
      stop_name: "Stratford",
      route_name: "Toronto-Kitchener",
      OBJECTID: 9
    },
    geometry: {
      x: -80.9497,
      y: 43.3700
    }
  },
  {
    attributes: {
      stop_name: "London",
      route_name: "Toronto-London",
      OBJECTID: 10
    },
    geometry: {
      x: -81.2453,
      y: 42.9849
    }
  },
  {
    attributes: {
      stop_name: "Woodstock",
      route_name: "Toronto-London",
      OBJECTID: 11
    },
    geometry: {
      x: -80.7470,
      y: 43.1334
    }
  },
  {
    attributes: {
      stop_name: "Ingersoll",
      route_name: "Toronto-London",
      OBJECTID: 12
    },
    geometry: {
      x: -80.8833,
      y: 43.0333
    }
  },
  {
    attributes: {
      stop_name: "St. Thomas",
      route_name: "Toronto-London",
      OBJECTID: 13
    },
    geometry: {
      x: -81.1833,
      y: 42.7833
    }
  },
  {
    attributes: {
      stop_name: "Windsor",
      route_name: "Toronto-Windsor",
      OBJECTID: 14
    },
    geometry: {
      x: -83.0370,
      y: 42.3175
    }
  },
  {
    attributes: {
      stop_name: "Chatham",
      route_name: "Toronto-Windsor",
      OBJECTID: 15
    },
    geometry: {
      x: -82.1833,
      y: 42.4000
    }
  },
  {
    attributes: {
      stop_name: "Sarnia",
      route_name: "Toronto-Sarnia",
      OBJECTID: 16
    },
    geometry: {
      x: -82.4000,
      y: 43.0000
    }
  },
  {
    attributes: {
      stop_name: "Oshawa",
      route_name: "Toronto-Oshawa",
      OBJECTID: 17
    },
    geometry: {
      x: -78.8667,
      y: 43.9000
    }
  },
  {
    attributes: {
      stop_name: "Cobourg",
      route_name: "Toronto-Oshawa",
      OBJECTID: 18
    },
    geometry: {
      x: -78.1667,
      y: 43.9667
    }
  },
  {
    attributes: {
      stop_name: "Port Hope",
      route_name: "Toronto-Oshawa",
      OBJECTID: 19
    },
    geometry: {
      x: -78.3000,
      y: 43.9500
    }
  },
  {
    attributes: {
      stop_name: "Belleville",
      route_name: "Toronto-Oshawa",
      OBJECTID: 20
    },
    geometry: {
      x: -77.3833,
      y: 44.1667
    }
  },
  {
    attributes: {
      stop_name: "Trenton",
      route_name: "Toronto-Oshawa",
      OBJECTID: 21
    },
    geometry: {
      x: -77.5833,
      y: 44.1000
    }
  },
  {
    attributes: {
      stop_name: "Napanee",
      route_name: "Toronto-Oshawa",
      OBJECTID: 22
    },
    geometry: {
      x: -76.9500,
      y: 44.2500
    }
  },
  {
    attributes: {
      stop_name: "Gananoque",
      route_name: "Toronto-Oshawa",
      OBJECTID: 23
    },
    geometry: {
      x: -76.1667,
      y: 44.3333
    }
  },
  {
    attributes: {
      stop_name: "Brockville",
      route_name: "Toronto-Oshawa",
      OBJECTID: 24
    },
    geometry: {
      x: -75.6843,
      y: 44.5897
    }
  },
  {
    attributes: {
      stop_name: "Mallorytown",
      route_name: "Toronto-Oshawa",
      OBJECTID: 25
    },
    geometry: {
      x: -75.8833,
      y: 44.4833
    }
  },
  {
    attributes: {
      stop_name: "Johnstown",
      route_name: "Toronto-Oshawa",
      OBJECTID: 26
    },
    geometry: {
      x: -75.6833,
      y: 44.6667
    }
  },
  {
    attributes: {
      stop_name: "Prescott",
      route_name: "Toronto-Oshawa",
      OBJECTID: 27
    },
    geometry: {
      x: -75.5167,
      y: 44.7167
    }
  },
  {
    attributes: {
      stop_name: "Cardinal",
      route_name: "Toronto-Oshawa",
      OBJECTID: 28
    },
    geometry: {
      x: -75.4167,
      y: 44.7833
    }
  },
  {
    attributes: {
      stop_name: "Iroquois",
      route_name: "Toronto-Oshawa",
      OBJECTID: 29
    },
    geometry: {
      x: -75.3167,
      y: 44.8500
    }
  },
  {
    attributes: {
      stop_name: "Morrisburg",
      route_name: "Toronto-Oshawa",
      OBJECTID: 30
    },
    geometry: {
      x: -75.1833,
      y: 44.9000
    }
  },
  {
    attributes: {
      stop_name: "Coteau",
      route_name: "Toronto-Montreal",
      OBJECTID: 31
    },
    geometry: {
      x: -74.1833,
      y: 45.2667
    }
  },
  {
    attributes: {
      stop_name: "Dorval",
      route_name: "Toronto-Montreal",
      OBJECTID: 32
    },
    geometry: {
      x: -73.7500,
      y: 45.4500
    }
  },
  {
    attributes: {
      stop_name: "Alexandria",
      route_name: "Toronto-Montreal",
      OBJECTID: 33
    },
    geometry: {
      x: -74.6333,
      y: 45.3167
    }
  },
  {
    attributes: {
      stop_name: "Coteau",
      route_name: "Toronto-Montreal",
      OBJECTID: 34
    },
    geometry: {
      x: -74.1833,
      y: 45.2667
    }
  },
  {
    attributes: {
      stop_name: "Dorval",
      route_name: "Toronto-Montreal",
      OBJECTID: 35
    },
    geometry: {
      x: -73.7500,
      y: 45.4500
    }
  },
  {
    attributes: {
      stop_name: "Malton",
      route_name: "Toronto-Montreal",
      OBJECTID: 36
    },
    geometry: {
      x: -79.6333,
      y: 43.7000
    }
  },
  {
    attributes: {
      stop_name: "Guildwood",
      route_name: "Toronto-Montreal",
      OBJECTID: 37
    },
    geometry: {
      x: -79.1333,
      y: 43.8000
    }
  },
  {
    attributes: {
      stop_name: "Oshawa",
      route_name: "Toronto-Montreal",
      OBJECTID: 38
    },
    geometry: {
      x: -78.8667,
      y: 43.9000
    }
  },
  {
    attributes: {
      stop_name: "Cobourg",
      route_name: "Toronto-Montreal",
      OBJECTID: 39
    },
    geometry: {
      x: -78.1667,
      y: 43.9667
    }
  },
  {
    attributes: {
      stop_name: "Port Hope",
      route_name: "Toronto-Montreal",
      OBJECTID: 40
    },
    geometry: {
      x: -78.3000,
      y: 43.9500
    }
  },
  {
    attributes: {
      stop_name: "Belleville",
      route_name: "Toronto-Montreal",
      OBJECTID: 41
    },
    geometry: {
      x: -77.3833,
      y: 44.1667
    }
  },
  {
    attributes: {
      stop_name: "Trenton",
      route_name: "Toronto-Montreal",
      OBJECTID: 42
    },
    geometry: {
      x: -77.5833,
      y: 44.1000
    }
  },
  {
    attributes: {
      stop_name: "Napanee",
      route_name: "Toronto-Montreal",
      OBJECTID: 43
    },
    geometry: {
      x: -76.9500,
      y: 44.2500
    }
  },
  {
    attributes: {
      stop_name: "Gananoque",
      route_name: "Toronto-Montreal",
      OBJECTID: 44
    },
    geometry: {
      x: -76.1667,
      y: 44.3333
    }
  },
  {
    attributes: {
      stop_name: "Rhinecliff",
      route_name: "Toronto-Montreal",
      OBJECTID: 45
    },
    geometry: {
      x: -73.9167,
      y: 41.9167
    }
  },
  {
    attributes: {
      stop_name: "Hudson",
      route_name: "Toronto-Montreal",
      OBJECTID: 46
    },
    geometry: {
      x: -73.7833,
      y: 45.4500
    }
  },
  {
    attributes: {
      stop_name: "Saint-Lambert",
      route_name: "Toronto-Montreal",
      OBJECTID: 47
    },
    geometry: {
      x: -73.5000,
      y: 45.5000
    }
  }
];

export default trainStops; 