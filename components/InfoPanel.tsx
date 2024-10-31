import { NodeObject } from "react-force-graph-3d"
import Markdown from 'react-markdown'

export default function InfoPanel(node: NodeObject) {
    return <div>
        {
            ('description' in node) &&
            <Markdown>{node.description}</Markdown>
        }
    </div>
}