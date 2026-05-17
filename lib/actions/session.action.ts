'use server';


import VoiceSession from "@/database/models/book-session.model";
import {connectToDatabase} from "@/database/mongoose";


'use server';

import { auth } from "`@clerk/nextjs/server`";
import VoiceSession from "`@/database/models/book-session.model`";
import {connectToDatabase} from "`@/database/mongoose`";

export const startVoiceSession = async (clerkId: string, bookId: string): Promise<StartSessionResult> => {
    try {
        await connectToDatabase();

        const { userId } = await auth();
        if (!userId || userId !== clerkId) {
            return { success: false, error: "Unauthorized request." };
        }

        // Limits/Plan to see whether a session is allowed.
        const { getUserPlan } = await import("`@/lib/subscription.server`");
        const { PLAN_LIMITS, getCurrentBillingPeriodStart } = await import("`@/lib/subscription-constants`");

        const plan = await getUserPlan();
        const limits = PLAN_LIMITS[plan];
        const billingPeriodStart = getCurrentBillingPeriodStart();

        const sessionCount = await VoiceSession.countDocuments({
            clerkId: userId,
            billingPeriodStart
        });

        if (sessionCount >= limits.maxSessionsPerMonth) {
            const { revalidatePath } = await import("next/cache");
            revalidatePath("/");

            return {
                success: false,
                error: `You have reached the monthly session limit for your ${plan} plan (${limits.maxSessionsPerMonth}). Please upgrade for more sessions.`,
                isBillingError: true,
            };
        }

        const session = await VoiceSession.create({
            clerkId,
            bookId,
            startedAt: new Date(),
            billingPeriodStart,
            durationSeconds: 0,
        });

        return {
            success: true,
            sessionId: session._id.toString(),
            maxDurationMinutes: limits.maxDurationPerSession,
        }
    } catch (e) {
        console.error('Error starting voice session', e);
        return { success: false, error: 'Failed to start voice session. Please try again later.' }
    }
}

export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {
    try {
        await connectToDatabase();

        const result = await VoiceSession.findByIdAndUpdate(sessionId, {
            endedAt: new Date(),
            durationSeconds,
        });

        if(!result) return { success: false, error: 'Voice session not found.' }

        return { success: true }
    } catch (e) {
        console.error('Error ending voice session', e);
        return { success: false, error: 'Failed to end voice session. Please try again later.' }
    }
}
