"use client";

import { useState, useCallback, useEffect, useMemo, useRef, type CSSProperties } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path) => `${BASE_PATH}${path}`;

/* ─── App Shortcut Data ─────────────────────────────── */
const dockShortcuts = [
  {
    id: "phasor",
    label: "Phasor",
    icon: withBasePath("/icons/phasor.png"),
    type: "link",
    url: "https://phasor.so",
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: "terminal",
    type: "window",
  },
  {
    id: "notes",
    label: "Notes",
    icon: withBasePath("/icons/macos-notes.svg"),
    type: "window",
  },
  {
    id: "settings",
    label: "Settings",
    icon: withBasePath("/icons/macos-settings.svg"),
    type: "window",
  },
  {
    id: "trash",
    label: "Trash",
    icon: withBasePath("/icons/macos-trash.svg"),
    type: "window",
  },
];

const desktopShortcuts = dockShortcuts.filter(
  (shortcut) => shortcut.id !== "settings" && shortcut.id !== "trash"
);

/* ─── SVG Icon Components ───────────────────────────── */
function IconSVG({ type, size = 22 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  switch (type) {
    case "terminal":
      return <svg {...props}><polyline points="4,17 10,11 4,5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>;
    case "notes":
      return <svg {...props}><rect x="5" y="3" width="14" height="18" rx="2" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="12" y2="16" /></svg>;
    case "settings":
      return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4,15a1.65,1.65,0,0,0,.33,1.82l.06.06a2,2,0,0,1-2.83,2.83l-.06-.06a1.65,1.65,0,0,0-1.82-.33,1.65,1.65,0,0,0-1,1.51V21a2,2,0,0,1-4,0v-.09A1.65,1.65,0,0,0,9,19.4a1.65,1.65,0,0,0-1.82.33l-.06.06a2,2,0,0,1-2.83-2.83l.06-.06A1.65,1.65,0,0,0,4.68,15a1.65,1.65,0,0,0-1.51-1H3a2,2,0,0,1,0-4h.09A1.65,1.65,0,0,0,4.6,9a1.65,1.65,0,0,0-.33-1.82l-.06-.06A2,2,0,0,1,7.05,4.29l.06.06A1.65,1.65,0,0,0,9,4.68,1.65,1.65,0,0,0,10,3.17V3a2,2,0,0,1,4,0v.09a1.65,1.65,0,0,0,1,1.51,1.65,1.65,0,0,0,1.82-.33l.06-.06a2,2,0,0,1,2.83,2.83l-.06.06A1.65,1.65,0,0,0,19.4,9a1.65,1.65,0,0,0,1.51,1H21a2,2,0,0,1,0,4h-.09A1.65,1.65,0,0,0,19.4,15Z" /></svg>;
    case "about":
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12,11 L12,16" /><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" /></svg>;
    case "trash":
      return <svg {...props}><path d="M4,6 L20,6" /><path d="M10,6 L10,4 L14,4 L14,6" /><path d="M6,6 L7,20 C7,21 7.9,21 8,21 L16,21 C16.1,21 17,21 17,20 L18,6" /></svg>;
    default:
      return null;
  }
}

/* ─── Start Menu Icons ──────────────────────────────── */
function MenuIcon({ type, size = 16 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  switch (type) {
    case "about":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12,16 L12,12" /><circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="none" /></svg>;
    case "settings":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.9" y1="4.9" x2="7" y2="7" />
          <line x1="17" y1="17" x2="19.1" y2="19.1" />
          <line x1="17" y1="7" x2="19.1" y2="4.9" />
          <line x1="4.9" y1="19.1" x2="7" y2="17" />
        </svg>
      );
    case "terminal":
      return <svg {...props}><polyline points="4,17 10,11 4,5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>;
    case "notes":
      return (
        <svg {...props}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="12" y2="16" />
        </svg>
      );
    case "folder":
      return <svg {...props}><path d="M22,19a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V5A2,2,0,0,1,4,3H9l2,3h9a2,2,0,0,1,2,2Z" /></svg>;
    case "globe":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12,2a15.3,15.3,0,0,1,4,10,15.3,15.3,0,0,1-4,10,15.3,15.3,0,0,1-4-10A15.3,15.3,0,0,1,12,2Z" /></svg>;
    case "restart":
      return (
        <svg {...props}>
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10" />
          <path d="M20.49 15a9 9 0 0 1-14.13 3.36L1 14" />
        </svg>
      );
    case "power":
      return <svg {...props}><path d="M18.36,6.64a9,9,0,1,1-12.73,0" /><line x1="12" y1="2" x2="12" y2="12" /></svg>;
    default:
      return null;
  }
}

/* ─── Window Content Components ─────────────────────── */
const TERMINAL_PROMPT = "siddhantsr@runtime ~ % ";
const TERMINAL_COMMANDS = [
  { name: "help", description: "Show all available commands" },
  { name: "clear", description: "Clear terminal output" },
  { name: "whoami", description: "Print current user" },
  { name: "pwd", description: "Show current directory" },
  { name: "ls", description: "List files in current directory" },
  { name: "date", description: "Show current date and time" },
  { name: "uname", description: "Show system information" },
  { name: "echo", description: "Print text (usage: echo <text>)" },
];
const NOTES_STORAGE_KEY = "runtime.notes.content.v1";
const SETTINGS_PANES = [
  {
    id: "appearance",
    label: "Appearance",
    summary: "Theme, accent, layout",
  },
  {
    id: "general",
    label: "General",
    summary: "Desktop and startup",
  },
  {
    id: "notifications",
    label: "Notifications",
    summary: "Alerts and focus",
  },
  {
    id: "privacy",
    label: "Privacy",
    summary: "Data and permissions",
  },
];
const SETTINGS_ACCENTS = [
  { id: "graphite", label: "Graphite", color: "#6a6f7a" },
  { id: "sky", label: "Sky", color: "#4b9cff" },
  { id: "mint", label: "Mint", color: "#25b99a" },
  { id: "amber", label: "Amber", color: "#ea9f2d" },
];
const ACCENT_THEMES = {
  graphite: {
    color: "#6a6f7a",
    rgb: "106, 111, 122",
    text: "#2f333b",
    sliderTrack: "rgba(176, 181, 192, 0.95)",
  },
  sky: {
    color: "#4b9cff",
    rgb: "75, 156, 255",
    text: "#14377d",
    sliderTrack: "rgba(176, 181, 192, 0.95)",
  },
  mint: {
    color: "#25b99a",
    rgb: "37, 185, 154",
    text: "#0f5b4c",
    sliderTrack: "rgba(176, 181, 192, 0.95)",
  },
  amber: {
    color: "#ea9f2d",
    rgb: "234, 159, 45",
    text: "#6b4209",
    sliderTrack: "rgba(176, 181, 192, 0.95)",
  },
};
const CALENDAR_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MENUBAR_MENUS = [
  {
    id: "file",
    label: "File",
    items: ["New Window", "Close Window"],
  },
  {
    id: "edit",
    label: "Edit",
    items: ["Undo", "Redo", "Paste"],
  },
  {
    id: "view",
    label: "View",
    items: ["Zoom In", "Zoom Out"],
  },
  {
    id: "help",
    label: "Help",
    items: ["View License", "Keyboard Shortcuts", "Contact Support"],
  },
];

function createInitialTerminalState() {
  return {
    entries: [
      { type: "output", text: "runtime shell initialized." },
      { type: "hint", text: "Type 'help' to see available commands." },
    ],
    input: "",
    history: [],
    historyIndex: -1,
  };
}

function createInitialSettingsState() {
  return {
    activePane: "appearance",
    appearance: {
      accent: "sky",
      dockSize: 76,
      glassAmount: 78,
      reduceMotion: false,
      compactDock: false,
    },
    general: {
      showDesktopIcons: true,
      reopenAppsOnLaunch: true,
      use24HourClock: false,
    },
    notifications: {
      enabled: true,
      focusMode: false,
      badges: true,
      sounds: true,
    },
    privacy: {
      shareCrashReports: true,
      analytics: false,
      locationServices: false,
    },
  };
}

function getCalendarCells(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = firstWeekday - 1; i >= 0; i -= 1) {
    cells.push({
      day: daysInPrevMonth - i,
      monthOffset: -1,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      monthOffset: 0,
    });
  }

  const remainingCells = 42 - cells.length;
  for (let day = 1; day <= remainingCells; day += 1) {
    cells.push({
      day,
      monthOffset: 1,
    });
  }

  return cells;
}

