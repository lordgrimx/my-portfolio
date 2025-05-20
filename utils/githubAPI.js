"use client";

import axios from "axios";
import { useMutation } from "convex/react";

const GITHUB_API_URL = "https://api.github.com/users";
const GITHUB_USERNAME = "lordgrimx"; // Replace with your GitHub username
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN; // Replace with your GitHub token

export const fetchGitHubData = async (endpoint) => {
  try {
    console.log(`GitHub API isteği yapılıyor: ${GITHUB_API_URL}/${GITHUB_USERNAME}/${endpoint}`);
    
    // Token var mı kontrol edelim
    if (!GITHUB_TOKEN) {
      console.warn("GitHub token tanımlanmamış! Rate limit kısıtlamaları olabilir.");
    }
    
    const headers = GITHUB_TOKEN 
      ? { Authorization: `token ${GITHUB_TOKEN}` }
      : {};
    
    const response = await axios.get(`${GITHUB_API_URL}/${GITHUB_USERNAME}/${endpoint}`, { headers });
    
    console.log(`GitHub API yanıtı alındı, veri sayısı: ${Array.isArray(response.data) ? response.data.length : 1}`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching data from GitHub API:", error.response?.status, error.response?.data || error.message);
    throw error;
  }
}
export const fetchLanguages = async (repoName,link) => {
  try {
    const response = await axios.get(`${link}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const languages = Object.keys(response.data);
    return languages;
  }
  catch (error) {
    console.error("Error fetching languages from GitHub API:", error.response?.status, error.response?.data || error.message);
    throw error;
  }
}

export const saveGitHubDataToConvex = async (data) => {
  try {
    console.log("Convex'e veri kaydediliyor...");
    const result = await useMutation("createProject")({
      title: data.name,
      description: data.description,
      imageURL: data.imageURL,
      demoURL: data.demoURL,
      githubURL: data.githubURL,
      languages: data.languages,
    });
    console.log("Veri Convex'e başarıyla kaydedildi:", result);
  } catch (error) {
    console.error("Convex'e veri kaydedilirken hata:", error);
  }
}
