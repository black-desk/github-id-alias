chrome.storage.sync.get({ aliases: {} }, (items) => {
        var element = document.getElementsByClassName("vcard-names")[0];
        if (element == undefined) {
                return
        }

        const name = element.children[1].innerHTML.trim()
        var span = document.createElement("span")
        span.setAttribute("class", "p-nickname vcard-username d-block")

        const alias = items.aliases[name]
        if (alias == undefined) {
                return
        }
        span.innerHTML = alias
        element.appendChild(span)
})
