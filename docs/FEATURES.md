# ✨ PutturBus Features Deep Dive

PutturBus is packed with advanced features designed to solve common transit problems. Here is a detailed look at what makes it special.

---

## 🧠 Real-Time Intelligence

Unlike static timetables, PutturBus is "aware" of the current time and context.

### Live Bus Filtering
The application uses a strict temporal filtering engine.
*   **Problem**: Paper timetables show all buses from 6 AM to 9 PM, making it hard to find the *next* bus at 4 PM.
*   **Solution**: PutturBus filters out past trips. If it's 4:00 PM, you will only see buses departing from 4:00 PM onwards.

### Dynamic Status Indicators
Bus cards change their visual state based on the time delta (difference between now and departure time).
*   **< 2 mins**: Triggers "Departing Now" urge state.
*   **< 10 mins**: Triggers "Boarding" state.
*   **< 60 mins**: Shows a relative countdown (e.g., "in 25 min").

## 🍎 Physics-Based Route Engine

We don't use simple straight-line distance. Our **Linear Reference System (LRS)** approximates real-world travel conditions.

### Velocity Profiles
Different bus types have different physics profiles assigned in the engine:
*   **Ordinary/Town Bus**: Average operational speed ~35 km/h.
*   **Express/Nrupatunga**: Average operational speed ~45 km/h.
*   **Rajahamsa/Sleeper**: Average operational speed ~50 km/h.

This means an *Express* bus arriving at the same time as an *Ordinary* bus will show a shorter travel duration to the destination.

### True-Shape Mapping
The map renders the actual geographic geometry of the road network, not just "crow-flies" lines between stops. This gives users a realistic understanding of the route (e.g., seeing that the bus goes via Mani/BC Road).

## 🏙️ Intercity Bus Engine

The app seamlessly handles both local and intercity routes.
*   **Unified Search**: Search for a local stop (e.g., *Bolwar*) or a distant city (e.g., *Bangalore*) in the same interface.
*   **Context Aware**: The app detects if the requested route is long-distance and adjusts the UI accordingly (e.g., showing different icons or amenities).

## ♿ Accessibility & Localization

*   **Bilingual Support**: Full support for **Kannada** and **English**, respecting the local region's primary language.
*   **Mobile First Design**: Large touch targets (`48px+`), high contrast text, and screen-reader friendly semantic HTML.

---

[⬅️ Back to README](../README.md)
