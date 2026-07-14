// Each opus is a piece of media we have notes on.
// wikipedia should be included whenever a Wikipedia page exists for the opus.
// steamAppID (number) or playstationImagePath (string, the path after
// image.api.playstation.com) provide box art automatically. Use a raw `image`
// URL only if neither store has it.
// notes.common/catie/jessy are all optional; include only the sections that apply.
// rating.catie/jessy are each a whole number 0-100 (no decimals), optional. Shown on the card, and used to
// sort the list by average rating (entries with no rating sort last).
// played.catie/jessy are each an optional "YYYY-MM" string — the month that person
// most recently played it. Not shown to visitors; internal data only, like rating.
// tags: Video Game is automatic (this file implies it) — set opus.tags only for
// anything additional (e.g. a genre tag).
const singlePlayerVideoGames = [
    {
        title: "Until Dawn",
        steamAppID: 2172010,
        wikipedia: "Until_Dawn",
        rating: { catie: 70, jessy: 75 },
        played: { catie: "2019-01", jessy: "2019-01" },
    },
].map(opus => ({
    ...opus,
    tags: [Tag.VideoGame, ...(opus.tags ?? [])],
}));
