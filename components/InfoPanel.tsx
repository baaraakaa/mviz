import { NodeObject } from "react-force-graph-3d"
import Markdown from 'react-markdown'

type pProps = {
    node: NodeObject
}

export default function InfoPanel({node} : pProps) {
    return <div style={{
        width:'100%',
        textAlign: 'center'
    }}>
        {node ? node.name : "TEST TEST TEST"}
    </div>
}