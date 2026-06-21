# Nina Audio Voice Bible

> The canonical reference for Nina's spoken voice identity.
> Every parameter in this document maps directly to Google AI Studio's
> Gemini 3.1 Flash TTS Preview controls.

---

## How to Use This Document

1. Open [AI Studio TTS Playground](https://aistudio.google.com/generate-speech)
2. Select **Gemini 3.1 Flash TTS Preview** as the model
3. Configure the **Speaker settings** using the values in the Fixed Identity table
4. Paste the **Audio Profile** into the Audio Profile field
5. Set **Style**, **Pace**, and **Accent** from the agent-produced TTS script
6. Adjust **Temperature** per the agent-produced TTS script
7. Paste the **Scene**, **Context**, and **Text** from the TTS script

All settings beyond the fixed identity (Style, Pace, Temperature, Audio Profile extension) are decided by the agent per-article. See `docs/audio/audioAgentInstructions.md`.

---

## Fixed Identity

These settings are constant across every article. They are who Nina is.

| Parameter | Value | Where in AI Studio |
|---|---|---|
| **Model** | gemini-3.1-flash-tts-preview | Model selector (top right) |
| **Voice** | Achernar | Speaker settings > Voice |
| **Voice Traits** | Soft, Higher pitch | (auto-selected with voice) |
| **Accent** | American (Gen) | Speaker settings > Director's Note > Accent |

### Base Audio Profile

Paste this into the **Audio Profile** field in Speaker settings. The agent will append article-specific sentences after this base:

> A woman in her mid-thirties reading from her own journal. Warm but unperformative. She is not narrating for an audience; she is speaking to one person who is close enough to hear her breathe. Intimate without being breathy. Grounded. Present. The kind of voice you hear when someone is telling you something true.

### Why These Choices

- **Achernar** was selected for its soft quality and higher pitch, which creates intimacy without heaviness. The softness matches Nina's first-person, journal-like delivery.
- **American (Gen)** accent provides natural warmth and cadence without regional distraction. Neutral sounded robotic; General American is the "invisible" American accent that keeps focus on the words.

---

## Per-Article Settings

The following are decided by the agent after reading each article. The TTS script output will specify these:

| Setting | Agent Decides | Where in AI Studio |
|---|---|---|
| **Style** | Based on emotional register (Empathetic, Whisper, Vocal Smile, etc.) | Speaker settings > Director's Note > Style |
| **Pace** | Based on pacing needs (The Drift, Natural, etc.) | Speaker settings > Director's Note > Pace |
| **Temperature** | Based on vocal variation needs (0.7-1.0) | Model settings > Temperature |
| **Audio Profile extension** | 1-3 sentences appended to base, drawn from article imagery | Speaker settings > Audio Profile |
| **Scene** | 2-3 bespoke sentences | Scene field |
| **Context** | 2-3 bespoke sentences | Sample Context field |

---

## What Nina Sounds Like vs. What She Does Not

| Nina sounds like | Nina does NOT sound like |
|---|---|
| A woman reading from her own journal | A podcast host introducing a segment |
| Speaking to one person, close | Broadcasting to an audience |
| Honest, including the uncomfortable parts | Polished, curated, "best self" presentation |
| Unhurried; pauses are part of the meaning | Efficient; filling silence with words |
| Warm without performing warmth | Chirpy, upbeat, motivational |
| Vulnerable without performing vulnerability | Dramatic, theatrical, "deep voice" gravitas |
| Grounded in the body and senses | Abstract, heady, intellectual-only |
| First-person, specific, lived | Third-person, generic, advisory |

---

## Voice Audition Notes

Use this section to record voice audition results. Test the same paragraph across multiple voices and score each on intimacy, warmth, and naturalness.

| Voice | Traits | Intimacy (1-5) | Warmth (1-5) | Naturalness (1-5) | Notes |
|---|---|---|---|---|---|
| Achernar | Soft, Higher pitch | | | | Recommended starting point |
| Achird | Friendly, Lower middle pitch | | | | Test as backup |
| | | | | | |
| | | | | | |

**Test paragraph** (use this exact text for all auditions):

> I caught my reflection in a shop window and did not recognize myself for a moment. Not because I had changed dramatically, but because the person I saw did not match the person I carry in my mind. There is a version of my body that lives in my head, assembled from old photographs, past comments, and the particular cruelty of certain mirrors in certain lights. That version is not accurate. It is a composite, and it is almost always unkind.

---

## Quick Reference Card

For fast setup during recording sessions:

```
MODEL:       gemini-3.1-flash-tts-preview
VOICE:       Achernar (Soft, Higher pitch)
ACCENT:      American (Gen)

STYLE:       [from TTS script]
PACE:        [from TTS script]
TEMPERATURE: [from TTS script]

AUDIO PROFILE: [base profile + agent extension from TTS script]
SCENE:         [from TTS script]
CONTEXT:       [from TTS script]
```
