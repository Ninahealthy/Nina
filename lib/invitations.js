/**
 * A pool of daily invitations that rotate based on the day of the year.
 * Deterministic: same day always shows the same invitation.
 *
 * Each invitation is written with sensory specificity and personal voice
 * rather than generic mindfulness directives. They should feel authored,
 * not aggregated from a wellness advice database.
 */
const INVITATIONS = [
  "Before you open your laptop, press your palm flat against the table. Feel the temperature. That surface has been waiting for you all morning.",
  "Step outside for two minutes. Do not call it a practice. Call it standing in the weather.",
  "Put your hand on your chest. Count five heartbeats. You do not need to do anything with this information.",
  "Before your first email, close your eyes for ten seconds. Not to center yourself. Just to remember that you have a body.",
  "Choose one task today that you will do at half the speed it requires. Notice what resists.",
  "Feel the weight of your body pressing into whatever is holding you right now. That surface is doing its job without being asked.",
  "Eat one meal today with the phone in another room. If this feels difficult, that is worth noticing.",
  "Name something that happened yesterday that you did not plan. Not something good. Just something real.",
  "When someone speaks to you today, try listening without rehearsing your response. This is harder than it sounds.",
  "Take a route you do not usually take. Not for the novelty. For the reminder that the familiar is a choice.",
  "Drink a glass of water right now. Feel the temperature change as it moves through you. Your body has been waiting.",
  "Find five minutes today with nothing planned in them. Not five productive minutes. Five empty ones.",
  "Look at the sky for thirty seconds. Not to be inspired. Just to remember there is something above the ceiling.",
  "Think of someone you will see today. Hold a thought for them that you will never mention.",
  "Let one thing be finished in its imperfect state today. Not everything needs another pass.",
  "Before sleep, notice what your body did today without being asked: breathing, digesting, healing a paper cut. It did not need your permission.",
  "Touch something in your home that you usually walk past: a doorframe, a shelf, a wall. Surfaces have textures you have stopped feeling.",
  "Ask yourself what you actually need right now. Not what you should need, or what would look good in a journal entry. What you need.",
  "Give yourself permission to leave one task genuinely unfinished. Not paused. Unfinished.",
  "Hold your morning cup with both hands for the first sip. There is no reason for this. That is the point.",
  "Notice your breathing right now. Do not improve it. Improvement is not the assignment.",
  "Walk to the nearest window. Let your eyes settle on the farthest thing visible. Stay there for three breaths.",
  "The next time you feel the urge to rush, add three seconds before you move. Three seconds is enough to choose.",
  "Press both feet into the floor. The floor does not need you to press. You need to feel it press back.",
  "Sit in silence for five minutes today. Not meditation. Just the absence of input. They are not the same thing.",
  "Open and close your hands slowly, three times. This is not a technique. It is a way of saying hello to your own body.",
  "Between your next two tasks, take one full breath. Not a cleansing breath. Not a mindful breath. Just a breath.",
  "Notice one thing today that is beautiful and that nobody designed: the way light falls, a crack in concrete, a sound you cannot name.",
  "When you wash your hands, feel the water temperature change from cold to warm. Thirty seconds of attention. That is the whole practice.",
  "Before sleep, place your hand on your belly. You made it through another day. That is not a small thing, even when it feels like one.",
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
