import { FunctionComponent } from "preact";

export const Help: FunctionComponent = () => {
  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">
        How to Edit R.E.P.O. Game Save Files: A Simple Guide
      </h1>

      <p class="mb-6">
        This guide will help you understand and edit your R.E.P.O. game save
        file even if you're not familiar with JSON files.
      </p>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Understanding JSON Basics</h2>
        <p class="mb-4">
          Your save file is in JSON format, which is organized as:
        </p>
        <ul class="list-disc pl-8 mb-4">
          <li>
            Each entry has a <strong>name</strong> (on the left of the colon)
          </li>
          <li>
            Each entry has a <strong>value</strong> (on the right of the colon)
          </li>
          <li>
            Values inside curly braces{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              {}
            </code>{" "}
            are grouped together
          </li>
          <li>Each entry ends with a comma (except for the last one)</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">
          Important Field Relationships
        </h2>
        <p class="mb-4">
          <strong class="text-red-600 dark:text-red-400">Critical:</strong>{" "}
          Several fields must be edited together to maintain consistency:
        </p>

        <div class="mb-4">
          <h3 class="text-xl font-medium mb-2">1. Inventory Items:</h3>
          <ul class="list-disc pl-8 mb-2">
            <li>
              When changing{" "}
              <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
                itemsPurchased
              </code>, you must also update{" "}
              <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
                itemsPurchasedTotal
              </code>
            </li>
            <li>
              Always ensure{" "}
              <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
                itemsPurchasedTotal
              </code>{" "}
              is equal to or greater than{" "}
              <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
                itemsPurchased
              </code>
            </li>
          </ul>
        </div>

        <div class="mb-4">
          <h3 class="text-xl font-medium mb-2">2. Upgrade Items:</h3>
          <ul class="list-disc pl-8 mb-2">
            <li>
              When changing player upgrade values in{" "}
              <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
                itemsUpgradesPurchased
              </code>, make sure to update related player stat fields if present
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-medium mb-2">3. Item Instances:</h3>
          <ul class="list-disc pl-8">
            <li>
              For specific item instances, changes in the{" "}
              <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
                item
              </code>{" "}
              section should be consistent with their battery levels in{" "}
              <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
                itemStatBattery
              </code>
            </li>
          </ul>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">
          Field-by-Field Editing Guide
        </h2>

        <div class="mb-6">
          <h3 class="text-xl font-medium mb-2">
            1.{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              itemsPurchased
            </code>{" "}
            and{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              itemsPurchasedTotal
            </code>
          </h3>
          <p class="mb-2">
            <strong>What they are:</strong>
          </p>
          <ul class="list-disc pl-8 mb-2">
            <li>
              <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
                itemsPurchased
              </code>: Your current inventory of items
            </li>
            <li>
              <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
                itemsPurchasedTotal
              </code>: Historical record of all items ever purchased
            </li>
          </ul>
          <p class="mb-2">
            <strong>How to edit together:</strong>
          </p>
          <pre class="bg-gray-100 dark:bg-gray-800 p-3 mb-4 overflow-auto rounded text-black dark:text-white">
{`"itemsPurchased": {
  "Item Grenade Explosive": 5,  // Changed from 1 to 5
},
"itemsPurchasedTotal": {
  "Item Grenade Explosive": 10,  // Must be at least 5 (the value in itemsPurchased)
},`}
          </pre>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-medium mb-2">
            2.{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              itemsUpgradesPurchased
            </code>
          </h3>
          <p class="mb-2">
            <strong>What it is:</strong>{" "}
            How many upgrades you've applied to each upgrade-type item.
          </p>
          <p class="mb-2">
            <strong>How to edit:</strong>
          </p>
          <ul class="list-disc pl-8 mb-2">
            <li>
              For player upgrades, change the number to boost your character's
              abilities
            </li>
            <li>Values typically range from 0-11</li>
          </ul>
          <p class="mb-2">
            <strong>Example:</strong>
          </p>
          <pre class="bg-gray-100 dark:bg-gray-800 p-3 mb-4 overflow-auto rounded text-black dark:text-white">
{`"itemsUpgradesPurchased": {
  "Item Upgrade Player Health": 10,  // Changed from 7 to 10
  "Item Upgrade Player Energy": 11,
},`}
          </pre>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-medium mb-2">
            3.{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              itemBatteryUpgrades
            </code>
          </h3>
          <p class="mb-2">
            <strong>What it is:</strong>{" "}
            Tracks battery upgrade levels for battery-powered items.
          </p>
          <p class="mb-2">
            <strong>How to edit:</strong>
          </p>
          <ul class="list-disc pl-8 mb-2">
            <li>Most items will be 0</li>
            <li>For items with batteries, values typically range from 0-3</li>
          </ul>
          <p class="mb-2">
            <strong>Example:</strong>
          </p>
          <pre class="bg-gray-100 dark:bg-gray-800 p-3 mb-4 overflow-auto rounded text-black dark:text-white">
{`"itemBatteryUpgrades": {
  "Item Drone Battery": 2,  // Changed from 0 to 2
},`}
          </pre>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-medium mb-2">
            4.{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              itemStatBattery
            </code>
          </h3>
          <p class="mb-2">
            <strong>What it is:</strong>{" "}
            Battery charge percentage for specific item instances.
          </p>
          <p class="mb-2">
            <strong>How to edit:</strong>
          </p>
          <ul class="list-disc pl-8 mb-2">
            <li>Values should be between 0-100 (percentage)</li>
          </ul>
          <p class="mb-2">
            <strong>Example:</strong>
          </p>
          <pre class="bg-gray-100 dark:bg-gray-800 p-3 mb-4 overflow-auto rounded text-black dark:text-white">
{`"itemStatBattery": {
  "Item Drone Battery/1": 100,  // Changed from 99 to 100
},`}
          </pre>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-medium mb-2">
            5.{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              item
            </code>
          </h3>
          <p class="mb-2">
            <strong>What it is:</strong>{" "}
            Tracks individual item instances in the game world.
          </p>
          <p>
            <strong>
              This section is complex and best left unchanged unless you know
              what you're doing.
            </strong>
          </p>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">
          Step-by-Step Example: Adding Items
        </h2>
        <p class="mb-4">
          Let's say you want to give yourself 5 explosive grenades:
        </p>
        <ol class="list-decimal pl-8 mb-4">
          <li>
            Find the{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              itemsPurchased
            </code>{" "}
            section
          </li>
          <li>
            Change{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "Item Grenade Explosive": 1,
            </code>{" "}
            to{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "Item Grenade Explosive": 5,
            </code>
          </li>
          <li>
            Find the{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              itemsPurchasedTotal
            </code>{" "}
            section
          </li>
          <li>
            Ensure{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "Item Grenade Explosive"
            </code>{" "}
            is at least 5, if not make it{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              5
            </code>{" "}
            or higher
          </li>
        </ol>

        <pre class="bg-gray-100 dark:bg-gray-800 p-3 mb-4 overflow-auto rounded text-black dark:text-white">
{`"itemsPurchased": {
  // Other items...
  "Item Grenade Explosive": 5,  // Changed from 1 to 5
  // Other items...
},
"itemsPurchasedTotal": {
  // Other items...
  "Item Grenade Explosive": 10,  // Must be at least 5
  // Other items...
},`}
        </pre>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">
          Step-by-Step Example: Upgrading Player Stats
        </h2>
        <p class="mb-4">If you want to max out your health upgrades:</p>
        <ol class="list-decimal pl-8 mb-4">
          <li>
            Find the{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              itemsUpgradesPurchased
            </code>{" "}
            section
          </li>
          <li>
            Change{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "Item Upgrade Player Health": 7,
            </code>{" "}
            to{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-black dark:text-white">
              "Item Upgrade Player Health": 11,
            </code>
          </li>
          <li>If there are related player stat fields, update those too</li>
        </ol>

        <pre class="bg-gray-100 dark:bg-gray-800 p-3 mb-4 overflow-auto rounded text-black dark:text-white">
{`"itemsUpgradesPurchased": {
  // Other items...
  "Item Upgrade Player Health": 11,  // Changed from 7 to 11
  // Other items...
},
"playerUpgradeHealth": {
  "76561198024378942": 7,  // Update this if needed
  "76561198078417480": 7   // Update this if needed
}`}
        </pre>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Important Tips</h2>
        <ul class="list-disc pl-8 mb-4">
          <li>
            <strong>Always make a backup</strong> before editing
          </li>
          <li>
            <strong>Test small changes first</strong> before making major edits
          </li>
          <li>
            <strong>Keep values reasonable</strong> to avoid breaking the game
          </li>
          <li>
            <strong>Don't change item names, only their values</strong>
          </li>
          <li>
            <strong>Maintain field relationships</strong> as described above
          </li>
          <li>
            <strong>Don't remove entries or change formatting</strong>{" "}
            (commas, quotes, etc.)
          </li>
        </ul>

        <p>
          Remember: If your save file stops working after editing, restore from
          your backup and try again with more modest changes.
        </p>
      </section>
    </div>
  );
};