function executeTerminalCommand(input) {
  const [cmd, ...args] = input.split(/\s+/);
  const command = cmd.toLowerCase();

  switch (command) {
    case "help":
      return {
        lines: [
          "Available commands:",
          ...TERMINAL_COMMANDS.map(
            ({ name, description }) => `${name.padEnd(8, " ")} - ${description}`
          ),
        ],
      };
    case "clear":
      return { clear: true, lines: [] };
    case "whoami":
      return { lines: ["siddhantsr"] };
    case "pwd":
      return { lines: ["/Users/siddhantsr"] };
    case "ls":
      return { lines: ["Desktop  Documents  Downloads  Projects  notes.txt"] };
    case "date":
      return {
        lines: [
          new Date().toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),
        ],
      };
    case "uname":
      return { lines: ["runtimeOS 1.0.0 web x64"] };
    case "echo":
      return { lines: [args.join(" ")] };
    default:
      return {
        error: true,
        lines: [
          `command not found: ${cmd}`,
          "Type 'help' to see available commands.",
        ],
      };
  }
}

function TerminalContent({ terminalState, setTerminalState }) {
  const { entries, input } = terminalState;
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  const focusTerminalInput = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    const end = el.value.length;
    el.setSelectionRange(end, end);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [entries, input]);

  const runCommand = useCallback((raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setTerminalState((prev) => {
      const result = executeTerminalCommand(trimmed);
      const nextHistory = [...prev.history, trimmed];

      if (result.clear) {
        return {
          ...prev,
          entries: [],
          history: nextHistory,
          historyIndex: -1,
        };
      }

      const outputLines = result.lines.map((line) => ({
        type: result.error ? "error" : "output",
        text: line,
      }));

      return {
        ...prev,
        history: nextHistory,
        historyIndex: -1,
        entries: [
          ...prev.entries,
          { type: "command", text: trimmed },
          ...outputLines,
        ],
      };
    });
  }, [setTerminalState]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const nextInput = input;
      setTerminalState((prev) => ({ ...prev, input: "" }));
      runCommand(nextInput);
      requestAnimationFrame(() => focusTerminalInput());
    },
    [focusTerminalInput, input, runCommand, setTerminalState]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Home") {
        e.preventDefault();
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setTerminalState((prev) => {
          if (!prev.history.length) return prev;
          const nextIndex =
            prev.historyIndex === -1
              ? prev.history.length - 1
              : Math.max(0, prev.historyIndex - 1);
          return {
            ...prev,
            historyIndex: nextIndex,
            input: prev.history[nextIndex] ?? "",
          };
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setTerminalState((prev) => {
          if (!prev.history.length || prev.historyIndex === -1) return prev;
          const nextIndex = prev.historyIndex + 1;
          if (nextIndex >= prev.history.length) {
            return {
              ...prev,
              historyIndex: -1,
              input: "",
            };
          }
          return {
            ...prev,
            historyIndex: nextIndex,
            input: prev.history[nextIndex],
          };
        });
      }
    },
    [setTerminalState]
  );

  return (
    <div
      className="terminal-body"
      onMouseDown={(e) => {
        const target = e.target as HTMLElement | null;
        if (target?.tagName !== "INPUT") {
          focusTerminalInput();
        }
      }}
    >
      {entries.map((entry, index) => (
        <div
          key={`${entry.type}-${index}-${entry.text}`}
          className={`terminal-line${entry.type === "hint" ? " terminal-line-hint" : ""}${entry.type === "error" ? " terminal-line-error" : ""}`}
        >
          {entry.type === "command" ? (
            <>
              <span className="terminal-prompt">{TERMINAL_PROMPT}</span>
              <span>{entry.text}</span>
            </>
          ) : (
            <span className="terminal-output">{entry.text}</span>
          )}
        </div>
      ))}

      <form className="terminal-line terminal-input-line" onSubmit={handleSubmit} onClick={focusTerminalInput}>
        <span className="terminal-prompt">{TERMINAL_PROMPT}</span>
        <span className="terminal-input-shell">
          <span className="terminal-input-value">{input}</span>
          {isFocused && <span className="terminal-block-caret" aria-hidden="true">&nbsp;</span>}
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) =>
              setTerminalState((prev) => ({
                ...prev,
                input: e.target.value,
              }))
            }
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSelect={(e) => {
              const end = e.currentTarget.value.length;
              e.currentTarget.setSelectionRange(end, end);
            }}
            autoFocus
            spellCheck={false}
          />
        </span>
      </form>
      <div ref={endRef} />
    </div>
  );
}

