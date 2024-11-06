import { NodeObject } from "react-force-graph-3d"
import Markdown from 'react-markdown'
import ReactPlayer from "react-player"

type pProps = {
    node: NodeObject,
    mode: string,
    setMode: (m: string) => void,
    addNode: () => void
}

export default function InfoPanel({ node, mode, setMode, addNode}: pProps) {

    const handleModeToggle = () => {
        mode == 'edit' ? setMode('view') : setMode('edit')
    }
    const handleNewNode = () => {

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
            {mode == 'edit' && <button onClick={handleNewNode}>
                +New
            </button>}
            <button onClick={handleModeToggle}>{
                mode == 'edit' ? "X" : "EDIT"
            }</button>
        </div>
        {content}
    </div>
}