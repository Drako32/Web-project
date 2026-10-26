# AI Log

## Milestone 1

### Tools and Tasks

- **Tool:** GitHub Copilot in VS Code, Agent mode.
- **Agent:** Frontend Agent.
- **Task:** Create the initial TravelExplore page structure and shared navigation.
- **Prompt:**

  "Create the HTML view templates for the TravelExplore project. Include Home, Destinations, Destination Details, Travel Guides, Favorites, Login, Register, Profile, Dashboard, and About pages. Follow the project rules in AGENTS.md. Keep the implementation simple and do not modify unrelated files."

- **Result:** The agent created the initial view templates and connected them to the existing frontend structure. I reviewed the changes before keeping them.

### Where the AI Was Wrong

**1. Navigation link did not match the expected route**

- **Task:** The Frontend Agent added navigation links for the main pages.
- **Problem:** One navigation link used a route name that did not match the route handled by the JavaScript router.
- **How I noticed it:** I clicked the link during a manual navigation check and observed that the expected view did not open.
- **Fix:** I compared the link with the route names in `router.js` and corrected the mismatch. I then tested the link again.

**2. The agent modified an unrelated part of the page**

- **Task:** The Frontend Agent was asked to update the destination cards.
- **Problem:** The generated changes also modified the shared navigation markup, even though the prompt only requested changes to the destination cards.
- **How I noticed it:** I reviewed the changes in the VS Code diff before accepting them.
- **Fix:** I reverted the unrelated navigation changes and repeated the task with a more specific prompt: "Update only the destination card markup. Do not modify the navigation, router, or shared layout."

### Review and Verification

- Reviewed the agent's changes before accepting them.
- Checked the main navigation links and corresponding route names.
- Reviewed the modified files to ensure unrelated sections remained unchanged.
- Checked the JavaScript files for syntax errors.
- Recorded remaining limitations in the project documentation.

