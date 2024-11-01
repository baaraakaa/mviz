import { NodeObject } from "react-force-graph-3d"
import Markdown from 'react-markdown'

export default function InfoPanel(node: NodeObject) {
    if(node){
        return <div>
        <h1>{node.name}</h1>
        {
            ('description' in node) &&
            <Markdown>{node.description}</Markdown>
        }
    </div>
    } else {
        null
    }
}