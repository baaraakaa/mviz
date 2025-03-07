"use client"

import Graph from "@/components/Graph";
import { useEffect, useState } from "react";

const gData = {
  "nodes": [
    {
      "id": 1,
      "type": "music",
      "name": "In Search of Lost Time (Deluxe)",
      "img": "losttime.jpg",
      "url": "https://soundcloud.com/protoje/sets/in-search-of-lost-time-deluxe"
    },
    {
      "id": 2,
      "type": "artist",
      "name": "Protoje",
      "img": "protoje.jpg",
      "url": "https://soundcloud.com/protoje"
    },
    {
      "id": 3,
      "type": "label",
      "name": "In.Digg.Nation",
      "img": "indiggnation.jpg",
      "url": "https://www.discogs.com/label/826834-InDiggNation-Collective"
    },
    {
      "id": 4,
      "type": "artist",
      "name": "Lila Ike",
      "img": "lila.jpeg",
      "url": "https://soundcloud.com/lilaike"
    },
    {
      "id": 5,
      "type": "music",
      "name": "The ExPerience",
      "img": "experience.jpg",
      "url": "https://soundcloud.com/lilaike/sets/the-experience-955275339"
    },
    {
      "id": 6,
      "type": "artist",
      "name": "Pa Salieu",
      "img": "pasalieu.jpg",
      "url": "https://soundcloud.com/pasalieu"
    }
  ],
  "links": [
    {
      "source": 2,
      "target": 1
    },
    {
      "source": 3,
      "target": 2
    },
    {
      "source": 3,
      "target": 1
    },
    {
      "source": 3,
      "target": 4
    },
    {
      "source": 3,
      "target": 5
    },
    {
      "source": 4,
      "target": 1
    },
    {
      "source": 6,
      "target": 1
    },
    {
      "source": 4,
      "target": 5
    }
  ]
}

export default function Home() {
  const [graphData, setGraphData] = useState()
  
  // useEffect(() => {
  //     fetch('/api/graphdata').then(
  //       response => response.json().then(
  //         body => setGraphData(body)
  //       )
  //     )
  // },[])
  // console.log(graphData)
  return (
    <main>
      <Graph
        //@ts-ignore-error
        gData={gData}
      />
    </main>
  );
}
