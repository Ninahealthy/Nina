# Nina Audio Production Checklist

> Step-by-step workflow for producing a new audio episode.
> Follow this checklist from start to finish for each article.

---

## Pre-Production

### 1. Request the TTS Script

- [ ] **Ask the agent**: "Create TTS for `<slug>`" (e.g., "Create TTS for anger-as-information")
- [ ] The agent will follow `docs/audio/audioAgentInstructions.md` to:
  - [ ] Read the article and analyze its emotional arc
  - [ ] Determine or confirm voice mode
  - [ ] Write a bespoke Scene and Context
  - [ ] Tag the script intelligently based on content meaning
  - [ ] Output the script to `TTS/<slug>-tts-script.txt`
- [ ] **Review the agent's quality self-check** results
- [ ] **Read through the script** yourself and verify:
  - [ ] Scene description feels specific to this article
  - [ ] Tags feel intentional, not mechanical
  - [ ] The "truth sentence" is marked with `[breath]` (if used)
  - [ ] Closing invitation uses `[close] [softly]`
- [ ] **Request adjustments** if anything feels off (e.g., "make the opening more deliberate" or "the turn needs more space")

---

## Voice Production (Google AI Studio TTS)

### 2. Configure AI Studio

- [ ] Open [AI Studio TTS Playground](https://aistudio.google.com/generate-speech)
- [ ] Select **Gemini 3.1 Flash TTS Preview** as the model
- [ ] Open **Speaker settings** and configure:
  - [ ] **Audio Profile**: Paste the full profile from the script output (base + mode append)
  - [ ] **Style**: Set per script output (Empathetic / Whisper / Vocal Smile)
  - [ ] **Pace**: Set per script output (The Drift / Natural)
  - [ ] **Accent**: American (Gen)
  - [ ] **Voice**: Achernar (or confirmed alternative)
- [ ] Set **Temperature** per script output (0.8 / 0.85 / 0.9 / 1.0)

### 3. Generate and Review

- [ ] Paste the **Scene** into the Scene field
- [ ] Paste the **Sample Context** into the Sample Context field
- [ ] Paste the **Text** (tagged script) into the Text field
- [ ] Click **Run** (or Ctrl+Enter)
- [ ] **First 30-second check**: Listen to the opening and verify:
  - [ ] Voice matches Nina's identity (intimate, unhurried, honest)
  - [ ] Content note (if present) sounds gentle, not clinical
  - [ ] Opening paragraph pace feels deliberate, not rushed
  - [ ] Audio tags produce intended effects (pauses land, softness is perceptible)
- [ ] **Full listen-through**: Play the complete audio and check:
  - [ ] Subheadings feel like natural transitions, not announcements
  - [ ] Quotes are set apart (pauses before and after are audible)
  - [ ] The 5-second divider silence is present and feels like a real breath
  - [ ] Closing invitation shifts to direct, intimate address
  - [ ] No robotic artifacts, mispronunciations, or unnatural inflections
  - [ ] Pacing feels right for the emotional content
- [ ] **If issues found**: Ask the agent to adjust specific tags or sections
- [ ] **Export** the approved take as audio file

---

## Music Production (Google Lyria 3 Pro)

### 4. Generate Music Bed

- [ ] Open Google AI Studio with **Lyria 3 Pro** (`lyria-3-pro-preview`)
- [ ] Use the prompt from the script output's **LYRIA 3 PRO MUSIC BED** section
- [ ] Generate a 3-minute instrumental track
- [ ] **Listen and verify**:
  - [ ] The track is purely instrumental (no vocals)
  - [ ] The mood matches the voice mode
  - [ ] No sudden dynamic changes, busy melodies, or distracting elements
  - [ ] The track feels like atmosphere, not music
- [ ] **Export** as 44.1kHz stereo WAV

### 5. Mix Voice and Music

- [ ] Import voice track into a DAW (Audacity, GarageBand, Logic)
- [ ] Import music bed on a separate track
- [ ] **Set music volume**: -18dB to -24dB under voice
- [ ] **Music start point**: After the content note (if present), at the essay title
- [ ] **Fade in**: 8-12 seconds at the beginning of the music track
- [ ] **Fade out**: 6-8 seconds after the final spoken word
- [ ] **Headphone check**: Listen through on headphones at moderate volume
  - [ ] The music should be barely perceptible, felt more than heard
  - [ ] If you notice the music, it is too loud; reduce by 2-3dB
  - [ ] Voice clarity is never compromised
- [ ] **Export final mix**: MP3, 128kbps, mono

---

## Registration

### 6. Upload and Register

- [ ] **Upload** the final MP3 to audio hosting (Cloudflare R2)
- [ ] **Note the file size** in bytes (for the episode entry)
- [ ] **Record the actual duration** (from the exported file, not the estimate)
- [ ] **Add episode entry** to `lib/episodes.js`:
  ```js
  "article-slug": {
    episodeNumber: <next number>,
    title: "<Article Title>",
    slug: "<article-slug>",
    voiceMode: "<mode used>",
    audioUrl: "/audio/<article-slug>.mp3",
    duration: "<M:SS>",
    durationSeconds: <total seconds>,
    fileSize: <bytes>,
    publishedDate: "<YYYY-MM-DD>",
    description: "<1-2 sentence description>",
  },
  ```
- [ ] **Verify** the episode appears on the `/listen` page
- [ ] **Test playback** using the AudioPlayer component
- [ ] **Verify** the podcast RSS feed includes the new episode

---

## Quality Checklist

Final pass before publishing:

- [ ] Voice is intimate and unhurried (not performative or "podcast host")
- [ ] Content note (if applicable) is gentle and includes an exit ramp
- [ ] All subheadings are spoken as transitions, not announcements
- [ ] The divider silence (5 seconds) is present and distinct
- [ ] Closing invitation feels like direct, close address
- [ ] Music bed is barely perceptible (if included)
- [ ] No audio artifacts, clicks, or unnatural inflections
- [ ] Duration matches the expected range (5-8 minutes for essays)
- [ ] Episode data in `episodes.js` has accurate duration and file size
- [ ] Episode is accessible and playable on the `/listen` page
