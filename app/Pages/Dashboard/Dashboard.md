# API Monitoring SaaS Dashboard Specification

## Overview

Build a modern, premium SaaS dashboard for an API Monitoring platform.

The design should follow the existing design system already present in the project. **Do not introduce new design languages or UI libraries.** Reuse all existing custom components developed in @app/Components wherever possible.

The dashboard should feel similar to modern SaaS products like:

- Better Stack
- Vercel
- Linear
- Clerk
- GitHub

Focus on:
- Dense but clean information
- Developer-first experience
- Glassmorphism styling already used in project
- Smooth hover animations
- Responsive design
- Dark/Light mode compatibility
- Consistent spacing and typography

---

# General Guidelines

## MUST

- Use existing custom typography component
- Use existing GlassCard component
- Use existing custom buttons
- Follow existing color palette
- Use existing CSS variables
- Keep border radius consistent
- Use responsive layouts
- Maintain current spacing scale
- Use MUI components where appropriate
- Use mock realistic data

Examples:

Instead of

100ms

Use

121ms

Instead of

99.9%

Use

99.973%

Instead of

20 Endpoints

Use

23 Endpoints

The dashboard should look like it is connected to a real backend.

---

# Sidebar

Permanent left sidebar.

Sections:

🏠 Dashboard

📡 Endpoints
- All Endpoints
- Add Endpoint

🚨 Incidents

🔔 Notifications
- Destinations
- Groups
- Policies

👥 Team

⚙️ Settings

Each menu item should have an icon.

Selected item should have subtle highlight.

Sidebar should collapse on mobile.

---

# Dashboard Page

This is the landing page after login.

Purpose:

Allow the user to know the health of all their APIs within 10 seconds.

Layout:

---------------------------------------------------

Global Metrics

Healthy APIs
Degraded APIs
Down APIs
Overall Uptime

---------------------------------------------------

Response Time Chart

24 Hours

---------------------------------------------------

Current Endpoint Status

---------------------------------------------------

Recent Incidents

---------------------------------------------------

Latest Checks

---------------------------------------------------

Notification Summary

---

## Global Metrics

Display four cards.

Healthy APIs

23

Green

----------------

Degraded

2

Orange

----------------

Down

1

Red

----------------

Overall Uptime

99.973%

Blue

Cards should contain:

- icon
- value
- label
- small trend

Example:

↑ 0.02% this week

---

## Response Time Chart

Mock line chart.

Allow switching

- 24 Hours
- 7 Days
- 30 Days

Show

Average

P95

P99

---

## Endpoint Status Table

Columns

- Name
- Status
- Region
- Latency
- Uptime
- Last Check
- Actions

Status should be colored badges.

Healthy

Degraded

Down

Hover row should elevate slightly.

---

## Recent Incidents

Timeline.

Example

12:04 PM

Payments API

503 Service Unavailable

Recovered after 3m 22s

---

## Latest Checks

Small table.

Timestamp

Endpoint

Status

Latency

Region

Useful for showing monitoring activity.

---

# Endpoints

The Endpoints page replaces "Add Endpoint".

Top bar:

Search

Filters

Status Filter

Region Filter

Add Endpoint Button

---

Table

Columns

Name

Method

URL

Interval

Regions

Status

Latency

Last Check

Actions

Actions

Edit

Delete

Pause

View

Clicking row opens Endpoint Details.

---

# Add Endpoint

Create as a multi-step wizard.

Step 1

Basic Information

- Endpoint Name
- URL
- Method

---

Step 2

Request

Headers

Body

Authentication

Timeout

Retries

---

Step 3

Monitoring

Interval

30 sec

1 min

5 min

15 min

Regions

USA

Europe

Singapore

India

Expected Status Codes

Response Validation

---

Step 4

Notifications

Select Notification Group

Notify after

1 Failure

2 Failures

3 Failures

---

Step 5

Review

Summary

Create Endpoint

---

# Endpoint Details

Probably the most information-dense page.

Sections

Overview

Response Time

Uptime

Recent Checks

Incidents

Configuration

---

Overview

Current Status

Current Region

Average Latency

Overall Uptime

SSL Status

---

Response Time

Line chart

Latency over time

---

Uptime

Availability graph

Daily uptime

Weekly uptime

Monthly uptime

---

Recent Checks

Table

Timestamp

Region

Status

Latency

Response Code

Duration

---

Incidents

Timeline

Started

Recovered

Duration

---

Configuration

Show

Headers

Authentication

Body

Regions

Timeout

Interval

Allow Edit button.

---

# Incidents

Dedicated page.

Filters

Active

Resolved

Date

Endpoint

Severity

Cards

Each incident should contain

Endpoint

Started

Recovered

Duration

Root Cause

Notification Sent

---

# Notifications

Split into tabs.

## Destinations

Email

Slack

Discord

Webhook

Cards showing

Configured

Last Used

Status

Test Button

Add Destination Button

---

## Groups

Example

Backend Team

John

Alice

Bob

Add Group

Edit

Delete

---

## Policies

Table

Endpoint

↓

Group

↓

Trigger

↓

Channels

↓

Actions

Example

Payments API

Backend Team

2 Consecutive Failures

Slack + Email

---

# Team

Members table

Avatar

Name

Email

Role

Owner

Admin

Viewer

Invite Member button

Remove

Change Role

---

# Settings

Tabs

General

Security

API Keys

Profile

Organization

Theme

Timezone

Generate API Key

Delete API Key

Regenerate

---

# Future Placeholder Pages

Create menu placeholders only.

Status Pages

Billing

Analytics

Show

"Coming Soon"

---

# Animations

Use subtle animations.

Cards

Lift slightly on hover.

Buttons

Scale slightly.

Tables

Hover background.

Status

Pulsing indicator.

Charts

Animate on load.

No excessive animations.

---

# Icons

Use meaningful icons.

Do not reuse the same icon everywhere.

---

# Responsive

Desktop

Sidebar visible.

Tablet

Collapsible sidebar.

Mobile

Drawer.

Tables become scrollable.

Cards stack vertically.

---

# Empty States

Every page should have an empty state.

Example

"No endpoints created yet."

CTA

Create your first endpoint.

---

# Loading States

Skeletons for

Cards

Tables

Charts

Timeline

---

# Error States

Network error card.

Retry button.

---

# Accessibility

Keyboard navigation

ARIA labels

Visible focus

Proper contrast

---

# Code Guidelines
- Functional components
- Reusable components
- Avoid duplicated code
- Keep components modular
- Split large pages into smaller components
- Prefer composition over large files

---

# Final Goal

The final dashboard should feel like a polished commercial SaaS product rather than an admin panel.

The UI should prioritize:

- Clarity
- Information density
- Beautiful micro-interactions
- Consistency with the existing design system
- Professional appearance suitable for production use
- Easy extensibility for future features such as Billing, Analytics, and Public Status Pages