"use client";
import { useState, useEffect } from "react";

interface CountdownTimerProps {
    /** Data alvo em formato ISO: "2026-04-22" */
    targetDate: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculate(target: Date): TimeLeft {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const target = new Date(targetDate + "T00:00:00");
    const [time, setTime] = useState<TimeLeft>(calculate(target));
    const [started, setStarted] = useState(false);

    useEffect(() => {
        setStarted(true);
        const id = setInterval(() => setTime(calculate(target)), 1000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetDate]);

    // Se a feira já passou ou não iniciou no server, não exibe nada até hidratar
    if (!started || (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0)) {
        return null;
    }

    const pad = (n: number) => String(n).padStart(2, "0");

    const units = [
        { label: "Days", value: time.days },
        { label: "Hours", value: time.hours },
        { label: "Min", value: time.minutes },
        { label: "Sec", value: time.seconds },
    ];

    return (
        <div className="flex flex-col items-center gap-3 mt-2">
            <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase">
                Fair starts in
            </p>
            <div className="flex items-center gap-3">
                {units.map((u, i) => (
                    <div key={u.label} className="flex items-center gap-3">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl md:text-3xl font-black text-white tabular-nums leading-none">
                                {pad(u.value)}
                            </span>
                            <span className="text-[10px] font-medium text-slate-500 tracking-widest uppercase mt-1">
                                {u.label}
                            </span>
                        </div>
                        {i < units.length - 1 && (
                            <span className="text-slate-600 text-xl font-black leading-none -mt-3">:</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}