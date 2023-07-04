"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@notionhq/client");
const hostname = "localhost"; //process.env.HOSTNAME;
const port = 8080; //process.env.PORT;
const notionDatabaseId = 0; //process.env.NOTION_DATABASE_ID;
const notionSecret = "0"; //process.env.NOTION_SECRET;
const server = (0, express_1.default)();
const notion = new client_1.Client({ auth: notionSecret });
server.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
