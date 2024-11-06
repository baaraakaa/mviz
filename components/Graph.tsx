"use client"
import FocusGraph, { gData } from "./FocusGraph";
import { useCallback, useState } from "react";
import { ForceGraphMethods, NodeObject } from "react-force-graph-3d";
import InfoPanel from "./InfoPanel";

type gProps = {
  gData: gData
}

export default function Graph({ gData }: gProps) {
  const [selectedNode, setSelectedNode] = useState<NodeObject>()
  const [mode, setMode] = useState('view')

  const createNewNode = () => {
    
  }


  return <div style={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
    <div style={{ flexGrow: 1, width: '60%' }}>
      <FocusGraph
        gData={gData}
        selectNode={setSelectedNode}
        mode={mode}
      />
    </div>
    <div style={{ flexGrow: 1, width: '40%', height: '100%' }}>
      <InfoPanel
        /* @ts-expect-error */
        node={selectedNode}
        mode={mode}
        setMode={setMode}
        addNode={createNewNode}
      />
    </div>
  </div>
}