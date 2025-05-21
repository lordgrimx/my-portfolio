import { v } from "convex/values";
import { query,mutation } from "./_generated/server";


export const login= query({
    args: {
        email: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        // Tablodaki ilk about kaydını al
        const userData = await ctx.db.query("user").first();
        
        if (userData) {
            if (userData.email === args.email && userData.password === args.password) {
                return { success: true, message: "Login successful" , user: userData };
            } else {
                return { success: false, message: "Invalid email or password" };
            }
        }
        return { success: false, message: "User not found" };
    },
    });