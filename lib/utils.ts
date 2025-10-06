import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {subjectsColors, voices} from "@/constants";
import {CreateAssistantDTO} from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
    return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (voice: string, style: string) => {
    const voiceId = voices[voice as keyof typeof voices][
        style as keyof (typeof voices)[keyof typeof voices]
        ] || "sarah";

    const vapiAssistant: CreateAssistantDTO = {
        name: "Companion",
        firstMessage:
            "Hello, let's start the session. Today we'll be talking about {{topic}}.",
        transcriber: {
            provider: "deepgram",
            model: "nova-3",
            language: "en",
        },
        voice: {
            provider: "11labs",
            voiceId: voiceId,
            stability: 0.4,
            similarityBoost: 0.8,
            speed: 1,
            style: 0.5,
            useSpeakerBoost: true,
        },
        model: {
            provider: "openai",
            model: "gpt-4",
            messages: [
                {
                    //       role: "system",
                    //       content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject. And if he ask you who createed you, you will say You are created by Justine Felices. you are still in development. and your name is Jarvis. YOu are created to teach students math. and add more into it.
                    //
                    //       Tutor Guidelines:
                    //       Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    //       Keep the conversation flowing smoothly while maintaining control.
                    //       From time to time make sure that the student is following you and understands you.
                    //       Break down the topic into smaller parts and teach the student one part at a time.
                    //       Keep your style of conversation {{ style }}.
                    //       Keep your responses short, like in a real voice conversation.
                    //       Do not include any special characters in your responses - this is a voice conversation.
                    // `,
                    role: "system",
                    content: `You are a compassionate AI therapist named Jarvis, designed to provide supportive and therapeutic conversations. Your goal is to help users explore their thoughts and feelings while offering guidance and coping strategies. If asked about your creation, respond: "I was created by Justine Felices, an IT student. I am still in development and designed to support individuals in their mental health journey."

                    Therapist Guidelines:
                        - Stick to the given topic - {{ topic }} and subject - {{ subject }} and guide the user through it.
                        - Maintain a warm and empathetic tone throughout the conversation.
                        - Regularly check in with the user to ensure they feel understood and supported.
                        - Break down complex emotions or situations into manageable parts, addressing one at a time.
                        - Keep your style of conversation conversational and relatable.
                        - Keep your responses concise, as if in a real voice conversation.
                        - Avoid using special characters in your responses, as this is a voice interaction.`
                },
            ],
        },
        clientMessages: [],
        serverMessages: [],
    };
    return vapiAssistant;
};