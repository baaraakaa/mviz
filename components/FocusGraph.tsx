import { ForceGraph3D } from "react-force-graph";
import * as THREE from "three";
import { useCallback, useRef, useState } from "react";
import { ForceGraphMethods, NodeObject } from 'react-force-graph-3d'


export type gData = {
  nodes: {
    img: string
  }[],
  links: {}[]
}

type fgProps = {
  gData: gData,
  selectNode: (n: NodeObject) => void
}

export default function FocusGraph({ gData, selectNode }: fgProps) {
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);

  window.addEventListener('resize', () => {
    setDisplayWidth(window.innerWidth);
    setDisplayHeight(window.innerHeight);
  });
  const fgRef = useRef<ForceGraphMethods>()


  // @ts-expect-error
  const zoomToNode = (node, fg) => {
    const distance = 50
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)
    fg.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      2000  // ms transition duration
    );
  }

  const handleNodeClick = (node: NodeObject) => {
    if (fgRef == undefined) return
    selectNode(node)
    zoomToNode(node, fgRef.current)
  }

  return <ForceGraph3D
    width={displayWidth * 0.6}
    height={displayHeight}
    nodeLabel="name"
    graphData={gData}
    nodeThreeObject={({ img }: { img: string }) => {
      const imgTexture = new THREE.TextureLoader().load(`/imgs/${img}`)
      imgTexture.colorSpace = THREE.SRGBColorSpace
      const material = new THREE.SpriteMaterial({ map: imgTexture })
      const sprite = new THREE.Sprite(material)
      sprite.scale.set(12, 12, 1)
      return sprite;
    }}
    onNodeClick={handleNodeClick}
    //@ts-expect-error
    ref={fgRef}
  />
}