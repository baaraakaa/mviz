import { NextApiRequest, NextApiResponse } from "next";
import { dbOps } from "@/lib/db";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    switch (req.method){
        case "POST":
            switch(req.body.type){
                case 'node':
                    dbOps.upsertNode(req.body.node)
                    res.status(200)
                    break
                case 'edge':
                    dbOps.addEdge(req.body.source, req.body.target)
                    res.status(200)
            }
        case "GET":
            res.status(200).json(dbOps.getGraphData())
            break
        case "DELETE":
            switch(req.body.type){
                case 'edge':
                    dbOps.removeEdge(req.body.id)
                    res.status(200)
                    break
                case 'node':
                    dbOps.removeNode(req.body.id)
                    res.status(200)
            }
    }
}