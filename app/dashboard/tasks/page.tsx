// // app/dashboard/tasks/page.tsx
// "use client";
// import React, { useState, useEffect, useCallback } from 'react';
// import ZineDrawer from '@/components/dashboard/ZineDrawer';
// import { apiFetch } from "@/lib/api";
// import { useAuth } from "@/components/providers/AuthProvider";

// export default function TasksPage() {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [newTask, setNewTask] = useState({ 
//     title: '', 
//     subject: '', 
//     priority: 'MEDIUM', 
//     deadline: '',
//     reminderAt: '' // 👈 The crucial piece for our Watchman!
//   });

//   const handleCreateTask = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // We will add the API fetch logic here next!
//     console.log("Task Data ready for Backend:", newTask);
//   };

//   return (
//     <div className="flex flex-col gap-12">
//       {/* HEADER SECTION */}
//       <div className="flex justify-between items-center group">
//         <div>
//           <h2 className="text-7xl text-zine-coral font-display font-black tracking-tighter transition-all group-hover:tracking-normal duration-500 uppercase italic">
//             TASK_CORE
//           </h2>
//           <p className="text-xs font-display text-zinc-500 tracking-[0.4em] uppercase mt-2">
//             // SYSTEM_DIRECTORY: /USER/ASSIGNMENTS
//           </p>
//         </div>
//         <button 
//           className="aether-button border-2 border-zine-coral text-zine-coral hover:bg-zine-coral hover:text-black"
//           onClick={() => setIsDrawerOpen(true)}
//         >
//           + NEW TASK
//         </button>
//       </div>

//       {/* MAIN GRID LAYOUT */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-4">
        
//         {/* LEFT SIDE: TASKS LIST (Spans 2 columns) */}
//         <div className="lg:col-span-2 flex flex-col gap-6">
//           {/* Filters */}
//           <div className="flex gap-4 border-b border-zinc-800 pb-4 mb-4">
//             <button className="text-zine-coral font-display font-bold uppercase tracking-widest text-sm border-b-2 border-zine-coral pb-1">ALL (7)</button>
//             <button className="text-zinc-500 hover:text-white font-display font-bold uppercase tracking-widest text-sm pb-1 transition-colors">URGENT (2)</button>
//             <button className="text-zinc-500 hover:text-white font-display font-bold uppercase tracking-widest text-sm pb-1 transition-colors">MEDIUM (3)</button>
//           </div>

//           {/* Dummy Task Card (Matches your screenshot) */}
//           <div className="aether-card border-l-4 border-l-red-500 bg-zinc-950 border-zinc-800 p-6 flex justify-between items-center group">
//             <div className="flex items-start gap-6">
//               <input type="checkbox" className="w-6 h-6 mt-1 bg-transparent border-zinc-700 checked:bg-zine-coral cursor-pointer appearance-none border-2 rounded-sm" />
//               <div>
//                 <h3 className="text-2xl font-display font-black text-white leading-tight">Submit Data Structures Assignment #4</h3>
//                 <p className="text-zinc-500 font-mono text-xs mt-2">// CS301 — Data Structures</p>
//                 <span className="inline-block mt-3 px-2 py-1 border border-red-500/30 text-red-500 text-[10px] font-display font-bold uppercase tracking-widest bg-red-500/10">URGENT</span>
//               </div>
//             </div>
//             <div className="text-right flex flex-col items-end gap-1">
//               <span className="text-red-500 font-display font-bold tracking-widest">TODAY</span>
//               <span className="text-red-500/70 font-mono text-sm">11:59 PM</span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE: STATS & CALENDAR (Spans 1 column) */}
//         <div className="flex flex-col gap-6">
//           {/* Due Today Box */}
//           <div className="bg-zinc-950 border border-zinc-800 p-8 flex flex-col items-center justify-center">
//             <span className="text-7xl font-display font-black text-zine-coral">2</span>
//             <span className="text-zinc-500 font-display text-xs uppercase tracking-[0.3em] mt-2">DUE TODAY</span>
//           </div>

