import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("member"), v.literal("user"))),
    onboardingCompleted: v.optional(v.boolean()),
  }).index("email", ["email"]),

  tasks: defineTable({
    text: v.string(),
    completed: v.boolean(),
    userId: v.string(),
    createdAt: v.number(),
    category: v.optional(v.string()),
  }).index("by_user", ["userId"]).index("by_category", ["category"]),
});