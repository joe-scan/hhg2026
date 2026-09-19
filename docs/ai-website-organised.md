# Making AI-Built Websites Feel Human

A practical guide distilled from the Reddit discussions in `ai-website.md`.

## The Core Problem

AI coding tools are good at producing interfaces that work. Left alone, they tend to produce interfaces that look familiar:

- Rounded cards inside rounded cards.
- Dark backgrounds with purple or blue gradients.
- Glass panels, glowing blobs, blur effects, and random 3D shapes.
- Generic Tailwind-style layouts.
- Equal padding, equal heading weight, and equal button prominence everywhere.
- Sections stacked like polished landing-page blocks.
- Generic fonts and flat typography hierarchy.
- Excessive whitespace without a clear reason.
- The same visual treatment for every kind of content.
- Copy that sounds vague, polished, and interchangeable.

The common thread is that the model is making too many design decisions itself. It averages together patterns from its training instead of expressing a specific product, audience, or point of view.

The fix is to make the human decisions first, then use AI to build and refine them.

## Start With Purpose

Before choosing colours, components, or effects, define what the page needs to do.

Write down:

- What is the product or page for?
- Who is using it?
- What does the user already know?
- What is the user trying to accomplish?
- What constraints do they have: time, stress, mobile use, accessibility, poor connectivity?
- What should the user understand or feel at first glance?
- What is the single most important action or piece of information?

Reduce the page’s purpose to one sentence. Use that sentence as the design’s north star.

Examples:

- Reassure a nervous customer before they buy.
- Help a visitor choose a walking route quickly.
- Let a player understand their match history at a glance.
- Explain a complex product without making the user work for it.

A visually distinctive page that fails its main task is still a bad page. Check usability, clarity, accessibility, and user behaviour before worrying about whether someone thinks it looks AI-made.

## Decide the Direction First

Don’t ask an AI tool to “make it modern,” “make it unique,” or “make it look premium.” Those prompts leave the important decisions open, so the model falls back to its most common patterns.

Choose a direction before implementation. Useful directions include:

- Editorial.
- Neo-brutalist.
- Swiss-inspired.
- Retro desktop application.
- 90s web.
- Local field guide.
- Industrial.
- Playful utility.
- Newspaper-like.
- Dense data dashboard.
- Warm, analogue, or scrapbook-inspired.

The name alone isn’t enough. Turn the direction into concrete rules.

### Create a design brief

Define:

- Mood and personality.
- Typefaces and the reason for choosing them.
- Type scale and heading weights.
- Page width and text-column width.
- Spacing scale.
- Colour roles: background, surface, text, muted text, border, accent, semantic colours.
- Border treatment.
- Corner radius rules.
- Shadow rules.
- Image and illustration style.
- Button shapes and states.
- Navigation behaviour.
- Animation rules.
- Density: sparse, balanced, or information-heavy.
- Three things the design should avoid.

Example constraints:

```text
Design direction: editorial local field guide

Use:
- A 680px reading column for long-form text.
- One serif display face paired with a plain sans-serif body face.
- Warm off-white, charcoal, and one earthy accent colour.
- Thin rules, small labels, and occasional handwritten-style notes.
- Real photography with visible place and weather context.
- Uneven section heights and deliberate density changes.

Avoid:
- Purple gradients.
- Glassmorphism.
- Rounded cards for every piece of content.
- Equal visual weight for every section.
- Generic marketing phrases.
```

Keep the brief in a file such as `design-system.md`, `DESIGN.md`, or `CLAUDE.md`. Give it to the coding agent and use it as a review checklist after every change.

## Use References Properly

A screenshot contains far more useful information than a paragraph describing the same screenshot. Text descriptions lose spacing, scale, proportion, colour weight, and the relationship between elements.

Use references like this:

1. Find several sites, apps, posters, books, or printed materials with qualities you like.
2. Capture screenshots or assemble a moodboard.
3. Mix references rather than copying one site wholesale.
4. Tell the model what to borrow: spacing, density, typography, colour weight, image treatment, or navigation behaviour.
5. Tell it what not to borrow.

A useful instruction is:

```text
Use these screenshots as references for spacing, typography scale, colour weight, and density. Do not copy their layout, branding, wording, illustrations, or distinctive assets. Adapt the visual principles to this product and its users.
```

The Pinterest-to-description workflow is lossy: visual information is compressed into words, then the model has to reconstruct it. Feed the actual image when your tool supports image input.

References can come from Pinterest, Behance, Dribbble, real products, printed publications, component libraries, or sites you already admire. Use them for principles, not direct imitation. Watch copyright and licensing when copying assets or code.

## Build in the Right Order

The most reliable workflow in the discussions was staged rather than “build the whole website in one prompt.”

### 1. Explore the product

Use a chat model to clarify:

- Product idea.
- Audience.
- Jobs to be done.
- Pages and flows.
- Technical constraints.
- Desired design direction.

Ask it to produce a project brief or setup guide for the coding agent.

### 2. Make one important screen