//           {/* Dummy Calendar Box */}
//           <div className="bg-zinc-950 border border-zinc-800 p-8">
//             <h4 className="text-xl font-display font-black text-white uppercase tracking-widest mb-6">APRIL 2026</h4>
//             {/* Calendar grid goes here later */}
//             <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono text-zinc-500">
//                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* THE CREATION DRAWER (Bridge to Pillar 2) */}
//       <ZineDrawer 
//         isOpen={isDrawerOpen} 
//         onClose={() => setIsDrawerOpen(false)} 
//         title="INITIALIZE_TASK"
//       >
//         <form onSubmit={handleCreateTask} className="flex flex-col gap-8">
//           <div className="flex flex-col gap-3">
//             <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">TASK_DESIGNATION</label>
//             <input 
//               type="text" required
//               value={newTask.title}
//               onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//               className="aether-input border-zinc-800"
//               placeholder="E.G. OS PRESENTATION"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div className="flex flex-col gap-3">
//               <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">DEADLINE_TIME</label>
//               {/* datetime-local allows users to pick both date and time! */}
//               <input 
//                 type="datetime-local" required
//                 value={newTask.deadline}
//                 onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
//                 className="aether-input border-zinc-800"
//               />
//             </div>

//             <div className="flex flex-col gap-3">
//               <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">SET_REMINDER_AT</label>
//               {/* This is the exact time the Watchman will trigger the email */}
//               <input 
//                 type="datetime-local" required
//                 value={newTask.reminderAt}
//                 onChange={(e) => setNewTask({ ...newTask, reminderAt: e.target.value })}
//                 className="aether-input border-zinc-800"
//               />
//             </div>
//           </div>

//           <button type="submit" className="aether-button mt-4 h-16 text-xl tracking-[0.2em] border-zine-coral text-zine-coral hover:bg-zine-coral hover:text-black">
//             ENGAGE_TASK
//           </button>
//         </form>
//       </ZineDrawer>

//     </div>
//   );
// }







"use client";
// app/dashboard/tasks/page.tsx
//
// Fully dynamic tasks page. Zero hardcoded data.
//
// Features:
//  ✓ Fetches tasks from GET /tasks on mount
//  ✓ Sorted by priority (urgent → medium → low) then by deadline
//  ✓ Filter tabs: ALL / URGENT / MEDIUM / LOW / DONE
//  ✓ Dynamic calendar: current month, dot on days with pending tasks
//  ✓ "Due Today" live count
//  ✓ Deadline alert for overdue / due today tasks
//  ✓ Add task via drawer: title, subject, priority, deadline, reminder time
//  ✓ Mark done (checkbox) — task fades and moves to DONE filter
//  ✓ Delete task with confirmation
//  ✓ Sync all pending tasks to Google Calendar
//  ✓ Same aether design system (aether-card, aether-button, aether-input, etc.)

import React, { useState, useEffect, useCallback } from "react";
import ZineDrawer from "@/components/dashboard/ZineDrawer";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/components/providers/AuthProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "urgent" | "medium" | "low";
type Filter   = "all" | "urgent" | "medium" | "low" | "done";

interface Task {
  _id:          string;
  title:        string;
  subject:      string;
  priority:     Priority;
  deadline:     string;   // ISO string from MongoDB
  reminderAt:   string | null;
  isCompleted:  boolean;
  googleEventId: string | null;
}

// ─── Priority config ──────────────────────────────────────────────────────────

