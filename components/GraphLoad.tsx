import { useRef } from "react"
import { gData } from "./FocusGraph"

type glProps = {
    loadGraph: (graph: gData) => void
}
export default function GraphLoad({loadGraph}: glProps){
    const fileInput = useRef<HTMLInputElement>(null)

    const handleUpload = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()
        const file = fileInput?.current?.files?.[0]!
        file.text().then((s) => loadGraph(JSON.parse(s)))
    }

    return(
        <form>
            <label>
                <input type="file" name="file" ref={fileInput}/>
            </label>
            <button type="submit" onClick={handleUpload}>
                Upload
            </button>
        </form>
    )
}