"use client"
import { useRef } from "react"

type iuProps = {
    onUpload: (img: string) => void
}

export default function ImageUpload(
    {onUpload}: iuProps
){
    const fileInput = useRef<HTMLInputElement>(null)

    async function uploadFile(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        event.preventDefault()
        const formData = new FormData()
        const file = fileInput?.current?.files?.[0]!
        formData.append("file", file)
        
        const response = await fetch("/api/imgupload", {
            method: "POST",
            body: formData
        })
        const result = await response.json()
        console.log(result)

        if(response.ok){
            onUpload(file.name)
        }
    }

    return (
        <form>
            <label>
                <span>Upload Image</span>
                <input type="file" name="file" ref={fileInput} />
            </label>
            <button type="submit" onClick={uploadFile}>
                Upload
            </button>
        </form>
    )
}