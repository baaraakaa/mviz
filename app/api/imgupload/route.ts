import { NextResponse } from "next/server";
import fs from 'node:fs/promises'

export async function POST(req: Request){
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File
        const buffer = new Uint8Array(await file.arrayBuffer())
        await fs.writeFile(`./public/imgs/${file.name}`, buffer)
        return NextResponse.json({status:200})
    } catch (e) {
        console.error(e)
        return NextResponse.json({ status: 500, error: e });
    }
}