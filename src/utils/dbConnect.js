import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;
  cached.promise = mongoose.connect(MONGODB_URI, { dbName: "nextIO" });
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
