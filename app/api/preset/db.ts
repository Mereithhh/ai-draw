import { MongoClient, ObjectId } from "mongodb";

const url = process.env.MONGODB_URI || "mongodb://localhost:27017";

export const client = new MongoClient(url, {
});

const db = "aidraw"

let connected = false;
const connect = async () => {
    if (!connected) {
        await client.connect();
        connected = true;
    }
}

export const getPersets = async () => {
    await connect();
    const collection = client.db(db).collection("preset");
    const res = await collection.find({}).toArray();
    return res;
}

export const findPersetById = async (id: string) => {
    await connect();
    const collection = client.db(db).collection("preset");
    const data = await collection.findOne({ _id: new ObjectId(id) });
    return data;
}

export const getOpenAI = async () => {
    await connect();
    const collection = client.db(db).collection("openai");
    const data = await collection.findOne({});
    return data;
}

export const getSetting = async () => {
    await connect();
    const collection = client.db(db).collection("setting");
    const data = await collection.findOne({});
    return data;
}