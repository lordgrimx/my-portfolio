import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    projects: defineTable({
        title: v.string(),
        description: v.string(),
        imageURL: v.optional(v.string()),
        demoURL: v.string(),
        githubURL: v.string(),
        languages:v.array(v.string())
    }),
    about: defineTable({
        name: v.string(),
        title: v.string(), // ör: "Fullstack Developer"
        summary: v.string(),
        profileImageURL: v.string(),
        resumeURL: v.optional(v.string()),
        location: v.optional(v.string()),
        availability: v.optional(v.string()),
        repoCount: v.optional(v.number()), // GitHub'daki repo sayısı
    }),
    skills: defineTable({
        name: v.string(),
        category: v.string(), // ör: "Frontend", "Backend", "DevOps"
        level: v.number(), // 1-10 arası
        icon: v.optional(v.string())
    }),
    experiences: defineTable({
        company: v.string(),
        position: v.string(),
        startDate: v.string(), // veya v.number() timestamp olarak
        endDate: v.optional(v.string()), // Şu anda çalışıyorsanız null
        description: v.string(),
        logoURL: v.optional(v.string()),
        location: v.optional(v.string()),
        technologies: v.array(v.string())
    }),
    education: defineTable({
        institution: v.string(),
        degree: v.string(),
        fieldOfStudy: v.string(),
        startDate: v.string(),
        endDate: v.optional(v.string()),
        description: v.optional(v.string()),
        logoURL: v.optional(v.string())
    }),
    contacts: defineTable({
        type: v.string(), // "email", "github", "linkedin" vs.
        value: v.string(),
        isPublic: v.boolean(),
        icon: v.optional(v.string())
    }),
    testimonials: defineTable({
        name: v.string(),
        position: v.string(),
        company: v.string(),
        text: v.string(),
        imageURL: v.optional(v.string()),
        rating: v.optional(v.number())
    })

});