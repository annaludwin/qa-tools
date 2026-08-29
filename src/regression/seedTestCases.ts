import type { TestCase } from "./types.ts";

// Wygenerowane na podstawie "CM Test Scenarios.md" dostarczonego przez QA.
// Służy wyłącznie jako dane początkowe (seed) dla data/testCases.json przy
// pierwszym uruchomieniu — właściwym źródłem prawdy w czasie działania
// aplikacji jest testCaseStore.ts.
export const seedTestCases: TestCase[] = [
  {
    "id": "ST-LP-001",
    "section": "1. LANDING PAGE",
    "title": "Top menu visibility and functionality",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the landing page",
    "steps": [
      "Verify that the top menu is visible; on mobile, open the hamburger menu.",
      "Click each menu item.",
      "Check the URL and content of the page that opens.",
      "Go back to the landing page and repeat the test for the remaining items."
    ],
    "expectedResult": [
      "The menu is clear and accessible.",
      "Each item is clickable and leads to the correct section or subpage.",
      "There are no 404 errors or broken links.",
      "The mobile menu can be opened, closed, and operated by touch."
    ]
  },
  {
    "id": "ST-LP-002",
    "section": "1. LANDING PAGE",
    "title": "CM logo visibility and functionality",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the landing page",
    "steps": [
      "Verify that the CM logo is visible in the header.",
      "Go to any subpage.",
      "Click the logo."
    ],
    "expectedResult": [
      "The logo is displayed correctly, is legible, and is not distorted.",
      "The logo has alternative text.",
      "Clicking the logo opens the landing page."
    ]
  },
  {
    "id": "ST-LP-003",
    "section": "1. LANDING PAGE",
    "title": "Displaying and closing the “Support CM” pop-up",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "New session or cleared page data",
    "steps": [
      "Open the landing page.",
      "If a cookie message appears, handle it according to the requirements of the test.",
      "Check whether the “Support CM” pop-up appears.",
      "Check the content, buttons and links.",
      "Close the pop-up."
    ],
    "expectedResult": [
      "The pop-up is displayed under the specified condition and does not obscure key elements without providing a way to close it.",
      "The content and buttons are readable and fit in the view.",
      "Links lead to the correct destinations.",
      "The pop-up can be closed with the mouse, touch and keyboard."
    ]
  },
  {
    "id": "ST-LP-004",
    "section": "1. LANDING PAGE",
    "title": "User zone visibility and functionality",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the landing page",
    "steps": [
      "Locate the SN, SM, and SR tiles.",
      "Check their names, graphics and buttons.",
      "Click each zone."
    ],
    "expectedResult": [
      "All three zones are visible and correctly displayed.",
      "The elements do not overlap and are easy to use by touch.",
      "Each zone opens the correct subpage."
    ]
  },
  {
    "id": "ST-LP-005",
    "section": "1. LANDING PAGE",
    "title": "Futureship banner visibility and functionality",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the landing page",
    "steps": [
      "Find the Futureship banner.",
      "Check the text, graphics and CTA button.",
      "Click the banner or CTA button."
    ],
    "expectedResult": [
      "The banner is visible, complete and legible.",
      "The graphics maintain the correct proportions on desktop and mobile.",
      "Clicking opens the correct Futureship page."
    ]
  },
  {
    "id": "ST-LP-006",
    "section": "1. LANDING PAGE",
    "title": "Partner section and logo animation",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the landing page",
    "steps": [
      "Find the partners section.",
      "Verify that the logos are visible, sharp, and not cropped.",
      "Observe the moving-logo animation for at least one full cycle.",
      "If the logos are links, click each of them.",
      "Enable the “prefers-reduced-motion” system animation restriction and check the section again."
    ],
    "expectedResult": [
      "The partners section and all required logos are visible.",
      "The animation runs smoothly, does not jump, and does not leave empty areas.",
      "Logos do not overlap, and links lead to the correct pages.",
      "The animation restriction is respected in accordance with accessibility requirements."
    ]
  },
  {
    "id": "ST-LP-007",
    "section": "1. LANDING PAGE",
    "title": "Statistics section",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the landing page; approved reference values are available",
    "steps": [
      "Find the statistics section.",
      "Compare labels and values with an approved data source.",
      "Check the formatting of numbers, units, and separators.",
      "Refresh the page and check the section again."
    ],
    "expectedResult": [
      "All required statistics are visible and consistent with the reference source.",
      "Numbers and units are formatted correctly and are not truncated.",
      "The section maintains the correct layout on desktop and mobile.",
      "Refreshing the page does not cause erroneous or empty values."
    ]
  },
  {
    "id": "ST-LP-008",
    "section": "1. LANDING PAGE",
    "title": "Support banner",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the landing page",
    "steps": [
      "Find the banner encouraging users to support CM.",
      "Check the content, graphics and CTA button.",
      "Click the CTA button without completing the donation."
    ],
    "expectedResult": [
      "The banner is visible, complete and legible.",
      "The CTA button is available and opens the correct support page.",
      "The elements do not overlap on desktop or mobile."
    ]
  },
  {
    "id": "ST-LP-009",
    "section": "1. LANDING PAGE",
    "title": "Visibility and content of the footer",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the landing page",
    "steps": [
      "Scroll to the bottom of the page.",
      "Check the visibility of the logo, information, and all link groups in the footer.",
      "Click each link in turn.",
      "Check the behavior of internal and external links."
    ],
    "expectedResult": [
      "The footer is visible, complete and legible.",
      "All links are clickable and lead to the correct destinations.",
      "External links open according to product requirements.",
      "The mobile elements of the footer do not overlap and do not require horizontal scrolling."
    ]
  },
  {
    "id": "ST-CAREERS-001",
    "section": "2. CAREER PATHS — LIST, NAVIGATION, AND SEARCH",
    "title": "Visibility of the main career list elements",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the \"Career Paths\" page",
    "steps": [
      "Check the visibility of the search field and career cards.",
      "Check the right-hand panel containing the Preference Filter, category search, Random Career, and trivia.",
      "Scroll down the list and check navigation between result pages.",
      "On mobile, check how the right-panel elements are presented."
    ],
    "expectedResult": [
      "All required elements are visible, complete and legible.",
      "Career cards have a consistent layout and are clickable.",
      "The elements of the side panel lead to the corresponding functions.",
      "Navigation at the bottom of the list is visible and allows the user to switch between result pages.",
      "Elements do not overlap, and the layout does not require horizontal scrolling."
    ]
  },
  {
    "id": "ST-NAV-001",
    "section": "2. CAREER PATHS — LIST, NAVIGATION, AND SEARCH",
    "title": "Basic navigation of the main menu",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the home page",
    "steps": [
      "Click each main menu item in sequence.",
      "Verify that each page loads.",
      "Check the breadcrumbs and active menu item.",
      "Click the logo to return to the home page."
    ],
    "expectedResult": [
      "All links open the correct pages.",
      "The active menu item is visually highlighted.",
      "The logo redirects to the home page.",
      "No 404 errors occur."
    ]
  },
  {
    "id": "ST-NAV-002",
    "section": "2. CAREER PATHS — LIST, NAVIGATION, AND SEARCH",
    "title": "Mobile hamburger menu",
    "priority": "HIGH",
    "platforms": [
      "Mobile"
    ],
    "preconditions": "The user is on a mobile device (viewport ≤768px)",
    "steps": [
      "Open the home page.",
      "Click the hamburger icon.",
      "Verify that the menu expands.",
      "Click any link in the menu.",
      "Verify that the menu closes and the destination page opens."
    ],
    "expectedResult": [
      "The hamburger menu is displayed on mobile.",
      "The menu expands smoothly.",
      "All items are available and clickable.",
      "After a link is clicked, the menu closes."
    ]
  },
  {
    "id": "ST-SEARCH-001",
    "section": "2. CAREER PATHS — LIST, NAVIGATION, AND SEARCH",
    "title": "Career search — autocomplete",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on /sciezki-kariery/",
    "steps": [
      "Click the search field.",
      "Enter \"program\" (part of a career name).",
      "Review the suggestions in the dropdown.",
      "Click the selected suggestion.",
      "Verify that the career details page loads."
    ],
    "expectedResult": [
      "After more than two characters are entered, a list of suggestions appears.",
      "The suggestions match the entered phrase.",
      "Clicking a suggestion opens the corresponding career details page.",
      "The number of results is visible."
    ]
  },
  {
    "id": "ST-SEARCH-002",
    "section": "2. CAREER PATHS — LIST, NAVIGATION, AND SEARCH",
    "title": "Search — no results",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on /sciezki-kariery/",
    "steps": [
      "Enter a nonexistent career in the search field, e.g. \"xyzabc123\".",
      "Press Enter or click the magnifying-glass icon."
    ],
    "expectedResult": [
      "The message \"No Results\" is displayed.",
      "Alternative options are suggested (e.g. popular occupations).",
      "No errors appear in the console."
    ]
  },
  {
    "id": "ST-SEARCH-003",
    "section": "2. CAREER PATHS — LIST, NAVIGATION, AND SEARCH",
    "title": "Phrase search accuracy and clearing the form",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Phrases and expected reference results are available",
    "steps": [
      "Search for the full name of an existing career.",
      "Search for part of the same name.",
      "Repeat the search by changing the case and using Polish characters.",
      "Compare each list of results with reference data.",
      "Clear the field using the available clear control."
    ],
    "expectedResult": [
      "Each phrase returns accurate, consistent results.",
      "Full and partial matching works as required.",
      "Letter case does not affect the results; Polish characters are handled according to the requirements.",
      "Clearing the search field removes the phrase and restores the full career list."
    ]
  },
  {
    "id": "ST-FILTER-001",
    "section": "3. FUNCTIONAL — FILTERING AND SORTING",
    "title": "Preference Filter — basic flow",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on /sciezki-kariery/",
    "steps": [
      "Click \"Preference Filter\" in the sidebar.",
      "Go to the \"Industry\" tab.",
      "Select at least 1 option (e.g. \"Energy\")",
      "Go to the \"Contact people\" tab.",
      "Choose an option.",
      "Click \"Apply Settings\".",
      "Check the list of results."
    ],
    "expectedResult": [
      "Filters are intuitive and responsive.",
      "After the filters are applied, the number of results changes.",
      "The career list reflects the selected filters.",
      "The user can clear filters by clicking \"Clear Settings\"."
    ]
  },
  {
    "id": "ST-FILTER-002",
    "section": "3. FUNCTIONAL — FILTERING AND SORTING",
    "title": "Reset filters",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user has active filters on the results page",
    "steps": [
      "Apply any filters.",
      "Click \"Clear Settings\".",
      "Check the number of results."
    ],
    "expectedResult": [
      "All filters are removed.",
      "The number of results returns to 836 (all careers).",
      "The interface returns to its initial state."
    ]
  },
  {
    "id": "ST-SORT-001",
    "section": "3. FUNCTIONAL — FILTERING AND SORTING",
    "title": "Sorting the career list",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop"
    ],
    "preconditions": "The user is on /sciezki-kariery/",
    "steps": [
      "Click \"FILTERS AND SORTING\".",
      "Select a sorting option (if available).",
      "Check the order of the results."
    ],
    "expectedResult": [
      "Sorting options are available (alphabetical, most popular, newest).",
      "Results are sorted according to the selected option.",
      "Sorting works on filtered results."
    ]
  },
  {
    "id": "ST-FILTER-003",
    "section": "3. FUNCTIONAL — FILTERING AND SORTING",
    "title": "Opening the filtering and sorting panel",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the \"Career Paths\" page",
    "steps": [
      "Verify that the \"Filters and Sorting\" item is visible.",
      "Click the item.",
      "Check the content and usability of the open panel or pop-up.",
      "Close the panel, and then open it again."
    ],
    "expectedResult": [
      "The filtering and sorting control is visible and available.",
      "Clicking it opens a panel or pop-up containing all required settings.",
      "The panel fits within the viewport and can be scrolled and closed.",
      "The panel reopens correctly."
    ]
  },
  {
    "id": "ST-FILTER-004",
    "section": "3. FUNCTIONAL — FILTERING AND SORTING",
    "title": "Results for different filter and sorting combinations",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Reference data is available for selected settings",
    "steps": [
      "Apply a single filter and check the results.",
      "Apply several filters at the same time and check the results.",
      "Change the sorting method with active filters.",
      "Select settings that produce no results.",
      "Go back to the previous page or refresh the view."
    ],
    "expectedResult": [
      "The list and number of results correspond to each selected configuration.",
      "All visible cards meet the active criteria.",
      "Sorting changes the order without removing the active filters.",
      "When no results are found, a clear message and an option to change the settings are displayed.",
      "The state of the filters behaves as required after refreshing and using the “Back” button."
    ]
  },
  {
    "id": "ST-CAREERS-002",
    "section": "3. FUNCTIONAL — FILTERING AND SORTING",
    "title": "Navigation to additional search methods",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the \"Career Paths\" page",
    "steps": [
      "Click \"Preference Filter\".",
      "Check the destination page, then return to the list.",
      "Click \"Search by Category\".",
      "Check the target page."
    ],
    "expectedResult": [
      "Both elements are visible and clickable.",
      "Each element opens the correct tool.",
      "Destination pages load without errors.",
      "Returning to the career list works correctly."
    ]
  },
  {
    "id": "ST-DETAIL-001",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "Displaying the complete career description",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on any career details page",
    "steps": [
      "Open a career details page (e.g. mobile app developer).",
      "Scroll down and check all sections.",
      "Click each item in the side menu.",
      "Verify that the corresponding content scrolls into view or loads."
    ],
    "expectedResult": [
      "All sections contain content.",
      "The side menu scrolls to the appropriate section.",
      "Images and icons are displayed.",
      "No \"Lorem ipsum\" text or empty fields are present."
    ]
  },
  {
    "id": "ST-DETAIL-002",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "Switching between male and female versions",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the detail page for a career that has a female version",
    "steps": [
      "Click \"MALE VERSION\".",
      "Check the changes to the URL and content.",
      "Click the \"FEMALE VERSION\" button.",
      "Verify that the female version is restored."
    ],
    "expectedResult": [
      "The URL changes (e.g. /k/ to /m/).",
      "The title and content use the appropriate male or female forms.",
      "The switch works in both directions.",
      "Browser history records the changes (the \"Back\" button works)."
    ]
  },
  {
    "id": "ST-DETAIL-003",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "“Text-to-Speech” feature — reading content",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a career detail page",
    "steps": [
      "Click \"TEXT-TO-SPEECH\".",
      "Verify that speech synthesis starts.",
      "Click Pause/Stop (if available)",
      "Check text scrolling during playback."
    ],
    "expectedResult": [
      "The reader reads the content in Polish.",
      "The synthesized speech is intelligible.",
      "Playback can be paused and resumed.",
      "Text is highlighted during playback (optional)."
    ]
  },
  {
    "id": "ST-DETAIL-004",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "Copying a career link",
    "priority": "LOW",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a career detail page",
    "steps": [
      "Click \"COPY LINK\".",
      "Paste the link into a text editor or new browser tab.",
      "Verify that the link opens the same page."
    ],
    "expectedResult": [
      "The link is copied to the clipboard.",
      "A confirmation message appears (toast or alert).",
      "The link is an absolute URL beginning with https://."
    ]
  },
  {
    "id": "ST-DETAIL-005",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "Selecting another career at random",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a career detail page",
    "steps": [
      "Click \"RANDOM CAREER\".",
      "Verify that the page redirects to another career.",
      "Click \"RANDOM CAREER\" again.",
      "Verify that a different career opens."
    ],
    "expectedResult": [
      "The feature redirects to a random career details page.",
      "Each use generally opens a different career.",
      "No duplicates occur within a short sequence."
    ]
  },
  {
    "id": "ST-DETAIL-006",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "Similar Careers",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a career details page",
    "steps": [
      "Find the \"Similar Careers\" section on the right.",
      "Check the visible careers.",
      "Click each presented career."
    ],
    "expectedResult": [
      "The section is visible and contains related careers.",
      "Each item has the required name and image.",
      "Clicking an item opens the correct career details page.",
      "On mobile, the section appears in the correct position within the layout."
    ]
  },
  {
    "id": "ST-DETAIL-007",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "“Job Characteristics” tab",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a career details page",
    "steps": [
      "Open the \"Job Characteristics\" tab.",
      "Check all presented tiles.",
      "Compare names and labels with content requirements."
    ],
    "expectedResult": [
      "The tab opens and presents the correct section.",
      "Each tile contains a name and the required labels.",
      "The content is complete, legible, and appropriate for the selected career.",
      "Tiles do not overlap on desktop or mobile."
    ]
  },
  {
    "id": "ST-DETAIL-008",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "“Requirements and Skills” tab",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a career details page",
    "steps": [
      "Open the \"Requirements and Skills\" tab.",
      "Expand each dropdown item in turn.",
      "Check the content of the expanded items.",
      "Collapse each item."
    ],
    "expectedResult": [
      "All dropdowns are visible and have the correct names.",
      "Each item can be expanded and collapsed.",
      "Each expanded item displays the correct, non-empty text.",
      "The state and icon of each dropdown match its expanded or collapsed state."
    ]
  },
  {
    "id": "ST-DETAIL-009",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "“School Subjects” tab",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a career details page",
    "steps": [
      "Open the \"School Subjects\" tab.",
      "Expand and collapse each available dropdown.",
      "Check progress bars and level labels.",
      "Compare the displayed data with the requirements for the career."
    ],
    "expectedResult": [
      "Dropdowns work and contain relevant content.",
      "Each required item has a progress bar and a clear level label.",
      "The bar level is consistent with the label and reference data.",
      "The items are displayed correctly on desktop and mobile."
    ]
  },
  {
    "id": "ST-DETAIL-010",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "“Sample Educational Path” tab",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The career has at least two sample educational paths",
    "steps": [
      "Open the \"Sample Educational Path\" tab.",
      "Check the path selection panel.",
      "Check the items below the panel: school or stage name, period, and duration label.",
      "Select another example path.",
      "Compare the items displayed before and after the change."
    ],
    "expectedResult": [
      "The panel shows all available paths and indicates the active path.",
      "Each stage contains the required name, period and duration.",
      "Changing the path updates the elements below to match the selection.",
      "Data from the previous path is not retained."
    ]
  },
  {
    "id": "ST-DETAIL-011",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "“Occupational Group Statistics” tab",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a career details page with statistics",
    "steps": [
      "Open the \"Occupational Group Statistics\" tab.",
      "Check the source of the data.",
      "Check the panel “Labor Market”.",
      "Check the panel “Average Gross Earnings”.",
      "Compare values and descriptions with reference data."
    ],
    "expectedResult": [
      "The source of the statistics is clear and unambiguous.",
      "Both panels contain all the required elements.",
      "The data, units, period and descriptions are correct and legible.",
      "Missing data is handled with a clear message, without empty or broken charts."
    ]
  },
  {
    "id": "ST-DETAIL-012",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "“Potential Employers” tab",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "A career with an assigned employer and a career without one are available",
    "steps": [
      "Open the tab for a career with an assigned employer.",
      "Check the logo and click the employer link.",
      "Open the tab for a career without an assigned employer.",
      "Check the message and examples of careers that have employers."
    ],
    "expectedResult": [
      "For a career with an assigned employer, the correct logo is visible and links to the correct page.",
      "The external link opens as required and is secure.",
      "For a career without an employer, a clear message is visible.",
      "The message contains working links to sample careers with employers."
    ]
  },
  {
    "id": "ST-DETAIL-013",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "Career details print tab",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a career details page",
    "steps": [
      "Open the print tab.",
      "Check all required elements and available print variants.",
      "Open the print preview without final printing.",
      "Check the layout on each page of the preview."
    ],
    "expectedResult": [
      "The tab opens and contains all required elements.",
      "Print preview starts without errors.",
      "The content is not cut, does not overlap and has the correct order.",
      "Controls used only to operate the website do not appear in the printout."
    ]
  },
  {
    "id": "ST-DETAIL-014",
    "section": "4. FUNCTIONAL — CAREER DETAILS",
    "title": "“Recommended Resources” tab",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a career details page with recommended resources",
    "steps": [
      "Open the \"Recommended Resources\" tab.",
      "Check every element of the list.",
      "Click each link in turn.",
      "On desktop, hover over each item in the list."
    ],
    "expectedResult": [
      "The list of resources is visible and complete.",
      "Each resource contains a title and a working link to the correct destination.",
      "The links open according to the product requirements.",
      "When an item is hovered over, a smooth animation starts without moving the rest of the content.",
      "On touch devices, the absence of a hover state does not block access to the resource."
    ]
  },
  {
    "id": "ST-CITY-001",
    "section": "5. FUNCTIONAL — CITY OF CAREERS",
    "title": "Interaction with the 3D map",
    "priority": "HIGH",
    "platforms": [
      "Desktop"
    ],
    "preconditions": "The user is on /miasto-zawodow/",
    "steps": [
      "Wait for the map to load fully.",
      "Click different buildings.",
      "Verify that the career modal is displayed.",
      "Close the modal and click another building."
    ],
    "expectedResult": [
      "The map loads without errors.",
      "Buildings are clickable.",
      "The modal displays a list of careers in the relevant industry.",
      "Clicking a career opens its details page."
    ]
  },
  {
    "id": "ST-CITY-002",
    "section": "5. FUNCTIONAL — CITY OF CAREERS",
    "title": "Navigating the map",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop"
    ],
    "preconditions": "The user is on /miasto-zawodow/",
    "steps": [
      "Drag the map with the mouse.",
      "Use the scroll wheel or a pinch gesture to zoom.",
      "Click the minimap in the corner.",
      "Verify that the view moves to the selected area."
    ],
    "expectedResult": [
      "The map responds to drag and zoom gestures.",
      "The minimap allows the user to jump quickly to an area.",
      "Animations are smooth.",
      "Interactions do not lag."
    ]
  },
  {
    "id": "ST-CITY-003",
    "section": "5. FUNCTIONAL — CITY OF CAREERS",
    "title": "Map responsiveness on mobile",
    "priority": "HIGH",
    "platforms": [
      "Mobile"
    ],
    "preconditions": "The user is on a mobile device",
    "steps": [
      "Open /miasto-zawodow/ on a mobile device.",
      "Verify that the map scales correctly.",
      "Use touch gestures (pinch and swipe).",
      "Tap a building."
    ],
    "expectedResult": [
      "The map is responsive and readable.",
      "Touch gestures work intuitively.",
      "The modal does not cover the entire screen.",
      "Performance is acceptable (30 fps)."
    ]
  },
  {
    "id": "ST-FS-001",
    "section": "6. FUTURESHIP",
    "title": "Horizontal navigation and scrolling to section",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the Futureship page",
    "steps": [
      "Check the visibility of all horizontal navigation elements.",
      "On desktop, hover over each element.",
      "Click each navigation item.",
      "Check which section the page was scrolled to.",
      "Repeat the test on mobile."
    ],
    "expectedResult": [
      "All navigation items are visible, legible and clickable.",
      "When an item is hovered over, the correct animation starts without shifting the layout.",
      "Clicking an item scrolls to the appropriate section.",
      "The header and start of the target section are not obscured by the menu.",
      "On mobile, navigation is available and convenient to use with touch."
    ]
  },
  {
    "id": "ST-FS-002",
    "section": "6. FUTURESHIP",
    "title": "“Futureship” section",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the Futureship page",
    "steps": [
      "Go to the \"Futureship\" section.",
      "Check the description of the program.",
      "Check all photos in the section."
    ],
    "expectedResult": [
      "The section contains a complete and legible description.",
      "All required photos load and have the correct proportions.",
      "The photos have appropriate alternative text.",
      "Text and photos do not overlap on desktop or mobile."
    ]
  },
  {
    "id": "ST-FS-003",
    "section": "6. FUTURESHIP",
    "title": "“Our Supporters” section",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "A reference list of partners is available.",
    "steps": [
      "Go to the \"Our Supporters\" section.",
      "Compare the logos with the reference list.",
      "Check the quality and layout of each logo.",
      "If the logos are links, click each of them."
    ],
    "expectedResult": [
      "All required partner logos are visible.",
      "Logos are sharp, uncropped, and maintain the correct proportions.",
      "The layout is correct on desktop and mobile.",
      "Any links open the corresponding partner websites."
    ]
  },
  {
    "id": "ST-FS-004",
    "section": "6. FUTURESHIP",
    "title": "“Internship Gallery” section",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the Futureship page",
    "steps": [
      "Go to the \"Internship Gallery\" section.",
      "Check the images in the horizontal gallery.",
      "Move the gallery using the bottom scroll bar from start to finish.",
      "Navigate through the gallery on mobile using a swipe gesture."
    ],
    "expectedResult": [
      "The gallery and the bottom scroll bar are visible.",
      "All photos load correctly.",
      "The gallery moves smoothly throughout its available range.",
      "Scrolling does not accidentally move the entire page horizontally.",
      "The gallery works with a mouse, keyboard, and touch gestures."
    ]
  },
  {
    "id": "ST-FS-005",
    "section": "6. FUTURESHIP",
    "title": "“Education” section and video playback",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the Futureship page; multimedia playback is allowed",
    "steps": [
      "Go to the \"Education\" section.",
      "Check all videos.",
      "Open each video.",
      "Start, pause and close playback."
    ],
    "expectedResult": [
      "All required tiles are visible and relate to the correct topic.",
      "Each video opens without errors and matches the selected tile.",
      "Playback can be started, paused, and closed.",
      "The player is displayed correctly on desktop and mobile."
    ]
  },
  {
    "id": "ST-FS-006",
    "section": "6. FUTURESHIP",
    "title": "“Organizer” section",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the Futureship page",
    "steps": [
      "Go to the “Organizer” section.",
      "Check the photo and description of the organizer.",
      "Click the link to the KEDU page."
    ],
    "expectedResult": [
      "The photo and the complete description are visible and properly formatted.",
      "The photo is not stretched or cropped.",
      "The link opens the correct KEDU page according to the product requirements.",
      "The external link uses appropriate security attributes."
    ]
  },
  {
    "id": "ST-FS-007",
    "section": "6. FUTURESHIP",
    "title": "“Contact” section",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The device has a mail application configured",
    "steps": [
      "Go to the “Contact” section.",
      "Check the contact details and Futureship logo.",
      "Click each “Write to Us” button.",
      "Check the recipient address in the email application that opens."
    ],
    "expectedResult": [
      "All required contact details and the logo are visible.",
      "Each \"Write to Us\" button opens an email application or the appropriate contact form.",
      "The recipient address corresponds to the person or area indicated on the button.",
      "Clicking does not send messages automatically."
    ]
  },
  {
    "id": "ST-FS-008",
    "section": "6. FUTURESHIP",
    "title": "Futureship page footer",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the Futureship page",
    "steps": [
      "Scroll to the bottom of the page.",
      "Check that the footer is visible and complete.",
      "Click each link in the footer."
    ],
    "expectedResult": [
      "The footer is visible, complete and legible.",
      "All links lead to the correct destinations.",
      "Mobile elements do not overlap and do not cause horizontal scrolling."
    ]
  },
  {
    "id": "ST-FS-009",
    "section": "6. FUTURESHIP",
    "title": "Futureship “Frequently Asked Questions” page",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the Futureship page",
    "steps": [
      "Click \"FAQ\" in the Futureship navigation.",
      "Check the URL and title of the page that opens.",
      "Check the visibility of the search field and the Futureship question list.",
      "Search for a phrase that matches an existing question.",
      "Search for a phrase that returns no results, then clear the search field.",
      "Click a question and check the expanded answer.",
      "Click the question again.",
      "On desktop, hover over the question tiles."
    ],
    "expectedResult": [
      "The “FAQ” item opens the “Frequently Asked Questions” subpage for Futureship.",
      "The page loads without errors.",
      "The search field is visible, and the search function returns questions that match the entered phrase.",
      "For a non-matching phrase, a readable state of no results is displayed, and clearing the field restores the full list.",
      "The questions are collapsed by default.",
      "The first click expands the correct answer, and the second collapses it.",
      "The dropdown state and icon reflect whether the question is expanded or collapsed.",
      "When a tile is hovered over, the correct animation starts without shifting the layout.",
      "On touch devices, the absence of a hover state does not prevent questions from being expanded."
    ]
  },
  {
    "id": "ST-ZONE-001",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Access to SN",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the home page",
    "steps": [
      "Click \"ENTER\" on the SN tile.",
      "Check the page content.",
      "Click \"Buy for Your School\" (net:WORK game).",
      "Verify that the link opens the store or form.",
      "Return to the page and review \"Lesson Ideas\"."
    ],
    "expectedResult": [
      "SN is publicly available.",
      "All CTA buttons work.",
      "Materials are available without login, or information about required registration is provided.",
      "The blog loads correctly."
    ]
  },
  {
    "id": "ST-TEACHER-001",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Banner and navigation to the Store",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is in SN",
    "steps": [
      "Check the visibility and content of the banner.",
      "Check the \"Buy for Your School\" button.",
      "Click the button."
    ],
    "expectedResult": [
      "The banner is complete, legible and scales correctly on desktop and mobile.",
      "The button is visible and clickable.",
      "Clicking opens the correct page in the Katalyst Education store.",
      "The external link opens as required and uses appropriate security attributes."
    ]
  },
  {
    "id": "ST-TEACHER-002",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Blog preview for teachers and counselors",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Data on the latest article and topic of the month are available",
    "steps": [
      "Find the \"Blog for Teachers and Counselors\" section.",
      "Compare the latest article and topic of the month with reference data.",
      "On desktop, hover over each tile.",
      "Click the article tiles.",
      "Click \"View All Posts\"."
    ],
    "expectedResult": [
      "The section shows the relevant latest article and topic of the month.",
      "When a tile is hovered over, the correct animation starts.",
      "Clicking the tile opens the corresponding article.",
      "“View All Posts” opens the blog for teachers and counselors.",
      "On touch devices, the absence of a hover state does not prevent articles from opening."
    ]
  },
  {
    "id": "ST-TEACHER-003",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Lesson Ideas by education level",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "A list of articles assigned to each stage is available",
    "steps": [
      "Go to the \"Lesson Ideas\" section.",
      "Check the visibility of all educational stages.",
      "Click the button for each stage.",
      "Check the active filter and results on the blog page."
    ],
    "expectedResult": [
      "All required education levels are visible and clickable.",
      "Each button opens the blog with the correct education-level filter active.",
      "The results contain only articles assigned to the selected stage.",
      "The name or label of the active filter is visible."
    ]
  },
  {
    "id": "ST-TEACHER-004",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Link to article on career guidance",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is in SN",
    "steps": [
      "Find the item “Check how to implement vocational guidance at school with CM”.",
      "Click the link or CTA button."
    ],
    "expectedResult": [
      "The element is visible and legible.",
      "Clicking opens the relevant article about career guidance regulations.",
      "The article loads without errors."
    ]
  },
  {
    "id": "ST-TEACHER-005",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Webinars section",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is in SN",
    "steps": [
      "Find the webinar section.",
      "Check its description and button.",
      "Click the button that leads to the webinars."
    ],
    "expectedResult": [
      "The section and button are visible and legible.",
      "Clicking opens the correct webinar page.",
      "The list of webinars loads without errors."
    ]
  },
  {
    "id": "ST-TEACHER-006",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "“Our Products” section",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "A reference list of products is available",
    "steps": [
      "Find the \"Our Products\" section.",
      "Compare tiles with a reference list.",
      "On desktop, hover over each tile.",
      "Click the products available for download or purchase."
    ],
    "expectedResult": [
      "All required products are visible and properly described.",
      "When a tile is hovered over, the correct animation starts without shifting the layout.",
      "Each tile opens the corresponding download or purchase page.",
      "The type of action and the possible price are unambiguous before clicking."
    ]
  },
  {
    "id": "ST-TEACHER-007",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Free online course section",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is in SN",
    "steps": [
      "Find the free online course section.",
      "Check the description and the “How to Join” button.",
      "Click the button."
    ],
    "expectedResult": [
      "The section makes it clear that the course is free.",
      "The button is visible and enabled.",
      "Clicking opens the correct instructions or course registration page."
    ]
  },
  {
    "id": "ST-TEACHER-008",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Links to SM & Toolkit",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is in SN",
    "steps": [
      "Look for a reference to SM.",
      "Click it and check the destination page.",
      "Return, find the toolkit, and check all its elements.",
      "Click each tool element in turn."
    ],
    "expectedResult": [
      "The link leads to the correct SM.",
      "The toolkit is complete, readable, and accessible.",
      "Each tool opens the appropriate function or page."
    ]
  },
  {
    "id": "ST-TEACHER-009",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Newsletter subscription",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "An approved test email address is available",
    "steps": [
      "Find the newsletter subscription section.",
      "Try submitting the form when blank and with invalid data.",
      "Enter an approved test email address and the required consents.",
      "Submit the form."
    ],
    "expectedResult": [
      "The form and the required consent information are visible.",
      "Incorrect data is blocked by a clear validation message.",
      "Valid data can be submitted only once.",
      "After submission, a confirmation or appropriate subscription-confirmation instructions appear."
    ]
  },
  {
    "id": "ST-TEACHER-010",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "“Get Involved” section",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is in SN",
    "steps": [
      "Find the \"Get Involved\" section.",
      "Check the option for suggesting improvements to SN.",
      "Click the social media links.",
      "Click the link to PIE.tv."
    ],
    "expectedResult": [
      "All required actions and links are visible and legible.",
      "The improvement option opens the correct form or contact channel.",
      "Social media links lead to the correct profiles.",
      "The PIE.tv link leads to the correct page.",
      "External links use appropriate security attributes."
    ]
  },
  {
    "id": "ST-ZONE-002",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Access to SM",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the home page",
    "steps": [
      "Click \"ENTER\" on the SM tile.",
      "Check the availability of online courses.",
      "Click the \"What After Turning 18?\" CTA.",
      "Check whether registration is required.",
      "Check the blog and toolkit."
    ],
    "expectedResult": [
      "SM is intuitive for its target audience.",
      "The courses are clearly described.",
      "Course links work (registration may be required).",
      "The toolkit contains working links."
    ]
  },
  {
    "id": "ST-YOUTH-001",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Banner and main SM buttons",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the SM page",
    "steps": [
      "Verify that the banner is displayed correctly.",
      "Check the \"Choose a School in a Week\" and \"What After Turning 18?\" buttons.",
      "On desktop, hover over each button.",
      "Click both buttons in turn."
    ],
    "expectedResult": [
      "The banner is complete, legible and scales correctly on desktop and mobile.",
      "Both buttons are visible and have the correct names.",
      "When a button is hovered over, its color changes and the correct animation starts without shifting the layout.",
      "Each button leads to the correct resource or course.",
      "On touch devices, the absence of a hover state does not prevent the buttons from working."
    ]
  },
  {
    "id": "ST-YOUTH-002",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Youth blog preview",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "A reference list of the latest articles and the topic of the month is available",
    "steps": [
      "Go to the \"Youth Blog\" section.",
      "Compare the latest articles and the topic of the month with reference data.",
      "On desktop, hover over each tile.",
      "Click the visible articles.",
      "Click the \"View All Posts\" button."
    ],
    "expectedResult": [
      "The section shows the relevant latest articles and the topic of the month.",
      "Tiles contain the required titles, graphics and metadata.",
      "When a tile is hovered over, the correct animation starts.",
      "Clicking the tile opens the corresponding article.",
      "\"View All Posts\" opens the youth blog page.",
      "The detailed operation of the blog is covered by a separate set of tests."
    ]
  },
  {
    "id": "ST-YOUTH-003",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Section ‘#ZawodowyStream’",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "A reference list of recent streams is available",
    "steps": [
      "Go to the \"#ZawodowyStream\" section.",
      "Compare the displayed streams with the reference list.",
      "On desktop, hover over each element.",
      "Open each visible stream in sequence.",
      "Click the \"View All Streams\" button."
    ],
    "expectedResult": [
      "The section shows the correct latest streams.",
      "Each element has the required title and graphics.",
      "When an element is hovered over, the correct animation starts without shifting the layout.",
      "Each stream can be opened and corresponds to the selected element.",
      "The button leads to a subpage containing all streams."
    ]
  },
  {
    "id": "ST-YOUTH-004",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "SM toolkit",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the SM page",
    "steps": [
      "Find the toolkit on the right or in its mobile position.",
      "Check the items: “Explore Career Paths”, “Preference Filter”, “Career Inspiration for Today”, “News” and “Career Essentials”.",
      "Click each element."
    ],
    "expectedResult": [
      "All required toolkit elements are visible and legible.",
      "Each element leads to the correct page or feature.",
      "The actions load without errors and allow you to return to SM.",
      "On mobile, the toolkit is not cropped and is easy to operate by touch."
    ]
  },
  {
    "id": "ST-YOUTH-005",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Links to Instagram and YouTube",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the SM page",
    "steps": [
      "Find the \"Follow on Instagram\" and \"Watch on YouTube\" buttons.",
      "Click each button.",
      "Check the URL and destination profile or channel."
    ],
    "expectedResult": [
      "Both buttons are visible, legible and clickable.",
      "Each button opens the correct CM profile on the corresponding platform.",
      "External links open as required and use appropriate security attributes."
    ]
  },
  {
    "id": "ST-YOUTH-006",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Tiles in the “Careers of the Future” section",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the SM page",
    "steps": [
      "Go to the \"Careers of the Future\" section.",
      "Check all visible career tiles.",
      "Click each tile."
    ],
    "expectedResult": [
      "The section and all the required tiles are visible.",
      "Tiles contain the correct career name and image.",
      "Clicking each tile opens the corresponding career details page.",
      "The layout of the tiles is correct on desktop and mobile."
    ]
  },
  {
    "id": "ST-YOUTH-007",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Filtered list of careers of the future",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "A reference list of careers of the future is available",
    "steps": [
      "In the \"Careers of the Future\" section, click the \"View Careers of the Future\" button.",
      "Check the address and active settings of the results page.",
      "Compare the displayed careers with the reference list.",
      "Go through all the results pages if pagination works."
    ],
    "expectedResult": [
      "The button opens the Career Paths list with the careers-of-the-future filter active.",
      "The filter criterion is visible.",
      "The results include only careers marked as careers of the future.",
      "The number of results and pagination are consistent with the data."
    ]
  },
  {
    "id": "ST-YOUTH-008",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Discover Career Paths by Category",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "A reference list of categories is available",
    "steps": [
      "Go to the \"Discover Career Paths by Category\" section.",
      "Compare the visible categories with the reference list.",
      "On desktop, hover over each category.",
      "Click each category."
    ],
    "expectedResult": [
      "All required categories are visible.",
      "When a category is hovered over, the correct animation starts.",
      "Clicking leads to the appropriate category page or a properly filtered careers list.",
      "The results correspond to the selected category."
    ]
  },
  {
    "id": "ST-YOUTH-009",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "PIE.tv and contact form tiles",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the SM page",
    "steps": [
      "Locate the lower tiles leading to PIE.tv and the contact form.",
      "Check their texts, graphics and buttons.",
      "Click the PIE.tv tile.",
      "Return and click the contact form tile without submitting the form."
    ],
    "expectedResult": [
      "Both tiles are visible, complete and legible.",
      "The first tile opens the correct PIE.tv page.",
      "The second tile leads to the correct contact form.",
      "The form opens without errors, and opening it does not submit any data."
    ]
  },
  {
    "id": "ST-ZONE-003",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Access to SR",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the home page",
    "steps": [
      "Click \"ENTER\" on the SR tile.",
      "Check the educational content for parents."
    ],
    "expectedResult": [
      "SR is available.",
      "The content is understandable to people without a background in education."
    ]
  },
  {
    "id": "ST-PARENT-001",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Viewing the blog for parents",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Data on the latest articles and topic of the month are available",
    "steps": [
      "Find a blog section for parents.",
      "Compare the latest articles and the topic of the month with reference data.",
      "On desktop, hover over each tile or article title.",
      "Click the visible articles.",
      "Click \"View All Posts\"."
    ],
    "expectedResult": [
      "The section shows the relevant latest articles and the topic of the month.",
      "When an item is hovered over, the correct animation starts.",
      "Clicking opens the appropriate article.",
      "\"View All Posts\" leads to a blog for parents.",
      "On touch devices, the absence of a hover state does not prevent articles from opening."
    ]
  },
  {
    "id": "ST-PARENT-002",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "“Resources for Your Child” section",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is in SR",
    "steps": [
      "Locate the section that references SM.",
      "Click the links to the Preference Filter, ZawodowyStream, and Career Essential.",
      "Click the button leading to SM."
    ],
    "expectedResult": [
      "All required resources are visible and readable.",
      "Each link opens the correct tool or material.",
      "The button leads to SM.",
      "Returning to SR works correctly."
    ]
  },
  {
    "id": "ST-PARENT-003",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "“Explore Careers” section",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is in SR",
    "steps": [
      "Find the \"Explore Careers\" section.",
      "Click \"Explore Career Paths\".",
      "Return and click the item that opens the City of Careers."
    ],
    "expectedResult": [
      "Both elements are visible, legible and clickable.",
      "The first opens the Career Paths list.",
      "The second opens the correct City of Careers view.",
      "Destination pages load without errors."
    ]
  },
  {
    "id": "ST-PARENT-004",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "“You work in a career we have not yet described” form",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Approved test data is available",
    "steps": [
      "Click the link in the \"You work in a career we have not yet described\" section.",
      "Check the form that opens and its default contact topic.",
      "Complete all required fields with approved test data.",
      "Submit the form."
    ],
    "expectedResult": [
      "The correct contact form opens.",
      "The topic concerning an undescribed career is selected by default.",
      "The form can be completed and submitted only once.",
      "An unambiguous confirmation appears after submission."
    ]
  },
  {
    "id": "ST-PARENT-005",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Cooperation page for organizations",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "You are in the \"Get Involved\" section",
    "steps": [
      "Click the link for an organization interested in working with CM.",
      "Check the destination page and all required content sections.",
      "Expand all dropdowns one by one.",
      "Check their content and collapse them."
    ],
    "expectedResult": [
      "The link opens the correct cooperation page.",
      "The page contains a set of required paragraphs and sections.",
      "Each dropdown can be expanded and collapsed.",
      "Expanded items contain appropriate, non-empty text.",
      "Each dropdown's state and icon reflect whether it is expanded or collapsed."
    ]
  },
  {
    "id": "ST-PARENT-006",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "SR improvement form",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Approved test data is available",
    "steps": [
      "Click the “How can we improve the SR?” link.",
      "Check the form that opens and its default contact topic.",
      "Compare the default selection with the form for the undescribed career.",
      "Complete the form with approved test data.",
      "Submit the form."
    ],
    "expectedResult": [
      "The correct contact form opens.",
      "The SR improvement topic is selected by default and differs from the undescribed-career topic.",
      "The form can be completed and submitted only once.",
      "An unambiguous confirmation appears after submission."
    ]
  },
  {
    "id": "ST-PARENT-007",
    "section": "7. FUNCTIONAL — USER ZONES",
    "title": "Link to PIE.tv",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is in SR",
    "steps": [
      "Find the link to PIE.tv.",
      "Click the link.",
      "Check the URL and content of the page that opens."
    ],
    "expectedResult": [
      "The link is visible, readable and clickable.",
      "The link opens the correct PIE.tv page.",
      "The external link opens as required and uses appropriate security attributes."
    ]
  },
  {
    "id": "ST-YBLOG-001",
    "section": "8. YOUTH BLOG",
    "title": "Search field and filter panel",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the youth blog page",
    "steps": [
      "Check the visibility of the search field and filter button.",
      "Search for a phrase that matches an existing article.",
      "Click the filters button and check all required sections of the form.",
      "Select the desired filters and apply them.",
      "Open the filters again and clear the form."
    ],
    "expectedResult": [
      "The search field and filter button are visible and available.",
      "The search function returns articles matching the entered phrase.",
      "The filter panel opens and contains all required sections.",
      "Applying the filters updates the list according to the selected settings.",
      "Clearing the form removes the criteria and restores the full list of articles."
    ]
  },
  {
    "id": "ST-YBLOG-002",
    "section": "8. YOUTH BLOG",
    "title": "Article counter",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Reference article counts are available for the full list and selected filters",
    "steps": [
      "Check the counter for the full list of articles.",
      "Search for the selected phrase and check the counter.",
      "Apply filters and check the counter again.",
      "Go to the next page of results if pagination is available."
    ],
    "expectedResult": [
      "The counter is visible and properly formatted.",
      "The value corresponds to the actual number of articles that meet the current criteria.",
      "The counter is updated after searching, filtering, and clearing the form.",
      "Changing the results page does not mistakenly change the total number of articles."
    ]
  },
  {
    "id": "ST-YBLOG-003",
    "section": "8. YOUTH BLOG",
    "title": "Article tiles",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the youth blog page",
    "steps": [
      "Check the visible article tiles.",
      "On desktop, hover over each tile.",
      "Click the selected tiles."
    ],
    "expectedResult": [
      "Tiles contain the required article title, image, and metadata.",
      "When a tile is hovered over, the correct animation starts without shifting the layout.",
      "Clicking opens the article corresponding to the selected tile.",
      "On touch devices, the absence of a hover state does not prevent the article from opening."
    ]
  },
  {
    "id": "ST-YBLOG-004",
    "section": "8. YOUTH BLOG",
    "title": "Result navigation and footer",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The list of articles has more than one result page",
    "steps": [
      "Scroll down the list of articles.",
      "Use every available navigation element between pages.",
      "Check the updated list and active page number.",
      "Scroll to the footer and check its elements and links."
    ],
    "expectedResult": [
      "Navigation is visible and opens the correct results page.",
      "The active page is clearly marked and the list is updated without duplicates.",
      "The footer is visible, complete and legible.",
      "All footer links lead to the correct destinations."
    ]
  },
  {
    "id": "ST-YBLOG-005",
    "section": "8. YOUTH BLOG",
    "title": "The main content of the article page",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user opens an article from the youth blog list",
    "steps": [
      "Check the URL and title of the page that opens.",
      "Check the title of the article, the author, the main photo and the text.",
      "Scroll through the entire article."
    ],
    "expectedResult": [
      "The article selected in the list opens.",
      "The title, author, photo and non-empty text are visible.",
      "The image has the correct proportions and appropriate alternative text.",
      "The content is legible and not cut off on desktop or mobile."
    ]
  },
  {
    "id": "ST-YBLOG-006",
    "section": "8. YOUTH BLOG",
    "title": "Table of Contents",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The article has a table of contents",
    "steps": [
      "Find the table of contents on the right.",
      "Click it and check the expanded list of entries.",
      "Click a selected table-of-contents entry.",
      "On desktop, move the pointer outside the table-of-contents area.",
      "On mobile, use the available control to close the table of contents."
    ],
    "expectedResult": [
      "The table of contents is visible and expands when clicked.",
      "It contains entries matching the article headings.",
      "Clicking an entry scrolls to the corresponding section of the text.",
      "On desktop, the list closes automatically when the pointer leaves its area.",
      "On mobile, it can be closed without using hover behavior."
    ]
  },
  {
    "id": "ST-YBLOG-007",
    "section": "8. YOUTH BLOG",
    "title": "Recommended articles section",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is at the bottom of the article page",
    "steps": [
      "Find the “Other blog articles you might like” section.",
      "Check all visible suggestions.",
      "Click the recommended articles."
    ],
    "expectedResult": [
      "The section is visible and contains linked articles.",
      "Each suggestion has the required title and image.",
      "Clicking opens the correct recommended article.",
      "Deleted or unavailable content is not presented."
    ]
  },
  {
    "id": "ST-YBLOG-008",
    "section": "8. YOUTH BLOG",
    "title": "Article rating section",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the article page",
    "steps": [
      "Find the ratings section.",
      "Check the stars, average rating, and number of ratings.",
      "Compare values with reference data.",
      "Refresh the page and check the values again."
    ],
    "expectedResult": [
      "The rating section is visible and displayed correctly.",
      "The average is within the allowed range, and the number of ratings is non-negative.",
      "The filled stars are consistent with the displayed average.",
      "The average and number of ratings are consistent with the data source and remain consistent after refresh."
    ]
  },
  {
    "id": "ST-TBLOG-001",
    "section": "9. BLOG FOR TEACHERS AND COUNSELORS",
    "title": "Blog search and filters",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the blog for teachers and counselors",
    "steps": [
      "Check the search field and filter button.",
      "Search for a full and partial phrase from an existing article.",
      "Open the filter panel and check all sections.",
      "Apply the selected filters.",
      "Clear the form."
    ],
    "expectedResult": [
      "The search function returns articles that match the phrase.",
      "The filter panel is complete and can be closed.",
      "Applying the filters displays the correct results.",
      "Clearing the filters restores the full list of articles."
    ]
  },
  {
    "id": "ST-TBLOG-002",
    "section": "9. BLOG FOR TEACHERS AND COUNSELORS",
    "title": "Counter and tiles of articles",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Reference articles and their number are available",
    "steps": [
      "Compare the counter with the number of articles that meet the current criteria.",
      "Check the contents of the tiles.",
      "On desktop, hover over each tile.",
      "Click the selected tiles."
    ],
    "expectedResult": [
      "The counter corresponds to the actual number of results and is updated after filtering.",
      "Tiles contain the required title, graphics and metadata.",
      "When a tile is hovered over, the correct animation starts.",
      "Clicking opens the appropriate article."
    ]
  },
  {
    "id": "ST-TBLOG-003",
    "section": "9. BLOG FOR TEACHERS AND COUNSELORS",
    "title": "Pagination and blog footer",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The list of articles has more than one page",
    "steps": [
      "Use all available pagination elements.",
      "Check that the results change and the active page is marked.",
      "Scroll to the footer and click its links."
    ],
    "expectedResult": [
      "Pagination leads to the correct pages without duplicating articles.",
      "The active page is clearly marked.",
      "The footer is complete, legible and includes working links."
    ]
  },
  {
    "id": "ST-TBLOG-004",
    "section": "9. BLOG FOR TEACHERS AND COUNSELORS",
    "title": "Content of the article and table of contents",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user opens a blog article for teachers and counselors",
    "steps": [
      "Check the title, author, photo and text of the article.",
      "Open the table of contents.",
      "Click each entry.",
      "On desktop, move the pointer outside the table-of-contents area.",
      "On mobile, close the list with the available control."
    ],
    "expectedResult": [
      "The article contains a complete title, author, photo and non-empty text.",
      "The table of contents corresponds to the headings of the article.",
      "Clicking an entry scrolls to the appropriate section.",
      "The list closes when the pointer leaves it on desktop and can be closed without hover on mobile."
    ]
  },
  {
    "id": "ST-TBLOG-005",
    "section": "9. BLOG FOR TEACHERS AND COUNSELORS",
    "title": "Recommended articles and rating",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is at the bottom of the article page",
    "steps": [
      "Check the recommended articles section.",
      "Click the visible suggestions.",
      "Check the stars, average rating, and number of ratings.",
      "Compare values with reference data."
    ],
    "expectedResult": [
      "Recommended articles are visible and open the correct content.",
      "The average and number of ratings are displayed correctly.",
      "The filled stars correspond to the average rating.",
      "The layout works correctly on desktop and mobile."
    ]
  },
  {
    "id": "ST-PBLOG-001",
    "section": "10. PARENT BLOG",
    "title": "Blog search and filters",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the blog for parents",
    "steps": [
      "Check the search field and filter button.",
      "Search for a full and partial phrase from an existing article.",
      "Open the filter panel and check all its sections.",
      "Apply the selected filters, then clear them."
    ],
    "expectedResult": [
      "The search function returns articles that match the phrase.",
      "The filter panel is complete and can be closed.",
      "Applying the filters displays the correct results.",
      "Clearing the filters restores the full list of articles."
    ]
  },
  {
    "id": "ST-PBLOG-002",
    "section": "10. PARENT BLOG",
    "title": "Counter and tiles of articles",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Reference articles and their number are available",
    "steps": [
      "Compare the counter with the number of articles that meet the current criteria.",
      "Check the contents of the tiles.",
      "On desktop, hover over each tile.",
      "Click the selected tiles."
    ],
    "expectedResult": [
      "The counter corresponds to the actual number of results and is updated after filtering.",
      "Tiles contain the required title, graphics and metadata.",
      "When a tile is hovered over, the correct animation starts.",
      "Clicking opens the appropriate article."
    ]
  },
  {
    "id": "ST-PBLOG-003",
    "section": "10. PARENT BLOG",
    "title": "Pagination and blog footer",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The list of articles has more than one page",
    "steps": [
      "Use all available pagination elements.",
      "Check that the results change and the active page is marked.",
      "Scroll to the footer and click its links."
    ],
    "expectedResult": [
      "Pagination leads to the correct pages without duplicating articles.",
      "The active page is clearly marked.",
      "The footer is complete, legible and includes working links."
    ]
  },
  {
    "id": "ST-PBLOG-004",
    "section": "10. PARENT BLOG",
    "title": "Content of the article and table of contents",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user opens a blog article for parents",
    "steps": [
      "Check the title, author, photo and text of the article.",
      "Open the table of contents.",
      "Click each entry.",
      "On desktop, move the pointer outside the table-of-contents area.",
      "On mobile, close the list with the available control."
    ],
    "expectedResult": [
      "The article contains a complete title, author, photo and non-empty text.",
      "The table of contents corresponds to the headings of the article.",
      "Clicking an entry scrolls to the appropriate section.",
      "The list closes when the pointer leaves it on desktop and can be closed without hover on mobile."
    ]
  },
  {
    "id": "ST-PBLOG-005",
    "section": "10. PARENT BLOG",
    "title": "Recommended articles and rating",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is at the bottom of the article page",
    "steps": [
      "Check the recommended articles section.",
      "Click the visible suggestions.",
      "Check the stars, average rating, and number of ratings.",
      "Compare values with reference data."
    ],
    "expectedResult": [
      "Recommended articles are visible and open the correct content.",
      "The average and number of ratings are displayed correctly.",
      "The filled stars correspond to the average rating.",
      "The layout works correctly on desktop and mobile."
    ]
  },
  {
    "id": "ST-STREAM-001",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Headline and link to the latest interview",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Information about the most recent interview is available.",
    "steps": [
      "Check the page header and latest-interview section.",
      "Compare the interview with the reference data.",
      "On desktop, hover over the illustration.",
      "Click the latest-interview illustration."
    ],
    "expectedResult": [
      "The header and link to the relevant latest interview are visible.",
      "After hovering over the illustration, a clear playback icon appears.",
      "The appearance of the icon does not move the other elements.",
      "Clicking opens the page or recording of the selected interview.",
      "On touch devices, the recording can be opened without a hover state."
    ]
  },
  {
    "id": "ST-STREAM-002",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Introductory text and CTA buttons",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the ZawodowyStream page",
    "steps": [
      "Check the introductory text below the latest interview.",
      "Click the \"Learn More\" button.",
      "Go back to the page and click \"Which Career Would You Like to Explore?\".",
      "Check the fields and required consents in the form that opens.",
      "Complete the form with valid, approved test data.",
      "Submit the form."
    ],
    "expectedResult": [
      "The text and both buttons are visible and legible.",
      "‘Learn More’ leads to the ‘Frequently Asked Questions’ section.",
      "\"Which Career Would You Like to Explore?\" opens the appropriate form.",
      "All required fields and consents are visible, legible, and can be completed.",
      "The form accepts valid data and can be submitted only once.",
      "An unambiguous confirmation appears after successful submission.",
      "Both buttons work on desktop and mobile."
    ]
  },
  {
    "id": "ST-STREAM-003",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Links to \"Also Listen On\"",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "A reference list of active podcast platforms is available",
    "steps": [
      "Find the \"Also Listen On\" section.",
      "Check links to Spotify, ZawodowyStream on Podbean, Apple Podcasts and other approved platforms.",
      "Click each link in turn."
    ],
    "expectedResult": [
      "Only currently supported platforms are visible.",
      "Each link opens the appropriate ZawodowyStream profile or podcast.",
      "External links open as required and use appropriate security attributes.",
      "No links to disabled services are presented; the former Google Podcasts link leads to an approved successor or is deleted."
    ]
  },
  {
    "id": "ST-STREAM-004",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Social Links \"Find Us On\"",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the ZawodowyStream page",
    "steps": [
      "Find the \"Find Us On\" section.",
      "Click the link to the CM Instagram profile.",
      "Return and click the link to the ZawodowyStream channel on YouTube."
    ],
    "expectedResult": [
      "Both links are visible, correctly described and clickable.",
      "The Instagram link opens the correct CM profile.",
      "The YouTube link opens the correct ZawodowyStream channel.",
      "External links use appropriate security attributes."
    ]
  },
  {
    "id": "ST-STREAM-005",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Search for recordings",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Phrases and expected reference results are available",
    "steps": [
      "Search for the full title of an existing recording.",
      "Search for part of a title or a career name.",
      "Search for a phrase for which there are no results.",
      "Clear the search field."
    ],
    "expectedResult": [
      "A full and partial phrase returns the appropriate recordings.",
      "For a non-matching phrase, a readable state of no results is displayed.",
      "Clearing the field restores the full list.",
      "The results and counter update without briefly displaying incorrect data."
    ]
  },
  {
    "id": "ST-STREAM-006",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Filter pop-up",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is viewing the ZawodowyStream recordings list",
    "steps": [
      "Click the “Filters” button.",
      "Check the \"Subject\" and \"Industry\" sections.",
      "Select settings and apply the filters.",
      "Open the pop-up again and clear the form.",
      "Close the pop-up with the X button.",
      "Open it again and close it with a click outside its area."
    ],
    "expectedResult": [
      "The pop-up opens and contains options for subject and industry.",
      "Applying the filters updates the results according to the settings.",
      "Clearing the filters removes all criteria and restores the full list.",
      "The pop-up can be closed by clicking the X button or outside the pop-up.",
      "Closing without applying the filters does not apply unintended changes."
    ]
  },
  {
    "id": "ST-STREAM-007",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Recording count",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Reference numbers of recordings are available for selected criteria",
    "steps": [
      "Check the \"Select from\" label and the number for the full list.",
      "Search for a phrase and check the counter.",
      "Apply filters and check the counter again.",
      "Clear the criteria."
    ],
    "expectedResult": [
      "The label and number are visible and properly formatted.",
      "The number corresponds to the actual number of recordings that meet the criteria.",
      "The counter is updated after searching, filtering, and clearing the criteria."
    ]
  },
  {
    "id": "ST-STREAM-008",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Recording tiles, pagination and footer",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The list contains recordings and more than one page of results",
    "steps": [
      "Check the recording tiles.",
      "On desktop, hover over each tile.",
      "Click the selected tiles.",
      "Use pagination elements.",
      "Scroll to the footer and check its links."
    ],
    "expectedResult": [
      "Tiles contain appropriate titles, graphics and required metadata.",
      "When a tile is hovered over, it expands smoothly without overlapping other elements.",
      "Clicking opens the correct recording.",
      "Pagination shows the appropriate page without duplicates.",
      "The footer is complete, and its links work correctly."
    ]
  },
  {
    "id": "ST-STREAM-009",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Basic content of the recording page",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user opens a recording from the ZawodowyStream list",
    "steps": [
      "Check the recording title and summary.",
      "Check the visibility of the player.",
      "Start, pause, rewind, and restart the recording."
    ],
    "expectedResult": [
      "The page corresponding to the selected tile opens.",
      "The title, summary, and player are visible and complete.",
      "The player correctly starts, pauses, seeks through, and restarts the recording.",
      "The controls are available on desktop and mobile."
    ]
  },
  {
    "id": "ST-STREAM-010",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Selected meeting excerpts",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The recording has a section of selected fragments",
    "steps": [
      "Find the \"Watch Selected Meeting Highlights\" section.",
      "Check all excerpts.",
      "Click each tile.",
      "Compare the playback position with the excerpt description."
    ],
    "expectedResult": [
      "The section contains all required excerpts.",
      "Each tile has an appropriate title or description.",
      "Clicking sets the player to the correct point in the recording.",
      "Playback starts as required by the product."
    ]
  },
  {
    "id": "ST-STREAM-011",
    "section": "11. ZAWODOWYSTREAM",
    "title": "“Listen as a Podcast” section",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The recording is available on podcast platforms",
    "steps": [
      "Find the \"Listen as a Podcast\" section.",
      "Check the visible platforms.",
      "Click each link in turn."
    ],
    "expectedResult": [
      "The section shows only currently available platforms.",
      "Each link opens the correct podcast page, not merely the service's home page.",
      "External links work and use appropriate security attributes."
    ]
  },
  {
    "id": "ST-STREAM-012",
    "section": "11. ZAWODOWYSTREAM",
    "title": "Partners and guests of the meeting",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The recording has assigned partners and guests",
    "steps": [
      "Find the meeting partners section.",
      "Check the names, logos, and any links.",
      "Find the meeting guests section.",
      "Check photos, names and descriptions of guests."
    ],
    "expectedResult": [
      "The partners and guests associated with the recording are visible.",
      "Logos and photos load and have the correct proportions.",
      "The names, descriptions, and links are complete and consistent with the data.",
      "The absence of a partner or guest is handled without displaying an empty or broken section."
    ]
  },
  {
    "id": "ST-STREAM-013",
    "section": "11. ZAWODOWYSTREAM",
    "title": "“Your ZawodowyStream” and related Career Paths",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the recording page",
    "steps": [
      "Find the \"Your ZawodowyStream\" section.",
      "Check its content and available actions.",
      "Find related Career Paths.",
      "Click each visible career."
    ],
    "expectedResult": [
      "The \"Your ZawodowyStream\" section is complete and works as required.",
      "Related professions correspond to the theme of the recording.",
      "Each career contains the correct name and image.",
      "Clicking opens the corresponding career details page."
    ]
  },
  {
    "id": "ST-EMPLOYERS-001",
    "section": "12. EMPLOYERS",
    "title": "Heading and list of employers",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "A reference list of employers and their logos is available",
    "steps": [
      "Open the “Employers” page.",
      "Check the page header.",
      "Compare the visible tiles and logos with the reference list.",
      "On desktop, hover over each tile."
    ],
    "expectedResult": [
      "The “Employers” heading is visible and displayed correctly.",
      "All required employer tiles and logos are visible.",
      "Logos are sharp, uncropped, and maintain the correct proportions.",
      "When a tile is hovered over, the correct animation starts without shifting the layout.",
      "On mobile, tiles do not overlap, and the absence of a hover state does not hinder use."
    ]
  },
  {
    "id": "ST-EMPLOYERS-002",
    "section": "12. EMPLOYERS",
    "title": "Employer contact form",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Approved test data is available",
    "steps": [
      "Find the button “If you are an employer and want to show your organization on this page, contact us”.",
      "Click the button.",
      "Check the form that opens and its default subject.",
      "Try submitting the form with empty or invalid data.",
      "Complete the required fields with approved test data.",
      "Submit the form."
    ],
    "expectedResult": [
      "The button is visible, readable and clickable.",
      "Clicking opens the correct employer contact form.",
      "Incorrect data is blocked by readable validation messages.",
      "A correctly completed form can be submitted only once.",
      "An unambiguous confirmation appears after submission."
    ]
  },
  {
    "id": "ST-ABOUT-001",
    "section": "13. ABOUT US: COOPERATION AND FAQ",
    "title": "Dropdown “About Us”",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on any page that displays the main menu",
    "steps": [
      "Click “About Us” in the main menu.",
      "Check the visibility of the “Cooperation” and “FAQ” items.",
      "Close and reopen the dropdown.",
      "Click both items in turn."
    ],
    "expectedResult": [
      "Clicking “About Us” expands the dropdown.",
      "The dropdown contains visible and clickable “Cooperation” and “FAQ” items.",
      "The dropdown can be opened and closed with a mouse, keyboard, and touch.",
      "“Cooperation” leads to the terms of cooperation page, and “FAQ” leads to the frequently asked questions page."
    ]
  },
  {
    "id": "ST-ABOUT-002",
    "section": "13. ABOUT US: COOPERATION AND FAQ",
    "title": "Cooperation page and expandable sections",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user opens “About Us” → “Cooperation”",
    "steps": [
      "Check the header and basic content of the page.",
      "Check all visible dropdowns regarding terms and forms of cooperation.",
      "Expand each dropdown.",
      "Check the content of the expanded items.",
      "Click each item again to collapse it."
    ],
    "expectedResult": [
      "The correct cooperation page opens.",
      "All required dropdowns are visible and correctly described.",
      "Each dropdown can be expanded and collapsed.",
      "Expanded sections contain proper, non-empty text.",
      "Each item's icon and state reflect whether it is expanded or collapsed."
    ]
  },
  {
    "id": "ST-ABOUT-003",
    "section": "13. ABOUT US: COOPERATION AND FAQ",
    "title": "FAQ page, search field, and questions",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user opens “About Us” → “FAQ”",
    "steps": [
      "Check the heading, search field, and question list.",
      "Search for a phrase that matches an existing question.",
      "Search for a phrase for which there are no results, and then clear the field.",
      "Expand each visible question tile.",
      "Check the content of the answer and click the question again to collapse it."
    ],
    "expectedResult": [
      "The correct Frequently Asked Questions page opens.",
      "The search function returns questions matching the phrase.",
      "For a non-matching phrase, a readable state of no results is visible, and clearing restores the list.",
      "Each question can be expanded and collapsed.",
      "Each expanded question contains the correct, non-empty answer.",
      "The icon and the state of the tile correspond to the current state of the dropdown."
    ]
  },
  {
    "id": "ST-SHOP-001",
    "section": "14. STORE, 1.5%, UKRAINIAN VERSION, AND CONTACT",
    "title": "Opening the Store and browsing products",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a page that displays the main menu",
    "steps": [
      "Click “Shop” in the menu.",
      "Check the URL and heading of the page that opens.",
      "Check the visibility of products and their prices.",
      "Open the details of selected products."
    ],
    "expectedResult": [
      "“Shop” opens the correct Katalyst Education store website.",
      "Products and prices are visible and properly formatted.",
      "Each product can be opened and the details correspond to the selected product.",
      "The store website works correctly on desktop and mobile."
    ]
  },
  {
    "id": "ST-DONATE-001",
    "section": "14. STORE, 1.5%, UKRAINIAN VERSION, AND CONTACT",
    "title": "Opening the “1.5%” page and checking its basic content",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on a page that displays the main menu",
    "steps": [
      "Click “1.5%” in the menu.",
      "Check the address and header of the Katalyst Education page.",
      "Check the information on the transfer of 1.5% tax.",
      "Check the visibility of the donation form, bank transfer section and tax information."
    ],
    "expectedResult": [
      "The “1.5%” item opens the correct Katalyst Education page.",
      "Information about the transfer of 1.5% tax is visible and complete.",
      "All required sections of the page load without errors.",
      "The layout is readable on desktop and mobile."
    ]
  },
  {
    "id": "ST-UA-001",
    "section": "14. STORE, 1.5%, UKRAINIAN VERSION, AND CONTACT",
    "title": "Opening the Ukrainian version of CM",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the Polish version of the page",
    "steps": [
      "Find the Ukrainian CM button in the menu.",
      "Click the button.",
      "Check the URL, language, and content of the page that opens."
    ],
    "expectedResult": [
      "The button is visible and correctly described.",
      "Clicking opens the Ukrainian version of CM.",
      "The page loads without errors and presents the content in Ukrainian."
    ]
  },
  {
    "id": "ST-CONTACT-001",
    "section": "14. STORE, 1.5%, UKRAINIAN VERSION, AND CONTACT",
    "title": "General contact form",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Approved test data is available",
    "steps": [
      "Click the contact icon in the menu.",
      "Verify that the form opens without a default message subject.",
      "Check all the fields and checkboxes of the newsletter and GDPR consent.",
      "Try submitting the form when blank and with invalid data.",
      "Complete the subject and required fields, and provide GDPR consent using approved test data.",
      "Check the variant without subscription and with subscription to the newsletter.",
      "Submit the form."
    ],
    "expectedResult": [
      "The icon opens the appropriate form without a preselected message subject.",
      "The user can choose the topic and fill in all fields.",
      "The newsletter checkbox is optional and the required GDPR consent is correctly validated.",
      "Incorrect data is blocked by readable messages.",
      "A correctly completed form can be submitted only once, and a confirmation appears after submission."
    ]
  },
  {
    "id": "ST-LANG-001",
    "section": "15. MULTILINGUAL SUPPORT",
    "title": "Switching languages: PL ↔ UA",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user is on the Polish home page (PL)",
    "steps": [
      "Click the Ukrainian flag in the menu.",
      "Verify that the entire page is translated.",
      "Open another subpage (e.g. Career Paths).",
      "Verify that the selected language persists.",
      "Click the Polish flag to switch back."
    ],
    "expectedResult": [
      "The language changes throughout the page.",
      "The URL changes (e.g. domain or /ua/ path parameter).",
      "The language selection is saved (cookie or localStorage).",
      "The selected language persists after a refresh.",
      "All text is translated (no Polish text remains in the Ukrainian version)."
    ]
  },
  {
    "id": "ST-RESP-001",
    "section": "16. RESPONSIVENESS",
    "title": "Main page layout on different resolutions",
    "priority": "HIGH",
    "platforms": [
      "Desktop (1920x1080, 1366x768)",
      "Tablet (768x1024)",
      "Mobile (375x667, 390x844)"
    ],
    "preconditions": "DevTools or real devices",
    "steps": [
      "Open the home page at each resolution.",
      "Check the layout of tiles, menus, and images.",
      "Verify that all items are visible.",
      "Check for overflow, including text extending beyond its containers."
    ],
    "expectedResult": [
      "On desktop, three zone tiles are displayed side by side.",
      "On tablets, two or three tiles are displayed depending on orientation.",
      "On mobile, the tiles are arranged vertically.",
      "There is no horizontal scrolling.",
      "All images scale correctly."
    ]
  },
  {
    "id": "ST-RESP-002",
    "section": "16. RESPONSIVENESS",
    "title": "Responsiveness of the career table/list",
    "priority": "HIGH",
    "platforms": [
      "Mobile"
    ],
    "preconditions": "The user is viewing /sciezki-kariery/ on mobile",
    "steps": [
      "Open the career list.",
      "Check that the tiles are legible.",
      "Check that the filters are available and not hidden.",
      "Scroll down the list."
    ],
    "expectedResult": [
      "Career tiles are displayed in a single column on mobile.",
      "Career thumbnails are visible.",
      "Preference Filter and Random Career are available as icons or buttons.",
      "Scrolling is smooth."
    ]
  },
  {
    "id": "ST-SEC-002",
    "section": "17. SECURITY AND DATA PROTECTION",
    "title": "Privacy and Cookie Policy",
    "priority": "HIGH",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "The user visits the website for the first time with cookies cleared",
    "steps": [
      "Open the page in incognito mode.",
      "Check whether a cookie banner appears.",
      "Click \"I Understand, Close the Window\" or the privacy policy link.",
      "Check whether the policy is clear and up to date (GDPR)."
    ],
    "expectedResult": [
      "The cookie banner appears on the first visit.",
      "The text complies with the GDPR.",
      "The link to the full privacy policy works.",
      "Once accepted, the banner does not appear again (the preference is saved in a cookie)."
    ]
  },
  {
    "id": "ST-ERR-002",
    "section": "18. EDGE CASES AND ERRORS",
    "title": "Response to slow connection/timeout",
    "priority": "LOW",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "DevTools → Network → Throttling \"Slow 3G\"",
    "steps": [
      "Set throttling to \"Slow 3G\".",
      "Refresh the home page.",
      "Check whether loading indicators are displayed (spinner, skeleton screen)",
      "Check whether an error message appears after a timeout."
    ],
    "expectedResult": [
      "A progress indicator is displayed while the page is loading.",
      "After a timeout (30–60 seconds), an error message appears.",
      "The user can try again using a refresh button."
    ]
  },
  {
    "id": "ST-ERR-003",
    "section": "18. EDGE CASES AND ERRORS",
    "title": "Form field validation",
    "priority": "MEDIUM",
    "platforms": [
      "Desktop",
      "Mobile"
    ],
    "preconditions": "Contact form page (if any)",
    "steps": [
      "Find the contact or sign-up form.",
      "Try submitting an empty form.",
      "Enter an invalid email address (e.g. \"test@\").",
      "Check the validation messages."
    ],
    "expectedResult": [
      "Required fields are marked with an asterisk (*).",
      "Client-side validation runs before submission.",
      "Error messages are clear and in English.",
      "After correcting the errors, the form can be submitted."
    ]
  }
];
