<!-- Document: audioAgentInstructions.md | Version: 2.0 | Last updated: 2026-06-20
     Purpose: Instruction file read by the AI agent each time the user requests
     TTS script production for a Nina article. The agent reads the article deeply
     and makes all creative decisions per-article. Nothing is pre-decided. -->

# Nina Audio Production: Agent Instructions

> **When to read this file:** Every time the user asks you to create TTS parameters,
> produce a TTS script, or generate audio content for a Nina article.
> Read this file with `IsSkillFile: true` before doing any work.

---

## 1. Nina's Fixed Identity

These never change. They are who Nina is, regardless of the article.

| Setting | Value |
|---|---|
| Model | Gemini 3.1 Flash TTS Preview (`gemini-3.1-flash-tts-preview`) |
| Voice | Achernar |
| Voice Traits | Soft, Higher pitch |
| Accent | American (Gen) |

**Base Audio Profile** (always the starting point):

> A woman in her mid-thirties reading from her own journal. Warm but unperformative. She is not narrating for an audience; she is speaking to one person who is close enough to hear her breathe. Intimate without being breathy. Grounded. Present. The kind of voice you hear when someone is telling you something true.

Everything else, the agent decides after reading the article.

---

## 2. Read the Article

Read the full article from `lib/articles/<slug>.js`. Do not skim. Read every paragraph as if you were going to perform it yourself. As you read, answer these questions in your working notes:

### Emotional Arc

- **Opening register**: How does the piece begin? Is it observational, confessional, scenic, questioning? What is the emotional temperature?
- **The build**: Where does the emotional weight increase? Which paragraphs carry the heaviest content?
- **The turn**: The moment the essay shifts from observing to revealing, from describing to understanding. Find the exact sentence or paragraph.
- **The truth sentence**: The single most emotionally honest sentence in the entire piece.
- **The release**: How does the essay resolve? Does it arrive at acceptance, stay in uncertainty, or offer an invitation?

### Sensory Landscape

- What physical spaces or images does the article invoke? (a shop window, a kitchen counter, a bed at 3am)
- What body sensations does it reference? (tight jaw, held breath, heavy limbs)
- What season, light, or atmosphere does it carry?

These details will inform the Scene, Context, Audio Profile extension, and music bed prompt.

---

## 3. Decide the Voice Settings

After reading the article, choose the AI Studio settings that serve this specific piece. Do not default to a preset.

### Style

Choose one based on what the article needs:

| Style | What it does | When it fits |
|---|---|---|
| Empathetic | Warm, understanding tones with gentle inflections | Reflective pieces, acceptance, routine, observations |
| Whisper | Reduced volume, intense proximity | Vulnerability, grief, boundaries, conviction, anger held quietly |
| Vocal Smile | Slight lightness and warmth in delivery | Humor, self-deprecation, playfulness, small pleasures |

You are not limited to these three. If AI Studio offers other styles that better fit the article, use them and explain why.

### Pace

| Pace | What it does | When it fits |
|---|---|---|
| The Drift | Slow, liquid, zero urgency, long pauses | Heavy emotional content, grief, raw honesty, meditative pieces |
| Natural | Standard conversational pace with normal variation | Exploratory pieces, curiosity, lighter register, narrative momentum |

### Temperature

Choose a value between 0.7 and 1.0:

- **0.7-0.8**: More consistent delivery, less variation between sentences. Use for pieces that need steadiness and control.
- **0.85-0.9**: Moderate variation. Use for pieces with emotional range that benefit from the voice shifting slightly.
- **0.95-1.0**: Maximum variation. Use for raw, vulnerable pieces where the voice should feel uncontrolled, like it might break.

### Audio Profile Extension

Start with the base audio profile, then **append 1-3 sentences specific to this article**. Draw from the article's actual imagery, emotional register, and sensory details.

**Example for an article about anger:**
> There is quiet steel beneath the softness. She is not angry, but she will not pretend. The words carry weight without raising volume.

**Example for an article about grief:**
> She is close to tears but not performing grief. The voice is steady until it isn't. When it breaks, it breaks quietly.

**Example for an article about the body:**
> She is looking at herself with unusual honesty. The tenderness is hard-won; it was not always there. She speaks about her body the way you speak about someone you are learning to forgive.

These are examples, not templates. Write yours from the article itself.

---

## 4. Write the Scene

Write a 2-3 sentence Scene description **specific to this article**. Draw from the article's own images, settings, and emotional world.

**Rules:**
- Never use a generic scene (e.g., "A quiet room with morning light. A woman sits with a journal.")
- Ground the scene in something concrete from the article
- Include the physical setting, the emotional state, and how she is speaking

**Example:**
> A woman stands in front of a shop window, fingertips on cold glass. She is looking at her reflection and trying, for the first time in a long while, to see what is actually there. She speaks as if narrating the moment to herself.

---

## 5. Write the Context

Write a 2-3 sentence Context paragraph that captures this article's specific emotional register and subject matter. It should tell the TTS model what kind of reading this is.

**Example:**
> This essay is about the body you live in and the body you carry in your mind, and the distance between them. The voice is raw but not fragile. She has thought about this for a long time; she is saying it now because she is ready.

---

## 6. Tag the Script

### Available Tags

These are the tags the TTS model understands. Use them based on what the content needs, not based on where the content sits in the essay.

