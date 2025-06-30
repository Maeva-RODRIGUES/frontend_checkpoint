import "reflect-metadata";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { db } from "./db";
import schemaPromise from "./schema";

const port = 4000;
const allowedOrigin = "http://localhost:5173"; 

schemaPromise.then(async (schema) => {
  await db.initialize();
  const app = express();
  const httpServer = http.createServer(app);

 
  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
  const server = new ApolloServer({ schema, plugins });

  await server.start();

  
  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true,
    })
  );

 
  app.use(express.json());


  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );


  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
});
