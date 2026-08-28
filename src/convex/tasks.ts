import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

export const categories = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("tasks").collect();
    const cats = new Set<string>();
    for (const t of all) { if (t.category) cats.add(t.category); }
    return Array.from(cats).sort();
  },
});

export const create = mutation({
  args: { text: v.string(), category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      text: args.text,
      completed: false,
      userId: "local",
      createdAt: Date.now(),
      category: args.category || undefined,
    });
  },
});

export const toggle = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");
    await ctx.db.patch(args.id, { completed: !task.completed });
  },
});

export const update = mutation({
  args: { id: v.id("tasks"), text: v.string(), category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const patch: Record<string, unknown> = { text: args.text };
    if (args.category !== undefined) patch.category = args.category;
    await ctx.db.patch(args.id, patch);
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => { await ctx.db.delete(args.id); },
});

export const adminRemove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => { await ctx.db.delete(args.id); },
});