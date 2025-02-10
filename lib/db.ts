import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config()

export const connectionPool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

export type newNode = {
  type: string,
  name: string,
  img: string,
  url: string,
  description: string
}

export type Node = newNode & {
  id: number
}

export const dbOps = {
  getGraphData: async () => {
    return {
      'nodes': (await connectionPool.query(`
            SELECT id, type, name, img, url, description
            FROM nodes;
        `)).rows,
      'links': (await connectionPool.query(`
            SELECT id, source, target
            FROM edges;
        `)).rows
    }
  },
  upsertNode: async (node: Node | newNode) => {
    if ('id' in node && node.id > 0) {
      return await connectionPool.query(`
        INSERT INTO nodes (id, type, name, img, url, description)
        VALUES(
            '${node.id}',
            '${node.type}',
            '${node.name}',
            '${node.img}',
            '${node.url}',
            '${node.description}'
        )
        ON CONFLICT (id) DO UPDATE;
      `)
    } else {
      return await connectionPool.query(`
        INSERT INTO nodes (type, name, img, url, description)
        VALUES(
            '${node.type}',
            '${node.name}',
            '${node.img}',
            '${node.url}',
            '${node.description}'
        );
      `)
    }

  },
  removeNode: async (id: number) => {
    return await connectionPool.query(`
      DELETE FROM nodes WHERE id='${id}';
    `)
  },
  addEdge: async (nodeId1: Node, nodeId2: Node) => {
    let nodes = [nodeId1, nodeId2]
    nodes.sort()
    return await connectionPool.query(`
      INSERT INTO edges (source, target)
      VALUES('${nodes[0]}','${nodes[1]}');
    `)
  },
  removeEdge: async (id: number) => {
    return await connectionPool.query(`
      DELETE FROM edges WHERE id='${id}';
    `)
  }
}

export const createTables = () => {
  return connectionPool.query(`
    CREATE TABLE nodes (
      id SERIAL PRIMARY KEY,
      type TEXT,
      name TEXT,
      img TEXT,
      url TEXT,
      description TEXT
    );

    CREATE TABLE edges (
      id SERIAL PRIMARY KEY,
      source INTEGER REFERENCES nodes,
      target INTEGER REFERENCES nodes
    );
  `)
}