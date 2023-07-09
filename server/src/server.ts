import express, { Express, Request, Response } from "express";
import { Client as NotionClient } from "@notionhq/client";
import cors from "cors";
import "dotenv/config";

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const notionSecret = process.env.NOTION_SECRET;
const notionSessionDatabaseId: string = process.env.NOTION_SESSION_DATABASE_ID ?? "";
const notionWorkoutDatabaseId: string = process.env.NOTION_WORKOUT_DATABASE_ID ?? "";

const server: Express = express();
const notion = new NotionClient( {auth: notionSecret} );

interface WorkoutEntry {
    id: string;
    sets: Array<WorkoutSet>
}

interface WorkoutSet {
    setId: number;
    reps: number;
    weight: number;
}


server.use(cors());
server.get("/", async (req: Request, res: Response) => {
    const response: any = await queryDatabase(notionWorkoutDatabaseId) ?? [];
    const workoutType = "Bench Press";
    const workouts = response.filter((workout: any) => workout["properties"]["Excercise"]["select"]["name"] === workoutType);

    const result: Array<WorkoutEntry> = [];
    for(const wk of workouts) {
        const data: any = wk["properties"];

        const reps: Array<number> = [];
        const weights: Array<number> = [];
        const workout: Array<WorkoutSet> = [];

        const repKeys = Object.keys(data).filter((key) => key.includes("Reps")).sort();
        const weightKeys = Object.keys(data).filter((key) => key.includes("Weight")).sort();

        repKeys.forEach((key) => reps.push(data[key]["number"] ?? 0));
        weightKeys.forEach((key) => weights.push(data[key]["number"] ?? 0));

        for(let i = 0; i < repKeys.length; i++) {
            const r = reps[i];
            const w = weights[i];
            if(r === 0 || w === 0)
                continue;

            const entry: WorkoutSet = {setId: i, reps: r, weight: w};
            workout.push(entry);
        }

        result.push({id: response.id, sets: workout});
    }

    res.send(JSON.stringify(result, null, "\t"));
});

server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://${hostname}:${port}`);

});

const queryDatabase = async (databaseId: string) => {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
        });
        return response.results;
    } catch (error: any){
        console.log(error.body);
    }
};
