---

# Gemini Chat Deleter

A lightweight JavaScript automation script designed to clean up your Google Gemini conversation history. Since Gemini currently lacks a "Delete All" button in the interface, this script automates the manual clicking process for you.

##  Warning

**This script will permanently delete your chats.** There is no "Undo" once a chat is removed. Use this at your own risk. It is recommended to run this while you are actively watching the tab to ensure it is performing as expected.

---

## How It Works

The script runs directly in your browser's console. It:

1. Locates the first chat in your sidebar.
2. Opens the "More actions" (three-dot) menu.
3. Selects the **Delete** option.
4. Confirms the deletion.
5. Repeats until no more chats are found.

---

## Usage Instructions

### 1. Open Gemini

Navigate to [gemini.google.com](https://gemini.google.com) and ensure you are logged in.

### 2. Open Developer Tools

Right-click anywhere on the page and select **Inspect**, or use the keyboard shortcuts:

* **Windows/Linux:** `F12` or `Ctrl + Shift + J`
* **macOS:** `Cmd + Option + J`

### 3. Paste the Script

Click on the **Console** tab at the top of the Developer Tools window. Copy the code below, paste it into the console, and hit **Enter**:

```javascript
// Copy the code from your script here
async function deleteAllGeminiChats() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let deleted = 0;

    while (true) {
        const chats = document.querySelectorAll('a[data-test-id="conversation"]');
        if (!chats.length) {
            console.log("No more chats found.");
            break;
        }

        const chat = chats[0];
        chat.click();
        await delay(1500);

        const moreBtn = document.querySelector('button[data-test-id="actions-menu-button"]');
        if (!moreBtn) {
            console.log("More button not found.");
            break;
        }

        moreBtn.click();
        await delay(800);

        const deleteOption = Array.from(document.querySelectorAll('span'))
            .find(el => el.textContent.trim() === "Delete");

        if (!deleteOption) {
            console.log("Delete option not found.");
            break;
        }

        deleteOption.click();
        await delay(800);

        const confirmBtn = Array.from(document.querySelectorAll('button'))
            .find(el => el.textContent.trim() === "Delete");

        if (!confirmBtn) {
            console.log("Confirm button not found.");
            break;
        }

        confirmBtn.click();
        deleted++;
        console.log(`Deleted chats: ${deleted}`);

        await delay(2000);
    }
    console.log("Finished deleting all chats.");
}

deleteAllGeminiChats();

```

### 4. Let it Run

Keep the tab open and active. You will see the script progress through your chats and log the count in the console.

---

## Troubleshooting

* **Slow Internet:** If your connection is slow, the script might try to click buttons before they load. You can increase the `delay` values (e.g., change `1500` to `3000`) in the code.
* **UI Updates:** Google frequently updates the Gemini interface. If the script stops working, the `data-test-id` attributes may have changed.

## License

MIT

---
