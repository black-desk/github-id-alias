import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

async function updateAliases(url: string) {
        const aliases = await (await fetch(url)).json()

        chrome.storage.sync.set({
                aliases: aliases
        })
}


const Options = () => {
        const [url, setUrl] = useState<string>("");
        const [status, setStatus] = useState<string>("");

        useEffect(() => {
                // Restores select box and checkbox state using the preferences
                // stored in chrome.storage.
                chrome.storage.sync.get(
                        { aliasesURL: "" },
                        (items) => { setUrl(items.aliasesURL); }
                );
        }, []);

        const saveOptions = () => {
                // Saves options to chrome.storage.sync.
                chrome.storage.sync.set({ aliasesURL: url }, () => {
                        // Update status to let user know options were saved. 
                        setStatus("Options saved.");
                        updateAliases(url)
                        const id = setTimeout(() => {
                                setStatus("");
                        }, 1000);
                        return () => clearTimeout(id);
                });
        };

        return (
                <>
                        <div>
                                aliases json url: <input
                                        type="url"
                                        value={url}
                                        onChange={(event) => { setUrl(event.target.value) }}
                                />
                        </div>
                        <div>{status}</div>
                        <button onClick={saveOptions}>Save</button>
                </>
        );
};

ReactDOM.render(
        <React.StrictMode>
                <Options />
        </React.StrictMode>,
        document.getElementById("root")
);
