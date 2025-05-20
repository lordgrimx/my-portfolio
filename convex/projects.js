import { v } from "convex/values";
import { query,mutation } from "./_generated/server";


export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

export const createProject = mutation({
    args:{
        title: v.string(),
        description: v.string(),
        imageURL: v.string(),
        demoURL: v.string(),
        githubURL: v.string(),
        languages:v.array(v.string())
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("projects", {
            title: args.title,
            description: args.description,
            imageURL: args.imageURL,
            demoURL: args.demoURL,
            githubURL: args.githubURL,
            languages: args.languages
        });
        return id;
    }
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    imageURL: v.optional(v.string()),
    demoURL: v.optional(v.string()),
    githubURL: v.optional(v.string()),
    languages: v.optional(v.array(v.string()))
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});