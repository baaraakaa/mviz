"use client"
import FocusGraph, { gData, NodeData } from "./FocusGraph";
import { useCallback, useEffect, useState } from "react";
import { ForceGraphMethods, LinkObject, NodeObject } from "react-force-graph-3d";
import InfoPanel from "./InfoPanel";

type gProps = {
  gData: gData
}

export default function Graph({ gData }: gProps) {
  const [selectedNode, setSelectedNode] = useState<NodeObject>()
  const [mode, setMode] = useState('view')
  const [linkMode,setLinkMode] = useState(false)
  const [graphData, setGraphData] = useState(gData)

  const updateGraph = (node: NodeData) => {
    //binary search
    let hi = graphData.nodes.length
    let mid = Math.floor(hi / 2)
    let lo = 0
    while(lo <= hi){
      mid = Math.floor((lo+hi)/2)
      let id = graphData.nodes[mid].id
      if(id > node.id){
        hi = mid - 1
      } else if(id < node.id){
        lo = mid + 1
      } else {
        let tempData = graphData
        tempData.nodes[mid] = node
        setGraphData(tempData)
        return
      }
    }
  }

  const createNode = (node: NodeData, img) => {
    useEffect(() => {
      //uploadImage()
      fetch('/api/graphdata', {
        method: 'POST',
        body: JSON.stringify({
          type: 'node',
          node: {
            type: 'node',
            name: node.name,
            img: node.img,
            url: node.url,
            description: node.description
          }
        })
      })
    })
  }

  const createEdge = (
    source: NodeObject,
    target: NodeObject
  ) => {
    useEffect(() => {
      fetch('/api/graphdata', {
        method: 'POST',
        body: JSON.stringify({
          type: 'edge',
          source: source.id,
          target: target.id
        })
      })
    })
  }

  const deleteEdge = (edge: LinkObject) => {
    useEffect(() => {
      fetch('/api/graphdata', {
        method: 'DELETE',
        body: JSON.stringify({
          type: 'edge',
          id: edge.id
        })
      })
    })
  }

  const selectNode = (node: NodeObject) => {
    if(linkMode && selectedNode){
      createEdge(selectedNode,node)
    } else setSelectedNode(node)
  }

  const selectEdge = (edge: LinkObject) => {
    if(linkMode && edge){
      deleteEdge(edge)
    }
  }


  return <div style={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
    <div style={{ flexGrow: 1, width: '60%' }}>
      <FocusGraph
        gData={graphData}
        selectNode={selectNode}
        mode={mode}
      />
    </div>
    <div style={{ flexGrow: 1, width: '40%', height: '100%' }}>
      <InfoPanel
        /* @ts-expect-error */
        node={selectedNode}
        mode={mode}
        setMode={setMode}
        addNode={createNode}
        key={selectedNode?.id}
      />
    </div>
  </div>
}