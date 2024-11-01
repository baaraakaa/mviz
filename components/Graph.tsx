"use client"
import FocusGraph from "./FocusGraph";
import { useCallback, useState } from "react";
import { ForceGraphMethods, NodeObject } from "react-force-graph-3d";

type gProps = {
  gData: {
    nodes: {}[],
    links: {}[]
  }
}

export default function Graph({ gData }: gProps) {
  const [selectedNode, setSelectedNode] = useState<NodeObject>()

  const selectNode = (node: NodeObject) => {
    setSelectedNode(node)
  }

  return <div>
    <div>
      <FocusGraph
        gData={gData}
        selectNode={selectNode}
      />
    </div>
  </div>
}