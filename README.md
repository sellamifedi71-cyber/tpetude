# Fedi Travel — Explorez la Tunisie

A responsive student project showcasing three Tunisian destinations: Hammamet, El Jem and Sbeïtla.

## Features
- Responsive landing page and destination guide
- Existing local destination videos reused from the repository
- Booking estimator with date validation and guest count
- Local trip-request history with per-request deletion and a clear-all control
- Only trip details are kept in `localStorage`; name and email are not persisted
- No payment-card collection and no claim of a real reservation

## Run locally
Open `index.html` in a modern browser. The pages use relative assets and do not require a build step or backend.

## Publish
This is a static website and can be published with GitHub Pages from the `main` branch and `/ (root)` folder in the repository's Pages settings.

## Important limitation
The booking form is a front-end demonstration. Trip details are stored locally on the same browser and can be reviewed or deleted on `demandes.html`; contact details are not stored. Requests are not sent to a server. A real reservation workflow would require a backend, database, email delivery, and a trusted booking/payment provider.

## Project
Created as a student web-development project. Brand: Fedi Travel.
