---
title: "Fusion Enchanting"
weight: 6
kind: "Open-source Minecraft plugin"
label: "Built · v1.1.0"
period: "2026"
role: "Plugin developer"
filters: ["open-source"]
stack: ["Java 21", "Paper 1.21", "Maven"]
repo: "https://github.com/leap-oss/FusionEnchanting"
art: "fusion"
cover_caption: "Fusion Enchanting identity illustration · enchanted books and an anvil"
cover_alt: "Two pixel enchanted books combining above an anvil on a purple background."
summary: "36 enchantment fusions built around Minecraft’s vanilla anvil workflow."
workflow_title: "Familiar controls, new enchantment combinations."
workflow:
  - title: "Match two books"
    description: "Compatible enchantment pairs and levels form a recipe."
  - title: "Create a fusion book"
    description: "An anvil combines the source books with a small XP surcharge."
  - title: "Apply to equipment"
    description: "A second anvil action installs the fusion on a compatible item."
  - title: "Trigger its ability"
    description: "Combat, mining, movement, or utility events activate the effect."
---
## The idea

Fusion Enchanting, built as the **Enchantment Fusion** plugin, adds 36 handcrafted combinations to Minecraft survival. It expands what existing enchantments can do while keeping the anvil as the place where players create and apply them.

The current built implementation is **1.1.0**, targeting **Paper 1.21 and Java 21**.

## My role and implementation

My work covers the recipe catalog, native anvil handling, event-driven abilities, item metadata, lifecycle behavior, and validation tooling. The project connects game rules with the interactions players already use to combine books and equipment.

The catalog spans swords, bows, crossbows, tools, armor, boots, tridents, maces, fishing rods, and helmets. Each recipe defines its required enchantments, costs, activation rules, and effect.

## The enchanting workflow

Players first combine two compatible enchanted books into a fusion book, then apply that book to compatible equipment. Each item holds one fusion while its source enchantments retain their normal behavior.

**Sharpness V + Fire Aspect II**, for example, creates **Infernal Edge**. On fresh items in the documented Paper baseline:

| Action | Measured cost |
| --- | --- |
| Create the Infernal Edge book | 7 levels |
| Apply it to a fresh diamond sword | 10 levels |

Creating the book adds a recipe-specific surcharge to the vanilla calculation. Applying the book follows the vanilla cost. Actual costs vary with book order and prior anvil history.

## Native interactions and item lifecycle

The plugin supports the native anvil controls, including shift-click, right-click, and hotbar actions. It identifies fusion books and equipment through persistent item data and maintains that identity through serialization and server restarts.

Lifecycle handling covers applying a fusion book, upgrading source enchantments, clearing a fusion with a grindstone, and migrating older items. Optional recipe and inspection commands help players understand an item without becoming part of the crafting requirement.

## Ability rules and balance

Ability handlers respond to relevant combat, mining, movement, and utility events. Cooldowns, equipment checks, terrain conditions, and configured limits determine when an effect applies.

For example, some effects depend on a full attack, a particular target category, an ore block, weather, or a movement condition. These constraints keep the additional behavior tied to the item’s role.

> The design goal is deeper survival mechanics through familiar Minecraft interactions.

## Validation and current status

The local validation record covers all 36 recipe paths, native anvil transactions, ability triggers, item lifecycle behavior, and persistence across server restarts. Its baseline is Paper 1.21 build 130 with Java 21.

Broader server compatibility and long-term gameplay balance still depend on testing in the target server environment. The version shown on this page identifies the built implementation; the public repository is linked as the project’s home without implying a published release download.
