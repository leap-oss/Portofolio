---
title: "DealMile"
weight: 1
kind: "Fullstack web application"
label: "Built project"
period: "2026"
role: "Fullstack developer"
filters: ["web", "open-source"]
stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Gemini API", "PayPal Sandbox"]
repo: "https://github.com/leap-oss/DealMile"
demo: "https://dealmile.skulz.cloud/"
workflow_title: "From a brief to an agreed delivery."
workflow:
  - title: "Describe the project"
    description: "A client starts with requirements, a budget, and a target deadline."
  - title: "Agree on the plan"
    description: "AI-assisted drafts become editable proposals reviewed by both parties."
  - title: "Deliver milestones"
    description: "Developers submit work against the agreed scope and delivery window."
  - title: "Review and resolve"
    description: "Clients approve, request revisions, or review a proposed scope change."
art: "dealmile"
logo: "images/logos/dealmile.svg"
logo_remote: "https://raw.githubusercontent.com/leap-oss/DealMile/9869d7230fdcad43a597a6241bd4ff2fcc695004/app/icon.svg"
cover_caption: "DealMile project logo"
cover_alt: "The DealMile logo, with three ascending orange bars."
summary: "AI-assisted project scoping and milestone workflows for client–developer collaboration."
---
## The problem

A project can start with a promising idea and still become difficult to deliver when scope, expectations, and changes are scattered across conversations. DealMile brings the agreement and the work into one shared workflow for clients and developers.

The aim is to make the next step clear: what has been proposed, what both parties have accepted, what is being delivered, and what needs a decision.

## My role and contribution

My work spans the fullstack application: the public interface, private client and developer workspaces, project forms, data models, and integrations for planning and Sandbox payments.

The application supports registration and login, editable project drafts, developer assignment, proposal review, milestone delivery, revisions, and scope-change proposals. Each side has its own responsibilities while working from the same agreement history.

## AI planning with human approval

Gemini helps turn a brief into a structured proposal containing scope, milestones, budget recommendations, and estimated timing. The provider adapter requests structured JSON, and Zod validates the response before it becomes a saved draft.

Clients can edit the result before submission. Developers can review, reject, accept, or propose revisions, with revised agreements requiring client approval.

> AI helps prepare the plan. The client and developer make the agreement.

This distinction also applies to scope changes: analysis can help explain the impact, while an additional proposal still needs human review and acceptance.

## Architecture and state transitions

The interface uses **Next.js, React, TypeScript, and Tailwind CSS**, with **Prisma and PostgreSQL** for persistence. Server Components are the default; authentication, provider requests, database access, and financial transitions run on the server.

The code separates authentication, project rules, AI planning, and payments into focused modules. Server-enforced transitions and database transactions coordinate approvals and preserve project activity instead of letting the browser assign arbitrary statuses.

Developer assignment also considers unfinished workload. Selection and project creation share a transaction, which matters when multiple clients create drafts at the same time.

## Delivery, changes, and payments

Milestone delivery includes submission, revision, and approval. Delivery windows are tied to verified funding and agreed estimated days. Schedule views distinguish active delivery dates from tentative future work, and proposed extensions require client approval.

Payment integration uses **PayPal Sandbox**. Orders are created on the server; capture details are read back from PayPal and checked against the expected milestone, amount, currency, and recipient. Returning from checkout alone does not mark work as funded.

The project also implements agreed cancellation and refund workflows. The current setup uses one configured Sandbox merchant and does not hold client funds or provide a multi-seller marketplace.

## Explore the project

Open the live demo to explore the public experience, or inspect the repository for the implementation and setup instructions. The repository documents unit, database integration, and browser checks, along with the current boundaries of the payment and account workflows.

This project brings together the parts of fullstack development I enjoy most: a useful interface, explicit application rules, persistent state, and external services that have to agree on what happened.
