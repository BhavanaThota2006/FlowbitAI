# Flowbit Frontend Internship Assignment

##  Setup & Installation
1. **Clone the repository:**
   ```bash 
   git clone https://github.com/BhavanaThota2006/FlowbitAI.git

   
Install dependencies:<br>
npm install<br>
Run the application:<br>
npm run dev<br>
Run the Test Suite:<br>
npx playwright test<br><br>

**Tech Stack**<br>
Framework: React (Vite)<br>
Styling: Tailwind CSS<br>
Map Library: Leaflet (via react-leaflet)<br>
Testing: Playwright E2E<br>
State Management: React Local State (Context API ready)<br><br>

**Architectural Decisions (Q&A)**
1. Map Library Choice
Why Leaflet? I selected Leaflet over MapLibre or OpenLayers because:
WMS Support: It has native, robust support for WMS layers (required for the NRW Geobasis data).
Lightweight: It has a smaller bundle size compared to OpenLayers, ensuring faster load times.
Ecosystem: The react-leaflet-draw library allowed for rapid implementation of the polygon drawing requirement without reinventing the wheel.

2. Architecture & Structure
I used a Component-Based Architecture to separate concerns:
MapComponent: Handles all mapping logic, WMS layers, and drawing events. It is isolated so it doesn't re-render the entire app unnecessarily.
App: Acts as the layout controller and state manager. It handles the sidebar logic (switching between "Search" and "Project Scope" views).
Tailwind CSS: Used for utility-first styling to match the Figma design pixel-perfectly without writing heavy custom CSS files.

3. Performance Considerations (1000s of points)
While the current implementation handles basic drawing, scaling to 1000s of points/polygons would require:
Clustering: Implementing PruneCluster or react-leaflet-cluster to group nearby points.
Canvas Rendering: Switching Leaflet's renderer to preferCanvas: true to avoid DOM stress from thousands of SVG elements.
Virtualization: Only rendering points currently in the viewport (BBOX strategy).

4. Testing Strategy
I prioritized End-to-End (E2E) Testing using Playwright:
Why? Unit tests are good for logic, but for a map app, we need to know if the map actually appears in the browser.
Coverage:
System Check: Verifies the app builds and mounts.
Map Integration: specific check for the leaflet-container and WMS attribution.
UI Compliance: Verifies the Sidebar matches the Figma states.

5. Trade-offs (Production Readiness)
JavaScript vs TypeScript: Due to the strict 3-day turnaround, I opted for JavaScript to maximize development velocity and ensure a feature-complete UI with complex drawing logic. For production, I would migrate to TypeScript for better type safety.
Mobile Responsiveness: The current layout is optimized for Desktop (as per Figma). A mobile breakdown point would be added for production.
