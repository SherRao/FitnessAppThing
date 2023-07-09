import express, { Express, Request, Response } from "express";
import { Client as NotionClient } from "@notionhq/client";
import "dotenv/config";

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId: string = process.env.NOTION_DATABASE_ID ?? "";

const server: Express = express();
const notion = new NotionClient( {auth: notionSecret} );

console.log(process.env);
server.get('/', async (req: Request, res: Response) => {
  const response = await queryDatabase(notionDatabaseId);
  res.send(response);
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${hostname}:${port}`);
});

const queryDatabase = async (databaseId: string) => {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
          });
        return response.results[0];
    } catch (error: any){
        console.log(error.body);
    }
}
