import { query, mutation } from "./_generated/server";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("users").collect();
    return all[0] || null;
  },
});

export const completeOnboarding = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("users").collect();
    if (all[0]) await ctx.db.patch(all[0]._id, { onboardingCompleted: true });
  },
});