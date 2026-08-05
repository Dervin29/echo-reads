'use client';

import { Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
    return (
        <div className="loading-wrapper">
            <div className="loading-shadow-wrapper">
                <div className="loading-shadow">
                    <div className="relative">
                        <span className="absolute inset-0 rounded-full bg-brand/20 animate-ring-pulse" />
                        <Loader2 className="loading-animation relative size-12 text-brand" />
                    </div>
                    <h2 className="loading-title">Synthesizing Your Book</h2>
                    <p className="max-w-xs text-center text-ink-mute">
                        Please wait while we process your PDF and prepare your interactive literary experience.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
