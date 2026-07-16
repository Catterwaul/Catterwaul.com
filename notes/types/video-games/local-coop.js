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
// tags: Video Game, Local Multiplayer, and Cooperative Game are automatic (this file
// implies them) — set opus.tags only for anything additional (e.g. a genre tag).
const localCoopVideoGames = [
    {
        title: "Resident Evil 5",
        steamAppID: 21690,
        wikipedia: "Resident_Evil_5",
        tags: [Tag.BodyHorror],
        rating: { catie: 100, jessy: 100 },
    },
    {
        title: "Overcooked",
        steamAppID: 448510,
        wikipedia: "Overcooked!",
        rating: { catie: 80, jessy: 85 },
        played: { catie: "2019-04", jessy: "2019-04" },
    },
    {
        title: "X-Morph: Defense",
        steamAppID: 408410,
        rating: { catie: null, jessy: 78 },
        played: { catie: null, jessy: "2026-06" },
    },
    {
        title: "39 Days to Mars",
        steamAppID: 504920,
        rating: { catie: 75, jessy: 70 },
        played: { catie: "2026-02", jessy: "2026-02" },
    },
    {
        title: "Dark Pictures: Little Hope",
        steamAppID: 1194630,
        wikipedia: "Little_Hope_(video_game)",
        tags: [Tag.FolkHorror],
        rating: { catie: 60, jessy: 60 },
        played: { catie: "2020-11", jessy: "2020-11" },
    },
    {
        title: "Dark Pictures: House of Ashes",
        steamAppID: 1281590,
        wikipedia: "The_Dark_Pictures_Anthology:_House_of_Ashes",
        rating: { catie: 60, jessy: 55 },
        played: { catie: "2021-10", jessy: "2021-10" },
    },
    {
        title: "Dark Pictures: The Devil in Me",
        steamAppID: 1567020,
        wikipedia: "The_Dark_Pictures_Anthology:_The_Devil_in_Me",
        rating: { catie: 55, jessy: 60 },
        played: { catie: "2026-01", jessy: "2026-01" },
    },
    {
        title: "Dark Pictures: Man of Medan",
        steamAppID: 939850,
        wikipedia: "Man_of_Medan",
        rating: { catie: 50, jessy: 55 },
        played: { catie: "2019-10", jessy: "2019-10" },
    },
    {
        title: "PixelJunk Monsters",
        wikipedia: "PixelJunk_Monsters",
        rating: { catie: null, jessy: null },
    },
    {
        title: "Spiritfarer",
        steamAppID: 972660,
        wikipedia: "Spiritfarer",
        rating: { catie: null, jessy: null },
        played: { catie: "2026-07", jessy: "2026-07" },
    },
    {
        title: "Super Smash Bros.",
        wikipedia: "Super_Smash_Bros.",
        rating: { catie: null, jessy: null },
    },
    {
        title: "The Quarry",
        steamAppID: 1577120,
        wikipedia: "The_Quarry_(video_game)",
        rating: { catie: null, jessy: null },
    },
].map(opus => ({
    ...opus,
    tags: [Tag.VideoGame, Tag.LocalMultiplayer, Tag.CooperativeGame, ...(opus.tags ?? [])],
}));
