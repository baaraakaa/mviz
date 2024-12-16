import { createTables, dbOps, Node } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next/types"

const gData = {
  "nodes": [
    {
      "id": 1,
      "type": "music",
      "name": "In Search of Lost Time (Deluxe)",
      "img": "losttime.jpg",
      "url": "https://soundcloud.com/protoje/sets/in-search-of-lost-time-deluxe",
      "description": ""
    },
    {
      "id": 2,
      "type": "artist",
      "name": "Protoje",
      "img": "protoje.jpg",
      "url": "https://soundcloud.com/protoje",
      "description": ""
    },
    {
      "id": 3,
      "type": "label",
      "name": "In.Digg.Nation",
      "img": "indiggnation.jpg",
      "url": "https://www.discogs.com/label/826834-InDiggNation-Collective",
      "description": ""
    },
    {
      "id": 4,
      "type": "artist",
      "name": "Lila Ike",
      "img": "lila.jpeg",
      "url": "https://soundcloud.com/lilaike",
      "description": ""
    },
    {
      "id": 5,
      "type": "music",
      "name": "The ExPerience",
      "img": "experience.jpg",
      "url": "https://soundcloud.com/lilaike/sets/the-experience-955275339",
      "description": ""
    },
    {
      "id": 6,
      "type": "artist",
      "name": "Pa Salieu",
      "img": "pasalieu.jpg",
      "url": "https://soundcloud.com/pasalieu",
      "description": ""
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
type gDataType = {
  nodes: Node[],
  links: {
    "source": number,
    "target": number
  }[]
}
const importNodes = (data:gDataType) => {
  data.nodes.forEach((n)=>{
    dbOps.upsertNode(n)
  })
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
  // createTables()
  // importNodes(gData)
  res.status(200)
}