function NotesContent({ notesText, setNotesText }) {
  const textareaRef = useRef(null);
  const shouldPlaceCaretAtEndRef = useRef(true);

  const focusNotesAtEnd = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const caretPos = textarea.value.length;
    textarea.focus();
    textarea.setSelectionRange(caretPos, caretPos);
    shouldPlaceCaretAtEndRef.current = false;
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      focusNotesAtEnd();
    });
    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [focusNotesAtEnd]);

  return (
    <div className="notes-body">
      <textarea
        ref={textareaRef}
        value={notesText}
        onChange={(e) => setNotesText(e.target.value)}
        onFocus={(e) => {
          if (!shouldPlaceCaretAtEndRef.current) return;
          const caretPos = e.currentTarget.value.length;
          e.currentTarget.setSelectionRange(caretPos, caretPos);
          shouldPlaceCaretAtEndRef.current = false;
        }}
        spellCheck={false}
      />
    </div>
  );
}

function AboutContent() {
  return (
    <div className="about-content">
      <div className="about-logo">runtime</div>
      <div className="about-version">Version 1.0.0</div>
      <div className="about-madeby">
        made by{" "}
        <a
          className="about-link"
          href="https://siddhantsr.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Siddhant Rawat
        </a>
      </div>
    </div>
  );
}