Start with the main page or the most important user flow. Don’t generate the entire product at once.

Create several visual directions for that screen. Pick one deliberately. Treat the first generation as a sketch, not a finished design.

### 3. Get the function working

Build the basic routes, interactions, data, and states. It’s easier to judge visual quality when the page has real content and real behaviour.

### 4. Design or mock up the front end

Use Figma, an image editor, a visual design tool, or a hand-drawn wireframe. It doesn’t need to be a polished final mockup. It needs to show:

- Layout.
- Content hierarchy.
- Main states.
- Colour direction.
- Component relationships.
- Mobile behaviour.

### 5. Feed the reference back to the agent

Give the agent the screenshots and ask it to create a detailed front-end overhaul plan. Tell it to match the visual decisions, not just reproduce the general subject.

### 6. Extract the system

Once the main screen looks right, extract:

- Design tokens.
- Shared components.
- Type scale.
- Spacing rhythm.
- Colour roles.
- Interaction states.
- Responsive rules.

The system should grow from a good screen. Abstract design tokens written before seeing anything can produce a tidy but lifeless result.

### 7. Build the remaining screens one at a time

Use the approved screen and design system as the reference. Build separate pages and flows rather than asking for a whole application in one go.

### 8. Audit and refine

Run a visual and UX review after each meaningful change. Convert findings into a written specification, then implement that specification in a fresh session or with separate agents. Agents often fix only the most obvious issues unless you give them a complete checklist.

## Control the Defaults

### Layout and hierarchy

- Make one section clearly dominant.
- Let some sections be quiet.
- Vary section heights.
- Mix dense and spacious areas.
- Don’t give every heading the same size.
- Don’t give every button the same prominence.
- Use a narrow reading column where the content benefits from it.
- Allow one deliberately unusual but useful composition.
- Avoid six equally polished blocks glued together.

A tight stats block beside a spacious introduction creates more personality than adding another decorative effect.

### Cards

AI reaches for cards because cards are easy to generate and easy to repeat. Use them when grouping information helps the user. Don’t put every paragraph, statistic, and action inside its own floating panel.

Try:

- Tables and rows for dense information.
- Lists for related items.
- Rules and whitespace for editorial content.
- Inline controls where the relationship is obvious.
- One large surface with internal hierarchy.
- Cards only where grouping or comparison genuinely helps.

Avoid “cardception”: cards inside cards inside larger cards.

### Spacing

AI frequently applies a uniform spacing rhythm even when the content needs contrast. Review:

- Page padding.
- Section spacing.
- Heading-to-body spacing.
- Label-to-control spacing.
- Card and row density.
- Mobile spacing.
- Space around important actions.

Spacing needs to be consistent within a pattern, but the entire page should not have identical density.

### Typography

Typography is one of the fastest ways to make a generated site feel generic or specific.

- Choose a type pairing deliberately.
- Avoid default fonts unless they suit the product.
- Set an intentional type scale.
- Vary weight carefully instead of making everything 700.
- Give long-form copy a readable line length.
- Use labels, captions, and metadata as part of the hierarchy.
- Don’t let every heading sound like a startup landing page.

A different font alone won’t fix a weak layout, but a considered type system makes the rest of the design easier to read.

### Colour

Use colour for a reason.

- Start with a small palette.
- Define roles rather than scattering hex values.
- Avoid automatic purple or blue gradients.
- Keep decorative colour restrained.
- Reserve saturated colours for actions or meaning.
- Keep semantic colours stable across themes.

If a chart communicates win/loss, don’t let a user-selected theme erase that meaning. Theme the interface chrome if you want, but preserve fixed semantic cues and add shape, labels, or patterns so meaning doesn’t depend on colour alone.

### Borders, shadows, and effects

A simple pass that removes borders and drop shadows can eliminate much of the default AI look. Use effects only when they support the product’s character or clarify structure.

Consider banning these by default:

- Gradients.
- Blur.
- Glass panels.
- Glow effects.
- Floating blobs.
- Random 3D objects.
- Excessive animation.
- Decorative badges above every heading.

A strict contract can be useful:

```text
- Use the fixed palette only.
- No random colours.
- No gradients, blur, or glass effects.
- No rounded corners unless specified for that component.
- No shadows unless they communicate elevation.
- No layout shifts.
- Use deterministic component states.
- Preserve the defined type scale and spacing tokens.
```

## Copy Is Design

Several comments pointed out that the copy can make a site feel AI-generated even when the layout is decent.

Watch for:

- Vague claims.
- Generic headings.
- “Built for modern teams” language.
- Empty phrases such as “guides written for real visits.”
- Repeated words like “seamless,” “powerful,” or “unlock.”
- Copy that could belong to any company.
- Headings that describe a feature without saying why it matters.

Write from the actual product and audience. Replace:

```text
Plan better trips with intelligent local insights.
```

With something specific:

```text
Find a half-day walk near Banff that still works when the weather turns.
```

