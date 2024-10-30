"use client"

import { ForceGraph3D } from "react-force-graph";
// @ts-expect-error
import * as THREE from "three";
import { useCallback, useRef } from "react";
import { ForceGraphMethods } from 'react-force-graph-3d'

type gProps = {
  gData: {
    nodes: {}[],
    links: {}[]
  }
}

export default function Graph({ gData }: gProps) {
  const FocusGraph = () => {
    const fgRef = useRef<ForceGraphMethods>()
    //@ts-expect-error
    const handleClick = useCallback((node) => {
      if (fgRef.current === undefined) return;
      const distance = 60
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)
      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        2000  // ms transition duration
      );
    }, [fgRef])

    return <ForceGraph3D
      nodeLabel="name"
      graphData={gData}
      nodeThreeObject={({ img }: { img: string }) => {
        const imgTexture = new THREE.TextureLoader().load(`/imgs/${img}`)
        imgTexture.colorSpace = THREE.SRGBColorSpace
        const material = new THREE.SpriteMaterial({ map: imgTexture })
        const sprite = new THREE.Sprite(material)
        sprite.scale.set(12, 12)

        return sprite;
      }}
      onNodeClick={handleClick}
      // ref={fgRef}
    />
  }

  return <FocusGraph />
}