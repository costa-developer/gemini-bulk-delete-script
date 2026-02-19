async function deleteAllGeminiChats() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let deleted = 0;

    while (true) {
        // Select first chat
        const chats = document.querySelectorAll('a[data-test-id="conversation"]');
        if (!chats.length) {
            console.log("No more chats found.");
            break;
        }

        const chat = chats[0];
        chat.click();
        await delay(1500);

        // Click 3-dot menu (More actions)
        const moreBtn = document.querySelector('button[data-test-id="actions-menu-button"]');
        if (!moreBtn) {
            console.log("More button not found.");
            break;
        }

        moreBtn.click();
        await delay(800);

        // Click Delete option
        const deleteOption = Array.from(document.querySelectorAll('span'))
            .find(el => el.textContent.trim() === "Delete");

        if (!deleteOption) {
            console.log("Delete option not found.");
            break;
        }

        deleteOption.click();
        await delay(800);

        // Confirm delete
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
