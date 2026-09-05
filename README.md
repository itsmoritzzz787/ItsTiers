# ItsTiers — JSON-powered website

This is the source of the existing ItsTiers website, updated to read player data from `website-tiers.json`. It keeps the original images and theme. No build tools or backend are required for the website.

## Upload to your existing GitHub Pages repository

1. Back up the current repository files.
2. Extract the website ZIP.
3. Upload its contents to the same repository directory as your current `index.html`. Replace `index.html`, `script.js`, and `style.css`. Add `tier-display.js` and `website-tiers.json`.
4. Keep the original image files in that directory; the ZIP also contains copies.
5. Commit the changes and let your existing GitHub Pages deployment finish. Keep your current Pages publishing settings.
6. Open the website and refresh it after deployment.

The main files must be beside each other, rather than inside an extra nested folder:

```text
index.html
script.js
style.css
tier-display.js
website-tiers.json
IMG_20260816_141402.png
file_00000000e31081f48ec3e5cd75b98357.png
```

Do not upload the Discord bot, its token, or the private `tiers.json` to this website repository.

## Update player results

On the computer or hosting service running your bot:

```sh
node export-site.js
```

This reads the bot's current `tiers.json` and updates `website-tiers.json`. Upload that generated file to the website repository, replacing the previous copy. After GitHub Pages publishes the change, reload the website.

**The included bot does not automatically upload files to GitHub.** Exporting and uploading remain manual until a separate synchronization step is configured. The website reads data on page load; it does not poll in the background.

## How the website works

- `index.html` contains the page structure, tabs, loading/error states, and profile dialog.
- `script.js` loads `./website-tiers.json` and generates Overall, all 10 gamemode tables, search results, and profiles from the same dataset.
- `tier-display.js` calculates points, peak descriptions, tooltips, and ranking positions. It also creates tier badges.
- `website-tiers.json` stores player facts only. Points, totals, titles, ranks, and tooltip text are not stored in it.

Example:

```json
{
  "schemaVersion": 2,
  "players": [
    {
      "minecraft": "ExamplePlayer",
      "region": "EU",
      "tiers": {
        "sword": { "tier": "LT4", "peakTier": "HT3" }
      }
    }
  ]
}
```

This player displays LT4 in Sword, a `Peak HT3` tooltip, and 10 points. Peak points count once per gamemode. Current tiers determine gamemode table positions. Retired records retain points and appear in Overall/profiles, but are excluded from active gamemode tables. Unranked and Retest are also excluded from active tier tables; their saved peaks still count toward Overall.

Supported modes: `crystal`, `uhc`, `pot`, `nethpot`, `smp`, `sword`, `axe`, `mace`, `chaosmace`, `spearmace`.

## Scoring and titles

Edit `POINTS_BY_TIER` in `tier-display.js` to change scoring. HT1=60 and HT2=30 remain provisional; the other values follow the original website. The highest tier is determined by tier order, independently of point values.

Player titles are calculated in `script.js`, using `TITLES`: Combat Ace at 100 points, Combat Specialist at 50, Combat Cadet at 20, Combat Novice at 10, and Rookie below 10. These thresholds replace inconsistent manually assigned titles in the old page.

The imported data contains 67 players and 300 gamemode records, including 17 explicitly marked peaks and 3 retired records. No player data remains hardcoded in the HTML or JavaScript.

## Local preview

Serve the directory over HTTP rather than opening `index.html` through `file://`:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. A missing, invalid, or inaccessible JSON file shows an error with a retry button. An empty player list shows an empty state.

## Validation and publication

Syntax and Node/jsdom integration tests cover all imported players, peak scoring, table placement, retired records, JSON-only updates, search, profiles, empty data, malformed data, and failed requests with retry. No browser visual testing was performed.

These files have not been committed or pushed to your GitHub repository, and your public website has not been changed by this download.

Original source: https://github.com/itsmoritzzz787/ItsTiers
