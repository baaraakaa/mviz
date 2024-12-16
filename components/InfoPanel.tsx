import { useState } from "react"
import { NodeObject } from "react-force-graph-3d"
import Markdown from 'react-markdown'
import ReactPlayer from "react-player"
import { NodeData } from "./FocusGraph"
import ImageUpload from "./ImageUpload"

type pProps = {
  node: NodeData,
  mode: string,
  setMode: (m: string) => void,
  addNode: (n: NodeData, url: string) => void,
  updateGraph: (n: NodeData) => void
}

export default function InfoPanel({ node, mode, setMode, addNode, updateGraph }: pProps) {
  //form state
  const [formName, setFormName] = useState(node && node.name)
  const [formUrl, setFormUrl] = useState(node && node.url)
  const [uploadedImg, setUploadedImg] = useState("")


  const handleModeToggle = () => {
    mode == 'edit' ? setMode('view') : setMode('edit')
  }
  const handleNewNode = () => {

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
      type: node.type,
      url: elements[1].value,
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
      onChange={(e)=>{
        setFormName(e.target.value)
      }}
    />
    <label>media url</label>
    <input type="text"
      value={formUrl}
      onChange={(e)=>{
        setFormUrl(e.target.value)
      }}
    />
    <input type="submit" value="save"/>
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
      {mode == 'edit' && <button onClick={handleNewNode}>
        +New
      </button>}
      <button onClick={handleModeToggle}>{
        mode == 'edit' ? "X" : "EDIT"
      }</button>
    </div>
    {content}
    {mode == 'edit' && editForm}
    {mode == 'edit' && <ImageUpload
      onUpload={onImageUpload}
    />}
  </div>
}