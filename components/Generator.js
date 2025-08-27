import React, { useState, useRef, useEffect } from "react";
import Feed from "../utils/Feed";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function Generator() {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const feedRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
    }, [status]);

    const handleRun = async () => {
        if (!feedRef.current) {
            feedRef.current = new Feed();
            feedRef.current.on("status", (msg) => {
                setStatus((prev) => prev + msg + "\n");
            });
        }
        setStatus(""); // Clear previous status
        setLoading(true);
        try {
            await feedRef.current.run();
        } catch (err) {
            setStatus((prev) => prev + "❌ " + err.message + "\n");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                variant="primary"
                onClick={handleRun}
                className="mb-3"
                block="true"
                disabled={loading}
            >
                {loading ? "Running..." : "Run Generator"}
            </Button>
            <Form>
                <Form.Control
                    as="textarea"
                    ref={textareaRef}
                    value={status}
                    readOnly
                    rows={15}
                    style={{ resize: "vertical" }}
                />
            </Form>
        </>
    );
}

export default Generator;