export type Day = {date:string, count:number};

export type Habit = {
    id: string;
    name: string;
    emoji: string;
    targetPerDay: number;
    description?: string;
    days: Day[];
};

export type Theme = {
    accent: "emerald" | "cyan" | "violet" | "amber" | "rose";
  background: "aurora" | "midnight" | "carbon";
  // computed helpers
  accentTextClass?: string;
  backgroundClass?: string;
  intensityClass?: (count: number) => string;
}

export function isoToday() {
    return new Date().toISOString().slice(0,10);
}

export function seedDefaultHabits(): Habit[] {
    return [
        {
            id: "h1",
            name:"Workout",
            emoji:"💪",
            targetPerDay:1,
            description:"Complete at least one workout session",
            days:[]
        },
        {
            id: "h2",
            name:"Deep Work",
            emoji:"🧠",
            targetPerDay:4,
            description:"Focus on deep work for at least 4 pomodoros",
            days:[],
        } ,
        {
            id: "h3",
            name:"Reading",
            emoji:"📚",
            targetPerDay:1,
            description:"Read for at least 15 minutes",
            days:[],
        } ,
        {
            id: "h4",
            name:"Drinking Water",
            emoji:"💧",
            targetPerDay:4,
            description:"Drink at least 4 bottles of water",
            days:[],
        },
        {
            id: "h5",
            name:"Eating Healthy",
            emoji:"🥗",
            targetPerDay:3,
            description:"Try to eat 3 healthy meals",
            days:[],
        }
    ];
}

export function resolveTheme(theme: Theme): Theme {
    const accentText = 
        theme.accent === "emerald" ? "text-emerald-500" :
        theme.accent === "cyan" ? "text-cyan-500" :
        theme.accent === "violet" ? "text-violet-500" :
        theme.accent === "amber" ? "text-amber-500" :
        theme.accent === "rose" ? "text-rose-500" :
        "text-rose-300";

    const bg = 
        theme.background === "aurora" ? "bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50" :theme.background === "aurora"
      ? "bg-[radial-gradient(1000px_600px_at_20%_-10%,rgba(16,185,129,0.30),transparent_60%),radial-gradient(900px_500px_at_100%_0%,rgba(139,92,246,0.25),transparent_55%),radial-gradient(900px_500px_at_60%_110%,rgba(6,182,212,0.18),transparent_55%),linear-gradient(to_bottom,rgba(9,9,11,1),rgba(9,9,11,1))]"
      : theme.background === "midnight"
      ? "bg-[radial-gradient(800px_520px_at_20%_0%,rgba(56,189,248,0.20),transparent_55%),radial-gradient(900px_520px_at_100%_20%,rgba(99,102,241,0.18),transparent_55%),linear-gradient(to_bottom,rgba(9,9,11,1),rgba(9,9,11,1))]"
      : "bg-[linear-gradient(to_bottom,rgba(9,9,11,1),rgba(9,9,11,1))]";
    
      const intensity = (count: number) => {
        // 0 is always muted
        if (count === 0) return "bg-white/[0.04]";
        if (theme.accent === "emerald") {
        if (count === 1) return "bg-emerald-950/80";
        if (count === 2) return "bg-emerald-800/80";
        if (count === 3) return "bg-emerald-600/80";
        return "bg-emerald-300/90";
        }
        if (theme.accent === "cyan") {
        if (count === 1) return "bg-cyan-950/80";
        if (count === 2) return "bg-cyan-800/80";
        if (count === 3) return "bg-cyan-600/80";
        return "bg-cyan-300/90";
        }
        if (theme.accent === "violet") {
        if (count === 1) return "bg-violet-950/80";
        if (count === 2) return "bg-violet-800/80";
        if (count === 3) return "bg-violet-600/80";
        return "bg-violet-300/90";
        }
        if (theme.accent === "amber") {
        if (count === 1) return "bg-amber-950/80";
        if (count === 2) return "bg-amber-800/80";
        if (count === 3) return "bg-amber-600/80";
        return "bg-amber-300/90";
        }
        // rose
        if (count === 1) return "bg-rose-950/80";
        if (count === 2) return "bg-rose-800/80";
        if (count === 3) return "bg-rose-600/80";
        return "bg-rose-300/90";
    };

    return {
        ...theme,
        accentTextClass: accentText,
        backgroundClass: bg,
        intensityClass: intensity,
    };
}

export function loadState(): any | null {
    try {
        const raw = localStorage.getItem("daibit-state");
        if (!raw) return null;
        const parsed = JSON.parse(raw);

        parsed.theme = resolveTheme(parsed.theme);
        return parsed;
    } catch {
        return null;
    }
}

export function saveState(state: any) {
    try {
        const clean = {
            ...state,
            theme: { accent: state.theme.accent, background: state.theme.background },
        };
        localStorage.setItem("daibit-state", JSON.stringify(clean));
    } catch {
        // ignore write errors
    }
}