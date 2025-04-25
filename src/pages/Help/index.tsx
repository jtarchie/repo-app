import { FunctionComponent } from "preact";

export const Help: FunctionComponent = () => {
  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">
        Guide to Editing R.E.P.O. Game Save Files
      </h1>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">What Is This File?</h2>
        <p class="mb-4">
          This is a JSON save file for the game R.E.P.O. It contains all your
          game progress, including:
        </p>
        <ul class="list-disc pl-8 mb-4">
          <li>Team information</li>
          <li>Player stats and upgrades</li>
          <li>Items owned</li>
          <li>Game progress data</li>
          <li>Currency and resources</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">
          Structure Basics for Non-Technical Users
        </h2>
        <p class="mb-4">Think of this file as a series of nested containers:</p>
        <ul class="pl-8 mb-4">
          <li>
            <strong>{}</strong> = A container that holds related information
          </li>
          <li>
            <strong>[ ]</strong> = A list of items
          </li>
          <li>
            <strong>"name": value</strong> = A setting and its value
          </li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Main Sections You Can Edit</h2>

        <h3 class="text-xl font-medium mb-2">Team and Game Progress</h3>
        <pre class="bg-gray-100 dark:bg-gray-800 p-3 mb-4 overflow-auto rounded text-black dark:text-white">
{`"teamName": "R.E.P.O."
"timePlayed": 17006.0645
"dateAndTime": "2025-04-18"`}
        </pre>
        <p class="mb-4">
          These values control your team name and tracked playtime.
        </p>

        <h3 class="text-xl font-medium mb-2">Run Statistics</h3>
        <pre class="bg-gray-100 dark:bg-gray-800 p-3 mb-4 overflow-auto rounded text-black dark:text-white">
{`"runStats": {
  "level": 9,
  "currency": 2,
  "lives": 3,
  ...
}`}
        </pre>
        <p class="mb-4">This section controls your current:</p>
        <ul class="list-disc pl-8 mb-4">
          <li>Level progress</li>
          <li>Available currency</li>
          <li>Remaining lives</li>
          <li>Total haul (collected resources)</li>
        </ul>

        <h3 class="text-xl font-medium mb-2">Player Information</h3>
        <pre class="bg-gray-100 dark:bg-gray-800 p-3 mb-4 overflow-auto rounded text-black dark:text-white">
{`"playerHealth": { ... }
"playerUpgradeHealth": { ... }`}
        </pre>
        <p class="mb-4">
          Each player is identified by a numeric ID. Changing values here
          affects:
        </p>
        <ul class="list-disc pl-8 mb-4">
          <li>Current health</li>
          <li>Upgrade levels for various attributes</li>
          <li>Special abilities</li>
        </ul>

        <h3 class="text-xl font-medium mb-2">Item Inventories</h3>
        <pre class="bg-gray-100 dark:bg-gray-800 p-3 mb-4 overflow-auto rounded text-black dark:text-white">
{`"itemsPurchased": { ... }
"itemsPurchasedTotal": { ... }`}
        </pre>
        <p class="mb-4">
          These track what items you currently have and have acquired throughout
          the game.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">How to Edit Using This App</h2>
        <ol class="list-decimal pl-8 mb-4">
          <li>
            <strong>Navigate</strong>{" "}
            to the value you want to modify in the editor
          </li>
          <li>
            <strong>Change only the numbers</strong>{" "}
            after the colon, never the text in quotes
          </li>
          <li>
            <strong>Save your changes</strong> using the save button
          </li>
        </ol>

        <h3 class="text-xl font-medium mb-2">Quick Editing Examples:</h3>
        <ul class="pl-8 mb-4">
          <li>
            To give yourself more lives: Find{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "lives": 3,
            </code>{" "}
            and change to{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "lives": 99,
            </code>
          </li>
          <li>
            To add currency: Find{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "currency": 2,
            </code>{" "}
            and change to{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "currency": 9999,
            </code>
          </li>
          <li>
            To get an item: Find{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "Item Power Crystal": 0,
            </code>{" "}
            and change to{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "Item Power Crystal": 1,
            </code>
          </li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Important Warnings</h2>
        <ol class="list-decimal pl-8 mb-4">
          <li>
            <strong>ALWAYS CREATE A BACKUP</strong>{" "}
            using the backup feature before editing
          </li>
          <li>
            <strong>Don't add commas</strong> where there aren't any already
          </li>
          <li>
            <strong>Don't delete any quotes, colons, or brackets</strong>
          </li>
          <li>
            <strong>Keep numbers as numbers</strong>{" "}
            (don't add quotes around them)
          </li>
          <li>
            <strong>Be careful with very large values</strong>{" "}
            - the game might have limits
          </li>
        </ol>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Advanced Editing Tips</h2>
        <ul class="pl-8 mb-4">
          <li>
            Multiple items: Change{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "Item Health Pack Large": 1,
            </code>{" "}
            to{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "Item Health Pack Large": 10,
            </code>
          </li>
          <li>
            Max upgrades: Look for player upgrade sections and set values higher
          </li>
          <li>
            Battery levels: Find{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              itemStatBattery
            </code>{" "}
            section and set values to{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              100
            </code>{" "}
            for full charge
          </li>
        </ul>
        <p>
          If something goes wrong after editing, you can always restore your
          backup from within the app.
        </p>
      </section>
    </div>
  );
};