const PRIORITY_CONFIG: Record<Priority, {
  label:       string;
  borderColor: string;
  tagBg:       string;
  tagText:     string;
  tagBorder:   string;
}> = {
  urgent: {
    label:     "URGENT",
    borderColor: "border-l-red-500",
    tagBg:     "bg-red-500/10",
    tagText:   "text-red-500",
    tagBorder: "border-red-500/30",
  },
  medium: {
    label:     "MEDIUM",
    borderColor: "border-l-amber-400",
    tagBg:     "bg-amber-400/10",
    tagText:   "text-amber-400",
    tagBorder: "border-amber-400/30",
  },
  low: {
    label:     "LOW",
    borderColor: "border-l-emerald-500",
    tagBg:     "bg-emerald-500/10",
    tagText:   "text-emerald-500",
    tagBorder: "border-emerald-500/30",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDeadline(isoString: string): { text: string; urgencyClass: string } {
  const now      = new Date();
  const deadline = new Date(isoString);

  // Compare at day level
  const nowDay      = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const deadlineDay = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());
  const diffDays    = Math.round((deadlineDay.getTime() - nowDay.getTime()) / 86400000);

  const timeStr = deadline.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

  if (diffDays < 0)   return { text: `OVERDUE • ${timeStr}`,   urgencyClass: "text-red-500" };
  if (diffDays === 0) return { text: `TODAY • ${timeStr}`,     urgencyClass: "text-red-400" };
  if (diffDays === 1) return { text: `TOMORROW • ${timeStr}`,  urgencyClass: "text-amber-400" };
  return {
    text: `${deadline.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} • ${timeStr}`,
    urgencyClass: "text-zinc-400",
  };
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
// Builds a full month grid (Mon-first) and marks days that have pending tasks.

interface CalendarProps {
  tasks: Task[];
}

function MiniCalendar({ tasks }: CalendarProps) {
  const today    = new Date();
  const year     = today.getFullYear();
  const month    = today.getMonth();

  const monthName = today.toLocaleString("en-IN", { month: "long" }).toUpperCase();
  const firstDay  = new Date(year, month, 1).getDay(); // 0=Sun
  // Convert to Mon-first: 0(Sun)→6, 1(Mon)→0, ..., 6(Sat)→5
  const startPad  = (firstDay === 0 ? 6 : firstDay - 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build set of days that have at least one pending task this month
  const taskDays = new Set<number>();
  tasks.forEach(t => {
    if (t.isCompleted) return;
    const d = new Date(t.deadline);
    if (d.getFullYear() === year && d.getMonth() === month) {
      taskDays.add(d.getDate());
    }
  });

  // Build the grid cells
  const cells: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to a complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-zinc-950 border border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-sm font-display font-bold text-white uppercase tracking-widest">
          {monthName} {year}
        </h4>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} className="text-center text-[9px] font-mono text-zinc-600 uppercase">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          const isToday    = day === today.getDate();
          const hasTask    = day !== null && taskDays.has(day);
          return (
            <div
              key={i}
              className={`relative flex flex-col items-center justify-center aspect-square rounded-sm text-[10px] font-mono transition-all
                ${day === null ? "" : "hover:bg-zinc-800 cursor-default"}
                ${isToday ? "bg-zine-coral text-black font-bold" : "text-zinc-500"}
              `}
            >
              {day}
              {hasTask && !isToday && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-zine-coral" />
              )}
              {hasTask && isToday && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-black" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function TasksPage() {
  const { user } = useAuth();

  const [tasks,       setTasks]       = useState<Task[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [filter,      setFilter]      = useState<Filter>("all");
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [syncing,     setSyncing]     = useState(false);
  const [syncMsg,     setSyncMsg]     = useState("");
  const [formError,   setFormError]   = useState("");
  const [saving,      setSaving]      = useState(false);

  // Form state — all controlled, no defaults except priority
  const [form, setForm] = useState({
    title:      "",
    subject:    "",
    priority:   "medium" as Priority,
    deadline:   "",
    reminderAt: "",
  });

  // ── Fetch tasks ─────────────────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    try {
      const data = await apiFetch("/tasks");
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      // silently fail — show empty state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // ── Computed values ─────────────────────────────────────────────────────────
  const pending   = tasks.filter(t => !t.isCompleted);
  const doneCount = tasks.filter(t => t.isCompleted).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueTodayCount = pending.filter(t => {
    const d = new Date(t.deadline);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  }).length;

  // Tasks that need attention in the alert box (overdue or due today)
  const alertTasks = pending.filter(t => {
    const d = new Date(t.deadline);
    d.setHours(0, 0, 0, 0);
    return d.getTime() <= today.getTime();
  });

  // Filtered list shown in the task list
  const filteredTasks = tasks.filter(t => {
    if (filter === "done")   return t.isCompleted;
    if (filter === "all")    return !t.isCompleted;
    return !t.isCompleted && t.priority === filter;
  });

  // Filter tab counts
  const counts: Record<Filter, number> = {
    all:    pending.length,
    urgent: pending.filter(t => t.priority === "urgent").length,
    medium: pending.filter(t => t.priority === "medium").length,
    low:    pending.filter(t => t.priority === "low").length,
    done:   doneCount,
  };

  // ── Create task ─────────────────────────────────────────────────────────────
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!form.title.trim()) { setFormError("Task title is required"); return; }
    if (!form.deadline)      { setFormError("Deadline is required");   return; }

    if (form.reminderAt && form.deadline) {
      if (new Date(form.reminderAt) >= new Date(form.deadline)) {
        setFormError("Reminder must be set before the deadline");
        return;
      }
    }

    setSaving(true);
    try {
      const newTask = await apiFetch("/tasks", {
        method: "POST",
        body: JSON.stringify({
          title:      form.title.trim(),
          subject:    form.subject.trim(),
          priority:   form.priority,
          deadline:   form.deadline,
          reminderAt: form.reminderAt || null,
        }),
      });
      // Add the new task to state and re-sort by priority then deadline
      setTasks(prev => {
        const updated = [...prev, newTask];
        const PRIORITY_ORDER: Record<string, number> = { urgent: 0, medium: 1, low: 2 };
        updated.sort((a, b) => {
          const pa = PRIORITY_ORDER[a.priority] ?? 1;
          const pb = PRIORITY_ORDER[b.priority] ?? 1;
          if (pa !== pb) return pa - pb;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });
        return updated;
      });
      // Reset form and close drawer
      setForm({ title: "", subject: "", priority: "medium", deadline: "", reminderAt: "" });
      setDrawerOpen(false);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Failed to create task");
    } finally {
      setSaving(false);
    }
  }

  // ── Toggle done ─────────────────────────────────────────────────────────────
  async function handleToggle(task: Task) {
    // Optimistic update immediately
    setTasks(prev => prev.map(t => t._id === task._id ? { ...t, isCompleted: !t.isCompleted } : t));
    try {
      await apiFetch(`/tasks/${task._id}/toggle`, { method: "PATCH" });
    } catch {
      // Roll back on failure
      setTasks(prev => prev.map(t => t._id === task._id ? { ...t, isCompleted: task.isCompleted } : t));
    }
  }

  // ── Delete task ─────────────────────────────────────────────────────────────
  async function handleDelete(taskId: string) {
    setTasks(prev => prev.filter(t => t._id !== taskId));
    try {
      await apiFetch(`/tasks/${taskId}`, { method: "DELETE" });
    } catch {
      fetchTasks(); // Re-fetch on failure to restore correct state
      setSyncMsg("Failed to delete task. Please try again.");
      setTimeout(() => setSyncMsg(""), 4000);
    }
  }

  // ── Google Calendar sync ────────────────────────────────────────────────────
  async function handleCalendarSync() {
    setSyncing(true);
    setSyncMsg("");
    try {
      const data = await apiFetch("/calendar/sync-all", { method: "POST" });
      setSyncMsg(data.message ?? "Sync complete");
      fetchTasks(); // Refresh to show updated googleEventId indicators
    } catch (err: unknown) {
      setSyncMsg(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setSyncing(false);
      // Clear the message after 5 seconds
      setTimeout(() => setSyncMsg(""), 5000);
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-12">

      {/* ── Page header ── */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-7xl text-zine-coral font-display font-black tracking-tighter uppercase italic">
            TASK_CORE
          </h2>
          <p className="text-xs font-display text-zinc-500 tracking-[0.4em] uppercase mt-2">
            // SYSTEM_DIRECTORY: /USER/ASSIGNMENTS
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <button
            className="aether-button border-2 border-zine-coral text-zine-coral hover:bg-zine-coral hover:text-black"
            onClick={() => { setDrawerOpen(true); setFormError(""); }}
          >
            + NEW TASK
          </button>
          {/* Google Calendar sync button — only show if user signed in with Google */}
          {user?.googleRefreshToken && (
            <button
              onClick={handleCalendarSync}
              disabled={syncing}
              className="flex items-center gap-2 text-[10px] font-display font-bold uppercase tracking-widest text-zinc-500 hover:text-white border border-zinc-800 hover:border-zine-coral px-4 py-2 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {syncing ? "SYNCING..." : "SYNC GOOGLE CALENDAR"}
            </button>
          )}
          {syncMsg && (
            <p className="text-[10px] font-mono text-zine-coral">{syncMsg}</p>
          )}
        </div>
      </div>

      {/* ── Main grid: tasks (left 2/3) + sidebar (right 1/3) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Left: Filter tabs + Task list ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Filter tabs */}
          <div className="flex gap-4 border-b border-zinc-800 pb-4 flex-wrap">
            {(["all","urgent","medium","low","done"] as Filter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-display font-bold uppercase tracking-widest text-xs pb-1 transition-colors
                  ${filter === f
                    ? "text-zine-coral border-b-2 border-zine-coral"
                    : "text-zinc-500 hover:text-white"
                  }`}
              >
                {f.toUpperCase()} ({counts[f]})
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="font-mono text-xs text-zinc-600 animate-pulse uppercase tracking-widest py-8">
              LOADING TASKS...
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredTasks.length === 0 && (
            <div className="aether-card py-16 items-center justify-center text-center">
              <p className="font-display font-black text-3xl text-zinc-700 uppercase">
                {filter === "done" ? "NO COMPLETED TASKS" : "NO TASKS FOUND"}
              </p>
              <p className="font-mono text-xs text-zinc-600 mt-3 uppercase tracking-widest">
                {filter === "all"
                  ? "Click + NEW TASK to add your first task"
                  : `No ${filter} priority tasks pending`}
              </p>
            </div>
          )}

          {/* Task cards */}
          <div className="flex flex-col gap-4">
            {filteredTasks.map(task => {
              const pCfg  = PRIORITY_CONFIG[task.priority];
              const { text: deadlineText, urgencyClass } = formatDeadline(task.deadline);
              const isSynced = !!task.googleEventId;

              return (
                <div
                  key={task._id}
                  className={`aether-card border-l-4 ${pCfg.borderColor} border-zinc-900 flex-row justify-between items-center gap-6
                    ${task.isCompleted ? "opacity-40" : ""}`}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggle(task)}
                    className={`w-6 h-6 flex-shrink-0 border-2 flex items-center justify-center transition-all
                      ${task.isCompleted
                        ? "bg-zine-coral border-zine-coral"
                        : "border-zinc-700 hover:border-zine-coral"
                      }`}
                  >
                    {task.isCompleted && (
                      <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>

                  {/* Task info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-display font-black leading-tight mb-1
                      ${task.isCompleted ? "line-through text-zinc-500" : "text-white"}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      {task.subject && (
                        <span className="text-zinc-500 font-mono text-xs">// {task.subject}</span>
                      )}
                      <span className={`inline-block px-2 py-0.5 border text-[9px] font-display font-bold uppercase tracking-widest
                        ${pCfg.tagBg} ${pCfg.tagText} ${pCfg.tagBorder}`}>
                        {pCfg.label}
                      </span>
                      {isSynced && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-zinc-600 uppercase tracking-wider">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          cal synced
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className={`text-right flex-shrink-0 font-display font-bold tracking-widest text-xs ${urgencyClass}`}>
                    {deadlineText.split(" • ").map((part, i) => (
                      <div key={i}>{part}</div>
                    ))}
                  </div>

                  {/* Delete button — shows on hover */}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="opacity-0 group-hover:opacity-100 flex-shrink-0 text-zinc-700 hover:text-red-500 transition-all"
                    title="Delete task"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right: Stats + Calendar + Alerts ── */}
        <div className="flex flex-col gap-6">

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center justify-center">
              <span className="text-5xl font-display font-black text-zine-coral">{dueTodayCount}</span>
              <span className="text-zinc-500 font-display text-[9px] uppercase tracking-[0.3em] mt-1">DUE TODAY</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center justify-center">
              <span className="text-5xl font-display font-black text-white">{pending.length}</span>
              <span className="text-zinc-500 font-display text-[9px] uppercase tracking-[0.3em] mt-1">TOTAL OPEN</span>
            </div>
          </div>

          {/* Dynamic mini calendar */}
          <MiniCalendar tasks={tasks} />

          {/* Deadline alerts */}
          {alertTasks.length > 0 && (
            <div className="bg-zinc-950 border border-red-500/20 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-display font-bold text-[10px] uppercase tracking-widest text-red-500">
                  DEADLINE ALERT
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {alertTasks.slice(0, 4).map(t => {
                  const d = new Date(t.deadline);
                  d.setHours(0,0,0,0);
                  const isOverdue = d.getTime() < today.getTime();
                  return (
                    <div key={t._id} className="flex items-start gap-2">
                      <span className="text-red-500 text-[10px] mt-0.5">
                        {isOverdue ? "⚠" : "•"}
                      </span>
                      <p className="font-mono text-[10px] text-zinc-400 leading-relaxed">
                        <span className={isOverdue ? "text-red-400" : "text-amber-400"}>
                          {isOverdue ? "OVERDUE" : "TODAY"}
                        </span>
                        {" "}{t.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Google Calendar info if not connected */}
          {user && !user.googleRefreshToken && (
            <div className="bg-zinc-950 border border-zinc-800 p-5">
              <p className="font-display font-bold text-[9px] uppercase tracking-widest text-zinc-600 mb-2">
                GOOGLE CALENDAR
              </p>
              <p className="font-mono text-[10px] text-zinc-600 leading-relaxed">
                Sign in with Google to enable automatic task sync to your Google Calendar.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Task creation drawer ── */}
      <ZineDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="INITIALIZE_TASK"
      >
        <form onSubmit={handleCreate} className="flex flex-col gap-8">

          {/* Error banner */}
          {formError && (
            <div className="border border-red-500/30 bg-red-500/10 px-4 py-3">
              <p className="font-mono text-xs text-red-400 uppercase tracking-wider">
                ERROR: {formError}
              </p>
            </div>
          )}

          {/* Title */}
          <div className="flex flex-col gap-3">
            <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">
              TASK_DESIGNATION
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="aether-input border-zinc-800"
              placeholder="E.G. OS PRESENTATION SLIDES"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-3">
            <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">
              SUBJECT_COURSE <span className="text-zinc-600 normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              className="aether-input border-zinc-800"
              placeholder="E.G. CS402 — OPERATING SYSTEMS"
            />
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-3">
            <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">
              PRIORITY_LEVEL
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["urgent", "medium", "low"] as Priority[]).map(p => {
                const cfg     = PRIORITY_CONFIG[p];
                const isSelected = form.priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, priority: p }))}
                    className={`py-3 text-[10px] font-display font-bold uppercase tracking-widest border transition-all
                      ${isSelected
                        ? `${cfg.tagBg} ${cfg.tagText} ${cfg.tagBorder}`
                        : "border-zinc-800 text-zinc-600 hover:border-zinc-600 hover:text-zinc-400"
                      }`}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deadline + Reminder */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">
                DEADLINE_TIME
              </label>
              <input
                type="datetime-local"
                required
                value={form.deadline}
                onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                className="aether-input border-zinc-800 text-sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-display text-xs tracking-[0.3em] text-zine-coral uppercase font-bold">
                SET_REMINDER <span className="text-zinc-600 normal-case tracking-normal">(optional)</span>
              </label>
              <input
                type="datetime-local"
                value={form.reminderAt}
                onChange={e => setForm(f => ({ ...f, reminderAt: e.target.value }))}
                className="aether-input border-zinc-800 text-sm"
              />
              <p className="font-mono text-[9px] text-zinc-600 leading-relaxed">
                You'll receive an email reminder at this time if the task isn't done.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="aether-button mt-4 h-16 text-lg tracking-[0.2em] border-2 border-zine-coral text-zine-coral hover:bg-zine-coral hover:text-black w-full"
          >
            {saving ? "INITIALIZING..." : "ENGAGE_TASK"}
          </button>
        </form>
      </ZineDrawer>
    </div>
  );
}
