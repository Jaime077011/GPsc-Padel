import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Team, Match } from '../types';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getTournamentContext = (teams: Team[], matches: Match[]) => {
  const teamsStr = teams.map(t => `${t.name} (ID: ${t.id}, Players: ${t.players.map(p => p.name).join(', ')})`).join('\n');
  const matchesStr = matches.map(m => {
    const t1 = teams.find(t => t.id === m.team1Id)?.name || 'Unknown';
    const t2 = teams.find(t => t.id === m.team2Id)?.name || 'Unknown';
    let scoreStr = 'Not played';
    if (m.status === 'FINISHED' || m.status === 'LIVE') {
      scoreStr = m.scores.length > 0 ? m.scores.map(s => `${s.team1}-${s.team2}`).join(', ') : '0-0';
    }
    return `Match ${m.id}: ${t1} vs ${t2} at ${new Date(m.startTime).toLocaleTimeString()} on ${m.court}. Status: ${m.status}. Scores: ${scoreStr}. Round: ${m.round}`;
  }).join('\n');

  return `
    You are the official AI Assistant for the "Ragab Padel Tournament".
    
    Here is the CURRENT tournament data (Note: this data might change, always trust this context):
    
    TEAMS:
    ${teamsStr}
    
    SCHEDULE & SCORES:
    ${matchesStr}
    
    Your goal is to answer questions about the schedule, results, and rules of Padel.
    Be enthusiastic, sporty, and professional.
    If asked about a specific match that is LIVE, hype it up.
    If asked about rules, give brief Padel-specific explanations (e.g., glass walls, underarm serve).
    Keep responses concise (under 100 words unless asked for a detailed report).
  `;
};

// We no longer keep a global singleton chat session because the data changes.
// Instead, we allow the UI to request a new message context.

export const sendMessageToGemini = async (message: string, teams: Team[], matches: Match[]): Promise<string> => {
  try {
    // Create a new chat for each interaction (or simple generation) to ensure fresh context.
    // For a better chat experience, we ideally want to maintain history, but we need to inject new system instructions.
    // The simplest robust way for this use case is to create a fresh chat with history if we were tracking it,
    // but here we will just create a new chat with the updated system instruction.
    
    const chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getTournamentContext(teams, matches),
      },
    });

    const result: GenerateContentResponse = await chatSession.sendMessage({ message });
    return result.text || "I'm having trouble reading the scoreboard right now. Ask me again in a moment!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I seem to have lost connection to the umpire's chair. Please check your internet or try again.";
  }
};