---
title: "EtherealDumpster"
weight: 4
kind: "Open-source Minecraft plugin"
label: "In development · RC"
period: "Ongoing"
role: "Plugin developer"
filters: ["open-source", "development"]
stack: ["Java 21", "Paper 1.21", "SQLite", "Maven"]
repo: "https://github.com/leap-oss/EtherealDumpster"
art: "ethereal"
cover_caption: "ED identity illustration · original Minecraft-inspired pixel landscape"
cover_alt: "Large white ED letters over an original Minecraft-inspired pixel landscape."
summary: "A shared Minecraft item pool with persistent storage, random discovery, and player milestones."
workflow_title: "One player’s leftovers, another’s discovery."
workflow:
  - title: "Deposit stacks"
    description: "Players place unwanted stacks into a dedicated inventory menu."
  - title: "Save to the pool"
    description: "Finalized deposits enter a shared, persistent SQLite pool."
  - title: "Dive and claim"
    description: "Players browse a random sample and claim available stacks."
  - title: "Track contributions"
    description: "Completed exchanges contribute to milestones and cosmetic titles."
---
## The idea

EtherealDumpster turns unwanted Minecraft items into a shared resource. Players deposit whole stacks, then dive into a random selection of stacks left by other players on the server.

The pool contains player deposits. Its discovery mechanic comes from sampling what is already there, giving discarded items another chance to be useful.

## My role and implementation

The work spans the inventory interfaces, core services, SQLite storage, recovery paths, and player progression. The plugin targets **Paper 1.21 and Java 21**, with Maven handling the build and bundled SQLite JDBC dependency.

The repository now describes the implementation as a **release candidate**. Development and real-server acceptance checks are still part of its current status.

## Deposit, discovery, and returns

Players open the main menu with `/dumpster`, `/dump`, or `/ed`. The deposit inventory lets them move stacks in and out before closing the menu to finalize the deposit. The dive view offers a random sample, with a cooldown before refreshing it.

When a player claims a stack, the database reserves that entry for one claimant. If inventory capacity prevents delivery, the claim is released so the player can make room and retry.

Blacklisted or overflow items enter private returns instead of silently disappearing. Returns can be retried on login or through `/dumpster recover`.

## Ownership and persistence

Each stored stack has its own UUID and serialized item data. Conditional SQLite writes coordinate competing claims, while delivery states distinguish an available item, a reserved item, and a completed claim.

The implementation uses a deposit journal before clearing inventory contents. Uncertain deliveries remain recorded for recovery instead of being automatically handed out again.

> A shared inventory needs a clear answer to one question: who owns this exact stack now?

The random-sampling strategy also avoids reading and shuffling the entire pool. It uses an indexed pivot and wraparound to read a bounded set of entries for a dive view.

## Milestones and profiles

Players earn progress for rescuing another player’s deposits and for contributing deposits that another player claims. Two milestone tracks unlock cosmetic titles shown inside Dumpster menus.

Profiles show totals, the selected title, and the next goal. Players can make their profile public or anonymous. This progression layer does not award money or items.

## Current scope and verification

Repository checks cover persistence, concurrent claims, rollback, returns, expiration, journal recovery, inventory capacity, and GUI cancellation behavior.

The documented release gates still include native item-metadata and two-player acceptance checks on a real Paper server. Folia is not supported by the current implementation. The source and recovery guide provide the current details for testing and operating the plugin.
