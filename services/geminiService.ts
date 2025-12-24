
import { GoogleGenAI, Type } from "@google/genai";
import { DeviceType, DiagnosticSolution } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeProblem = async (
  device: DeviceType, 
  description: string, 
  media?: { data: string, mimeType: string }
): Promise<DiagnosticSolution[]> => {
  try {
    const prompt = `Korisnik ima problem sa uređajem: ${device}. Opis problema: ${description}. 
    ${media ? "Korisnik je priložio i vizuelni dokaz (sliku/video) problema." : ""}
    Generiši listu od 3 moguća rešenja ili koraka za dijagnostiku na srpskom jeziku.`;

    const contents = media 
      ? { parts: [{ text: prompt }, { inlineData: media }] }
      : prompt;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'Kratak naslov rešenja' },
              description: { type: Type.STRING, description: 'Detaljno objašnjenje' },
              difficulty: { type: Type.STRING, enum: ['Lako', 'Srednje', 'Teško'] },
              steps: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: 'Koraci za izvođenje'
              }
            },
            required: ['title', 'description', 'difficulty', 'steps']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [{
      title: "Greška u analizi",
      description: "Trenutno nismo u mogućnosti da obradimo vaš zahtev putem AI asistenta. Molimo vas da nas kontaktirate direktno.",
      difficulty: "Teško",
      steps: ["Pozovite naš servis na +381 11 123 4567"]
    }];
  }
};
