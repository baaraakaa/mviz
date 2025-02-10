import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { NodeObject } from "react-force-graph-3d"
import Markdown from 'react-markdown'
import ReactPlayer from "react-player"
import { gData, NodeData } from "./FocusGraph"
import ImageUpload from "./ImageUpload"
import GraphLoad from "./GraphLoad"

type pProps = {
  node: NodeData,
  mode: string,
  setMode: (m: string) => void,
  linkMode: boolean,
  setLinkMode: Dispatch<SetStateAction<boolean>>,
  addNode: (n: NodeData) => void,
  updateGraph: (n: NodeData) => void,
  saveGraph: () => void,
  loadGraph: (d: gData) => void,
  deleteNode: (n: NodeData) => void
}

export default function InfoPanel({
  node, mode, setMode, linkMode, setLinkMode, addNode,
  deleteNode, updateGraph, saveGraph, loadGraph
}: pProps) {
  //form state
  const [formName, setFormName] = useState(node && node.name)
  const [formUrl, setFormUrl] = useState(node && node.url)
  const [formType, setFormType] = useState(node && node.type)
  const [formDescription, setFormDescription] = useState(node && node.description)
  const [uploadedImg, setUploadedImg] = useState("")

  const handleModeToggle = () => {
    mode == 'edit' ? setMode('view') : setMode('edit')
  }
  const handleNewNode = () => {
    addNode({
      id: 0,
      type: 'music',
      name: '',
      description: '',
      url: '',
      img: 'default.png'
    })
  }

  const onImageUpload = (img: string) => {
    setUploadedImg(img)
  }

  const handleSubmit = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const elements = Array.from(
      event.currentTarget.elements
    ) as HTMLInputElement[]

    updateGraph({
      id: node.id || 0,
      name: elements[0].value,
      url: elements[1].value,
      type: elements[2].value,
      description: elements[3].value,
      img: uploadedImg == "" ? node.img : uploadedImg
    })

  }

  let content = null
  if (node) {
    content = <div>
      {node.type == 'music' && node.url && <ReactPlayer
        url={node.url}
        controls={true}
      />}
      {node.type != 'music' && node.url &&
        <a href={node.url}>{node.url}</a>
      }
    </div>
  } else {
    content = <div>
    </div>
  }

  const editForm = <form style={{
    display: 'flex',
    flexDirection: 'column',
    width: '80%'
  }}
    onSubmit={handleSubmit}
  >
    <label>Name</label>
    <input type="text"
      value={formName}
      onChange={(e) => {
        setFormName(e.target.value)
      }}
    />
    <label>media url</label>
    <input type="text"
      value={formUrl}
      onChange={(e) => {
        setFormUrl(e.target.value)
      }}
    />
    <label>type</label>
    <input type="text"
      value={formType}
      onChange={(e) => {
        setFormType(e.target.value)
      }}
    />

    <label>description</label>
    <input type="text"
      value={formDescription}
      onChange={(e) => {
        setFormDescription(e.target.value)
      }}
    />

    <input type="submit" value="save" />
  </form>


  return <div style={{
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <div style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'

    }}>
      <h1 style={{
        flexGrow: '1'
      }}>{node ? node.name : "Welcome"}</h1>

    </div>
    <div style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'space-around'
    }}>
      <button onClick={saveGraph}>SAVE</button>

      {mode == 'edit' && <button onClick={handleNewNode}>
        +New
      </button>}

      {mode == 'edit' && <button onClick={() => {
        linkMode ? setLinkMode(false) : setLinkMode(true)
      }}>{
          linkMode ? "link edit off" : "link edit on"
        }</button>}

      {node && mode == 'edit' && <button onClick={() => deleteNode(node)}>
        DELETE NODE
      </button>}

      {node && <button onClick={handleModeToggle}>{
        mode == 'edit' ? "X" : "EDIT"
      }</button>}
    </div>
    <div style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'space-around'
    }}>
      <GraphLoad loadGraph={loadGraph} />
    </div>
    {content}
    {mode == 'edit' && editForm}
    {mode == 'edit' && <ImageUpload
      onUpload={onImageUpload}
    />}
  </div>
}