function SettingsContent({ settingsState, setSettingsState }) {
  const { activePane, appearance, general, notifications, privacy } = settingsState;
  const selectedAccentId = SETTINGS_ACCENTS.some(
    (accent) => accent.id === appearance.accent
  )
    ? appearance.accent
    : "sky";
  const getRangeStyle = (value, min, max): CSSProperties =>
    ({
      "--range-fill-stop": `${((value - min) / (max - min)) * 100}%`,
    }) as CSSProperties;

  const setActivePane = useCallback((paneId) => {
    setSettingsState((prev) =>
      prev.activePane === paneId ? prev : { ...prev, activePane: paneId }
    );
  }, [setSettingsState]);

  const setSectionField = useCallback((section, key, value) => {
    setSettingsState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  }, [setSettingsState]);

  const toggleSectionField = useCallback((section, key) => {
    setSettingsState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  }, [setSettingsState]);

  const renderSwitchRow = (id, title, description, checked, onToggle) => (
    <div key={id} className="settings-row">
      <div className="settings-row-copy">
        <p className="settings-row-title">{title}</p>
        <p className="settings-row-description">{description}</p>
      </div>
      <button
        type="button"
        className={`settings-switch${checked ? " is-on" : ""}`}
        onClick={onToggle}
        role="switch"
        aria-checked={checked}
        aria-label={title}
      >
        <span className="settings-switch-handle" />
      </button>
    </div>
  );

  let paneContent = null;

  if (activePane === "appearance") {
    paneContent = (
      <>
        <div className="settings-panel-header">
          <h3>Appearance</h3>
          <p>Shape how runtime desktop feels.</p>
        </div>

        <div className="settings-card">
          <p className="settings-card-title">Accent Color</p>
          <div className="settings-accent-grid">
            {SETTINGS_ACCENTS.map((accent) => (
              <button
                key={accent.id}
                type="button"
                className={`settings-accent-btn${selectedAccentId === accent.id ? " active" : ""}`}
                onClick={() => setSectionField("appearance", "accent", accent.id)}
                aria-pressed={selectedAccentId === accent.id}
              >
                <span
                  className="settings-accent-dot"
                  style={{ backgroundColor: accent.color }}
                  aria-hidden="true"
                />
                <span>{accent.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="settings-card settings-card-slider">
          <label className="settings-slider-label" htmlFor="dock-size-slider">
            Dock icon size
            <span>{appearance.dockSize}px</span>
          </label>
          <input
            id="dock-size-slider"
            className="settings-range"
            type="range"
            min="56"
            max="104"
            step="1"
            value={appearance.dockSize}
            style={getRangeStyle(appearance.dockSize, 56, 104)}
            onChange={(e) =>
              setSectionField("appearance", "dockSize", Number(e.target.value))
            }
          />

          <label className="settings-slider-label" htmlFor="glass-amount-slider">
            Glass intensity
            <span>{appearance.glassAmount}%</span>
          </label>
          <input
            id="glass-amount-slider"
            className="settings-range"
            type="range"
            min="45"
            max="95"
            step="1"
            value={appearance.glassAmount}
            style={getRangeStyle(appearance.glassAmount, 45, 95)}
            onChange={(e) =>
              setSectionField("appearance", "glassAmount", Number(e.target.value))
            }
          />
        </div>

        <div className="settings-card settings-card-rows">
          {renderSwitchRow(
            "appearance-reduce-motion",
            "Reduce motion",
            "Use quieter transitions across windows and dock.",
            appearance.reduceMotion,
            () => toggleSectionField("appearance", "reduceMotion")
          )}
          {renderSwitchRow(
            "appearance-compact-dock",
            "Compact dock",
            "Tighten dock spacing for denser layouts.",
            appearance.compactDock,
            () => toggleSectionField("appearance", "compactDock")
          )}
        </div>
      </>
    );
  } else if (activePane === "general") {
    paneContent = (
      <>
        <div className="settings-panel-header">
          <h3>General</h3>
          <p>Daily behavior and startup preferences.</p>
        </div>
        <div className="settings-card settings-card-rows">
          {renderSwitchRow(
            "general-show-icons",
            "Show desktop icons",
            "Display shortcuts on the left side of the desktop.",
            general.showDesktopIcons,
            () => toggleSectionField("general", "showDesktopIcons")
          )}
          {renderSwitchRow(
            "general-reopen-apps",
            "Reopen apps on launch",
            "Restore open apps after restarting runtime.",
            general.reopenAppsOnLaunch,
            () => toggleSectionField("general", "reopenAppsOnLaunch")
          )}
          {renderSwitchRow(
            "general-24-hour-clock",
            "Use 24-hour clock",
            "Switch menu bar time format from AM/PM to 24-hour.",
            general.use24HourClock,
            () => toggleSectionField("general", "use24HourClock")
          )}
        </div>
      </>
    );
  } else if (activePane === "notifications") {
    paneContent = (
      <>
        <div className="settings-panel-header">
          <h3>Notifications</h3>
          <p>Control alert style, sound, and focus mode.</p>
        </div>
        <div className="settings-card settings-card-rows">
          {renderSwitchRow(
            "notifications-enabled",
            "Allow notifications",
            "Enable app alerts and banner previews.",
            notifications.enabled,
            () => toggleSectionField("notifications", "enabled")
          )}
          {renderSwitchRow(
            "notifications-focus",
            "Focus mode",
            "Silence non-critical alerts while active.",
            notifications.focusMode,
            () => toggleSectionField("notifications", "focusMode")
          )}
          {renderSwitchRow(
            "notifications-badges",
            "Show dock badges",
            "Display unread counters on dock icons.",
            notifications.badges,
            () => toggleSectionField("notifications", "badges")
          )}
          {renderSwitchRow(
            "notifications-sounds",
            "Play notification sounds",
            "Add audible pings for incoming notifications.",
            notifications.sounds,
            () => toggleSectionField("notifications", "sounds")
          )}
        </div>
      </>
    );
  } else {
    paneContent = (
      <>
        <div className="settings-panel-header">
          <h3>Privacy</h3>
          <p>Choose what telemetry and permissions are shared.</p>
        </div>
        <div className="settings-card settings-card-rows">
          {renderSwitchRow(
            "privacy-crash-reports",
            "Share crash reports",
            "Send anonymous diagnostics to improve reliability.",
            privacy.shareCrashReports,
            () => toggleSectionField("privacy", "shareCrashReports")
          )}
          {renderSwitchRow(
            "privacy-analytics",
            "Share usage analytics",
            "Help prioritize features with anonymous usage data.",
            privacy.analytics,
            () => toggleSectionField("privacy", "analytics")
          )}
          {renderSwitchRow(
            "privacy-location",
            "Location services",
            "Allow apps to request approximate location.",
            privacy.locationServices,
            () => toggleSectionField("privacy", "locationServices")
          )}
        </div>
        <div className="settings-privacy-note">
          Runtime privacy profile: <strong>{privacy.analytics ? "Balanced" : "Strict"}</strong>
        </div>
      </>
    );
  }

  return (
    <div className="settings-shell">
      <aside className="settings-sidebar">
        <div className="settings-sidebar-head">
          <div className="settings-avatar" aria-hidden="true">
            <span className="settings-avatar-glyph" />
          </div>
          <div className="settings-identity">
            <p className="settings-identity-title">runtimeOS</p>
            <p className="settings-identity-subtitle">Personal Settings</p>
          </div>
        </div>
        <div className="settings-nav">
          {SETTINGS_PANES.map((pane) => (
            <button
              key={pane.id}
              type="button"
              className={`settings-nav-item${activePane === pane.id ? " active" : ""}`}
              onClick={() => setActivePane(pane.id)}
            >
              <span className="settings-nav-title">{pane.label}</span>
              <span className="settings-nav-summary">{pane.summary}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="settings-panel">{paneContent}</section>
    </div>
  );
}

function TrashContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8 }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4,6 L20,6" /><path d="M10,6 L10,4 L14,4 L14,6" /><path d="M6,6 L7,20 C7,21 7.9,21 8,21 L16,21 C16.1,21 17,21 17,20 L18,6" />
      </svg>
      <span style={{ fontSize: 12, color: "rgba(0,0,0,0.25)" }}>Trash is empty</span>
    </div>
  );
}

/* ─── Window Dimensions ─────────────────────────────── */
const windowDefaults = {
  terminal: { width: 850, height: 560, title: "Terminal" },
  notes: { width: 650, height: 525, title: "Notes" },
  settings: { width: 760, height: 500, title: "Settings" },
  about: { width: 525, height: 400, title: "About runtime" },
  trash: { width: 475, height: 375, title: "Trash" },
};

const RESTART_MESSAGES = [
  "Shutting down",
  "Loading core",
  "Setting up",
  "Starting desktop",
  "Finalizing",
];
const RESTART_MESSAGE_DURATIONS_MS = [3000, 2000, 1000, 3000, 1000];
const RESTART_BLACKOUT_MS = 3000;
const RESTART_REVEAL_MS = 800;

/* ─── Main Page Component ───────────────────────────── */
export default function Home() {
  const [openWindows, setOpenWindows] = useState([]);
  const [topZ, setTopZ] = useState(100);
  const [clock, setClock] = useState("");
  const [clockPopoverOpen, setClockPopoverOpen] = useState(false);
  const [activeMenubarMenu, setActiveMenubarMenu] = useState(null);
  const [calendarDate, setCalendarDate] = useState(() => new Date());
  const [runtimeLogoHovered, setRuntimeLogoHovered] = useState(false);
  const [runtimeLogoToggled, setRuntimeLogoToggled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [restartStep, setRestartStep] = useState(-1);
  const [restartRevealing, setRestartRevealing] = useState(false);
  const [terminalState, setTerminalState] = useState(() => createInitialTerminalState());
  const [settingsState, setSettingsState] = useState(() =>
    createInitialSettingsState()
  );
  const [notesText, setNotesText] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const savedNotes = window.localStorage.getItem(NOTES_STORAGE_KEY);
      return savedNotes ?? "";
    } catch {
      return "";
    }
  });
  const startRef = useRef(null);
  const menubarNavRef = useRef(null);
  const wallpaperRef = useRef(null);
  const clockRef = useRef(null);
  const maximizeTimersRef = useRef<Record<string, number>>({});
  const restartTimersRef = useRef<number[]>([]);
  const use24HourClock = settingsState.general.use24HourClock;
  const accentTheme = useMemo(
    () => ACCENT_THEMES[settingsState.appearance.accent] ?? ACCENT_THEMES.sky,
    [settingsState.appearance.accent]
  );
  const themeVars = useMemo<CSSProperties>(
    () =>
      ({
        "--runtime-accent": accentTheme.color,
        "--runtime-accent-rgb": accentTheme.rgb,
        "--runtime-accent-text": accentTheme.text,
        "--runtime-slider-track": accentTheme.sliderTrack,
      }) as CSSProperties,
    [accentTheme]
  );
  const calendarCells = useMemo(() => getCalendarCells(calendarDate), [calendarDate]);
  const calendarMonthLabel = useMemo(
    () => calendarDate.toLocaleString("en-US", { month: "long", year: "numeric" }),
    [calendarDate]
  );
  const calendarDayLabel = useMemo(
    () =>
      calendarDate.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    [calendarDate]
  );

  const resetWindowState = useCallback((id) => {
    if (id === "terminal") {
      setTerminalState(createInitialTerminalState());
    }
  }, []);

  /* Clock */
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCalendarDate(now);
      setClock(
        now.toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: !use24HourClock,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [use24HourClock]);

  useEffect(() => {
    const handleDocumentPointerDown = (event: PointerEvent) => {
      if (!clockPopoverOpen) return;
      if (event.target instanceof Node && clockRef.current?.contains(event.target)) return;
      setClockPopoverOpen(false);
    };

    document.addEventListener("pointerdown", handleDocumentPointerDown);
    return () => {
      document.removeEventListener("pointerdown", handleDocumentPointerDown);
    };
  }, [clockPopoverOpen]);

  useEffect(() => {
    const handleDocumentPointerDown = (event: PointerEvent) => {
      if (!startMenuOpen) return;
      if (event.target instanceof Node && startRef.current?.contains(event.target)) return;
      setStartMenuOpen(false);
    };

    document.addEventListener("pointerdown", handleDocumentPointerDown);
    return () => {
      document.removeEventListener("pointerdown", handleDocumentPointerDown);
    };
  }, [startMenuOpen]);

  useEffect(() => {
    const handleDocumentPointerDown = (event: PointerEvent) => {
      if (!activeMenubarMenu) return;
      if (event.target instanceof Node && menubarNavRef.current?.contains(event.target)) return;
      setActiveMenubarMenu(null);
    };

    document.addEventListener("pointerdown", handleDocumentPointerDown);
    return () => {
      document.removeEventListener("pointerdown", handleDocumentPointerDown);
    };
  }, [activeMenubarMenu]);

  /* Mobile view detection for tap interactions */
  useEffect(() => {
    const updateMobileView = () => setIsMobileView(window.innerWidth <= 640);
    updateMobileView();
    window.addEventListener("resize", updateMobileView);
    return () => window.removeEventListener("resize", updateMobileView);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(NOTES_STORAGE_KEY, notesText);
    } catch {
      /* Ignore storage issues in restricted contexts */
    }
  }, [notesText]);

  /* Cleanup maximize animation timers */
  useEffect(
    () => () => {
      Object.values(maximizeTimersRef.current).forEach((timerId) => {
        window.clearTimeout(timerId);
      });
      restartTimersRef.current.forEach((timerId) => {
        window.clearTimeout(timerId);
      });
    },
    []
  );

  const runRestartSequence = useCallback(() => {
    if (restartStep !== -1 || restartRevealing) return;

    restartTimersRef.current.forEach((timerId) => {
      window.clearTimeout(timerId);
    });
    restartTimersRef.current = [];

    setStartMenuOpen(false);
    setRuntimeLogoHovered(false);
    setRuntimeLogoToggled(false);
    setOpenWindows([]);
    setTopZ(100);
    setRestartRevealing(false);
    setRestartStep(0);

    const timers = [];
    let elapsed = RESTART_MESSAGE_DURATIONS_MS[0];
    timers.push(
      window.setTimeout(() => {
        setRestartStep(-2);
      }, elapsed)
    );

    elapsed += RESTART_BLACKOUT_MS;
    timers.push(
      window.setTimeout(() => {
        setRestartStep(1);
      }, elapsed)
    );

    for (let i = 2; i < RESTART_MESSAGES.length; i += 1) {
      elapsed += RESTART_MESSAGE_DURATIONS_MS[i - 1];
      timers.push(
        window.setTimeout(() => {
          setRestartStep(i);
        }, elapsed)
      );
    }

    elapsed += RESTART_MESSAGE_DURATIONS_MS[RESTART_MESSAGES.length - 1];
    timers.push(
      window.setTimeout(() => {
        setRestartRevealing(true);
      }, elapsed)
    );

    timers.push(
      window.setTimeout(() => {
        setRestartRevealing(false);
        setRestartStep(-1);
      }, elapsed + RESTART_REVEAL_MS)
    );

    restartTimersRef.current = timers;
  }, [restartRevealing, restartStep]);

  const handleDesktopMouseMove = useCallback(
    (e) => {
      if (isMobileView) return;
      const wallpaperEl = wallpaperRef.current;
      if (!wallpaperEl) return;

      let textBounds = wallpaperEl.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(wallpaperEl);

      const textRects = range.getClientRects();
      if (textRects.length > 0) {
        let left = Infinity;
        let top = Infinity;
        let right = -Infinity;
        let bottom = -Infinity;
        Array.from(textRects).forEach((rect) => {
          left = Math.min(left, rect.left);
          top = Math.min(top, rect.top);
          right = Math.max(right, rect.right);
          bottom = Math.max(bottom, rect.bottom);
        });
        if (
          Number.isFinite(left) &&
          Number.isFinite(top) &&
          Number.isFinite(right) &&
          Number.isFinite(bottom)
        ) {
          textBounds = { left, top, right, bottom, width: right - left, height: bottom - top };
        }
      }

      const insetX = Math.max(4, textBounds.width * 0.015);
      const insetY = Math.max(10, textBounds.height * 0.2);

      const withinTextBounds =
        e.clientX >= textBounds.left + insetX &&
        e.clientX <= textBounds.right - insetX &&
        e.clientY >= textBounds.top + insetY &&
        e.clientY <= textBounds.bottom - insetY;

      setRuntimeLogoHovered((prev) =>
        prev === withinTextBounds ? prev : withinTextBounds
      );
    },
    [isMobileView]
  );

  const handleDesktopMouseLeave = useCallback(() => {
    if (!isMobileView) {
      setRuntimeLogoHovered(false);
    }
  }, [isMobileView]);

  /* Bring to front */
  const bringToFront = useCallback(
    (id) => {
      const newZ = topZ + 1;
      setTopZ(newZ);
      setOpenWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, z: newZ } : w))
      );
    },
    [topZ]
  );

  /* Open window */
  const openWindow = useCallback(
    (id) => {
      const existing = openWindows.find((w) => w.id === id);
      if (existing) {
        const newZ = topZ + 1;
        setTopZ(newZ);
        setOpenWindows((prev) =>
          prev.map((w) =>
            w.id === id ? { ...w, minimized: false, z: newZ } : w
          )
        );
        return;
      }
      const def = windowDefaults[id];
      if (!def) return;
      const newZ = topZ + 1;
      setTopZ(newZ);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const menuH = vw <= 640 ? 44 : 35;
      const dockH = vw <= 640 ? 104 : 108;
      const availW = vw - 16;
      const availH = vh - menuH - dockH;
      const winW = Math.min(def.width, availW);
      const winH = Math.min(def.height, availH);
      const maxX = Math.max(0, vw - winW - 8);
      const maxY = Math.max(0, availH - winH);
      setOpenWindows((prev) => [
        ...prev,
        {
          id,
          ...def,
          width: winW,
          height: winH,
          x: Math.min(Math.max(8, 100 + Math.random() * (maxX - 100)), maxX),
          y: Math.min(Math.max(8, 20 + Math.random() * (maxY - 20)), maxY),
          z: newZ,
        },
      ]);
    },
    [openWindows, topZ]
  );

  /* Close window */
  const closeWindow = useCallback((id) => {
    const activeTimer = maximizeTimersRef.current[id];
    if (activeTimer) {
      window.clearTimeout(activeTimer);
      delete maximizeTimersRef.current[id];
    }
    const el = document.getElementById(`window-${id}`);
    if (el) {
      el.classList.add("window-closing");
      setTimeout(() => {
        setOpenWindows((prev) => prev.filter((w) => w.id !== id));
        resetWindowState(id);
      }, 180);
      return;
    }
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    resetWindowState(id);
  }, [resetWindowState]);

  /* Minimize window (animate into its dock icon) */
  const minimizeWindow = useCallback((id) => {
    const el = document.getElementById(`window-${id}`);
    if (!el) return;
    /* Find the matching dock icon and animate toward it */
    const dockIcon = document.querySelector(`[data-dock-id="${id}"]`);
    if (dockIcon) {
      const dockRect = dockIcon.getBoundingClientRect();
      const menuH = window.innerWidth <= 640 ? 44 : 35;
      /* Add the class first to enable transition */
      el.classList.add("window-minimizing");
      /* Then set the target position via inline styles */
      requestAnimationFrame(() => {
        el.style.left = `${dockRect.left}px`;
        el.style.top = `${dockRect.top - menuH}px`;
        el.style.width = `${dockRect.width}px`;
        el.style.height = `${dockRect.height}px`;
        el.style.transform = "scale(0.5)";
        el.style.borderRadius = "12px";
      });
    }
    setTimeout(() => {
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, minimized: true } : w
        )
      );
      /* Reset inline styles */
      el.classList.remove("window-minimizing");
      el.style.removeProperty("transform");
      el.style.removeProperty("border-radius");
    }, 420);
  }, []);

  /* Restore from minimize (via dock click) */
  const restoreWindow = useCallback(
    (id) => {
      const newZ = topZ + 1;
      setTopZ(newZ);
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, minimized: false, z: newZ } : w
        )
      );
    },
    [topZ]
  );

  /* Maximize / restore window */
  const maximizeWindow = useCallback(
    (id) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const menuH = vw <= 640 ? 44 : 35;
      const dockEl = document.querySelector(".dock");
      const dockTop = dockEl ? dockEl.getBoundingClientRect().top : vh - (vw <= 640 ? 100 : 108);
      const maxWindowHeight = Math.max(220, dockTop - menuH - 16);

      const activeTimer = maximizeTimersRef.current[id];
      if (activeTimer) {
        window.clearTimeout(activeTimer);
      }

      setOpenWindows((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          const pendingLayout = w.maximized
            ? {
              maximized: false,
              x: w.preMax?.x ?? 100,
              y: w.preMax?.y ?? 40,
              width: w.preMax?.width ?? windowDefaults[id]?.width ?? 400,
              height: w.preMax?.height ?? windowDefaults[id]?.height ?? 300,
            }
            : {
              maximized: true,
              preMax: { x: w.x, y: w.y, width: w.width, height: w.height },
              x: 8,
              y: 8,
              width: vw - 16,
              height: maxWindowHeight,
            };
          return {
            ...w,
            layoutAnimating: true,
            pendingLayout,
          };
        })
      );

      requestAnimationFrame(() => {
        setOpenWindows((prev) =>
          prev.map((w) =>
            w.id === id && w.pendingLayout
              ? { ...w, ...w.pendingLayout, pendingLayout: undefined }
              : w
          )
        );
      });

      maximizeTimersRef.current[id] = window.setTimeout(() => {
        setOpenWindows((prev) =>
          prev.map((w) =>
            w.id === id
              ? { ...w, layoutAnimating: false, pendingLayout: undefined }
              : w
          )
        );
        delete maximizeTimersRef.current[id];
      }, 280);
    },
    []
  );

  /* Drag (mouse) */
  const handleMouseDown = useCallback(
    (e, id) => {
      e.preventDefault();
      bringToFront(id);
      const win = openWindows.find((w) => w.id === id);
      if (!win) return;
      const startX = e.clientX - win.x;
      const startY = e.clientY - win.y;
      const move = (me) => {
        setOpenWindows((prev) =>
          prev.map((w) =>
            w.id === id ? { ...w, x: me.clientX - startX, y: me.clientY - startY } : w
          )
        );
      };
      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    },
    [openWindows, bringToFront]
  );

  /* Drag (touch for mobile) */
  const handleTouchStart = useCallback(
    (e, id) => {
      bringToFront(id);
      const win = openWindows.find((w) => w.id === id);
      if (!win) return;
      const touch = e.touches[0];
      const startX = touch.clientX - win.x;
      const startY = touch.clientY - win.y;
      const move = (te) => {
        te.preventDefault();
        const t = te.touches[0];
        setOpenWindows((prev) =>
          prev.map((w) =>
            w.id === id ? { ...w, x: t.clientX - startX, y: t.clientY - startY } : w
          )
        );
      };
      const end = () => {
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", end);
      };
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("touchend", end);
    },
    [openWindows, bringToFront]
  );

  /* Icon click */
  const handleIconClick = useCallback(
    (shortcut) => {
      if (shortcut.type === "link") {
        window.open(shortcut.url, "_blank", "noopener");
      } else {
        /* If already open and minimized, restore it */
        const existing = openWindows.find((w) => w.id === shortcut.id);
        if (existing && existing.minimized) {
          restoreWindow(shortcut.id);
        } else {
          openWindow(shortcut.id);
        }
      }
    },
    [openWindow, openWindows, restoreWindow]
  );

  /* Dock icon class */
  const getDockIconClass = (type) => `dock-icon dock-icon-${type}`;
  const isRuntimeLogoLine = isMobileView ? runtimeLogoToggled : runtimeLogoHovered;
  const windowContent = {
    terminal: (
      <TerminalContent
        terminalState={terminalState}
        setTerminalState={setTerminalState}
      />
    ),
    notes: <NotesContent notesText={notesText} setNotesText={setNotesText} />,
    settings: (
      <SettingsContent
        settingsState={settingsState}
        setSettingsState={setSettingsState}
      />
    ),
    about: <AboutContent />,
    trash: <TrashContent />,
  };

  return (
    <div className="no-select" style={themeVars}>
      {/* ── Menu Bar ─────────────────────── */}
      <div className="menubar">
        <div className="menubar-left">
          <div className="menubar-start" ref={startRef}>
            <div
              className={`menubar-start-btn${startMenuOpen ? " active" : ""}`}
              onClick={() => {
                setClockPopoverOpen(false);
                setActiveMenubarMenu(null);
                setStartMenuOpen((v) => !v);
              }}
            >
              <span className="menubar-start-glyph" />
            </div>
            {startMenuOpen && (
              <div className="start-menu">
                <div className="start-menu-label">System</div>
                <div className="start-menu-item" onClick={() => { openWindow("about"); setStartMenuOpen(false); }}>
                  <MenuIcon type="about" />
                  <span>About runtime</span>
                </div>
                <div
                  className="start-menu-item"
                  onClick={() => {
                    const existing = openWindows.find((w) => w.id === "settings");
                    if (existing?.minimized) {
                      restoreWindow("settings");
                    } else {
                      openWindow("settings");
                    }
                    setStartMenuOpen(false);
                  }}
                >
                  <MenuIcon type="settings" />
                  <span>System Settings</span>
                </div>
                <div className="start-menu-separator" />
                <div className="start-menu-label">Apps</div>
                <div className="start-menu-item" onClick={() => { openWindow("terminal"); setStartMenuOpen(false); }}>
                  <MenuIcon type="terminal" />
                  <span>Terminal</span>
                </div>
                <div className="start-menu-item" onClick={() => { openWindow("notes"); setStartMenuOpen(false); }}>
                  <MenuIcon type="notes" />
                  <span>Notes</span>
                </div>
                <div className="start-menu-item" onClick={() => { window.open("https://phasor.so", "_blank"); setStartMenuOpen(false); }}>
                  <MenuIcon type="globe" />
                  <span>Phasor</span>
                </div>
                <div className="start-menu-separator" />
                <div
                  className="start-menu-item"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    runRestartSequence();
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    runRestartSequence();
                  }}
                >
                  <MenuIcon type="restart" />
                  <span>Restart</span>
                </div>
              </div>
            )}
          </div>
          <span
            className={`menubar-item menubar-runtime-logo${isRuntimeLogoLine ? " hovered" : ""}`}
            style={{ fontWeight: 700 }}
            onMouseEnter={() => {
              if (!isMobileView) setRuntimeLogoHovered(true);
            }}
            onMouseLeave={() => {
              if (!isMobileView) setRuntimeLogoHovered(false);
            }}
            onClick={() => {
              setStartMenuOpen(false);
              setClockPopoverOpen(false);
              setActiveMenubarMenu(null);
              const existing = openWindows.find((w) => w.id === "about");
              if (existing?.minimized) {
                restoreWindow("about");
              } else {
                openWindow("about");
              }
            }}
          >
            runtime
          </span>
          <div className="menubar-nav" ref={menubarNavRef}>
            {MENUBAR_MENUS.map((menu) => (
              <div key={menu.id} className="menubar-menu-group">
                <button
                  type="button"
                  className={`menubar-item menubar-nav-trigger${activeMenubarMenu === menu.id ? " active" : ""}`}
                  onClick={() => {
                    setStartMenuOpen(false);
                    setClockPopoverOpen(false);
                    setActiveMenubarMenu((prev) =>
                      prev === menu.id ? null : menu.id
                    );
                  }}
                >
                  {menu.label}
                </button>
                {activeMenubarMenu === menu.id && (
                  <div className="menubar-dropdown">
                    {menu.items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="menubar-dropdown-item"
                        onClick={() => setActiveMenubarMenu(null)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="menubar-right" ref={clockRef} style={{ position: "relative" }}>
          <button
            type="button"
            className={`clock-button${clockPopoverOpen ? " active" : ""}`}
            onClick={() => {
              setStartMenuOpen(false);
              setActiveMenubarMenu(null);
              setClockPopoverOpen((prev) => !prev);
            }}
            style={{
              border: "none",
              background: clockPopoverOpen ? "rgba(0, 0, 0, 0.06)" : "transparent",
              color: clockPopoverOpen ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0.5)",
              font: "inherit",
              padding: "4px 8px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {clock}
          </button>
          {clockPopoverOpen && (
            <div
              className="calendar-popover"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                width: isMobileView ? "min(290px, calc(100vw - 24px))" : 290,
                borderRadius: 12,
                border: "1px solid rgba(0, 0, 0, 0.12)",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 18px 42px rgba(0, 0, 0, 0.14), 0 0 0 0.5px rgba(0, 0, 0, 0.04)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                padding: 12,
                zIndex: 10001,
              }}
            >
              <div
                className="calendar-popover-header"
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                  paddingBottom: 10,
                  marginBottom: 10,
                }}
              >
                <p className="calendar-popover-month" style={{ margin: 0, fontSize: 15, color: "rgba(0, 0, 0, 0.86)" }}>
                  {calendarMonthLabel}
                </p>
                <p className="calendar-popover-day" style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(0, 0, 0, 0.48)" }}>
                  {calendarDayLabel}
                </p>
              </div>
              <div
                className="calendar-weekday-row"
                style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 4, marginBottom: 4 }}
              >
                {CALENDAR_WEEKDAYS.map((weekday) => (
                  <span
                    key={weekday}
                    style={{ fontSize: 10, color: "rgba(0, 0, 0, 0.44)", textAlign: "center", padding: "4px 0" }}
                  >
                    {weekday}
                  </span>
                ))}
              </div>
              <div
                className="calendar-grid"
                style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 4 }}
              >
                {calendarCells.map((cell, index) => {
                  const isCurrentMonth = cell.monthOffset === 0;
                  const isToday =
                    isCurrentMonth &&
                    cell.day === calendarDate.getDate();
                  return (
                    <span
                      key={`${cell.monthOffset}-${cell.day}-${index}`}
                      className={`calendar-cell${isCurrentMonth ? "" : " is-outside"}${isToday ? " is-today" : ""}`}
                      style={{
                        height: 28,
                        borderRadius: 7,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: isToday
                          ? "var(--runtime-accent-text)"
                          : isCurrentMonth
                            ? "rgba(0, 0, 0, 0.78)"
                            : "rgba(0, 0, 0, 0.3)",
                        background: isToday
                          ? "linear-gradient(180deg, rgba(var(--runtime-accent-rgb), 0.2), rgba(var(--runtime-accent-rgb), 0.13))"
                          : "transparent",
                        border: isToday
                          ? "1px solid rgba(var(--runtime-accent-rgb), 0.36)"
                          : "1px solid transparent",
                      }}
                    >
                      {cell.day}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Desktop ──────────────────────── */}
      <div
        className="desktop"
        onMouseMove={handleDesktopMouseMove}
        onMouseLeave={handleDesktopMouseLeave}
      >
        <span
          ref={wallpaperRef}
          className={`wallpaper-text${isRuntimeLogoLine ? " hovered" : ""}`}
          onClick={() => {
            if (isMobileView) setRuntimeLogoToggled((v) => !v);
          }}
        >
          runtime
        </span>
      </div>

      {/* ── Desktop Icons (left side) ────── */}
      {settingsState.general.showDesktopIcons && (
        <div className="icon-grid">
          {desktopShortcuts.map((s) => (
            <div key={s.id} className="desktop-icon" onClick={() => handleIconClick(s)}>
              <div className="icon-image">
                {s.icon.startsWith("/") ? (
                  <img src={s.icon} alt={s.label} draggable={false} />
                ) : (
                  <div className={`css-icon css-icon-${s.icon}`}>
                    <IconSVG type={s.icon} size={22} />
                  </div>
                )}
              </div>
              <span className="icon-label">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Windows ──────────────────────── */}
      <div className="window-overlay">
        {openWindows.filter((w) => !w.minimized).map((win) => (
          <div
            key={win.id}
            id={`window-${win.id}`}
            className={`window${win.id === "terminal" ? " terminal-window" : ""}${win.maximized ? " window-maximized" : ""}`}
            style={{
              width: win.width,
              height: win.height,
              left: win.x,
              top: win.y,
              zIndex: win.z,
              ...(win.maximized ? { borderRadius: 10 } : {}),
              ...(win.layoutAnimating
                ? {
                  transition:
                    "left 0.25s ease, top 0.25s ease, width 0.25s ease, height 0.25s ease, border-radius 0.25s ease",
                }
                : {}),
            }}
            onMouseDown={() => bringToFront(win.id)}
          >
            <div
              className="window-titlebar"
              onMouseDown={(e) => !win.maximized && handleMouseDown(e, win.id)}
              onTouchStart={(e) => !win.maximized && handleTouchStart(e, win.id)}
            >
              <div className="window-controls">
                <button className="window-control window-control-close" onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }} />
                <button className="window-control window-control-minimize" onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }} />
                <button
                  className={`window-control ${win.maximized ? "window-control-restore" : "window-control-maximize"}`}
                  onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
                />
              </div>
              <span className="window-title">{win.title}</span>
            </div>
            <div className={`window-content${win.id === "settings" ? " settings-window-content" : ""}`}>
              {windowContent[win.id]}
            </div>
          </div>
        ))}
      </div>

      {/* ── Dock ──────────────────────────── */}
      <div className="dock">
        {dockShortcuts.map((s) => {
          const isAppOpen = openWindows.some((w) => w.id === s.id);
          return (
            <div key={s.id} className={`dock-item-wrapper${isAppOpen ? " app-open" : ""}`}>
              <div className="dock-tooltip">{s.label}</div>
              <div className="dock-item" data-dock-id={s.id} onClick={() => handleIconClick(s)}>
                {s.icon.startsWith("/") ? (
                  <img src={s.icon} alt={s.label} draggable={false} />
                ) : (
                  <div className={getDockIconClass(s.icon)}>
                    <IconSVG type={s.icon} size={22} />
                  </div>
                )}
              </div>
              <span className="dock-open-indicator" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      {restartStep !== -1 && (
        <div className={`restart-overlay${restartRevealing ? " revealing" : ""}`}>
          <div className="restart-boot">
            <div className="restart-spinner" aria-hidden="true" />
            <div className={`restart-text${restartStep < 0 ? " restart-text-placeholder" : ""}`}>
              {restartStep >= 0 ? RESTART_MESSAGES[restartStep] : "\u00A0"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