| Tag | What it does |
|---|---|
| `[pause]` | 1-second breath pause |
| `[pause: 2s]` | 2-second contemplative pause |
| `[pause: 3s]` | 3-second silence |
| `[pause: 5s]` | 5-second silence |
| `[softly]` | Lower volume, more intimate proximity |
| `[breath]` | Audible, gentle breath before speaking |
| `[slowly]` | Reduced pace for emphasis |
| `[gently]` | Tender, careful delivery |
| `[steady]` | Even, grounded delivery |
| `[warmly]` | Slight smile in the voice, lighter tone |
| `[close]` | Mic-proximity intimacy, direct address |

### How to Decide

For every tag you place, you must be able to answer: **"Why this tag, on this sentence, in this article?"**

If your answer references position ("because it's the opening"), you are tagging mechanically. If your answer references meaning ("because she just admitted something that cost her, and the reader needs a breath before the next sentence"), you are tagging well.

### Constraints

- Never stack more than 2 tags on a single sentence
- `[breath]` at most 1-2 times per essay, placed at the truth sentence or a moment of honest admission
- `[pause: 5s]` exactly once, at the divider
- The closing paragraphs (after the divider) should use `[close]` because she shifts to direct address

### Content Note

If the article has a `contentNote`, begin the script with:
```
[gently] Before we begin: [contentNote text] [pause: 3s]
```

### Title

Always:
```
[slowly] [Article Title]. [pause: 2s]
```

### Divider

Always:
```
[pause: 5s]
```

### Everything Else

You decide. Read the paragraph. Feel what it needs. Tag it accordingly.

---

## 7. Write the Lyria Music Bed Prompt

After reading the article, write a **bespoke music bed prompt** for Lyria 3 Pro. The prompt should be informed by the article's specific imagery, season, emotional texture, and sensory landscape.

### Rules

- Always instrumental, no vocals
- 3 minutes duration
- The music is mixed at -18dB to -24dB under the voice (barely perceptible, felt not heard)
- Fade in 8-12 seconds, fade out 6-8 seconds after final word
- Begin after the content note (if present), not before

### How to Write the Prompt

Draw from the article's own sensory world:

- If the article takes place in a kitchen, the music might have warmth and wood (acoustic guitar, gentle percussion)
- If the article is about grief, the music might be near-silent (low drone, the sound of an empty room)
- If the article is about anger held quietly, the music might have tension without aggression (sustained cello, dark ambient pad)
- If the article is about early morning, the music might feel like dawn (slow ambient synth, room tone, barely there)

**Example prompt for an article about body image:**
> Instrumental. Barely audible ambient texture. A single sustained note on a low cello, layered with soft room tone. No melody, no rhythm. The sound of a woman alone in a room, being honest with herself. Slowly evolving, almost static. Tender without being sentimental. 3 minutes.

**Example prompt for an article about creative play:**
> Instrumental. Light acoustic guitar, fingerpicked, no clear melody. Major key, 75 BPM. Like someone humming in a sunlit room while making something with their hands. Warm, unhurried, slightly playful. Minimal arrangement. 3 minutes.

These are examples. Write yours from the article.

---

## 8. Assemble the Output

Write the completed script to `TTS/<slug>-tts-script.txt`.

### Format

```
Scene

[Your bespoke scene description]

Sample Context

[Your bespoke context paragraph]

Text

[Tagged article content: content note, title, body, divider, closing]

---
AI STUDIO SETTINGS
Voice: Achernar (Soft, Higher pitch)
Style: [your choice]
Pace: [your choice]
Accent: American (Gen)
Temperature: [your choice]
Audio Profile: [base profile + your extension]
Estimated Duration: [M:SS] ([word count] words at 150 wpm + pauses)

---
LYRIA 3 PRO MUSIC BED
Model: lyria-3-pro-preview
Mix Level: -18dB to -24dB under voice
Fade In: 8-12 seconds
Fade Out: 6-8 seconds after final word

Prompt:
[Your bespoke music bed prompt]

Post-Production:
Export at 44.1kHz stereo WAV. Mix under voice in a DAW at -18dB to -24dB.
If a listener notices the music, it is too loud. For essays with content
notes, begin the music bed after the content note, not before.
```

### Duration Calculation

Count all words in the article content blocks. Divide by 150 (Nina's unhurried pace). Add 1.5 seconds per content block for pauses. Format as `M:SS`.

---

## 9. Quality Self-Check

Before presenting the script, verify:

| # | Check |
|---|---|
| 1 | Scene is specific to this article (not a generic template) |
| 2 | Context references this article's specific emotional register |
| 3 | Style/Pace/Temperature choices have clear rationale tied to the article's content |
| 4 | Audio Profile extension draws from the article's own imagery |
| 5 | `[breath]` appears at most 1-2 times, placed at honest/vulnerable moments |
| 6 | `[pause: 5s]` appears exactly once (at the divider) |
| 7 | No sentence has more than 2 tags stacked |
| 8 | Tags vary across the essay (not all paragraphs tagged identically) |
| 9 | The "turn" paragraph has distinct tagging from surrounding paragraphs |
| 10 | Content note (if applicable) uses `[gently]` and ends with `[pause: 3s]` |
| 11 | Lyria prompt draws from the article's specific sensory world |
| 12 | Word count and duration estimate are present |

Report the self-check results alongside the script.
