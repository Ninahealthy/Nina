/**
 * Nina's fixed voice identity for Google AI Studio TTS.
 *
 * This file contains ONLY the base voice identity: who Nina is, not how
 * she reads any particular article. Per-article decisions (style, pace,
 * temperature, tagging, music) are made by the agent after reading the
 * article. See docs/audio/audioAgentInstructions.md.
 *
 * @module audioConfig
 */

/**
 * Base voice identity applied to all Nina audio content.
 * These settings are constant across every article and voice register.
 */
export const NINA_VOICE_BASE = {
  model: "gemini-3.1-flash-tts-preview",
  voice: "Achernar",
  voiceTraits: "Soft, Higher pitch",
  accent: "American (Gen)",
  audioProfile:
    "A woman in her mid-thirties reading from her own journal. Warm but " +
    "unperformative. She is not narrating for an audience; she is speaking " +
    "to one person who is close enough to hear her breathe. Intimate without " +
    "being breathy. Grounded. Present. The kind of voice you hear when " +
    "someone is telling you something true.",
};
