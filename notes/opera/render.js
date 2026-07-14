// Shared rendering used by notes/index.html and the pages under notes/types/*/index.html.

// Groups the URL fragments used to build links/images from an opus's data,
// the same way `Tag` (in tag.js) groups the known tags — one namespace
// instead of several loose top-level constants.
const BaseURL = Object.freeze({
    wikipedia: "https://en.wikipedia.org/wiki/",
    steamImage: "https://cdn.akamai.steamstatic.com/steam/apps/",
    steamImageSuffix: "/library_600x900.jpg",
    playstationImage: "https://image.api.playstation.com",
});

// Resolves an opus's box art from whichever source field is set:
// steamAppID (just the numeric App ID), playstationImagePath (the path after
// the PlayStation Store's image host), or a raw fallback `image` URL for
// anything else.
function opusImageURL(opus) {
    if (opus.steamAppID) return `${BaseURL.steamImage}${opus.steamAppID}${BaseURL.steamImageSuffix}`;
    if (opus.playstationImagePath) return BaseURL.playstationImage + opus.playstationImagePath;
    return opus.image ?? null;
}

function renderOpus(opus) {
    const article = document.createElement("article");
    article.className = "opus";

    const imageURL = opusImageURL(opus);
    if (imageURL) {
        const image = document.createElement("img");
        image.className = "opus-image";
        image.src = imageURL;
        image.alt = `${opus.title} box art`;
        article.append(image);
    }

    const title = document.createElement("h3");
    title.className = "opus-title";
    if (opus.wikipedia) {
        const link = document.createElement("a");
        link.href = BaseURL.wikipedia + opus.wikipedia;
        link.textContent = opus.title;
        title.append(link);
    } else {
        title.textContent = opus.title;
    }
    article.append(title);

    if (opus.tags?.length) {
        const tags = document.createElement("ul");
        tags.className = "opus-tags";
        for (const tag of opus.tags) {
            const li = document.createElement("li");
            li.textContent = tag;
            tags.append(li);
        }
        article.append(tags);
    }

    if (opus.rating?.catie != null || opus.rating?.jessy != null) {
        const ratings = document.createElement("div");
        ratings.className = "opus-ratings";
        for (const [key, label] of [["catie", "Catie"], ["jessy", "Jessy"]]) {
            const value = opus.rating?.[key];
            if (value == null) continue;

            const rating = document.createElement("span");
            rating.className = "opus-rating";

            const name = document.createElement("span");
            name.className = "opus-rating-name";
            name.textContent = label;

            const score = document.createElement("strong");
            score.textContent = value;

            rating.append(name, " ", score);
            ratings.append(rating);
        }
        article.append(ratings);
    }

    const notes = document.createElement("div");
    notes.className = "opus-notes";

    for (const [key, label] of [["common", "Notes"], ["catie", "Catie"], ["jessy", "Jessy"]]) {
        const text = opus.notes?.[key];
        if (!text) continue;

        const section = document.createElement("section");
        section.className = `opus-note opus-note--${key}`;

        const heading = document.createElement("h4");
        heading.textContent = label;

        const paragraph = document.createElement("p");
        paragraph.textContent = text;

        section.append(heading, paragraph);
        notes.append(section);
    }

    article.append(notes);
    return article;
}

function averageRating(opus) {
    const values = [opus.rating?.catie, opus.rating?.jessy].filter(value => typeof value === "number");
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function compareByRating(a, b) {
    const ratingA = averageRating(a);
    const ratingB = averageRating(b);
    if (ratingA === null && ratingB === null) return a.title.localeCompare(b.title);
    if (ratingA === null) return 1;
    if (ratingB === null) return -1;
    return ratingB - ratingA;
}

// Each data.js file is already kept sorted by rating at rest, so combining
// several of them is a k-way merge (O(n) across all lists) rather than an
// O(n log n) re-sort of the concatenation. Filtering a sorted array (e.g. by
// tag, elsewhere in this file) preserves order for the same reason — a
// subsequence of a sorted list is still sorted — so nothing downstream needs
// to sort again either.
function mergeSortedByRating(...lists) {
    const cursors = lists.map(() => 0);
    const total = lists.reduce((sum, list) => sum + list.length, 0);
    const merged = [];

    while (merged.length < total) {
        let bestIndex = -1;
        for (let i = 0; i < lists.length; i++) {
            if (cursors[i] >= lists[i].length) continue;
            if (bestIndex === -1 || compareByRating(lists[i][cursors[i]], lists[bestIndex][cursors[bestIndex]]) < 0) {
                bestIndex = i;
            }
        }
        merged.push(lists[bestIndex][cursors[bestIndex]]);
        cursors[bestIndex]++;
    }

    return merged;
}

// Renders `entries` (already sorted — see mergeSortedByRating above) into
// `container`, showing `emptyMessage` as a placeholder if there's nothing to show.
function renderOperaList(container, entries, emptyMessage) {
    container.innerHTML = "";

    if (entries.length) {
        for (const opus of entries) container.append(renderOpus(opus));
    } else {
        const empty = document.createElement("p");
        empty.className = "opus-empty";
        empty.textContent = emptyMessage;
        container.append(empty);
    }
}

// Renders a tag-filter button row into `filtersContainer`, driving `listContainer`
// via renderOperaList as tags are toggled (AND logic across active tags). Starts
// with nothing shown — pick a tag to see matching opera.
function renderTagFilteredOperaList(filtersContainer, listContainer, entries) {
    const allTags = [...new Set(entries.flatMap(opus => opus.tags ?? []))].sort();
    const activeTags = new Set();

    function update() {
        filtersContainer.innerHTML = "";
        for (const tag of allTags) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "opus-filter";
            button.textContent = tag;
            button.setAttribute("aria-pressed", activeTags.has(tag));
            button.addEventListener("click", () => {
                if (activeTags.has(tag)) activeTags.delete(tag);
                else activeTags.add(tag);
                update();
            });
            filtersContainer.append(button);
        }

        const visible = activeTags.size
            ? entries.filter(opus => [...activeTags].every(tag => opus.tags?.includes(tag)))
            : [];
        renderOperaList(listContainer, visible, activeTags.size ? "No matches." : "Select a tag above to see notes.");
    }

    update();
}
