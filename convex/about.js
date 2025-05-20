import { v } from "convex/values";
import { query,mutation } from "./_generated/server";


export const getRepoCount = query({
  handler: async (ctx) => {
    // Tablodaki ilk about kaydını al
    const aboutData = await ctx.db.query("about").first();
    
    // Eğer kayıt varsa repoCount'u döndür, yoksa 0 döndür
    return aboutData?.repoCount || 0;
  },
});

export const updateRepoCount = mutation({
  args: {
    count: v.number(),
  },
  handler: async (ctx, args) => {
    // Tablodaki ilk about kaydını al
    const aboutData = await ctx.db.query("about").first();
    
    // Eğer kayıt varsa güncelle, yoksa yeni bir kayıt oluştur
    if (aboutData) {
      await ctx.db.patch(aboutData._id, { repoCount: args.count });
    } else {
      await ctx.db.insert("about", { repoCount: args.count });
    }
  },
});