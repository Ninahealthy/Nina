/**
 * A pool of daily invitations that rotate based on the day of the year.
 * Deterministic: same day always shows the same invitation.
 */
const INVITATIONS = [
  "Take three slow breaths before your next task. Let each exhale carry something you no longer need.",
  "Step outside for two minutes. Feel the temperature on your skin. Notice what you hear.",
  "Put your hand on your chest. Feel your heartbeat. You are alive. That is the starting point.",
  "Before you open your inbox, close your eyes for ten seconds. Start the day on your terms.",
  "Choose one thing today that you will do slowly on purpose.",
  "Notice the weight of your body in your chair right now. Let your shoulders drop.",
  "Today, try eating one meal without a screen in front of you.",
  "Write down one thing you are grateful for. Not what you should be grateful for, what you actually are.",
  "When someone speaks to you today, listen without planning your response.",
  "Take the long way home. Let the extra minutes be a gift, not a waste.",
  "Drink a glass of water right now. Feel it move through you.",
  "Find one moment today to do absolutely nothing. Not resting for productivity. Just being.",
  "Look at the sky. Really look. Notice the colors you usually walk past.",
  "Send a kind thought to someone you will see today, before you see them.",
  "Let one thing be imperfect today. Let it be enough anyway.",
  "Before bed tonight, name three things your body did for you today.",
  "Touch something with texture: fabric, bark, a warm mug. Stay with the sensation.",
  "Ask yourself: what do I actually need right now? Not what I should need. What I do.",
  "Give yourself permission to leave one thing unfinished today.",
  "Sit with your morning drink for five minutes before you start anything. Just sit.",
  "Notice your breathing right now. You do not need to change it. Just notice.",
  "Walk to a window. Look out. Let your eyes rest on the farthest thing you can see.",
  "Today, when you feel the urge to rush, pause for three seconds instead.",
  "Place both feet flat on the floor. Press down gently. Feel the ground holding you.",
  "Choose silence for five minutes today. No music, no podcast, no words. Just quiet.",
  "Stretch your hands open wide, then close them slowly. Repeat three times.",
  "Let your next transition between tasks include a breath. Just one full breath.",
  "Notice one beautiful thing today that you did not create or plan.",
  "When you wash your hands today, feel the water. Let it be a tiny ritual.",
  "Before sleep, place your hand on your belly and breathe slowly. You made it through another day.",
];

/**
 * Get today's invitation based on the day of the year.
 * Returns the same invitation for the entire day.
 */
export function getTodaysInvitation() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return INVITATIONS[dayOfYear % INVITATIONS.length];
}

/**
 * Get a season-aware greeting label.
 */
export function getSeasonLabel() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "A spring invitation";
  if (month >= 5 && month <= 7) return "A summer invitation";
  if (month >= 8 && month <= 10) return "An autumn invitation";
  return "A winter invitation";
}
