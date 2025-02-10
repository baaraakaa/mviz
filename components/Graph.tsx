"use client"
import FocusGraph, { gData, NodeData } from "./FocusGraph";
import { useCallback, useEffect, useRef, useState } from "react";
import { ForceGraphMethods, LinkObject, NodeObject } from "react-force-graph-3d";
import InfoPanel from "./InfoPanel";

type gProps = {
  gData: gData
}

export default function Graph({ gData }: gProps) {
  const [selectedNode, setSelectedNode] = useState<NodeObject>()
  const [mode, setMode] = useState('view')
  const [linkMode, setLinkMode] = useState(false)
  const [graphData, setGraphData] = useState(gData)
  const [triedLoad, setTriedLoad] = useState(false)

  useEffect(()=>{
    const localData = localStorage.getItem('graphData')
    console.log(localData)
    if(localData){
      const localGraph = JSON.parse(localData)
      setGraphData(localGraph)
    }
    setTriedLoad(true)
  },[])

  useEffect(()=>{
    if(!triedLoad) return
    localStorage.setItem('graphData', convertGraphForSave())
    console.log("SAVED to LOCALDATA")
  },[graphData])

  const idxOfNode = (node: NodeData) => {
    //binary search
    let hi = graphData.nodes.length
    let mid = Math.floor(hi / 2)
    let lo = 0
    while (lo <= hi) {
      mid = Math.floor((lo + hi) / 2)
      let id = graphData.nodes[mid].id
      if (id > node.id) {
        hi = mid - 1
      } else if (id < node.id) {
        lo = mid + 1
      } else {
        return mid
      }
    }
    return -1
  }

  const updateGraph = (node: NodeData) => {
    const i = idxOfNode(node)
    if (i < 0) return

    let tempData = { ...graphData }
    let n = tempData.nodes[i]
    n.img = node.img
    n.name = node.name
    n.type = node.type
    n.url = node.url
    n.description = node.description
    setGraphData(tempData)
  }

  const createNode = (node: NodeData) => {
    node.id = graphData.nodes[graphData.nodes.length - 1].id + 1
    let tempData = { ...graphData }
    tempData.nodes.push(node)
    setGraphData(tempData)
    if(selectedNode) createEdge(node,selectedNode);
    setSelectedNode(node)
    // useEffect(() => {
    //   //uploadImage()
    //   fetch('/api/graphdata', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       type: 'node',
    //       node: node
    //     })
    //   })
    // })
  }

  const deleteNode = (node: NodeData) => {
    const i = idxOfNode(node)
    if (i < 0) return

    let tempData = { ...graphData }
    tempData.nodes = tempData.nodes.slice(0, i).concat(
      tempData.nodes.slice(i + 1, tempData.nodes.length)
    )
    console.log(tempData.links)
    tempData.links = tempData.links.filter((link) => {
      //@ts-expect-error
      return (link.source.id != node.id) && (link.target.id != node.id)
    })
    console.log(tempData.links)
    setGraphData(tempData)
    setSelectedNode(undefined)
  }

  const createEdge = (
    source: NodeObject,
    target: NodeObject
  ) => {
    let tempData = { ...graphData }
    tempData.links.push({
      source: typeof(source) === 'object' ? Number(source.id) : source,
      target: typeof(target) === 'object' ? Number(target.id) : target
    })
    setGraphData(tempData)
    // useEffect(() => {
    //   fetch('/api/graphdata', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       type: 'edge',
    //       source: source.id,
    //       target: target.id
    //     })
    //   })
    // })
  }

  const deleteEdge = (edge: LinkObject, idx: number) => {
    if (idx !== undefined) {
      let tempData = { ...graphData }
      tempData.links = tempData.links.slice(0, idx).concat(
        graphData.links.slice(idx + 1, graphData.links.length)
      )
      setGraphData(tempData)
    }
    // useEffect(() => {
    //   fetch('/api/graphdata', {
    //     method: 'DELETE',
    //     body: JSON.stringify({
    //       type: 'edge',
    //       id: edge.id
    //     })
    //   })
    // })
  }

  const selectNode = (node: NodeObject) => {
    if (linkMode && selectedNode) {
      if (node == selectedNode) return
      const idx = graphData.links.findIndex((link) =>
        (link.source === node && link.target === selectedNode) ||
        (link.target === node && link.source === selectedNode)
      )
      console.log(idx)
      if (idx > -1) {
        deleteEdge(graphData.links[idx], idx)
      } else createEdge(selectedNode, node)
    } else setSelectedNode(node)
  }

  const convertGraphForSave = () => {
    let tempData = { ...graphData }
    tempData.links = graphData.links.map((link) => {
      return {
        source: typeof (link.source) === 'object' ? link.source.id : link.source,
        target: typeof (link.target) === 'object' ? link.target.id : link.target
      }
    })
    tempData.nodes = graphData.nodes.map((node) => {
      return {
        id: node.id,
        name: node.name,
        type: node.type,
        img: node.img,
        url: node.url,
        description: node.description
      }
    })
    return JSON.stringify(tempData)
  }

  const exportGraphData = () => {
    const link = document.createElement("a")
    const jsonString = `data:text/json,${encodeURIComponent(
      convertGraphForSave()
    )}`
    link.href = jsonString
    link.download = "mviz.json"
    link.click()
  }

  const loadGraph = (data: gData) => {
    console.log(data)
    setGraphData(data)
  }


  return <div style={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
    <div style={{ flexGrow: 1, width: '60%' }}>
      <FocusGraph
        gData={graphData}
        selectNode={selectNode}
        mode={mode}
        linkMode={linkMode}
      />
    </div>
    <div style={{ flexGrow: 1, width: '40%', height: '100%' }}>
      <InfoPanel
        /* @ts-expect-error */
        node={selectedNode}
        mode={mode}
        setMode={setMode}
        linkMode={linkMode}
        setLinkMode={setLinkMode}
        addNode={createNode}
        deleteNode={deleteNode}
        updateGraph={updateGraph}
        saveGraph={exportGraphData}
        loadGraph={loadGraph}
        key={
          selectedNode?.id
        }
      />
    </div>
  </div>
}