Use real content during design. Placeholder copy hides problems with line length, hierarchy, and density.

## Use Real Assets

Generic or AI-generated imagery can make a site feel assembled from a template. Use real photography, product screenshots, local details, diagrams, or illustrations with a consistent style when possible.

For a local or specialist product, specific assets carry more identity than decorative styling:

- Real places.
- Real data.
- Real names.
- Real constraints.
- Real examples.
- Real customer language.

Small human details can help too: a lightly quirky label, an unexpected but appropriate aside, or a piece of visual language tied to the product. Don’t add random quirkiness as another decoration layer.

## Tools and Skills Mentioned

These came up in the discussions. Treat them as options, not magic solutions:

- Figma for wireframes, states, layout, and visual control.
- Claude Code, Cursor, Codex, Lovable, v0, Bolt, and similar agents for implementation.
- `frontend-design` skill for avoiding common generated UI patterns.
- Impeccable for audit, critique, optimisation, and design-system work.
- Playwright or browser automation for checking real interactions and flows.
- Google Stitch for generating visual concepts and passing them into a coding agent.
- Component libraries such as shadcn/ui, Radix, Untitled UI, Flowbite, and Landingfolio.
- Storybooks and established UI kits for studying proven component patterns.
- Visual inspection tools such as browser devtools or extensions that let you target individual components.
- Moodboard and image-generation tools for exploring a visual direction.

A component library can improve quality and consistency, but it won’t automatically make the product distinctive. It gives the model good building blocks. You still decide how they’re arranged, styled, and used.

Check licenses before copying components, code, images, or assets.

## Review Prompts

### Before building

```text
You are helping design [product/page] for [audience].

The main user goal is: [goal].
The user should understand: [message].
The desired personality is: [direction].

Use the attached references for [specific qualities]. Do not copy their branding, content, assets, or layout.

Design rules:
- Typography: [rules]
- Colour: [rules]
- Spacing: [rules]
- Layout: [rules]
- Components: [rules]
- Image treatment: [rules]

Avoid:
- [pattern]
- [pattern]
- [pattern]

Create three directions for the main screen only. Explain the trade-offs before implementing one.
```

### During implementation

```text
Implement this screen from the attached reference and the design-system.md file.

Match the reference’s spacing, density, type hierarchy, colour weight, and component relationships. Do not copy its branding or content.

Use real content from the project brief. Keep the page’s primary task clear. Build responsive states for mobile and desktop. Do not introduce new colours, component styles, shadows, gradients, or corner-radius values without updating the design system.
```

### After implementation

```text
Audit this page against design-system.md and the original user goal.

Check:
- Visual hierarchy.
- Typography scale and weight.
- Spacing rhythm.
- Section density and height variation.
- Card overuse.
- Copy specificity.
- Mobile layout.
- Accessibility and contrast.
- Interaction states.
- Meaningful versus decorative colour.
- Performance and layout shifts.

Write every finding as a concrete specification with location, problem, reason, and exact change. Do not fix only the highest-priority items. Cover the complete list before editing.
```

### For an existing site

```text
Review the current site from the attached screenshots and code.

First identify the product’s main user task. Then list the five strongest signs of generic AI-generated design, ranked by impact. For each one, propose a specific replacement that follows the attached references and design-system.md.

Do not redesign the whole site at once. Start with the most important screen and preserve working functionality.
```

## A Practical Checklist

### Before generation

- [ ] The user and their main task are written down.
- [ ] The page’s main message fits in one sentence.
- [ ] A visual direction has been chosen.
- [ ] References or a moodboard are ready.
- [ ] The design brief defines type, colour, spacing, layout, image, and component rules.
- [ ] Three unwanted patterns are listed.
- [ ] Real content or realistic content is available.

### During generation

- [ ] The main screen is built before the entire site.
- [ ] The agent receives screenshots, not only prose descriptions.
- [ ] The first output is treated as a sketch.
- [ ] Several directions are considered before committing.
- [ ] Components are reused without repeating the same card layout everywhere.
- [ ] The design system grows from a good screen.

### Before shipping

- [ ] One section clearly matters most.
- [ ] Section heights and content density vary for a reason.
- [ ] Typography has a clear hierarchy.
- [ ] The palette is restrained and purposeful.
- [ ] Semantic colours still communicate meaning.
- [ ] Copy is specific to the product.
- [ ] Images and assets feel relevant and real.
- [ ] Mobile has been reviewed separately.
- [ ] Accessibility and contrast have been checked.
- [ ] Real interactions have been tested in a browser.
- [ ] The page still works well, regardless of whether anyone notices the AI involvement.

## The Short Version

AI-built websites look generic when the model is allowed to make all the design decisions. Decide the product’s purpose, visual direction, hierarchy, type, colour, spacing, content density, and component rules yourself. Give the agent screenshots and explicit constraints, build one important screen first, extract the design system from it, then expand carefully.

The goal isn’t to hide that AI was used. The goal is to make sure the finished site expresses a clear point of view and helps the user do what they came to do.
