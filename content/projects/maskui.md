---
title: "MaskUI"
weight: 2
kind: "Open-source Minecraft plugin"
label: "Open source"
period: "Ongoing"
role: "Plugin developer"
filters: ["open-source"]
stack: ["Java", "Paper / Bukkit", "Vault", "Maven"]
repo: "https://github.com/leap-oss/MaskUI"
website: "https://modrinth.com/plugin/maskui"
website_label: "Modrinth listing"
art: "maskui"
logo: "images/logos/maskui.gif"
logo_remote: "https://raw.githubusercontent.com/leap-oss/MaskUI/refs/heads/paper/icon.gif"
cover_caption: "MaskUI project logo"
cover_alt: "The animated MaskUI Minecraft head logo."
summary: "Wearable masks and custom mechanics that add another layer to Minecraft survival."
workflow_title: "A mask is more than a mob head."
workflow:
  - title: "Browse the shop"
    description: "Players inspect masks, effects, prices, and purchase availability."
  - title: "Confirm a purchase"
    description: "The plugin rechecks the price, balance, and inventory space."
  - title: "Equip a mask"
    description: "Right-clicking a tagged mask equips one into an empty helmet slot."
  - title: "Apply its effects"
    description: "Effects follow the worn mask and are removed when it is taken off."
---
## The idea

MaskUI gives Minecraft mob heads a gameplay role. Players purchase wearable masks through an inventory shop, equip them in the helmet slot, and receive effects associated with that mask.

The Paper implementation includes seven mask types: Skeleton, Zombie, Creeper, Piglin, Steve, Wither Skeleton, and Dragon. Their roles range across exploration, mobility, mining, durability, and combat.

## My role and the Paper port

My work includes bringing the original PocketMine-MP concept into the Java/Paper ecosystem and continuing the plugin’s gameplay and inventory workflows.

That port involves more than changing a language. Java Edition inventory menus replace Bedrock forms, Vault supplies the economy integration, and namespaced persistent tags identify genuine masks independently of their display names.

## The player experience

The shop shows a player’s balance, mask prices, effects, and purchase availability. A separate confirmation step rechecks the transaction before completing a purchase.

Players can right-click a tagged mask in either hand to equip one item into an empty helmet slot. The plugin leaves an occupied helmet in place. Removing or changing a mask updates its effects, while potion effects from other sources are respected.

Commands such as `/mask wiki`, `/mask status`, and `/mask sell` provide effect information, the current worn mask, and eligible refund options.

## Item identity and economy rules

An ordinary renamed mob head does not become a functional mask. Persistent tags connect the item to the plugin’s own mask definitions.

New purchases also receive unique receipts recording the mask type, paid price, and redemption state. Selling requires the matching physical item and an eligible receipt. Refunds use the original price, and the same receipt can pay out once across restarts or duplicated items.

> The hard part is keeping the item, the economy transaction, and the saved receipt consistent.

Vault does not provide a transaction shared with inventory and plugin files. The implementation therefore journals money-changing operations and leaves interrupted or uncertain trades for recovery instead of automatically replaying them.

## Configuration and compatibility

Server owners can configure prices, messages, and refund percentages. Purchases require Vault and a compatible economy provider; the rest of the menus and commands remain available when an economy provider is missing.

The current branch targets the Spigot/Paper API with Java 8-compatible bytecode and uses Maven for builds. The repository explains its target version range and the remaining runtime compatibility checks.

## Explore the project

The Paper branch contains the current source and installation guide. The Modrinth listing is linked above for the project’s published distribution information. Together, they show the gameplay features and the persistence, inventory, and economy work behind them.
