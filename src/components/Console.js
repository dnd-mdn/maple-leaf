import React, { useState, useImperativeHandle, forwardRef } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

/**
 * Console component for displaying logs on the web page.
 * Usage:
 *   const consoleRef = useRef();
 *   <Console ref={consoleRef} />
 *   consoleRef.current.log("Hello");
 *   consoleRef.current.warn("Warning!");
 *   consoleRef.current.error("Error!");
 */
const Console = forwardRef((props, ref) => {
    const [logs, setLogs] = useState([]);

    // Expose log, warn, error methods to parent via ref
    useImperativeHandle(ref, () => ({
        log: (msg) => addLog("info", msg),
        warn: (msg) => addLog("warning", msg),
        error: (msg) => addLog("danger", msg),
        clear: () => setLogs([]),
    }));

    const addLog = (type, msg) => {
        setLogs((prev) => [
            ...prev,
            { type, msg, id: Date.now() + Math.random() }
        ]);
        // Also output to browser console
        if (type === "info") window.console.log(msg);
        if (type === "warning") window.console.warn(msg);
        if (type === "danger") window.console.error(msg);
    };

    const getColor = (type) => {
        if (type === "info") return "#0af";
        if (type === "warning") return "#fa0";
        if (type === "danger") return "#f44";
        return "#eee";
    };

    const getIcon = (type) => {
        if (type === "info") return "ℹ️";
        if (type === "warning") return "⚠️";
        if (type === "danger") return "❌";
        return "";
    };

    return (
        <div
            className="mb-3 border rounded"
            style={{
                background: "#222",
                color: "#eee",
                fontFamily: "monospace",
                fontSize: 14,
                borderRadius: 8,
                border: "1px solid #333",
            }}
        >
            <div
                className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom"
                style={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    background: "#181818",
                }}
            >
                <span>
                    <strong>Console</strong>
                </span>
                <Button size="sm" variant="secondary" onClick={() => setLogs([])}>
                    Clear
                </Button>
            </div>
            <div
                className="px-3 py-2"
                style={{
                    maxHeight: 250,
                    overflowY: "auto",
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    minHeight: 40,
                    background: "#222",
                }}
            >
                {logs.length === 0 && (
                    <div className="text-secondary">No logs</div>
                )}
                <Stack gap={1}>
                    {logs.map((log) => (
                        <div
                            key={log.id}
                            className="d-flex align-items-center"
                            style={{
                                marginBottom: 2,
                                wordBreak: "break-all",
                            }}
                        >
                            <span style={{ color: getColor(log.type), marginRight: 8 }}>
                                {getIcon(log.type)}
                            </span>
                            <span>{log.msg}</span>
                        </div>
                    ))}
                </Stack>
            </div>
        </div>
    );
});

export default Console;