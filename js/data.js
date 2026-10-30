/*
  SYSTEMS DATA
  ------------
  This is the only file you need to edit to add your real content.
  For each system:
    - legendImg: path to a single cropped image of that system's legend
      block, exported straight from the drawing. Shown first on the page.
    - drawings: floor plans + riser, in the order they should appear.
      The building has 2 floors, so each system has a floor plan for each,
      followed by the riser. Add/remove entries here if that changes.
    - Recommended export: high res (2000px+ wide), PDF-plot to PNG, or
      "Export to Image" from AutoCAD/Model space with a clean layout.
    - If any image path doesn't resolve, the site shows a placeholder
      automatically so nothing looks broken while you're still filling
      things in.
*/

const SYSTEMS = [
  {
    code: "FA",
    sheetNo: "FA-101",
    key: "fire-alarm",
    title: "Fire Alarm System",
    color: "var(--fa)",

    legendImg: "assets/fire-alarm/legend.png",
    drawings: [
      { label: "Floor Plan — Ground Floor", src: "assets/fire-alarm/floor-plan-1.png" },
      { label: "Floor Plan — First Floor", src: "assets/fire-alarm/floor-plan-2.png" },
      { label: "Riser Diagram — Fire Alarm", src: "assets/fire-alarm/riser.png" }
    ]
  },
  {
    code: "CCTV",
    sheetNo: "CCTV-101",
    key: "cctv",
    title: "CCTV System",
    color: "var(--cctv)",

    legendImg: "assets/cctv/legend.png",
    drawings: [
      { label: "Floor Plan — Ground Floor", src: "assets/cctv/floor-plan-1.png" },
      { label: "Floor Plan — First Floor", src: "assets/cctv/floor-plan-2.png" },
      { label: "Riser Diagram — CCTV", src: "assets/cctv/riser.png" }
    ]
  },
  {
    code: "TEL",
    sheetNo: "TEL-101",
    key: "Telephone & Data",
    title: "Telephone & Data System",
    color: "var(--tel)",

    legendImg: "assets/telephone/legend.png",
    drawings: [
      { label: "Floor Plan — Ground Floor", src: "assets/telephone/floor-plan-1.png" },
      { label: "Floor Plan — First Floor", src: "assets/telephone/floor-plan-2.png" },
      { label: "Riser Diagram — Telephone", src: "assets/telephone/riser.png" }
    ]
  },
  {
    code: "TV",
    sheetNo: "TV-101",
    key: "tv",
    title: "IPTV System",
    color: "var(--tv)",
    legendImg: "assets/tv/legend.png",
    drawings: [
      { label: "Floor Plan — Ground Floor", src: "assets/tv/floor-plan-1.png" },
      { label: "Floor Plan — First Floor", src: "assets/tv/floor-plan-2.png" },
      { label: "Riser Diagram — TV", src: "assets/tv/riser.png" }
    ]
  },
  {
    code: "AC",
    sheetNo: "AC-101",
    key: "access-control",
    title: "Access Control System",
    color: "var(--ac)",

    legendImg: "assets/access-control/legend.png",
    drawings: [
      { label: "Floor Plan — Ground Floor", src: "assets/access-control/floor-plan-1.png" },
      { label: "Floor Plan — First Floor", src: "assets/access-control/floor-plan-2.png" },
      { label: "Riser Diagram — Access Control", src: "assets/access-control/riser.png" }
    ]
  },
];
