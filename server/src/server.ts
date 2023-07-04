import express, { Express, Request, Response } from "express";
import { Client as NotionClient } from "@notionhq/client";

const hostname = "localhost"; //process.env.HOSTNAME;
const port = 8080; //process.env.PORT;
const notionDatabaseId = 0; //process.env.NOTION_DATABASE_ID;
const notionSecret = "0"; //process.env.NOTION_SECRET;

const server: Express = express();
const notion = new NotionClient( {auth: notionSecret} );

server.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
