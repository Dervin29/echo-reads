'use server';

import VoiceSession from "@/database/models/book-session.model";
import VoiceSessionCounter from "@/database/models/voice-session-counter.model";
import {connectToDatabase} from "@/database/mongoose";

type StartSessionResult = {
    success: boolean;
    sessionId?: string;
    maxDurationMinutes?: number;
    error?: string;
    isBillingError?: boolean;
};

type EndSessionResult = {
    success: boolean;
    error?: string;
};

export const startVoiceSession = async (_clerkId: string, bookId: string): Promise<StartSessionResult> => {
    try {
        await connectToDatabase();

        const { auth } = await import("@clerk/nextjs/server");
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized. Please sign in to start a session." };
        }

        const { getUserPlan } = await import("@/lib/subscription.server");
        const { PLAN_LIMITS, getCurrentBillingPeriodStart } = await import("@/lib/subscription-constants");

        const plan = await getUserPlan();
        const limits = PLAN_LIMITS[plan];
        const billingPeriodStart = getCurrentBillingPeriodStart();

        // Atomic counter increment with limit enforcement
        const counter = await VoiceSessionCounter.findOneAndUpdate(
            { clerkId: userId, billingPeriodStart },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
        );

        if (counter.count > limits.maxSessionsPerMonth) {
            // Rollback the counter
            await VoiceSessionCounter.findOneAndUpdate(
                { clerkId: userId, billingPeriodStart },
                { $inc: { count: -1 } }
            );

            const { revalidatePath } = await import("next/cache");
            revalidatePath("/");

            return {
                success: false,
                error: `You have reached the monthly session limit for your ${plan} plan (${limits.maxSessionsPerMonth}). Please upgrade for more sessions.`,
                isBillingError: true,
            };
        }

        const session = await VoiceSession.create({
            clerkId: userId,
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

export const endVoiceSession = async (sessionId: string, ownerId: string, durationSeconds: number): Promise<EndSessionResult> => {
    try {
        await connectToDatabase();

        const validatedDuration = Number(durationSeconds);
        if (!Number.isFinite(validatedDuration) || validatedDuration < 0 || validatedDuration > 86400) {
            return { success: false, error: 'Invalid session duration.' };
        }

        const result = await VoiceSession.findOneAndUpdate(
            { _id: sessionId, clerkId: ownerId },
            { endedAt: new Date(), durationSeconds: Math.floor(validatedDuration) },
            { new: true }
        );

        if (!result) {
            return { success: false, error: 'Unauthorized or session not found.' };
        }

        return { success: true };
    } catch (e) {
        console.error('Error ending voice session', e);
        return { success: false, error: 'Failed to end voice session. Please try again later.' }
    }
}
